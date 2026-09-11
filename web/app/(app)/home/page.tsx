"use client";

import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, isOverdue, taskZones } from "@/lib/access";
import { zoneReadiness } from "@/lib/readiness";
import { FitnessRings } from "@/components/FitnessRings";
import { TaskCard } from "@/components/TaskCard";

function dayNum(iso: string) {
  return Math.floor(new Date(iso + "T00:00:00").getTime() / 86400000);
}

export default function HomePage() {
  const { current, tasks, zones, users, setPreviewId } = useStore();
  const now = new Date();
  const [calOpen, setCalOpen] = useState(false);
  const [picked, setPicked] = useState(now.toISOString().slice(0, 10));
  if (!current) return null;

  const visible = tasks.filter((t) => canSeeTask(current, t));
  const zoneList = zones;
  const dayTasks = visible.filter((t) => t.due === picked && t.status !== "done");

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
  const dayW = 12;
  const width = span * dayW;
  const todayX = (dayNum(picked) - dayNum(minD)) * dayW;
  const rowH = 32;

  function barColor(t: (typeof roadmapTasks)[0]) {
    const zs = taskZones(t);
    if (zs.length !== 1) return "#9ca3af";
    return zones.find((z) => z.slug === zs[0])?.color ?? "#9ca3af";
  }

  const dateLabel = new Date(picked + "T12:00:00").toLocaleDateString("ru-RU", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });

  return (
    <div className="space-y-4">
      <div className="relative flex items-center gap-2">
        <button
          type="button"
          onClick={() => setCalOpen((v) => !v)}
          className="pill bg-black text-white px-4 py-2 text-sm capitalize"
        >
          {dateLabel}
        </button>
        {calOpen && (
          <div className="absolute left-0 top-12 z-20 w-[min(20rem,100%)] bg-white rounded-2xl shadow-lg border border-black/5 p-4">
            <div className="grid grid-cols-7 text-center text-[11px] text-[#9a9aa0] mb-2">
              {["П", "В", "С", "Ч", "П", "С", "В"].map((d, i) => (
                <div key={i}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1 text-center text-sm">
              {cal.map((d, i) => {
                if (!d) return <div key={`e${i}`} />;
                const iso = `${prefix}-${String(d).padStart(2, "0")}`;
                const on = iso === picked;
                const has = dueDays.has(d);
                const od = overdueDays.has(d);
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => {
                      setPicked(iso);
                      setCalOpen(false);
                    }}
                    className="mx-auto h-8 w-8 rounded-full"
                    style={{
                      background: on ? "#111" : od ? "#e86a4a" : has ? "#2bb673" : "transparent",
                      color: on || od || has ? "#fff" : "#111",
                    }}
                  >
                    {d}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <section className="grid grid-cols-2 gap-3">
        {zoneList.map((z) => {
          const n = visible.filter((t) => taskZones(t).includes(z.slug)).length;
          const p = zoneReadiness(z);
          return (
            <Link
              key={z.slug}
              href={`/kanban?zone=${z.slug}`}
              className="rounded-2xl p-4 min-h-[110px] flex flex-col"
              style={{ background: z.color }}
            >
              <div className="text-sm font-semibold">
                {z.emoji} {z.name}
              </div>
              <div className="text-2xl font-bold mt-auto">{p}%</div>
              <div className="text-[11px] opacity-70">{n} задач</div>
            </Link>
          );
        })}
      </section>

      <section className="bg-white rounded-2xl p-4 border border-black/5">
        <h3 className="font-semibold mb-2 text-sm">Прогресс проектов</h3>
        <FitnessRings zones={zoneList} />
      </section>

      <section>
        <div className="flex justify-between items-center mb-2 px-1">
          <h3 className="font-semibold">Задачи на {dateLabel}</h3>
          <span className="text-xs text-[#9a9aa0]">{dayTasks.length}</span>
        </div>
        <div className="flex gap-3 overflow-x-auto snap-x pb-2 -mx-1 px-1">
          {dayTasks.length === 0 && (
            <p className="text-sm text-[#9a9aa0] py-6">На эту дату открытых задач нет</p>
          )}
          {dayTasks.map((t) => (
            <div key={t.id} className="min-w-[78%] max-w-[78%] sm:min-w-[280px] snap-center shrink-0">
              <TaskCard task={t} users={users} zones={zones} />
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl p-4 border border-black/5">
        <h3 className="font-semibold mb-2">Roadmap</h3>
        <div className="overflow-auto max-h-[360px] border border-black/5 rounded-xl">
          <div className="relative" style={{ width: width + 140, height: 24 + roadmapTasks.length * rowH }}>
            <div className="sticky top-0 z-10 bg-white/90 h-6 flex text-[10px] text-[#9a9aa0]">
              <div className="w-[120px] shrink-0" />
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
              <div className="absolute top-6 bottom-0 w-px bg-[#e86a4a] z-[1]" style={{ left: 120 + todayX }} />
            )}
            {roadmapTasks.map((t, i) => {
              const x = (dayNum(t.startDate || t.due) - dayNum(minD)) * dayW;
              const w = Math.max(40, (dayNum(t.due) - dayNum(t.startDate || t.due) + 1) * dayW);
              return (
                <div
                  key={t.id}
                  className="absolute flex items-center"
                  style={{ top: 24 + i * rowH, left: 0, width: width + 140, height: rowH }}
                >
                  <div className="w-[120px] shrink-0 px-1 text-[10px] truncate text-[#666]">{t.code}</div>
                  <button
                    type="button"
                    onClick={() => setPreviewId(t.id)}
                    className="h-6 rounded-full px-2 text-[10px] font-medium text-[#111] truncate text-left"
                    style={{ marginLeft: Math.max(0, x), width: w, background: barColor(t) }}
                  >
                    {t.title}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
