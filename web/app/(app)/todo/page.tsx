"use client";

import { FormEvent, useEffect, useState } from "react";
import { Bell, BellRing, Check, Repeat, Trash2 } from "lucide-react";
import { useStore } from "@/lib/store";
import { PageHeader } from "@/components/PageHeader";
import { TODO_REPEAT, type Todo, type TodoRepeat } from "@/lib/types";

/** Личный список дел с напоминаниями: в браузере, пока CRM открыта, и в Telegram, если он подключён. */
export default function TodoPage() {
  const { current, todos = [], saveRecord, deleteRecord, setPreviewId, tasks } = useStore();
  const [text, setText] = useState("");
  const [remind, setRemind] = useState("");
  const [repeat, setRepeat] = useState<TodoRepeat>("none");
  const [showDone, setShowDone] = useState(false);
  const [err, setErr] = useState("");
  const [edit, setEdit] = useState<string | null>(null);
  const [perm, setPerm] = useState(() => (typeof Notification === "undefined" ? "unsupported" : Notification.permission));
  // «Сейчас» для групп: обновляется раз в 30 секунд.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 30_000);
    return () => clearInterval(t);
  }, []);
  if (!current) return null;

  const mine = todos.filter((t) => t.userId === current.id);
  const open = mine.filter((t) => !t.done);
  const today = toLocalInput(new Date(now)).slice(0, 10);
  const dayOf = (iso: string) => localDate(iso);
  const groups: { id: string; title: string; list: Todo[] }[] = [
    { id: "late", title: "Время прошло", list: open.filter((t) => t.remindAt && Date.parse(t.remindAt) <= now) },
    { id: "today", title: "Сегодня", list: open.filter((t) => t.remindAt && Date.parse(t.remindAt) > now && dayOf(t.remindAt) === today) },
    { id: "later", title: "Позже", list: open.filter((t) => t.remindAt && dayOf(t.remindAt) > today && Date.parse(t.remindAt) > now) },
    { id: "none", title: "Без напоминания", list: open.filter((t) => !t.remindAt) },
  ].map((g) => ({ ...g, list: [...g.list].sort((a, b) => (a.remindAt || a.createdAt).localeCompare(b.remindAt || b.createdAt)) }));
  const done = mine.filter((t) => t.done).sort((a, b) => (b.doneAt || "").localeCompare(a.doneAt || ""));

  async function save(t: Todo) {
    const r = await saveRecord("todos", t);
    setErr(r.ok ? "" : r.error);
    return r.ok;
  }

  async function onAdd(e: FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const ok = await save({
      id: `td-${crypto.randomUUID().slice(0, 10)}`,
      userId: current!.id,
      text: text.trim(),
      done: false,
      remindAt: remind ? new Date(remind).toISOString() : undefined,
      repeat: remind ? repeat : "none",
      createdAt: new Date().toISOString(),
    });
    if (ok) {
      setText("");
      setRemind("");
      setRepeat("none");
    }
  }

  const quick = [
    { label: "Через час", at: () => new Date(Date.now() + 3_600_000) },
    { label: "Сегодня 18:00", at: () => atTime(0, 18) },
    { label: "Завтра 9:00", at: () => atTime(1, 9) },
    { label: "Пн 9:00", at: () => nextMonday(9) },
  ];

  return (
    <div className="space-y-4 max-w-3xl">
      <PageHeader eyebrow={`${open.length} открыто · ${done.length} готово`} title="Дела" />

      <form onSubmit={onAdd} className="card p-4 md:p-5 flex flex-col gap-3">
        <label className="sr-only" htmlFor="todo-text">Новое дело</label>
        <input
          id="todo-text"
          className="!rounded-xl !text-base !px-4 !py-3"
          placeholder="Что сделать? Например: позвонить электрику"
          value={text}
          maxLength={500}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex flex-wrap items-center gap-2">
          {quick.map((q) => (
            <button
              key={q.label}
              type="button"
              className="pill border border-[var(--line)] bg-[var(--card)] px-3 h-9 text-sm hover:bg-[var(--soft)]"
              onClick={() => setRemind(toLocalInput(q.at()))}
            >
              {q.label}
            </button>
          ))}
          <label className="flex items-center gap-2 text-sm text-[var(--muted)]">
            <Bell size={15} aria-hidden="true" />
            <span className="sr-only">Напомнить</span>
            <input type="datetime-local" className="!py-1.5 !px-3 !text-sm" value={remind} onChange={(e) => setRemind(e.target.value)} />
          </label>
          {remind && (
            <select className="!py-1.5 !px-3 !text-sm" value={repeat} onChange={(e) => setRepeat(e.target.value as TodoRepeat)} aria-label="Повтор">
              {(Object.keys(TODO_REPEAT) as TodoRepeat[]).map((r) => (
                <option key={r} value={r}>{TODO_REPEAT[r]}</option>
              ))}
            </select>
          )}
          {remind && (
            <button type="button" className="cap underline" onClick={() => setRemind("")}>без напоминания</button>
          )}
          <button className="pill bg-[var(--ink)] text-white px-5 h-10 text-sm font-medium ml-auto">Добавить</button>
        </div>
        {err && <p className="text-sm text-[var(--red)] m-0">{err}</p>}
      </form>

      {perm !== "granted" && perm !== "unsupported" && (
        <div className="card p-4 flex flex-wrap items-center gap-3">
          <BellRing size={18} aria-hidden="true" />
          <span className="text-sm flex-1 min-w-[12rem]">
            Разрешите уведомления — напоминание всплывёт, даже если вкладка CRM свёрнута.
            {current.telegramLinked ? " В Telegram напоминания тоже придут." : " Подключите Telegram в профиле, чтобы получать их на телефон."}
          </span>
          <button
            type="button"
            className="pill border border-[var(--line)] px-4 h-9 text-sm"
            onClick={async () => setPerm(await Notification.requestPermission())}
          >
            Разрешить
          </button>
        </div>
      )}

      {groups.map((g) =>
        g.list.length ? (
          <section key={g.id} className="card px-2 py-2 md:px-3">
            <div className="flex items-baseline justify-between px-3 pt-2 pb-1">
              <h2 className={`m-0 text-[15px] font-semibold ${g.id === "late" ? "text-[var(--red)]" : ""}`}>{g.title}</h2>
              <span className="cap num">{g.list.length}</span>
            </div>
            {g.list.map((t) =>
              edit === t.id ? (
                <EditRow key={t.id} t={t} onCancel={() => setEdit(null)} onSave={async (x) => (await save(x)) && setEdit(null)} />
              ) : (
                <Row
                  key={t.id}
                  t={t}
                  late={g.id === "late"}
                  taskTitle={t.taskId ? tasks.find((x) => x.id === t.taskId)?.title : undefined}
                  onToggle={() => save({ ...t, done: !t.done })}
                  onEdit={() => setEdit(t.id)}
                  onDelete={async () => {
                    const r = await deleteRecord("todos", t.id);
                    setErr(r.ok ? "" : r.error);
                  }}
                  onTask={() => t.taskId && setPreviewId(t.taskId)}
                />
              ),
            )}
          </section>
        ) : null,
      )}

      {open.length === 0 && (
        <div className="card p-8 text-center">
          <div className="text-[15px] font-medium">Всё сделано</div>
          <p className="cap mt-1 mb-0">Добавьте дело выше — можно с напоминанием и повтором.</p>
        </div>
      )}

      {done.length > 0 && (
        <section className="card px-2 py-2 md:px-3">
          <button type="button" className="w-full flex items-baseline justify-between px-3 pt-2 pb-1" onClick={() => setShowDone(!showDone)} aria-expanded={showDone}>
            <span className="text-[15px] font-semibold">Готово</span>
            <span className="cap num">{showDone ? "скрыть" : done.length}</span>
          </button>
          {showDone &&
            done.slice(0, 50).map((t) => (
              <Row
                key={t.id}
                t={t}
                late={false}
                onToggle={() => save({ ...t, done: false })}
                onEdit={() => setEdit(t.id)}
                onDelete={async () => {
                  const r = await deleteRecord("todos", t.id);
                  setErr(r.ok ? "" : r.error);
                }}
                onTask={() => t.taskId && setPreviewId(t.taskId)}
              />
            ))}
        </section>
      )}
    </div>
  );
}

