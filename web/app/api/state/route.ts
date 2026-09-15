import { NextResponse } from "next/server";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import { normalizeState } from "@/lib/normalize";
import { seed } from "@/lib/seed";
import type { AppState } from "@/lib/types";
import { sessionUser } from "@/lib/session";
import { canManagePeople } from "@/lib/access";
import { filterState, mergeState } from "@/lib/publicUser";

export async function GET() {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const { state, via } = await loadSharedState();
    return NextResponse.json({ ok: true, via, me: user.id, state: filterState(state, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "store";
    return NextResponse.json({ ok: false, local: true, error: msg });
  }
}

export async function PUT(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const body = (await req.json()) as { state?: AppState };
    if (!body.state) return NextResponse.json({ ok: false }, { status: 400 });
    const { state: existing } = await loadSharedState();
    const merged = mergeState(existing, normalizeState(body.state), user);
    const via = await saveSharedState(merged);
    return NextResponse.json({ ok: true, via, state: filterState(merged, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "store";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user || !canManagePeople(user)) {
    return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  }
  const body = await req.json();
  if (!body.reset) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    const via = await saveSharedState(seed);
    return NextResponse.json({ ok: true, seeded: true, via });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "store";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
