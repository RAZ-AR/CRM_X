import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { loadSharedState, saveSharedState } from "@/lib/blobState";
import type { Task } from "@/lib/types";
import { appUrlFrom, escapeHtml, sendTo, taskLink } from "@/lib/telegram";
import { shortDate } from "@/lib/dates";

export async function POST(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const body = (await req.json()) as Task;
  if (!body?.id || !body.title) return NextResponse.json({ ok: false }, { status: 400 });
  const task: Task = {
    ...body,
    authorId: user.id,
    attachments: body.attachments ?? [],
    dependsOn: body.dependsOn ?? [],
    participantIds: body.participantIds ?? [],
    zones: body.zones?.length ? body.zones : body.zone ? [body.zone] : [],
  };
  const { state } = await loadSharedState();
  await saveSharedState({ ...state, tasks: [task, ...state.tasks] });
  if (task.assigneeId !== user.id) {
    await sendTo(
      state.users.find((u) => u.id === task.assigneeId),
      `🆕 Новая задача от ${escapeHtml(user.name)}: ${taskLink(appUrlFrom(req), task)}\nСрок: ${shortDate(task.due)}`,
    );
  }
  return NextResponse.json({ ok: true, task });
}
