import { NextResponse } from "next/server";
import { findUserByLogin, UID_COOKIE } from "@/lib/session";
import { publicUser } from "@/lib/publicUser";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const user = await findUserByLogin(String(email || ""), String(password || ""));
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true, user: publicUser(user) });
  res.cookies.set(UID_COOKIE, user.id, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
    secure: process.env.NODE_ENV === "production",
  });
  return res;
}
