"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import type { Task, Zone } from "@/lib/types";
import { addDays, diffDays, shortDate } from "@/lib/dates";
import { milestoneLanes, type Phase, type PhaseState } from "@/lib/milestones";
import { weightedDone, zoneTasks } from "@/lib/readiness";
import { useWidth } from "@/components/Charts";

const LANE_H = 64;
const HEAD_H = 28;
const MONTHS = ["янв", "фев", "мар", "апр", "май", "июн", "июл", "авг", "сен", "окт", "ноя", "дек"];
const STATE: Record<PhaseState, { label: string }> = {
  done: { label: "готово" },
  active: { label: "в работе" },
  late: { label: "просрочено" },
  todo: { label: "впереди" },
};

/** Roadmap по основным вехам: дорожка на каждый проект, от демонтажа до открытия. */
export function Milestones({ tasks, zones, today, onOpen }: { tasks: Task[]; zones: Zone[]; today: string; onOpen: (id: string) => void }) {
  const [ref, w] = useWidth<HTMLDivElement>(900);
  const lanes = milestoneLanes(tasks, zones, today);
  if (!lanes.length) return null;

  const labelW = w < 640 ? 112 : 176;
  const trackW = Math.max(520, w - labelW);
  const from = addDays([today, ...lanes.map((l) => l.start)].reduce((a, b) => (a < b ? a : b)), -3);
  const to = addDays(lanes.map((l) => l.launch).reduce((a, b) => (a > b ? a : b)), 16);
  const span = Math.max(1, diffDays(from, to));
  const x = (iso: string) => (Math.max(0, Math.min(span, diffDays(from, iso) + 0.5)) / span) * trackW;

  const months: string[] = [];
  for (let d = `${from.slice(0, 8)}01`; d <= to; d = addDays(d, 32).slice(0, 8) + "01") if (d > from) months.push(d);

  const upcoming = lanes
    .flatMap((l) => l.phases.filter((p) => p.state !== "done").map((p) => ({ lane: l, p })))
    .sort((a, b) => a.p.end.localeCompare(b.p.end))
    .slice(0, 6);

  return (
    <div className="flex flex-col gap-5">
      <div ref={ref} className="overflow-x-auto -mx-1 px-1">
        <div className="relative" style={{ width: labelW + trackW, height: HEAD_H + lanes.length * LANE_H }}>
          {/* Месяцы */}
          {months.map((m) => (
            <div key={m} className="absolute top-0 bottom-0 border-l border-dashed border-[var(--line)]" style={{ left: labelW + x(m) }}>
              <span className="cap absolute top-1 left-1.5 !text-[11px] whitespace-nowrap">
                {MONTHS[Number(m.slice(5, 7)) - 1]}
                {m.slice(5, 7) === "01" ? ` ${m.slice(0, 4)}` : ""}
              </span>
            </div>
          ))}

          {/* Сегодня */}
          {today >= from && today <= to && (
            <div className="absolute bottom-0 z-[3] w-px bg-[var(--orange)]" style={{ left: labelW + x(today), top: HEAD_H - 6 }}>
              <span className="absolute -top-5 -translate-x-1/2 rounded-full bg-[var(--orange)] px-1.5 py-px text-[10px] font-semibold text-white whitespace-nowrap">
                сегодня
              </span>
            </div>
          )}

          {lanes.map((l, i) => {
            const pct = weightedDone(zoneTasks(l.zone.slug, tasks));
            const days = diffDays(today, l.launch);
            const x0 = x(l.start);
            const x1 = x(l.launch);
            const elapsed = Math.max(0, Math.min(x1, x(today)) - x0);
            const dots = place(l.phases.filter((p) => p.id !== "open"), x, x1);
            return (
              <div key={l.zone.slug} className="absolute left-0 flex border-t border-[var(--line)]" style={{ top: HEAD_H + i * LANE_H, height: LANE_H, width: labelW + trackW }}>
                <Link
                  href={`/zones/${l.zone.slug}`}
                  className="sticky left-0 z-[4] flex flex-col justify-center gap-0.5 bg-[var(--card)] pr-3 min-w-0"
                  style={{ width: labelW }}
                >
                  <span className="flex items-center gap-1.5 text-[13px] font-semibold min-w-0">
                    <span aria-hidden="true">{l.zone.emoji}</span>
                    <span className="truncate">{l.zone.name}</span>
                    <span className="num cap ml-auto shrink-0 !text-[var(--ink)]">{pct}%</span>
                  </span>
                  <span className="cap truncate !text-[11px]" title={l.next ? `Далее: ${l.next.label} · ${shortDate(l.next.end)}` : undefined}>
                    {l.next ? (
                      <>
                        далее: <span className={l.next.state === "late" ? "!text-[var(--red)]" : ""}>{l.next.label}</span> · {shortDate(l.next.end)}
                      </>
                    ) : days >= 0 ? (
                      "всё к открытию готово"
                    ) : (
                      "открыт"
                    )}
                  </span>
                </Link>

                <div className="relative h-full" style={{ width: trackW }}>
                  {/* План проекта и прошедшее время */}
                  <div className="absolute h-2 rounded-full" style={{ left: x0, width: Math.max(8, x1 - x0), top: LANE_H / 2 - 4, background: /^#[0-9a-f]{6}$/i.test(l.zone.color) ? `${l.zone.color}66` : "var(--track)" }} />
                  {elapsed > 0 && (
                    <div className="absolute h-2 rounded-full" style={{ left: x0, width: elapsed, top: LANE_H / 2 - 4, background: l.zone.color, boxShadow: "inset 0 0 0 1px rgba(0,0,0,.06)" }} />
                  )}

                  {dots.map(({ p, px, dy }) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => onOpen(p.taskId)}
                      className="absolute z-[2] -translate-x-1/2 -translate-y-1/2 transition-transform hover:scale-125 focus-visible:scale-125"
                      style={{ left: px, top: LANE_H / 2 + dy }}
                      title={`${l.zone.name} · ${p.label}: ${shortDate(p.start)}–${shortDate(p.end)} · ${p.done}/${p.total} · ${STATE[p.state].label}`}
                      aria-label={`${l.zone.name}: ${p.label}, ${shortDate(p.end)}, ${STATE[p.state].label}`}
                    >
                      <Dot state={p.state} />
                    </button>
                  ))}

                  {/* Открытие */}
                  <button
                    type="button"
                    onClick={() => (l.launchTaskId ? onOpen(l.launchTaskId) : undefined)}
                    className="absolute z-[3] flex items-center gap-1.5 -translate-y-1/2"
                    style={{ left: x1 - 11, top: LANE_H / 2 }}
                    title={`${l.zone.name}: открытие ${shortDate(l.launch)}`}
                  >
                    <span className="grid h-[22px] w-[22px] place-items-center rounded-full bg-[var(--ink)] text-[11px] shadow-[0_0_0_3px_var(--card)]">🚀</span>
                    <span className="flex flex-col items-start gap-0.5 leading-none whitespace-nowrap">
                      <span className="num text-[12px] font-semibold">{shortDate(l.launch)}</span>
                      <span className={`num cap !text-[10px] ${days < 0 ? "" : days <= 14 ? "!text-[var(--orange)]" : ""}`}>
                        {days > 0 ? `через ${days} дн` : days === 0 ? "сегодня" : "открыт"}
                      </span>
                    </span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ближайшие вехи */}
      {upcoming.length > 0 && (
        <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-3">
          {upcoming.map(({ lane, p }, i) => {
            const d = diffDays(today, p.end);
            return (
              <button
                key={`${lane.zone.slug}-${p.id}`}
                type="button"
                onClick={() => onOpen(p.taskId)}
                className={`${i >= 3 ? "hidden sm:flex" : "flex"} items-center gap-3 rounded-xl bg-[var(--soft)] px-3 py-2.5 text-left hover:bg-[#ecebe6] min-w-0`}
              >
                <Dot state={p.state} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[13px] font-medium">
                    {lane.zone.emoji} {lane.zone.name} · {p.label}
                  </span>
                  <span className="cap num !text-[11px]">
                    {shortDate(p.end)} · {p.done}/{p.total} задач
                  </span>
                </span>
                <span className={`num shrink-0 text-[12px] font-semibold ${p.state === "late" ? "text-[var(--red)]" : d <= 3 ? "text-[var(--orange)]" : "text-[var(--ink-2)]"}`}>
                  {d < 0 ? `−${-d} дн` : d === 0 ? "сегодня" : `${d} дн`}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/** Легенда состояний вех — для шапки секции. */
export function MilestoneLegend() {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
      {(Object.keys(STATE) as PhaseState[]).map((s) => (
        <span key={s} className="cap inline-flex items-center gap-1.5 !text-[11px]">
          <Dot state={s} small />
          {STATE[s].label}
        </span>
      ))}
    </div>
  );
}

function Dot({ state, small }: { state: PhaseState; small?: boolean }) {
  const size = small ? 10 : 14;
  const ring = "0 0 0 2px var(--card)";
  if (state === "done")
    return (
      <span className="grid shrink-0 place-items-center rounded-full bg-[var(--ink)] text-white" style={{ width: size, height: size, boxShadow: ring }}>
        {!small && <Check size={9} strokeWidth={3.5} />}
      </span>
    );
  if (state === "late")
    return (
      <span className="grid shrink-0 place-items-center rounded-full bg-[var(--red)] text-white text-[9px] font-bold" style={{ width: size, height: size, boxShadow: ring }}>
        {!small && "!"}
      </span>
    );
  if (state === "active")
    return (
      <span className="relative grid shrink-0 place-items-center" style={{ width: size, height: size }}>
        {!small && <span className="absolute inset-0 animate-ping rounded-full bg-[var(--blue)] opacity-30" />}
        <span className="relative block rounded-full border-[3px] border-[var(--blue)] bg-[var(--card)]" style={{ width: size, height: size, boxShadow: ring }} />
      </span>
    );
  return <span className="block shrink-0 rounded-full border-2 border-[#c8c6bf] bg-[var(--card)]" style={{ width: size, height: size, boxShadow: ring }} />;
}

/** Точки вех на дорожке: близкие по дате разводим вверх/вниз, чтобы не слипались. */
function place(phases: Phase[], x: (iso: string) => number, launchPx: number) {
  const levels = [0, -15, 15];
  const last = levels.map(() => -Infinity);
  return phases
    .slice()
    .sort((a, b) => a.end.localeCompare(b.end))
    .map((p) => {
      const px = x(p.end);
      // Нулевой уровень у самого открытия занят ракетой.
      let li = levels.findIndex((_, i) => px - last[i] >= 16 && !(i === 0 && launchPx - px < 18));
      if (li < 0) li = last.indexOf(Math.min(...last));
      last[li] = px;
      return { p, px, dy: levels[li] };
    });
}
