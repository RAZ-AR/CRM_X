"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { canSeeTask, hasPerm, isCpo } from "@/lib/access";
import { streamProgress, zoneTaskProgress, zoneTasks } from "@/lib/readiness";
import { formatDate } from "@/lib/dates";
import { StatusIcon } from "@/components/StatusIcon";

export default function ZonePage() {
  const { slug } = useParams<{ slug: string }>();
  const { current, zones, tasks, users } = useStore();
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
    <div className="space-y-3">
      <div className="card p-6" style={{ background: zone.color }}>
        <div className="text-3xl">{zone.emoji} {zone.name}</div>
        <div className="text-sm opacity-70 mt-1">Открытие {formatDate(zone.deadline)}</div>
        <div className="text-5xl font-semibold mt-3">{zoneTaskProgress(zone.slug, tasks)}%</div>
        <Link href={`/kanban?zone=${zone.slug}`} className="inline-block mt-4 pill bg-black text-white px-4 py-2 text-sm">Доска проекта</Link>
      </div>
      <div className="card p-5 space-y-2">
        <div className="text-xs text-[#9a9aa0]">Готовность по потокам · считается из задач</div>
        {streams.map((s) => (
          <div key={s.stream} className="text-sm">
            <div className="flex justify-between">
              <span>{s.stream} <span className="text-[#9a9aa0]">· {s.label}</span></span>
              <span className="font-medium">{s.total ? `${s.pct}% · ${s.done}/${s.total}` : "—"}</span>
            </div>
            <div className="h-2 rounded-full bg-[#f4f4f6] mt-1 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${s.pct}%`, background: s.color }} />
            </div>
          </div>
        ))}
      </div>
      {(isCpo(current) || hasPerm(current, "zone_team")) && team.length > 0 && (
        <div className="card p-5 flex gap-2 flex-wrap">
          {team.map((u) => (
            <span key={u.id} className="pill bg-gray-50 px-3 py-1 text-sm">{u.avatar} {u.name}</span>
          ))}
        </div>
      )}
      <div className="card p-5">
        {visible.map((t) => (
          <Link key={t.id} href={`/tasks/${t.id}`} className="flex gap-2 py-2 text-sm">
            <StatusIcon status={t.status} size={14} />
            <span className="text-[#9a9aa0] w-20 shrink-0">{t.code}</span>
            <span className="flex-1">{t.title}</span>
            <span className="text-[#9a9aa0] shrink-0">{formatDate(t.due).slice(0, 5)}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
