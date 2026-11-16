#!/bin/bash
# Собирает Quicky.app и упаковывает в dist/Quicky-<версия>.dmg (перетащить в «Программы»).
set -euo pipefail
cd "$(dirname "$0")"
./build.sh
VERSION=$(plutil -extract CFBundleShortVersionString raw Quicky.app/Contents/Info.plist)
STAGE=$(mktemp -d)
cp -R Quicky.app "$STAGE/"
ln -s /Applications "$STAGE/Applications"
# Иконка подключённого тома — та же буква Q.
cp Resources/AppIcon.icns "$STAGE/.VolumeIcon.icns"
command -v SetFile >/dev/null && SetFile -a C "$STAGE" || true
mkdir -p dist
DMG="dist/Quicky-$VERSION.dmg"
rm -f "$DMG"
hdiutil create -volname "Quicky" -srcfolder "$STAGE" -fs HFS+ -format UDZO -imagekey zlib-level=9 -ov "$DMG" >/dev/null
rm -rf "$STAGE"
codesign --force --sign - "$DMG" 2>/dev/null || true
shasum -a 256 "$DMG"
echo "Built $(pwd)/$DMG"
