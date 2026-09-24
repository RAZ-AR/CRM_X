import type { Stream, Task } from "./types";
import { STREAMS } from "./types";
import { taskZones } from "./access";

export const STREAM_META: Record<Stream, { label: string; color: string; short: string }> = {
  "LEGAL & FINANCE": { label: "Юрлица, договоры, бухгалтерия, банки, финмодель, разрешения", color: "#C4B5FD", short: "LEGAL" },
  "SPACE & BUILD": { label: "Помещения: осмотр, демонтаж, ремонт, инженерия, безопасность", color: "#86EFAC", short: "SPACE" },
  "BRAND & MARKETING": { label: "Бренд, айдентика, соцсети, контент, PR, продвижение запуска", color: "#FDBA74", short: "BRAND" },
  "PRODUCT & APP": { label: "Меню, рецептуры, техкарты, цены, приложение лояльности", color: "#F9A8D4", short: "PRODUCT" },
  "EQUIPMENT & SUPPLY": { label: "Оборудование, касса, упаковка, поставщики, закупки", color: "#FDE68A", short: "EQUIPMENT" },
  "PEOPLE & TRAINING": { label: "Структура, найм, договоры, медкнижки, обучение, тестовые смены", color: "#93C5FD", short: "PEOPLE" },
  "LAUNCH & OPS": { label: "Тест производства, soft launch, стандарты смен, агрегаторы, отчёты", color: "#67E8F9", short: "LAUNCH" },
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
