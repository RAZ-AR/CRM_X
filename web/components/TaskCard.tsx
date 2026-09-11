"use client";

import { useState } from "react";
import { columns, isOverdue, statusMeta, taskZones } from "@/lib/access";
import { useStore } from "@/lib/store";
import type { Task, TaskStatus, User, Zone } from "@/lib/types";
import { formatDate } from "@/lib/dates";
import { Check, Flame, X } from "lucide-react";

export function TaskCard({
  task,
  users,
  zones,
}: {
  task: Task;
  users: User[];
  zones: Zone[];
}) {
  const { setPreviewId, updateTask } = useStore();
  const [pending, setPending] = useState<TaskStatus | null>(null);
  const zs = taskZones(task);
  const multi = zs.length > 1;
  const a = users.find((u) => u.id === task.assigneeId);
  const idx = columns.indexOf(task.status);
  const show = pending ?? task.status;

  return (
    <div
      className="rounded-2xl p-3 text-sm"
      style={{ background: multi ? "#e5e7eb" : "#f4f4f6" }}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
    >
      <button type="button" className="block w-full text-left" onClick={() => setPreviewId(task.id)}>
        <div className="font-medium leading-snug flex items-start gap-1">
          {isOverdue(task) && <Flame size={16} className="text-[#e86a4a] shrink-0 mt-0.5" />}
          <span>{task.title}</span>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {task.code && <span className="text-[10px] text-[#9a9aa0]">{task.code}</span>}
          {task.wave && <span className="pill bg-black text-white px-1.5 py-0.5 text-[10px]">{task.wave}</span>}
          {zs.map((slug) => {
            const z = zones.find((x) => x.slug === slug);
            return (
              <span key={slug} className="pill px-2 py-0.5 text-[11px]" style={{ background: multi ? "#d1d5db" : z?.color }}>
                {z?.emoji} {z?.name ?? slug}
              </span>
            );
          })}
          <span className="flex items-center gap-1 text-[11px] text-[#757575]">
            <span className="h-5 w-5 rounded-full bg-white grid place-items-center text-[10px] font-semibold">{a?.avatar ?? "?"}</span>
            {a?.name}
          </span>
        </div>
        <div className="text-[11px] text-gray-400 mt-1">{formatDate(task.startDate)} → {formatDate(task.due)}</div>
      </button>
      {pending && pending !== task.status ? (
        <div className="mt-2 flex items-center gap-2">
          <span className="flex-1 text-xs text-[#757575]">→ {statusMeta[pending].label}</span>
          <button
            type="button"
            className="h-9 w-9 rounded-full bg-black text-white grid place-items-center"
            onClick={() => {
              updateTask(task.id, { status: pending });
              setPending(null);
            }}
            aria-label="Сохранить"
          >
            <Check size={16} />
          </button>
          <button
            type="button"
            className="h-9 w-9 rounded-full bg-white grid place-items-center"
            onClick={() => setPending(null)}
            aria-label="Отмена"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <div className="mt-2 flex items-center gap-2">
          <button
            type="button"
            className="h-8 px-3 rounded-full bg-white text-xs disabled:opacity-30"
            disabled={idx <= 0}
            onClick={() => setPending(columns[idx - 1])}
          >
            ← {idx > 0 ? statusMeta[columns[idx - 1]].label : ""}
          </button>
          <span className="flex-1 text-center text-[11px] text-[#757575]">{statusMeta[show].label}</span>
          <button
            type="button"
            className="h-8 px-3 rounded-full bg-white text-xs disabled:opacity-30"
            disabled={idx < 0 || idx >= columns.length - 1}
            onClick={() => setPending(columns[idx + 1])}
          >
            {idx < columns.length - 1 ? statusMeta[columns[idx + 1]].label : ""} →
          </button>
        </div>
      )}
    </div>
  );
}
