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
# Версию можно передать явно (так делает release.sh — iCloud иногда откатывает только что записанный файл).
VERSION="${QUICKY_VERSION:-$(tr -d '[:space:]' < VERSION)}"
BUILD="$(git rev-list --count HEAD 2>/dev/null || echo 1)"
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
  <key>CFBundleShortVersionString</key><string>$VERSION</string>
  <key>CFBundleVersion</key><string>$BUILD</string>
  <key>LSMinimumSystemVersion</key><string>14.0</string>
  <key>LSUIElement</key><true/>
  <key>NSAppTransportSecurity</key><dict><key>NSAllowsLocalNetworking</key><true/></dict>
</dict></plist>
PLIST
# Постоянный сертификат нужен для автообновления: новая версия должна быть подписана тем же ключом.
ID=$(security find-identity -p codesigning 2>/dev/null | awk -v n="${SIGN_IDENTITY:-Keyla Local Signing}" 'index($0, "\"" n "\"") {print $2; exit}')
if [[ -z "$ID" ]]; then
  echo "⚠️  Сертификат «${SIGN_IDENTITY:-Keyla Local Signing}» не найден — подписываю ad-hoc, автообновление работать не будет." >&2
fi
# iCloud Drive вешает на файлы расширенные атрибуты — codesign их не принимает.
xattr -cr "$APP"
codesign --force --deep --sign "${ID:--}" "$APP"
echo "Built $(pwd)/$APP"
if [[ "${1:-}" == "--install" ]]; then
  pkill -x Quicky || true
  pkill -x CRMXBar || true
  rm -rf "/Applications/$APP" && cp -R "$APP" /Applications/
  open "/Applications/$APP"
  echo "Installed to /Applications"
fi
