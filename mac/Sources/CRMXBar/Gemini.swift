import Foundation
import Security

/// Google Gemini API (бесплатный уровень AI Studio). Ключ — в Связке ключей macOS.
/// Модель выбирается автоматически: самая быстрая из свежих «flash» (перепроверка раз в сутки и после сбоя).
enum Gemini {
    private static let base = URL(string: "https://generativelanguage.googleapis.com/v1beta/")!

    enum Failure: LocalizedError {
        case noKey, badKey, quota, http(Int, String), empty
        var errorDescription: String? {
            switch self {
            case .noKey: return "нет ключа Gemini"
            case .badKey: return "ключ Gemini не принят"
            case .quota: return "бесплатный лимит Gemini исчерпан"
            case .http(let c, let t): return "Gemini ответил \(c): \(t.prefix(140))"
            case .empty: return "Gemini вернул пустой ответ"
            }
        }
    }

    static func ask(system: String, messages: [AIClient.Message]) async throws -> (String, String) {
        guard let key = Keychain.geminiKey, !key.isEmpty else { throw Failure.noKey }
        let model = try await currentModel(key: key)
        do {
            return (try await generate(model: model, key: key, system: system, messages: messages, timeout: 25), model)
        } catch where retryable(error) {
            // Модель перегружена, сняли или кончился её лимит — на 6 часов в сторону, берём самую быструю из остальных.
            markSlow(model)
            Settings.geminiModel = nil
            let next = try await currentModel(key: key)
            return (try await generate(model: next, key: key, system: system, messages: messages, timeout: 40), next)
        }
    }

    /// Проверка ключа и выбор модели — для кнопки «Сохранить» в Quicky.
    static func verify(key: String) async throws -> String {
        Settings.geminiModel = nil
        return try await currentModel(key: key)
    }

    private static func retryable(_ e: Error) -> Bool {
        if let u = e as? URLError { return [.timedOut, .networkConnectionLost, .cannotConnectToHost].contains(u.code) }
        switch e as? Failure {
        case .quota, .empty: return true
        case .http(let c, _): return c == 404 || c >= 500
        default: return false
        }
    }

    private static let picked = "geminiModelPickedAt"
    private static func markSlow(_ m: String) { UserDefaults.standard.set(Date(), forKey: "geminiSlow.\(m)") }
    private static func isSlow(_ m: String) -> Bool {
        (UserDefaults.standard.object(forKey: "geminiSlow.\(m)") as? Date).map { Date().timeIntervalSince($0) < 6 * 3600 } ?? false
    }

    /// Модель выбираем не «самую новую», а самую быструю: новые модели на бесплатном ключе бывают перегружены
    /// и отвечают по минуте. Раз в сутки (или после сбоя) пробуем несколько Flash сразу и берём первую ответившую.
    private static func currentModel(key: String) async throws -> String {
        if let m = Settings.geminiModel,
           let at = UserDefaults.standard.object(forKey: picked) as? Date, Date().timeIntervalSince(at) < 24 * 3600 { return m }
        var req = URLRequest(url: base.appendingPathComponent("models").appending(queryItems: [.init(name: "pageSize", value: "200")]))
        req.setValue(key, forHTTPHeaderField: "x-goog-api-key")
        req.timeoutInterval = 20
        let (data, resp) = try await URLSession.shared.data(for: req)
        try check(resp, data)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let names: [String] = (json?["models"] as? [[String: Any]] ?? []).compactMap { m in
            guard let name = m["name"] as? String,
                  (m["supportedGenerationMethods"] as? [String] ?? []).contains("generateContent") else { return nil }
            return name.replacingOccurrences(of: "models/", with: "")
        }
        let all = candidates(names)
        guard !all.isEmpty else { throw Failure.http(404, "нет доступной модели Flash") }
        let fresh = all.filter { !isSlow($0) }
        let pool = Array((fresh.isEmpty ? all : fresh).prefix(5))
        let pick = await fastest(pool, key: key) ?? pool[0]
        Settings.geminiModel = pick
        UserDefaults.standard.set(Date(), forKey: picked)
        return pick
    }

