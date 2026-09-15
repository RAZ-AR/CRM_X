"use client";

import { useState } from "react";
import { columns, isOverdue, statusMeta, taskZones } from "@/lib/access";
import { useStore } from "@/lib/store";
import type { Task, TaskStatus, User, Zone } from "@/lib/types";
import { formatDate } from "@/lib/dates";
import { Check, ChevronLeft, ChevronRight, Flame, Paperclip, X } from "lucide-react";

const SHORT: Record<TaskStatus, string> = {
  todo: "Бэклог",
  in_progress: "В работе",
  blocked: "Блок",
  review: "Проверка",
  done: "Готово",
};

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
      className="rounded-2xl p-3 text-sm min-w-0 overflow-hidden"
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
        <div className="text-[11px] text-gray-400 mt-1 flex items-center gap-2">
          <span>{formatDate(task.startDate)} → {formatDate(task.due)}</span>
          {(task.attachments?.length ?? 0) > 0 && (
            <span className="inline-flex items-center gap-0.5 text-[#111]">
              <Paperclip size={12} /> {task.attachments.length}
            </span>
          )}
        </div>
      </button>
      {pending && pending !== task.status ? (
        <div className="mt-2 flex items-center gap-2 min-w-0">
          <span className="flex-1 min-w-0 truncate text-xs text-[#757575]">→ {SHORT[pending]}</span>
          <button
            type="button"
            className="h-8 w-8 shrink-0 rounded-full bg-black text-white grid place-items-center"
            onClick={() => {
              const r = updateTask(task.id, { status: pending });
              if (!r.ok) {
                alert(r.error);
                return;
              }
              setPending(null);
            }}
            aria-label="Сохранить"
          >
            <Check size={14} />
          </button>
          <button
            type="button"
            className="h-8 w-8 shrink-0 rounded-full bg-white grid place-items-center"
            onClick={() => setPending(null)}
            aria-label="Отмена"
          >
            <X size={14} />
          </button>
        </div>
      ) : (
        <div className="mt-2 grid grid-cols-[32px_1fr_32px] items-center gap-1 min-w-0">
          <button
            type="button"
            className="h-8 w-8 rounded-full bg-white grid place-items-center disabled:opacity-30"
            disabled={idx <= 0}
            onClick={() => setPending(columns[idx - 1])}
            aria-label="Назад"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="text-center text-[11px] text-[#757575] truncate px-1">{SHORT[show] ?? statusMeta[show].label}</span>
          <button
            type="button"
            className="h-8 w-8 rounded-full bg-white grid place-items-center disabled:opacity-30"
            disabled={idx < 0 || idx >= columns.length - 1}
            onClick={() => setPending(columns[idx + 1])}
            aria-label="Вперёд"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
