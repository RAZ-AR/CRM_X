"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";
import { canSeeTask, isOverdue, statusMeta } from "@/lib/access";
import { formatDate } from "@/lib/dates";
import { useState } from "react";

export default function TasksPage() {
  const { current, tasks, users, zones } = useStore();
  const [assignee, setAssignee] = useState("all");
  if (!current) return null;
  let list = tasks.filter((t) => canSeeTask(current, t, users));
  if (assignee !== "all") list = list.filter((t) => t.assigneeId === assignee);
  const people = users.filter((u) => tasks.some((t) => t.assigneeId === u.id && canSeeTask(current, t, users)));
  return (
    <div className="card p-5">
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-xl font-semibold flex-1">
          {current.role === "cpo" ? "Все задачи" : "Мои задачи"}
        </h1>
        <select className="text-sm" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="all">Все исполнители</option>
          {people.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
      </div>
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
              <span className={`text-xs ${isOverdue(t) ? "text-red-500" : "text-gray-400"}`}>{formatDate(t.due)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
