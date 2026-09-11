"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { canSeeTask, columns, sortActual, statusMeta } from "@/lib/access";
import { AddTaskModal } from "@/components/AddTaskModal";
import { TaskCard } from "@/components/TaskCard";
import type { ZoneSlug } from "@/lib/types";

export default function KanbanPage() {
  const { current, tasks, zones, users, updateTask } = useStore();
  const [zone, setZone] = useState<ZoneSlug | "all">("all");
  const [due, setDue] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const z = sp.get("zone") as ZoneSlug | null;
    if (z) setZone(z);
    const d = sp.get("due");
    if (d) setDue(d);
  }, []);

  if (!current) return null;
  let list = sortActual(tasks.filter((t) => canSeeTask(current, t, users)));
  if (zone !== "all") list = list.filter((t) => t.zone === zone);
  if (due) list = list.filter((t) => t.due === due);
  const zobj = zones.find((z) => z.slug === zone);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <h1 className="text-xl font-semibold flex-1">
          Доска {zobj ? `· ${zobj.emoji} ${zobj.name}` : "· все проекты"}{due ? ` · ${due}` : ""}
        </h1>
        <select
          className="text-sm"
          value={zone}
          onChange={(e) => {
            const v = e.target.value as ZoneSlug | "all";
            setZone(v);
            const url = v === "all" ? "/kanban" : `/kanban?zone=${v}`;
            window.history.replaceState(null, "", url);
          }}
        >
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <button className="pill bg-black text-white px-4 py-2 text-sm flex items-center gap-1" onClick={() => setOpen(true)}>
          <Plus size={16} /> Добавить задачу
        </button>
      </div>
      {open && (
        <AddTaskModal
          lockZone={zone === "all" ? undefined : zone}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="overflow-x-auto pb-4 -mx-3 px-3 snap-x snap-mandatory">
        <div className="flex gap-3 min-w-0 md:min-w-[1100px]">
          {columns.map((col) => (
            <div key={col} className="card p-3 w-[85vw] max-w-[320px] md:w-52 md:max-w-none md:flex-1 shrink-0 snap-center">
              <div className="text-sm font-medium mb-2 px-1">
                {statusMeta[col].emoji} {statusMeta[col].label}
                {col === "todo" ? " · бэклог" : ""}
              </div>
              <div
                className="space-y-2 min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData("id");
                  if (id) updateTask(id, { status: col });
                }}
              >
                {list
                  .filter((t) => t.status === col)
                  .map((t) => (
                    <TaskCard key={t.id} task={t} users={users} zones={zones} />
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
