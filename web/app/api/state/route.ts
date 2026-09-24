import { after, NextResponse } from "next/server";
import { loadSharedState, updateSharedState } from "@/lib/blobState";
import { normalizeState } from "@/lib/normalize";
import type { AppState } from "@/lib/types";
import { sessionUser } from "@/lib/session";
import { filterState, mergeState } from "@/lib/publicUser";
import { withActivity } from "@/lib/activity";
import { sendDueReminders } from "@/lib/reminders";
import { appUrlFrom } from "@/lib/telegram";

export async function GET(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const { state, via } = await loadSharedState();
    try {
      // Напоминания в Telegram — после ответа, чтобы не задерживать опрос.
      after(() => sendDueReminders(state, appUrlFrom(req)).catch((e) => console.warn("reminders", e)));
    } catch {
      /* вне запроса (тесты) after недоступен */
    }
    return NextResponse.json({ ok: true, via, me: user.id, state: filterState(state, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "store";
    return NextResponse.json({ ok: false, local: true, error: msg });
  }
}

export async function PUT(req: Request) {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  try {
    const body = (await req.json()) as { state?: AppState };
    if (!body.state) return NextResponse.json({ ok: false }, { status: 400 });
    const incoming = normalizeState(body.state);
    const { merged, via } = await updateSharedState((existing) => {
      let merged = mergeState(existing, incoming, user);
      const known = new Set(existing.comments.map((c) => c.id));
      const fresh = merged.comments.filter((c) => !known.has(c.id));
      merged = withActivity(
        merged,
        fresh.flatMap((c) => {
          const t = merged.tasks.find((x) => x.id === c.taskId);
          return t
            ? [{ userId: user.id, taskId: t.id, taskTitle: t.title, kind: "comment" as const, text: `💬 ${c.text.slice(0, 120)}`, criticalPath: t.criticalPath }]
            : [];
        }),
      );
      return { state: merged, result: { merged } };
    });
    return NextResponse.json({ ok: true, via, state: filterState(merged, user) });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "store";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
