import Foundation
import Security

/// Google Gemini API (бесплатный уровень AI Studio). Ключ — в Связке ключей macOS.
/// Модель выбирается автоматически: самая свежая стабильная «flash» из списка моделей ключа.
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
        var model = try await currentModel(key: key)
        do {
            return (try await generate(model: model, key: key, system: system, messages: messages), model)
        } catch Failure.http(404, _) {
            // Модель сняли — выбираем заново.
            Settings.geminiModel = nil
            model = try await currentModel(key: key)
            return (try await generate(model: model, key: key, system: system, messages: messages), model)
        }
    }

    /// Проверка ключа и выбор модели — для кнопки «Сохранить» в Quicky.
    static func verify(key: String) async throws -> String {
        Settings.geminiModel = nil
        return try await currentModel(key: key)
    }

    private static func currentModel(key: String) async throws -> String {
        if let m = Settings.geminiModel { return m }
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
        guard let pick = choose(names) else { throw Failure.http(404, "нет доступной модели Flash") }
        Settings.geminiModel = pick
        return pick
    }

    /// Самая свежая «gemini-X-flash»: без lite/image/tts/live/exp; стабильная лучше preview.
    static func choose(_ names: [String]) -> String? {
        let bad = ["lite", "image", "tts", "live", "audio", "exp", "embedding", "thinking", "8b", "learnlm"]
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
        }.first
    }

    private static func generate(model: String, key: String, system: String, messages: [AIClient.Message]) async throws -> String {
        var req = URLRequest(url: base.appendingPathComponent("models/\(model):generateContent"))
        req.httpMethod = "POST"
        req.timeoutInterval = 60
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        req.setValue(key, forHTTPHeaderField: "x-goog-api-key")
        let body: [String: Any] = [
            "systemInstruction": ["parts": [["text": system]]],
            "contents": messages.map { ["role": $0.role == "assistant" ? "model" : "user", "parts": [["text": $0.content]]] },
            "generationConfig": ["temperature": 0.3, "maxOutputTokens": 2048],
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
enum Keychain {
    private static let service = "app.crmx.bar.gemini"

    static var geminiKey: String? {
        let q: [String: Any] = [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service,
                                kSecReturnData as String: true, kSecMatchLimit as String: kSecMatchLimitOne]
        var out: AnyObject?
        guard SecItemCopyMatching(q as CFDictionary, &out) == errSecSuccess, let d = out as? Data else { return nil }
        return String(data: d, encoding: .utf8)
    }

    static func setGeminiKey(_ key: String?) {
        let q: [String: Any] = [kSecClass as String: kSecClassGenericPassword, kSecAttrService as String: service]
        SecItemDelete(q as CFDictionary)
        guard let key, !key.isEmpty else { return }
        var add = q
        add[kSecValueData as String] = Data(key.utf8)
        add[kSecAttrAccessible as String] = kSecAttrAccessibleAfterFirstUnlock
        SecItemAdd(add as CFDictionary, nil)
    }
}
