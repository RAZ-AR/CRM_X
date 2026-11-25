import type { AppState, Priority, Subtask, Task, TaskStatus, User } from "./types";

/**
 * Helix (helixarm.am, Corp Portal) → Quicky / CRM X: односторонняя синхронизация задач команды.
 * Helix — источник правды. Берём все задачи (с подзадачами), где исполнитель — кто-то из пользователей
 * Quicky (сопоставление по имени), и заменяем ими задачи с id "hx-…". Задачи, созданные прямо в Quicky,
 * сохраняются. Метка state.helixSync отличает первый импорт (он убирает старые задачи) от обновлений.
 */

export type HelixPerson = { id?: number; name: string };
export type HelixTask = {
  id: number;
  title: string;
  status: string;
  priority?: string;
  project_path?: string;
  directions?: { name: string }[];
  assignees?: HelixPerson[];
  setters?: HelixPerson[];
  start_date?: string | null;
  deadline?: string | null;
  notes?: string | null;
  created_at?: string | null;
  todos?: { id?: number; text: string; done: boolean | number }[];
  subtasks?: HelixTask[];
};

export type HelixSyncMeta = {
  at: string; count: number; firstAt: string; unmapped?: string[]; source?: "server" | "mac";
  /** Кто запустил: расписание или кнопка «Синхронизировать» (тогда имя человека). */
  by?: string;
  added?: number; statusChanged?: number; dueChanged?: number;
};

export class HelixError extends Error {}

/** Helix иногда принимает соединение и молчит; без таймаута функция висит до лимита Vercel (60 с). */
const HELIX_TIMEOUT_MS = 20_000;

async function helixFetch(url: string, init: RequestInit, what: string): Promise<Response> {
  try {
    return await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(HELIX_TIMEOUT_MS) });
  } catch (e) {
    if (e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError")) {
      throw new HelixError(`Helix не ответил за ${HELIX_TIMEOUT_MS / 1000} с (${what})`);
    }
    throw new HelixError(`Helix недоступен (${what}): ${e instanceof Error ? e.message : String(e)}`);
  }
}

