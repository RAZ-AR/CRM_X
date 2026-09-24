import { NextResponse } from "next/server";
import { sessionCookie, sessionUser } from "@/lib/session";
import { updateSharedState } from "@/lib/blobState";
import type { User } from "@/lib/types";
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
  const hashed = hashPassword(password);
  const { updated } = await updateSharedState<{ updated: User | null }>((state) => {
    const me = state.users.find((u) => u.id === user.id);
    if (!me || !verifyPassword(String(current || ""), me.password)) return { result: { updated: null } };
    const updated = { ...me, password: hashed };
    return { state: { ...state, users: state.users.map((u) => (u.id === me.id ? updated : u)) }, result: { updated } };
  });
  if (!updated) return NextResponse.json({ ok: false, error: "Текущий пароль неверный" }, { status: 403 });
  const res = NextResponse.json({ ok: true });
  const c = await sessionCookie(updated);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
