import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { loadSharedState, saveSharedState } from "@/lib/blobState";

export async function POST() {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { state } = await loadSharedState();
  await saveSharedState({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? { ...u, telegramChatId: undefined } : u)),
  });
  return NextResponse.json({ ok: true });
}
