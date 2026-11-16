import AppKit
import CryptoKit
import Security

/// Обновления Quicky через GitHub Releases репозитория RAZ-AR/CRM_X (теги «quicky-vX.Y.Z»).
/// Безопасность: DMG сверяется с SHA-256 (GitHub digest или из описания релиза), а новое приложение
/// должно удовлетворять designated requirement текущего (тот же bundle id и тот же сертификат подписи).
@MainActor
final class Updater: ObservableObject {
    static let shared = Updater()
    nonisolated static let repo = "RAZ-AR/CRM_X"
    nonisolated static let tagPrefix = "quicky-v"

    struct Release: Equatable { let version: String; let dmgURL: URL; let sha256: String?; let page: URL; let notes: String }
    enum State: Equatable { case idle, checking, downloading, installing, failed(String), upToDate }

    @Published private(set) var available: Release?
    @Published private(set) var state: State = .idle
    private var timer: Timer?

    nonisolated static var currentVersion: String {
        Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "0"
    }

    /// Проверка через 10 секунд после запуска, затем каждый час и после пробуждения Mac.
    /// Найденная версия ставится сама (если автообновление не выключено и эта версия ещё не падала).
    func startAutomaticChecks() {
        guard UserDefaults.standard.object(forKey: "autoUpdate") as? Bool ?? true else { return }
        Task { try? await Task.sleep(for: .seconds(10)); await check(manual: false) }
        timer = Timer.scheduledTimer(withTimeInterval: 3600, repeats: true) { [weak self] _ in
            Task { await self?.check(manual: false) }
        }
        NSWorkspace.shared.notificationCenter.addObserver(forName: NSWorkspace.didWakeNotification, object: nil, queue: .main) { [weak self] _ in
            Task { try? await Task.sleep(for: .seconds(20)); await self?.check(manual: false) }
        }
    }

    /// Журнал обновлений: ~/Library/Logs/Quicky/update.log
    nonisolated static func log(_ line: String) {
        let dir = FileManager.default.urls(for: .libraryDirectory, in: .userDomainMask)[0].appendingPathComponent("Logs/Quicky")
        try? FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
        let file = dir.appendingPathComponent("update.log")
        let text = "\(ISO8601DateFormatter().string(from: Date())) [\(currentVersion)] \(line)\n"
        if let h = try? FileHandle(forWritingTo: file) { h.seekToEndOfFile(); h.write(Data(text.utf8)); try? h.close() }
        else { try? Data(text.utf8).write(to: file) }
    }

    func check(manual: Bool) async {
        guard state != .checking, state != .downloading, state != .installing else { return }
        state = .checking
        do {
            let rel = try await Self.fetchLatest()
            if let rel, Self.isNewer(rel.version, than: Self.currentVersion) {
                available = rel
                state = .idle
                Self.log("найдена версия \(rel.version)")
                // Ставим сами. Если эта версия уже не встала — ждём кнопку «Обновить», без повторов по кругу.
                if !manual, UserDefaults.standard.string(forKey: "autoInstallFailed") != rel.version {
                    install(auto: true)
                    return
                }
                // Уведомление — один раз на версию.
                let key = "updateNotified"
                if manual || UserDefaults.standard.string(forKey: key) != rel.version {
                    UserDefaults.standard.set(rel.version, forKey: key)
                    Notifier.post([("Доступен Quicky \(rel.version)", "Откройте меню Q или окно Quicky и нажмите «Обновить».", "")])
                }
            } else {
                available = nil
                state = manual ? .upToDate : .idle
            }
        } catch {
            Self.log("проверка не удалась: \(error.localizedDescription)")
            state = manual ? .failed(error.localizedDescription) : .idle
        }
    }

    func install() { install(auto: false) }

