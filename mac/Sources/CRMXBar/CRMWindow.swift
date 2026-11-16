import AppKit
import WebKit

/// CRM X внутри окна Quicky: отдельный WKWebView, который окно Quicky кладёт поверх своей страницы
/// в область под шапкой (прямоугольник присылает страница). Вход — обычной формой сайта; cookie сессии
/// живёт в WKWebsiteDataStore.default(), и строка меню берёт её оттуда же.
@MainActor
final class CRMPane: NSObject, WKNavigationDelegate, WKUIDelegate {
    private(set) lazy var web: WKWebView = {
        let cfg = WKWebViewConfiguration()
        cfg.websiteDataStore = .default()
        let w = WKWebView(frame: .zero, configuration: cfg)
        w.navigationDelegate = self
        w.uiDelegate = self
        w.allowsBackForwardNavigationGestures = true
        w.setValue(false, forKey: "drawsBackground")
        w.wantsLayer = true
        w.layer?.cornerRadius = 22
        w.layer?.masksToBounds = true
        w.isHidden = true
        return w
    }()
    private var loadedPath: String?
    var onSessionMaybeChanged: (() -> Void)?
    /// Текущий путь CRM X (для подсветки раздела в шапке Quicky).
    var onPathChanged: ((String) -> Void)?

    func load(path: String) {
        let p = path.hasPrefix("/") ? path : "/"
        // Тот же раздел уже открыт — не перезагружаем (сохраняется прокрутка и введённые данные).
        if p == loadedPath, web.url != nil, p == "/" || web.url?.path == p { return }
        loadedPath = p
        web.load(URLRequest(url: Settings.url(p)))
    }

    func command(_ cmd: String) {
        switch cmd {
        case "back": if web.canGoBack { web.goBack() }
        case "forward": if web.canGoForward { web.goForward() }
        case "reload": web.reload()
        case "browser": if let u = web.url { NSWorkspace.shared.open(u) }
        default: break
        }
    }

    // После входа/выхода на сайте обновляем данные Quicky.
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        onSessionMaybeChanged?()
        if let p = webView.url?.path { onPathChanged?(p.isEmpty ? "/" : p) }
    }

    // Внешние ссылки (Telegram, WhatsApp, почта, чужие сайты) — в системный браузер/приложение.
    func webView(_ webView: WKWebView, decidePolicyFor action: WKNavigationAction,
                 decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
        guard let url = action.request.url else { return decisionHandler(.allow) }
        let own = url.host == Settings.baseURL.host
        if !own, ["http", "https", "mailto", "tel", "tg"].contains(url.scheme ?? ""), action.targetFrame?.isMainFrame != false {
            NSWorkspace.shared.open(url)
            return decisionHandler(.cancel)
        }
        decisionHandler(.allow)
    }

    // target=_blank
    func webView(_ webView: WKWebView, createWebViewWith configuration: WKWebViewConfiguration,
                 for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
        if let url = action.request.url {
            if url.host == Settings.baseURL.host { webView.load(URLRequest(url: url)) } else { NSWorkspace.shared.open(url) }
        }
        return nil
    }

    // <input type="file"> для вложений
    func webView(_ webView: WKWebView, runOpenPanelWith parameters: WKOpenPanelParameters,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping ([URL]?) -> Void) {
        let p = NSOpenPanel()
        p.allowsMultipleSelection = parameters.allowsMultipleSelection
        p.canChooseDirectories = false
        p.begin { completionHandler($0 == .OK ? p.urls : nil) }
    }

    func webView(_ webView: WKWebView, runJavaScriptAlertPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping () -> Void) {
        let a = NSAlert(); a.messageText = message; a.runModal(); completionHandler()
    }

    func webView(_ webView: WKWebView, runJavaScriptConfirmPanelWithMessage message: String,
                 initiatedByFrame frame: WKFrameInfo, completionHandler: @escaping (Bool) -> Void) {
        let a = NSAlert(); a.messageText = message
        a.addButton(withTitle: "OK"); a.addButton(withTitle: "Отмена")
        completionHandler(a.runModal() == .alertFirstButtonReturn)
    }
}

/// Контейнер окна Quicky с началом координат сверху — так прямоугольник со страницы ложится как есть.
final class FlippedView: NSView {
    override var isFlipped: Bool { true }
}
