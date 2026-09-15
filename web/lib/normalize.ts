import type { AppState, Task } from "./types";
import { seed } from "./seed";

export function normalizeState(raw: Partial<AppState> | null | undefined): AppState {
  const parsed = raw ?? {};
  return {
    ...seed,
    ...parsed,
    users: (parsed.users ?? seed.users).map((u) => ({
      ...u,
      managerId: u.managerId === undefined ? (u.id === "u-cpo" ? null : "u-armen") : u.managerId,
      permissions: u.permissions ?? [],
      boardZones: u.boardZones ?? [],
    })),
    tasks: (parsed.tasks ?? seed.tasks).map((task) => ({
      ...task,
      status: ((task.status as string) === "waiting" ? "blocked" : task.status) as Task["status"],
      blockReason: task.blockReason ?? "",
      dependsOn: task.dependsOn ?? [],
      zones: task.zones?.length ? task.zones : task.zone ? [task.zone] : [],
      participantIds: task.participantIds ?? [],
      attachments: task.attachments ?? [],
    })),
    comments: (parsed.comments ?? seed.comments).map((c) => ({
      ...c,
      reactions: c.reactions ?? [],
    })),
    contacts: (parsed.contacts ?? seed.contacts).map((c) => ({
      ...c,
      telegram: c.telegram || "",
      whatsapp: c.whatsapp || "",
    })),
    notices: parsed.notices ?? seed.notices ?? [],
    broadcast: parsed.broadcast ?? seed.broadcast ?? null,
    wiki: parsed.wiki ?? seed.wiki,
    subtasks: parsed.subtasks ?? seed.subtasks,
    zones: parsed.zones ?? seed.zones,
  };
}
