"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, isCpo, isOverdue, taskZones } from "@/lib/access";
import { STREAMS } from "@/lib/types";
import { STREAM_META, weightedDone } from "@/lib/readiness";
import { addDays, diffDays, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import { cascade, isMilestone } from "@/lib/schedule";
import { X } from "lucide-react";

const DAY_W = 16;
const ROW_H = 30;
const LABEL_W = 220;

/** Timeline по 7 потокам с вехами запусков и предпросмотром переноса сроков. */
export default function TimelinePage() {
  const { current, tasks, users, zones, saveTaskDates, setPreviewId } = useStore();
  const today = todayYerevan();
  const [zone, setZone] = useState("all");
  const [selected, setSelected] = useState<string | null>(null);
  const [draft, setDraft] = useState<{ start: string; due: string } | null>(null);
  const [applying, setApplying] = useState(false);
  const [error, setError] = useState("");

  const visible = useMemo(
    () =>
      current
        ? tasks.filter((t) => canSeeTask(current, t, users) && (zone === "all" || taskZones(t).includes(zone)))
        : [],
    [current, tasks, users, zone],
  );
  const task = selected ? tasks.find((t) => t.id === selected) ?? null : null;
  const shifts = useMemo(
    () => (task && draft ? cascade(tasks, task.id, draft.start, draft.due) : []),
    [tasks, task, draft],
  );
  if (!current) return null;

  const owner = isCpo(current);
  const moved = new Map(shifts.map((s) => [s.task.id, s]));
  const launches = zones
    .filter((z) => z.slug !== "common" && z.deadline)
    .sort((a, b) => a.deadline.localeCompare(b.deadline));

  const starts = visible.map((t) => t.startDate || t.due);
  const ends = [...visible.map((t) => t.due), ...shifts.map((s) => s.toDue), ...launches.map((z) => z.deadline)];
  const from = weekStart(starts.length ? starts.reduce((a, b) => (a < b ? a : b)) : today);
  const to = addDays(ends.length ? ends.reduce((a, b) => (a > b ? a : b)) : today, 7);
  const days = diffDays(from, to) + 1;
  const x = (iso: string) => diffDays(from, iso) * DAY_W;
  const width = days * DAY_W;

  const lanes = [...STREAMS, ""].map((stream) => ({
    stream,
    list: visible
      .filter((t) => (stream ? t.workstream === stream : !STREAMS.includes(t.workstream as never)))
      .sort((a, b) => (a.startDate || a.due).localeCompare(b.startDate || b.due)),
  })).filter((l) => l.list.length);

  const pick = (id: string) => {
    const t = tasks.find((x) => x.id === id)!;
    setSelected(id);
    setError("");
    setDraft({ start: t.startDate || t.due, due: t.due });
  };
  const nudge = (n: number) => draft && setDraft({ start: addDays(draft.start, n), due: addDays(draft.due, n) });
  const close = () => {
    setSelected(null);
    setDraft(null);
    setError("");
  };
  const apply = async () => {
    setApplying(true);
    setError("");
    const r = await saveTaskDates(shifts.map((s) => ({ id: s.task.id, startDate: s.toStart, due: s.toDue })));
    setApplying(false);
    if (r.ok) close();
    else setError(`${r.error}. Сохранено ${r.saved} из ${shifts.length}, остальное не изменено.`);
  };
  const launchMoves = shifts.filter((s) => isMilestone(s.task));

  let y = 0;
  const rows: React.ReactNode[] = [];
  for (const lane of lanes) {
    const meta = lane.stream ? STREAM_META[lane.stream as keyof typeof STREAM_META] : { label: "Без потока", color: "#E5E7EB" };
    rows.push(
      <div key={`h-${lane.stream}`} className="absolute left-0 flex items-center bg-[#F3F2EE] text-xs font-semibold" style={{ top: y, height: ROW_H, width: width + LABEL_W }}>
        <span className="sticky left-0 px-3 bg-[#F3F2EE] flex items-center gap-2" style={{ width: LABEL_W }}>
          <span className="h-2.5 w-2.5 rounded-full" style={{ background: meta.color }} />
          {lane.stream || "—"} <span className="font-normal text-[#6F6E69]">{weightedDone(lane.list)}%</span>
        </span>
      </div>,
    );
    y += ROW_H;
    for (const t of lane.list) {
      const s = t.startDate || t.due;
      const z = zones.find((zz) => zz.slug === t.zone);
      const m = moved.get(t.id);
      const late = isOverdue(t, today);
      const milestone = isMilestone(t);
      rows.push(
        <div key={t.id} className="absolute left-0 flex items-center" style={{ top: y, height: ROW_H, width: width + LABEL_W }}>
          <button type="button" onClick={() => setPreviewId(t.id)} className="sticky left-0 z-[2] bg-white h-full px-3 text-left text-[11px] truncate border-r border-black/5" style={{ width: LABEL_W }} title={t.title}>
            <span className="text-[#6F6E69]">{t.code}</span> {t.title}
          </button>
          <div className="relative h-full" style={{ width }}>
            {m && (
              <div
                className="absolute top-1.5 h-[18px] rounded-full border-2 border-dashed border-[#e86a4a]"
                style={{ left: x(m.toStart), width: Math.max(DAY_W, (diffDays(m.toStart, m.toDue) + 1) * DAY_W) }}
              />
            )}
            {milestone ? (
              <button
                type="button"
                onClick={() => pick(t.id)}
                className="absolute top-1.5 h-[18px] w-[18px] rotate-45 rounded-[3px]"
                style={{ left: x(t.due) - 1, background: z?.color ?? "#111", outline: selected === t.id ? "2px solid #111" : undefined, opacity: m ? 0.35 : 1 }}
                title={`${t.title} · ${shortDate(t.due)}`}
              />
            ) : (
              <button
                type="button"
                onClick={() => pick(t.id)}
                className="absolute top-1.5 h-[18px] rounded-full text-[10px] px-1.5 text-left truncate"
                style={{
                  left: x(s),
                  width: Math.max(DAY_W, (diffDays(s, t.due) + 1) * DAY_W),
                  background: t.status === "done" ? "#e5e7eb" : z?.color ?? "#ddd",
                  boxShadow: t.criticalPath ? "inset 0 0 0 2px #b91c1c" : undefined,
                  outline: selected === t.id ? "2px solid #111" : undefined,
                  opacity: m ? 0.35 : 1,
                }}
                title={`${t.title} · ${shortDate(s)}–${shortDate(t.due)}`}
              >
                {late ? "🔥 " : ""}{shortDate(t.due)}
              </button>
            )}
          </div>
        </div>,
      );
      y += ROW_H;
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2 pb-1">
        <h1 className="page-title m-0 mr-auto">Timeline</h1>
        <div className="flex flex-wrap gap-1.5 text-[11px] text-[#6F6E69]">
          <span className="pill bg-[#F3F2EE] px-2 py-1"><span className="inline-block h-2 w-3 rounded-full align-middle mr-1" style={{ boxShadow: "inset 0 0 0 2px #b91c1c" }} />critical path</span>
          <span className="pill bg-[#F3F2EE] px-2 py-1">◆ запуск</span>
          <span className="pill bg-[#F3F2EE] px-2 py-1"><span className="text-[#e86a4a]">|</span> сегодня</span>
        </div>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
      </div>
      <p className="text-xs text-[#6F6E69] px-1">Нажмите на полоску задачи, чтобы примерить перенос срока и увидеть, что сдвинется следом.</p>

      <div className="card overflow-auto max-h-[calc(100dvh-220px)]">
        <div className="relative" style={{ width: width + LABEL_W, height: y + 28 }}>
          <div className="sticky top-0 z-[3] flex h-7 bg-white border-b border-black/5 text-[10px] text-[#6F6E69]" style={{ width: width + LABEL_W }}>
            <div className="sticky left-0 bg-white shrink-0" style={{ width: LABEL_W }} />
            {Array.from({ length: Math.ceil(days / 7) }, (_, i) => (
              <div key={i} className="shrink-0 border-l border-black/5 pl-1 pt-1.5" style={{ width: 7 * DAY_W }}>
                {shortDate(addDays(from, i * 7))}
              </div>
            ))}
          </div>
          <div className="absolute left-0" style={{ top: 28, width: width + LABEL_W, height: y }}>
            {launches.map((z) => (
              <div key={z.slug} className="absolute top-0 bottom-0 w-0.5 z-[1]" style={{ left: LABEL_W + x(z.deadline) + DAY_W / 2, background: z.color }}>
                <span className="sticky top-8 block -translate-x-1/2 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[10px] font-semibold" style={{ background: z.color }}>
                  {z.emoji} {shortDate(z.deadline)}
                </span>
              </div>
            ))}
            {today >= from && today <= to && (
              <div className="absolute top-0 bottom-0 w-px bg-[#e86a4a] z-[1]" style={{ left: LABEL_W + x(today) + DAY_W / 2 }} />
            )}
            {rows}
          </div>
        </div>
      </div>

      {task && draft && (
        <div className="fixed inset-x-0 bottom-0 z-40 md:inset-x-auto md:right-6 md:bottom-6 md:w-[420px]">
          <div className="bg-white rounded-t-[24px] md:rounded-[24px] shadow-2xl p-5 max-h-[70dvh] overflow-y-auto">
            <div className="flex items-start gap-2 mb-3">
              <div className="flex-1 min-w-0">
                <div className="text-[11px] text-[#6F6E69]">{task.code} · перенос срока</div>
                <div className="font-semibold leading-snug">{task.title}</div>
              </div>
              <button type="button" className="h-8 w-8 rounded-full bg-[#F3F2EE] grid place-items-center" onClick={close} aria-label="Закрыть">
                <X size={16} />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <label className="text-xs text-[#6F6E69]">Начало
                <input type="date" className="w-full mt-1" value={draft.start} onChange={(e) => e.target.value && setDraft({ start: e.target.value, due: e.target.value > draft.due ? e.target.value : draft.due })} />
              </label>
              <label className="text-xs text-[#6F6E69]">Конец
                <input type="date" className="w-full mt-1" min={draft.start} value={draft.due} onChange={(e) => e.target.value && setDraft({ start: draft.start, due: e.target.value < draft.start ? draft.start : e.target.value })} />
              </label>
            </div>
            <div className="flex gap-1.5 mt-2">
              {[-1, 1, 3, 7].map((n) => (
                <button key={n} type="button" className="pill bg-[#F3F2EE] px-3 py-1 text-xs" onClick={() => nudge(n)}>
                  {n > 0 ? `+${n}` : n} дн
                </button>
              ))}
            </div>

            <div className="mt-4 text-sm">
              {shifts.length <= 1 ? (
                <p className="text-[#6F6E69]">{shifts.length ? "Другие задачи не сдвигаются — есть запас." : "Даты не изменены."}</p>
              ) : (
                <>
                  <div className="font-medium mb-1">Сдвинется следом: {shifts.length - 1}</div>
                  {launchMoves.map((s) => (
                    <div key={s.task.id} className="rounded-2xl bg-[#fee2e2] text-[#991b1b] px-3 py-2 mb-2 font-medium">
                      {s.task.title}: {shortDate(s.fromDue)} → {shortDate(s.toDue)} (+{s.days} дн)
                    </div>
                  ))}
                  <div className="space-y-1">
                    {shifts.filter((s) => s.task.id !== task.id && !isMilestone(s.task)).map((s) => (
                      <div key={s.task.id} className="flex gap-2 text-xs">
                        <span className="text-[#6F6E69] w-14 shrink-0">{s.task.code}</span>
                        <span className="flex-1 truncate">{s.task.title}</span>
                        <span className="shrink-0">{shortDate(s.fromDue)} → <b>{shortDate(s.toDue)}</b></span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            {error && <p className="mt-3 text-sm text-red-500">{error}</p>}
            <div className="flex gap-2 mt-4">
              <button type="button" className="pill bg-[#F3F2EE] px-4 py-2 text-sm" onClick={() => setPreviewId(task.id)}>Открыть задачу</button>
              {owner ? (
                <button type="button" disabled={!shifts.length || applying} className="pill bg-black text-white px-4 py-2 text-sm flex-1 disabled:opacity-40" onClick={apply}>
                  {applying ? "Сохраняю…" : `Применить${shifts.length > 1 ? ` (${shifts.length})` : ""}`}
                </button>
              ) : (
                <span className="text-xs text-[#6F6E69] self-center">Применить может Owner</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
