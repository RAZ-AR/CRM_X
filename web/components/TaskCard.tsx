"use client";

import { taskZones } from "@/lib/access";
import { useStore } from "@/lib/store";
import type { Task, User, Zone } from "@/lib/types";

export function TaskCard({
  task,
  users,
  zones,
}: {
  task: Task;
  users: User[];
  zones: Zone[];
}) {
  const { setPreviewId } = useStore();
  const zs = taskZones(task);
  const multi = zs.length > 1;
  const a = users.find((u) => u.id === task.assigneeId);
  return (
    <button
      type="button"
      className="block w-full text-left rounded-2xl p-3 text-sm"
      style={{ background: multi ? "#e5e7eb" : "#f4f4f6" }}
      draggable
      onDragStart={(e) => e.dataTransfer.setData("id", task.id)}
      onClick={() => setPreviewId(task.id)}
    >
      <div className="font-medium leading-snug">{task.title}</div>
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
      <div className="text-[11px] text-gray-400 mt-1">{task.startDate} → {task.due}</div>
    </button>
  );
}
