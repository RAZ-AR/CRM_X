import AppKit
import Combine
import WebKit

/// Окно Quicky: дизайн из design/quicky (лежит в бандле, Resources/quicky/index.html),
/// в который приложение передаёт живые задачи CRM X через window.quickyData(...).
@MainActor
final class QuickyWindow: NSObject, NSWindowDelegate, WKScriptMessageHandler, WKNavigationDelegate {
    private let store: Store
    private var window: NSWindow?
    private var web: WKWebView?
    private var ready = false
    private var bag = Set<AnyCancellable>()

    /// Открыть CRM X на пути (вход, задача, главная).
    var openCRM: ((String) -> Void)?

    init(store: Store) {
        self.store = store
        super.init()
        // Любое изменение данных — перерисовать страницу (с небольшой склейкой).
        store.objectWillChange
            .debounce(for: .milliseconds(150), scheduler: RunLoop.main)
            .sink { [weak self] in self?.push() }
            .store(in: &bag)
    }

    func show() {
        if let window {
            present(window)
            return
        }
        guard let dir = Bundle.main.url(forResource: "quicky", withExtension: nil),
              let page = Bundle.main.url(forResource: "index", withExtension: "html", subdirectory: "quicky") else {
            let a = NSAlert()
            a.messageText = "Не найден дизайн Quicky в приложении. Пересоберите приложение через build.sh."
            a.runModal()
            return
        }
        let cfg = WKWebViewConfiguration()
        cfg.userContentController.add(WeakHandler(self), name: "quicky")
        let web = WKWebView(frame: .zero, configuration: cfg)
        web.navigationDelegate = self
        web.setValue(false, forKey: "drawsBackground")
        web.loadFileURL(page, allowingReadAccessTo: dir)

        let w = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1320, height: 860),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered, defer: false)
        w.title = "Quicky"
        w.titlebarAppearsTransparent = true
        w.titleVisibility = .hidden
        w.isReleasedWhenClosed = false
        w.setFrameAutosaveName("QuickyMainWindow")
        if w.frame.origin == .zero { w.center() }
        w.minSize = NSSize(width: 380, height: 560)
        w.contentView = web
        w.delegate = self
        window = w
        self.web = web
        present(w)
    }

    private func present(_ w: NSWindow) {
        NSApp.setActivationPolicy(.regular)
        w.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
        Task { await store.refresh() }
    }

    func windowWillClose(_ notification: Notification) {
        if NSApp.windows.filter({ $0.isVisible && $0 !== window && $0.canBecomeMain }).isEmpty {
            NSApp.setActivationPolicy(.accessory)
        }
    }

    // MARK: - Данные → страница

    private func push() {
        guard ready, let web else { return }
        let iso = ISO8601DateFormatter()
        var payload: [String: Any] = ["me": store.myName]
        switch store.phase {
        case .loading: payload["phase"] = "loading"
        case .needsLogin: payload["phase"] = "needsLogin"
        case .error(let e): payload["phase"] = "error"; payload["error"] = e
        case .ok: payload["phase"] = "ok"
        }
        if let t = store.lastSync { payload["lastSync"] = iso.string(from: t) }
        payload["tasks"] = store.all.map { item -> [String: Any] in
            let t = item.task
            return [
                "id": t.id, "code": t.code ?? "", "title": t.title, "status": t.status,
                "due": t.due ?? NSNull(), "assignee": item.assignee ?? NSNull(),
                "critical": t.criticalPath ?? false, "blockReason": t.blockReason ?? NSNull(),
                "zone": t.zone ?? NSNull(), "stream": t.workstream ?? NSNull(),
                "priority": t.priority ?? NSNull(), "start": t.startDate ?? NSNull(),
            ]
        }
        payload["ai"] = [
            "provider": Settings.aiProvider, "model": Settings.ollamaModel,
            "geminiModel": Settings.geminiModel ?? "", "hasKey": Keychain.geminiKey?.isEmpty == false,
            "status": aiStatus,
        ]
        payload["events"] = store.recent.map {
            ["at": iso.string(from: $0.at), "title": $0.title, "body": $0.body, "taskId": $0.taskId]
        }
        guard let data = try? JSONSerialization.data(withJSONObject: payload),
              let json = String(data: data, encoding: .utf8) else { return }
        web.evaluateJavaScript("window.quickyData && window.quickyData(\(json))")
    }

    // MARK: - Страница → приложение

    nonisolated func userContentController(_ c: WKUserContentController, didReceive message: WKScriptMessage) {
        guard let body = message.body as? [String: Any], let action = body["action"] as? String else { return }
        let id = body["id"] as? String
        if action == "ask" {
            // Вопрос агенту → Ollama → window.quickyReply({id, text | error}).
            let system = body["system"] as? String ?? ""
            let msgs = (body["messages"] as? [[String: String]] ?? []).compactMap { m -> AIClient.Message? in
                guard let r = m["role"], let c = m["content"], r == "user" || r == "assistant" else { return nil }
                return AIClient.Message(role: r, content: String(c.prefix(4000)))
            }.suffix(8)
            Task { @MainActor in await self.answer(id: id ?? "", system: system, messages: Array(msgs)) }
            return
        }
        if action == "setAI" {
            // Выбор модели и ключ Gemini со страницы. Ключ сразу уходит в Связку ключей и обратно не отдаётся.
            let provider = body["provider"] as? String
            let key = (body["key"] as? String)?.trimmingCharacters(in: .whitespacesAndNewlines)
            let clear = body["clearKey"] as? Bool ?? false
            Task { @MainActor in await self.setAI(provider: provider, key: key, clear: clear) }
            return
        }
        Task { @MainActor in self.handle(action, id: id) }
    }

    /// Последнее сообщение для карточки «Модель агентов» (проверка ключа и т.п.).
    private var aiStatus = ""

    private func setAI(provider: String?, key: String?, clear: Bool) async {
        if clear { Keychain.setGeminiKey(nil); Settings.geminiModel = nil; aiStatus = "Ключ удалён." }
        if let key, !key.isEmpty {
            aiStatus = "Проверяю ключ…"; push()
            do {
                let model = try await Gemini.verify(key: key)
                Keychain.setGeminiKey(key)
                Settings.aiProvider = "gemini"
                aiStatus = "Ключ работает, модель \(model)."
            } catch {
                aiStatus = "Ключ не сохранён: \(error.localizedDescription)."
            }
        } else if let provider, ["gemini", "ollama", "off"].contains(provider) {
            if provider == "gemini" && Keychain.geminiKey == nil {
                aiStatus = "Сначала вставьте ключ Gemini."
            } else {
                Settings.aiProvider = provider
                aiStatus = ""
            }
        }
        push()
    }

    private func answer(id: String, system: String, messages: [AIClient.Message]) async {
        var reply: [String: Any] = ["id": id]
        do {
            let r = try await AIClient.ask(system: system, messages: messages)
            reply["text"] = r.text
            reply["via"] = r.via
        } catch {
            reply["error"] = error.localizedDescription
        }
        guard let web, let data = try? JSONSerialization.data(withJSONObject: reply),
              let json = String(data: data, encoding: .utf8) else { return }
        _ = try? await web.evaluateJavaScript("window.quickyReply && window.quickyReply(\(json))")
    }

    private func handle(_ action: String, id: String?) {
        switch action {
        case "ready": ready = true; push()
        case "openTask": if let id { openCRM?("/tasks/\(id)") }
        case "openCRM": openCRM?("/")
        case "login": openCRM?("/login")
        case "refresh": Task { await store.refresh() }
        default: break
        }
    }

    // Внешние ссылки (Google Fonts и т.п. грузятся; переходы по ссылкам — в браузер).
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        if action.navigationType == .linkActivated, let url = action.request.url, url.scheme?.hasPrefix("http") == true {
            NSWorkspace.shared.open(url)
            return decisionHandler(.cancel)
        }
        decisionHandler(.allow)
    }
}

/// WKUserContentController держит обработчик сильно — разрываем цикл.
private final class WeakHandler: NSObject, WKScriptMessageHandler {
    weak var target: (NSObject & WKScriptMessageHandler)?
    init(_ t: NSObject & WKScriptMessageHandler) { target = t }
    func userContentController(_ c: WKUserContentController, didReceive m: WKScriptMessage) {
        target?.userContentController(c, didReceive: m)
    }
}
