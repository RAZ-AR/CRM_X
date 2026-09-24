import { NextResponse } from "next/server";
import { allUsers, sessionCookie } from "@/lib/session";
import { verifyInitData } from "@/lib/telegram";

/** Вход из Telegram Mini App: подпись initData → сессия пользователя, привязавшего этот Telegram. */
export async function POST(req: Request) {
  const { initData } = (await req.json().catch(() => ({}))) as { initData?: string };
  const tgUser = verifyInitData(String(initData || ""));
  if (!tgUser) return NextResponse.json({ ok: false, error: "Не удалось проверить Telegram" }, { status: 401 });
  // В личке с ботом chat_id совпадает с id пользователя Telegram.
  const user = (await allUsers()).find((u) => u.telegramChatId === tgUser);
  if (!user) return NextResponse.json({ ok: false, error: "not_linked" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  const c = await sessionCookie(user);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
