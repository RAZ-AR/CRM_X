import Foundation

enum Settings {
    private static let d = UserDefaults.standard

    /// Адрес CRM. Для локальной проверки:
    /// `defaults write app.crmx.bar baseURL http://localhost:3000`
    static var baseURL: URL {
        if let s = d.string(forKey: "baseURL"), let u = URL(string: s) { return u }
        return URL(string: "https://crm-x-nine.vercel.app")!
    }

    /// Как часто опрашивать CRM, в секундах (минимум 60).
    static var pollInterval: TimeInterval {
        max(60, d.double(forKey: "pollInterval").nonZero ?? 300)
    }

    static var includeTeam: Bool {
        get { d.bool(forKey: "includeTeam") }
        set { d.set(newValue, forKey: "includeTeam") }
    }

    static var notify: Bool {
        get { d.object(forKey: "notify") as? Bool ?? true }
        set { d.set(newValue, forKey: "notify") }
    }

    /// Ответы агентов: "gemini" — онлайн, "ollama" — локальная модель, "off" — правила без ИИ.
    static var aiProvider: String {
        get { d.string(forKey: "aiProvider") ?? "ollama" }
        set {
            if newValue != "off" { d.set(newValue, forKey: "aiLastProvider") }
            d.set(newValue, forKey: "aiProvider")
        }
    }
    /// Что включить обратно галочкой «Ответы ИИ».
    static var aiLastProvider: String { d.string(forKey: "aiLastProvider") ?? "ollama" }

    /// Выбранная автоматически модель Gemini (сбрасывается, если её сняли).
    static var geminiModel: String? {
        get { d.string(forKey: "geminiModel") }
        set { d.set(newValue, forKey: "geminiModel") }
    }

    /// Модель Ollama. Сменить: `defaults write app.crmx.bar ollamaModel qwen3:4b`
    static var ollamaModel: String { d.string(forKey: "ollamaModel") ?? "nimble" }

    static var ollamaURL: URL {
        if let s = d.string(forKey: "ollamaURL"), let u = URL(string: s) { return u }
        return URL(string: "http://127.0.0.1:11434")!
    }

    static func url(_ path: String) -> URL {
        URL(string: path, relativeTo: baseURL)!.absoluteURL
    }
}

private extension Double {
    var nonZero: Double? { self == 0 ? nil : self }
}
