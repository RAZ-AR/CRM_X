import { statusMeta } from "./access";
import { todayYerevan } from "./dates";
import type { Activity, Task } from "./types";

/**
 * День закрытия задачи (YYYY-MM-DD по Еревану). Берём поле doneAt; у задач, закрытых до его
 * появления, — последнюю запись «Готово» из журнала. Журнал хранит не всё, поэтому может быть null.
 */
export function doneDay(task: Task, activity: Activity[]): string | null {
  if (task.status !== "done") return null;
  if (task.doneAt) return todayYerevan(new Date(task.doneAt));
  const label = statusMeta.done.label;
  const a = activity.find((x) => x.taskId === task.id && x.kind === "status" && x.text.includes(label));
  return a ? todayYerevan(new Date(a.at)) : null;
}
