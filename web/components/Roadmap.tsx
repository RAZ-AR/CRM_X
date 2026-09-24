"use client";

import { useState } from "react";
import type { Task, Zone } from "@/lib/types";
import { addDays, diffDays, shortDate, weekStart } from "@/lib/dates";
import { isMilestone } from "@/lib/schedule";
import { isOverdue } from "@/lib/access";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Scale = "week" | "month" | "quarter" | "all";
const SCALES: { id: Scale; label: string; days: number; dayW: number }[] = [
  { id: "week", label: "Неделя", days: 7, dayW: 96 },
  { id: "month", label: "Месяц", days: 35, dayW: 26 },
  { id: "quarter", label: "Квартал", days: 91, dayW: 10 },
  { id: "all", label: "Всё", days: 0, dayW: 6 },
];
const KEY = "crmx-roadmap-scale";
const LABEL_W = 150;
const ROW_H = 28;

/** Roadmap на главной: неделя / месяц / квартал / весь план, листается стрелками. */
export function Roadmap({
  tasks,
  zones,
  today,
  onOpen,
}: {
  tasks: Task[];
  zones: Zone[];
  today: string;
  onOpen: (id: string) => void;
}) {
  const [scale, setScale] = useState<Scale>(() => {
    try {
      const saved = localStorage.getItem(KEY) as Scale | null;
      return saved && SCALES.some((s) => s.id === saved) ? saved : "week";
    } catch {
      return "week";
    }
  });
  const [offset, setOffset] = useState(0);
  const [showDone, setShowDone] = useState(false);

  const pick = (s: Scale) => {
    setScale(s);
    setOffset(0);
    try {
      localStorage.setItem(KEY, s);
    } catch {
      /* ignore */
    }
  };

  const conf = SCALES.find((s) => s.id === scale)!;
  const list = tasks.filter((t) => showDone || t.status !== "done");
  let from: string;
  let days: number;
  if (scale === "all") {
    const starts = list.map((t) => t.startDate || t.due);
    const ends = list.map((t) => t.due);
    from = weekStart(starts.length ? starts.reduce((a, b) => (a < b ? a : b)) : today);
    days = Math.max(28, diffDays(from, ends.length ? ends.reduce((a, b) => (a > b ? a : b)) : today) + 7);
  } else {
    const base = scale === "week" ? weekStart(today) : addDays(weekStart(today), -7);
    from = addDays(base, offset * (scale === "week" ? 7 : scale === "month" ? 28 : 91));
    days = conf.days;
  }
  const to = addDays(from, days - 1);
  const dayW = conf.dayW;
  const width = days * dayW;
  const rows = list
    .filter((t) => (t.startDate || t.due) <= to && t.due >= from)
    .sort((a, b) => (a.startDate || a.due).localeCompare(b.startDate || b.due) || a.due.localeCompare(b.due));
  const x = (iso: string) => Math.max(0, Math.min(days, diffDays(from, iso))) * dayW;
  const launches = zones.filter((z) => z.slug !== "common" && z.deadline >= from && z.deadline <= to);
  const tickEvery = scale === "week" ? 1 : scale === "month" ? 7 : scale === "quarter" ? 14 : 28;

  return (
    <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <h3 className="font-semibold mr-auto">Roadmap</h3>
        <div className="flex rounded-full bg-[#f4f4f6] p-0.5 text-xs">
          {SCALES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => pick(s.id)}
              className={`rounded-full px-3 py-1 ${scale === s.id ? "bg-black text-white" : "text-[#6b6b70]"}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        {scale !== "all" && (
          <div className="flex items-center gap-1 text-xs">
            <button type="button" className="pill bg-[#f4f4f6] p-1.5" aria-label="Назад" onClick={() => setOffset(offset - 1)}>
              <ChevronLeft size={14} />
            </button>
            <button type="button" className="pill bg-[#f4f4f6] px-2 py-1" onClick={() => setOffset(0)}>
              {shortDate(from)} – {shortDate(to)}
            </button>
            <button type="button" className="pill bg-[#f4f4f6] p-1.5" aria-label="Вперёд" onClick={() => setOffset(offset + 1)}>
              <ChevronRight size={14} />
            </button>
          </div>
        )}
        <label className="flex items-center gap-1 text-xs text-[#6b6b70]">
          <input type="checkbox" checked={showDone} onChange={(e) => setShowDone(e.target.checked)} /> готовые
        </label>
      </div>

      <div className="overflow-auto max-h-[420px] border border-black/5 rounded-xl">
        <div className="relative" style={{ width: width + LABEL_W, height: 26 + Math.max(1, rows.length) * ROW_H }}>
          <div className="sticky top-0 z-[3] flex h-6 bg-white border-b border-black/5 text-[10px] text-[#9a9aa0]">
            <div className="sticky left-0 z-[4] bg-white shrink-0" style={{ width: LABEL_W }} />
            {Array.from({ length: Math.ceil(days / tickEvery) }, (_, i) => {
              const d = addDays(from, i * tickEvery);
              return (
                <div key={i} className={`shrink-0 border-l border-black/5 pl-1 pt-1 ${d === today ? "text-[#e86a4a] font-semibold" : ""}`} style={{ width: tickEvery * dayW }}>
                  {scale === "week"
                    ? `${["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"][i]} ${shortDate(d)}`
                    : shortDate(d)}
                </div>
              );
            })}
          </div>
          {rows.length === 0 && <div className="p-4 text-sm text-[#9a9aa0]">В этом периоде задач нет</div>}
          {launches.map((z) => (
            <div key={z.slug} className="absolute top-6 bottom-0 w-0.5 z-[1]" style={{ left: LABEL_W + x(z.deadline) + dayW / 2, background: z.color }} title={`${z.name} ${shortDate(z.deadline)}`} />
          ))}
          {today >= from && today <= to && (
            <div className="absolute top-6 bottom-0 w-px bg-[#e86a4a] z-[1]" style={{ left: LABEL_W + x(today) + dayW / 2 }} />
          )}
          {rows.map((t, i) => {
            const s = t.startDate || t.due;
            const left = x(s);
            const right = x(addDays(t.due, 1));
            const z = zones.find((zz) => zz.slug === t.zone);
            const late = isOverdue(t, today);
            return (
              <div key={t.id} className="absolute left-0 flex items-center" style={{ top: 26 + i * ROW_H, height: ROW_H, width: width + LABEL_W }}>
                <button type="button" onClick={() => onOpen(t.id)} className="sticky left-0 z-[2] h-full bg-white px-2 text-left text-[11px] truncate border-r border-black/5" style={{ width: LABEL_W }} title={t.title}>
                  <span className="text-[#9a9aa0]">{t.code}</span> {t.title}
                </button>
                <div className="relative h-full" style={{ width }}>
                  {isMilestone(t) ? (
                    <button type="button" onClick={() => onOpen(t.id)} className="absolute top-1.5 h-4 w-4 rotate-45 rounded-[3px]" style={{ left: x(t.due) + dayW / 2 - 8, background: z?.color ?? "#111" }} title={`${t.title} · ${shortDate(t.due)}`} />
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpen(t.id)}
                      className="absolute top-1 h-5 rounded-full px-1.5 text-[10px] text-left truncate"
                      style={{
                        left,
                        width: Math.max(8, right - left - 2),
                        background: t.status === "done" ? "#e5e7eb" : z?.color ?? "#ddd",
                        boxShadow: t.criticalPath ? "inset 0 0 0 2px #b91c1c" : undefined,
                      }}
                      title={`${t.title} · ${shortDate(s)}–${shortDate(t.due)}`}
                    >
                      {late ? "🔥 " : ""}
                      {scale === "week" || scale === "month" ? t.title : ""}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
