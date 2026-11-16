// swift-tools-version:5.10
import PackageDescription

let package = Package(
    name: "CRMXBar",
    platforms: [.macOS(.v14)],
    targets: [
        .executableTarget(
            name: "CRMXBar",
            path: "Sources/CRMXBar",
            linkerSettings: [
                .linkedFramework("WebKit"),
                .linkedFramework("UserNotifications"),
            ]
        )
    ]
)