    private func install(auto: Bool) {
        guard let rel = available, state != .downloading, state != .installing else { return }
        state = .downloading
        Self.log("\(auto ? "автоустановка" : "установка по кнопке") \(rel.version): скачиваю")
        Task {
            // Сохраняем образ в постоянное место: временный файл URLSession удаляется сразу после загрузки.
            let saved = FileManager.default.urls(for: .cachesDirectory, in: .userDomainMask)[0]
                .appendingPathComponent("Quicky-\(rel.version).dmg")
            do {
                let (tmp, _) = try await URLSession.shared.download(from: rel.dmgURL)
                try? FileManager.default.removeItem(at: saved)
                try FileManager.default.moveItem(at: tmp, to: saved)
                try Self.verifyChecksum(saved, rel.sha256)
                state = .installing
                let target = Bundle.main.bundleURL
                Self.log("контрольная сумма ок, ставлю в \(target.path)")
                try await Task.detached { try Updater.installDMG(at: saved, into: target) }.value
                Self.log("установлено, перезапуск")
                try? FileManager.default.removeItem(at: saved)
                if auto { Notifier.post([("Quicky обновлён до \(rel.version)", "Приложение перезапустилось само.", "")]) }
                Self.relaunch()
            } catch {
                Self.log("ошибка: \(error.localizedDescription)")
                let denied = (error as NSError).code == NSFileWriteNoPermissionError || error.localizedDescription.contains("not permitted")
                    || error.localizedDescription.contains("разрешени")
                if denied { Self.log("похоже, macOS не разрешает менять приложения: Настройки → Конфиденциальность и безопасность → Управление приложениями → включить Quicky") }
                UserDefaults.standard.set(rel.version, forKey: "autoInstallFailed")
                state = .failed(error.localizedDescription)
                if auto {
                    Notifier.post([("Доступен Quicky \(rel.version)", "Сам обновиться не смог: \(error.localizedDescription). Нажмите «Обновить» в меню Q.", "")])
                } else if FileManager.default.fileExists(atPath: saved.path) {
                    // Запасной путь: открыть скачанный образ, чтобы перетащить Quicky в «Программы».
                    NSWorkspace.shared.open(saved)
                }
            }
        }
    }

    // MARK: - Шаги

