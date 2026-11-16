import AppKit
import Combine
import SwiftUI
import UserNotifications

@MainActor
final class AppDelegate: NSObject, NSApplicationDelegate, UNUserNotificationCenterDelegate {
    private let store = Store()
    private lazy var quicky = QuickyWindow(store: store)
    private var item: NSStatusItem!
    private let popover = NSPopover()
    private var bag = Set<AnyCancellable>()

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.mainMenu = Self.mainMenu()
        UNUserNotificationCenter.current().delegate = self
        Notifier.requestAccess()

        item = NSStatusBar.system.statusItem(withLength: NSStatusItem.variableLength)
        item.button?.target = self
        item.button?.action = #selector(toggle)
        item.button?.sendAction(on: [.leftMouseUp, .rightMouseUp])
        item.button?.imagePosition = .imageLeading

        popover.behavior = .transient
        popover.animates = false
        popover.contentViewController = NSHostingController(rootView: PopoverView(
            store: store,
            prefs: Prefs(),
            updater: Updater.shared,
            openCRM: { [weak self] path in self?.openCRM(path) },
            openQuicky: { [weak self] in self?.openQuicky() },
            quit: { NSApp.terminate(nil) }))

        Publishers.CombineLatest3(store.$phase, store.$overdue, store.$today)
            .receive(on: RunLoop.main)
            .sink { [weak self] _ in self?.updateIcon() }
            .store(in: &bag)

        store.start()
        Updater.shared.startAutomaticChecks()
        Updater.shared.$available
            .receive(on: RunLoop.main)
            .sink { [weak self] _ in self?.updateIcon() }
            .store(in: &bag)
        updateIcon()

        // При запуске: без сессии — окно входа, с сессией — Quicky.
        Task {
            try? await Task.sleep(for: .seconds(2))
            if store.phase == .needsLogin { openCRM("/login") } else { openQuicky() }
        }
    }

    func applicationShouldHandleReopen(_ sender: NSApplication, hasVisibleWindows flag: Bool) -> Bool {
        if !flag { openQuicky() }
        return true
    }

    private func openQuicky() {
        popover.performClose(nil)
        quicky.show()
    }

    /// Знак Q (горизонтальный овал + диагональ) как шаблонная картинка для строки меню.
    private static let qMark: NSImage = {
        let img = NSImage(size: NSSize(width: 24, height: 14), flipped: true) { _ in
            let s: CGFloat = 0.2, ox: CGFloat = 1, oy: CGFloat = 1
            NSColor.black.setStroke()
            let oval = NSBezierPath(ovalIn: NSRect(x: ox + (50 - 44) * s, y: oy + (28 - 21) * s, width: 88 * s, height: 42 * s))
            oval.lineWidth = 1.7
            oval.stroke()
            let line = NSBezierPath()
            line.move(to: NSPoint(x: ox + 21 * s, y: oy + 15.5 * s))
            line.line(to: NSPoint(x: ox + 104 * s, y: oy + 53 * s))
            line.lineWidth = 1.7
            line.lineCapStyle = .round
            line.stroke()
            return true
        }
        img.isTemplate = true
        img.accessibilityDescription = "Quicky"
        return img
    }()

    private func updateIcon() {
        guard let b = item?.button else { return }
        switch store.phase {
        case .needsLogin:
            b.image = NSImage(systemSymbolName: "person.crop.circle.badge.questionmark", accessibilityDescription: "Quicky: нужен вход")
        case .error:
            b.image = NSImage(systemSymbolName: "exclamationmark.triangle", accessibilityDescription: "Quicky: нет связи с CRM")
        default:
            b.image = Self.qMark
        }
        b.image?.isTemplate = true
        b.title = store.phase == .ok && store.badge > 0 ? " \(store.badge)" : ""
        b.toolTip = store.phase == .ok
            ? "Quicky — просрочено: \(store.overdue.count), сегодня: \(store.today.count)"
            : "Quicky"
        // Есть обновление — к счётчику добавляется «↑».
        if let v = Updater.shared.available?.version {
            b.title += " ↑"
            b.toolTip = (b.toolTip ?? "") + "\nДоступен Quicky \(v)"
        }
    }

    @objc private func toggle() {
        guard let b = item.button else { return }
        if popover.isShown {
            popover.performClose(nil)
        } else {
            Task { await store.refresh() }
            popover.show(relativeTo: b.bounds, of: b, preferredEdge: .minY)
            popover.contentViewController?.view.window?.makeKey()
        }
    }

    private func openCRM(_ path: String) {
        popover.performClose(nil)
        quicky.showCRM(path)
    }

    // Клик по уведомлению — открыть задачу.
    nonisolated func userNotificationCenter(_ center: UNUserNotificationCenter,
                                            didReceive response: UNNotificationResponse) async {
        let id = response.notification.request.content.userInfo["taskId"] as? String
        await MainActor.run { self.openCRM(id.map { "/tasks/\($0)" } ?? "/") }
    }

    nonisolated func userNotificationCenter(_ center: UNUserNotificationCenter,
                                            willPresent notification: UNNotification) async -> UNNotificationPresentationOptions {
        [.banner, .sound]
    }

    /// Меню нужно, чтобы в окне CRM работали ⌘C/⌘V/⌘A/⌘Z, ⌘W, ⌘R.
    private static func mainMenu() -> NSMenu {
        let main = NSMenu()

        let appItem = NSMenuItem()
        let appMenu = NSMenu()
        appMenu.addItem(withTitle: "Скрыть CRM X", action: #selector(NSApplication.hide(_:)), keyEquivalent: "h")
        appMenu.addItem(.separator())
        appMenu.addItem(withTitle: "Закрыть CRM X", action: #selector(NSApplication.terminate(_:)), keyEquivalent: "q")
        appItem.submenu = appMenu
        main.addItem(appItem)

        let editItem = NSMenuItem()
        let edit = NSMenu(title: "Правка")
        edit.addItem(withTitle: "Отменить", action: Selector(("undo:")), keyEquivalent: "z")
        let redo = edit.addItem(withTitle: "Повторить", action: Selector(("redo:")), keyEquivalent: "z")
        redo.keyEquivalentModifierMask = [.command, .shift]
        edit.addItem(.separator())
        edit.addItem(withTitle: "Вырезать", action: #selector(NSText.cut(_:)), keyEquivalent: "x")
        edit.addItem(withTitle: "Копировать", action: #selector(NSText.copy(_:)), keyEquivalent: "c")
        edit.addItem(withTitle: "Вставить", action: #selector(NSText.paste(_:)), keyEquivalent: "v")
        edit.addItem(withTitle: "Выбрать всё", action: #selector(NSText.selectAll(_:)), keyEquivalent: "a")
        editItem.submenu = edit
        main.addItem(editItem)

        let winItem = NSMenuItem()
        let win = NSMenu(title: "Окно")
        win.addItem(withTitle: "Закрыть окно", action: #selector(NSWindow.performClose(_:)), keyEquivalent: "w")
        win.addItem(withTitle: "Обновить страницу", action: #selector(WKReloadTarget.reload(_:)), keyEquivalent: "r")
        win.addItem(withTitle: "Свернуть", action: #selector(NSWindow.performMiniaturize(_:)), keyEquivalent: "m")
        winItem.submenu = win
        main.addItem(winItem)
        return main
    }
}

/// Селектор reload(_:) есть у WKWebView — объявляем для #selector.
@objc private protocol WKReloadTarget {
    func reload(_ sender: Any?)
}
