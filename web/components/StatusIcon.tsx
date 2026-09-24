"use client";

import { useEffect, useRef, useState } from "react";
import { Ban, CheckCircle2, Circle, Eye, PlayCircle } from "lucide-react";
import { canWorkTask, statusMeta } from "@/lib/access";
import { useStore } from "@/lib/store";
import type { Task, TaskStatus } from "@/lib/types";

/** Иконка и цвет каждого статуса — одинаковые во всём приложении. */
export const STATUS_ICON: Record<TaskStatus, { Icon: typeof Circle; color: string; short: string }> = {
  todo: { Icon: Circle, color: "#6F6E69", short: "Не начато" },
  in_progress: { Icon: PlayCircle, color: "#2383e2", short: "В работе" },
  review: { Icon: Eye, color: "#7c3aed", short: "На проверке" },
  done: { Icon: CheckCircle2, color: "#16a34a", short: "Готово" },
  blocked: { Icon: Ban, color: "#dc2626", short: "Блок" },
};

/** Порядок кнопок: путь задачи, блок — последним. */
export const STATUS_ORDER: TaskStatus[] = ["todo", "in_progress", "review", "done", "blocked"];

export function StatusIcon({ status, size = 16 }: { status: TaskStatus; size?: number }) {
  const { Icon, color } = STATUS_ICON[status];
  return <Icon size={size} color={color} strokeWidth={2.2} aria-label={statusMeta[status].label} />;
}

/**
 * Иконка статуса, по нажатию — меню смены статуса.
 * «Блок» требует причину и срок, поэтому открывает карточку задачи.
 */
export function StatusPicker({
  status,
  onPick,
  onBlock,
  disabled,
}: {
  status: TaskStatus;
  onPick: (s: TaskStatus) => void;
  onBlock: () => void;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  if (disabled) {
    return (
      <span className="shrink-0 w-5 grid place-items-center" title={statusMeta[status].label}>
        <StatusIcon status={status} />
      </span>
    );
  }
  return (
    <span ref={ref} className="relative shrink-0">
      <button
        type="button"
        className="w-6 h-6 rounded-full grid place-items-center hover:bg-white"
        title={`${statusMeta[status].label} — сменить`}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        <StatusIcon status={status} />
      </button>
      {open && (
        <span role="menu" className="absolute z-30 left-0 top-7 bg-white rounded-xl shadow-lg border border-black/10 p-1 flex flex-col min-w-[150px]">
          {STATUS_ORDER.map((s) => (
            <button
              key={s}
              type="button"
              role="menuitem"
              className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-sm text-left hover:bg-[#F3F2EE] ${s === status ? "font-semibold" : ""}`}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
                if (s === status) return;
                if (s === "blocked") onBlock();
                else onPick(s);
              }}
            >
              <StatusIcon status={s} />
              {STATUS_ICON[s].short}
              {s === "blocked" && <span className="text-[10px] text-[#6F6E69] ml-auto">причина…</span>}
            </button>
          ))}
        </span>
      )}
    </span>
  );
}

const FLOW: TaskStatus[] = ["todo", "in_progress", "review", "done"];

/** Текущий статус и два соседних шага пути: следующие, а в конце пути — предыдущие. */
export function statusSteps(task: Pick<Task, "status" | "blockFromStatus">): TaskStatus[] {
  if (task.status === "blocked") {
    const back = task.blockFromStatus && task.blockFromStatus !== "blocked" ? task.blockFromStatus : "todo";
    const i = FLOW.indexOf(back);
    return (["blocked", back, FLOW[Math.min(i + 1, FLOW.length - 1)]] as TaskStatus[]).filter((s, k, a) => a.indexOf(s) === k);
  }
  const i = FLOW.indexOf(task.status);
  const from = Math.max(0, Math.min(i, FLOW.length - 3));
  return FLOW.slice(from, from + 3);
}

/**
 * Переключатель статуса справа в строке задачи: текущий статус подсвечен и подписан,
 * рядом — иконки соседних шагов. Нажатие меняет статус; если нужен «готово когда» — открывает карточку.
 */
export function StatusSwitch({ task, onOpen, compact = false }: { task: Task; onOpen: (id: string) => void; compact?: boolean }) {
  const { current, updateTask } = useStore();
  const can = Boolean(current && canWorkTask(current, task));
  const steps = statusSteps(task);
  return (
    <span className="flex items-center gap-1 shrink-0" role="group" aria-label="Статус задачи">
      {steps.map((s) => {
        const on = s === task.status;
        const meta = STATUS_ICON[s];
        if (on) {
          return (
            <span
              key={s}
              className="inline-flex items-center gap-1.5 h-8 rounded-full pl-2 pr-2.5 text-xs font-medium"
              style={{ background: `${meta.color}14`, color: meta.color }}
              title={statusMeta[s].label}
            >
              <StatusIcon status={s} size={16} />
              <span className={compact ? "hidden" : "hidden sm:inline"}>{meta.short}</span>
            </span>
          );
        }
        return (
          <button
            key={s}
            type="button"
            disabled={!can}
            title={`Перевести: ${statusMeta[s].label}`}
            aria-label={`Перевести в «${meta.short}»`}
            className="h-8 w-8 rounded-full grid place-items-center opacity-45 hover:opacity-100 hover:bg-[var(--soft)] disabled:opacity-20 disabled:hover:bg-transparent transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              const patch: Partial<Task> = task.status === "blocked" ? { status: s, blockReason: "", blockUntil: "" } : { status: s };
              const r = updateTask(task.id, patch);
              if (!r.ok) {
                alert(r.error);
                if (r.error.includes("готово когда")) onOpen(task.id);
              }
            }}
          >
            <StatusIcon status={s} size={17} />
          </button>
        );
      })}
    </span>
  );
}
