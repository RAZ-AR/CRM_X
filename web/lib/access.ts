import type { Contact, Permission, Task, User, WikiPage, ZoneSlug } from "./types";

export function isCpo(user: User) {
  return user.role === "cpo";
}

export function canManagePeople(user: User) {
  return isCpo(user) || user.permissions.includes("manage_users");
}

export function hasPerm(user: User, p: Permission) {
  return isCpo(user) || canManagePeople(user) || user.permissions.includes(p);
}

export function taskZones(task: Task): ZoneSlug[] {
  const z = task.zones?.length ? task.zones : task.zone ? [task.zone] : [];
  return z;
}

export function subordinateIds(userId: string, users: User[]): string[] {
  const out: string[] = [];
  const walk = (id: string) => {
    for (const u of users) {
      if (u.managerId === id) {
        out.push(u.id);
        walk(u.id);
      }
    }
  };
  walk(userId);
  return out;
}

/** Назначенный, участник, автор, подчинённые. CPO видит всё. */
export function canSeeTask(user: User, task: Task, users: User[] = []) {
  if (isCpo(user)) return true;
  if (task.assigneeId === user.id) return true;
  if (task.authorId === user.id) return true;
  if ((task.participantIds ?? []).includes(user.id)) return true;
  if (users.length && subordinateIds(user.id, users).includes(task.assigneeId)) return true;
  if (inMyStreams(user, task)) return true;
  return false;
}

/** Поток целиком открыт человеку (например, BRAND креативному директору). */
export function inMyStreams(user: User, task: Task) {
  return Boolean(task.workstream && (user.streams ?? []).includes(task.workstream as never));
}

/** Срок, вес, critical path, название — автор / CPO / Armen. */
export function canEditTask(user: User, task: Task) {
  return isCpo(user) || canManagePeople(user) || task.authorId === user.id;
}

/** Удалить: Owner — любую, остальные — только созданные ими. */
export function canDeleteTask(user: User, task: Task) {
  return isCpo(user) || task.authorId === user.id;
}

/** Статус, чеклист, комментарий, вложение — исполнитель и участники тоже. */
export function canWorkTask(user: User, task: Task) {
  if (canEditTask(user, task)) return true;
  if (task.assigneeId === user.id) return true;
  if ((task.participantIds ?? []).includes(user.id)) return true;
  if (inMyStreams(user, task)) return true;
  return false;
}

export function canSeeWiki(user: User, page: WikiPage) {
  if (isCpo(user) || canManagePeople(user)) return true;
  if (!hasPerm(user, "wiki")) return false;
  if (page.visibility === "cpo") return false;
  if (page.zone === "all") return true;
  const boards = user.boardZones ?? [];
  return boards.includes(page.zone);
}

export function canSeeContact(user: User, c: Contact) {
  if (isCpo(user) || canManagePeople(user)) return true;
  if (!hasPerm(user, "contacts") && c.kind !== "staff") return false;
  if (c.zone === "all") return hasPerm(user, "contacts");
  const boards = user.boardZones ?? [];
  return boards.includes(c.zone);
}

export function employeeNav(user: User) {
  const items: { href: string; label: string; icon: string }[] = [
    { href: "/home", label: "Главная", icon: "home" },
    { href: "/week", label: "Неделя", icon: "week" },
    { href: "/timeline", label: "Timeline", icon: "timeline" },
    { href: "/kanban", label: "Доска", icon: "kanban" },
  ];
  const boards = user.boardZones?.length ? user.boardZones : user.zone ? [user.zone] : [];
  for (const z of boards) {
    items.push({ href: `/kanban?zone=${z}`, label: z.toUpperCase(), icon: "zone" });
  }
  if (hasPerm(user, "wiki")) items.push({ href: "/wiki", label: "Wiki", icon: "wiki" });
  if (hasPerm(user, "contacts")) items.push({ href: "/contacts", label: "Контакты", icon: "contacts" });
  if (canManagePeople(user)) items.push({ href: "/settings", label: "Команда", icon: "team" });
  return items;
}

export function cpoNav() {
  return [
    { href: "/home", label: "Главная", icon: "home" },
    { href: "/week", label: "Неделя", icon: "week" },
    { href: "/timeline", label: "Timeline", icon: "timeline" },
    { href: "/kanban", label: "Доска", icon: "kanban" },
    { href: "/zones", label: "Проекты", icon: "zone" },
    { href: "/meeting", label: "Планёрка", icon: "meeting" },
    { href: "/settings", label: "Команда", icon: "team" },
    { href: "/wiki", label: "Wiki", icon: "wiki" },
    { href: "/contacts", label: "Контакты", icon: "contacts" },
  ];
}

export function weightedProgress(tasks: Task[]) {
  const total = tasks.reduce((s, t) => s + t.weight, 0) || 1;
  const done = tasks.filter((t) => t.status === "done").reduce((s, t) => s + t.weight, 0);
  return Math.round((done / total) * 100);
}

export function isOverdue(task: Task, onDate?: string) {
  if (task.status === "done") return false;
  const d = onDate || new Date().toISOString().slice(0, 10);
  return task.due < d;
}

/** Старт уже наступил (или раньше), задача не закрыта. */
export function isActual(task: Task, onDate?: string) {
  if (task.status === "done") return false;
  const d = onDate || new Date().toISOString().slice(0, 10);
  const start = task.startDate || task.due;
  return start <= d;
}

export function sortActual<T extends Task>(tasks: T[], onDate?: string) {
  return [...tasks].sort((a, b) => {
    const ao = isOverdue(a, onDate) ? 0 : 1;
    const bo = isOverdue(b, onDate) ? 0 : 1;
    if (ao !== bo) return ao - bo;
    return a.due.localeCompare(b.due);
  });
}

export function formatToday(d = new Date()) {
  return d.toLocaleDateString("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const statusMeta: Record<
  Task["status"],
  { label: string; emoji: string; color: string }
> = {
  todo: { label: "Не начато · бэклог", emoji: "", color: "#E5E7EB" },
  in_progress: { label: "В работе", emoji: "🔵", color: "#BFDBFE" },
  blocked: { label: "Заблокировано", emoji: "⛔", color: "#FECACA" },
  review: { label: "На проверке", emoji: "🟣", color: "#DDD6FE" },
  done: { label: "Готово", emoji: "🟢", color: "#BBF7D0" },
};

/** Путь исполнения — без блока. */
export const columns: Task["status"][] = ["todo", "in_progress", "review", "done"];

/** Доска: блок отдельной колонкой справа, не шаг пайплайна. */
export const boardColumns: Task["status"][] = ["todo", "in_progress", "review", "done", "blocked"];
