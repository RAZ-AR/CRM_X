import type { TaskStatus } from "./types";

export const COL: Record<TaskStatus, { title: string; color: string }> = {
  todo: { title: "Не начато · бэклог", color: "#E6E6E1" },
  in_progress: { title: "В работе", color: "#FFD08F" },
  blocked: { title: "Заблокировано", color: "#FFB08A" },
  review: { title: "На проверке", color: "#D4D4CF" },
  done: { title: "Готово", color: "#BEBEB8" },
};

export const PRI: Record<string, { title: string; color: string }> = {
  low: { title: "Низкий", color: "#E6E6E1" },
  medium: { title: "Средний", color: "#FFD08F" },
  high: { title: "Высокий", color: "#FFD08F" },
  critical: { title: "Critical", color: "#FFB08A" },
};

export function ago(iso: string) {
  const d = Math.round((Date.now() - new Date(iso).getTime()) / 86400000);
  if (Number.isNaN(d) || d <= 0) return "сегодня";
  if (d === 1) return "вчера";
  return `${d} дн. назад`;
}

export function taskNo(id: string) {
  return id.replace(/\D/g, "").slice(-4) || "1";
}
