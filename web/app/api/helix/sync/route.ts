import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { HelixError, runHelixSync } from "@/lib/helixSync";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/** Кнопка «Синхронизировать» в CRM X и Quicky: подтянуть Helix сейчас, не дожидаясь расписания. */
export async function POST() {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    return NextResponse.json({ ok: true, ...(await runHelixSync({ by: user.name })) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("helix sync (button)", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: e instanceof HelixError ? 502 : 500 });
  }
}
