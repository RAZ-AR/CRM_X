import type { Task, User } from "./types";
import { byCode } from "./taskRules";

export type Issue = { task: Task; problems: string[] };

/** Что не так с данными задачи: без этого прогресс и сроки врут. */
export function dataIssues(list: Task[], all: Task[], users: User[]): Issue[] {
  const out: Issue[] = [];
  for (const t of list) {
    if (t.status === "done") continue;
    const p: string[] = [];
    if (!t.result?.trim()) p.push("нет «готово когда»");
    if (!users.some((u) => u.id === t.assigneeId)) p.push("нет исполнителя");
    if (!t.due) p.push("нет срока");
    else if (t.startDate && t.startDate > t.due) p.push("начало позже конца");
    if (!t.workstream) p.push("нет потока");
    for (const code of t.dependsOn ?? []) {
      const d = byCode(all, code);
      if (!d) p.push(`зависимость ${code} не найдена`);
      else if (d.status !== "done" && d.due > (t.startDate || t.due)) p.push(`стартует раньше, чем закончится ${code}`);
    }
    if (p.length) out.push({ task: t, problems: p });
  }
  return out.sort((a, b) => Number(b.task.criticalPath) - Number(a.task.criticalPath) || a.task.due.localeCompare(b.task.due));
}
