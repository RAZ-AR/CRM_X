import type { TaskStatus } from "./types";

export const COL: Record<TaskStatus, { title: string; color: string }> = {
  todo: { title: "Не начато · бэклог", color: "#E5E7EB" },
  in_progress: { title: "В работе", color: "#BFDBFE" },
  blocked: { title: "Заблокировано", color: "#FECACA" },
  review: { title: "На проверке", color: "#DDD6FE" },
  done: { title: "Готово", color: "#BBF7D0" },
};

export const PRI: Record<string, { title: string; color: string }> = {
  low: { title: "Низкий", color: "#E5E7EB" },
  medium: { title: "Средний", color: "#BFDBFE" },
  high: { title: "Высокий", color: "#FDBA74" },
  critical: { title: "Critical", color: "#FECACA" },
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
