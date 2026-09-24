import { TODO_REPEAT, type AppState, type Todo, type TodoRepeat, type User } from "./types";
import { canSeeTask } from "./access";

const ID = /^[A-Za-z0-9_-]{1,64}$/;
const DAY = 86_400_000;
/** Ереван: UTC+4 круглый год — по нему считаем выходные для «по будням». */
const YEREVAN_OFFSET = 4 * 3_600_000;

function isWeekendYerevan(ms: number) {
  const d = new Date(ms + YEREVAN_OFFSET).getUTCDay();
  return d === 0 || d === 6;
}

/** Следующее время напоминания после `afterMs` для повторяющегося дела; null — повтора нет. */
export function nextRemind(remindAt: string, repeat: TodoRepeat | undefined, afterMs: number): string | null {
  if (!repeat || repeat === "none") return null;
  let t = Date.parse(remindAt);
  if (Number.isNaN(t)) return null;
  const step = repeat === "weekly" ? 7 * DAY : DAY;
  // Не больше года шагов: защита от мусорных дат.
  for (let i = 0; i < 400 && (t <= afterMs || (repeat === "weekdays" && isWeekendYerevan(t))); i++) t += step;
  return new Date(t).toISOString();
}

/** Дела, по которым пора напомнить и ещё не напомнили. */
export function dueReminders(todos: Todo[], nowMs: number) {
  return todos.filter((t) => !t.done && t.remindAt && Date.parse(t.remindAt) <= nowMs && t.remindedAt !== t.remindAt);
}

type Ok<T> = { ok: true; value: T } | { ok: false; error: string };

export function parseTodo(raw: Partial<Todo>, state: AppState, user: User, prev?: Todo): Ok<Todo> {
  if (!raw?.id || !ID.test(raw.id)) return { ok: false, error: "Неверный id" };
  const text = typeof raw.text === "string" ? raw.text.trim().slice(0, 500) : "";
  if (!text) return { ok: false, error: "Напишите, что сделать" };
  let remindAt: string | undefined;
  if (raw.remindAt) {
    const ms = Date.parse(raw.remindAt);
    if (Number.isNaN(ms)) return { ok: false, error: "Неверное время напоминания" };
    remindAt = new Date(ms).toISOString();
  }
  const repeat: TodoRepeat = raw.repeat && Object.hasOwn(TODO_REPEAT, raw.repeat) ? raw.repeat : "none";
  const done = Boolean(raw.done);
  const task = raw.taskId ? state.tasks.find((t) => t.id === raw.taskId) : undefined;
  return {
    ok: true,
    value: {
      id: raw.id,
      userId: prev?.userId ?? user.id,
      text,
      done,
      remindAt,
      repeat,
      // Новое время напоминания — напомним заново.
      remindedAt: prev && prev.remindAt === remindAt ? prev.remindedAt : undefined,
      taskId: task && canSeeTask(user, task, state.users) ? task.id : undefined,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
      doneAt: done ? (prev?.doneAt ?? new Date().toISOString()) : undefined,
    },
  };
}

/**
 * Отметить сработавшие напоминания: обычное дело — «напомнили», повторяющееся — переносится на следующий раз.
 * Возвращает новое состояние и список того, что надо отправить.
 */
export function fireReminders(
  state: AppState,
  nowMs: number,
  only: (t: Todo) => boolean = () => true,
): { state?: AppState; fired: Todo[] } {
  const due = dueReminders(state.todos ?? [], nowMs).filter(only);
  if (!due.length) return { fired: [] };
  const ids = new Set(due.map((t) => t.id));
  const todos = (state.todos ?? []).map((t) => {
    if (!ids.has(t.id)) return t;
    const next = nextRemind(t.remindAt!, t.repeat, nowMs);
    return next ? { ...t, remindAt: next, remindedAt: undefined } : { ...t, remindedAt: t.remindAt };
  });
  return { state: { ...state, todos }, fired: due };
}
