"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, isCpo } from "@/lib/access";
import { canDeleteRisk, canEditRisk, LEVELS, riskScore, scoreColor, sortRisks } from "@/lib/risks";
import { shortDate, todayYerevan } from "@/lib/dates";
import { RISK_STATUS, type Risk, type RiskLevel, type RiskStatus } from "@/lib/types";

/** Реестр рисков: что может сорвать запуск, насколько вероятно и больно, кто следит, какой план Б. */
export default function RisksPage() {
  const { current, risks = [], zones, users, tasks, saveRecord, deleteRecord, setPreviewId } = useStore();
  const [zone, setZone] = useState("all");
  const [showClosed, setShowClosed] = useState(false);
  const [edit, setEdit] = useState<string | null>(null);
  const [err, setErr] = useState("");
  if (!current) return null;

  const today = todayYerevan();
  const visibleTasks = tasks.filter((t) => canSeeTask(current, t, users));
  const list = sortRisks(risks.filter((r) => (zone === "all" || r.zone === zone) && (showClosed || r.status !== "closed")));
  const name = (id: string) => users.find((u) => u.id === id)?.name ?? "—";
  const zoneName = (slug: string) => zones.find((z) => z.slug === slug)?.name ?? slug;

  async function onSubmit(e: FormEvent<HTMLFormElement>, prev?: Risk) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const risk: Risk = {
      id: prev?.id ?? `r-${crypto.randomUUID().slice(0, 8)}`,
      title: String(fd.get("title")),
      zone: String(fd.get("zone")),
      probability: Number(fd.get("probability")) as RiskLevel,
      impact: Number(fd.get("impact")) as RiskLevel,
      ownerId: String(fd.get("ownerId")),
      planB: String(fd.get("planB") || ""),
      decideBy: String(fd.get("decideBy") || ""),
      taskIds: fd.getAll("taskIds").map(String).filter(Boolean),
      status: (fd.get("status") as RiskStatus) || "open",
      authorId: prev?.authorId ?? current!.id,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
    };
    const r = await saveRecord("risks", risk);
    setErr(r.ok ? "" : r.error);
    if (!r.ok) return;
    if (prev) setEdit(null);
    else form.reset();
  }

  // Матрица 3×3: сколько открытых рисков в каждой клетке.
  const open = risks.filter((r) => r.status !== "closed" && (zone === "all" || r.zone === zone));

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-end gap-2 pb-1">
        <h1 className="page-title m-0 mr-auto">Риски</h1>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <label className="text-sm flex items-center gap-1">
          <input type="checkbox" checked={showClosed} onChange={(e) => setShowClosed(e.target.checked)} /> закрытые
        </label>
      </div>
      {err && <div className="card p-3 text-sm text-red-500">{err}</div>}

      <div className="card p-4">
        <div className="font-medium mb-2">Карта рисков</div>
        <div className="grid grid-cols-[auto_repeat(3,1fr)] gap-1 text-xs max-w-md">
          <span />
          {[1, 2, 3].map((i) => (
            <span key={i} className="text-center text-[#6F6E69]">влияние: {LEVELS[i as RiskLevel].toLowerCase()}</span>
          ))}
          {[3, 2, 1].map((p) => (
            <Row key={p} p={p as RiskLevel} open={open} />
          ))}
        </div>
      </div>

      <div className="space-y-2">
        {list.map((r) => {
          const score = riskScore(r);
          const late = r.status !== "closed" && r.decideBy && r.decideBy < today;
          return edit === r.id ? (
            <form key={r.id} className="card p-4 grid sm:grid-cols-3 gap-2" onSubmit={(e) => onSubmit(e, r)}>
              <Fields r={r} zones={zones} users={users} tasks={visibleTasks} />
              <div className="flex gap-2 items-center">
                <button className="pill bg-black text-white px-3 py-1 text-sm">Сохранить</button>
                <button type="button" className="text-sm" onClick={() => setEdit(null)}>Отмена</button>
              </div>
            </form>
          ) : (
            <div key={r.id} className="card p-4 flex gap-3">
              <div className="w-10 h-10 rounded-xl grid place-items-center font-semibold shrink-0" style={{ background: scoreColor(score) }} title="вероятность × влияние">
                {score}
              </div>
              <div className="flex-1 min-w-0 text-sm space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-base">{r.title}</span>
                  <span className="pill text-[11px] px-2 py-0.5" style={{ background: RISK_STATUS[r.status].color }}>{RISK_STATUS[r.status].label}</span>
                </div>
                <div className="text-[#6F6E69]">
                  {zoneName(r.zone)} · вероятность {LEVELS[r.probability].toLowerCase()} · влияние {LEVELS[r.impact].toLowerCase()} · следит {name(r.ownerId)}
                  {r.decideBy && <span className={late ? "text-red-500 font-medium" : ""}> · решить до {shortDate(r.decideBy)}</span>}
                </div>
                {r.planB && <div><span className="text-[#6F6E69]">План Б:</span> {r.planB}</div>}
                {r.taskIds.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {r.taskIds.map((id) => {
                      const t = tasks.find((x) => x.id === id);
                      return t ? (
                        <button key={id} type="button" className="pill bg-[#F3F2EE] px-2 py-0.5 text-xs" onClick={() => setPreviewId(id)}>
                          {t.code || "задача"} · {t.title}
                        </button>
                      ) : null;
                    })}
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-1 items-end text-xs">
                {canEditRisk(current, r) && (
                  <button type="button" className="text-[#6F6E69]" onClick={() => setEdit(r.id)}>изменить</button>
                )}
                {canDeleteRisk(current, r) && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={async () => {
                      if (!confirm(`Удалить риск «${r.title}»?`)) return;
                      const res = await deleteRecord("risks", r.id);
                      setErr(res.ok ? "" : res.error);
                    }}
                  >
                    удалить
                  </button>
                )}
              </div>
            </div>
          );
        })}
        {list.length === 0 && <div className="card p-6 text-sm text-[#6F6E69]">Рисков пока нет. Добавьте то, что может сорвать сроки или бюджет.</div>}
      </div>

      <form className="card p-4 grid sm:grid-cols-3 gap-2" onSubmit={(e) => onSubmit(e)}>
        <div className="sm:col-span-3 font-medium">Новый риск</div>
        <Fields zones={zones} users={users} tasks={visibleTasks} zone={zone} me={current.id} />
        <button className="pill bg-black text-white px-4 py-2">Добавить</button>
      </form>
      {isCpo(current) && (
        <p className="text-xs text-[#6F6E69] px-1">Риски видит вся команда. Менять может автор, ответственный и Owner; удалять — автор и Owner.</p>
      )}
    </div>
  );
}

