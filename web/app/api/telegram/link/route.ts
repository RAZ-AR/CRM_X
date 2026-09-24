import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { loadSessionSecret } from "@/lib/blobState";
import { appUrlFrom, botUsername, linkCode, telegramEnabled, tg, webhookSecret } from "@/lib/telegram";

/** Ссылка t.me/<бот>?start=<код>. Заодно (идемпотентно) ставит вебхук бота на этот сайт. */
export async function GET(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  if (!telegramEnabled()) {
    return NextResponse.json({ ok: false, error: "Бот ещё не подключён: Owner добавляет TELEGRAM_BOT_TOKEN в Vercel" });
  }
  const secret = await loadSessionSecret();
  const hook = await tg("setWebhook", {
    url: `${appUrlFrom(req)}/api/telegram/webhook`,
    secret_token: webhookSecret(secret),
    allowed_updates: ["message"],
  });
  const name = await botUsername();
  if (!hook || !name) return NextResponse.json({ ok: false, error: "Telegram не отвечает — проверьте токен бота" });
  return NextResponse.json({ ok: true, url: `https://t.me/${name}?start=${linkCode(user.id, secret)}` });
}
