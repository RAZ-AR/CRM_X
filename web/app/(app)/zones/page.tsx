"use client";

import Link from "next/link";
import { FormEvent } from "react";
import { useStore } from "@/lib/store";
import { canManagePeople } from "@/lib/access";
import { zoneTaskProgress } from "@/lib/readiness";

export default function ZonesPage() {
  const { current, zones, tasks, addZone } = useStore();
  if (!current) return null;
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
      <h1 className="text-xl font-semibold">Проекты</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {zones.map((z) => (
          <Link key={z.slug} href={`/kanban?zone=${z.slug}`} className="card p-6" style={{ background: z.color }}>
            <div className="text-2xl">{z.emoji}</div>
            <div className="text-xl font-semibold mt-2">{z.name}</div>
            <div className="text-3xl font-semibold mt-4">{zoneTaskProgress(z.slug, tasks)}%</div>
          </Link>
        ))}
      </div>
      <form onSubmit={onAdd} className="card p-5 grid sm:grid-cols-2 gap-2 max-w-xl">
        <div className="sm:col-span-2 font-medium">Новый проект</div>
        <input name="name" required placeholder="Название (COMX, WAFL…)" />
        <input name="emoji" placeholder="Эмодзи" defaultValue="📁" />
        <input name="color" type="color" defaultValue="#c7e9f9" className="h-11 p-1" />
        <input name="deadline" type="date" />
        <button className="pill bg-black text-white px-4 py-2 sm:col-span-2">Добавить проект</button>
      </form>
    </div>
  );
}
