import type { Task } from "./types";
import { addDays, diffDays } from "./dates";

export type Shift = {
  task: Task;
  fromStart: string;
  fromDue: string;
  toStart: string;
  toDue: string;
  /** На сколько дней сдвинулся конец. */
  days: number;
};

const startOf = (t: Task) => t.startDate || t.due;

/**
 * Что сдвинется, если задаче поставить новые даты. Зависимая задача не может начаться раньше,
 * чем закончится та, от которой она зависит: если начало оказывается раньше — сдвигаем её
 * целиком (длительность сохраняется) и идём дальше по цепочке. Раньше задачи не подтягиваются.
 */
export function cascade(tasks: Task[], taskId: string, newStart: string, newDue: string): Shift[] {
  const byId = new Map(tasks.map((t) => [t.id, t]));
  const dependents = new Map<string, Task[]>();
  for (const t of tasks) {
    for (const code of t.dependsOn ?? []) {
      if (!dependents.has(code)) dependents.set(code, []);
      dependents.get(code)!.push(t);
    }
  }
  const next = new Map<string, { start: string; due: string }>();
  const root = byId.get(taskId);
  if (!root) return [];
  next.set(root.id, { start: newStart, due: newDue < newStart ? newStart : newDue });

  const queue = [root];
  let guard = 0;
  while (queue.length && guard++ < 10000) {
    const t = queue.shift()!;
    const end = next.get(t.id)!.due;
    if (!t.code) continue;
    for (const d of dependents.get(t.code) ?? []) {
      if (d.status === "done") continue;
      const cur = next.get(d.id) ?? { start: startOf(d), due: d.due };
      if (cur.start >= end) continue;
      const shift = diffDays(cur.start, end);
      next.set(d.id, { start: end, due: addDays(cur.due, shift) });
      queue.push(d);
    }
  }

  const out: Shift[] = [];
  for (const [id, n] of next) {
    const t = byId.get(id)!;
    if (n.start === startOf(t) && n.due === t.due) continue;
    out.push({ task: t, fromStart: startOf(t), fromDue: t.due, toStart: n.start, toDue: n.due, days: diffDays(t.due, n.due) });
  }
  return out.sort((a, b) => a.toStart.localeCompare(b.toStart));
}

export function isMilestone(t: Task) {
  return t.title.startsWith("🚀");
}
