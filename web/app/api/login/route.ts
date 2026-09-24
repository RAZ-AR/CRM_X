import { NextResponse } from "next/server";
import { allUsers, findUserByLogin, sessionCookie } from "@/lib/session";
import { sameLogin } from "@/lib/pin";
import { publicUser } from "@/lib/publicUser";
import { isHashed, hashPassword, loginBlocked, loginFailed, loginSucceeded } from "@/lib/auth";
import { loadSharedState, saveSharedState } from "@/lib/blobState";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const login = String(email || "").trim().toLowerCase();
    const ip = (req.headers.get("x-forwarded-for") || "").split(",")[0].trim() || "local";
    const key = `${ip}:${login}`;
    if (loginBlocked(key)) {
      return NextResponse.json({ ok: false, error: "Слишком много попыток. Подождите 15 минут." }, { status: 429 });
    }
    let user = await findUserByLogin(login, String(password || ""));
    if (!user) {
      console.warn("login failed", { login, known: (await allUsers()).some((u) => sameLogin(u.email, login)) });
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
    const c = await sessionCookie(user);
    res.cookies.set(c.name, c.value, c.options);
    return res;
  } catch (e) {
    console.error("login error", e);
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: `Ошибка сервера: ${msg}` }, { status: 500 });
  }
}
