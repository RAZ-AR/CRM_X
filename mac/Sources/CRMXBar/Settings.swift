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

    static func url(_ path: String) -> URL {
        URL(string: path, relativeTo: baseURL)!.absoluteURL
    }
}

private extension Double {
    var nonZero: Double? { self == 0 ? nil : self }
}
