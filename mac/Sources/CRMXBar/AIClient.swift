import AppKit
import Foundation

/// Ответы агентов через локальную модель Ollama (http://127.0.0.1:11434).
/// Данные задач не покидают Mac. Модель и адрес — в Settings.
enum AIClient {
    struct Message: Codable { let role: String; let content: String }

    enum Failure: LocalizedError {
        case off, unreachable, badModel(String), http(Int, String)
        var errorDescription: String? {
            switch self {
            case .off: return "ИИ-ответы выключены"
            case .unreachable: return "Ollama не запущен"
            case .badModel(let m): return "в Ollama нет модели «\(m)» — скачайте её: ollama pull \(m)"
            case .http(let c, let t): return "Ollama ответил \(c): \(t.prefix(160))"
            }
        }
    }

    struct Reply { let text: String; let via: String }

    /// Онлайн (Gemini) → при сбое локально (Ollama) → ошибка (страница ответит правилами).
    static func ask(system: String, messages: [Message]) async throws -> Reply {
        switch Settings.aiProvider {
        case "gemini":
            do {
                let (text, model) = try await Gemini.ask(system: system, messages: messages)
                return Reply(text: text, via: "Gemini · \(model) · онлайн")
            } catch {
                let why = error.localizedDescription
                if await reachable(), let text = try? await chat(system: system, messages: messages) {
                    return Reply(text: text, via: "Ollama · \(Settings.ollamaModel) · локально (Gemini: \(why))")
                }
                throw error
            }
        case "ollama":
            return Reply(text: try await askOllama(system: system, messages: messages), via: "Ollama · \(Settings.ollamaModel) · локально")
        default:
            throw Failure.off
        }
    }

    static func askOllama(system: String, messages: [Message]) async throws -> String {
        do {
            return try await chat(system: system, messages: messages)
        } catch let e as URLError where e.code == .cannotConnectToHost || e.code == .networkConnectionLost || e.code == .cannotFindHost {
            // Ollama установлен, но не запущен — поднимаем фоном и пробуем ещё раз.
            await MainActor.run { _ = launchOllama() }
            for _ in 0..<20 {
                try? await Task.sleep(for: .milliseconds(500))
                if await reachable() { break }
            }
            guard await reachable() else { throw Failure.unreachable }
            return try await chat(system: system, messages: messages)
        }
    }

    private static func chat(system: String, messages: [Message]) async throws -> String {
        var req = URLRequest(url: Settings.ollamaURL.appendingPathComponent("api/chat"))
        req.httpMethod = "POST"
        req.timeoutInterval = 180
        req.setValue("application/json", forHTTPHeaderField: "Content-Type")
        let body: [String: Any] = [
            "model": Settings.ollamaModel,
            "stream": false,
            "think": false,
            "keep_alive": "30m",
            "options": ["num_ctx": 8192, "temperature": 0.3, "num_predict": 400],
            "messages": [["role": "system", "content": system]] + messages.map { ["role": $0.role, "content": $0.content] },
        ]
        req.httpBody = try JSONSerialization.data(withJSONObject: body)
        let (data, resp) = try await URLSession.shared.data(for: req)
        let code = (resp as? HTTPURLResponse)?.statusCode ?? 0
        let text = String(data: data, encoding: .utf8) ?? ""
        if code == 404 || text.contains("not found") { throw Failure.badModel(Settings.ollamaModel) }
        guard code == 200 else { throw Failure.http(code, text) }
        let json = try JSONSerialization.jsonObject(with: data) as? [String: Any]
        let content = (json?["message"] as? [String: Any])?["content"] as? String ?? ""
        // На случай, если модель всё-таки «подумала» вслух.
        let clean = content.replacingOccurrences(of: #"(?s)<think>.*?</think>"#, with: "", options: .regularExpression)
        return clean.trimmingCharacters(in: .whitespacesAndNewlines)
    }

    static func reachable() async -> Bool {
        var req = URLRequest(url: Settings.ollamaURL.appendingPathComponent("api/tags"))
        req.timeoutInterval = 2
        return (try? await URLSession.shared.data(for: req)).map { ($0.1 as? HTTPURLResponse)?.statusCode == 200 } ?? false
    }

    @MainActor
    private static func launchOllama() -> Bool {
        guard let app = NSWorkspace.shared.urlForApplication(withBundleIdentifier: "com.electron.ollama")
                ?? URL(string: "file:///Applications/Ollama.app") else { return false }
        let cfg = NSWorkspace.OpenConfiguration()
        cfg.activates = false
        cfg.hides = true
        NSWorkspace.shared.openApplication(at: app, configuration: cfg)
        return true
    }
}
