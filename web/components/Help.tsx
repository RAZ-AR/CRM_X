"use client";

import Link from "next/link";
import { useEffect } from "react";
import { BookOpen, ChevronDown, X } from "lucide-react";
import { COMMON_FAQ, HELP_TOPICS, ONBOARDING, helpFor, type Faq } from "@/lib/help";
import { STREAM_META } from "@/lib/readiness";
import { STREAMS } from "@/lib/types";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="flex flex-col">
      {items.map((f) => (
        <details key={f.q} className="group border-t border-[var(--line)] first:border-t-0">
          <summary className="flex items-start gap-2 py-3 cursor-pointer list-none text-[15px] font-medium [&::-webkit-details-marker]:hidden">
            <span className="flex-1">{f.q}</span>
            <ChevronDown size={16} className="mt-1 shrink-0 text-[var(--muted)] transition-transform group-open:rotate-180" aria-hidden="true" />
          </summary>
          <p className="m-0 pb-3 text-sm text-[var(--ink-2)] leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function StreamGlossary() {
  return (
    <div className="flex flex-col gap-2 mt-2">
      {STREAMS.map((s) => (
        <div key={s} className="flex items-start gap-2.5 text-sm">
          <span className="h-2.5 w-2.5 rounded-[3px] shrink-0 mt-1.5" style={{ background: STREAM_META[s].color }} aria-hidden="true" />
          <span>
            <b className="font-semibold">{s}</b> <span className="text-[var(--muted)]">— {STREAM_META[s].label}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

/** Онбординг целиком — страница в Wiki. */
export function OnboardingGuide() {
  return (
    <div className="flex flex-col gap-6">
      <p className="m-0 text-[15px] leading-relaxed text-[var(--ink-2)]">{ONBOARDING.intro}</p>
      {ONBOARDING.sections.map((s) => (
        <section key={s.title}>
          <h3 className="text-base font-semibold m-0 mb-2">{s.title}</h3>
          <ul className="m-0 pl-5 flex flex-col gap-1.5 text-sm leading-relaxed text-[var(--ink-2)] list-disc">
            {s.body.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          {s.title.includes("Потоки") && <StreamGlossary />}
        </section>
      ))}
    </div>
  );
}

/** Все FAQ по разделам — страница «Справка» в Wiki. */
export function HelpIndex() {
  return (
    <div className="flex flex-col gap-6">
      {HELP_TOPICS.map((t) => (
        <section key={t.key} id={`help-${t.key}`}>
          <h3 className="text-base font-semibold m-0">{t.title}</h3>
          <p className="cap m-0 mt-1 mb-1">{t.summary}</p>
          <FaqList items={t.faq} />
        </section>
      ))}
      <section>
        <h3 className="text-base font-semibold m-0 mb-1">Общее</h3>
        <FaqList items={COMMON_FAQ} />
      </section>
    </div>
  );
}

/** Боковая панель «?»: справка по текущему разделу. */
export function HelpDrawer({ path, onClose }: { path: string; onClose: () => void }) {
  const topic = helpFor(path);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex justify-end" onMouseDown={onClose}>
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Справка"
        className="h-full w-full sm:w-[420px] bg-[var(--card)] shadow-2xl flex flex-col"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-5 pt-5 pb-3">
          <div className="flex-1 min-w-0">
            <div className="cap">Справка</div>
            <h2 className="text-xl font-semibold m-0 truncate">{topic?.title ?? "CRM X"}</h2>
          </div>
          <button type="button" onClick={onClose} className="h-9 w-9 rounded-full grid place-items-center hover:bg-[var(--soft)]" aria-label="Закрыть справку">
            <X size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 pb-5">
          {topic && <p className="text-sm text-[var(--ink-2)] mt-0 mb-3 leading-relaxed">{topic.summary}</p>}
          {topic && <FaqList items={topic.faq} />}
          <div className="cap mt-5 mb-1">Общее</div>
          <FaqList items={COMMON_FAQ} />
        </div>
        <div className="border-t border-[var(--line)] px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] flex flex-wrap gap-2">
          <Link href="/wiki?page=onboarding" onClick={onClose} className="pill bg-[var(--ink)] text-white px-4 py-2 text-sm flex items-center gap-2">
            <BookOpen size={15} /> Онбординг
          </Link>
          <Link href={`/wiki?page=help${topic ? `#help-${topic.key}` : ""}`} onClick={onClose} className="pill bg-[var(--soft)] px-4 py-2 text-sm">
            Вся справка
          </Link>
        </div>
      </aside>
    </div>
  );
}
