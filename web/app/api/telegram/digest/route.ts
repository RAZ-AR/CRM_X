import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { isCpo } from "@/lib/access";
import { sendMorningDigests } from "@/lib/digest";
import { appUrlFrom, telegramEnabled } from "@/lib/telegram";

/** Owner: разослать утренний список прямо сейчас (проверка бота). */
export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user || !isCpo(user)) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  if (!telegramEnabled()) return NextResponse.json({ ok: false, error: "Нет TELEGRAM_BOT_TOKEN" });
  const { sent, failed } = await sendMorningDigests(appUrlFrom(req));
  return NextResponse.json({ ok: failed === 0, sent, failed, error: failed ? `Telegram не принял ${failed} из ${sent + failed}` : undefined });
}
