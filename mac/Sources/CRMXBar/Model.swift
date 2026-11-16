import Foundation

/// Только поля, которые нужны строке меню. Остальное в ответе /api/state игнорируется.
struct CRMTask: Decodable, Identifiable, Equatable {
    let id: String
    let title: String
    let status: String
    let due: String?
    let assigneeId: String?
    let participantIds: [String]?
    let code: String?
    let criticalPath: Bool?
    let blockReason: String?
    let zone: String?
    let workstream: String?
    let priority: String?
    let startDate: String?

    var dueDate: Date? { CRMTask.parseDay(due) }

    static func parseDay(_ s: String?) -> Date? {
        guard let s, s.count >= 10 else { return nil }
        let f = DateFormatter()
        f.calendar = Calendar(identifier: .gregorian)
        f.locale = Locale(identifier: "en_US_POSIX")
        f.timeZone = .current
        f.dateFormat = "yyyy-MM-dd"
        return f.date(from: String(s.prefix(10)))
    }

    var label: String {
        if let code, !code.isEmpty { return "\(code) \(title)" }
        return title
    }
}

struct CRMUser: Decodable {
    let id: String
    let name: String
    let managerId: String?
}

struct CRMComment: Decodable {
    let id: String
    let taskId: String
    let userId: String
    let text: String
}

struct CRMZone: Decodable {
    let slug: String
    let name: String
    let deadline: String?
}

struct CRMState: Decodable {
    let users: [CRMUser]
    let tasks: [CRMTask]
    let comments: [CRMComment]?
    let zones: [CRMZone]?
    let helixSync: HelixSync?
}

/// Последняя синхронизация Helix → CRM X (пишет сервер).
struct HelixSync: Decodable {
    let at: String
    let by: String?
}

struct StateResponse: Decodable {
    let ok: Bool
    let me: String?
    let state: CRMState?
    let error: String?
    let auth: Bool?
}

enum TaskStatus {
    static let order = ["blocked", "in_progress", "review", "todo"]

    static func title(_ s: String) -> String {
        switch s {
        case "todo": return "Не начато"
        case "in_progress": return "В работе"
        case "waiting": return "Ожидает"
        case "blocked": return "Заблокировано"
        case "review": return "На проверке"
        case "done": return "Готово"
        default: return s
        }
    }

    static func dot(_ s: String) -> String {
        switch s {
        case "todo": return "⚪"
        case "in_progress": return "🔵"
        case "waiting": return "🟡"
        case "blocked": return "⛔"
        case "review": return "🟣"
        case "done": return "✅"
        default: return "•"
        }
    }
}
