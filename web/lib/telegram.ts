import { createHash, createHmac } from "node:crypto";
import type { AppState, Task, User } from "./types";
import { canSeeTask, isCpo } from "./access";
import { diffDays, shortDate } from "./dates";

/** Только сервер: Telegram-бот для уведомлений команды. */

const token = () => process.env.TELEGRAM_BOT_TOKEN || "";

export function telegramEnabled() {
  return Boolean(token());
}

export async function tg<T = unknown>(method: string, body: Record<string, unknown>): Promise<T | null> {
  if (!token()) return null;
  try {
    const res = await fetch(`https://api.telegram.org/bot${token()}/${method}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { ok: boolean; result: T; description?: string };
    if (!data.ok) console.warn("telegram", method, data.description);
    return data.ok ? data.result : null;
  } catch (e) {
    console.warn("telegram", method, e);
    return null;
  }
}

export function escapeHtml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** true — Telegram принял сообщение. */
export async function sendTo(user: User | undefined, html: string): Promise<boolean> {
  if (!user?.telegramChatId) return false;
  const ok = await tg("sendMessage", {
    chat_id: user.telegramChatId,
    text: html,
    parse_mode: "HTML",
    link_preview_options: { is_disabled: true },
  });
  return ok !== null;
}

let username: string | null = null;
export async function botUsername() {
  if (username) return username;
  const me = await tg<{ username: string }>("getMe", {});
  username = me?.username ?? null;
  return username;
}

export function webhookSecret(sessionSecret: string) {
  return createHash("sha256").update(`crmx-telegram:${sessionSecret}`).digest("hex").slice(0, 48);
}

/** Код для t.me/bot?start=… : id пользователя + срок + подпись (символы A-Za-z0-9_-). */
export function linkCode(userId: string, sessionSecret: string) {
  const body = `${userId}_${(Date.now() + 30 * 60 * 1000).toString(36)}`;
  const sig = createHmac("sha256", sessionSecret).update(`tg-link:${body}`).digest("base64url").slice(0, 16);
  return `${body}_${sig}`;
}

export function readLinkCode(code: string, sessionSecret: string): string | null {
  if (code.length < 20) return null;
  const sig = code.slice(-16);
  const body = code.slice(0, -17);
  const expected = createHmac("sha256", sessionSecret).update(`tg-link:${body}`).digest("base64url").slice(0, 16);
  if (sig !== expected) return null;
  const cut = body.lastIndexOf("_");
  const exp = parseInt(body.slice(cut + 1), 36);
  if (!Number.isFinite(exp) || exp < Date.now()) return null;
  return body.slice(0, cut);
}

const line = (t: Task, tail: string) => `• <b>${escapeHtml(t.code || "")}</b> ${escapeHtml(t.title)} — ${tail}`;

function section(title: string, list: Task[], tail: (t: Task) => string, limit = 8) {
  if (!list.length) return "";
  const more = list.length > limit ? `\n…и ещё ${list.length - limit}` : "";
  return `\n\n${title} (${list.length}):\n${list.slice(0, limit).map((t) => line(t, tail(t))).join("\n")}${more}`;
}

/** Утренний список: просрочено, сдать сегодня, в работе; Owner — плюс сводка по команде. */
export function digestFor(state: AppState, user: User, today: string, appUrl: string) {
  const open = state.tasks.filter((t) => t.status !== "done");
  const mine = open.filter((t) => t.assigneeId === user.id);
  const overdue = mine.filter((t) => t.due < today).sort((a, b) => a.due.localeCompare(b.due));
  const dueToday = mine.filter((t) => t.due === today);
  const inWindow = (t: Task) => (t.startDate || t.due) <= today && t.due > today;
  const byDue = (a: Task, b: Task) => a.due.localeCompare(b.due);
  const active = mine.filter((t) => t.status === "in_progress" && inWindow(t)).sort(byDue);
  const toStart = mine.filter((t) => t.status === "todo" && inWindow(t)).sort(byDue);
  const blocked = mine.filter((t) => t.status === "blocked" && t.due >= today).sort(byDue);

  let text = `☀️ <b>Доброе утро, ${escapeHtml(user.name)}!</b> ${shortDate(today)}`;
  text += section("🔥 Просрочено", overdue, (t) => `до ${shortDate(t.due)}`);
  text += section("📌 Сдать сегодня", dueToday, () => "сегодня");
  text += section("▶️ В работе", active, (t) => `до ${shortDate(t.due)}`);
  text += section("⏭ Пора начать", toStart, (t) => `до ${shortDate(t.due)}`);
  text += section("⛔ Заблокировано", blocked, (t) => (t.blockReason ? escapeHtml(t.blockReason) : `до ${shortDate(t.due)}`));
  if (![overdue, dueToday, active, toStart, blocked].some((l) => l.length)) text += "\n\nНа сегодня задач нет.";

  if (isCpo(user)) {
    const team = open.filter((t) => t.due < today && t.assigneeId !== user.id && canSeeTask(user, t, state.users));
    const cp = open.filter((t) => t.criticalPath && t.due < today);
    if (team.length || cp.length) {
      text += `\n\n👥 Команда: просрочено ${team.length}`;
      if (cp.length) text += `, из них critical path ${cp.filter((t) => t.assigneeId !== user.id).length}`;
      const byPerson = new Map<string, number>();
      for (const t of team) byPerson.set(t.assigneeId, (byPerson.get(t.assigneeId) ?? 0) + 1);
      for (const [id, n] of byPerson) {
        const u = state.users.find((x) => x.id === id);
        text += `\n• ${escapeHtml(u?.name ?? id)}: ${n}`;
      }
    }
  }

  const launches = state.zones
    .filter((z) => z.slug !== "common" && z.deadline >= today)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 2)
    .map((z) => `до ${z.emoji} ${escapeHtml(z.name)} ${diffDays(today, z.deadline)} дн`);
  if (launches.length) text += `\n\n⏳ ${launches.join(" · ")}`;
  text += `\n\n<a href="${escapeHtml(appUrl).replace(/"/g, "&quot;")}/week">Открыть неделю в CRM</a>`;
  return text;
}

export function taskLink(appUrl: string, t: Task) {
  const href = escapeHtml(`${appUrl}/tasks/${encodeURIComponent(t.id)}`).replace(/"/g, "&quot;");
  return `<a href="${href}">${escapeHtml(t.code ? `${t.code} ` : "")}${escapeHtml(t.title)}</a>`;
}

export function appUrlFrom(req: Request) {
  return process.env.APP_URL || new URL(req.url).origin;
}
