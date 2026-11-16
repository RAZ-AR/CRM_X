#!/bin/bash
# Ставит синхронизацию Helix → CRM X на этот Mac:
#   ~/.local/share/quicky-sync/   скрипт + зависимость pg (вне iCloud, чтобы launchd мог читать)
#   ~/.config/quicky/helix.env    настройки и пароли (создаётся один раз, права 600)
#   ~/Library/LaunchAgents/am.quicky.helix-sync.plist   запуск каждые 2,5 часа
# Повторный запуск обновляет скрипт и не трогает helix.env.
set -euo pipefail
cd "$(dirname "$0")"
DEST="$HOME/.local/share/quicky-sync"
CONF="$HOME/.config/quicky/helix.env"
PLIST="$HOME/Library/LaunchAgents/am.quicky.helix-sync.plist"
LOG="$HOME/Library/Logs/quicky-helix-sync.log"
NODE="$(command -v node)"
INTERVAL="${INTERVAL:-9000}"   # секунд: 9000 = 2,5 часа

mkdir -p "$DEST" "$(dirname "$CONF")" "$(dirname "$PLIST")" "$(dirname "$LOG")"
cp helix-sync.mjs "$DEST/"
if [[ ! -d "$DEST/node_modules/pg" ]]; then
  (cd "$DEST" && [[ -f package.json ]] || echo '{"name":"quicky-sync","private":true,"type":"module"}' > package.json
   cd "$DEST" && npm install --no-audit --no-fund --silent pg@8.13.1)
fi

if [[ ! -f "$CONF" ]]; then
  # DATABASE_URL базы CRM X можно передать при установке: DATABASE_URL=... ./install.sh
  DBURL="${DATABASE_URL:-}"
  umask 077
  cat > "$CONF" <<ENV
# Синхронизация Helix → CRM X. Впишите логин и пароль Helix.
HELIX_URL=https://helixarm.am/team
HELIX_USERNAME=
HELIX_PASSWORD=
HELIX_ME=Armen Razmikovich
CRMX_ME_ID=u-armen
DATABASE_URL=$DBURL
ENV
  chmod 600 "$CONF"
  echo "Создан $CONF — впишите HELIX_USERNAME и HELIX_PASSWORD."
fi

cat > "$PLIST" <<PL
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>am.quicky.helix-sync</string>
  <key>ProgramArguments</key><array><string>$NODE</string><string>$DEST/helix-sync.mjs</string></array>
  <key>StartInterval</key><integer>$INTERVAL</integer>
  <key>RunAtLoad</key><false/>
  <key>StandardOutPath</key><string>$LOG</string>
  <key>StandardErrorPath</key><string>$LOG</string>
</dict></plist>
PL
launchctl bootout "gui/$(id -u)/am.quicky.helix-sync" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$PLIST"
echo "Готово: синхронизация каждые $((INTERVAL/60)) мин. Лог: $LOG"
echo "Запустить сейчас:  launchctl kickstart gui/$(id -u)/am.quicky.helix-sync"
