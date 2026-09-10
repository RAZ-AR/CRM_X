import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true });
  const { email, password } = await req.json();
  const user = await prisma.user.findFirst({
    where: { email, password },
  });
  if (!user) return NextResponse.json({ ok: false }, { status: 401 });
  const res = NextResponse.json({ ok: true, user });
  res.cookies.set("crmx_uid", user.id, { httpOnly: true, sameSite: "lax", path: "/" });
  return res;
}
