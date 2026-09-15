import { canManagePeople, isCpo } from "./access";
import type { Task, TaskStatus, User } from "./types";

export function byCode(tasks: Task[], code: string) {
  return tasks.find((t) => t.code === code);
}

export function openDeps(task: Task, tasks: Task[]) {
  const out: Task[] = [];
  for (const code of task.dependsOn ?? []) {
    const t = byCode(tasks, code);
    if (t && t.status !== "done") out.push(t);
  }
  return out;
}

export function unlockedBy(task: Task, tasks: Task[]) {
  if (!task.code) return [];
  return tasks.filter((t) => (t.dependsOn ?? []).includes(task.code));
}

export function needsDod(status: TaskStatus) {
  return status === "review" || status === "done";
}

export function canMoveStatus(
  task: Task,
  next: TaskStatus,
  tasks: Task[],
  user: User | null,
  extra?: { result?: string; blockReason?: string; blockUntil?: string },
): { ok: true } | { ok: false; error: string } {
  if (next === task.status) return { ok: true };
  const result = (extra?.result ?? task.result ?? "").trim();
  const reason = (extra?.blockReason ?? task.blockReason ?? "").trim();
  const until = extra?.blockUntil ?? task.blockUntil ?? "";
  const override = user ? isCpo(user) || canManagePeople(user) : false;
  const blockedBy = openDeps(task, tasks);

  if ((next === "in_progress" || next === "review" || next === "done") && blockedBy.length && !override) {
    const codes = blockedBy.map((t) => t.code || t.title).join(", ");
    return { ok: false, error: `Сначала закройте: ${codes}` };
  }

  if (needsDod(next) && !result) {
    return { ok: false, error: "Заполните «готово когда» — без этого на проверку и в готово нельзя" };
  }

  if (next === "blocked") {
    if (!until) return { ok: false, error: "Выбери срок блока: день, неделя, месяц или навсегда" };
    if (!reason) return { ok: false, error: "Напиши комментарий, почему блок" };
  }

  return { ok: true };
}
