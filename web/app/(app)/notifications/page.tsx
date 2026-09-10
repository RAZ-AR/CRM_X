"use client";

import Link from "next/link";
import { useStore } from "@/lib/store";

export default function NotificationsPage() {
  const { current, notices, markRead, markAllRead } = useStore();
  if (!current) return null;
  const mine = (notices ?? []).filter((n) => n.userId === current.id);
  return (
    <div className="card p-6 max-w-2xl">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold">Все уведомления</h1>
        <button className="text-sm text-[#757575]" onClick={markAllRead}>
          Прочитать все
        </button>
      </div>
      {mine.length === 0 && <p className="text-[#757575]">Пока тихо.</p>}
      <div className="space-y-2">
        {mine.map((n) => (
          <Link
            key={n.id}
            href={n.taskId ? `/tasks/${n.taskId}` : "/home"}
            onClick={() => markRead(n.id)}
            className={`block rounded-2xl px-4 py-3 text-sm ${n.read ? "bg-gray-50 text-[#757575]" : "bg-[var(--honey-soft)]"}`}
          >
            <div>{n.text}</div>
            <div className="text-xs mt-1 opacity-60">
              {new Date(n.createdAt).toLocaleString("ru-RU")}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
