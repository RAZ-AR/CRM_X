import type { AppState, User } from "./types";
import { ensureHashed } from "./auth";
import { canSeeFinance } from "./finance";
import {
  hasPerm,
  canManagePeople,
  canSeeContact,
  canSeeTask,
  canSeeWiki,
  canWorkTask,
} from "./access";

export function publicUser(u: User): User {
  const { telegramChatId, ...rest } = u;
  return { ...rest, password: "", telegramLinked: Boolean(telegramChatId) };
}

export function filterState(state: AppState, user: User): AppState {
  const users = state.users.map(publicUser);
  const tasks = canManagePeople(user)
    ? state.tasks
    : state.tasks.filter((t) => canSeeTask(user, t, state.users));
  const ids = new Set(tasks.map((t) => t.id));
  return {
    ...state,
    users,
    tasks,
    comments: state.comments.filter((c) => ids.has(c.taskId)),
    subtasks: state.subtasks.filter((s) => ids.has(s.taskId)),
    notices: state.notices.filter((n) => n.userId === user.id),
    activity: (state.activity ?? []).filter((a) => ids.has(a.taskId) || (user.role === "cpo" && a.kind === "deleted")),
    wiki: state.wiki.filter((p) => canSeeWiki(user, p)),
    contacts: state.contacts.filter((c) => canSeeContact(user, c)),
    budget: canSeeFinance(user) ? (state.budget ?? []) : [],
    expenses: canSeeFinance(user) ? (state.expenses ?? []) : [],
    fx: canSeeFinance(user) ? state.fx : undefined,
    // Риски видят все; ссылки на недоступные задачи не отдаём.
    risks: (state.risks ?? []).map((r) => ({ ...r, taskIds: r.taskIds.filter((id) => ids.has(id)) })),
    todos: (state.todos ?? []).filter((t) => t.userId === user.id),
  };
}

/**
 * PUT /api/state: всё, кроме задач (задачи — только через /api/tasks).
 * Комментарии, чеклисты, уведомления сливаются по id, чтобы параллельные правки не терялись.
 * Люди, проекты, wiki, контакты, рассылка — только Owner.
 */
export function mergeState(existing: AppState, incoming: AppState, user: User): AppState {
  const manager = canManagePeople(user);
  const tasksById = new Map(existing.tasks.map((t) => [t.id, t]));

  const comments = new Map(existing.comments.map((c) => [c.id, c]));
  for (const c of incoming.comments ?? []) {
    const prev = comments.get(c.id);
    if (prev) comments.set(c.id, { ...prev, reactions: c.reactions ?? prev.reactions });
    else if (c.userId === user.id && tasksById.has(c.taskId)) comments.set(c.id, c);
  }

  const subtasks = new Map(existing.subtasks.map((s) => [s.id, s]));
  for (const s of incoming.subtasks ?? []) {
    const task = tasksById.get(s.taskId);
    if (task && canWorkTask(user, task)) subtasks.set(s.id, s);
  }

  const notices = new Map(existing.notices.map((n) => [n.id, n]));
  for (const n of incoming.notices ?? []) {
    const prev = notices.get(n.id);
    if (!prev) {
      if (!n.taskId || tasksById.has(n.taskId)) notices.set(n.id, n);
    } else if (prev.userId === user.id) {
      notices.set(n.id, { ...prev, read: n.read, readAt: n.readAt });
    }
  }

  // Контрагентов добавляют и правят все, у кого есть доступ к контактам; удаляет только Owner.
  const contacts = new Map(existing.contacts.map((c) => [c.id, c]));
  if (hasPerm(user, "contacts")) {
    for (const c of incoming.contacts ?? []) {
      const prev = contacts.get(c.id);
      if (!prev || canSeeContact(user, prev)) contacts.set(c.id, { ...prev, ...c });
    }
  }

  const base: AppState = {
    ...existing,
    contacts: [...contacts.values()],
    comments: [...comments.values()].filter((c) => tasksById.has(c.taskId)),
    subtasks: [...subtasks.values()].filter((s) => tasksById.has(s.taskId)),
    notices: [...notices.values()],
  };
  if (!manager) return base;

  const users = (incoming.users?.length ? incoming.users : existing.users).map((u) => {
    const prev = existing.users.find((x) => x.id === u.id);
    const { telegramLinked: _linked, ...rest } = u;
    void _linked;
    return {
      ...rest,
      password: u.password ? ensureHashed(u.password) : prev?.password || "",
      telegramChatId: prev?.telegramChatId,
    };
  });
  return {
    ...base,
    users,
    zones: incoming.zones?.length ? incoming.zones : existing.zones,
    wiki: incoming.wiki ?? existing.wiki,
    contacts: incoming.contacts ?? existing.contacts,
    broadcast: incoming.broadcast ?? existing.broadcast,
  };
}
