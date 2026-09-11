"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { canSeeTask, isOverdue, statusMeta } from "@/lib/access";

export default function TasksPage() {
  const { current, tasks, users, zones } = useStore();
  if (!current) return null;
  const list = tasks.filter((t) => canSeeTask(current, t, users));
  return (
    <div className="card p-5">
      <h1 className="text-xl font-semibold mb-4">
        {current.role === "cpo" ? "Все задачи" : "Мои задачи"}
      </h1>
      <div className="space-y-2">
        {list.map((t) => {
          const a = users.find((u) => u.id === t.assigneeId);
          const z = zones.find((z) => z.slug === t.zone);
          return (
            <Link key={t.id} href={`/tasks/${t.id}`} className="flex flex-wrap items-center gap-3 rounded-2xl bg-gray-50 px-4 py-3">
              <span>{statusMeta[t.status].emoji}</span>
              <span className="flex-1 font-medium text-sm">{t.title}</span>
              <span className="text-xs">{z?.emoji} {z?.name}</span>
              <span className="text-xs text-gray-500">{a?.name}</span>
              <span className={`text-xs ${isOverdue(t) ? "text-red-500" : "text-gray-400"}`}>{t.due}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
