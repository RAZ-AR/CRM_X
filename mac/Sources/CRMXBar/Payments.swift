import Foundation

/// Предстоящие оплаты из Google Sheets (таблица, открытая «всем по ссылке»; ключи Google не нужны).
/// Читается лист по имени (по умолчанию «Предстоящие оплаты») через gviz CSV, колонки ищутся по заголовкам.
enum Payments {
    struct Item: Codable, Equatable {
        let due: String        // YYYY-MM-DD или ""
        let project: String
        let title: String
        let amount: Double?
        let category: String
        let payee: String
        let status: String
        let priority: String
        let comment: String
        let paid: Bool
    }

    struct Failure: LocalizedError { let errorDescription: String? }

    static var sheetURL: String? {
        get { UserDefaults.standard.string(forKey: "paymentsSheet") }
        set { UserDefaults.standard.set(newValue, forKey: "paymentsSheet") }
    }
    static var sheetName: String { UserDefaults.standard.string(forKey: "paymentsSheetName") ?? "Предстоящие оплаты" }

    static func spreadsheetID(_ url: String) -> String? {
        guard let r = url.range(of: #"/spreadsheets/d/([A-Za-z0-9_-]{20,})"#, options: .regularExpression) else { return nil }
        return String(url[r]).components(separatedBy: "/d/").last
    }

    static func fetch() async throws -> [Item] {
        guard let url = sheetURL, let id = spreadsheetID(url) else { throw Failure(errorDescription: "таблица не подключена") }
        var c = URLComponents(string: "https://docs.google.com/spreadsheets/d/\(id)/gviz/tq")!
        c.queryItems = [.init(name: "tqx", value: "out:csv"), .init(name: "sheet", value: sheetName)]
        var req = URLRequest(url: c.url!)
        req.timeoutInterval = 30
        let (data, resp) = try await URLSession.shared.data(for: req)
        let code = (resp as? HTTPURLResponse)?.statusCode ?? 0
        let text = String(data: data, encoding: .utf8) ?? ""
        if code != 200 || text.hasPrefix("<") {
            throw Failure(errorDescription: "таблица недоступна (HTTP \(code)) — откройте доступ «Все, у кого есть ссылка: читатель»")
        }
        return parse(csv: text)
    }

    /// Разбор CSV и поиск колонок по заголовкам («Срок оплаты», «Сумма, AMD», «Статус»…).
    static func parse(csv: String) -> [Item] {
        let rows = parseCSV(csv)
        guard let h = rows.firstIndex(where: { $0.contains { $0.localizedCaseInsensitiveContains("сумма") } }) else { return [] }
        let head = rows[h].map { $0.lowercased() }
        func col(_ keys: String...) -> Int? { head.firstIndex { cell in keys.contains { cell.contains($0) } } }
        let iDue = col("срок"), iProj = col("концеп", "проект"), iTitle = col("наимен"), iSum = col("сумма"),
            iWhat = col("на что"), iTo = col("кому"), iStatus = col("статус"), iPrio = col("приоритет"),
            iNote = col("коммент"), iDone = col("в расходах")
        func v(_ r: [String], _ i: Int?) -> String { guard let i, i < r.count else { return "" }; return r[i].trimmingCharacters(in: .whitespacesAndNewlines) }
        return rows[(h + 1)...].compactMap { r in
            let title = v(r, iTitle)
            guard !title.isEmpty else { return nil }
            let status = v(r, iStatus)
            let paid = status.localizedCaseInsensitiveContains("оплачен") || v(r, iDone).lowercased().hasPrefix("да")
            let digits = v(r, iSum).replacingOccurrences(of: "\u{00A0}", with: "").replacingOccurrences(of: " ", with: "").replacingOccurrences(of: ",", with: ".")
            return Item(due: isoDate(v(r, iDue)), project: v(r, iProj), title: title, amount: Double(digits),
                        category: v(r, iWhat), payee: v(r, iTo), status: status, priority: v(r, iPrio),
                        comment: v(r, iNote), paid: paid)
        }
    }

    /// «09.11.2026» → «2026-11-09».
    static func isoDate(_ s: String) -> String {
        let p = s.split(separator: ".").map(String.init)
        guard p.count == 3, let d = Int(p[0]), let m = Int(p[1]), let y = Int(p[2]) else { return "" }
        return String(format: "%04d-%02d-%02d", y < 100 ? 2000 + y : y, m, d)
    }

    static func parseCSV(_ s: String) -> [[String]] {
        var rows: [[String]] = [], row: [String] = [], field = "", quoted = false
        var it = s.makeIterator()
        var pending: Character? = nil
        while let ch = pending ?? it.next() {
            pending = nil
            if quoted {
                if ch == "\"" {
                    if let next = it.next() { if next == "\"" { field.append("\"") } else { quoted = false; pending = next } }
                    else { quoted = false }
                } else { field.append(ch) }
            } else if ch == "\"" { quoted = true }
            else if ch == "," { row.append(field); field = "" }
            else if ch == "\n" || ch == "\r\n" { row.append(field); rows.append(row); row = []; field = "" }
            else if ch != "\r" { field.append(ch) }
        }
        if !field.isEmpty || !row.isEmpty { row.append(field); rows.append(row) }
        return rows
    }
}
