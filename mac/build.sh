#!/bin/bash
# Собирает «Quicky.app» рядом со скриптом. Использование: ./build.sh [--install]
set -euo pipefail
cd "$(dirname "$0")"
DESIGN=../design/quicky

swift build -c release

# Иконка: icon.svg → AppIcon.icns (пересобирается, только если svg новее)
mkdir -p Resources
if [[ ! -f Resources/AppIcon.icns || "$DESIGN/icon.svg" -nt Resources/AppIcon.icns ]]; then
  TMP=$(mktemp -d)
  qlmanage -t -s 1024 -o "$TMP" "$DESIGN/icon.svg" >/dev/null 2>&1
  SET="$TMP/AppIcon.iconset"; mkdir -p "$SET"
  for s in 16 32 128 256 512; do
    sips -z $s $s "$TMP/icon.svg.png" --out "$SET/icon_${s}x${s}.png" >/dev/null
    sips -z $((s*2)) $((s*2)) "$TMP/icon.svg.png" --out "$SET/icon_${s}x${s}@2x.png" >/dev/null
  done
  iconutil -c icns "$SET" -o Resources/AppIcon.icns
  rm -rf "$TMP"
fi

APP="Quicky.app"
rm -rf "$APP" "CRM X.app"
mkdir -p "$APP/Contents/MacOS" "$APP/Contents/Resources/quicky"
cp .build/release/CRMXBar "$APP/Contents/MacOS/Quicky"
cp Resources/AppIcon.icns "$APP/Contents/Resources/AppIcon.icns"
cp "$DESIGN/index.html" "$DESIGN/logo.svg" "$DESIGN/icon.svg" "$APP/Contents/Resources/quicky/"
cat > "$APP/Contents/Info.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>CFBundleName</key><string>Quicky</string>
  <key>CFBundleDisplayName</key><string>Quicky</string>
  <key>CFBundleIdentifier</key><string>app.crmx.bar</string>
  <key>CFBundleExecutable</key><string>Quicky</string>
  <key>CFBundleIconFile</key><string>AppIcon</string>
  <key>CFBundlePackageType</key><string>APPL</string>
  <key>CFBundleShortVersionString</key><string>0.2.0</string>
  <key>CFBundleVersion</key><string>2</string>
  <key>LSMinimumSystemVersion</key><string>14.0</string>
  <key>LSUIElement</key><true/>
  <key>NSAppTransportSecurity</key><dict><key>NSAllowsLocalNetworking</key><true/></dict>
</dict></plist>
PLIST
codesign --force --deep --sign - "$APP"
echo "Built $(pwd)/$APP"
if [[ "${1:-}" == "--install" ]]; then
  pkill -x Quicky || true
  pkill -x CRMXBar || true
  rm -rf "/Applications/$APP" && cp -R "$APP" /Applications/
  open "/Applications/$APP"
  echo "Installed to /Applications"
fi
