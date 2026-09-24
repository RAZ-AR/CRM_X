"use client";

import { useEffect, useRef, useState } from "react";
import { Ban, CheckCircle2, Circle, Eye, PlayCircle } from "lucide-react";
import { statusMeta } from "@/lib/access";
import type { TaskStatus } from "@/lib/types";

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