    /// Короткий запрос всем кандидатам сразу; побеждает первый ответ за 12 секунд.
    private static func fastest(_ models: [String], key: String) async -> String? {
        await withTaskGroup(of: String?.self) { group in
            for m in models {
                group.addTask {
                    let ok = try? await generate(model: m, key: key, system: "Отвечай одним словом.",
                                                 messages: [.init(role: "user", content: "Скажи: готов")], timeout: 12)
                    return ok == nil ? nil : m
                }
            }
            for await r in group { if let r { group.cancelAll(); return r } }
            return nil
        }
    }

    /// Модели «gemini-X-flash» без lite/image/tts/live/exp: новые выше, стабильные выше preview.
    static func candidates(_ names: [String]) -> [String] {
        let bad = ["lite", "image", "tts", "live", "audio", "exp", "embedding", "thinking", "8b", "learnlm", "omni"]
        let flash = names.filter { n in n.hasPrefix("gemini-") && n.contains("flash") && !bad.contains { n.contains($0) } }
        func version(_ n: String) -> Double {
            let m = n.range(of: #"gemini-(\d+(\.\d+)?)"#, options: .regularExpression).map { String(n[$0].dropFirst(7)) }
            return Double(m ?? "0") ?? 0
        }
        return flash.sorted { a, b in
            let va = version(a), vb = version(b)
            if va != vb { return va > vb }
            let pa = a.contains("preview"), pb = b.contains("preview")
            if pa != pb { return !pa }
            if a.hasSuffix("-latest") != b.hasSuffix("-latest") { return a.hasSuffix("-latest") }
            return a.count < b.count
        }
    }
    static func choose(_ names: [String]) -> String? { candidates(names).first }

    /// Без «размышлений» модель отвечает в разы быстрее. У поколений Gemini это разные параметры —
    /// пробуем по очереди (сначала полное отключение), рабочий вариант запоминаем.
    private static let thinkingModes: [(String, [String: Any]?)] = [
        ("budget-0", ["thinkingBudget": 0]),
        ("level-minimal", ["thinkingLevel": "minimal"]),
        ("level-low", ["thinkingLevel": "low"]),
        ("none", nil),
    ]

    private static func generate(model: String, key: String, system: String, messages: [AIClient.Message], timeout: TimeInterval) async throws -> String {
        let saved = UserDefaults.standard.string(forKey: "geminiThinking.\(model)")
        let modes = thinkingModes.filter { saved == nil || $0.0 == saved }
        var lastError: Error = Failure.empty
        for (name, thinking) in modes {
            do {
                let text = try await generateOnce(model: model, key: key, system: system, messages: messages, thinking: thinking, timeout: timeout)
                UserDefaults.standard.set(name, forKey: "geminiThinking.\(model)")
                return text
            } catch Failure.http(400, let t) {
                lastError = Failure.http(400, t)   // этот вариант настройки модель не принимает — следующий
                continue
            }
        }
        UserDefaults.standard.removeObject(forKey: "geminiThinking.\(model)")
        throw lastError
    }

    private static func generateOnce(model: String, key: String, system: String, messages: [AIClient.Message], thinking: [String: Any]?, timeout: TimeInterval) async throws -> String {
        var req = URLRequest(url: base.appendingPathComponent("models/\(model):generateContent"))
        req.httpMethod = "POST"
        req.timeoutInterval = timeout
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(key, forHTTPHeaderField: "x-goog-api-key")
        var config: [String: Any] = ["temperature": 0.3, "maxOutputTokens": 1500]
        if let thinking { config["thinkingConfig"] = thinking }
        let body: [String: Any] = [
            "systemInstruction": ["parts": [["text": system]]],
            "contents": messages.map { ["role": $0.role == "assistant" ? "model" : "user", "parts": [["text": $0.content]]] },
            "generationConfig": config,
        ]
        req.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (data, resp) = try await URLSession.shared.data(for: req)
        try check(resp, data)
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let parts = ((json?["candidates"] as? [[String: Any]])?.first?["content"] as? [String: Any])?["parts"] as? [[String: Any]] ?? []
        // Части с "thought": true — внутренние рассуждения модели, их не показываем.
        let text = parts.filter { ($0["thought"] as? Bool) != true }.compactMap { $0["text"] as? String }.joined()
            .trimmingCharacters(in: .whitespacesAndNewlines)
        guard !text.isEmpty else { throw Failure.empty }
        return text
    }

    private static func check(_ resp: URLResponse, _ data: Data) throws {
        let code = (resp as? HTTPURLResponse)?.statusCode ?? 0
        guard code != 200 else { return }
        let text = String(data: data, encoding: .utf8) ?? ""
        if code == 429 { throw Failure.quota }
        if code == 400 && text.contains("API_KEY_INVALID") || code == 401 || code == 403 { throw Failure.badKey }
        throw Failure.http(code, text)
    }
}

/// Ключ Gemini в Связке ключей (не в файлах и не в настройках).
/// Ключ Gemini. Хранится в файле ~/Library/Application Support/Quicky/gemini.key с правами 0600
/// (читать может только ваша учётная запись). Раньше ключ лежал в Связке ключей, но приложение подписано
/// локальным сертификатом, и macOS после каждого обновления заново спрашивала пароль. Имя Keychain оставлено,
/// чтобы не трогать вызовы.
enum Keychain {
    private static let service = "app.crmx.bar.gemini"
    private static let migratedKey = "gemini.migratedFromKeychain"
    private static var cache: String??

