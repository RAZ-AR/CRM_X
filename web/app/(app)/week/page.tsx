"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, taskZones } from "@/lib/access";
import { openDeps } from "@/lib/taskRules";
import { addDays, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import type { Task } from "@/lib/types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { TaskRow } from "@/components/TaskRow";

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
      <div className="flex flex-wrap items-end gap-2 pb-1">
        <h1 className="page-title m-0 mr-auto">Неделя</h1>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <div className="flex items-center gap-1">
          <button type="button" className="pill bg-[#F3F2EE] p-2" aria-label="Прошлая неделя" onClick={() => setFrom(addDays(from, -7))}>
            <ChevronLeft size={16} />
          </button>
          <button type="button" className="pill bg-[#F3F2EE] px-3 py-1.5 text-sm" onClick={() => setFrom(weekStart(today))}>
            {shortDate(from)} – {shortDate(to)}
          </button>
          <button type="button" className="pill bg-[#F3F2EE] p-2" aria-label="Следующая неделя" onClick={() => setFrom(addDays(from, 7))}>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {people.length === 0 && <div className="card p-6 text-sm text-[#6F6E69]">На эту неделю открытых задач нет.</div>}

      <div className="grid gap-4 md:gap-5 xl:grid-cols-2">
        {people.map((u) => {
          const mine = sortTasks(week.filter((t) => t.assigneeId === u.id));
          const overdue = mine.filter(late).length;
          const deadlines = mine.filter((t) => !late(t) && t.due <= to).length;
          return (
            <section key={u.id} className="card px-4 pt-4 pb-2 md:px-5 min-w-0">
              <div className="flex items-center gap-2 mb-3">
                <span className="h-9 w-9 rounded-full bg-[var(--soft)] grid place-items-center text-sm font-semibold">{u.avatar}</span>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{u.name}</div>
                  <div className="text-xs text-[#6F6E69]">{u.title}</div>
                </div>
                <div className="text-right text-xs text-[#6F6E69]">
                  <div>{mine.length} задач · {deadlines} сдать</div>
                  {overdue > 0 && <div className="text-[var(--red)]">{overdue} просрочено</div>}
                </div>
              </div>
              <div>
                {mine.map((t) => {
                  const z = zones.find((x) => x.slug === t.zone);
                  const waiting = openDeps(t, tasks);
                  const dueThisWeek = !late(t) && t.due <= to;
                  return (
                    <TaskRow
                      key={t.id}
                      task={t}
                      onOpen={setPreviewId}
                      zoneColor={z?.color}
                      late={late(t)}
                      meta={
                        <>
                          {t.code} · {shortDate(t.startDate || t.due)}–{shortDate(t.due)}
                          {waiting.length > 0 && <> · ждёт {waiting.map((d) => d.code).join(", ")}</>}
                        </>
                      }
                      badge={
                        late(t) ? (
                          <span className="cap num shrink-0 !text-[var(--red)] font-medium">{shortDate(t.due)}</span>
                        ) : dueThisWeek ? (
                          <span className="pill bg-[var(--ink)] text-white text-[11px] px-2.5 py-1 shrink-0 num hidden sm:inline">сдать {shortDate(t.due)}</span>
                        ) : (
                          <span className="cap num shrink-0 hidden sm:inline">до {shortDate(t.due)}</span>
                        )
                      }
                    />
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
