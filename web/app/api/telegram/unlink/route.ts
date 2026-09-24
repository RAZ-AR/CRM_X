import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { updateSharedState } from "@/lib/blobState";

export async function POST() {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  await updateSharedState((state) => ({
    state: { ...state, users: state.users.map((u) => (u.id === user.id ? { ...u, telegramChatId: undefined } : u)) },
    result: {},
  }));
  return NextResponse.json({ ok: true });
}
