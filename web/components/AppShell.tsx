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
import { HelixSyncButton } from "@/components/HelixSyncButton";

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
              "flex items-center gap-3 min-h-10 rounded-full text-[12px] font-bold uppercase tracking-[0.06em] transition-colors",
              mini ? "justify-center px-0 h-10" : "px-3.5",
              on ? "bg-[var(--ink)] text-white" : "text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--card)]",
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
    <div className="min-h-dvh bg-[var(--canvas)]">
      <div className="min-h-dvh">
        {/* Боковое меню закреплено и не скроллится со страницей; сворачивается до иконок. */}
        <aside
          className={clsx(
            "hidden md:flex flex-col fixed top-[var(--gap)] bottom-[var(--gap)] left-[var(--gap)] z-20 py-5 overflow-y-auto bg-[var(--bg)] rounded-[var(--r-panel)] transition-[width] duration-200",
            collapsed ? "w-[72px] px-3" : "w-[232px] px-4",
          )}
        >
          <div className={clsx("flex items-center mb-7", collapsed ? "flex-col gap-3" : "gap-2 px-3")}>
            <Link href="/home" className="flex items-center gap-2 min-w-0" aria-label="CRM X — главная">
              <QMark />
              {!collapsed && (
                <span className="display font-bold text-[18px] tracking-[-0.04em] whitespace-nowrap">
                  crm x<span className="inline-block h-[7px] w-[7px] rounded-full bg-[var(--orange)] ml-0.5 align-top mt-1" />
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={toggleCollapsed}
              className={clsx("h-8 w-8 rounded-full grid place-items-center text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--card)]", !collapsed && "ml-auto")}
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
                <span key={u.id} title={u.name} className="h-8 w-8 rounded-full bg-[var(--card)] border-2 border-[var(--bg)] grid place-items-center text-xs font-semibold">
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
              className="bg-[var(--bg)] rounded-t-[24px] p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] max-h-[75dvh] overflow-y-auto animate-[slideUp_.2s_ease-out]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-[#ddd]" />
              <div className="font-semibold mb-3">Навигация</div>
              {navList}
              <Link href="/profile" className="mt-4 block text-sm text-[var(--muted)] py-2" onClick={() => setMenu(false)}>
                Мой профиль · пароль
              </Link>
              <button
                className="w-full text-left text-sm text-[var(--muted)] py-2"
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

        <div className={clsx("min-w-0 min-h-dvh flex flex-col gap-[var(--gap)] p-[var(--gap)] pb-24 md:pb-[var(--gap)] transition-[padding] duration-200", collapsed ? "md:pl-[calc(72px+var(--gap)*2)]" : "md:pl-[calc(232px+var(--gap)*2)]")}>
          <header className="relative flex items-center gap-2 px-3 py-3 md:px-5 bg-[var(--bg)] rounded-[var(--r-panel)]">
            <button className="md:hidden h-10 w-10 rounded-full bg-[var(--card)] grid place-items-center shrink-0" aria-label="Меню" onClick={() => setMenu(true)}>
              <Menu size={18} />
            </button>
            <Link href="/home" className="md:hidden display font-bold text-[15px] tracking-[-0.04em] shrink-0" aria-label="CRM X — главная">crm x</Link>
            <button
              type="button"
              onClick={() => setCmdk(true)}
              className="flex-1 md:flex-none md:w-80 flex items-center gap-2 bg-[var(--card)] border-[1.5px] border-[var(--hair)] rounded-full px-3.5 h-10 min-w-0 md:mr-auto text-left text-sm text-[var(--ink-2)] hover:bg-[var(--apricot-2)] transition-colors"
              aria-label="Поиск и команды"
            >
              <Search size={16} className="shrink-0" />
              <span className="flex-1 truncate">Поиск и команды…</span>
              <kbd className="hidden md:inline text-[11px] font-bold rounded-full px-2 py-0.5 bg-[var(--apricot)] text-[var(--ink)]">⌘K</kbd>
            </button>
            <HelixSyncButton />
            <button
              type="button"
              className="h-10 w-10 rounded-full bg-[var(--card)] grid place-items-center shrink-0 text-[var(--ink-2)] hover:text-[var(--ink)] hover:bg-[var(--apricot-2)] transition-colors"
              aria-label="Справка по разделу"
              title="Справка по разделу"
              onClick={() => setHelp(true)}
            >
              <CircleHelp size={18} />
            </button>
            <button
              className="h-10 w-10 rounded-full bg-[var(--card)] grid place-items-center relative shrink-0 hover:bg-[var(--apricot-2)] transition-colors"
              aria-label="Уведомления"
              onClick={() => setBell((v) => !v)}
            >
              <Bell size={18} />
              {unread > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-[var(--orange)] text-[var(--ink)] text-[10px] font-bold grid place-items-center">
                  {unread}
                </span>
              )}
            </button>
            {!cloud && <span className="hidden sm:inline text-[10px] px-2 py-1 rounded-full bg-[var(--apricot-2)] text-[var(--red)]">только этот браузер</span>}
            <span className="hidden sm:grid h-10 w-10 rounded-full bg-[var(--ink)] text-white place-items-center font-semibold shrink-0">
              {current.avatar}
            </span>
            {bell && (
              <div className="absolute right-3 top-[60px] w-[min(20rem,calc(100vw-1.5rem))] max-h-80 overflow-auto bg-white rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,.25)] z-30 p-2 border-[1.5px] border-[var(--hair)]">
                <div className="flex justify-between px-2 py-1 text-xs text-[var(--muted)]">
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
                    className={`block rounded-xl px-3 py-2 text-sm mb-1 ${n.read ? "text-[var(--muted)]" : "bg-[var(--soft)]"}`}
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
            <div className="rounded-[var(--r-panel)] bg-[var(--apricot)] text-[var(--ink)] text-sm px-5 py-3">
              Это старый вход только в браузере. Нажми <b>Выйти</b> и войди снова — доска станет общей.
            </div>
          )}
          <main className="flex-1 bg-[var(--bg)] rounded-[var(--r-panel)] px-4 py-5 md:px-8 md:py-7 min-w-0 w-full">
            <div className="max-w-[1440px]">{children}</div>
          </main>
          <TaskModal />
          <Reminders />
          <CommandPalette open={cmdk} onClose={() => setCmdk(false)} />
          {help && <HelpDrawer path={path} onClose={closeHelp} />}
        </div>
      </div>

      <nav aria-label="Разделы" className="md:hidden fixed z-30 left-1/2 -translate-x-1/2 bottom-[max(0.75rem,env(safe-area-inset-bottom))] flex items-center gap-1 p-1.5 rounded-full bg-[var(--bg)] border-[1.5px] border-[var(--hair)] shadow-[0_12px_30px_rgba(0,0,0,.35)]">
        {[
          { href: "/home", label: "Главная", icon: <Home size={20} /> },
          { href: "/week", label: "Неделя", icon: <CalendarDays size={20} /> },
          { href: "/kanban", label: "Доска", icon: <Kanban size={20} /> },
          { href: "/todo", label: "Дела", icon: <ListChecks size={20} /> },
        ].map((t) => (
          <Link
            key={t.href}
            href={t.href}
            aria-label={t.label}
            aria-current={path === t.href ? "page" : undefined}
            className={clsx("h-11 w-11 rounded-full grid place-items-center transition-colors", path === t.href ? "bg-[var(--ink)] text-white" : "text-[var(--ink)] hover:bg-[var(--card)]")}
          >
            {t.icon}
          </Link>
        ))}
        <button type="button" aria-label="Меню" className="h-11 w-11 rounded-full grid place-items-center bg-[var(--orange)] text-[var(--ink)]" onClick={() => setMenu(true)}>
          <Menu size={20} />
        </button>
      </nav>
    </div>
  );
}

/** Знак Quicky: горизонтальный овал с диагональю. */
function QMark() {
  return (
    <svg viewBox="0 0 110 58" className="h-[22px] w-[42px] shrink-0" aria-hidden="true">
      <ellipse cx="50" cy="28" rx="44" ry="21" fill="none" stroke="var(--ink)" strokeWidth="7" />
      <path d="M21 15.5 L104 53" fill="none" stroke="var(--ink)" strokeWidth="7" strokeLinecap="round" />
    </svg>
  );
}
