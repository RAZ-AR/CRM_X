"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, statusMeta, taskZones } from "@/lib/access";
import { openDeps } from "@/lib/taskRules";
import { addDays, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import type { Task } from "@/lib/types";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";

/** Что каждому делать на неделе: задачи, которые идут в эти дни, плюс хвосты с прошлых недель. */
export default function WeekPage() {
  const { current, tasks, users, zones, setPreviewId } = useStore();
  const today = todayYerevan();
  const [from, setFrom] = useState(() => weekStart(today));
  const [zone, setZone] = useState("all");
  if (!current) return null;

  const to = addDays(from, 6);
  const visible = tasks.filter(
    (t) => t.status !== "done" && canSeeTask(current, t, users) && (zone === "all" || taskZones(t).includes(zone)),
  );
  const inWeek = (t: Task) => (t.startDate || t.due) <= to && t.due >= from;
  const late = (t: Task) => t.due < from;
  const week = visible.filter((t) => inWeek(t) || late(t));

  const people = users
    .filter((u) => week.some((t) => t.assigneeId === u.id))
    .sort((a, b) => (a.id === current.id ? -1 : b.id === current.id ? 1 : a.name.localeCompare(b.name)));

  const sortTasks = (list: Task[]) =>
    [...list].sort((a, b) => Number(late(b)) - Number(late(a)) || a.due.localeCompare(b.due));

  return (
    <div className="space-y-3">
      <div className="card p-4 flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold mr-auto">Неделя</h1>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button type="button" className="pill bg-[#f4f4f6] p-2" aria-label="Прошлая неделя" onClick={() => setFrom(addDays(from, -7))}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="pill bg-[#f4f4f6] px-3 py-1.5 text-sm" onClick={() => setFrom(weekStart(today))}>
            {shortDate(from)} – {shortDate(to)}
          </button>
          <button type="button" className="pill bg-[#f4f4f6] p-2" aria-label="Следующая неделя" onClick={() => setFrom(addDays(from, 7))}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {people.length === 0 && <div className="card p-6 text-sm text-[#9a9aa0]">На эту неделю открытых задач нет.</div>}

      <div className="grid gap-3 lg:grid-cols-2">
        {people.map((u) => {
          const mine = sortTasks(week.filter((t) => t.assigneeId === u.id));
          const overdue = mine.filter(late).length;
          const deadlines = mine.filter((t) => !late(t) && t.due <= to).length;
          return (
            <section key={u.id} className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-9 w-9 rounded-full bg-[#f4f4f6] grid place-items-center text-sm font-semibold">{u.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-xs text-[#9a9aa0]">{u.title}</div>
                </div>
                <div className="text-right text-xs text-[#6b6b70]">
                  <div>{mine.length} задач · {deadlines} сдать</div>
                  {overdue > 0 && <div className="text-[#b91c1c]">{overdue} просрочено</div>}
                </div>
              </div>
              <div className="space-y-1.5">
                {mine.map((t) => {
                  const z = zones.find((x) => x.slug === t.zone);
                  const waiting = openDeps(t, tasks);
                  const dueThisWeek = !late(t) && t.due <= to;
                  return (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setPreviewId(t.id)}
                      className="w-full text-left rounded-2xl px-3 py-2 text-sm flex items-start gap-2"
                      style={{ background: late(t) ? "#fee2e2" : "#f4f4f6" }}
                    >
                      <span className="shrink-0 mt-0.5">{late(t) ? <Flame size={14} className="text-[#e86a4a]" /> : statusMeta[t.status].emoji || "⚪"}</span>
                      <span className="flex-1 min-w-0">
                        <span className="font-medium">{t.title}</span>
                        <span className="block text-[11px] text-[#6b6b70] mt-0.5">
                          {z?.emoji} {t.code} · {shortDate(t.startDate || t.due)}–{shortDate(t.due)}
                          {t.criticalPath && <span className="text-[#b91c1c]"> · critical</span>}
                          {waiting.length > 0 && <span> · ждёт {waiting.map((d) => d.code).join(", ")}</span>}
                        </span>
                      </span>
                      {dueThisWeek && <span className="pill bg-black text-white text-[10px] px-2 py-0.5 shrink-0">сдать {shortDate(t.due)}</span>}
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
