import Foundation
import WebKit
import UserNotifications

/// Опрашивает CRM X сессией из окна CRM (общий WKWebsiteDataStore), считает «мои» задачи,
/// находит изменения с прошлого опроса и шлёт уведомления. Пароль приложение не хранит.
@MainActor
final class Store: ObservableObject {
    enum Phase: Equatable { case loading, needsLogin, error(String), ok }

    struct Item: Identifiable, Equatable {
        let task: CRMTask
        let assignee: String?
        var id: String { task.id }
    }

    @Published private(set) var phase: Phase = .loading
    @Published private(set) var myName = ""
    @Published private(set) var overdue: [Item] = []
    @Published private(set) var today: [Item] = []
    @Published private(set) var byStatus: [(status: String, items: [Item])] = []
    /// Все мои открытые задачи (для окна Quicky).
    @Published private(set) var all: [Item] = []
    /// Для дашборда: проекты CRM X и компактный список всех видимых задач команды.
    @Published private(set) var zones: [CRMZone] = []
    @Published private(set) var teamTasks: [[String]] = []   // [zone, status, assignee, due]
    @Published private(set) var lastSync: Date?
    @Published private(set) var refreshing = false

    /// Лента изменений для экрана «Изменения» (последние 60, хранится между запусками).
    struct Note: Codable { let at: Date; let title: String; let body: String; let taskId: String }
    @Published private(set) var recent: [Note] = Store.loadRecent()

    var badge: Int { overdue.count + today.count }

    private var timer: Timer?
    private let snapshotKey = "snapshot.v1"
    private static let recentKey = "recent.v1"

    private static func loadRecent() -> [Note] {
        UserDefaults.standard.data(forKey: recentKey).flatMap { try? JSONDecoder().decode([Note].self, from: $0) } ?? []
    }

    private func remember(_ notes: [(String, String, String)]) {
        guard !notes.isEmpty else { return }
        let now = Date()
        recent = (notes.map { Note(at: now, title: $0.0, body: $0.1, taskId: $0.2) } + recent).prefix(60).map { $0 }
        if let data = try? JSONEncoder().encode(recent) { UserDefaults.standard.set(data, forKey: Self.recentKey) }
    }

    func start() {
        Task { await refresh() }
        timer?.invalidate()
        timer = Timer.scheduledTimer(withTimeInterval: Settings.pollInterval, repeats: true) { [weak self] _ in
            Task { await self?.refresh() }
        }
    }

    /// Предстоящие оплаты из Google Sheets (если таблица подключена).
    @Published private(set) var payments: [Payments.Item] = []
    @Published private(set) var paymentsError: String?

    func refreshPayments() async {
        guard Payments.sheetURL != nil else { payments = []; paymentsError = nil; return }
        do { payments = try await Payments.fetch(); paymentsError = nil }
        catch { paymentsError = error.localizedDescription }
    }

    func refresh() async {
        if refreshing { return }
        refreshing = true
        defer { refreshing = false }
        Task { await self.refreshPayments() }   // параллельно с CRM
        do {
            let res = try await fetchState()
            guard res.ok, let me = res.me, let state = res.state else {
                if res.auth == true { phase = .needsLogin } else { phase = .error(res.error ?? "CRM не ответила") }
                return
            }
            apply(me: me, state: state)
            phase = .ok
            lastSync = Date()
        } catch Unauthorized.yes {
            phase = .needsLogin
        } catch {
            phase = .error(error.localizedDescription)
        }
    }

    func forgetSession() async {
        let store = WKWebsiteDataStore.default()
        let cookies = await store.httpCookieStore.allCookies()
        for c in cookies where c.name == "crmx_session" { await store.httpCookieStore.deleteCookie(c) }
        UserDefaults.standard.removeObject(forKey: snapshotKey)
        overdue = []; today = []; byStatus = []; all = []
        phase = .needsLogin
    }

    // MARK: - Network

    private enum Unauthorized: Error { case yes }

    private func fetchState() async throws -> StateResponse {
        let host = Settings.baseURL.host ?? ""
        let cookies = await WKWebsiteDataStore.default().httpCookieStore.allCookies()
            .filter { host.hasSuffix($0.domain.trimmingCharacters(in: CharacterSet(charactersIn: "."))) }
        guard cookies.contains(where: { $0.name == "crmx_session" }) else { throw Unauthorized.yes }

        var req = URLRequest(url: Settings.url("/api/state"))
        req.timeoutInterval = 30
        req.cachePolicy = .reloadIgnoringLocalCacheData
        for (k, v) in HTTPCookie.requestHeaderFields(with: cookies) { req.setValue(v, forHTTPHeaderField: k) }
        let (data, resp) = try await URLSession(configuration: .ephemeral).data(for: req)
        if (resp as? HTTPURLResponse)?.statusCode == 401 { throw Unauthorized.yes }
        return try JSONDecoder().decode(StateResponse.self, from: data)
    }

    // MARK: - Grouping

