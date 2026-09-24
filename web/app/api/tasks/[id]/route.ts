import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { canDeleteTask, canEditTask, canWorkTask } from "@/lib/access";
import { canMoveStatus } from "@/lib/taskRules";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import type { Task } from "@/lib/types";
import { deleted, taskChanges, withActivity } from "@/lib/activity";
import { statusMeta } from "@/lib/access";
import { appUrlFrom, escapeHtml, sendTo, taskLink } from "@/lib/telegram";
import { shortDate } from "@/lib/dates";

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
  const task = tasks.find((t) => t.id === id)!;
  await saveSharedState(withActivity({ ...state, tasks }, taskChanges(user, prev, task, state.users)));
  const url = appUrlFrom(req);
  const who = escapeHtml(user.name);
  const person = (uid: string) => (uid !== user.id ? state.users.find((u) => u.id === uid) : undefined);
  if (nextPatch.assigneeId && nextPatch.assigneeId !== prev.assigneeId) {
    await sendTo(person(task.assigneeId), `🆕 ${who} назначил вам задачу: ${taskLink(url, task)}\nСрок: ${shortDate(task.due)}`);
  }
  if (nextPatch.status && nextPatch.status !== prev.status && ["review", "done", "blocked"].includes(task.status)) {
    const m = statusMeta[task.status];
    const why = task.status === "blocked" && task.blockReason ? `\nПричина: ${escapeHtml(task.blockReason)}` : "";
    await sendTo(person(task.authorId), `${m.emoji} ${m.label}: ${taskLink(url, task)} — ${who}${why}`);
  }
  return NextResponse.json({ ok: true, task });
}

export async function DELETE(_req: Request, ctx: { params: Promise<{ id: string }> }) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { id } = await ctx.params;
  const { state } = await loadSharedState();
  const task = state.tasks.find((t) => t.id === id);
  if (!task) return NextResponse.json({ ok: true, gone: true });
  if (!canDeleteTask(user, task)) {
    return NextResponse.json({ ok: false, error: "Удалять можно только свои задачи" }, { status: 403 });
  }
  const tasks = state.tasks
    .filter((t) => t.id !== id)
    .map((t) =>
      task.code && (t.dependsOn ?? []).includes(task.code)
        ? { ...t, dependsOn: t.dependsOn.filter((c) => c !== task.code) }
        : t,
    );
  await saveSharedState(
    withActivity(
      {
        ...state,
        tasks,
        comments: state.comments.filter((c) => c.taskId !== id),
        subtasks: state.subtasks.filter((s) => s.taskId !== id),
        notices: state.notices.filter((n) => n.taskId !== id),
      },
      [deleted(user, task)],
    ),
  );
  return NextResponse.json({ ok: true });
}
