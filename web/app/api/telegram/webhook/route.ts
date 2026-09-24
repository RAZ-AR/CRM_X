import { NextResponse } from "next/server";
import { loadSessionSecret, loadSharedState, saveSharedState } from "@/lib/blobState";
import { appUrlFrom, digestFor, escapeHtml, readLinkCode, tg, webhookSecret } from "@/lib/telegram";
import { todayYerevan } from "@/lib/dates";

type Update = { message?: { chat: { id: number }; text?: string } };

const HELP =
  "Команды:\n/today — что делать сегодня\n/stop — отключить уведомления\n\nПодключить: CRM → Мой профиль → «Подключить Telegram».";

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
    const users = state.users.map((u) =>
      u.id === user.id ? { ...u, telegramChatId: chatId } : u.telegramChatId === chatId ? { ...u, telegramChatId: undefined } : u,
    );
    await saveSharedState({ ...state, users });
    await reply(
      `✅ Готово, ${escapeHtml(user.name)}! Сюда будут приходить новые задачи, смены статусов и утренний список в 9:00.\n\n${HELP}`,
    );
    await reply(digestFor({ ...state, users }, { ...user, telegramChatId: chatId }, todayYerevan(), appUrlFrom(req)));
    return NextResponse.json({ ok: true });
  }
  if (!linked) {
    await reply(`Этот чат не привязан к CRM X.\n\n${HELP}`);
    return NextResponse.json({ ok: true });
  }
  if (cmd === "/today") {
    await reply(digestFor(state, linked, todayYerevan(), appUrlFrom(req)));
  } else if (cmd === "/stop") {
    await saveSharedState({
      ...state,
      users: state.users.map((u) => (u.id === linked.id ? { ...u, telegramChatId: undefined } : u)),
    });
    await reply("Уведомления отключены. Подключить снова: CRM → Мой профиль.");
  } else {
    await reply(HELP);
  }
  return NextResponse.json({ ok: true });
}
