import type { AppState, Task } from "./types";
import { EMPTY_STATE } from "./emptyState";

export function normalizeState(raw: Partial<AppState> | null | undefined): AppState {
  const parsed = raw ?? {};
  return {
    ...EMPTY_STATE,
    ...parsed,
    users: (parsed.users ?? EMPTY_STATE.users).map((u) => ({
      ...u,
      managerId: u.managerId ?? null,
      permissions: u.permissions ?? [],
      boardZones: u.boardZones ?? [],
    })),
    tasks: (parsed.tasks ?? EMPTY_STATE.tasks).map((task) => ({
      ...task,
      status: ((task.status as string) === "waiting" ? "blocked" : task.status) as Task["status"],
      blockReason: task.blockReason ?? "",
      dependsOn: task.dependsOn ?? [],
      zones: task.zones?.length ? task.zones : task.zone ? [task.zone] : [],
      participantIds: task.participantIds ?? [],
      attachments: task.attachments ?? [],
    })),
    comments: (parsed.comments ?? EMPTY_STATE.comments).map((c) => ({
      ...c,
      reactions: c.reactions ?? [],
    })),
    contacts: (parsed.contacts ?? EMPTY_STATE.contacts).map((c) => ({
      ...c,
      telegram: c.telegram || "",
      whatsapp: c.whatsapp || "",
      kind: c.kind === "vendor" ? "supplier" : c.kind,
    })),
    notices: parsed.notices ?? EMPTY_STATE.notices,
    broadcast: parsed.broadcast ?? EMPTY_STATE.broadcast,
    wiki: parsed.wiki ?? EMPTY_STATE.wiki,
    subtasks: parsed.subtasks ?? EMPTY_STATE.subtasks,
    zones: parsed.zones ?? EMPTY_STATE.zones,
    activity: parsed.activity ?? [],
    budget: parsed.budget ?? [],
    expenses: parsed.expenses ?? [],
    risks: (parsed.risks ?? []).map((r) => ({ ...r, taskIds: r.taskIds ?? [] })),
  };
}
