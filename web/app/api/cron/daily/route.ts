import { NextResponse } from "next/server";
import { sendMorningDigests } from "@/lib/digest";
import { appUrlFrom } from "@/lib/telegram";

/** Vercel Cron (web/vercel.json), каждый день 05:00 UTC = 09:00 Ереван. */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const sent = await sendMorningDigests(appUrlFrom(req));
  return NextResponse.json({ ok: true, sent });
}
