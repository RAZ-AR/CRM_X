import { updateSharedState } from "@/lib/blobState";
import { applyHelix, fetchHelixTasks, flattenHelix, HelixError, mapHelix } from "@/lib/helix";

/**
 * Helix → CRM X (а через неё и Quicky). Зовут: GitHub Actions раз в 6 часов (/api/cron/helix)
 * и кнопка «Синхронизировать» (/api/helix/sync). Итог последнего запуска — в state.helixSync.
 */
export async function runHelixSync({ dry = false, by = "расписание" }: { dry?: boolean; by?: string } = {}) {
  let explicit: Record<string, string> = {};
  try { explicit = JSON.parse(process.env.HELIX_USER_MAP || "{}"); } catch { /* пустое соответствие */ }
  const flat = flattenHelix(await fetchHelixTasks());
  return updateSharedState((state) => {
    const mapped = mapHelix(flat, state.users, explicit);
    if (!mapped.tasks.length) throw new HelixError("в Helix нет задач, где исполнитель — кто-то из команды Quicky");
    const { next, changes } = applyHelix(state, mapped, new Date().toISOString());
    const result = {
      helixTotal: flat.length, synced: mapped.tasks.length, open: mapped.tasks.filter((t) => t.status !== "done").length,
      checklist: mapped.subtasks.length, unmapped: mapped.unmapped, ...changes, dry,
    };
    if (dry) return { result };
    const helixSync = {
      ...next.helixSync, by,
      added: changes.added, statusChanged: changes.statusChanged, dueChanged: changes.dueChanged,
    };
    return { state: { ...next, helixSync }, result };
  });
}

export { HelixError };
