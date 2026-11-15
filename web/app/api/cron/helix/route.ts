import { NextResponse } from "next/server";
import { updateSharedState } from "@/lib/blobState";
import { applyHelix, fetchHelixTasks, flattenHelix, HelixError, mapHelix } from "@/lib/helix";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

/**
 * Синхронизация Helix → Quicky. Вызывает GitHub Actions (.github/workflows/helix-sync.yml)
 * каждые 2 часа: Authorization: Bearer $CRON_SECRET. ?dry=1 — посчитать, ничего не записывая.
 * Env: HELIX_USERNAME, HELIX_PASSWORD, [HELIX_URL], [HELIX_USER_MAP — JSON {"Имя в Helix": "id пользователя"}].
 */
export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret || req.headers.get("authorization") !== `Bearer ${secret}`) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const dry = new URL(req.url).searchParams.get("dry") === "1";
  try {
    let explicit: Record<string, string> = {};
    try { explicit = JSON.parse(process.env.HELIX_USER_MAP || "{}"); } catch { /* пустое соответствие */ }
    const flat = flattenHelix(await fetchHelixTasks());
    const report = await updateSharedState((state) => {
      const mapped = mapHelix(flat, state.users, explicit);
      if (!mapped.tasks.length) throw new HelixError("в Helix нет задач, где исполнитель — кто-то из команды Quicky");
      const { next, changes } = applyHelix(state, mapped, new Date().toISOString());
      const result = {
        helixTotal: flat.length, synced: mapped.tasks.length, open: mapped.tasks.filter((t) => t.status !== "done").length,
        checklist: mapped.subtasks.length, unmapped: mapped.unmapped, ...changes, dry,
      };
      return dry ? { result } : { state: next, result };
    });
    return NextResponse.json({ ok: true, ...report });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    console.error("helix sync", msg);
    return NextResponse.json({ ok: false, error: msg }, { status: e instanceof HelixError ? 502 : 500 });
  }
}
