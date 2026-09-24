import { NextResponse } from "next/server";
import { loadSessionSecret, loadSharedState, updateSharedState } from "@/lib/blobState";
import { appUrlFrom, digestFor, ensureMenuButton, escapeHtml, readLinkCode, sendTo, tg, webhookSecret } from "@/lib/telegram";
import { shortDate, todayYerevan } from "@/lib/dates";
import { parseQuickTask, quickTaskToTask } from "@/lib/quickTask";
import { parseQuickTodo, todoPrefix } from "@/lib/quickTodo";
import type { Todo } from "@/lib/types";
import { created, withActivity } from "@/lib/activity";
import { randomBytes } from "node:crypto";

type Update = { message?: { chat: { id: number }; text?: string } };

const HELP =
  "Напишите задачу обычным сообщением — она попадёт в бэклог:\n«Купить упаковку до 15.10 #wafl @karina»\n(срок: до ДД.ММ / завтра / сегодня, проект: #wafl #kitchen #cafe #comx #common, исполнитель: @логин)\n\nЛичное дело с напоминанием — начните с «дело»:\n«дело: позвонить электрику завтра 10:00»\n(время: 18:00 / сегодня / завтра / ДД.ММ / через 2 часа, повтор: каждый день / по будням / каждую неделю)\n\nКоманды:\n/today — что делать сегодня\n/todos — мои дела\n/stop — отключить уведомления\n\nCRM открывается кнопкой меню «CRM» слева от поля ввода.\nПодключить: CRM → Мой профиль → «Подключить Telegram».";

/** Вебхук бота: /start <код> привязывает чат к пользователю CRM, /today, /stop. */
export async function POST(req: Request) {
  const secret = await loadSessionSecret();
  if (req.headers.get("x-telegram-bot-api-secret-token") !== webhookSecret(secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const update = (await req.json()) as Update;
  const msg = update.message;
  if (!msg?.text) return NextResponse.json({ ok: true });
  const chatId = String(msg.chat.id);
  await ensureMenuButton(appUrlFrom(req));
  const reply = (text: string) => tg("sendMessage", { chat_id: chatId, text, parse_mode: "HTML", link_preview_options: { is_disabled: true } });
  const [cmd, arg] = msg.text.trim().split(/\s+/, 2);
  const { state } = await loadSharedState();
  const linked = state.users.find((u) => u.telegramChatId === chatId);

  if (cmd === "/start" && arg) {
    const uid = readLinkCode(arg, secret);
    const user = uid ? state.users.find((u) => u.id === uid) : undefined;
    if (!user) {
      await reply("Ссылка устарела. Откройте CRM → Мой профиль → «Подключить Telegram» ещё раз.");
      return NextResponse.json({ ok: true });
    }
    const { saved } = await updateSharedState((s) => {
      const users = s.users.map((u) =>
        u.id === user.id ? { ...u, telegramChatId: chatId } : u.telegramChatId === chatId ? { ...u, telegramChatId: undefined } : u,
      );
      const next = { ...s, users };
      return { state: next, result: { saved: next } };
    });
    await reply(
      `✅ Готово, ${escapeHtml(user.name)}! Сюда будут приходить новые задачи, смены статусов и утренний список в 9:00.\n\n${HELP}`,
    );
    await reply(digestFor(saved, { ...user, telegramChatId: chatId }, todayYerevan(), appUrlFrom(req)));
    return NextResponse.json({ ok: true });
  }
  if (!linked) {
    await reply(`Этот чат не привязан к CRM X.\n\n${HELP}`);
    return NextResponse.json({ ok: true });
  }
  const todoText = todoPrefix(msg.text);
  if (cmd === "/today") {
    await reply(digestFor(state, linked, todayYerevan(), appUrlFrom(req)));
  } else if (cmd === "/todos") {
    const mine = (state.todos ?? []).filter((t) => t.userId === linked.id && !t.done);
    const when = (iso: string) =>
      new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Yerevan", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
    await reply(
      mine.length
        ? `✅ <b>Мои дела</b> (${mine.length})\n` + mine.slice(0, 20).map((t) => `• ${escapeHtml(t.text)}${t.remindAt ? ` — ⏰ ${when(t.remindAt)}` : ""}`).join("\n")
        : "Открытых дел нет. Добавьте: «дело: позвонить электрику завтра 10:00»",
    );
  } else if (todoText !== null) {
    const q = parseQuickTodo(todoText, Date.now());
    if ("error" in q) {
      await reply(q.error);
      return NextResponse.json({ ok: true });
    }
    const todo: Todo = {
      id: `td-${randomBytes(5).toString("hex")}`,
      userId: linked.id,
      text: q.text,
      done: false,
      remindAt: q.remindAt,
      repeat: q.repeat,
      createdAt: new Date().toISOString(),
    };
    await updateSharedState((s) => ({ state: { ...s, todos: [todo, ...(s.todos ?? [])] }, result: {} }));
    const when = q.remindAt
      ? new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Yerevan", weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(q.remindAt))
      : null;
    const rep = { none: "", daily: ", каждый день", weekdays: ", по будням", weekly: ", каждую неделю" }[q.repeat];
    await reply(
      `✅ Дело добавлено: ${escapeHtml(q.text)}\n` +
        (when ? `⏰ Напомню ${when}${rep}` : "Без напоминания — добавьте время, например «завтра 10:00».") +
        `\n<a href="${escapeHtml(appUrlFrom(req))}/todo">Мои дела в CRM</a>`,
    );
  } else if (!cmd.startsWith("/")) {
    const today = todayYerevan();
    const q = parseQuickTask(msg.text, today, state.zones, state.users, linked);
    if ("error" in q) {
      await reply(q.error);
      return NextResponse.json({ ok: true });
    }
    const task = quickTaskToTask(q, linked, today, `t-${randomBytes(4).toString("hex")}`);
    await updateSharedState((s) => ({
      state: withActivity({ ...s, tasks: [task, ...s.tasks] }, [created(linked, task)]),
      result: {},
    }));
    const who = state.users.find((u) => u.id === task.assigneeId);
    const zone = state.zones.find((z) => z.slug === task.zone);
    let delivery = "";
    if (who && who.id !== linked.id) {
      const ok = await sendTo(who, `🆕 Новая задача от ${escapeHtml(linked.name)}: ${escapeHtml(task.title)}\nСрок: ${shortDate(task.due)}`);
      if (!ok) {
        delivery = who.telegramChatId
          ? `\n⚠️ ${escapeHtml(who.name)} не получил(а) уведомление — Telegram не принял сообщение.`
          : `\n⚠️ ${escapeHtml(who.name)} не подключил(а) Telegram — уведомление не отправлено, предупредите лично.`;
      }
    }
    await reply(
      `✅ Задача в бэклоге: <a href="${escapeHtml(appUrlFrom(req))}/tasks/${task.id}">${escapeHtml(task.title)}</a>\n` +
        `Срок ${shortDate(task.due)} · ${escapeHtml(zone ? `${zone.emoji} ${zone.name}` : task.zone)} · ${escapeHtml(who?.name ?? "")}\n` +
        `Добавьте «готово когда» в CRM.${q.note ? `\n${escapeHtml(q.note)}` : ""}${delivery}`,
    );
  } else if (cmd === "/stop") {
    await updateSharedState((s) => ({
      state: { ...s, users: s.users.map((u) => (u.id === linked.id ? { ...u, telegramChatId: undefined } : u)) },
      result: {},
    }));
    await reply("Уведомления отключены. Подключить снова: CRM → Мой профиль.");
  } else {
    await reply(HELP);
  }
  return NextResponse.json({ ok: true });
}
