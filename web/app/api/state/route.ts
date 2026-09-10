import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPrisma } from "@/lib/prisma";
import { seed } from "@/lib/seed";

export async function GET() {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true, seed });
  const [users, zones, tasks, comments, subtasks, wiki, notices, contacts] =
    await Promise.all([
      prisma.user.findMany(),
      prisma.zone.findMany(),
      prisma.task.findMany(),
      prisma.comment.findMany(),
      prisma.subtask.findMany(),
      prisma.wikiPage.findMany(),
      prisma.notice.findMany(),
      prisma.contact.findMany(),
    ]);
  return NextResponse.json({
    ok: true,
    state: { users, zones, tasks, comments, subtasks, wiki, notices, contacts },
  });
}

export async function POST(req: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true });
  const body = await req.json();
  if (body.reset) {
    await prisma.notice.deleteMany();
    await prisma.comment.deleteMany();
    await prisma.subtask.deleteMany();
    await prisma.task.deleteMany();
    await prisma.wikiPage.deleteMany();
    await prisma.contact.deleteMany();
    await prisma.user.deleteMany();
    await prisma.zone.deleteMany();
    for (const z of seed.zones) await prisma.zone.create({ data: z as never });
    for (const u of seed.users) await prisma.user.create({ data: u as never });
    for (const t of seed.tasks) await prisma.task.create({ data: t as never });
    for (const w of seed.wiki) await prisma.wikiPage.create({ data: w as never });
    for (const c of seed.contacts) await prisma.contact.create({ data: c as never });
    for (const n of seed.notices) await prisma.notice.create({ data: n as never });
    return NextResponse.json({ ok: true, seeded: true });
  }
  return NextResponse.json({ ok: false }, { status: 400 });
}
