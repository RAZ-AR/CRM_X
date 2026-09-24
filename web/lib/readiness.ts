import type { Stream, Task } from "./types";
import { STREAMS } from "./types";
import { taskZones } from "./access";

export const STREAM_META: Record<Stream, { label: string; color: string }> = {
  LEGAL: { label: "Юр · финансы", color: "#C4B5FD" },
  SPACE: { label: "Помещение · ремонт", color: "#86EFAC" },
  BRAND: { label: "Бренд · маркетинг", color: "#FDBA74" },
  PRODUCT: { label: "Продукт · меню · app", color: "#F9A8D4" },
  "EQUIPMENT & SUPPLY": { label: "Оборудование · закупки", color: "#FDE68A" },
  PEOPLE: { label: "Команда", color: "#93C5FD" },
  LAUNCH: { label: "Запуск", color: "#67E8F9" },
};

/** Взвешенный % закрытых задач: обычная 1, critical path 3. */
export function weightedDone(list: Task[]) {
  const total = list.reduce((s, t) => s + (t.weight || 1), 0);
  if (!total) return 0;
  const done = list.filter((t) => t.status === "done").reduce((s, t) => s + (t.weight || 1), 0);
  return Math.round((done / total) * 100);
}

export function zoneTasks(slug: string, tasks: Task[]) {
  return tasks.filter((t) => taskZones(t).includes(slug));
}

export function zoneTaskProgress(slug: string, tasks: Task[]) {
  return weightedDone(zoneTasks(slug, tasks));
}

/** Готовность проекта по 7 потокам — из задач, без ручного ввода. */
export function streamProgress(tasks: Task[]) {
  return STREAMS.map((stream) => {
    const list = tasks.filter((t) => t.workstream === stream);
    return {
      stream,
      ...STREAM_META[stream],
      total: list.length,
      done: list.filter((t) => t.status === "done").length,
      pct: weightedDone(list),
    };
  });
}
