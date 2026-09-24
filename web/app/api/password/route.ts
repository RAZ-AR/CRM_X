import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import { isValidPassword } from "@/lib/pin";

/** Любой пользователь меняет свой пароль, зная текущий. */
export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { current, next } = (await req.json()) as { current?: string; next?: string };
  const password = String(next || "").trim();
  if (!isValidPassword(password)) {
    return NextResponse.json({ ok: false, error: "Пароль — минимум 4 символа" }, { status: 400 });
  }
  const { state } = await loadSharedState();
  const me = state.users.find((u) => u.id === user.id);
  if (!me || me.password !== String(current || "")) {
    return NextResponse.json({ ok: false, error: "Текущий пароль неверный" }, { status: 403 });
  }
  const users = state.users.map((u) => (u.id === me.id ? { ...u, password } : u));
  await saveSharedState({ ...state, users });
  return NextResponse.json({ ok: true });
}
