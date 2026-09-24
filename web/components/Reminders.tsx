"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Bell, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { dueReminders } from "@/lib/todos";
import type { Todo } from "@/lib/types";

const SHOWN_KEY = "crmx-reminders-shown";

function loadShown(): Set<string> {
  try {
    return new Set(JSON.parse(localStorage.getItem(SHOWN_KEY) || "[]") as string[]);
  } catch {
    return new Set();
  }
}

/** Всплывающие напоминания по делам, пока CRM открыта (и системное уведомление, если разрешено). */
export function Reminders() {
  const { current, todos = [], ackTodo } = useStore();
  const [toasts, setToasts] = useState<Todo[]>([]);
  const todosRef = useRef(todos);
  useEffect(() => {
    todosRef.current = todos;
  }, [todos]);

  useEffect(() => {
    if (!current) return;
    const check = () => {
      const shown = loadShown();
      const due = dueReminders(todosRef.current.filter((t) => t.userId === current.id), Date.now()).filter(
        (t) => !shown.has(`${t.id}@${t.remindAt}`),
      );
      if (!due.length) return;
      for (const t of due) {
        shown.add(`${t.id}@${t.remindAt}`);
        try {
          if (typeof Notification !== "undefined" && Notification.permission === "granted") {
            new Notification("Напоминание", { body: t.text, tag: t.id });
          }
        } catch {
          /* ignore */
        }
        void ackTodo(t.id);
      }
      try {
        localStorage.setItem(SHOWN_KEY, JSON.stringify([...shown].slice(-200)));
      } catch {
        /* ignore */
      }
      setToasts((prev) => [...due, ...prev].slice(0, 4));
    };
    const first = setTimeout(check, 1500);
    const timer = setInterval(check, 15_000);
    return () => {
      clearTimeout(first);
      clearInterval(timer);
    };
  }, [current, ackTodo]);

  if (!toasts.length) return null;
  return (
    <div className="fixed z-50 right-4 bottom-24 md:bottom-6 flex flex-col gap-2 w-[min(22rem,calc(100vw-2rem))]" role="status" aria-live="polite">
      {toasts.map((t) => (
        <div key={`${t.id}-${t.remindAt}`} className="card shadow-lg px-4 py-3 flex items-start gap-3">
          <span className="h-8 w-8 rounded-full bg-[var(--ink)] text-white grid place-items-center shrink-0">
            <Bell size={15} />
          </span>
          <div className="flex-1 min-w-0">
            <div className="cap">Напоминание</div>
            <div className="text-sm font-medium break-words">{t.text}</div>
            <Link href="/todo" className="cap underline" onClick={() => setToasts((p) => p.filter((x) => x !== t))}>
              Открыть дела
            </Link>
          </div>
          <button type="button" aria-label="Закрыть" className="p-1 text-[var(--muted)]" onClick={() => setToasts((p) => p.filter((x) => x !== t))}>
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
}