export async function fetchHelixTasks(env = process.env): Promise<HelixTask[]> {
  const base = (env.HELIX_URL || "https://helixarm.am/team").replace(/\/$/, "");
  const username = env.HELIX_USERNAME, password = env.HELIX_PASSWORD;
  if (!username || !password) throw new HelixError("не заданы HELIX_USERNAME / HELIX_PASSWORD");

  const res = await helixFetch(`${base}/?route=login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username, password }),
    redirect: "manual",
  }, "вход");
  // PHP пересоздаёт сессию при входе и шлёт PHPSESSID дважды — берём последнее значение.
  const jar = new Map<string, string>();
  for (const c of res.headers.getSetCookie()) {
    const pair = c.split(";")[0]; const i = pair.indexOf("=");
    if (i > 0) jar.set(pair.slice(0, i).trim(), pair.slice(i + 1));
  }
  if (res.status !== 302 || !jar.size || /route=login/.test(res.headers.get("location") || "")) {
    throw new HelixError(`вход в Helix не удался (HTTP ${res.status})`);
  }
  const cookie = [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  const r = await helixFetch(`${base}/?route=tasks&action=get_all`, { headers: { Cookie: cookie } }, "список задач");
  let text: string;
  try { text = await r.text(); } catch { throw new HelixError(`Helix не дослал список задач за ${HELIX_TIMEOUT_MS / 1000} с`); }
  let data: unknown;
  try { data = JSON.parse(text); } catch { throw new HelixError(`Helix вернул не JSON (HTTP ${r.status})`); }
  if (!Array.isArray(data)) throw new HelixError("Helix вернул неожиданный формат");
  return data as HelixTask[];
}

export function flattenHelix(tasks: HelixTask[]): { t: HelixTask; parent: HelixTask | null }[] {
  const out: { t: HelixTask; parent: HelixTask | null }[] = [];
  const walk = (t: HelixTask, parent: HelixTask | null) => { out.push({ t, parent }); (t.subtasks || []).forEach((s) => walk(s, t)); };
  tasks.forEach((t) => walk(t, null));
  return out;
}

const STATUS: Record<string, TaskStatus> = { backlog: "todo", in_progress: "in_progress", on_hold: "blocked", done: "done", review: "review" };
const PRIORITY: Record<string, Priority> = { low: "low", medium: "medium", high: "high", critical: "critical" };
const ZONE: [RegExp, string][] = [[/WAFL/i, "wafl"], [/Dark Kitchen/i, "kitchen"], [/Кафе|CAFE/i, "cafe"], [/COMX/i, "comx"]];
const STREAM: [RegExp, string][] = [
  [/Ремонт/i, "SPACE & BUILD"], [/Закуп/i, "EQUIPMENT & SUPPLY"], [/^HR$/i, "PEOPLE & TRAINING"],
  [/Маркет|Бренд|Дизайн/i, "BRAND & MARKETING"], [/Продукт|Разработ|Технолог/i, "PRODUCT & APP"],
  [/Документ|Административ/i, "LEGAL & FINANCE"], [/Продаж/i, "LAUNCH & OPS"],
];

/** Helix «Arthur Grigoryan» → пользователь Quicky «Artur». Явные соответствия — в HELIX_USER_MAP (JSON). */
export function userMatcher(users: User[], explicit: Record<string, string> = {}) {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-zа-яё]/g, "").replace(/h/g, "");
  const first = (s: string) => norm(s.trim().split(/\s+/)[0] || "");
  return (helixName: string): string | null => {
    if (explicit[helixName]) return explicit[helixName];
    const f = first(helixName);
    if (f.length < 3) return null;
    const hit = users.find((u) => {
      const n = first(u.name);
      return n.length >= 3 && (n === f || n.slice(0, 4) === f.slice(0, 4));
    });
    return hit ? hit.id : null;
  };
}

export function mapHelix(flat: ReturnType<typeof flattenHelix>, users: User[], explicit: Record<string, string> = {}) {
  const who = userMatcher(users, explicit);
  const unmapped = new Set<string>();
  const tasks: Task[] = [], subtasks: Subtask[] = [];
  for (const { t, parent } of flat) {
    const people = (t.assignees || []).map((a) => ({ name: a.name, id: who(a.name) }));
    people.filter((p) => !p.id).forEach((p) => unmapped.add(p.name));
    const mapped = [...new Set(people.map((p) => p.id).filter(Boolean))] as string[];
    if (!mapped.length) continue; // в задаче нет никого из команды Quicky
    const id = `hx-${t.id}`;
    const status = STATUS[t.status] || "todo";
    const dirs = (t.directions || []).map((d) => d.name);
    const zone = (ZONE.find(([re]) => re.test(t.project_path || "")) || [null, "common"])[1];
    const stream = dirs.map((d) => STREAM.find(([re]) => re.test(d))?.[1]).find(Boolean) || "LAUNCH & OPS";
    const author = (t.setters || []).map((s) => who(s.name)).find(Boolean) || mapped[0];
    tasks.push({
      id, title: t.title,
      description: [t.notes || "", parent ? `Входит в: ${parent.title}` : "", `Helix #${t.id} · ${t.project_path || ""}${dirs.length ? " · " + dirs.join(", ") : ""}`]
        .filter(Boolean).join("\n\n"),
      zone, zones: [zone],
      assigneeId: mapped[0], authorId: author, participantIds: mapped.slice(1),
      startDate: t.start_date || "", due: t.deadline || "",
      priority: PRIORITY[t.priority || ""] || "medium", status,
      weight: 1, criticalPath: t.priority === "high" && status !== "done",
      result: "", createdAt: (t.created_at || "").replace(" ", "T"),
      attachments: [], code: `HX-${t.id}`, wave: "", workstream: stream, dependsOn: [],
      ...(status === "blocked" ? { blockReason: "On Hold в Helix", blockUntil: "forever", blockFromStatus: "todo" as TaskStatus } : {}),
    } as Task);
    (t.todos || []).forEach((td, i) => subtasks.push({ id: `${id}-c${td.id ?? i}`, taskId: id, title: td.text, done: !!td.done }));
  }
  return { tasks, subtasks, unmapped: [...unmapped].sort() };
}

/** Применить задачи Helix к состоянию Quicky. Чистая функция — удобно тестировать. */
export function applyHelix(state: AppState & { helixSync?: HelixSyncMeta }, mapped: ReturnType<typeof mapHelix>, now: string) {
  const first = !state.helixSync;
  const kept = state.tasks.filter((t) => !first && !t.id.startsWith("hx-"));
  const tasks = [...mapped.tasks, ...kept];
  const ids = new Set(tasks.map((t) => t.id));
  const keepRef = <X extends { taskId?: string }>(x: X) => !x.taskId || ids.has(x.taskId);
  const before = new Map(state.tasks.map((t) => [t.id, t]));
  const next = {
    ...state,
    tasks,
    subtasks: [...mapped.subtasks, ...state.subtasks.filter((s) => !s.taskId.startsWith("hx-") && ids.has(s.taskId))],
    comments: state.comments.filter(keepRef),
    notices: state.notices.filter(keepRef),
    activity: (state.activity || []).filter(keepRef),
    helixSync: { at: now, count: mapped.tasks.length, firstAt: state.helixSync?.firstAt || now, unmapped: mapped.unmapped, source: "server" as const },
  };
  const changes = {
    first,
    added: mapped.tasks.filter((t) => !before.has(t.id)).length,
    removed: state.tasks.filter((t) => !ids.has(t.id)).length,
    statusChanged: mapped.tasks.filter((t) => before.has(t.id) && before.get(t.id)!.status !== t.status).length,
    dueChanged: mapped.tasks.filter((t) => before.has(t.id) && before.get(t.id)!.due !== t.due).length,
    keptLocal: kept.length,
  };
  return { next, changes };
}