function Row({ p, open }: { p: RiskLevel; open: Risk[] }) {
  return (
    <>
      <span className="text-[#6F6E69] pr-1 self-center">вероятн.: {LEVELS[p].toLowerCase()}</span>
      {[1, 2, 3].map((i) => {
        const n = open.filter((r) => r.probability === p && r.impact === i).length;
        return (
          <span key={i} className="h-9 rounded-lg grid place-items-center font-medium" style={{ background: n ? scoreColor(p * i) : "#F3F2EE" }}>
            {n || ""}
          </span>
        );
      })}
    </>
  );
}

function Fields({
  r,
  zones,
  users,
  tasks,
  zone,
  me,
}: {
  r?: Risk;
  zones: { slug: string; name: string }[];
  users: { id: string; name: string }[];
  tasks: { id: string; title: string; code: string }[];
  zone?: string;
  me?: string;
}) {
  const levels = [1, 2, 3] as RiskLevel[];
  return (
    <>
      <input name="title" required placeholder="Что может пойти не так: не успеет подрядчик, не дадут разрешение…" defaultValue={r?.title} className="sm:col-span-3" />
      <select name="zone" defaultValue={r?.zone ?? (zone && zone !== "all" ? zone : zones[0]?.slug)} aria-label="Проект">
        {zones.map((z) => (
          <option key={z.slug} value={z.slug}>{z.name}</option>
        ))}
      </select>
      <select name="probability" defaultValue={r?.probability ?? 2} aria-label="Вероятность">
        {levels.map((l) => (
          <option key={l} value={l}>Вероятность: {LEVELS[l].toLowerCase()}</option>
        ))}
      </select>
      <select name="impact" defaultValue={r?.impact ?? 2} aria-label="Влияние">
        {levels.map((l) => (
          <option key={l} value={l}>Влияние: {LEVELS[l].toLowerCase()}</option>
        ))}
      </select>
      <select name="ownerId" defaultValue={r?.ownerId ?? me} aria-label="Ответственный">
        {users.map((u) => (
          <option key={u.id} value={u.id}>Следит: {u.name}</option>
        ))}
      </select>
      <label className="flex items-center gap-2 text-sm">
        Решить до
        <input name="decideBy" type="date" defaultValue={r?.decideBy} className="flex-1" />
      </label>
      <select name="status" defaultValue={r?.status ?? "open"} aria-label="Статус">
        {(Object.keys(RISK_STATUS) as RiskStatus[]).map((s) => (
          <option key={s} value={s}>{RISK_STATUS[s].label}</option>
        ))}
      </select>
      <textarea name="planB" placeholder="План Б: что делаем, если риск сработает" defaultValue={r?.planB} className="sm:col-span-3" />
      <select name="taskIds" multiple defaultValue={r?.taskIds ?? []} className="sm:col-span-3 h-28 text-sm !rounded-2xl" aria-label="Связанные задачи">
        {tasks.map((t) => (
          <option key={t.id} value={t.id}>{t.code ? `${t.code} · ` : ""}{t.title}</option>
        ))}
      </select>
      <p className="sm:col-span-3 text-[11px] text-[#6F6E69] -mt-1">Связанные задачи: удерживайте Ctrl / ⌘, чтобы выбрать несколько.</p>
    </>
  );
}
