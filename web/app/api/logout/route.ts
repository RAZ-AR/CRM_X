import { NextResponse } from "next/server";
import { UID_COOKIE } from "@/lib/session";

export async function POST() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(UID_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
