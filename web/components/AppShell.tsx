"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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
  KeyRound,
  CalendarDays,
  GanttChart,
  ClipboardList,
  ListChecks,
  PanelLeftClose,
  PanelLeftOpen,
  Wallet,
  ShieldAlert,
  CircleHelp,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { cpoNav, employeeNav, isCpo } from "@/lib/access";
import { noticeVisible } from "@/lib/emoji";
import clsx from "clsx";
import { TaskModal } from "@/components/TaskSheet";
import { Reminders } from "@/components/Reminders";
import { CommandPalette } from "@/components/CommandPalette";
import { HelpDrawer } from "@/components/Help";

const icons: Record<string, React.ReactNode> = {
  home: <Home size={18} />,
  week: <CalendarDays size={18} />,
  timeline: <GanttChart size={18} />,
  meeting: <ClipboardList size={18} />,
  todo: <ListChecks size={18} />,
  check: <CheckSquare size={18} />,
  kanban: <Kanban size={18} />,
  zone: <LayoutGrid size={18} />,
  team: <Users size={18} />,
  wiki: <BookOpen size={18} />,
  contacts: <Contact size={18} />,
  money: <Wallet size={18} />,
  risks: <ShieldAlert size={18} />,
};

export function AppShell({ children }: { children: React.ReactNode }) {
  const { current, logout, notices, markRead, markAllRead, users, setPreviewId, cloud } = useStore();
  const path = usePathname();
  const router = useRouter();
  const [bell, setBell] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cmdk, setCmdk] = useState(false);
  const [help, setHelp] = useState(false);
  const closeHelp = useCallback(() => setHelp(false), []);
  // Свёрнутое меню запоминаем в браузере.
  const [collapsed, setCollapsed] = useState(() => {
    try {
      return typeof window !== "undefined" && localStorage.getItem("crmx-nav-collapsed") === "1";
    } catch {
      return false;
    }
  });
  const toggleCollapsed = () =>
    setCollapsed((v) => {
      try {
        localStorage.setItem("crmx-nav-collapsed", v ? "0" : "1");
      } catch {
        /* ignore */
      }
      return !v;
    });
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdk((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (!current) router.replace("/login");
  }, [current, router]);
  useEffect(() => {
    setMenu(false);
    setBell(false);
    setHelp(false);
  }, [path]);
  if (!current) return null;

  const nav = isCpo(current) ? cpoNav() : employeeNav(current);
  const mine = (notices ?? []).filter((n) => n.userId === current.id && noticeVisible(n));
  const unread = mine.filter((n) => !n.read).length;
  const team = users.filter((u) => u.id !== current.id).slice(0, 5);

  const navItems = (mini: boolean) => (
    <nav className="flex flex-col gap-1 flex-1">
      {nav.map((n) => {
        const on = path === n.href || (n.href === "/roadmap" && path === "/timeline") || (n.href.startsWith("/kanban") && path === "/kanban");
        return (
          <Link
            key={n.href}
            href={n.href}
            title={mini ? n.label : undefined}
            aria-label={mini ? n.label : undefined}
            className={clsx(
              "flex items-center gap-3 py-2 rounded-xl text-sm",
              mini ? "justify-center px-0 h-10" : "px-3",
              on ? "bg-[var(--card)] text-[var(--ink)] font-medium border border-[var(--line)]" : "text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card)]/60 border border-transparent",
            )}
          >
            {icons[n.icon]}
            {!mini && n.label}
          </Link>
        );
      })}
    </nav>
  );
  const navList = navItems(false);

  return (
    <div className="min-h-dvh bg-[var(--bg)]">
      <div className="min-h-dvh">
        {/* Боковое меню закреплено и не скроллится со страницей; сворачивается до иконок. */}
        <aside
          className={clsx(
            "hidden md:flex flex-col fixed inset-y-0 left-0 z-20 py-5 overflow-y-auto bg-[var(--bg)] border-r border-[var(--line)] transition-[width] duration-200",
            collapsed ? "w-[72px] px-3" : "w-[232px] px-4",
          )}
        >
          <div className={clsx("flex items-center mb-7", collapsed ? "flex-col gap-3" : "gap-2 px-3")}>
            <Link href="/home" className="flex items-center gap-2 min-w-0" aria-label="CRM X — главная">
              <span className="h-8 w-8 rounded-[10px] bg-[var(--ink)] grid place-items-center text-white text-xs font-bold shrink-0">X</span>
              {!collapsed && <span className="font-semibold text-[17px] tracking-tight">CRM X</span>}
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              className={clsx("h-8 w-8 rounded-lg grid place-items-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card)]", !collapsed && "ml-auto")}
              aria-label={collapsed ? "Развернуть меню" : "Свернуть меню"}
              title={collapsed ? "Развернуть меню" : "Свернуть меню"}
            >
              {collapsed ? <PanelLeftOpen size={17} /> : <PanelLeftClose size={17} />}
            </button>
          </div>
          {navItems(collapsed)}
          {!collapsed && (
            <div className="flex -space-x-2 mb-4 mt-4 px-3">
              {team.map((u) => (
                <span key={u.id} className="h-8 w-8 rounded-full bg-[var(--card)] border-2 border-[var(--bg)] grid place-items-center text-xs font-semibold">
                  {u.avatar}
                </span>
              ))}
            </div>
          )}
          <div className={clsx("flex flex-col gap-1 mt-3", collapsed && "items-center")}>
            <Link href="/profile" title="Мой профиль" className={clsx("flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] py-1.5", collapsed ? "justify-center w-10" : "px-3")}>
              <KeyRound size={16} /> {!collapsed && "Мой профиль"}
            </Link>
            {isCpo(current) && (
              <Link href="/settings" title="Настройки" className={clsx("flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] py-1.5", collapsed ? "justify-center w-10" : "px-3")}>
                <Settings size={16} /> {!collapsed && "Настройки"}
              </Link>
            )}
            <button
              title="Выйти"
              className={clsx("flex items-center gap-2 text-sm text-[var(--muted)] hover:text-[var(--ink)] py-1.5", collapsed ? "justify-center w-10" : "px-3")}
              onClick={() => {
                logout();
                router.push("/login");
              }}
            >
              <LogOut size={16} /> {!collapsed && "Выйти"}
            </button>
          </div>
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
              <Link href="/profile" className="mt-4 block text-sm text-[#6F6E69] py-2" onClick={() => setMenu(false)}>
                Мой профиль · пароль
              </Link>
              <button
                className="w-full text-left text-sm text-[#6F6E69] py-2"
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

        <div className={clsx("min-w-0 flex flex-col pb-16 md:pb-0 transition-[padding] duration-200", collapsed ? "md:pl-[72px]" : "md:pl-[232px]")}>
          <header className="relative flex items-center gap-2 px-4 py-3 md:px-8 md:pt-6 md:pb-2">
            <button className="md:hidden h-10 w-10 rounded-full bg-[var(--card)] border border-[var(--line)] grid place-items-center shrink-0" aria-label="Меню" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </button>
            <Link href="/home" className="md:hidden font-semibold text-sm shrink-0">CRM X</Link>
            <button
              type="button"
              onClick={() => setCmdk(true)}
              className="flex-1 md:flex-none md:w-80 flex items-center gap-2 bg-[var(--card)] border border-[var(--line)] rounded-full px-3 h-10 min-w-0 md:mr-auto text-left text-sm text-[var(--muted)]"
              aria-label="Поиск и команды"
            >
              <Search size={16} className="shrink-0" />
              <span className="flex-1 truncate">Поиск и команды…</span>
              <kbd className="hidden md:inline cap border border-[var(--line)] rounded-md px-1.5">⌘K</kbd>
            </button>
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-[var(--card)] border border-[var(--line)] grid place-items-center shrink-0 text-[var(--muted)] hover:text-[var(--ink)]"
              aria-label="Справка по разделу"
              title="Справка по разделу"
              onClick={() => setHelp(true)}
            >
              <CircleHelp size={18} />
            </button>
            <button
              className="h-10 w-10 rounded-full bg-[var(--card)] border border-[var(--line)] grid place-items-center relative shrink-0"
              aria-label="Уведомления"
              onClick={() => setBell((v) => !v)}
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-[var(--red)] text-white text-[10px]">
                  {unread}
                </span>
              )}
            </button>
            {!cloud && <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-full bg-[#fee2e2] text-[#991b1b]">только этот браузер</span>}
            <span className="hidden sm:grid h-10 w-10 rounded-full bg-[var(--ink)] text-white place-items-center font-semibold shrink-0">
              {current.avatar}
            </span>
            {bell && (
              <div className="absolute right-3 top-14 w-[min(20rem,calc(100vw-1.5rem))] max-h-80 overflow-auto bg-white rounded-2xl shadow-lg z-30 p-2 border border-black/5">
                <div className="flex justify-between px-2 py-1 text-xs text-[#6F6E69]">
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
                    className={`block rounded-xl px-3 py-2 text-sm mb-1 ${n.read ? "text-[#6F6E69]" : "bg-[#F3F2EE]"}`}
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
          {!cloud && (
            <div className="mx-3 md:mx-6 mb-2 rounded-2xl bg-[#fee2e2] text-[#991b1b] text-sm px-4 py-3">
              Это старый вход только в браузере. Нажми <b>Выйти</b> и войди снова — доска станет общей.
            </div>
          )}
          <main className="flex-1 px-4 pb-6 md:px-8 md:pb-10 min-w-0 w-full max-w-[1440px]">{children}</main>
          <TaskModal />
          <Reminders />
          <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
          {help && <HelpDrawer path={path} onClose={closeHelp} />}
        </div>
      </div>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur border-t border-[var(--line)] grid grid-cols-5 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] z-30">
        <Link href="/home" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/home" ? "text-black font-semibold" : "text-[#6F6E69]")}>
          <Home size={20} /> Главная
        </Link>
        <Link href="/week" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/week" ? "text-black font-semibold" : "text-[#6F6E69]")}>
          <CalendarDays size={20} /> Неделя
        </Link>
        <Link href="/kanban" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/kanban" ? "text-black font-semibold" : "text-[#6F6E69]")}>
          <Kanban size={20} /> Доска
        </Link>
        <Link href="/todo" className={clsx("flex flex-col items-center gap-0.5 text-[11px]", path === "/todo" ? "text-black font-semibold" : "text-[#6F6E69]")}>
          <ListChecks size={20} /> Дела
        </Link>
        <button type="button" className="flex flex-col items-center gap-0.5 text-[11px] text-[#6F6E69]" onClick={() => setMenu(true)}>
          <Menu size={20} /> Меню
        </button>
      </nav>
    </div>
  );
}
