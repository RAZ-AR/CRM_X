import { NextResponse } from "next/server";
import { findUserByLogin, sessionCookie } from "@/lib/session";
import { publicUser } from "@/lib/publicUser";
import { isHashed, hashPassword, loginBlocked, loginFailed, loginSucceeded } from "@/lib/auth";
import { loadSharedState, saveSharedState } from "@/lib/blobState";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const login = String(email || "").trim().toLowerCase();
  const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
  const key = `${ip}:${login}`;
  if (loginBlocked(key)) {
    return NextResponse.json({ ok: false, error: "Слишком много попыток. Подождите 15 минут." }, { status: 429 });
  }
  let user = await findUserByLogin(login, String(password || ""));
  if (!user) {
    loginFailed(key);
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  loginSucceeded(key);
  if (!isHashed(user.password)) {
    // Старый пароль открытым текстом — перехэшируем при первом входе.
    const { state } = await loadSharedState();
    const hashed = hashPassword(String(password));
    await saveSharedState({
      ...state,
      users: state.users.map((u) => (u.id === user!.id ? { ...u, password: hashed } : u)),
    });
    user = { ...user, password: hashed };
  }
  const res = NextResponse.json({ ok: true, user: publicUser(user) });
  const c = sessionCookie(user);
  res.cookies.set(c.name, c.value, c.options);
  return res;
}
