"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  BookOpen,
  CheckSquare,
  Contact,
  Home,
  Kanban,
  LayoutGrid,
  LogOut,
  Menu,
  Search,
  Settings,
  Users,
  X,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cpoNav, employeeNav, isCpo } from "@/lib/access";
import { noticeVisible } from "@/lib/emoji";
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
  const { current, logout, notices, markRead, markAllRead, users, setPreviewId } = useStore();
  const path = usePathname();
  const router = useRouter();
  const [bell, setBell] = useState(false);
  const [menu, setMenu] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!current) router.replace("/login");
  }, [current, router]);
  useEffect(() => {
    setMenu(false);
    setBell(false);
  }, [path]);
  if (!current) return null;

  const nav = isCpo(current) ? cpoNav() : employeeNav(current);
  const mine = (notices ?? []).filter((n) => n.userId === current.id && noticeVisible(n));
  const unread = mine.filter((n) => !n.read).length;
  const team = users.filter((u) => u.id !== current.id).slice(0, 5);

  const navList = (
    <nav className="flex flex-col gap-1 flex-1">
      {nav.map((n) => {
        const on = path === n.href || (n.href.startsWith("/kanban") && path === "/kanban");
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
  );

  return (
    <div className="min-h-dvh md:p-5 bg-[#ececee]">
      <div className="bg-white md:rounded-[28px] min-h-dvh md:min-h-[calc(100dvh-2.5rem)] md:grid md:grid-cols-[240px_1fr] overflow-hidden">
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
          {navList}
          <div className="flex -space-x-2 mb-4 mt-4">
            {team.map((u) => (
              <span key={u.id} className="h-9 w-9 rounded-full bg-[#f4f4f6] border-2 border-white grid place-items-center text-xs font-semibold">
                {u.avatar}
              </span>
            ))}
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

        {menu && (
          <div className="md:hidden fixed inset-0 z-40 bg-black/40 flex flex-col justify-end" onClick={() => setMenu(false)}>
            <div
              className="bg-white rounded-t-[24px] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] max-h-[75dvh] overflow-y-auto animate-[slideUp_.2s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#ddd]" />
              <div className="font-semibold mb-3">Навигация</div>
              {navList}
              <button
                className="mt-4 w-full text-left text-sm text-[#6b6b70] py-2"
                onClick={() => {
                  logout();
                  router.push("/login");
                }}
              >
                Выйти
              </button>
            </div>
          </div>
        )}

        <div className="min-w-0 flex flex-col pb-16 md:pb-0">
          <header className="relative flex items-center gap-2 px-3 py-3 md:px-6 md:py-4">
            <button className="md:hidden h-10 w-10 rounded-full bg-[#f4f4f6] grid place-items-center shrink-0" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </button>
            <Link href="/home" className="md:hidden font-semibold text-sm shrink-0">CRM X</Link>
            <div className="flex-1 flex items-center gap-2 bg-[#f4f4f6] rounded-full px-3 h-10 md:h-11 min-w-0">
              <Search size={16} className="text-[#9a9aa0] shrink-0" />
              <input
                className="flex-1 bg-transparent border-0 rounded-none px-0 py-0 min-w-0 text-sm"
                placeholder="Поиск…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") router.push("/kanban");
                }}
              />
            </div>
            <button
              className="h-10 w-10 md:h-11 md:w-11 rounded-full bg-[#f4f4f6] grid place-items-center relative shrink-0"
              onClick={() => setBell((v) => !v)}
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[#e86a4a] text-white text-[10px]">
                  {unread}
                </span>
              )}
            </button>
            <span className="hidden sm:grid h-10 w-10 rounded-full bg-[#d4f5e4] place-items-center font-semibold shrink-0">
              {current.avatar}
            </span>
            {bell && (
              <div className="absolute right-3 top-14 w-[min(20rem,calc(100vw-1.5rem))] max-h-80 overflow-auto bg-white rounded-2xl shadow-lg z-30 p-2 border border-black/5">
                <div className="flex justify-between px-2 py-1 text-xs text-[#9a9aa0]">
                  <span>Уведомления</span>
                  <button onClick={markAllRead}>прочитать все</button>
                </div>
                {mine.slice(0, 10).map((n) => (
                  <Link
                    key={n.id}
                    href={n.taskId ? "#" : "/notifications"}
                    onClick={(e) => {
                      e.preventDefault();
                      markRead(n.id);
                      setBell(false);
                      if (n.taskId) setPreviewId(n.taskId);
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
          <main className="flex-1 px-3 pb-4 md:px-6 md:pb-6 min-w-0">{children}</main>
          <TaskModal />
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-black/5 grid grid-cols-4 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-30">
        <Link href="/home" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/home" ? "text-black font-semibold" : "text-[#9a9aa0]")}>
          <Home size={20} /> Главная
        </Link>
        <Link href="/kanban" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/kanban" ? "text-black font-semibold" : "text-[#9a9aa0]")}>
          <Kanban size={20} /> Доска
        </Link>
        <button type="button" className="flex flex-col items-center gap-0.5 text-[11px] text-[#9a9aa0]" onClick={() => setBell(true)}>
          <Bell size={20} /> События
        </button>
        <button type="button" className="flex flex-col items-center gap-0.5 text-[11px] text-[#9a9aa0]" onClick={() => setMenu(true)}>
          <Menu size={20} /> Меню
        </button>
      </nav>
    </div>
  );
}
