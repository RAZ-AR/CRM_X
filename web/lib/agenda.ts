import type { Activity, AppState, Task, User } from "./types";
import { addDays, diffDays, shortDate } from "./dates";
import { weightedDone, zoneTasks } from "./readiness";
import { dataIssues } from "./quality";

export type AgendaItem = { task?: Task; text: string; who?: string };
export type AgendaSection = { title: string; items: AgendaItem[] };

/** Повестка планёрки за последние `days` дней и на неделю вперёд. */
export function buildAgenda(state: AppState, tasks: Task[], users: User[], today: string, days: number): AgendaSection[] {
  const since = addDays(today, -days);
  const name = (id: string) => users.find((u) => u.id === id)?.name ?? "—";
  const ids = new Set(tasks.map((t) => t.id));
  const log = (state.activity ?? []).filter((a) => ids.has(a.taskId) && a.at.slice(0, 10) >= since);
  const open = tasks.filter((t) => t.status !== "done");
  const last = (kind: Activity["kind"], pred: (a: Activity) => boolean) => {
    const seen = new Set<string>();
    return log.filter((a) => a.kind === kind && pred(a) && !seen.has(a.taskId) && seen.add(a.taskId));
  };

  const launches = state.zones
    .filter((z) => z.slug !== "common" && z.deadline >= today)
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .map((z) => ({ text: `${z.emoji} ${z.name}: ${weightedDone(zoneTasks(z.slug, tasks))}% · открытие ${shortDate(z.deadline)} (через ${diffDays(today, z.deadline)} дн)` }));

  const done = last("status", (a) => a.text.includes("Готово")).map((a) => ({ text: a.taskTitle, who: name(a.userId), task: tasks.find((t) => t.id === a.taskId) }));
  const overdue = open.filter((t) => t.due < today).sort((a, b) => a.due.localeCompare(b.due))
    .map((t) => ({ task: t, text: `${t.title} — было до ${shortDate(t.due)}`, who: name(t.assigneeId) }));
  const blocked = open.filter((t) => t.status === "blocked").map((t) => ({ task: t, text: `${t.title} — ${t.blockReason || "причина не указана"}`, who: name(t.assigneeId) }));
  const slips = last("dates", (a) => Boolean(a.criticalPath && (a.days ?? 0) > 0)).map((a) => ({ text: `${a.taskTitle}: ${a.text}`, who: name(a.userId), task: tasks.find((t) => t.id === a.taskId) }));
  const review = open.filter((t) => t.status === "review").map((t) => ({ task: t, text: `${t.title} — принять или вернуть`, who: name(t.authorId) }));
  const issues = dataIssues(open, state.tasks, users);
  const next = addDays(today, 7);
  const week = open.filter((t) => t.due >= today && t.due <= next).sort((a, b) => a.due.localeCompare(b.due))
    .map((t) => ({ task: t, text: `${t.title} — до ${shortDate(t.due)}${t.criticalPath ? " · critical" : ""}`, who: name(t.assigneeId) }));

  return [
    { title: "🚀 Запуски", items: launches },
    { title: `✅ Закрыто за ${days} дн`, items: done },
    { title: "🔥 Просрочено", items: overdue },
    { title: "⛔ Заблокировано — что нужно для разблокировки", items: blocked },
    { title: "📉 Сдвиги critical path", items: slips },
    { title: "🟣 Решения: ждут проверки", items: review },
    { title: "🧹 Данные поправить", items: issues.length ? [{ text: `${issues.length} задач без результата, исполнителя, потока или с конфликтом дат` }] : [] },
    { title: "📅 Сдать на следующей неделе", items: week },
  ];
}

export function agendaText(sections: AgendaSection[], today: string) {
  const lines = [`Планёрка ${shortDate(today)}`];
  for (const s of sections) {
    if (!s.items.length) continue;
    lines.push("", `${s.title} (${s.items.length})`);
    for (const i of s.items.slice(0, 15)) lines.push(`• ${i.task?.code ? `${i.task.code} ` : ""}${i.text}${i.who ? ` — ${i.who}` : ""}`);
    if (s.items.length > 15) lines.push(`…и ещё ${s.items.length - 15}`);
  }
  return lines.join("\n");
}
