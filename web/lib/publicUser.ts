import type { AppState, Task, User } from "./types";
import {
  canEditTask,
  canManagePeople,
  canSeeContact,
  canSeeTask,
  canSeeWiki,
  canWorkTask,
} from "./access";

export function publicUser(u: User): User {
  return { ...u, password: "" };
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
    wiki: state.wiki.filter((p) => canSeeWiki(user, p)),
    contacts: state.contacts.filter((c) => canSeeContact(user, c)),
  };
}

const WORK = new Set(["status", "result", "blockReason", "attachments"]);
const EDIT = new Set([
  "title",
  "description",
  "zone",
  "zones",
  "assigneeId",
  "participantIds",
  "startDate",
  "due",
  "priority",
  "weight",
  "criticalPath",
  "code",
  "wave",
  "workstream",
  "dependsOn",
  "result",
  "status",
  "blockReason",
  "attachments",
]);

function pick(prev: Task, next: Task, keys: Set<string>): Task {
  const out: Task = { ...prev };
  for (const k of keys) {
    if (k in next) (out as unknown as Record<string, unknown>)[k] = (next as unknown as Record<string, unknown>)[k];
  }
  return out;
}

export function mergeState(existing: AppState, incoming: AppState, user: User): AppState {
  if (canManagePeople(user)) {
    const users = incoming.users.map((u) => {
      const prev = existing.users.find((x) => x.id === u.id);
      return { ...u, password: u.password || prev?.password || "" };
    });
    return { ...incoming, users };
  }

  const byId = new Map(existing.tasks.map((t) => [t.id, t]));
  for (const t of incoming.tasks) {
    const prev = byId.get(t.id);
    if (!prev) {
      if (t.authorId === user.id) byId.set(t.id, t);
      continue;
    }
    if (canEditTask(user, prev)) byId.set(t.id, pick(prev, t, EDIT));
    else if (canWorkTask(user, prev)) byId.set(t.id, pick(prev, t, WORK));
  }

  const taskIds = new Set(byId.keys());
  const commentsById = new Map(existing.comments.map((c) => [c.id, c]));
  for (const c of incoming.comments) {
    const prev = commentsById.get(c.id);
    if (prev) {
      commentsById.set(c.id, { ...prev, reactions: c.reactions ?? prev.reactions });
    } else if (c.userId === user.id && taskIds.has(c.taskId)) {
      commentsById.set(c.id, c);
    }
  }

  const subById = new Map(existing.subtasks.map((s) => [s.id, s]));
  for (const s of incoming.subtasks) {
    if (!taskIds.has(s.taskId)) continue;
    subById.set(s.id, s);
  }

  const notices = existing.notices.map((n) => {
    if (n.userId !== user.id) return n;
    const inc = incoming.notices.find((x) => x.id === n.id);
    return inc ? { ...n, read: inc.read, readAt: inc.readAt } : n;
  });
  for (const n of incoming.notices) {
    if (n.userId === user.id && !notices.some((x) => x.id === n.id)) notices.push(n);
  }

  return {
    ...existing,
    tasks: [...byId.values()],
    comments: [...commentsById.values()],
    subtasks: [...subById.values()],
    notices,
  };
}
