"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { useStore } from "@/lib/store";
import { boardColumns, canSeeTask, columns, sortActual, statusMeta } from "@/lib/access";
import { AddTaskModal } from "@/components/AddTaskModal";
import { TaskCard } from "@/components/TaskCard";
import type { ZoneSlug } from "@/lib/types";
import { formatDate } from "@/lib/dates";
import { StatusIcon } from "@/components/StatusIcon";

export default function KanbanPage() {
  const { current, tasks, zones, users, updateTask } = useStore();
  const [zone, setZone] = useState<ZoneSlug | "all">("all");
  const [due, setDue] = useState<string | null>(null);
  const [assignee, setAssignee] = useState("all");
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

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
  if (assignee !== "all") list = list.filter((t) => t.assigneeId === assignee);
  if (q.trim()) {
    const s = q.trim().toLowerCase();
    list = list.filter(
      (t) =>
        t.title.toLowerCase().includes(s) ||
        (t.code || "").toLowerCase().includes(s) ||
        (t.workstream || "").toLowerCase().includes(s),
    );
  }
  const people = users.filter((u) => tasks.some((x) => x.assigneeId === u.id && canSeeTask(current, x, users)));
  const zobj = zones.find((z) => z.slug === zone);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 mb-4 min-w-0">
        <h1 className="page-title m-0 flex-1 min-w-[12rem]">
          Доска {zobj ? `· ${zobj.emoji} ${zobj.name}` : "· все проекты"}{due ? ` · ${formatDate(due)}` : ""}
        </h1>
        <select className="text-sm" value={assignee} onChange={(e) => setAssignee(e.target.value)}>
          <option value="all">Все исполнители</option>
          {people.map((u) => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
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
        <input
          className="text-sm px-3 py-2 rounded-full bg-white border border-black/10 w-40"
          placeholder="NOR-001 / поиск"
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />
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
        <div className="flex gap-3 min-w-[72rem]">
          {boardColumns.map((col) => (
            <div key={col} className="card p-3 w-[min(85vw,18rem)] md:w-auto md:flex-1 md:min-w-[13.5rem] shrink-0 snap-center min-w-0">
              <div className="text-sm font-medium mb-3 px-1 flex items-center gap-2">
                <StatusIcon status={col} size={15} />
                <span className="flex-1 truncate">{statusMeta[col].label}</span>
                <span className="cap num">{list.filter((t) => t.status === col).length}</span>
              </div>
              <div
                className="space-y-2 min-h-[200px]"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  const id = e.dataTransfer.getData("id");
                  if (!id || col === "blocked") return;
                  const r = updateTask(id, { status: col });
                  if (!r.ok) alert(r.error);
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
