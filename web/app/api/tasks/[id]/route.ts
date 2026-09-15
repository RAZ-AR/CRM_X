import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { canEditTask, canWorkTask } from "@/lib/access";
import { canMoveStatus } from "@/lib/taskRules";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import type { Task } from "@/lib/types";

const WORK = ["status", "result", "blockReason", "blockUntil", "blockFromStatus", "attachments"] as const;

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { id } = await ctx.params;
  const patch = (await req.json()) as Partial<Task>;
  const { state } = await loadSharedState();
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
      blockUntil: nextPatch.blockUntil,
    });
    if (!check.ok) return NextResponse.json({ ok: false, error: check.error }, { status: 400 });
  }
  const tasks = state.tasks.map((t) => (t.id === id ? { ...t, ...nextPatch } : t));
  await saveSharedState({ ...state, tasks });
  return NextResponse.json({ ok: true, task: tasks.find((t) => t.id === id) });
}
