import { NextResponse } from "next/server";
import { sessionCookie, sessionUser } from "@/lib/session";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import { isValidPassword } from "@/lib/pin";
import { hashPassword, verifyPassword } from "@/lib/auth";

/** Любой пользователь меняет свой пароль, зная текущий. Другие устройства разлогиниваются. */
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
  if (!me || !verifyPassword(String(current || ""), me.password)) {
    return NextResponse.json({ ok: false, error: "Текущий пароль неверный" }, { status: 403 });
  }
  const updated = { ...me, password: hashPassword(password) };
  await saveSharedState({ ...state, users: state.users.map((u) => (u.id === me.id ? updated : u)) });
  const res = NextResponse.json({ ok: true });
  const c = sessionCookie(updated);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
