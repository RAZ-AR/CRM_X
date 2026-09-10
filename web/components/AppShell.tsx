"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  Calendar,
  CheckSquare,
  Contact,
  Home,
  Kanban,
  LayoutGrid,
  LogOut,
  Search,
  Settings,
  Users,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cpoNav, employeeNav, isCpo } from "@/lib/access";
import clsx from "clsx";
import { TaskModal } from "@/components/TaskSheet";

const icons: Record<string, React.ReactNode> = {
  home: <Home size={18} />,
  check: <CheckSquare size={18} />,
  kanban: <Kanban size={18} />,
  zone: <LayoutGrid size={18} />,
  team: <Users size={18} />,
  wiki: <BookOpen size={18} />,
  contacts: <Contact size={18} />,
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { current, logout, notices, markRead, markAllRead, users } = useStore();
  const path = usePathname();
  const router = useRouter();
  const [bell, setBell] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!current) router.replace("/login");
  }, [current, router]);
  if (!current) return null;

  const nav = isCpo(current) ? cpoNav() : employeeNav(current);
  const mine = (notices ?? []).filter((n) => n.userId === current.id);
  const unread = mine.filter((n) => !n.read).length;
  const team = users.filter((u) => u.id !== current.id).slice(0, 5);

  return (
    <div className="min-h-screen p-3 md:p-5">
      <div className="bg-white rounded-[28px] min-h-[calc(100vh-2.5rem)] md:grid md:grid-cols-[240px_1fr] overflow-hidden">
        <aside className="hidden md:flex flex-col p-6 border-r border-black/5">
          <Link href="/home" className="flex items-center gap-2 mb-8">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#2bb673] to-[#6b7cff] grid place-items-center text-white text-xs font-bold">
              X
            </span>
            <span className="font-semibold text-lg">CRM X</span>
          </Link>
          {path === "/home" && (
            <h2 className="text-[28px] font-bold leading-tight mb-8">
              Начни день
              <br />и будь в деле ✌️
            </h2>
          )}
          <div className="text-[11px] tracking-widest text-[#9a9aa0] mb-2">MENU</div>
          <nav className="flex flex-col gap-1 flex-1">
            {nav.map((n) => {
              const on = path === n.href;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-2.5 rounded-full text-sm",
                    on ? "bg-black text-white" : "text-[#6b6b70] hover:bg-[#f4f4f6]",
                  )}
                >
                  {icons[n.icon]}
                  {n.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex -space-x-2 mb-4">
            {team.map((u) => (
              <span
                key={u.id}
                title={u.name}
                className="h-9 w-9 rounded-full bg-[#f4f4f6] border-2 border-white grid place-items-center text-xs font-semibold"
              >
                {u.avatar}
              </span>
            ))}
            <span className="h-9 w-9 rounded-full bg-white border border-dashed border-[#ccc] grid place-items-center text-[10px] text-[#9a9aa0]">
              {users.length}+
            </span>
          </div>
          {isCpo(current) && (
            <Link href="/settings" className="flex items-center gap-2 text-sm text-[#6b6b70] py-1">
              <Settings size={16} /> Настройки
            </Link>
          )}
          <button
            className="flex items-center gap-2 text-sm text-[#6b6b70] py-1"
            onClick={() => {
              logout();
              router.push("/login");
            }}
          >
            <LogOut size={16} /> Выйти
          </button>
        </aside>

        <div className="min-w-0 flex flex-col">
          <header className="relative flex items-center gap-3 px-6 py-4">
            <div className="flex-1 flex items-center gap-2 bg-[#f4f4f6] rounded-full px-4 h-11">
              <Search size={16} className="text-[#9a9aa0]" />
              <input
                className="flex-1 bg-transparent border-0 rounded-none px-0 py-0"
                placeholder="Поиск…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push("/tasks");
                }}
              />
            </div>
            <button
              className="h-11 w-11 rounded-full bg-[#f4f4f6] grid place-items-center relative"
              onClick={() => setBell((v) => !v)}
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-1 right-1 min-w-[16px] h-4 px-1 rounded-full bg-[#e86a4a] text-white text-[10px]">
                  {unread}
                </span>
              )}
            </button>
            <div className="flex items-center gap-2 pl-1">
              <span className="h-10 w-10 rounded-full bg-[#d4f5e4] grid place-items-center font-semibold">
                {current.avatar}
              </span>
              <div className="hidden sm:block text-sm">
                <div className="font-semibold leading-tight">{current.name}</div>
                <div className="text-[#9a9aa0] text-xs">{current.title}</div>
              </div>
            </div>
            {bell && (
              <div className="absolute right-8 top-20 w-80 max-h-96 overflow-auto bg-white rounded-2xl shadow-lg z-20 p-2 border border-black/5">
                <div className="flex justify-between px-2 py-1 text-xs text-[#9a9aa0]">
                  <span>Уведомления</span>
                  <button onClick={markAllRead}>прочитать все</button>
                </div>
                {mine.slice(0, 10).map((n) => (
                  <Link
                    key={n.id}
                    href={n.taskId ? `/tasks/${n.taskId}` : "/notifications"}
                    onClick={() => {
                      markRead(n.id);
                      setBell(false);
                    }}
                    className={`block rounded-xl px-3 py-2 text-sm mb-1 ${n.read ? "text-[#6b6b70]" : "bg-[#f4f4f6]"}`}
                  >
                    {n.text}
                  </Link>
                ))}
                <Link href="/notifications" className="block text-center text-sm py-2" onClick={() => setBell(false)}>
                  Все уведомления
                </Link>
              </div>
            )}
          </header>
          <main className="flex-1 px-6 pb-6">{children}</main>
        <TaskModal />
        </div>
      </div>
    </div>
  );
}
