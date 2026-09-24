"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, CornerDownLeft, FolderKanban, ListChecks, Plus, Search, User as UserIcon } from "lucide-react";
import { useStore } from "@/lib/store";
import { canSeeContact, canSeeTask, cpoNav, employeeNav, isCpo } from "@/lib/access";
import { StatusIcon } from "@/components/StatusIcon";
import { AddTaskModal } from "@/components/AddTaskModal";
import { shortDate } from "@/lib/dates";

type Item = { id: string; group: string; label: string; hint?: string; icon: React.ReactNode; run: () => void };

const norm = (s: string) => s.toLowerCase().replace(/ё/g, "е");

/** ⌘K / Ctrl+K: поиск по задачам, проектам, контрагентам и разделам + быстрые действия. */
export function CommandPalette({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { current, tasks, users, zones, contacts, setPreviewId, saveRecord } = useStore();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [active, setActive] = useState(0);
  const [adding, setAdding] = useState(false);
  const [note, setNote] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 0);
  }, [open]);

  const items = useMemo<Item[]>(() => {
    if (!current) return [];
    const needle = norm(q.trim());
    const hit = (...xs: (string | undefined)[]) => !needle || xs.some((x) => x && norm(x).includes(needle));
    const close = () => {
      onClose();
      setQ("");
      setActive(0);
    };
    const out: Item[] = [];
    const text = q.trim();
    out.push({
      id: "new-task",
      group: "Действия",
      label: text ? `Новая задача «${text}»` : "Новая задача",
      icon: <Plus size={16} />,
      run: () => setAdding(true),
    });
    out.push({
      id: "new-todo",
      group: "Действия",
      label: text ? `Новое дело «${text}»` : "Новое дело",
      hint: text ? "без напоминания" : undefined,
      icon: <ListChecks size={16} />,
      run: async () => {
        if (!text) {
          close();
          router.push("/todo");
          return;
        }
        const r = await saveRecord("todos", {
          id: `td-${crypto.randomUUID().slice(0, 10)}`,
          userId: current.id,
          text,
          done: false,
          repeat: "none",
          createdAt: new Date().toISOString(),
        });
        if (r.ok) close();
        else setNote(r.error);
      },
    });
    const nav = isCpo(current) ? cpoNav() : employeeNav(current);
    for (const n of nav) {
      if (!hit(n.label)) continue;
      out.push({ id: `nav-${n.href}`, group: "Разделы", label: n.label, icon: <ArrowRight size={16} />, run: () => { close(); router.push(n.href); } });
    }
    if (needle) {
      const found = tasks
        .filter((t) => canSeeTask(current, t, users) && hit(t.title, t.code, t.workstream))
        .sort((a, b) => Number(a.status === "done") - Number(b.status === "done") || a.due.localeCompare(b.due))
        .slice(0, 8);
      for (const t of found) {
        out.push({
          id: `task-${t.id}`,
          group: "Задачи",
          label: t.title,
          hint: `${t.code ? `${t.code} · ` : ""}до ${shortDate(t.due)}`,
          icon: <StatusIcon status={t.status} size={16} />,
          run: () => { close(); setPreviewId(t.id); },
        });
      }
      for (const z of zones.filter((x) => hit(x.name, x.slug)).slice(0, 5)) {
        out.push({ id: `zone-${z.slug}`, group: "Проекты", label: `${z.emoji} ${z.name}`, icon: <FolderKanban size={16} />, run: () => { close(); router.push(`/zones/${z.slug}`); } });
      }
      for (const c of contacts.filter((x) => canSeeContact(current, x) && hit(x.name, x.company, x.specialty)).slice(0, 5)) {
        out.push({
          id: `contact-${c.id}`,
          group: "Контрагенты",
          label: c.name,
          hint: [c.specialty, c.company].filter(Boolean).join(" · ") || undefined,
          icon: <UserIcon size={16} />,
          run: () => { close(); router.push("/contacts"); },
        });
      }
    }
    // Когда что-то ищут, найденное важнее действий — действия уходят вниз.
    if (needle) {
      const found = out.filter((i) => i.group !== "Действия");
      if (found.length) return [...found, ...out.filter((i) => i.group === "Действия")];
    }
    return out;
  }, [q, current, tasks, users, zones, contacts, router, setPreviewId, saveRecord, onClose]);

  const safeActive = Math.min(active, Math.max(0, items.length - 1));

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-i="${safeActive}"]`)?.scrollIntoView({ block: "nearest" });
  }, [safeActive]);

  if (!current) return null;
  if (adding) {
    return (
      <AddTaskModal
        initialTitle={q.trim() || undefined}
        onClose={() => {
          setAdding(false);
          onClose();
          setQ("");
        }}
      />
    );
  }
  if (!open) return null;

  let lastGroup = "";
  return (
    <div className="fixed inset-0 z-50 bg-black/30 flex items-start justify-center px-3 pt-[12vh]" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Поиск и команды"
        className="card w-full max-w-xl shadow-2xl overflow-hidden"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 px-4 border-b border-[var(--line)]">
          <Search size={18} className="text-[var(--muted)] shrink-0" aria-hidden="true" />
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setActive(0);
              setNote("");
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, items.length - 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              } else if (e.key === "Enter") {
                e.preventDefault();
                items[safeActive]?.run();
              } else if (e.key === "Escape") {
                onClose();
              }
            }}
            placeholder="Найти задачу, проект, контрагента или раздел…"
            aria-label="Поиск"
            className="flex-1 !border-0 !bg-transparent !rounded-none !px-0 !py-4 text-[15px] focus-visible:!outline-none"
          />
          <kbd className="cap hidden sm:inline border border-[var(--line)] rounded-md px-1.5">Esc</kbd>
        </div>
        <div ref={listRef} className="max-h-[60vh] overflow-y-auto py-2" role="listbox" aria-label="Результаты">
          {items.map((it, i) => {
            const head = it.group !== lastGroup ? it.group : null;
            lastGroup = it.group;
            return (
              <div key={it.id}>
                {head && <div className="cap px-4 pt-2 pb-1">{head}</div>}
                <button
                  type="button"
                  role="option"
                  aria-selected={i === safeActive}
                  data-i={i}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => it.run()}
                  className={`w-full text-left flex items-center gap-3 px-4 py-2.5 text-sm ${i === safeActive ? "bg-[var(--soft)]" : ""}`}
                >
                  <span className="text-[var(--muted)] shrink-0">{it.icon}</span>
                  <span className="flex-1 min-w-0 truncate">{it.label}</span>
                  {it.hint && <span className="cap shrink-0 truncate max-w-[40%]">{it.hint}</span>}
                  {i === safeActive && <CornerDownLeft size={14} className="text-[var(--muted)] shrink-0" aria-hidden="true" />}
                </button>
              </div>
            );
          })}
          {q.trim() && items.every((x) => x.group === "Действия") && <p className="cap px-4 py-3 m-0">Ничего не найдено</p>}
        </div>
        {note && <p className="text-sm text-[var(--red)] px-4 pb-3 m-0">{note}</p>}
        <div className="flex gap-4 px-4 py-2 border-t border-[var(--line)] cap">
          <span>↑↓ выбрать</span>
          <span>Enter открыть</span>
          <span className="ml-auto">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  );
}
