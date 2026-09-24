"use client";

import { useStore } from "@/lib/store";
import { hasPerm, isCpo } from "@/lib/access";

export default function TeamPage() {
  const { current, users, tasks } = useStore();
  if (!current) return null;
  if (!isCpo(current) && !hasPerm(current, "zone_team")) {
    return <div className="card p-6">Нет доступа к команде.</div>;
  }
  const list = isCpo(current)
    ? users.filter((u) => u.role === "employee")
    : users.filter((u) => u.zone === current.zone);
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {list.map((u) => (
        <div key={u.id} className="card p-5">
          <div className="h-12 w-12 rounded-full bg-amber-100 grid place-items-center text-lg font-semibold">{u.avatar}</div>
          <div className="font-semibold mt-3">{u.name}</div>
          <div className="text-sm text-[#6F6E69]">{u.title}</div>
          <div className="text-sm mt-2">
            {tasks.filter((t) => t.assigneeId === u.id && t.status !== "done").length} активных задач
          </div>
        </div>
      ))}
    </div>
  );
}
