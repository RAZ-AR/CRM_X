import AppKit

// `Quicky --update-dry-run [путь.dmg]` — проверить обновление на временной копии и выйти (без UI).
let args = CommandLine.arguments
if let i = args.firstIndex(of: "--update-dry-run") {
    final class Box: @unchecked Sendable { var code: Int32 = 1 }
    let box = Box(), done = DispatchSemaphore(value: 0)
    let dmg = i + 1 < args.count ? args[i + 1] : nil
    Task.detached { box.code = await Updater.dryRun(localDMG: dmg); done.signal() }
    done.wait()
    exit(box.code)
}

MainActor.assumeIsolated {
    let app = NSApplication.shared
    let delegate = AppDelegate()
    app.delegate = delegate
    app.setActivationPolicy(.accessory)
    app.run()
}