    nonisolated static func fetchLatest() async throws -> Release? {
        var req = URLRequest(url: URL(string: "https://api.github.com/repos/\(repo)/releases?per_page=30")!)
        req.setValue("application/vnd.github+json", forHTTPHeaderField: "accept")
        req.setValue("Quicky-Updater", forHTTPHeaderField: "user-agent")
        req.timeoutInterval = 20
        let (data, resp) = try await URLSession.shared.data(for: req)
        guard (resp as? HTTPURLResponse)?.statusCode == 200,
              let list = try JSONSerialization.jsonObject(with: data) as? [[String: Any]] else {
            throw UpdateError("GitHub не ответил на запрос релизов")
        }
        let releases: [Release] = list.compactMap { json in
            guard json["draft"] as? Bool != true, json["prerelease"] as? Bool != true,
                  let tag = json["tag_name"] as? String, tag.hasPrefix(tagPrefix),
                  let assets = json["assets"] as? [[String: Any]],
                  let dmg = assets.first(where: { ($0["name"] as? String)?.hasSuffix(".dmg") == true }),
                  let s = dmg["browser_download_url"] as? String, let url = URL(string: s) else { return nil }
            let body = json["body"] as? String ?? ""
            var sha = (dmg["digest"] as? String).flatMap { $0.hasPrefix("sha256:") ? String($0.dropFirst(7)) : nil }
            if sha == nil, let r = body.range(of: #"[0-9a-f]{64}"#, options: .regularExpression) { sha = String(body[r]) }
            let page = URL(string: json["html_url"] as? String ?? "https://github.com/\(repo)/releases")!
            return Release(version: String(tag.dropFirst(tagPrefix.count)), dmgURL: url, sha256: sha, page: page, notes: body)
        }
        return releases.max { a, b in isNewer(b.version, than: a.version) }
    }

    nonisolated static func verifyChecksum(_ file: URL, _ expected: String?) throws {
        guard let expected else { throw UpdateError("У релиза нет контрольной суммы — обновление отменено") }
        let got = SHA256.hash(data: try Data(contentsOf: file)).map { String(format: "%02x", $0) }.joined()
        guard got == expected.lowercased() else { throw UpdateError("Контрольная сумма не совпала — файл повреждён или подменён") }
    }

    nonisolated static func installDMG(at dmg: URL, into target: URL) throws {
        let mount = FileManager.default.temporaryDirectory.appendingPathComponent("quicky-update-\(UUID().uuidString)")
        try FileManager.default.createDirectory(at: mount, withIntermediateDirectories: true)
        try run("/usr/bin/hdiutil", ["attach", dmg.path, "-nobrowse", "-readonly", "-noautoopen", "-mountpoint", mount.path])
        defer { _ = try? run("/usr/bin/hdiutil", ["detach", mount.path, "-force"]) }
        let newApp = mount.appendingPathComponent("Quicky.app")
        guard FileManager.default.fileExists(atPath: newApp.path) else { throw UpdateError("В образе нет Quicky.app") }
        try verifySameSigner(newApp)
        let staged = target.deletingLastPathComponent().appendingPathComponent(".Quicky-update.app")
        try? FileManager.default.removeItem(at: staged)
        try run("/usr/bin/ditto", [newApp.path, staged.path])
        _ = try FileManager.default.replaceItemAt(target, withItemAt: staged)
    }

    /// Новая сборка должна удовлетворять designated requirement запущенной (тот же id и сертификат).
    nonisolated private static func verifySameSigner(_ app: URL) throws {
        var selfCode: SecCode?
        var req: SecRequirement?
        var newCode: SecStaticCode?
        guard SecCodeCopySelf([], &selfCode) == errSecSuccess, let selfCode else { throw UpdateError("Не удалось проверить подпись") }
        var staticSelf: SecStaticCode?
        guard SecCodeCopyStaticCode(selfCode, [], &staticSelf) == errSecSuccess, let staticSelf,
              SecCodeCopyDesignatedRequirement(staticSelf, [], &req) == errSecSuccess, let req,
              SecStaticCodeCreateWithPath(app as CFURL, [], &newCode) == errSecSuccess, let newCode else {
            throw UpdateError("Не удалось проверить подпись")
        }
        // Ad-hoc подпись привязана к конкретной сборке — с ней автообновление невозможно.
        var text: CFString?
        if SecRequirementCopyString(req, [], &text) == errSecSuccess, (text as String?)?.hasPrefix("cdhash") == true {
            throw UpdateError("Эта версия подписана без сертификата — один раз установите новую вручную из DMG")
        }
        let flags = SecCSFlags(rawValue: kSecCSCheckAllArchitectures | kSecCSCheckNestedCode)
        guard SecStaticCodeCheckValidity(newCode, flags, req) == errSecSuccess else {
            throw UpdateError("Подпись новой версии не совпадает с установленной — обновление отменено")
        }
    }

    /// `Quicky --update-dry-run [путь.dmg]`: проверка подписи и замены на временной копии приложения.
    nonisolated static func dryRun(localDMG: String?) async -> Int32 {
        do {
            let dmg: URL
            if let localDMG {
                dmg = URL(fileURLWithPath: localDMG)
                print("Локальный образ:", dmg.lastPathComponent)
            } else {
                guard let rel = try await fetchLatest() else { print("Релизов Quicky нет"); return 1 }
                print("Последний релиз:", rel.version, "| текущая:", currentVersion, "| новее:", isNewer(rel.version, than: currentVersion))
                let (tmp, _) = try await URLSession.shared.download(from: rel.dmgURL)
                try verifyChecksum(tmp, rel.sha256)
                print("Контрольная сумма совпадает")
                dmg = tmp
            }
            let dir = FileManager.default.temporaryDirectory.appendingPathComponent("quicky-dryrun-\(UUID().uuidString)")
            try FileManager.default.createDirectory(at: dir, withIntermediateDirectories: true)
            let target = dir.appendingPathComponent("Quicky.app")
            try run("/usr/bin/ditto", [Bundle.main.bundlePath, target.path])
            try installDMG(at: dmg, into: target)
            let v = (NSDictionary(contentsOf: target.appendingPathComponent("Contents/Info.plist"))?["CFBundleShortVersionString"] as? String) ?? "?"
            print("Подпись проверена, копия заменена → версия во временной копии:", v)
            try? FileManager.default.removeItem(at: dir)
            return 0
        } catch {
            print("Ошибка:", error.localizedDescription)
            return 1
        }
    }

    private static func relaunch() {
        let p = Process()
        p.executableURL = URL(fileURLWithPath: "/bin/sh")
        p.arguments = ["-c", "sleep 1; /usr/bin/open \"$0\"", Bundle.main.bundlePath]
        try? p.run()
        NSApp.terminate(nil)
    }

    @discardableResult
    nonisolated private static func run(_ exe: String, _ args: [String]) throws -> String {
        let p = Process()
        p.executableURL = URL(fileURLWithPath: exe)
        p.arguments = args
        let out = Pipe()
        p.standardOutput = out
        p.standardError = out
        try p.run()
        let data = out.fileHandleForReading.readDataToEndOfFile()
        p.waitUntilExit()
        let text = String(data: data, encoding: .utf8) ?? ""
        guard p.terminationStatus == 0 else { throw UpdateError("\((exe as NSString).lastPathComponent): \(text.prefix(200))") }
        return text
    }

    nonisolated static func isNewer(_ a: String, than b: String) -> Bool {
        let pa = a.split(separator: ".").map { Int($0) ?? 0 }, pb = b.split(separator: ".").map { Int($0) ?? 0 }
        for i in 0..<max(pa.count, pb.count) {
            let x = i < pa.count ? pa[i] : 0, y = i < pb.count ? pb[i] : 0
            if x != y { return x > y }
        }
        return false
    }
}

struct UpdateError: LocalizedError {
    let message: String
    init(_ m: String) { message = m }
    var errorDescription: String? { message }
}
