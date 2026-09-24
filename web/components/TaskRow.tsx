"use client";

import { StatusSwitch } from "@/components/StatusIcon";
import { shortDate } from "@/lib/dates";
import type { Task } from "@/lib/types";

/**
 * Строка задачи в едином стиле: слева название и подпись, справа срок, исполнитель и переключатель статуса.
 * Нажатие на строку открывает карточку.
 */
export function TaskRow({
  task,
  onOpen,
  meta,
  late = false,
  badge,
  avatar,
  zoneColor,
}: {
  task: Task;
  onOpen: (id: string) => void;
  /** Вторая строка: код, даты, зависимости. */
  meta?: React.ReactNode;
  late?: boolean;
  /** Метка справа, например «сдать 25.09». */
  badge?: React.ReactNode;
  avatar?: { letter: string; name: string };
  zoneColor?: string;
}) {
  return (
    <div className="flex items-center gap-2 md:gap-3 border-t border-[var(--line)] first:border-t-0 py-2">
      <button type="button" onClick={() => onOpen(task.id)} className="flex-1 min-w-0 text-left flex items-start gap-2.5 py-1">
        {zoneColor && <span className="h-2 w-2 rounded-[3px] shrink-0 mt-[7px]" style={{ background: zoneColor }} aria-hidden="true" />}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2 min-w-0">
            <span className="text-[15px] leading-6 truncate">{task.title}</span>
            {task.criticalPath && <span className="h-1.5 w-1.5 rounded-full bg-[var(--red)] shrink-0" title="critical path" />}
          </span>
          {meta && <span className="block cap mt-0.5 truncate">{meta}</span>}
        </span>
      </button>
      {badge ?? (
        <span className={`cap num shrink-0 hidden sm:inline ${late ? "!text-[var(--red)] font-medium" : ""}`}>{shortDate(task.due)}</span>
      )}
      {avatar && (
        <span className="hidden sm:grid h-7 w-7 rounded-full bg-[var(--soft)] place-items-center text-[11px] font-semibold shrink-0" title={avatar.name}>
          {avatar.letter}
        </span>
      )}
      <StatusSwitch task={task} onOpen={onOpen} />
    </div>
  );
}
