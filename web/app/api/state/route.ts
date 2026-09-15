import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { loadDbState, saveDbState } from "@/lib/persist";
import { normalizeState } from "@/lib/normalize";
import { seed } from "@/lib/seed";
import type { AppState } from "@/lib/types";
import { sessionUser } from "@/lib/session";
import { canManagePeople } from "@/lib/access";
import { filterState, mergeState } from "@/lib/publicUser";

export async function GET() {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true });
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const count = await prisma.user.count();
    if (count === 0) await saveDbState(prisma, seed);
    const state = await loadDbState(prisma);
    return NextResponse.json({ ok: true, state: filterState(state, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "db";
    return NextResponse.json({ ok: false, local: true, error: msg });
  }
}

export async function PUT(req: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true }, { status: 503 });
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const body = (await req.json()) as { state?: AppState };
    if (!body.state) return NextResponse.json({ ok: false }, { status: 400 });
    const existing = await loadDbState(prisma);
    const merged = mergeState(existing, normalizeState(body.state), user);
    await saveDbState(prisma, merged);
    return NextResponse.json({ ok: true, state: filterState(merged, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "db";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true });
  const user = await sessionUser();
  if (!user || !canManagePeople(user)) {
    return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  }
  const body = await req.json();
  if (!body.reset) return NextResponse.json({ ok: false }, { status: 400 });
  try {
    await saveDbState(prisma, seed);
    return NextResponse.json({ ok: true, seeded: true });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "db";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
