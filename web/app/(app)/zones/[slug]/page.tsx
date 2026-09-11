"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { canSeeTask, hasPerm, isCpo, statusMeta } from "@/lib/access";
import { zoneReadiness } from "@/lib/readiness";

export default function ZonePage() {
  const { slug } = useParams<{ slug: string }>();
  const { current, zones, tasks, users } = useStore();
  if (!current) return null;
  const zone = zones.find((z) => z.slug === slug);
  if (!zone) return <div className="card p-6">Нет зоны</div>;
  const allowed = isCpo(current) || (current.zone === zone.slug && hasPerm(current, "zone_page"));
  if (!allowed) return <div className="card p-6">Нет доступа к зоне.</div>;
  const visible = tasks.filter(
    (t) => t.zone === zone.slug && canSeeTask(current, t, users),
  );
  const team = users.filter((u) => u.zone === zone.slug);

  return (
    <div className="space-y-3">
      <div className="card p-6" style={{ background: zone.color }}>
        <div className="text-3xl">{zone.emoji} {zone.name}</div>
        <div className="text-5xl font-semibold mt-3">{zoneReadiness(zone)}%</div>
        <Link href={`/kanban?zone=${zone.slug}`} className="inline-block mt-4 pill bg-black text-white px-4 py-2 text-sm">Доска проекта</Link>
      </div>
      {(isCpo(current) || hasPerm(current, "zone_team")) && (
        <div className="card p-5 flex gap-2 flex-wrap">
          {team.map((u) => (
            <span key={u.id} className="pill bg-gray-50 px-3 py-1 text-sm">{u.avatar} {u.name}</span>
          ))}
        </div>
      )}
      <div className="card p-5">
        {visible.map((t) => (
          <Link key={t.id} href={`/tasks/${t.id}`} className="flex gap-2 py-2 text-sm">
            <span>{statusMeta[t.status].emoji}</span>
            <span className="flex-1">{t.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
