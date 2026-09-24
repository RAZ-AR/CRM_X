import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { isCpo } from "@/lib/access";
import { loadSharedState } from "@/lib/blobState";
import { escapeHtml, sendTo, telegramEnabled } from "@/lib/telegram";

/** Owner: разослать повестку планёрки всем, кто подключил Telegram. */
export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user || !isCpo(user)) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  if (!telegramEnabled()) return NextResponse.json({ ok: false, error: "Бот не подключён: нет TELEGRAM_BOT_TOKEN" });
  const { text } = (await req.json()) as { text?: string };
  const body = String(text || "").slice(0, 3900);
  if (!body.trim()) return NextResponse.json({ ok: false, error: "Пустая повестка" }, { status: 400 });
  const { state } = await loadSharedState();
  let sent = 0;
  for (const u of state.users.filter((x) => x.telegramChatId)) {
    if (await sendTo(u, `📋 ${escapeHtml(body)}`)) sent += 1;
  }
  return NextResponse.json({ ok: true, sent });
}
