import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { sessionUser } from "@/lib/session";
import type { Task } from "@/lib/types";

export async function POST(req: Request) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true }, { status: 503 });
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const body = (await req.json()) as Task;
  if (!body?.id || !body.title) return NextResponse.json({ ok: false }, { status: 400 });
  const row = await prisma.task.create({
    data: {
      id: body.id,
      title: body.title,
      description: body.description ?? "",
      zone: body.zone,
      zones: body.zones?.length ? body.zones : [body.zone],
      assigneeId: body.assigneeId,
      authorId: user.id,
      participantIds: body.participantIds ?? [],
      startDate: body.startDate || body.due,
      due: body.due,
      priority: body.priority,
      status: body.status || "todo",
      weight: body.weight ?? 1,
      criticalPath: Boolean(body.criticalPath),
      result: body.result ?? "",
      createdAt: body.createdAt || new Date().toISOString().slice(0, 10),
      attachments: body.attachments ?? [],
      code: body.code ?? "",
      wave: body.wave ?? "",
      workstream: body.workstream ?? "",
      dependsOn: body.dependsOn ?? [],
      blockReason: body.blockReason ?? "",
    } as never,
  });
  return NextResponse.json({ ok: true, task: row });
}
