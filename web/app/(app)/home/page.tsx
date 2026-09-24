"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays, CheckCircle2, Eye, TriangleAlert, Pencil } from "lucide-react";
import { useStore } from "@/lib/store";
import { canManagePeople, isCpo, statusMeta } from "@/lib/access";
import { TaskRow } from "@/components/TaskRow";
import { HOME_VIEWS, homeLists, scopeTasks, type HomeView } from "@/lib/homeLists";
import { streamProgress, weightedDone, zoneTasks } from "@/lib/readiness";
import { addDays, diffDays, formatDate, shortDate, todayYerevan, weekStart } from "@/lib/dates";
import { EMOJIS } from "@/lib/emoji";
import type { Activity, Task } from "@/lib/types";
import { dataIssues } from "@/lib/quality";
import { canSeeFinance, DEFAULT_FX, money, totals } from "@/lib/finance";
import { riskScore, topRisks } from "@/lib/risks";
import { Legend, Meter, OTHER, RED, Ring, SERIES, Spark, StackedWeeks } from "@/components/Charts";
import { Section } from "@/components/PageHeader";

const FILTER_KEY = "crmx-home-filters";
const TASK_TABS: HomeView[] = ["overdue", "today", "work", "start", "critical", "blocked", "review", "ready"];
const RISK_FILL = ["var(--soft)", "#fbd9c9", "#f5a882", "#e4703f"];

