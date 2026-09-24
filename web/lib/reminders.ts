import { updateSharedState } from "./blobState";
import { dueReminders, fireReminders } from "./todos";
import { escapeHtml, sendTo, telegramEnabled } from "./telegram";
import type { AppState } from "./types";

let lastRun = 0;

/**
 * Напоминания по делам в Telegram. Точного планировщика на Vercel нет, поэтому проверяем «попутно»:
 * при опросе состояния (не чаще раза в 20 секунд на инстанс) и в утреннем cron.
 * Шлём только тем, у кого подключён Telegram; остальным напомнит сам браузер.
 */
export async function sendDueReminders(snapshot: AppState | null, appUrl: string) {
  if (!telegramEnabled()) return 0;
  const now = Date.now();
  const linked = (s: AppState) => new Set(s.users.filter((u) => u.telegramChatId).map((u) => u.id));
  if (snapshot) {
    const ids = linked(snapshot);
    if (!dueReminders(snapshot.todos ?? [], now).some((t) => ids.has(t.userId))) return 0;
  }
  if (now - lastRun < 20_000) return 0;
  lastRun = now;
  const out = await updateSharedState((state) => {
    const ids = linked(state);
    const r = fireReminders(state, now, (t) => ids.has(t.userId));
    return { state: r.state, result: { fired: r.fired, users: state.users } };
  });
  let sent = 0;
  for (const t of out.fired) {
    const u = out.users.find((x) => x.id === t.userId);
    const link = `${escapeHtml(appUrl).replace(/"/g, "&quot;")}/todo`;
    if (await sendTo(u, `⏰ <b>Напоминание</b>\n${escapeHtml(t.text)}\n\n<a href="${link}">Открыть дела</a>`)) sent += 1;
  }
  return sent;
}
