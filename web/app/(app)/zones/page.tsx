"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useStore } from "@/lib/store";
import { canManagePeople } from "@/lib/access";
import { streamProgress, weightedDone, zoneTasks } from "@/lib/readiness";
import { diffDays, shortDate, todayYerevan } from "@/lib/dates";
import { Meter } from "@/components/Charts";

export default function ZonesPage() {
  const { current, zones, tasks, addZone } = useStore();
  if (!current) return null;
  const today = todayYerevan();
  if (!canManagePeople(current)) {
    return <div className="card p-6">Проекты видят Owner и Armen.</div>;
  }

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addZone({
      name: String(fd.get("name")),
      emoji: String(fd.get("emoji") || "📁"),
      color: String(fd.get("color") || "#E5E7EB"),
      deadline: String(fd.get("deadline") || ""),
    });
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1 pb-1"><span className="cap">{zones.length} проектов</span><h1 className="page-title m-0">Проекты</h1></div>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-5">
        {zones.map((z) => {
          const list = zoneTasks(z.slug, tasks);
          const pct = weightedDone(list);
          const late = list.filter((t) => t.status !== "done" && t.due < today).length;
          const streams = streamProgress(list).filter((s) => s.total > 0);
          return (
            <Link key={z.slug} href={`/zones/${z.slug}`} className="card p-4 md:p-6 flex flex-col gap-3 min-w-0 hover:border-[#d9d6ce]">
              <span className="flex items-center gap-2 min-w-0">
                <span className="h-2.5 w-2.5 rounded-[3px] shrink-0" style={{ background: z.color }} />
                <span className="font-semibold truncate">{z.emoji} {z.name}</span>
              </span>
              <span className="flex items-baseline justify-between gap-2">
                <span className="num text-[30px] md:text-[40px] leading-none font-semibold tracking-[-0.03em]">{pct}%</span>
                <span className="cap num text-right">
                  {z.slug !== "common" && z.deadline ? `${Math.max(0, diffDays(today, z.deadline))} дн · ${shortDate(z.deadline)}` : `${list.length} задач`}
                </span>
              </span>
              <Meter pct={pct} color="var(--ink)" height={4} />
              <span className="hidden md:grid grid-cols-7 gap-1" title="7 потоков">
                {streams.map((s) => (
                  <span key={s.stream} title={`${s.stream}: ${s.pct}%`}><Meter pct={s.pct} height={4} /></span>
                ))}
              </span>
              <span className="cap num">{list.length} задач{late ? <span className="!text-[var(--red)]"> · {late} просрочено</span> : null}</span>
            </Link>
          );
        })}
      </div>
      <form onSubmit={onAdd} className="card p-5 grid sm:grid-cols-2 gap-2 max-w-xl">
        <div className="sm:col-span-2 font-medium">Новый проект</div>
        <input name="name" required placeholder="Название (COMX, WAFL…)" />
        <input name="emoji" placeholder="Эмодзи" defaultValue="📁" />
        <input name="color" type="color" defaultValue="#c7e9f9" className="h-11 p-1" />
        <input name="deadline" type="date" />
        <button className="pill bg-[var(--ink)] text-white px-4 py-2 sm:col-span-2">Добавить проект</button>
      </form>
    </div>
  );
}
