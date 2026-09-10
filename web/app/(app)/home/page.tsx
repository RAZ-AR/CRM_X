"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, isCpo, isOverdue, taskZones } from "@/lib/access";
import { zoneReadiness } from "@/lib/readiness";
import { FitnessRings } from "@/components/FitnessRings";

function dayNum(iso: string) {
  return Math.floor(new Date(iso + "T00:00:00").getTime() / 86400000);
}

export default function HomePage() {
  const { current, tasks, zones, users, setPreviewId } = useStore();
  const [banner, setBanner] = useState(true);
  const now = new Date();
  const isoToday = now.toISOString().slice(0, 10);
  if (!current) return null;

  const visible = tasks.filter((t) => canSeeTask(current, t));
  const todayTasks = visible.filter((t) => t.due === isoToday && t.status !== "done");
  const zoneList = isCpo(current) || current.boardZones?.length === 4
    ? zones
    : zones.filter((z) => (current.boardZones ?? []).includes(z.slug) || z.slug === current.zone);
  const zoneCards = zoneList.slice(0, 2);

  const month = now.getMonth();
  const year = now.getFullYear();
  const first = new Date(year, month, 1).getDay() || 7;
  const daysIn = new Date(year, month + 1, 0).getDate();
  const cal: (number | null)[] = [...Array(first - 1).fill(null), ...Array.from({ length: daysIn }, (_, i) => i + 1)];
  const prefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const dueDays = new Set(visible.filter((t) => t.due.startsWith(prefix)).map((t) => Number(t.due.slice(8, 10))));
  const overdueDays = new Set(
    visible.filter(isOverdue).filter((t) => t.due.startsWith(prefix)).map((t) => Number(t.due.slice(8, 10))),
  );

  const roadmapTasks = visible
    .filter((t) => t.status !== "done")
    .slice()
    .sort((a, b) => (a.startDate || a.due).localeCompare(b.startDate || b.due));

  const minD = "2026-09-10";
  const maxD = "2027-01-15";
  const span = dayNum(maxD) - dayNum(minD);
  const dayW = 14;
  const width = span * dayW;
  const todayX = (dayNum(isoToday) - dayNum(minD)) * dayW;
  const rowH = 34;

  function barColor(t: typeof roadmapTasks[0]) {
    const zs = taskZones(t);
    if (zs.length !== 1) return "#9ca3af";
    return zones.find((z) => z.slug === zs[0])?.color ?? "#9ca3af";
  }

  return (
    <div className="grid xl:grid-cols-12 gap-4">
      <section className="xl:col-span-7 bg-[#f4f4f6] rounded-[24px] p-5">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Сегодня</h3>
          <Link href="/kanban" className="text-sm text-[#9a9aa0]">Доска ›</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-3">
          {zoneCards.map((z) => {
            const zt = visible.filter((t) => taskZones(t).includes(z.slug));
            const p = zoneReadiness(z);
            const people = users.filter((u) => u.zone === z.slug).slice(0, 4);
            return (
              <Link key={z.slug} href={`/kanban?zone=${z.slug}`} className="bg-white rounded-2xl p-4 block">
                <div className="font-semibold">{z.emoji} {z.name}</div>
                <p className="text-xs text-[#9a9aa0] mt-1">{zt.length} задач · {z.deadline}</p>
                <div className="flex -space-x-2 mt-3">
                  {people.map((u) => (
                    <span key={u.id} className="h-7 w-7 rounded-full bg-[#f4f4f6] border-2 border-white grid place-items-center text-[10px]">{u.avatar}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <div className="flex-1 h-2 rounded-full bg-[#eee] overflow-hidden">
                    <div className="h-full rounded-full bg-[#2bb673]" style={{ width: `${p}%` }} />
                  </div>
                  <span className="text-xs font-medium">{p}%</span>
                </div>
              </Link>
            );
          })}
        </div>
        {banner && (
          <Link href="/kanban" className="mt-3 bg-black text-white rounded-full px-4 py-3 flex items-center text-sm">
            <span className="flex-1">Сегодня {todayTasks.length} задач. Держи темп 💪</span>
            <span
              className="h-8 w-8 rounded-full bg-white/10 grid place-items-center"
              onClick={(e) => { e.preventDefault(); setBanner(false); }}
            >×</span>
          </Link>
        )}
      </section>

      <section className="xl:col-span-5 bg-white rounded-[24px] p-5 border border-black/5">
        <div className="flex justify-between mb-3">
          <h3 className="font-semibold">Календарь</h3>
          <span className="text-sm text-[#9a9aa0]">{now.toLocaleDateString("ru-RU", { month: "long" })}</span>
        </div>
        <div className="grid grid-cols-7 text-center text-[11px] text-[#9a9aa0] mb-2">
          {["П","В","С","Ч","П","С","В"].map((d,i)=><div key={i}>{d}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-y-2 text-center text-sm">
          {cal.map((d, i) => {
            if (!d) return <div key={`e${i}`} />;
            const iso = `${prefix}-${String(d).padStart(2, "0")}`;
            const isToday = iso === isoToday;
            const has = dueDays.has(d);
            const od = overdueDays.has(d);
            return (
              <Link key={d} href={`/kanban?due=${iso}`}
                className="mx-auto h-8 w-8 rounded-full grid place-items-center"
                style={{
                  background: isToday ? "#111" : od ? "#e86a4a" : has ? "#2bb673" : "transparent",
                  color: isToday || od || has ? "#fff" : "#111",
                }}>{d}</Link>
            );
          })}
        </div>
      </section>

      <section className="xl:col-span-4 bg-white rounded-[24px] p-4 border border-black/5">
        <h3 className="font-semibold mb-2 text-sm">Прогресс проектов</h3>
        <FitnessRings zones={zoneList} />
      </section>

      <section className="xl:col-span-8 bg-white rounded-[24px] p-4 border border-black/5 min-h-[320px]">
        <h3 className="font-semibold mb-2">Roadmap</h3>
        <div className="overflow-auto max-h-[420px] border border-black/5 rounded-xl">
          <div className="relative" style={{ width: width + 180, height: 28 + roadmapTasks.length * rowH }}>
            <div className="sticky top-0 z-10 bg-white/90 h-7 flex text-[10px] text-[#9a9aa0]" style={{ width: width + 180 }}>
              <div className="w-[160px] shrink-0" />
              {Array.from({ length: Math.ceil(span / 7) }, (_, i) => {
                const d = new Date((dayNum(minD) + i * 7) * 86400000);
                return (
                  <div key={i} className="shrink-0" style={{ width: 7 * dayW }}>
                    {d.toLocaleDateString("ru-RU", { day: "numeric", month: "short" })}
                  </div>
                );
              })}
            </div>
            {todayX >= 0 && todayX <= width && (
              <div className="absolute top-7 bottom-0 w-px bg-[#e86a4a] z-[1]" style={{ left: 160 + todayX }} />
            )}
            {roadmapTasks.map((t, i) => {
              const x = (dayNum(t.startDate || t.due) - dayNum(minD)) * dayW;
              const w = Math.max(48, (dayNum(t.due) - dayNum(t.startDate || t.due) + 1) * dayW);
              return (
                <div key={t.id} className="absolute flex items-center" style={{ top: 28 + i * rowH, left: 0, width: width + 180, height: rowH }}>
                  <div className="w-[160px] shrink-0 px-2 text-[11px] truncate text-[#666]">{t.code}</div>
                  <button
                    type="button"
                    onClick={() => setPreviewId(t.id)}
                    className="h-7 rounded-full px-3 text-[11px] font-medium text-[#111] truncate leading-7 text-left"
                    style={{ marginLeft: Math.max(0, x), width: w, background: barColor(t) }}
                    title={t.title}
                  >
                    {t.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
        <p className="text-[10px] text-[#9a9aa0] mt-2">Цвет зоны. Серый — несколько зон. Коралл — сегодня. Скролл по датам и задачам.</p>
      </section>
    </div>
  );
}
