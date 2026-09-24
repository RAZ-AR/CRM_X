"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronLeft } from "lucide-react";
import { useStore } from "@/lib/store";
import { canWorkTask, isCpo, isOverdue } from "@/lib/access";
import { shortDate, todayYerevan } from "@/lib/dates";
import { HOME_VIEWS, homeLists, isHomeView, scopeTasks, type HomeView } from "@/lib/homeLists";
import { StatusPicker } from "@/components/StatusIcon";
import type { Task } from "@/lib/types";

/** Полный список задач. С главной сюда ведёт «все N →»: ?view=overdue&who=…&zone=…&date=… */
export default function TasksPage() {
  const { current, tasks, users, zones, setPreviewId, updateTask } = useStore();
  const [params] = useState(() => new URLSearchParams(typeof window === "undefined" ? "" : window.location.search));
  const [view, setView] = useState<HomeView | "all">(() => {
    const v = params.get("view");
    return isHomeView(v) ? v : "all";
  });
  const [who, setWho] = useState(params.get("who") || "all");
  const [zone, setZone] = useState(params.get("zone") || "all");
  const picked = /^\d{4}-\d{2}-\d{2}$/.test(params.get("date") || "") ? params.get("date")! : todayYerevan();
  if (!current) return null;

  const { seen, scoped, manager, whoValue } = scopeTasks(tasks, current, users, who, zone);
  const lists = homeLists(scoped, tasks, picked, { id: current.id, owner: isCpo(current) });
  const list: Task[] =
    view === "all" ? [...scoped].sort((a, b) => Number(a.status === "done") - Number(b.status === "done") || a.due.localeCompare(b.due)) : lists[view];
  const people = users.filter((u) => seen.some((t) => t.assigneeId === u.id));

  return (
    <div className="space-y-3">
      <div className="card p-4 flex flex-wrap items-center gap-2">
        <Link href="/home" className="pill bg-[#f4f4f6] p-2" aria-label="На главную">
          <ChevronLeft size={16} />
        </Link>
        <h1 className="text-lg sm:text-xl font-semibold mr-auto">{view === "all" ? "Все задачи" : HOME_VIEWS[view]}</h1>
        <div className="w-full sm:w-auto grid grid-cols-2 sm:flex gap-1.5">
        {manager && (
          <select className="!text-xs sm:!text-sm !px-3 !py-2 min-w-0" value={whoValue} onChange={(e) => setWho(e.target.value)}>
            <option value="all">Все исполнители</option>
            <option value="me">Мои</option>
            {people.filter((u) => u.id !== current.id).map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
        )}
        <select className="!text-xs sm:!text-sm !px-3 !py-2 min-w-0" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1 -mx-1 px-1">
        {(["all", ...Object.keys(HOME_VIEWS)] as (HomeView | "all")[]).map((v) => (
          <button
            key={v}
            type="button"
            ref={view === v ? (el) => el?.scrollIntoView({ block: "nearest", inline: "center" }) : undefined}
            onClick={() => setView(v)}
            className={`pill shrink-0 px-3 py-1 text-xs sm:text-sm ${view === v ? "bg-black text-white" : "bg-white border border-black/10"}`}
          >
            {v === "all" ? `Все · ${scoped.length}` : `${HOME_VIEWS[v]} · ${lists[v].length}`}
          </button>
        ))}
      </div>

      <div className="card p-2 sm:p-3 space-y-1">
        {list.length === 0 && <p className="text-sm text-[#9a9aa0] p-3">Здесь пусто</p>}
        {list.map((t) => {
          const a = users.find((u) => u.id === t.assigneeId);
          const z = zones.find((x) => x.slug === t.zone);
          return (
            <div key={t.id} className="rounded-xl bg-[#f4f4f6] pl-1.5 pr-3 py-1.5 text-sm flex items-center gap-1.5">
              <StatusPicker
                status={t.status}
                disabled={!canWorkTask(current, t)}
                onPick={(st) => {
                  const r = updateTask(t.id, t.status === "blocked" ? { status: st, blockReason: "", blockUntil: "" } : { status: st });
                  if (!r.ok) {
                    alert(r.error);
                    if (r.error.includes("готово когда")) setPreviewId(t.id);
                  }
                }}
                onBlock={() => setPreviewId(t.id)}
              />
              <button type="button" onClick={() => setPreviewId(t.id)} className="flex-1 min-w-0 text-left flex items-center gap-2">
                <span className="hidden sm:inline text-[11px] text-[#9a9aa0] w-14 shrink-0">{t.code}</span>
                <span className="flex-1 min-w-0 truncate">
                  {t.title}
                  {t.criticalPath && <span className="text-[#b91c1c] text-[10px]"> ●</span>}
                </span>
                <span className="hidden sm:inline text-[11px] text-[#6b6b70] shrink-0">{z?.emoji} {z?.name}</span>
                <span className={`text-[11px] shrink-0 ${isOverdue(t, picked) ? "text-red-500 font-medium" : "text-[#6b6b70]"}`}>{shortDate(t.due)}</span>
                <span className="h-5 w-5 rounded-full bg-white grid place-items-center text-[9px] font-semibold shrink-0" title={a?.name}>{a?.avatar}</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