    private static var file: URL {
        let dir = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
            .appendingPathComponent("Quicky", isDirectory: true)
        return dir.appendingPathComponent("gemini.key")
    }

    static var geminiKey: String? {
        if let cache { return cache }
        var key = (try? String(contentsOf: file, encoding: .utf8))?.trimmingCharacters(in: .whitespacesAndNewlines)
        if key?.isEmpty != false {
            key = nil
            // Однократный перенос из Связки ключей (macOS спросит пароль последний раз).
            if !UserDefaults.standard.bool(forKey: migratedKey) {
                UserDefaults.standard.set(true, forKey: migratedKey)
                if let old = legacyKey(), !old.isEmpty { write(old); key = old }
            }
        }
        cache = .some(key)
        return key
    }

    static func setGeminiKey(_ key: String?) {
        UserDefaults.standard.set(true, forKey: migratedKey)
        let q: [String: Any] = [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service]
        SecItemDelete(q as CFDictionary)   // старая запись больше не нужна
        guard let key, !key.isEmpty else {
            try? FileManager.default.removeItem(at: file)
            cache = .some(nil)
            return
        }
        write(key)
        cache = .some(key)
    }

    private static func write(_ key: String) {
        let fm = FileManager.default
        let dir = file.deletingLastPathComponent()
        try? fm.createDirectory(at: dir, withIntermediateDirectories: true, attributes: [.posixPermissions: 0o700])
        try? fm.setAttributes([.posixPermissions: 0o700], ofItemAtPath: dir.path)
        fm.createFile(atPath: file.path, contents: Data(key.utf8), attributes: [.posixPermissions: 0o600])
        try? fm.setAttributes([.posixPermissions: 0o600], ofItemAtPath: file.path)
    }

    private static func legacyKey() -> String? {
        let q: [String: Any] = [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service,
                                kSecReturnData as String: true, kSecMatchLimit as String: kSecMatchLimitOne]
        var out: AnyObject?
        guard SecItemCopyMatching(q as CFDictionary, &out) == errSecSuccess, let d = out as? Data else { return nil }
        return String(data: d, encoding: .utf8)
    }
}
