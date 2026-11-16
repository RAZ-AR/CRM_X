import AppKit
import SwiftUI

private struct HoverRowStyle: ButtonStyle {
    func makeBody(configuration: Configuration) -> some View {
        configuration.label.background(configuration.isPressed ? Color.primary.opacity(0.1) : .clear)
    }
}

struct PopoverView: View {
    @ObservedObject var store: Store
    @ObservedObject var prefs: Prefs
    @ObservedObject var updater: Updater
    let openCRM: (String) -> Void
    let openQuicky: () -> Void
    let quit: () -> Void

    var body: some View {
        VStack(alignment: .leading, spacing: 0) {
            header
            updateBanner
            Divider()
            content
            Divider()
            footer
        }
        .frame(width: 380)
        .tint(Color(red: 1, green: 0.357, blue: 0.122))   // оранжевый акцент Quicky
    }

    private var header: some View {
        HStack(alignment: .firstTextBaseline) {
            VStack(alignment: .leading, spacing: 2) {
                Text("quicky").font(.headline)
                if !store.myName.isEmpty {
                    Text(store.myName).font(.caption).foregroundStyle(.secondary)
                }
            }
            Spacer()
            if store.refreshing {
                ProgressView().controlSize(.small)
            } else {
                Button { Task { await store.refresh() } } label: { Image(systemName: "arrow.clockwise") }
                    .buttonStyle(.borderless).help("Обновить")
            }
            Button("CRM X") { openCRM("/") }
            Button("Открыть Quicky", action: openQuicky)
                .keyboardShortcut("o")
                .buttonStyle(.borderedProminent)
        }
        .padding(12)
    }

    @ViewBuilder private var updateBanner: some View {
        if let rel = updater.available {
            HStack(spacing: 8) {
                Image(systemName: "arrow.down.circle.fill").foregroundStyle(Color(red: 1, green: 0.357, blue: 0.122))
                VStack(alignment: .leading, spacing: 1) {
                    Text("Доступен Quicky \(rel.version)").font(.callout.weight(.semibold))
                    Text(updateStatus).font(.caption).foregroundStyle(.secondary)
                }
                Spacer()
                switch updater.state {
                case .downloading, .installing: ProgressView().controlSize(.small)
                default: Button("Обновить") { updater.install() }.buttonStyle(.borderedProminent)
                }
            }
            .padding(.horizontal, 12).padding(.vertical, 8)
            .background(Color(red: 1, green: 0.357, blue: 0.122).opacity(0.12))
        } else if case .failed(let e) = updater.state {
            Text("Обновление: \(e)").font(.caption).foregroundStyle(.red).padding(.horizontal, 12).padding(.bottom, 8)
        }
    }

    private var updateStatus: String {
        switch updater.state {
        case .downloading: return "Скачиваю…"
        case .installing: return "Устанавливаю, Quicky перезапустится"
        case .failed(let e): return e
        default: return "У вас \(Updater.currentVersion)"
        }
    }

    @ViewBuilder private var content: some View {
        switch store.phase {
        case .loading:
            message("Загрузка…", icon: "hourglass")
        case .needsLogin:
            VStack(spacing: 10) {
                message("Войдите в CRM, и задачи появятся здесь.", icon: "person.crop.circle.badge.questionmark")
                Button("Войти") { openCRM("/login") }.buttonStyle(.borderedProminent)
            }.padding(.bottom, 14)
        case .error(let e):
            message(e, icon: "exclamationmark.triangle")
        case .ok:
            if store.overdue.isEmpty && store.today.isEmpty && store.byStatus.isEmpty {
                message("Открытых задач нет 🎉", icon: "checkmark.circle")
            } else {
                ScrollView {
                    LazyVStack(alignment: .leading, spacing: 0) {
                        section("🔥 Просрочено", store.overdue, tint: .red)
                        section("⏰ Сегодня", store.today, tint: .orange)
                        ForEach(store.byStatus, id: \.status) { g in
                            section("\(TaskStatus.dot(g.status)) \(TaskStatus.title(g.status))", g.items, tint: .secondary)
                        }
                    }.padding(.vertical, 6)
                }
                .frame(maxHeight: 460)
            }
        }
    }

