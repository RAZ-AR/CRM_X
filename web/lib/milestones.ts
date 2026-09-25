import type { Task, Zone } from "./types";
import { isMilestone } from "./schedule";

/** Основные вехи запуска: одинаковые для всех проектов, собираются из задач по потоку и названию. */
export const PHASES: { id: string; label: string; match: (t: Task) => boolean }[] = [
  { id: "demo", label: "Демонтаж", match: (t) => t.workstream === "SPACE & BUILD" && /^демонтаж/i.test(t.title) },
  {
    id: "plan",
    label: "Замер и планировка",
    match: (t) => t.workstream === "SPACE & BUILD" && /^(замер|планировк|проверка планировки|финальный инженерный|инженерный проект)/i.test(t.title),
  },
  { id: "design", label: "Дизайн", match: (t) => t.workstream === "SPACE & BUILD" && /^дизайн/i.test(t.title) },
  { id: "approve", label: "Согласование", match: (t) => t.workstream === "SPACE & BUILD" && /^согласован/i.test(t.title) },
  { id: "build", label: "Ремонт", match: (t) => t.workstream === "SPACE & BUILD" && /^ремонт/i.test(t.title) },
  {
    id: "equip",
    label: "Оборудование",
    match: (t) => t.workstream === "EQUIPMENT & SUPPLY" && /(монтаж оборудования|оборудование и мебель|стеллажи)/i.test(t.title),
  },
  { id: "team", label: "Команда", match: (t) => t.workstream === "PEOPLE & TRAINING" },
  { id: "soft", label: "Soft launch", match: (t) => /soft launch|тестовый запуск/i.test(t.title) },
  { id: "open", label: "Открытие", match: isMilestone },
];

export type PhaseState = "done" | "active" | "late" | "todo";

export type Phase = {
  id: string;
  label: string;
  start: string;
  end: string;
  done: number;
  total: number;
  state: PhaseState;
  /** Задача, которую открываем по клику: первая незакрытая с ближайшим сроком. */
  taskId: string;
};

export type Lane = {
  zone: Zone;
  phases: Phase[];
  start: string;
  launch: string;
  launchTaskId?: string;
  /** Ближайшая незакрытая веха (кроме открытия). */
  next?: Phase;
};

function phaseOf(id: string, label: string, list: Task[], today: string): Phase {
  const start = list.map((t) => t.startDate || t.due).reduce((a, b) => (a < b ? a : b));
  const end = list.map((t) => t.due).reduce((a, b) => (a > b ? a : b));
  const open = list.filter((t) => t.status !== "done").sort((a, b) => a.due.localeCompare(b.due));
  const done = list.length - open.length;
  const state: PhaseState = !open.length ? "done" : open[0].due < today ? "late" : start <= today ? "active" : "todo";
  return { id, label, start, end, done, total: list.length, state, taskId: (open[0] ?? list[list.length - 1]).id };
}

/** Дорожки вех по проектам с датой открытия (без «ОБЩИЕ»). */
export function milestoneLanes(tasks: Task[], zones: Zone[], today: string): Lane[] {
  return zones
    .filter((z) => z.slug !== "common" && z.deadline)
    .map((zone) => {
      const own = tasks.filter((t) => t.zone === zone.slug && t.due);
      const phases = PHASES.flatMap((p) => {
        const list = own.filter(p.match);
        return list.length ? [phaseOf(p.id, p.label, list, today)] : [];
      });
      const launchTask = own.find(isMilestone);
      const launch = launchTask?.due || zone.deadline;
      const starts = phases.map((p) => p.start).filter((d) => d <= launch);
      const start = starts.length ? starts.reduce((a, b) => (a < b ? a : b)) : launch;
      const next = phases.filter((p) => p.id !== "open" && p.state !== "done").sort((a, b) => a.end.localeCompare(b.end))[0];
      return { zone, phases, start, launch, launchTaskId: launchTask?.id, next };
    })
    .sort((a, b) => a.launch.localeCompare(b.launch));
}
