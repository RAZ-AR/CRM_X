"use client";

import Link from "next/link";
import { statusMeta } from "@/lib/access";
import type { Task, User } from "@/lib/types";
import { formatDate } from "@/lib/dates";

export function FizzyCard({
  task,
  users,
  zoneName,
  href,
}: {
  task: Task;
  users: User[];
  zoneName: string;
  href?: string;
}) {
  const a = users.find((u) => u.id === task.assigneeId);
  const body = (
    <>
      <div className="flex items-center gap-2">
        <span>{statusMeta[task.status].emoji}</span>
        <span className="font-medium flex-1">{task.title}</span>
      </div>
      <div className="text-xs text-gray-400 mt-1">
        {zoneName} · {a?.name} · {formatDate(task.due)}
      </div>
    </>
  );
  if (href) return <Link href={href} className="block rounded-2xl bg-gray-50 px-4 py-3">{body}</Link>;
  return <div className="rounded-2xl bg-gray-50 px-4 py-3">{body}</div>;
}

export function RailBtn({
  count,
  title,
  onClick,
}: {
  count: number;
  title: string;
  rail?: string;
  onClick: () => void;
  tall?: boolean;
}) {
  return (
    <button type="button" className="card px-3 py-2 text-sm" onClick={onClick}>
      {count} {title}
    </button>
  );
}