    private var footer: some View {
        VStack(alignment: .leading, spacing: 6) {
            HStack {
                Toggle("Задачи команды", isOn: Binding(
                    get: { prefs.includeTeam },
                    set: { prefs.includeTeam = $0; Task { await store.refresh() } }))
                Toggle("Уведомления", isOn: Binding(
                    get: { prefs.notify },
                    set: { prefs.notify = $0 }))
                Toggle("Ответы ИИ", isOn: Binding(
                    get: { prefs.ai },
                    set: { prefs.ai = $0; Task { await store.refresh() } }))
                    .help("Агенты отвечают через Gemini (онлайн) или Ollama (локально) — выбор на экране «Агенты»")
            }
            .toggleStyle(.checkbox).font(.caption)
            // Версия и проверка обновлений — отдельной строкой, чтобы кнопку не вытесняли соседи.
            HStack {
                Text("Quicky \(Updater.currentVersion)").font(.caption.weight(.semibold))
                Spacer()
                Button(updater.state == .upToDate ? "Последняя версия ✓" : (updater.state == .checking ? "Проверяю…" : "Проверить обновления")) {
                    Task { await updater.check(manual: true) }
                }
                .buttonStyle(.bordered).controlSize(.small).disabled(updater.state == .checking)
            }
            HStack {
                if let t = store.lastSync {
                    Text("Обновлено \(t.formatted(date: .omitted, time: .shortened))")
                        .font(.caption2).foregroundStyle(.secondary)
                }
                Spacer()
                if store.phase == .ok {
                    Button("Выйти") { Task { await store.forgetSession() } }.buttonStyle(.borderless).font(.caption)
                }
                Button("Закрыть приложение", action: quit).buttonStyle(.borderless).font(.caption)
            }
        }
        .padding(12)
    }

    private func message(_ text: String, icon: String) -> some View {
        Label(text, systemImage: icon)
            .foregroundStyle(.secondary)
            .frame(maxWidth: .infinity, alignment: .center)
            .padding(20)
    }

    @ViewBuilder
    private func section(_ title: String, _ items: [Store.Item], tint: Color) -> some View {
        if !items.isEmpty {
            Text("\(title) · \(items.count)")
                .font(.caption.weight(.semibold))
                .foregroundStyle(tint)
                .padding(.horizontal, 12).padding(.top, 8).padding(.bottom, 2)
            ForEach(items) { item in Row(item: item) { openCRM("/tasks/\(item.id)") } }
        }
    }
}

/// Настройки как ObservableObject — без @State, чтобы собиралось и Command Line Tools (там нет макросов SwiftUI).
@MainActor
final class Prefs: ObservableObject {
    @Published var includeTeam = Settings.includeTeam { didSet { Settings.includeTeam = includeTeam } }
    @Published var notify = Settings.notify { didSet { Settings.notify = notify } }
    @Published var ai = Settings.aiProvider != "off" { didSet { Settings.aiProvider = ai ? Settings.aiLastProvider : "off" } }
}

private struct Row: View {
    let item: Store.Item
    let open: () -> Void

    var body: some View {
        Button(action: open) {
            HStack(alignment: .top, spacing: 8) {
                Text(TaskStatus.dot(item.task.status)).font(.caption)
                VStack(alignment: .leading, spacing: 2) {
                    Text(item.task.label).lineLimit(2).multilineTextAlignment(.leading)
                    HStack(spacing: 6) {
                        Text(Store.short(item.task.due))
                        if item.task.criticalPath == true { Text("critical").foregroundStyle(.red) }
                        if let a = item.assignee { Text("· \(a)") }
                    }
                    .font(.caption).foregroundStyle(.secondary)
                    if item.task.status == "blocked", let r = item.task.blockReason, !r.isEmpty {
                        Text(r).font(.caption).foregroundStyle(.secondary).lineLimit(2)
                    }
                }
                Spacer(minLength: 0)
            }
            .padding(.horizontal, 12).padding(.vertical, 5)
            .contentShape(Rectangle())
        }
        .buttonStyle(HoverRowStyle())
        .onHover { inside in if inside { NSCursor.pointingHand.push() } else { NSCursor.pop() } }
    }
}