function Row({
  t,
  late,
  taskTitle,
  onToggle,
  onEdit,
  onDelete,
  onTask,
}: {
  t: Todo;
  late: boolean;
  taskTitle?: string;
  onToggle: () => void;
  onEdit: () => void;
  onDelete: () => void;
  onTask: () => void;
}) {
  return (
    <div className="group flex items-center gap-2 px-1 py-1 border-t border-[var(--line)] first-of-type:border-t-0">
      <button
        type="button"
        onClick={onToggle}
        aria-label={t.done ? "Вернуть в работу" : "Отметить сделанным"}
        className="h-11 w-11 grid place-items-center shrink-0"
      >
        <span className={`h-5 w-5 rounded-full border-2 grid place-items-center ${t.done ? "bg-[var(--ink)] border-[var(--ink)]" : "border-[#b8b6af]"}`}>
          {t.done && <Check size={12} color="white" strokeWidth={3} />}
        </span>
      </button>
      <button type="button" onClick={onEdit} className="flex-1 min-w-0 text-left py-2">
        <span className={`block text-[15px] break-words ${t.done ? "line-through text-[var(--muted)]" : ""}`}>{t.text}</span>
        {(t.remindAt || taskTitle) && (
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-0.5">
            {t.remindAt && (
              <span className={`cap inline-flex items-center gap-1 ${late && !t.done ? "!text-[var(--red)]" : ""}`}>
                <Bell size={12} aria-hidden="true" />
                {fmt(t.remindAt)}
                {t.repeat && t.repeat !== "none" && (
                  <>
                    <Repeat size={12} aria-hidden="true" className="ml-1" />
                    {TODO_REPEAT[t.repeat].toLowerCase()}
                  </>
                )}
              </span>
            )}
          </span>
        )}
      </button>
      {taskTitle && (
        <button type="button" onClick={onTask} className="cap underline shrink-0 max-w-[30%] truncate hidden sm:inline">
          {taskTitle}
        </button>
      )}
      <button
        type="button"
        onClick={() => confirm(`Удалить «${t.text}»?`) && onDelete()}
        aria-label="Удалить"
        className="h-11 w-11 grid place-items-center shrink-0 text-[var(--muted)] opacity-60 md:opacity-0 md:group-hover:opacity-100 focus:opacity-100"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}

function EditRow({ t, onSave, onCancel }: { t: Todo; onSave: (t: Todo) => void; onCancel: () => void }) {
  const [text, setText] = useState(t.text);
  const [remind, setRemind] = useState(t.remindAt ? toLocalInput(new Date(t.remindAt)) : "");
  const [repeat, setRepeat] = useState<TodoRepeat>(t.repeat ?? "none");
  return (
    <form
      className="flex flex-col gap-2 px-3 py-3 border-t border-[var(--line)]"
      onSubmit={(e) => {
        e.preventDefault();
        onSave({ ...t, text, remindAt: remind ? new Date(remind).toISOString() : undefined, repeat: remind ? repeat : "none" });
      }}
    >
      <input className="!rounded-xl" value={text} maxLength={500} onChange={(e) => setText(e.target.value)} aria-label="Текст дела" autoFocus />
      <div className="flex flex-wrap items-center gap-2">
        <input type="datetime-local" className="!py-1.5 !px-3 !text-sm" value={remind} onChange={(e) => setRemind(e.target.value)} aria-label="Напомнить" />
        <select className="!py-1.5 !px-3 !text-sm" value={repeat} onChange={(e) => setRepeat(e.target.value as TodoRepeat)} aria-label="Повтор" disabled={!remind}>
          {(Object.keys(TODO_REPEAT) as TodoRepeat[]).map((r) => (
            <option key={r} value={r}>{TODO_REPEAT[r]}</option>
          ))}
        </select>
        <span className="flex-1" />
        <button type="button" className="text-sm px-3" onClick={onCancel}>Отмена</button>
        <button className="pill bg-[var(--ink)] text-white px-4 h-9 text-sm">Сохранить</button>
      </div>
    </form>
  );
}

/** Дата «ГГГГ-ММ-ДД» в часовом поясе браузера. */
function localDate(iso: string) {
  return toLocalInput(new Date(iso)).slice(0, 10);
}

function toLocalInput(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}T${p(d.getHours())}:${p(d.getMinutes())}`;
}

function atTime(daysAhead: number, hour: number) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(hour, 0, 0, 0);
  if (d.getTime() <= Date.now()) d.setDate(d.getDate() + 1);
  return d;
}

function nextMonday(hour: number) {
  const d = new Date();
  const add = ((8 - d.getDay()) % 7) || 7;
  d.setDate(d.getDate() + add);
  d.setHours(hour, 0, 0, 0);
  return d;
}

function fmt(iso: string) {
  return new Date(iso).toLocaleString("ru-RU", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
}
