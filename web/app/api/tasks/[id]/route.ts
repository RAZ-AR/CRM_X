import { NextResponse } from "next/server";
import { getPrisma } from "@/lib/prisma";
import { loadDbState } from "@/lib/persist";
import { sessionUser } from "@/lib/session";
import { canEditTask, canWorkTask } from "@/lib/access";
import { canMoveStatus } from "@/lib/taskRules";
import type { Task } from "@/lib/types";

const WORK = ["status", "result", "blockReason", "attachments"] as const;

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const prisma = getPrisma();
  if (!prisma) return NextResponse.json({ ok: false, local: true }, { status: 503 });
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { id } = await ctx.params;
  const patch = (await req.json()) as Partial<Task>;
  const state = await loadDbState(prisma);
  const prev = state.tasks.find((t) => t.id === id);
  if (!prev) return NextResponse.json({ ok: false, error: "Нет задачи" }, { status: 404 });
  const edit = canEditTask(user, prev);
  const work = canWorkTask(user, prev);
  if (!work && !edit) return NextResponse.json({ ok: false, error: "Нет доступа" }, { status: 403 });

  const nextPatch: Partial<Task> = {};
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (edit || (work && (WORK as readonly string[]).includes(k))) {
      (nextPatch as Record<string, unknown>)[k] = v;
    }
  }
  if (nextPatch.status && nextPatch.status !== prev.status) {
    const check = canMoveStatus(prev, nextPatch.status, state.tasks, user, {
      result: nextPatch.result,
      blockReason: nextPatch.blockReason,
    });
    if (!check.ok) return NextResponse.json({ ok: false, error: check.error }, { status: 400 });
  }

  const data: Record<string, unknown> = {};
  const jsonKeys = new Set(["zones", "participantIds", "attachments", "dependsOn"]);
  for (const [k, v] of Object.entries(nextPatch)) {
    data[k] = jsonKeys.has(k) ? v : v;
  }

  const row = await prisma.task.update({ where: { id }, data: data as never });
  return NextResponse.json({ ok: true, task: row });
}
