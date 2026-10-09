"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Ban, CalendarClock, CheckCircle2, Eye, PlayCircle, TriangleAlert } from "lucide-react";
import { useStore } from "@/lib/store";
import { isCpo } from "@/lib/access";
import { TaskRow } from "@/components/TaskRow";
import { Section } from "@/components/PageHeader";
import { Kpi } from "@/components/Kpi";
import { Legend, Meter, RED, Ring, SERIES, Spark, StackedWeeks } from "@/components/Charts";
import { HOME_VIEWS, homeLists, type HomeView } from "@/lib/homeLists";
import { weightedDone, zoneTasks } from "@/lib/readiness";
import { addDays, formatDate, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import { weekLoad } from "@/lib/weekLoad";
import { doneDay } from "@/lib/closed";

const TODAY_GROUPS: HomeView[] = ["overdue", "today", "critical", "start", "work"];
const CLOSED_SERIES = [
  { name: "Вовремя", color: SERIES[0] as string },
  { name: "С опозданием", color: SERIES[1] as string },
];

/** Мой дашборд: только задачи, где я исполнитель. Цифры, план на сегодня, нагрузка и закрытые задачи. */
export default function MyDashboardPage() {
  const { current, tasks, zones, activity = [], setPreviewId } = useStore();
  const [today] = useState(() => todayYerevan());
  if (!current) return null;

  const mine = tasks.filter((t) => t.assigneeId === current.id);
  const open = mine.filter((t) => t.status !== "done");
  const L = homeLists(mine, tasks, today, { id: current.id, owner: isCpo(current) });
  // Проверяю то, что сам поставил: задачи других людей на проверке, где я автор.
  const toReview = tasks.filter((t) => t.status === "review" && t.authorId === current.id && t.assigneeId !== current.id);
  const inProgress = open.filter((t) => t.status === "in_progress");
  const more = (view: HomeView) => `/tasks?${new URLSearchParams({ view, who: "me", zone: "all", date: today })}`;

  // Цифры с мини-графиками
  const last14 = Array.from({ length: 14 }, (_, i) => addDays(today, i - 13));
  const lateByDay = last14.map((d) => open.filter((t) => t.due < d).length);
  const closedDays = new Map(mine.map((t) => [t.id, doneDay(t, activity)]));
  const last7 = last14.slice(7);
  const closedByDay = last7.map((d) => mine.filter((t) => closedDays.get(t.id) === d).length);
  const closed7 = closedByDay.reduce((a, b) => a + b, 0);
  const weekEnd = addDays(weekStart(today), 6);
  const dueThisWeek = open.filter((t) => t.due >= today && t.due <= weekEnd).length;

  // План на сегодня: каждая задача — в первой подходящей группе.
  const shown = new Set<string>();
  const groups = TODAY_GROUPS.map((v) => {
    const list = L[v].filter((t) => !shown.has(t.id));
    list.forEach((t) => shown.add(t.id));
    return { v, list };
  }).filter((g) => g.list.length);

  // Нагрузка вперёд — только открытые задачи.
  const load = weekLoad(open, zones, today);

  // Закрыто по неделям: 8 недель назад, вовремя (не позже срока) и с опозданием.
  const w0 = addDays(weekStart(today), -7 * 7);
  const closedWeeks = Array.from({ length: 8 }, (_, i) => {
    const ws = addDays(w0, i * 7);
    const we = addDays(ws, 7);
    const list = mine.filter((t) => {
      const d = closedDays.get(t.id);
      return d && d >= ws && d < we;
    });
    const late = list.filter((t) => closedDays.get(t.id)! > t.due).length;
    return { label: shortDate(ws), title: `Неделя с ${shortDate(ws)}`, values: [list.length - late, late] };
  });
  const since30 = addDays(today, -30);
  const closed30 = mine.filter((t) => (closedDays.get(t.id) ?? "") >= since30);
  const onTime30 = closed30.filter((t) => closedDays.get(t.id)! <= t.due).length;
  const onTimePct = closed30.length ? Math.round((onTime30 / closed30.length) * 100) : null;

  // Готовность по проектам
  const projects = zones
    .map((z) => ({ z, list: zoneTasks(z.slug, mine) }))
    .filter((p) => p.list.length)
    .map((p) => ({ ...p, pct: weightedDone(p.list), late: p.list.filter((t) => t.status !== "done" && t.due < today).length }))
    .sort((a, b) => a.pct - b.pct);

  return (
    <div className="space-y-4 md:space-y-5">
      <header className="flex flex-col gap-1 min-w-0">
        <span className="cap">{formatDate(today)}</span>
        <h1 className="page-title m-0">Мой дашборд</h1>
      </header>

      {/* Цифры */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        <Kpi icon={<TriangleAlert size={15} color={L.overdue.length ? RED : undefined} />} label="Просрочено" value={String(L.overdue.length)} sub="за 14 дней" tone={L.overdue.length ? "bad" : undefined} href={more("overdue")}>
          <Spark values={lateByDay} labels={last14.map(shortDate)} width={64} height={32} color={L.overdue.length ? RED : SERIES[0]} />
        </Kpi>
        <Kpi icon={<CalendarClock size={15} />} label="Сдать сегодня" value={String(L.today.length)} sub={`до конца недели ${dueThisWeek}`} href={more("today")} />
        <Kpi icon={<PlayCircle size={15} />} label="В работе" value={String(inProgress.length)} sub={`открытых всего ${open.length}`} />
        <Kpi icon={<Eye size={15} />} label="Ждут моей проверки" value={String(toReview.length)} sub={toReview.length ? "я автор задачи" : "очередь пуста"} />
        <Kpi icon={<Ban size={15} />} label="Заблокировано" value={String(L.blocked.length)} sub={L.blocked.length ? "нужна помощь" : "блокеров нет"} tone={L.blocked.length ? "bad" : undefined} href={more("blocked")} />
        <Kpi icon={<CheckCircle2 size={15} />} label="Закрыто за 7 дней" value={String(closed7)} sub={`сегодня ${closedByDay[6]}`}>
          <Spark values={closedByDay} labels={last7.map(shortDate)} bars width={64} height={32} />
        </Kpi>
      </div>

      {/* План на сегодня + готовность */}
      <div className="grid gap-4 md:gap-5 xl:grid-cols-[7fr_5fr] min-w-0">
        <Section eyebrow="План на сегодня" title={groups.length ? `${shown.size} задач требуют внимания` : "Срочного нет"}>
          {groups.length ? (
            <div className="flex flex-col gap-4">
              {groups.map(({ v, list }) => (
                <div key={v}>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="cap !text-[var(--ink-2)] font-medium">{HOME_VIEWS[v].replace(/^\S+\s/, "")} · {list.length}</span>
                    {list.length > 3 && (
                      <Link href={more(v)} className="cap inline-flex items-center gap-1 hover:text-[var(--ink)]">Все <ArrowRight size={14} /></Link>
                    )}
                  </div>
                  {list.slice(0, 3).map((t) => (
                    <TaskRow
                      key={t.id}
                      task={t}
                      onOpen={setPreviewId}
                      late={v === "overdue"}
                      zoneColor={zones.find((z) => z.slug === t.zone)?.color}
                      meta={[t.code, `срок ${shortDate(t.due)}`].filter(Boolean).join(" · ")}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            <p className="cap py-8 text-center m-0">Просроченных, сегодняшних и срочных задач нет</p>
          )}
        </Section>
        <Section eyebrow="Моя готовность" title={`${mine.length} задач · ${mine.length - open.length} готово`}>
          <div className="flex items-center gap-5 mb-5">
            <Ring pct={weightedDone(mine)} size={116} stroke={11} />
            <span className="cap">по весу задач, где я исполнитель</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {projects.map(({ z, pct, late }) => (
              <div key={z.slug} className="grid grid-cols-[minmax(0,110px)_minmax(0,1fr)_56px] md:grid-cols-[minmax(0,150px)_minmax(0,1fr)_64px] items-center gap-3">
                <span className="flex items-center gap-2 min-w-0">
                  <span className="h-2.5 w-2.5 rounded-[3px] shrink-0" style={{ background: z.color }} />
                  <span className="cap !text-[var(--ink-2)] font-medium truncate">{z.name}</span>
                </span>
                <Meter pct={pct} />
                <span className="cap num text-right !text-[var(--ink)]">
                  {pct}%{late ? <span className="!text-[var(--red)]"> · {late}</span> : null}
                </span>
              </div>
            ))}
          </div>
        </Section>
      </div>

      {/* Нагрузка вперёд + закрыто по неделям */}
      <div className="grid gap-4 md:gap-5 xl:grid-cols-2 min-w-0">
        <Section eyebrow="Нагрузка на 8 недель" title="Открытые задачи со сроком по неделям" action={<Legend items={load.series} />}>
          {load.inWindow.length ? (
            <StackedWeeks weeks={load.weeks} series={load.series} markers={load.markers} height={230} />
          ) : (
            <p className="cap py-10 text-center">На ближайшие 8 недель открытых задач со сроком нет</p>
          )}
        </Section>
        <Section
          eyebrow="Закрыто по неделям"
          title={onTimePct === null ? "За 30 дней закрытых нет" : `${onTimePct}% вовремя за 30 дней`}
          action={<Legend items={CLOSED_SERIES} />}
        >
          <StackedWeeks weeks={closedWeeks} series={CLOSED_SERIES} markers={[]} height={230} />
          <p className="cap mt-2 mb-0">Вовремя — закрыта не позже срока. Задачи, закрытые до появления даты закрытия, взяты из журнала изменений.</p>
        </Section>
      </div>
    </div>
  );
}