    private func apply(me: String, state: CRMState) {
        let names = Dictionary(state.users.map { ($0.id, $0.name) }, uniquingKeysWith: { a, _ in a })
        myName = names[me] ?? ""
        zones = state.zones ?? []
        teamTasks = state.tasks.map { [$0.zone ?? "", $0.status, names[$0.assigneeId ?? ""] ?? "", $0.due ?? ""] }
        let team = Settings.includeTeam ? Set(state.users.filter { $0.managerId == me }.map(\.id)) : []

        let mine = state.tasks.filter { t in
            t.status != "done" &&
            (t.assigneeId == me || (t.participantIds ?? []).contains(me) || team.contains(t.assigneeId ?? ""))
        }
        let cal = Calendar.current
        let start = cal.startOfDay(for: Date())
        func item(_ t: CRMTask) -> Item {
            Item(task: t, assignee: t.assigneeId == me ? nil : names[t.assigneeId ?? ""])
        }
        let sorted = mine.sorted { ($0.due ?? "9999") < ($1.due ?? "9999") }
        all = sorted.map(item)

        overdue = sorted.filter { ($0.dueDate.map { $0 < start }) ?? false }.map(item)
        today = sorted.filter { ($0.dueDate.map { cal.isDate($0, inSameDayAs: start) }) ?? false }.map(item)
        let rest = sorted.filter { t in !overdue.contains { $0.id == t.id } && !today.contains { $0.id == t.id } }
        byStatus = TaskStatus.order.compactMap { st in
            let items = rest.filter { $0.status == st }.map(item)
            return items.isEmpty ? nil : (st, items)
        }

        diffAndNotify(me: me, mine: mine, all: state, names: names)
    }

    // MARK: - Changes → notifications

    private struct Snapshot: Codable {
        var tasks: [String: Entry]
        var comments: [String]
        var overdue: [String]
        struct Entry: Codable { var status: String; var due: String? }
    }

    private func diffAndNotify(me: String, mine: [CRMTask], all: CRMState, names: [String: String]) {
        let d = UserDefaults.standard
        let prev = d.data(forKey: snapshotKey).flatMap { try? JSONDecoder().decode(Snapshot.self, from: $0) }
        let start = Calendar.current.startOfDay(for: Date())
        let mineIds = Set(mine.map(\.id))
        let overdueNow = mine.filter { ($0.dueDate.map { $0 < start }) ?? false }.map(\.id)
        let commentIds = (all.comments ?? []).map(\.id)

        if let prev {
            var notes: [(String, String, String)] = []  // title, body, taskId
            for t in mine {
                guard let o = prev.tasks[t.id] else {
                    notes.append(("🆕 Новая задача", t.label, t.id)); continue
                }
                if o.status != t.status {
                    notes.append(("🔄 \(TaskStatus.title(o.status)) → \(TaskStatus.title(t.status))", t.label, t.id))
                }
                if o.due != t.due {
                    notes.append(("📅 Срок изменён", "\(t.label): \(Self.short(o.due)) → \(Self.short(t.due))", t.id))
                }
            }
            for id in overdueNow where !prev.overdue.contains(id) {
                if let t = mine.first(where: { $0.id == id }) { notes.append(("🔥 Просрочено", t.label, id)) }
            }
            let seen = Set(prev.comments)
            for c in all.comments ?? [] where !seen.contains(c.id) && c.userId != me && mineIds.contains(c.taskId) {
                let t = mine.first { $0.id == c.taskId }
                notes.append(("💬 \(names[c.userId] ?? "Комментарий") · \(t?.title ?? "")", String(c.text.prefix(200)), c.taskId))
            }
            if Settings.notify { Notifier.post(notes) }
            remember(notes)
        }

        let snap = Snapshot(
            tasks: Dictionary(uniqueKeysWithValues: mine.map { ($0.id, .init(status: $0.status, due: $0.due)) }),
            comments: commentIds,
            overdue: overdueNow
        )
        if let data = try? JSONEncoder().encode(snap) { d.set(data, forKey: snapshotKey) }
    }

    static func short(_ due: String?) -> String {
        guard let d = CRMTask.parseDay(due) else { return "без срока" }
        let f = DateFormatter()
        f.dateFormat = "dd.MM"
        return f.string(from: d)
    }
}

enum Notifier {
    static func requestAccess() {
        UNUserNotificationCenter.current().requestAuthorization(options: [.alert, .sound, .badge]) { _, _ in }
    }

    static func post(_ notes: [(String, String, String)]) {
        // Пачку больше 5 сворачиваем в одно уведомление, чтобы не заспамить.
        let list = notes.count > 5
            ? [("CRM X: \(notes.count) изменений", notes.prefix(4).map { "\($0.0): \($0.1)" }.joined(separator: "\n"), "")]
            : notes
        for (title, body, taskId) in list {
            let c = UNMutableNotificationContent()
            c.title = title
            c.body = body
            c.sound = .default
            if !taskId.isEmpty { c.userInfo = ["taskId": taskId] }
            UNUserNotificationCenter.current().add(
                UNNotificationRequest(identifier: UUID().uuidString, content: c, trigger: nil))
        }
    }
}
