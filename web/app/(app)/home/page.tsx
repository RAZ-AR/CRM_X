"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { canManagePeople, canSeeTask, canWorkTask, isCpo, subordinateIds, taskZones } from "@/lib/access";
import { StatusPicker } from "@/components/StatusIcon";
import { openDeps } from "@/lib/taskRules";
import { streamProgress, weightedDone, zoneTasks } from "@/lib/readiness";
import { addDays, diffDays, formatDate, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import { EMOJIS } from "@/lib/emoji";
import { Roadmap } from "@/components/Roadmap";
import type { Activity, Task } from "@/lib/types";
import { dataIssues } from "@/lib/quality";
import { Flame } from "lucide-react";
import { canSeeFinance, DEFAULT_FX, money, totals, upcomingPayments } from "@/lib/finance";
import { riskScore, scoreColor, topRisks } from "@/lib/risks";

const FILTER_KEY = "crmx-home-filters";

/** Главная: фильтры, цифры, сегодня, важное, загрузка команды, проекты, roadmap. */
export default function HomePage() {
  const { current, tasks, zones, users, setPreviewId, broadcast, setBroadcast, activity, risks = [], budget = [], expenses = [], fx } = useStore();
  const [changesDays, setChangesDays] = useState(1);
  // «Сейчас» для окна «24 ч / 7 дней»: обновляется раз в минуту и при переключении.
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(t);
  }, []);
  const today = todayYerevan();
  const [picked, setPicked] = useState(today);
  // Фильтры храним отдельно для каждого пользователя: один браузер может быть общим.
  const filterKey = `${FILTER_KEY}:${current?.id ?? ""}`;
  const [saved] = useState(() => {
    if (typeof window === "undefined") return {};
    try {
      return (JSON.parse(localStorage.getItem(filterKey) || "null") ?? {}) as { who?: string; zone?: string };
    } catch {
      return {};
    }
  });
  const [who, setWho] = useState<string>(saved.who ?? "");
  const [zone, setZone] = useState(saved.zone ?? "all");
  const [msgEdit, setMsgEdit] = useState(false);
  const [msg, setMsg] = useState("");
  const [msgEmoji, setMsgEmoji] = useState("💪");

  const remember = (next: { who?: string; zone?: string }) => {
    try {
      localStorage.setItem(filterKey, JSON.stringify({ who, zone, ...next }));
    } catch {
      /* ignore */
    }
  };
  if (!current) return null;

  const owner = isCpo(current);
  const manager = owner || subordinateIds(current.id, users).length > 0;
  // Сотрудник без подчинённых всегда видит только свои задачи.
  const whoValue = manager ? who || "all" : "me";
  const seen = tasks.filter((t) => canSeeTask(current, t, users));
  const people = users.filter((u) => seen.some((t) => t.assigneeId === u.id));
  const byZone = zone === "all" ? seen : seen.filter((t) => taskZones(t).includes(zone));
  const assigneeId = whoValue === "me" ? current.id : whoValue === "all" ? null : whoValue;
  const scoped = assigneeId ? byZone.filter((t) => t.assigneeId === assigneeId) : byZone;
  const open = scoped.filter((t) => t.status !== "done");

  // Сегодня
  const started = (t: Task) => (t.startDate || t.due) <= picked;
  const overdue = open.filter((t) => t.due < picked).sort((a, b) => a.due.localeCompare(b.due));
  const dueToday = open.filter((t) => t.due === picked);
  const inWork = open.filter((t) => t.status === "in_progress" && started(t) && t.due > picked);
  const toStart = open.filter((t) => t.status === "todo" && started(t) && t.due > picked);

  // Важное
  const horizon = addDays(picked, 7);
  const critical = open.filter((t) => t.criticalPath && t.due <= horizon).sort((a, b) => a.due.localeCompare(b.due));
  const blocked = open.filter((t) => t.status === "blocked");
  const toReview = scoped.filter((t) => t.status === "review" && (owner || t.authorId === current.id));
  const ready = open
    .filter((t) => t.status === "todo" && (t.startDate || t.due) <= addDays(picked, 3) && (t.dependsOn?.length ?? 0) > 0 && !openDeps(t, tasks).length)
    .sort((a, b) => (a.startDate || a.due).localeCompare(b.startDate || b.due));

  // Цифры
  const launches = zones
    .filter((z) => z.slug !== "common" && z.deadline >= picked && (zone === "all" || z.slug === zone))
    .sort((a, b) => a.deadline.localeCompare(b.deadline))
    .slice(0, 2);
  const cp = scoped.filter((t) => t.criticalPath);
  const kpis: { label: string; value: string; tone?: "red" | "dark"; href?: string }[] = [
    ...launches.map((z) => ({ label: `до ${z.emoji} ${z.name}`, value: `${diffDays(picked, z.deadline)} дн`, tone: "dark" as const })),
    { label: "готовность", value: `${weightedDone(scoped)}%` },
    { label: "critical path", value: `${weightedDone(cp)}%` },
    { label: "просрочено", value: String(overdue.length), tone: overdue.length ? "red" : undefined },
    { label: "заблокировано", value: String(blocked.length), tone: blocked.length ? "red" : undefined },
    { label: "ждут проверки", value: String(toReview.length) },
  ];

  // Загрузка команды на неделе
  const ws = weekStart(picked);
  const we = addDays(ws, 6);
  const load = people
    .filter((u) => !assigneeId || u.id === assigneeId)
    .map((u) => {
      const mine = byZone.filter((t) => t.assigneeId === u.id && t.status !== "done");
      return {
        u,
        week: mine.filter((t) => (t.startDate || t.due) <= we && t.due >= ws).length,
        late: mine.filter((t) => t.due < picked).length,
        blocked: mine.filter((t) => t.status === "blocked").length,
        open: mine.length,
      };
    })
    .sort((a, b) => b.week - a.week);
  const maxWeek = Math.max(1, ...load.map((l) => l.week));

  // Что изменилось: журнал по задачам в текущих фильтрах
  const scopedIds = new Set(scoped.map((t) => t.id));
  const sinceIso = new Date(now - changesDays * 86400000).toISOString();
  const changes = (activity ?? []).filter(
    (a) => a.at >= sinceIso && (scopedIds.has(a.taskId) || (owner && a.kind === "deleted" && !assigneeId && zone === "all")),
  );
  const issues = manager ? dataIssues(scoped, tasks, users) : [];

  const projectList = (zone === "all" ? zones : zones.filter((z) => z.slug === zone)).filter(
    (z) => !assigneeId || zoneTasks(z.slug, scoped).length > 0,
  );

  return (
    <div className="space-y-4">
      {/* Фильтры + рассылка */}
      <div className="flex flex-col lg:flex-row lg:items-start gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <input
            type="date"
            className="pill bg-black text-white px-3 py-2 text-sm [color-scheme:dark]"
            value={picked}
            onChange={(e) => e.target.value && setPicked(e.target.value)}
          />
          <select
            className="pill bg-white border border-black/10 px-3 py-2 text-sm"
            value={whoValue}
            onChange={(e) => {
              setWho(e.target.value);
              remember({ who: e.target.value });
            }}
          >
            {manager && <option value="all">Все исполнители</option>}
            <option value="me">Мои задачи</option>
            {manager && people.filter((u) => u.id !== current.id).map((u) => (
              <option key={u.id} value={u.id}>{u.name}</option>
            ))}
          </select>
          <select
            className="pill bg-white border border-black/10 px-3 py-2 text-sm"
            value={zone}
            onChange={(e) => {
              setZone(e.target.value);
              remember({ zone: e.target.value });
            }}
          >
            <option value="all">Все проекты</option>
            {zones.map((z) => (
              <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
            ))}
          </select>
        </div>
        <div className="flex-1 rounded-2xl bg-[#f4f4f6] px-3 py-2 text-sm min-w-0">
          {msgEdit && canManagePeople(current) ? (
            <div>
              <div className="flex gap-1 mb-1 flex-wrap">
                {EMOJIS.map((e) => (
                  <button key={e} type="button" className={`text-lg ${msgEmoji === e ? "scale-125" : ""}`} onClick={() => setMsgEmoji(e)}>{e}</button>
                ))}
              </div>
              <textarea className="w-full text-sm min-h-[64px]" maxLength={300} value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 300))} />
              <div className="flex justify-between text-[11px] text-[#9a9aa0] mt-1">
                <span>{msg.length}/300</span>
                <span>
                  <button type="button" className="mr-2" onClick={() => setMsgEdit(false)}>Отмена</button>
                  <button type="button" className="font-semibold text-black" onClick={() => { setBroadcast(msg, msgEmoji); setMsgEdit(false); }}>Сохранить</button>
                </span>
              </div>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span className="text-lg">{broadcast?.emoji || "💪"}</span>
              <p className="flex-1">{broadcast?.text || "Сегодня хороший день, чтобы закрыть одну задачу."}</p>
              {canManagePeople(current) && (
                <button type="button" className="text-[11px] underline shrink-0" onClick={() => { setMsg(broadcast?.text || ""); setMsgEmoji(broadcast?.emoji || "💪"); setMsgEdit(true); }}>Изменить</button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Цифры */}
      <section className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-7 gap-2">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-2xl px-3 py-2 border border-black/5"
            style={{ background: k.tone === "dark" ? "#111" : k.tone === "red" ? "#fee2e2" : "#fff", color: k.tone === "dark" ? "#fff" : k.tone === "red" ? "#991b1b" : undefined }}
          >
            <div className="text-[10px] opacity-70">{k.label}</div>
            <div className="font-semibold text-lg leading-tight">{k.value}</div>
          </div>
        ))}
      </section>

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr] min-w-0">
        {/* Сегодня */}
        <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-semibold">{picked === today ? "Сегодня" : formatDate(picked)}</h3>
            <span className="text-xs text-[#9a9aa0]">{overdue.length + dueToday.length + inWork.length + toStart.length} задач</span>
          </div>
          <Group title="🔥 Просрочено" list={overdue} tail={(t) => `до ${shortDate(t.due)}`} red open={setPreviewId} users={users} />
          <Group title="📌 Сдать сегодня" list={dueToday} tail={() => "сегодня"} open={setPreviewId} users={users} />
          <Group title="▶️ В работе" list={inWork} tail={(t) => `до ${shortDate(t.due)}`} open={setPreviewId} users={users} />
          <Group title="⏭ Пора начать" list={toStart} tail={(t) => `до ${shortDate(t.due)}`} open={setPreviewId} users={users} />
          {!overdue.length && !dueToday.length && !inWork.length && !toStart.length && (
            <p className="text-sm text-[#9a9aa0] py-4">На этот день открытых задач нет</p>
          )}
        </section>

        {/* Важное */}
        <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
          <h3 className="font-semibold mb-2">Важное</h3>
          <Group title="🎯 Critical path · 7 дней" list={critical} tail={(t) => `до ${shortDate(t.due)}`} open={setPreviewId} users={users} limit={6} />
          <Group title="⛔ Заблокировано" list={blocked} tail={(t) => t.blockReason || "без причины"} red open={setPreviewId} users={users} limit={5} />
          <Group title="🟣 Ждут проверки" list={toReview} tail={(t) => users.find((u) => u.id === t.assigneeId)?.name ?? ""} open={setPreviewId} users={users} limit={5} />
          <Group title="✅ Можно начинать — зависимости закрыты" list={ready} tail={(t) => `с ${shortDate(t.startDate || t.due)}`} open={setPreviewId} users={users} limit={5} />
          {!critical.length && !blocked.length && !toReview.length && !ready.length && (
            <p className="text-sm text-[#9a9aa0] py-4">Ничего срочного</p>
          )}
        </section>
      </div>

      <RisksAndMoney
        risks={topRisks(risks.filter((r) => zone === "all" || r.zone === zone))}
        users={users}
        finance={canSeeFinance(current) ? { budget, expenses, fx: fx ?? DEFAULT_FX, zone, today } : null}
      />

      <div className="grid gap-4 xl:grid-cols-[1.3fr_1fr] min-w-0">
        <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Что изменилось</h3>
            <div className="flex rounded-full bg-[#f4f4f6] p-0.5 text-xs">
              {[
                [1, "24 ч"],
                [7, "7 дней"],
              ].map(([d, l]) => (
                <button key={d} type="button" onClick={() => { setChangesDays(Number(d)); setNow(Date.now()); }} className={`rounded-full px-3 py-1 ${changesDays === d ? "bg-black text-white" : "text-[#6b6b70]"}`}>
                  {l}
                </button>
              ))}
            </div>
          </div>
          <Changes list={changes} users={users} open={setPreviewId} />
        </section>
        {manager && (
          <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
            <div className="flex items-baseline justify-between mb-2">
              <h3 className="font-semibold">Проверить данные</h3>
              <span className="text-xs text-[#9a9aa0]">{issues.length} задач</span>
            </div>
            {issues.length === 0 ? (
              <p className="text-sm text-[#9a9aa0] py-4">Все открытые задачи заполнены</p>
            ) : (
              <IssueList issues={issues} open={setPreviewId} />
            )}
          </section>
        )}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1fr_1.3fr] min-w-0">
        {/* Загрузка команды */}
        {manager && load.length > 0 && (
          <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
            <div className="flex items-baseline justify-between mb-3">
              <h3 className="font-semibold">Загрузка на неделе</h3>
              <Link href="/week" className="text-xs underline text-[#6b6b70]">{shortDate(ws)}–{shortDate(we)} →</Link>
            </div>
            <div className="space-y-2.5">
              {load.map(({ u, week, late, blocked: b, open: o }) => (
                <div key={u.id} className="text-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-6 w-6 rounded-full bg-[#f4f4f6] grid place-items-center text-[10px] font-semibold">{u.avatar}</span>
                    <span className="flex-1">{u.name}</span>
                    <span className="text-xs text-[#6b6b70]">{week} на неделе · {o} открыто</span>
                    {late > 0 && <span className="pill bg-[#fee2e2] text-[#991b1b] text-[10px] px-2 py-0.5">🔥 {late}</span>}
                    {b > 0 && <span className="pill bg-[#fee2e2] text-[#991b1b] text-[10px] px-2 py-0.5">⛔ {b}</span>}
                  </div>
                  <div className="h-1.5 rounded-full bg-[#f4f4f6] mt-1 ml-8 overflow-hidden">
                    <div className="h-full rounded-full bg-black" style={{ width: `${(week / maxWeek) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Проекты */}
        <section className={`grid gap-3 sm:grid-cols-2 ${manager && load.length > 0 ? "" : "xl:col-span-2 xl:grid-cols-5"}`}>
          {projectList.map((z) => {
            const list = zoneTasks(z.slug, assigneeId ? scoped : byZone);
            const late = list.filter((t) => t.status !== "done" && t.due < picked).length;
            const streams = streamProgress(list).filter((s) => s.total > 0);
            return (
              <Link key={z.slug} href={`/zones/${z.slug}`} className="rounded-2xl p-4 flex flex-col gap-2" style={{ background: z.color }}>
                <div className="flex items-start justify-between gap-2">
                  <span className="text-sm font-semibold">{z.emoji} {z.name}</span>
                  {z.slug !== "common" && z.deadline && (
                    <span className="text-[11px] opacity-70 text-right">{formatDate(z.deadline)}<br />{Math.max(0, diffDays(picked, z.deadline))} дн</span>
                  )}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold leading-none">{weightedDone(list)}%</span>
                  <span className="text-[11px] opacity-70 pb-0.5">
                    {list.filter((t) => t.status === "done").length}/{list.length}
                    {late > 0 && <span className="text-[#991b1b] font-semibold"> · 🔥{late}</span>}
                  </span>
                </div>
                <div className="grid grid-cols-7 gap-0.5" title="7 потоков">
                  {streams.map((s) => (
                    <div key={s.stream} className="h-1.5 rounded-full bg-white/60 overflow-hidden" title={`${s.stream}: ${s.pct}%`}>
                      <div className="h-full bg-black/70" style={{ width: `${s.pct}%` }} />
                    </div>
                  ))}
                </div>
              </Link>
            );
          })}
        </section>
      </div>

      <Roadmap tasks={scoped} zones={zones} today={today} onOpen={setPreviewId} />
    </div>
  );
}

function Group({
  title,
  list,
  tail,
  open,
  users,
  red,
  limit = 12,
}: {
  title: string;
  list: Task[];
  tail: (t: Task) => string;
  open: (id: string) => void;
  users: { id: string; avatar: string; name: string }[];
  red?: boolean;
  limit?: number;
}) {
  const { current, updateTask } = useStore();
  const [all, setAll] = useState(false);
  const canWork = (t: Task) => Boolean(current && canWorkTask(current, t));
  // Выход из блока через меню — как «Снять блок» в карточке: причина и срок очищаются.
  const setStatus = (t: Task, status: Task["status"]) =>
    updateTask(t.id, t.status === "blocked" ? { status, blockReason: "", blockUntil: "" } : { status });
  if (!list.length) return null;
  const shown = all ? list : list.slice(0, limit);
  return (
    <div className="mb-3">
      <div className="text-xs text-[#6b6b70] mb-1">{title} · {list.length}</div>
      <div className="space-y-1">
        {shown.map((t) => {
          const a = users.find((u) => u.id === t.assigneeId);
          return (
            <div
              key={t.id}
              className="w-full rounded-xl pl-1.5 pr-3 py-1 text-sm flex items-center gap-1.5"
              style={{ background: red ? "#fee2e2" : "#f4f4f6" }}
            >
              <StatusPicker
                status={t.status}
                disabled={!canWork(t)}
                onPick={(st) => {
                  const r = setStatus(t, st);
                  if (!r.ok) {
                    alert(r.error);
                    if (r.error.includes("готово когда")) open(t.id);
                  }
                }}
                onBlock={() => open(t.id)}
              />
              <button type="button" onClick={() => open(t.id)} className="flex-1 min-w-0 text-left flex items-center gap-2">
                {red && <Flame size={13} className="text-[#e86a4a] shrink-0" />}
                <span className="hidden sm:inline text-[11px] text-[#9a9aa0] w-14 shrink-0">{t.code}</span>
                <span className="flex-1 min-w-0 truncate">
                  {t.title}
                  {t.criticalPath && <span className="text-[#b91c1c] text-[10px]"> ●</span>}
                </span>
                <span className="text-[11px] text-[#6b6b70] shrink-0 max-w-[35%] truncate">{tail(t)}</span>
                <span className="h-5 w-5 rounded-full bg-white grid place-items-center text-[9px] font-semibold shrink-0" title={a?.name}>{a?.avatar}</span>
              </button>
            </div>
          );
        })}
      </div>
      {list.length > limit && (
        <button type="button" className="text-[11px] underline text-[#6b6b70] mt-1" onClick={() => setAll(!all)}>
          {all ? "свернуть" : `ещё ${list.length - limit}`}
        </button>
      )}
    </div>
  );
}

function when(iso: string) {
  const d = new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Yerevan", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  return d.replace(",", "");
}

function Changes({ list, users, open }: { list: Activity[]; users: { id: string; name: string; avatar: string }[]; open: (id: string) => void }) {
  const [all, setAll] = useState(false);
  if (!list.length) return <p className="text-sm text-[#9a9aa0] py-4">Изменений нет</p>;
  const shown = all ? list : list.slice(0, 12);
  return (
    <div className="space-y-1">
      {shown.map((a) => {
        const u = users.find((x) => x.id === a.userId);
        return (
          <button
            key={a.id}
            type="button"
            disabled={a.kind === "deleted"}
            onClick={() => open(a.taskId)}
            className="w-full text-left rounded-xl bg-[#f4f4f6] px-3 py-1.5 text-sm flex items-start gap-2 disabled:cursor-default"
          >
            <span className="h-5 w-5 rounded-full bg-white grid place-items-center text-[9px] font-semibold shrink-0 mt-0.5" title={u?.name}>{u?.avatar ?? "?"}</span>
            <span className="flex-1 min-w-0">
              <span className="font-medium">{a.taskTitle}</span>
              <span className={`block text-xs ${a.criticalPath && a.kind === "dates" && (a.days ?? 0) > 0 ? "text-[#b91c1c]" : "text-[#6b6b70]"}`}>{a.text}</span>
            </span>
            <span className="text-[10px] text-[#9a9aa0] shrink-0 mt-0.5">{when(a.at)}</span>
          </button>
        );
      })}
      {list.length > 12 && (
        <button type="button" className="text-[11px] underline text-[#6b6b70]" onClick={() => setAll(!all)}>
          {all ? "свернуть" : `ещё ${list.length - 12}`}
        </button>
      )}
    </div>
  );
}

function IssueList({ issues, open }: { issues: { task: Task; problems: string[] }[]; open: (id: string) => void }) {
  const [all, setAll] = useState(false);
  const shown = all ? issues : issues.slice(0, 8);
  return (
    <div className="space-y-1">
      {shown.map(({ task, problems }) => (
        <button key={task.id} type="button" onClick={() => open(task.id)} className="w-full text-left rounded-xl bg-[#fff7ed] px-3 py-1.5 text-sm">
          <span className="text-[11px] text-[#9a9aa0] mr-1">{task.code}</span>
          {task.title}
          <span className="block text-xs text-[#9a3412]">{problems.join(" · ")}</span>
        </button>
      ))}
      {issues.length > 8 && (
        <button type="button" className="text-[11px] underline text-[#6b6b70]" onClick={() => setAll(!all)}>
          {all ? "свернуть" : `ещё ${issues.length - 8}`}
        </button>
      )}
    </div>
  );
}

function RisksAndMoney({
  risks,
  users,
  finance,
}: {
  risks: import("@/lib/types").Risk[];
  users: { id: string; name: string }[];
  finance: { budget: import("@/lib/types").BudgetLine[]; expenses: import("@/lib/types").Expense[]; fx: import("@/lib/types").FxRates; zone: string; today: string } | null;
}) {
  const inZone = (x: { zone: string }) => !finance || finance.zone === "all" || x.zone === finance.zone;
  const sum = finance ? totals(finance.budget, finance.expenses, "AMD", finance.fx, inZone) : null;
  const due = finance ? upcomingPayments(finance.expenses.filter(inZone), finance.today, 7) : [];
  return (
    <div className={`grid gap-4 min-w-0 ${finance ? "xl:grid-cols-[1.3fr_1fr]" : ""}`}>
      <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-semibold">Главные риски</h3>
          <Link href="/risks" className="text-xs underline text-[#6b6b70]">все риски →</Link>
        </div>
        {risks.length === 0 ? (
          <p className="text-sm text-[#9a9aa0] py-2">Открытых рисков нет — или их ещё не записали.</p>
        ) : (
          <div className="space-y-2">
            {risks.map((r) => (
              <Link key={r.id} href="/risks" className="flex items-start gap-2 text-sm">
                <span className="w-7 h-7 rounded-lg grid place-items-center text-xs font-semibold shrink-0" style={{ background: scoreColor(riskScore(r)) }}>{riskScore(r)}</span>
                <span className="flex-1 min-w-0">
                  <span className="font-medium">{r.title}</span>
                  <span className="block text-xs text-[#757575] truncate">
                    {users.find((u) => u.id === r.ownerId)?.name ?? "—"}
                    {r.decideBy ? ` · решить до ${shortDate(r.decideBy)}` : ""}
                    {r.planB ? ` · план Б: ${r.planB}` : ""}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>
      {finance && sum && (
        <section className="bg-white rounded-2xl p-4 border border-black/5 min-w-0">
          <div className="flex items-baseline justify-between mb-2">
            <h3 className="font-semibold">Деньги</h3>
            <Link href="/money" className="text-xs underline text-[#6b6b70]">подробно →</Link>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div><div className="text-[10px] text-[#757575]">План</div><div className="font-semibold">{money(sum.plan, "AMD")}</div></div>
            <div><div className="text-[10px] text-[#757575]">Оплачено + ждёт</div><div className="font-semibold">{money(sum.paid + sum.committed, "AMD")}</div></div>
            <div><div className="text-[10px] text-[#757575]">Остаток</div><div className={`font-semibold ${sum.left < 0 ? "text-red-500" : ""}`}>{money(sum.left, "AMD")}</div></div>
          </div>
          {due.length > 0 && (
            <div className="mt-3 space-y-1 text-sm">
              <div className="text-xs text-[#757575]">Оплатить за 7 дней</div>
              {due.slice(0, 4).map((x) => (
                <div key={x.id} className="flex gap-2">
                  <span className={`w-12 ${x.date < finance.today ? "text-red-500" : "text-[#757575]"}`}>{shortDate(x.date)}</span>
                  <span className="flex-1 truncate">{x.title}</span>
                  <span className="font-medium">{money(x.amount, x.currency)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
