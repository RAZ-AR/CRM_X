"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useStore } from "@/lib/store";

const hhmm = (iso?: string) => {
  if (!iso) return "";
  const d = new Date(iso);
  const sameDay = d.toDateString() === new Date().toDateString();
  return sameDay
    ? d.toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" })
    : d.toLocaleDateString("ru-RU", { day: "2-digit", month: "2-digit" });
};

/** Шапка CRM X: когда была синхронизация с Helix и кнопка «синхронизировать сейчас». */
export function HelixSyncButton() {
  const { helixSync } = useStore();
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ text: string; bad?: boolean } | null>(null);

  async function run() {
    if (busy) return;
    setBusy(true);
    setMsg(null);
    try {
      const res = await fetch("/api/helix/sync", { method: "POST", credentials: "same-origin" });
      const d = await res.json().catch(() => ({}));
      if (!d.ok) throw new Error(d.error || "Helix не ответил");
      const n = (d.added ?? 0) + (d.statusChanged ?? 0) + (d.dueChanged ?? 0);
      setMsg({ text: n ? `обновлено: ${n}` : "без изменений" });
    } catch (e) {
      setMsg({ text: e instanceof Error ? e.message : "ошибка", bad: true });
    } finally {
      setBusy(false);
      setTimeout(() => setMsg(null), 6000);
    }
  }

  const when = hhmm(helixSync?.at);
  const title = busy
    ? "Синхронизирую с Helix…"
    : `Синхронизировать с Helix сейчас${when ? ` · последняя ${when}${helixSync?.by ? `, ${helixSync.by}` : ""}` : ""}. Автоматически — раз в 6 часов.`;

  return (
    <button
      type="button"
      onClick={run}
      disabled={busy}
      title={title}
      aria-label={title}
      className="h-10 rounded-full bg-[var(--card)] flex items-center gap-2 px-3 shrink-0 text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--apricot-2)] transition-colors disabled:opacity-70"
    >
      <RefreshCw size={16} className={busy ? "animate-spin motion-reduce:animate-none" : ""} />
      <span className="hidden lg:inline text-[12px] font-bold uppercase tracking-[0.06em]">Helix</span>
      <span
        aria-live="polite"
        className={`hidden sm:inline text-[12px] num ${msg?.bad ? "text-[var(--red)]" : "text-[var(--muted)]"} max-w-[14rem] truncate`}
      >
        {busy ? "синхронизация…" : msg ? msg.text : when}
      </span>
    </button>
  );
}
