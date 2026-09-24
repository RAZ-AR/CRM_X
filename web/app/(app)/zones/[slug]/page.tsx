"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { canSeeTask, hasPerm, isCpo } from "@/lib/access";
import { streamProgress, zoneTaskProgress, zoneTasks } from "@/lib/readiness";
import { diffDays, formatDate, todayYerevan } from "@/lib/dates";
import { Meter, Ring } from "@/components/Charts";
import { TaskRow } from "@/components/TaskRow";

export default function ZonePage() {
  const { slug } = useParams<{ slug: string }>();
  const { current, zones, tasks, users, setPreviewId } = useStore();
  if (!current) return null;
  const zone = zones.find((z) => z.slug === slug);
  if (!zone) return <div className="card p-6">Нет зоны</div>;
  const allowed = isCpo(current) || (current.zone === zone.slug && hasPerm(current, "zone_page"));
  if (!allowed) return <div className="card p-6">Нет доступа к зоне.</div>;
  const all = zoneTasks(zone.slug, tasks);
  const visible = all.filter((t) => canSeeTask(current, t, users));
  const streams = streamProgress(all);
  const team = users.filter((u) => u.zone === zone.slug);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-end justify-between gap-3 pb-1">
        <div className="flex flex-col gap-1">
          <span className="cap">{zone.slug !== "common" && zone.deadline ? `Открытие ${formatDate(zone.deadline)} · ${Math.max(0, diffDays(todayYerevan(), zone.deadline))} дн` : `${all.length} задач`}</span>
          <h1 className="page-title m-0">{zone.emoji} {zone.name}</h1>
        </div>
        <Link href={`/kanban?zone=${zone.slug}`} className="pill bg-[var(--ink)] text-white px-4 h-10 inline-flex items-center text-sm">Доска проекта</Link>
      </div>
      <div className="grid gap-4 md:gap-5 lg:grid-cols-[1fr_2fr]">
        <div className="card p-5 md:p-6 flex items-center gap-6">
          <Ring pct={zoneTaskProgress(zone.slug, tasks)} size={128} />
          <div className="flex flex-col gap-1">
            <span className="num text-[40px] leading-none font-semibold tracking-[-0.03em]">{all.filter((t) => t.status === "done").length}<span className="cap text-base"> / {all.length}</span></span>
            <span className="cap">задач готово</span>
          </div>
        </div>
        <div className="card p-5 md:p-6 flex flex-col gap-3">
          <div className="cap">Готовность по потокам · считается из задач</div>
          {streams.map((s) => (
            <div key={s.stream} className="grid grid-cols-[minmax(0,200px)_minmax(0,1fr)_72px] items-center gap-3 text-sm">
              <span className="truncate" title={`${s.stream} · ${s.label}`}>{s.stream}</span>
              <Meter pct={s.pct} />
              <span className="cap num text-right !text-[var(--ink)]">{s.total ? `${s.pct}% · ${s.done}/${s.total}` : "—"}</span>
            </div>
          ))}
        </div>
      </div>
      {(isCpo(current) || hasPerm(current, "zone_team")) && team.length > 0 && (
        <div className="card p-5 flex gap-2 flex-wrap">
          {team.map((u) => (
            <span key={u.id} className="pill bg-[#F3F2EE] px-3 py-1 text-sm">{u.avatar} {u.name}</span>
          ))}
        </div>
      )}
      <div className="card px-4 md:px-5 py-2">
        {visible.map((t) => {
          const a = users.find((u) => u.id === t.assigneeId);
          return (
            <TaskRow
              key={t.id}
              task={t}
              onOpen={setPreviewId}
              late={t.status !== "done" && t.due < todayYerevan()}
              meta={`${t.code ? `${t.code} · ` : ""}${t.workstream || ""}`}
              avatar={a ? { letter: a.avatar, name: a.name } : undefined}
            />
          );
        })}
      </div>
    </div>
  );
}
