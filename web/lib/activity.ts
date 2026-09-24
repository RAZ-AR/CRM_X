import type { Activity, AppState, Task, User } from "./types";
import { statusMeta } from "./access";
import { diffDays, shortDate } from "./dates";

const LIMIT = 1500;

/** Добавляет записи в журнал (новые в начале, храним последние LIMIT). */
export function withActivity(state: AppState, entries: Omit<Activity, "id" | "at">[]): AppState {
  if (!entries.length) return state;
  const at = new Date().toISOString();
  const fresh = entries.map((e, i) => ({ ...e, id: `a-${Date.now().toString(36)}-${i}-${Math.random().toString(36).slice(2, 6)}`, at }));
  return { ...state, activity: [...fresh, ...(state.activity ?? [])].slice(0, LIMIT) };
}

const base = (user: User, t: Task) => ({ userId: user.id, taskId: t.id, taskTitle: t.title, criticalPath: t.criticalPath });

/** Что изменилось в задаче — в человеческом виде. */
export function taskChanges(user: User, prev: Task, next: Task, users: User[]): Omit<Activity, "id" | "at">[] {
  const out: Omit<Activity, "id" | "at">[] = [];
  if (prev.status !== next.status) {
    const m = statusMeta[next.status];
    out.push({ ...base(user, next), kind: "status", text: `${m.emoji || "⚪"} ${m.label}${next.status === "blocked" && next.blockReason ? `: ${next.blockReason}` : ""}` });
  }
  if (prev.due !== next.due || (prev.startDate || prev.due) !== (next.startDate || next.due)) {
    const days = diffDays(prev.due, next.due);
    out.push({
      ...base(user, next),
      kind: "dates",
      days,
      text: `срок ${shortDate(prev.due)} → ${shortDate(next.due)}${days ? ` (${days > 0 ? "+" : ""}${days} дн)` : ""}`,
    });
  }
  if (prev.assigneeId !== next.assigneeId) {
    const name = users.find((u) => u.id === next.assigneeId)?.name ?? "—";
    out.push({ ...base(user, next), kind: "assignee", text: `исполнитель → ${name}` });
  }
  const before = new Set(prev.contactIds ?? []);
  const after = new Set(next.contactIds ?? []);
  const added = [...after].filter((id) => !before.has(id));
  const removed = [...before].filter((id) => !after.has(id));
  if (added.length || removed.length) {
    out.push({ ...base(user, next), kind: "edited", text: `контрагенты: ${added.length ? `+${added.length}` : ""}${added.length && removed.length ? ", " : ""}${removed.length ? `−${removed.length}` : ""}` });
  }
  if (prev.title !== next.title || prev.result !== next.result || prev.description !== next.description) {
    out.push({ ...base(user, next), kind: "edited", text: prev.title !== next.title ? `переименована (было «${prev.title}»)` : "обновлены описание или «готово когда»" });
  }
  return out;
}

export function created(user: User, t: Task): Omit<Activity, "id" | "at"> {
  return { ...base(user, t), kind: "created", text: `создана, срок ${shortDate(t.due)}` };
}

export function deleted(user: User, t: Task): Omit<Activity, "id" | "at"> {
  return { ...base(user, t), kind: "deleted", text: "удалена" };
}
