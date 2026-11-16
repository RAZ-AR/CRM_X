import { NextResponse } from "next/server";
import { HelixError, runHelixSync } from "@/lib/helixSync";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Синхронизация Helix → Quicky по расписанию. Вызывает GitHub Actions (.github/workflows/helix-sync.yml)
 * раз в 6 часов: Authorization: Bearer $CRON_SECRET. ?dry=1 — посчитать, ничего не записывая.
 * Env: HELIX_USERNAME, HELIX_PASSWORD, [HELIX_URL], [HELIX_USER_MAP — JSON {"Имя в Helix": "id пользователя"}].
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const dry = new URL(req.url).searchParams.get("dry") === "1";
  try {
    return NextResponse.json({ ok: true, ...(await runHelixSync({ dry })) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("helix sync", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: e instanceof HelixError ? 502 : 500 });
  }
}
