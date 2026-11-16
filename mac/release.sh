#!/bin/bash
# Выпуск новой версии Quicky: ./release.sh 0.6.1 "Что нового"
# Ставит версию в VERSION, собирает DMG и публикует релиз quicky-v<версия> в RAZ-AR/CRM_X.
# Установленные копии Quicky увидят его при следующей проверке (раз в 6 часов или «Проверить обновления»).
set -euo pipefail
cd "$(dirname "$0")"
NEW="${1:?Укажите версию, например: ./release.sh 0.6.1 \"Что нового\"}"
NOTES="${2:-Обновление Quicky}"
[[ "$NEW" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]] || { echo "Версия должна быть вида 0.6.1"; exit 1; }
echo "$NEW" > VERSION
QUICKY_VERSION="$NEW" ./make-dmg.sh
BUILT=$(plutil -extract CFBundleShortVersionString raw Quicky.app/Contents/Info.plist)
[[ "$BUILT" == "$NEW" ]] || { echo "Собралась версия $BUILT вместо $NEW — релиз не публикую."; exit 1; }
DMG="dist/Quicky-$NEW.dmg"
SHA=$(shasum -a 256 "$DMG" | awk '{print $1}')
REQ=$(codesign -dr - Quicky.app 2>&1)
[[ "$REQ" == *"certificate leaf"* ]] || { echo "Сборка подписана без сертификата — автообновление у пользователей не сработает. Остановлено."; exit 1; }
gh release create "quicky-v$NEW" "$DMG" --repo RAZ-AR/CRM_X --title "Quicky $NEW" --latest=false \
  --notes "$NOTES

SHA-256: $SHA"
echo "Опубликован релиз quicky-v$NEW (SHA-256 $SHA)"
