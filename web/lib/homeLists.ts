import { addDays } from "./dates";
import { openDeps } from "./taskRules";
import type { Task, User } from "./types";
import { canSeeTask, isCpo, subordinateIds, taskZones } from "./access";

/** Списки задач главной. Одни и те же правила на главной и на полной странице списка. */
export const HOME_VIEWS = {
  overdue: "🔥 Просрочено",
  today: "📌 Сдать сегодня",
  work: "▶️ В работе",
  start: "⏭ Пора начать",
  critical: "🎯 Critical path · 7 дней",
  blocked: "⛔ Заблокировано",
  review: "🟣 Ждут проверки",
  ready: "✅ Можно начинать — зависимости закрыты",
} as const;

export type HomeView = keyof typeof HOME_VIEWS;

export function isHomeView(x: string | null): x is HomeView {
  return Boolean(x && Object.hasOwn(HOME_VIEWS, x));
}

/**
 * scoped — задачи в текущих фильтрах (исполнитель, проект), all — все задачи (для зависимостей),
 * picked — выбранный день, reviewer — кто смотрит «ждут проверки» (Owner видит все).
 */
export function homeLists(scoped: Task[], all: Task[], picked: string, reviewer: { id: string; owner: boolean }): Record<HomeView, Task[]> {
  const open = scoped.filter((t) => t.status !== "done");
  const started = (t: Task) => (t.startDate || t.due) <= picked;
  const byDue = (a: Task, b: Task) => a.due.localeCompare(b.due);
  const horizon = addDays(picked, 7);
  return {
    overdue: open.filter((t) => t.due < picked).sort(byDue),
    today: open.filter((t) => t.due === picked),
    work: open.filter((t) => t.status === "in_progress" && started(t) && t.due > picked),
    start: open.filter((t) => t.status === "todo" && started(t) && t.due > picked),
    critical: open.filter((t) => t.criticalPath && t.due <= horizon).sort(byDue),
    blocked: open.filter((t) => t.status === "blocked"),
    review: scoped.filter((t) => t.status === "review" && (reviewer.owner || t.authorId === reviewer.id)),
    ready: open
      .filter((t) => t.status === "todo" && (t.startDate || t.due) <= addDays(picked, 3) && (t.dependsOn?.length ?? 0) > 0 && !openDeps(t, all).length)
      .sort((a, b) => (a.startDate || a.due).localeCompare(b.startDate || b.due)),
  };
}

/**
 * Фильтры главной: who — "all" | "me" | id исполнителя, zone — "all" | slug проекта.
 * Сотрудник без подчинённых всегда видит только свои задачи.
 */
export function scopeTasks(
  tasks: Task[],
  me: User,
  users: User[],
  who: string,
  zone: string,
): { seen: Task[]; byZone: Task[]; scoped: Task[]; manager: boolean; whoValue: string; assigneeId: string | null } {
  const manager = isCpo(me) || subordinateIds(me.id, users).length > 0;
  const whoValue = manager ? who || "all" : "me";
  const seen = tasks.filter((t) => canSeeTask(me, t, users));
  const byZone = zone === "all" ? seen : seen.filter((t) => taskZones(t).includes(zone));
  const assigneeId = whoValue === "me" ? me.id : whoValue === "all" ? null : whoValue;
  const scoped = assigneeId ? byZone.filter((t) => t.assigneeId === assigneeId) : byZone;
  return { seen, byZone, scoped, manager, whoValue, assigneeId };
}
