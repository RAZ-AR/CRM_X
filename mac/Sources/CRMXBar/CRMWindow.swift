import AppKit
import WebKit

/// Полная CRM в отдельном окне. Вход — обычной формой сайта; cookie сессии живёт
/// в WKWebsiteDataStore.default(), и строка меню берёт её оттуда же.
@MainActor
final class CRMWindow: NSObject, NSWindowDelegate, WKNavigationDelegate, WKUIDelegate {
    private var window: NSWindow?
    private var web: WKWebView?
    var onSessionMaybeChanged: (() -> Void)?

    func show(path: String = "/") {
        let url = Settings.url(path)
        if let window, let web {
            if path != "/" || web.url == nil { web.load(URLRequest(url: url)) }
            present(window)
            return
        }
        let cfg = WKWebViewConfiguration()
        cfg.websiteDataStore = .default()
        let web = WKWebView(frame: .zero, configuration: cfg)
        web.navigationDelegate = self
        web.uiDelegate = self
        web.allowsBackForwardNavigationGestures = true
        web.load(URLRequest(url: url))

        let w = NSWindow(
            contentRect: NSRect(x: 0, y: 0, width: 1280, height: 820),
            styleMask: [.titled, .closable, .miniaturizable, .resizable, .fullSizeContentView],
            backing: .buffered, defer: false)
        w.title = "CRM X"
        w.titlebarAppearsTransparent = true
        w.isReleasedWhenClosed = false
        w.setFrameAutosaveName("CRMXMainWindow")
        if w.frame.origin == .zero { w.center() }
        w.contentView = web
        w.delegate = self
        w.minSize = NSSize(width: 380, height: 500)
        self.window = w
        self.web = web
        present(w)
    }

    func reload() { web?.reload() }

    private func present(_ w: NSWindow) {
        NSApp.setActivationPolicy(.regular)  // в Dock и ⌘Tab, пока окно открыто
        w.makeKeyAndOrderFront(nil)
        NSApp.activate(ignoringOtherApps: true)
    }

    func windowWillClose(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
    }

    // После входа/выхода на сайте обновляем строку меню.
    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        onSessionMaybeChanged?()
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