/** Главная: цифры и графики сверху, задачи ниже. Минимализм: белые карточки, один акцент для данных. */
export default function HomePage() {
  const { current, tasks, zones, users, setPreviewId, broadcast, setBroadcast, activity, risks = [], budget = [], expenses = [], fx } = useStore();
  const [changesDays, setChangesDays] = useState(1);
  // «Сейчас» для окон «24 ч / 7 дней»: обновляется раз в минуту и при переключении.
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
  const [tab, setTab] = useState<HomeView | null>(null);
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
  const { seen, byZone, scoped, manager, whoValue, assigneeId } = scopeTasks(tasks, current, users, who, zone);
  const people = users.filter((u) => seen.some((t) => t.assigneeId === u.id));
  const L = homeLists(scoped, tasks, picked, { id: current.id, owner });
  const more = (view: HomeView) => `/tasks?${new URLSearchParams({ view, who: whoValue, zone, date: picked })}`;
  const activeTab = tab && L[tab].length ? tab : TASK_TABS.find((v) => L[v].length) ?? "today";
  const scopedIds = new Set(scoped.map((t) => t.id));
  const dayOf = (iso: string) => todayYerevan(new Date(iso));

  // Запуски
  const launches = zones
    .filter((z) => z.slug !== "common" && z.deadline >= picked && (zone === "all" || z.slug === zone))
    .sort((a, b) => a.deadline.localeCompare(b.deadline));
  const hero = launches[0];
  const heroTasks = hero ? zoneTasks(hero.slug, assigneeId ? scoped : byZone) : scoped;
  const heroStreams = streamProgress(heroTasks).filter((s) => s.total > 0);

  // Нагрузка по неделям: 8 недель вперёд, три самых загруженных проекта цветом, остальное — «Прочие».
  const w0 = weekStart(picked);
  const weekStarts = Array.from({ length: 8 }, (_, i) => addDays(w0, i * 7));
  const wEnd = addDays(w0, 8 * 7);
  const inWindow = scoped.filter((t) => t.due >= w0 && t.due < wEnd);
  const zoneCount = new Map<string, number>();
  for (const t of inWindow) zoneCount.set(t.zone, (zoneCount.get(t.zone) ?? 0) + 1);
  const topZones = [...zoneCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([z]) => z);
  const hasOther = [...zoneCount.keys()].some((z) => !topZones.includes(z));
  const series = [
    ...topZones.map((z, i) => ({ name: zones.find((x) => x.slug === z)?.name ?? z, color: SERIES[i] })),
    ...(hasOther ? [{ name: "Прочие", color: OTHER }] : []),
  ];
  const weeks = weekStarts.map((ws) => {
    const list = inWindow.filter((t) => t.due >= ws && t.due < addDays(ws, 7));
    const values = topZones.map((z) => list.filter((t) => t.zone === z).length);
    if (hasOther) values.push(list.filter((t) => !topZones.includes(t.zone)).length);
    return { label: shortDate(ws), title: `Неделя с ${shortDate(ws)}`, values };
  });
  const markers = zones
    .filter((z) => z.slug !== "common" && z.deadline >= w0 && z.deadline < wEnd && (zone === "all" || z.slug === zone))
    .map((z) => {
      const d = diffDays(w0, z.deadline);
      return { index: Math.floor(d / 7), frac: ((d % 7) + 0.5) / 7, label: `${z.name} ${shortDate(z.deadline)}` };
    });

  // Цифры с мини-графиками
  const last7 = Array.from({ length: 7 }, (_, i) => addDays(picked, i - 6));
  const doneLabel = statusMeta.done.label;
  const closedByDay = last7.map(
    (d) => (activity ?? []).filter((a) => a.kind === "status" && a.text.includes(doneLabel) && scopedIds.has(a.taskId) && dayOf(a.at) === d).length,
  );
  const closed7 = closedByDay.reduce((a, b) => a + b, 0);
  const lateByDay = last7.map((d) => scoped.filter((t) => t.status !== "done" && t.due < d).length);
  const lateCp = L.overdue.filter((t) => t.criticalPath).length;
  const reviewSince = L.review
    .map((t) => (activity ?? []).find((a) => a.taskId === t.id && a.kind === "status" && a.text.includes(statusMeta.review.label))?.at)
    .filter(Boolean) as string[];
  const oldestReview = reviewSince.length ? Math.max(...reviewSince.map((at) => diffDays(dayOf(at), picked))) : null;
  const second = launches[1];

  // Команда
  const ws = weekStart(picked);
  const we = addDays(ws, 6);
  const load = people
    .filter((u) => !assigneeId || u.id === assigneeId)
    .map((u) => {
      const mine = byZone.filter((t) => t.assigneeId === u.id && t.status !== "done");
      return { u, week: mine.filter((t) => (t.startDate || t.due) <= we && t.due >= ws).length, late: mine.filter((t) => t.due < picked).length, open: mine.length };
    })
    .sort((a, b) => b.week - a.week || b.open - a.open);
  const maxWeek = Math.max(1, ...load.map((l) => l.week));
  const openTotal = load.reduce((s, l) => s + l.open, 0);
  const busiest = load.slice().sort((a, b) => b.open - a.open)[0];
  const busiestShare = busiest && openTotal ? Math.round((busiest.open / openTotal) * 100) : 0;

  // Деньги и риски
  const finance = canSeeFinance(current);
  const inZone = (x: { zone: string }) => zone === "all" || x.zone === zone;
  const rates = fx ?? DEFAULT_FX;
  const sum = totals(budget, expenses, "AMD", rates, inZone);
  const cats = [...new Set(budget.filter(inZone).map((b) => b.category))]
    .map((c) => ({ c, ...totals(budget, expenses, "AMD", rates, (x) => inZone(x) && x.category === c) }))
    .sort((a, b) => b.plan - a.plan)
    .slice(0, 5);
  const maxPlan = Math.max(1, ...cats.map((c) => c.plan));
  const openRisks = risks.filter((r) => r.status !== "closed" && (zone === "all" || r.zone === zone));
  const topRisk = topRisks(openRisks, 1)[0];

  // Журнал и качество данных
  const sinceIso = new Date(now - changesDays * 86400000).toISOString();
  const changes = (activity ?? []).filter(
    (a) => a.at >= sinceIso && (scopedIds.has(a.taskId) || (owner && a.kind === "deleted" && !assigneeId && zone === "all")),
  );
  const issues = manager ? dataIssues(scoped, tasks, users) : [];

  const projectList = (zone === "all" ? zones : zones.filter((z) => z.slug === zone)).filter(
    (z) => !assigneeId || zoneTasks(z.slug, scoped).length > 0,
  );
  const hour = new Date(now).getHours();
  const hello = hour < 12 ? "Доброе утро" : hour < 18 ? "Добрый день" : "Добрый вечер";
  const sel = "pill !bg-[var(--card)] border border-[var(--line)] !px-3 !py-2 !text-sm min-w-0";

  return (
    <div className="space-y-4 md:space-y-5">
      {/* Приветствие и фильтры */}
      <header className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-3">
        <div className="flex flex-col gap-1 min-w-0">
          <span className="cap">{formatDate(picked)}</span>
          <h1 className="page-title m-0">{hello}, {current.name}</h1>
        </div>
        <div className="grid grid-cols-3 sm:flex sm:flex-wrap items-center gap-2">
          <select
            className={sel}
            aria-label="Проект"
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
          <select
            className={sel}
            aria-label="Исполнитель"
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
          <input type="date" aria-label="День" className={sel} value={picked} onChange={(e) => e.target.value && setPicked(e.target.value)} />
        </div>
      </header>

      {/* Сообщение команде */}
      {(broadcast?.text || canManagePeople(current)) && (
        <div className="flex items-start gap-3 px-1 text-sm text-[var(--ink-2)]">
          {msgEdit && canManagePeople(current) ? (
            <div className="card p-3 w-full">
              <div className="flex gap-1 mb-2 flex-wrap">
                {EMOJIS.map((e) => (
                  <button key={e} type="button" aria-label={`Эмодзи ${e}`} className={`text-lg ${msgEmoji === e ? "scale-125" : ""}`} onClick={() => setMsgEmoji(e)}>{e}</button>
                ))}
              </div>
              <textarea className="w-full text-sm min-h-[64px]" maxLength={300} value={msg} onChange={(e) => setMsg(e.target.value.slice(0, 300))} aria-label="Сообщение команде" />
              <div className="flex justify-between cap mt-1">
                <span>{msg.length}/300</span>
                <span>
                  <button type="button" className="mr-3" onClick={() => setMsgEdit(false)}>Отмена</button>
                  <button type="button" className="font-semibold text-[var(--ink)]" onClick={() => { setBroadcast(msg, msgEmoji); setMsgEdit(false); }}>Сохранить</button>
                </span>
              </div>
            </div>
          ) : (
            <>
              <span aria-hidden="true">{broadcast?.emoji || "💬"}</span>
              <p className="flex-1 m-0">{broadcast?.text || "Сообщение для команды"}</p>
              {canManagePeople(current) && (
                <button type="button" aria-label="Изменить сообщение" className="text-[var(--muted)] p-1" onClick={() => { setMsg(broadcast?.text || ""); setMsgEmoji(broadcast?.emoji || "💪"); setMsgEdit(true); }}>
                  <Pencil size={14} />
                </button>
              )}
            </>
          )}
        </div>
      )}

      {/* Главный запуск + нагрузка по неделям */}
      <div className="grid gap-4 md:gap-5 xl:grid-cols-[5fr_7fr] min-w-0">
        <Section
          eyebrow={hero ? "Ближайший запуск" : "Готовность"}
          title={hero ? `${hero.emoji} ${hero.name} · ${formatDate(hero.deadline)}` : "Все проекты"}
          action={hero && <Link href={`/zones/${hero.slug}`} className="cap inline-flex items-center gap-1 hover:text-[var(--ink)]">Проект <ArrowRight size={14} /></Link>}
        >
          <div className="flex items-center gap-5 md:gap-7 mb-5">
            <Ring pct={weightedDone(heroTasks)} size={116} stroke={11} />
            <div className="flex flex-col gap-1 min-w-0">
              {hero ? (
                <>
                  <span className="num text-[52px] md:text-[64px] leading-none font-semibold tracking-[-0.04em]">{diffDays(picked, hero.deadline)}</span>
                  <span className="cap">дней до открытия · {heroTasks.length} задач · {heroTasks.filter((t) => t.status === "done").length} готово</span>
                </>
              ) : (
                <span className="cap">{scoped.length} задач в фильтре</span>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2.5">
            {heroStreams.map((s) => (
              <div key={s.stream} className="grid grid-cols-[88px_minmax(0,1fr)_36px] md:grid-cols-[110px_minmax(0,1fr)_40px] items-center gap-3">
                <span className="cap !text-[var(--ink-2)] font-medium truncate" title={s.label}>{s.stream === "EQUIPMENT & SUPPLY" ? "EQUIPMENT" : s.stream}</span>
                <Meter pct={s.pct} />
                <span className="cap num text-right !text-[var(--ink)]">{s.pct}%</span>
              </div>
            ))}
          </div>
        </Section>
        <Section eyebrow="Нагрузка до запусков" title="Задачи со сроком по неделям" action={<Legend items={series} />}>
          {inWindow.length ? (
            <StackedWeeks weeks={weeks} series={series} markers={markers} height={250} />
          ) : (
            <p className="cap py-10 text-center">На ближайшие 8 недель задач со сроком нет</p>
          )}
        </Section>
      </div>

      {/* Четыре цифры */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-5">
        {second ? (
          <Kpi icon={<CalendarDays size={15} />} label={second.name} value={String(diffDays(picked, second.deadline))} sub={`дней до ${shortDate(second.deadline)}`}>
            <div className="w-16 md:w-24"><Meter pct={weightedDone(zoneTasks(second.slug, byZone))} color={SERIES[1]} /></div>
          </Kpi>
        ) : (
          <Kpi icon={<CalendarDays size={15} />} label="Critical path" value={`${weightedDone(scoped.filter((t) => t.criticalPath))}%`} sub="готовность">
            <div className="w-16 md:w-24"><Meter pct={weightedDone(scoped.filter((t) => t.criticalPath))} /></div>
          </Kpi>
        )}
        <Kpi icon={<CheckCircle2 size={15} />} label="Закрыто за 7 дней" value={String(closed7)} sub={closedByDay[6] ? `сегодня ${closedByDay[6]}` : "по журналу"}>
          <Spark values={closedByDay} labels={last7.map(shortDate)} bars width={96} height={36} />
        </Kpi>
        <Kpi icon={<TriangleAlert size={15} color={L.overdue.length ? RED : undefined} />} label="Просрочено" value={String(L.overdue.length)} sub={lateCp ? `${lateCp} на critical path` : "critical path в порядке"} tone={L.overdue.length ? "bad" : undefined} href={more("overdue")}>
          <Spark values={lateByDay} width={96} height={36} color={L.overdue.length ? RED : SERIES[0]} />
        </Kpi>
        <Kpi icon={<Eye size={15} />} label="Ждут проверки" value={String(L.review.length)} sub={oldestReview !== null ? `старейшая — ${oldestReview} дн` : "очередь пуста"} href={more("review")} />
      </div>

      {/* Деньги · риски · команда */}
      <div className={`grid gap-4 md:gap-5 min-w-0 ${finance ? "xl:grid-cols-[5fr_3fr_4fr]" : "xl:grid-cols-2"}`}>
        {finance && (
          <Section
            eyebrow={zone === "all" ? "Бюджет · все проекты" : `Бюджет · ${zones.find((z) => z.slug === zone)?.name ?? zone}`}
            title={budget.some(inZone) ? <span className="num">{money(sum.left, "AMD")} <span className="cap font-normal">осталось из {money(sum.plan, "AMD")}</span></span> : "Бюджет не заполнен"}
            action={<Link href="/money" className="cap hover:text-[var(--ink)]">Деньги →</Link>}
          >
            {cats.length ? (
              <div className="flex flex-col gap-3.5">
                <Legend items={[{ name: "Оплачено", color: SERIES[0] }, { name: "Ждёт оплаты", color: "#9dc0ec" }]} />
                {cats.map((c) => (
                  <div key={c.c} className="flex flex-col gap-1.5">
                    <div className="flex justify-between gap-3 text-[13px]">
                      <span className="truncate">{c.c}</span>
                      <span className={`cap num shrink-0 ${c.left < 0 ? "!text-[var(--red)]" : ""}`}>{money(c.paid + c.committed, "AMD")} / {money(c.plan, "AMD")}</span>
                    </div>
                    <div className="h-2.5 rounded-full bg-[#efede8] flex gap-[2px] overflow-hidden" style={{ width: `${Math.max(8, (c.plan / maxPlan) * 100)}%` }}>
                      <div style={{ width: `${Math.min(100, (c.paid / (c.plan || 1)) * 100)}%`, background: SERIES[0] }} />
                      <div style={{ width: `${Math.min(100, (c.committed / (c.plan || 1)) * 100)}%`, background: "#9dc0ec" }} />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <Link href="/money" className="cap underline">Добавить строки бюджета →</Link>
            )}
          </Section>
        )}
        <Section eyebrow="Риски" title={`${openRisks.length} открыт${openRisks.length === 1 ? "" : "ых"}`} action={<Link href="/risks" className="cap hover:text-[var(--ink)]">Все →</Link>}>
          <div className="grid grid-cols-[56px_repeat(3,minmax(0,1fr))] gap-1 items-center">
            {[3, 2, 1].map((p) => (
              <RiskRow key={p} p={p} risks={openRisks} />
            ))}
            <span />
            {["низкое", "среднее", "высокое"].map((t) => (
              <span key={t} className="cap text-center !text-[11px]">{t}</span>
            ))}
          </div>
          <p className="cap text-center mt-1 mb-0">влияние → · вероятность ↑</p>
          {topRisk && (
            <Link href="/risks" className="flex items-center gap-3 mt-4 pt-3 border-t border-[var(--line)]">
              <span className="h-8 w-8 rounded-lg grid place-items-center text-[13px] font-semibold shrink-0" style={{ background: riskScore(topRisk) >= 6 ? "#e4703f" : "#f5a882", color: riskScore(topRisk) >= 6 ? "#fff" : "var(--ink)" }}>
                {riskScore(topRisk)}
              </span>
              <span className="min-w-0">
                <span className="block text-[13px] font-medium truncate">{topRisk.title}</span>
                <span className="cap">{topRisk.decideBy ? `решить до ${shortDate(topRisk.decideBy)} · ` : ""}{users.find((u) => u.id === topRisk.ownerId)?.name ?? "—"}</span>
              </span>
            </Link>
          )}
        </Section>
        <Section eyebrow="Команда" title="Загрузка на неделе" action={<Link href="/week" className="cap hover:text-[var(--ink)]">{shortDate(ws)}–{shortDate(we)} →</Link>}>
          <div className="flex flex-col gap-4">
            {load.map(({ u, week, late, open }) => (
              <div key={u.id} className="flex items-center gap-3">
                <span className="h-7 w-7 rounded-full bg-[var(--soft)] grid place-items-center text-xs font-semibold shrink-0">{u.avatar}</span>
                <div className="flex-1 min-w-0 flex flex-col gap-1.5">
                  <div className="flex justify-between gap-2 text-[13px]">
                    <span className="truncate">{u.name}</span>
                    <span className="cap num shrink-0">{week} на неделе · {open} открыто{late ? <span className="!text-[var(--red)]"> · {late} просроч.</span> : null}</span>
                  </div>
                  <Meter pct={(week / maxWeek) * 100} color="var(--ink)" />
                </div>
              </div>
            ))}
            {load.length === 0 && <p className="cap m-0">Нет задач в фильтре</p>}
          </div>
          {manager && busiest && load.length > 1 && busiestShare >= 60 && (
            <div className="mt-4 rounded-xl bg-[var(--soft)] px-3.5 py-3 text-[13px] text-[var(--ink-2)] flex gap-2 items-start">
              <TriangleAlert size={15} className="shrink-0 mt-0.5" />
              У {busiest.u.name} {busiestShare}% открытых задач — стоит делегировать
            </div>
          )}
        </Section>
      </div>

      {/* Задачи + проекты */}
      <div className="grid gap-4 md:gap-5 xl:grid-cols-[7fr_5fr] min-w-0">
        <section className="card px-4 md:px-6 pt-4 pb-2 min-w-0">
          <div className="flex items-center gap-2 pb-3 overflow-x-auto -mx-1 px-1">
            {TASK_TABS.filter((v) => L[v].length || v === activeTab).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setTab(v)}
                className={`pill shrink-0 h-8 px-3 text-[13px] border ${v === activeTab ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-[var(--card)] border-[var(--line)] text-[var(--ink-2)]"}`}
              >
                {HOME_VIEWS[v].replace(/^\S+\s/, "")} · {L[v].length}
              </button>
            ))}
          </div>
          {L[activeTab].length ? (
            <TaskRows list={L[activeTab]} red={activeTab === "overdue" || activeTab === "blocked"} open={setPreviewId} users={users} zones={zones} />
          ) : (
            <p className="cap py-8 text-center m-0">Задач нет</p>
          )}
          {L[activeTab].length > 5 && (
            <Link href={more(activeTab)} className="flex items-center justify-center gap-1 h-11 border-t border-[var(--line)] cap hover:text-[var(--ink)]">
              Все {L[activeTab].length} <ArrowRight size={14} />
            </Link>
          )}
        </section>
        <section className="grid grid-cols-2 gap-3 md:gap-4 content-start">
          {projectList.map((z) => {
            const list = zoneTasks(z.slug, assigneeId ? scoped : byZone);
            const pct = weightedDone(list);
            const late = list.filter((t) => t.status !== "done" && t.due < picked).length;
            return (
              <Link key={z.slug} href={`/zones/${z.slug}`} className="card p-4 md:p-5 flex flex-col gap-2.5 min-w-0 hover:border-[#d9d6ce]">
                <span className="flex items-center gap-2 min-w-0">
                  <span className="h-2.5 w-2.5 rounded-[3px] shrink-0" style={{ background: z.color }} />
                  <span className="text-sm font-semibold truncate">{z.name}</span>
                </span>
                <span className="flex items-baseline justify-between gap-2">
                  <span className="num text-[26px] md:text-[28px] font-semibold tracking-[-0.02em] leading-none">{pct}%</span>
                  <span className="cap num">
                    {z.slug !== "common" && z.deadline ? `${Math.max(0, diffDays(picked, z.deadline))} дн` : `${list.length} задач`}
                    {late ? <span className="!text-[var(--red)]"> · {late}</span> : null}
                  </span>
                </span>
                <Meter pct={pct} color="var(--ink)" height={4} />
              </Link>
            );
          })}
        </section>
      </div>

      {/* Журнал и качество данных */}
      <div className="grid gap-4 md:gap-5 xl:grid-cols-2 min-w-0">
        <Section
          eyebrow="Журнал"
          title="Что изменилось"
          action={
            <div className="flex rounded-full bg-[var(--soft)] p-0.5 text-xs">
              {[
                [1, "24 ч"],
                [7, "7 дней"],
              ].map(([d, l]) => (
                <button key={d} type="button" onClick={() => { setChangesDays(Number(d)); setNow(Date.now()); }} className={`rounded-full px-3 py-1 ${changesDays === d ? "bg-[var(--ink)] text-white" : "text-[var(--muted)]"}`}>
                  {l}
                </button>
              ))}
            </div>
          }
        >
          <Changes list={changes} users={users} open={setPreviewId} />
        </Section>
        {manager && (
          <Section eyebrow="Качество" title="Проверить данные" action={<span className="cap num">{issues.length} задач</span>}>
            {issues.length === 0 ? <p className="cap m-0">Все открытые задачи заполнены</p> : <IssueList issues={issues} open={setPreviewId} />}
          </Section>
        )}
      </div>
    </div>
  );
}

function Kpi({
  icon,
  label,
  value,
  sub,
  tone,
  href,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  tone?: "bad";
  href?: string;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      <span className="flex items-center gap-2 text-[var(--muted)]">
        {icon}
        <span className="cap truncate">{label}</span>
      </span>
      <span className="flex items-end justify-between gap-2">
        <span className="flex flex-col gap-0.5 min-w-0">
          <span className={`num text-[28px] md:text-[34px] leading-none font-semibold tracking-[-0.02em] ${tone === "bad" ? "text-[var(--red)]" : ""}`}>{value}</span>
          <span className="cap truncate">{sub}</span>
        </span>
        {children}
      </span>
    </>
  );
  const cls = "card p-4 md:px-5 md:py-5 flex flex-col gap-3 min-w-0";
  return href ? (
    <Link href={href} className={`${cls} hover:border-[#d9d6ce]`}>
      {body}
    </Link>
  ) : (
    <div className={cls}>{body}</div>
  );
}

function RiskRow({ p, risks }: { p: number; risks: import("@/lib/types").Risk[] }) {
  return (
    <>
      <span className="cap text-right pr-1.5 !text-[11px]">{["", "низкая", "средняя", "высокая"][p]}</span>
      {[1, 2, 3].map((i) => {
        const n = risks.filter((r) => r.probability === p && r.impact === i).length;
        const sc = p * i;
        const lvl = n === 0 ? 0 : sc >= 6 ? 3 : sc >= 3 ? 2 : 1;
        return (
          <span
            key={i}
            className="h-9 md:h-10 rounded-[10px] grid place-items-center text-sm font-semibold"
            style={{ background: RISK_FILL[lvl], color: lvl === 3 ? "#fff" : "var(--ink)" }}
            title={`вероятность ${p}, влияние ${i}: ${n}`}
          >
            {n || ""}
          </span>
        );
      })}
    </>
  );
}

function TaskRows({ list, red, open, users, zones }: { list: Task[]; red: boolean; open: (id: string) => void; users: { id: string; avatar: string; name: string }[]; zones: { slug: string; color: string }[] }) {
  return (
    <div>
      {list.slice(0, 5).map((t) => {
        const a = users.find((u) => u.id === t.assigneeId);
        return (
          <TaskRow
            key={t.id}
            task={t}
            onOpen={open}
            late={red}
            zoneColor={zones.find((z) => z.slug === t.zone)?.color}
            meta={t.code || undefined}
            avatar={a ? { letter: a.avatar, name: a.name } : undefined}
          />
        );
      })}
    </div>
  );
}

function when(iso: string) {
  const d = new Intl.DateTimeFormat("ru-RU", { timeZone: "Asia/Yerevan", day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
  return d.replace(",", "");
}

function Changes({ list, users, open }: { list: Activity[]; users: { id: string; name: string; avatar: string }[]; open: (id: string) => void }) {
  const [all, setAll] = useState(false);
  if (!list.length) return <p className="text-sm text-[#6F6E69] py-4">Изменений нет</p>;
  const shown = all ? list : list.slice(0, 12);
  return (
    <div>
      {shown.map((a) => {
        const u = users.find((x) => x.id === a.userId);
        return (
          <button
            key={a.id}
            type="button"
            disabled={a.kind === "deleted"}
            onClick={() => open(a.taskId)}
            className="w-full text-left px-1 py-2.5 text-sm flex items-start gap-3 border-t border-[var(--line)] first:border-t-0 disabled:cursor-default"
          >
            <span className="h-6 w-6 rounded-full bg-[var(--soft)] grid place-items-center text-[10px] font-semibold shrink-0" title={u?.name}>{u?.avatar ?? "?"}</span>
            <span className="flex-1 min-w-0">
              <span className="font-medium">{a.taskTitle}</span>
              <span className={`block text-xs ${a.criticalPath && a.kind === "dates" && (a.days ?? 0) > 0 ? "text-[#b91c1c]" : "text-[#6F6E69]"}`}>{a.text}</span>
            </span>
            <span className="text-[10px] text-[#6F6E69] shrink-0 mt-0.5">{when(a.at)}</span>
          </button>
        );
      })}
      {list.length > 12 && (
        <button type="button" className="text-[11px] underline text-[#6F6E69]" onClick={() => setAll(!all)}>
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
    <div>
      {shown.map(({ task, problems }) => (
        <button key={task.id} type="button" onClick={() => open(task.id)} className="w-full text-left px-1 py-2.5 text-sm border-t border-[var(--line)] first:border-t-0">
          <span className="text-[11px] text-[#6F6E69] mr-1">{task.code}</span>
          {task.title}
          <span className="block text-xs text-[#b45309]">{problems.join(" · ")}</span>
        </button>
      ))}
      {issues.length > 8 && (
        <button type="button" className="text-[11px] underline text-[#6F6E69]" onClick={() => setAll(!all)}>
          {all ? "свернуть" : `ещё ${issues.length - 8}`}
        </button>
      )}
    </div>
  );
}

