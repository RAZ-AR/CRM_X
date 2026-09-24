"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeFinance, CATEGORIES, convert, DEFAULT_FX, money, totals, upcomingPayments } from "@/lib/finance";
import { shortDate, todayYerevan } from "@/lib/dates";
import { CURRENCIES, EXPENSE_STATUS, type BudgetLine, type Currency, type Expense, type ExpenseStatus } from "@/lib/types";

const CUR_KEY = "crmx-money-currency";

/** Деньги: план по статьям, расходы и платежи. Каждая сумма — в своей валюте, итоги — в выбранной. */
export default function MoneyPage() {
  const { current, zones, budget = [], expenses = [], fx, contacts, tasks, saveRecord, deleteRecord, setPreviewId } = useStore();
  const [cur, setCur] = useState<Currency>(() => {
    if (typeof window === "undefined") return "AMD";
    try {
      const v = localStorage.getItem(CUR_KEY);
      return (CURRENCIES as readonly string[]).includes(v || "") ? (v as Currency) : "AMD";
    } catch {
      return "AMD";
    }
  });
  const [zone, setZone] = useState("all");
  const [status, setStatus] = useState<ExpenseStatus | "all" | "open">("open");
  const [editBudget, setEditBudget] = useState<string | null>(null);
  const [editExpense, setEditExpense] = useState<string | null>(null);
  const [err, setErr] = useState("");
  if (!current) return null;
  if (!canSeeFinance(current)) return <div className="card p-6">Раздел «Деньги» открыт только Owner и тем, кому он выдан.</div>;

  const rates = fx ?? DEFAULT_FX;
  const today = todayYerevan();
  const inZone = (x: { zone: string }) => zone === "all" || x.zone === zone;
  const sum = totals(budget, expenses, cur, rates, inZone);
  const due = upcomingPayments(expenses.filter(inZone), today);
  const zoneName = (slug: string) => zones.find((z) => z.slug === slug)?.name ?? slug;
  const show = (n: number) => money(n, cur);

  const categories = [...new Set([...CATEGORIES, ...budget.map((b) => b.category), ...expenses.map((e) => e.category)])];
  const rows = categories
    .map((c) => ({ category: c, ...totals(budget, expenses, cur, rates, (x) => inZone(x) && x.category === c) }))
    .filter((r) => r.plan || r.paid || r.committed);

  const pickCur = (c: Currency) => {
    setCur(c);
    try {
      localStorage.setItem(CUR_KEY, c);
    } catch {
      /* ignore */
    }
  };
  const run = async (p: Promise<{ ok: true } | { ok: false; error: string }>) => {
    const r = await p;
    setErr(r.ok ? "" : r.error);
    return r.ok;
  };

  async function onBudget(e: FormEvent<HTMLFormElement>, id?: string) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const line: BudgetLine = {
      id: id ?? `b-${crypto.randomUUID().slice(0, 8)}`,
      zone: String(fd.get("zone")),
      category: String(fd.get("category")),
      amount: Number(String(fd.get("amount")).replace(/\s/g, "").replace(",", ".")),
      currency: fd.get("currency") as Currency,
      note: String(fd.get("note") || ""),
    };
    if (await run(saveRecord("budget", line))) {
      if (id) setEditBudget(null);
      else form.reset();
    }
  }

  async function onExpense(e: FormEvent<HTMLFormElement>, prev?: Expense) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const item: Expense = {
      id: prev?.id ?? `e-${crypto.randomUUID().slice(0, 8)}`,
      title: String(fd.get("title")),
      zone: String(fd.get("zone")),
      category: String(fd.get("category")),
      amount: Number(String(fd.get("amount")).replace(/\s/g, "").replace(",", ".")),
      currency: fd.get("currency") as Currency,
      status: fd.get("status") as ExpenseStatus,
      date: String(fd.get("date")),
      contactId: String(fd.get("contactId") || "") || undefined,
      taskId: String(fd.get("taskId") || "") || undefined,
      authorId: prev?.authorId ?? current!.id,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
    };
    if (await run(saveRecord("expenses", item))) {
      if (prev) setEditExpense(null);
      else form.reset();
    }
  }

  const list = expenses
    .filter(inZone)
    .filter((x) => status === "all" || (status === "open" ? x.status !== "paid" : x.status === status))
    .sort((a, b) => a.date.localeCompare(b.date));
  const suppliers = contacts.filter((c) => c.kind !== "staff");

  return (
    <div className="space-y-3">
      <div className="card p-4 flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold mr-auto">Деньги</h1>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <div className="flex gap-1" role="group" aria-label="Валюта итогов">
          {CURRENCIES.map((c) => (
            <button key={c} type="button" onClick={() => pickCur(c)} className={`pill px-3 py-1 text-sm ${cur === c ? "bg-black text-white" : "bg-[#f4f4f6]"}`}>
              {c}
            </button>
          ))}
        </div>
      </div>
      {err && <div className="card p-3 text-sm text-red-500">{err}</div>}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Stat label="План" value={show(sum.plan)} />
        <Stat label="Оплачено" value={show(sum.paid)} />
        <Stat label="Ждёт оплаты" value={show(sum.committed)} hint="счета и запланированные платежи" />
        <Stat label="Остаток" value={show(sum.left)} tone={sum.left < 0 ? "bad" : "ok"} hint={sum.left < 0 ? "перерасход" : "план − оплачено − ждёт оплаты"} />
      </div>

      {due.length > 0 && (
        <div className="card p-4">
          <div className="font-medium mb-2">Платежи на 2 недели</div>
          <div className="divide-y divide-black/5">
            {due.map((x) => (
              <div key={x.id} className="flex items-center gap-2 py-1.5 text-sm">
                <span className={`w-14 ${x.date < today ? "text-red-500 font-medium" : "text-[#757575]"}`}>{shortDate(x.date)}</span>
                <span className="flex-1 truncate">{x.title} · {zoneName(x.zone)}</span>
                <span className="font-medium">{money(x.amount, x.currency)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card p-4 overflow-x-auto">
        <div className="font-medium mb-2">План и факт по статьям · {cur}</div>
        {rows.length === 0 ? (
          <p className="text-sm text-[#9a9aa0]">Пока пусто: добавьте строки бюджета ниже.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-[#757575]">
                <th className="py-1 font-normal">Статья</th>
                <th className="py-1 font-normal text-right">План</th>
                <th className="py-1 font-normal text-right">Оплачено</th>
                <th className="py-1 font-normal text-right">Ждёт</th>
                <th className="py-1 font-normal text-right">Остаток</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.category} className="border-t border-black/5">
                  <td className="py-1.5">{r.category}</td>
                  <td className="py-1.5 text-right">{show(r.plan)}</td>
                  <td className="py-1.5 text-right">{show(r.paid)}</td>
                  <td className="py-1.5 text-right">{show(r.committed)}</td>
                  <td className={`py-1.5 text-right font-medium ${r.left < 0 ? "text-red-500" : ""}`}>{show(r.left)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="card p-4 space-y-2">
        <div className="font-medium">Расходы</div>
        <div className="flex flex-wrap gap-1.5">
          {([["open", "Не оплачены"], ["all", "Все"], ...Object.entries(EXPENSE_STATUS).map(([k, v]) => [k, v.label])] as [string, string][]).map(([k, label]) => (
            <button key={k} type="button" onClick={() => setStatus(k as never)} className={`pill px-3 py-1 text-sm ${status === k ? "bg-black text-white" : "bg-white border border-black/10"}`}>
              {label}
            </button>
          ))}
        </div>
        <div className="divide-y divide-black/5">
          {list.map((x) =>
            editExpense === x.id ? (
              <form key={x.id} className="grid sm:grid-cols-3 gap-2 py-2" onSubmit={(e) => onExpense(e, x)}>
                <ExpenseFields x={x} zones={zones} suppliers={suppliers} tasks={tasks} today={today} />
                <div className="flex gap-2 items-center">
                  <button className="pill bg-black text-white px-3 py-1 text-sm">Сохранить</button>
                  <button type="button" className="text-sm" onClick={() => setEditExpense(null)}>Отмена</button>
                </div>
              </form>
            ) : (
              <div key={x.id} className="flex flex-wrap items-center gap-2 py-2 text-sm">
                <span className={`w-14 ${x.status !== "paid" && x.date < today ? "text-red-500 font-medium" : "text-[#757575]"}`}>{shortDate(x.date)}</span>
                <span className="flex-1 min-w-[10rem]">
                  <span className="font-medium">{x.title}</span>
                  <span className="text-[#757575]"> · {zoneName(x.zone)} · {x.category}</span>
                  {x.contactId && <span className="text-[#757575]"> · {contacts.find((c) => c.id === x.contactId)?.name}</span>}
                  {x.taskId && tasks.some((t) => t.id === x.taskId) && (
                    <button type="button" className="ml-1 text-[#2383e2] underline" onClick={() => setPreviewId(x.taskId!)}>задача</button>
                  )}
                </span>
                <span className="text-right">
                  <span className="font-medium">{money(x.amount, x.currency)}</span>
                  {x.currency !== cur && <span className="block text-[11px] text-[#9a9aa0]">≈ {show(convert(x.amount, x.currency, cur, rates))}</span>}
                </span>
                <select
                  className="text-xs"
                  value={x.status}
                  aria-label="Статус платежа"
                  onChange={(e) => run(saveRecord("expenses", { ...x, status: e.target.value as ExpenseStatus }))}
                  style={{ background: EXPENSE_STATUS[x.status].color }}
                >
                  {(Object.keys(EXPENSE_STATUS) as ExpenseStatus[]).map((st) => (
                    <option key={st} value={st}>{EXPENSE_STATUS[st].label}</option>
                  ))}
                </select>
                <button type="button" className="text-xs text-[#757575]" onClick={() => setEditExpense(x.id)}>изменить</button>
                <button
                  type="button"
                  className="text-xs text-red-500"
                  onClick={() => confirm(`Удалить «${x.title}»?`) && run(deleteRecord("expenses", x.id))}
                >
                  удалить
                </button>
              </div>
            ),
          )}
          {list.length === 0 && <p className="text-sm text-[#9a9aa0] py-2">Нет расходов с таким статусом.</p>}
        </div>
        <form className="grid sm:grid-cols-3 gap-2 pt-2 border-t border-black/5" onSubmit={(e) => onExpense(e)}>
          <div className="sm:col-span-3 text-sm font-medium">Новый расход или платёж</div>
          <ExpenseFields zones={zones} suppliers={suppliers} tasks={tasks} today={today} zone={zone} />
          <button className="pill bg-black text-white px-4 py-2">Добавить</button>
        </form>
      </div>

      <div className="card p-4 space-y-2">
        <div className="font-medium">Бюджет: план по статьям</div>
        <div className="divide-y divide-black/5">
          {budget.filter(inZone).map((b) =>
            editBudget === b.id ? (
              <form key={b.id} className="grid sm:grid-cols-3 gap-2 py-2" onSubmit={(e) => onBudget(e, b.id)}>
                <BudgetFields b={b} zones={zones} />
                <div className="flex gap-2 items-center">
                  <button className="pill bg-black text-white px-3 py-1 text-sm">Сохранить</button>
                  <button type="button" className="text-sm" onClick={() => setEditBudget(null)}>Отмена</button>
                </div>
              </form>
            ) : (
              <div key={b.id} className="flex flex-wrap items-center gap-2 py-2 text-sm">
                <span className="flex-1 min-w-[10rem]">
                  {b.category} <span className="text-[#757575]">· {zoneName(b.zone)}{b.note ? ` · ${b.note}` : ""}</span>
                </span>
                <span className="font-medium">{money(b.amount, b.currency)}</span>
                <button type="button" className="text-xs text-[#757575]" onClick={() => setEditBudget(b.id)}>изменить</button>
                <button type="button" className="text-xs text-red-500" onClick={() => confirm("Удалить строку бюджета?") && run(deleteRecord("budget", b.id))}>
                  удалить
                </button>
              </div>
            ),
          )}
        </div>
        <form className="grid sm:grid-cols-3 gap-2 pt-2 border-t border-black/5" onSubmit={(e) => onBudget(e)}>
          <div className="sm:col-span-3 text-sm font-medium">Добавить в план</div>
          <BudgetFields zones={zones} zone={zone} />
          <button className="pill bg-black text-white px-4 py-2">Добавить</button>
        </form>
      </div>

      <Rates rates={rates} onSave={(r) => run(saveRecord("fx", r))} />
    </div>
  );
}

function Stat({ label, value, hint, tone }: { label: string; value: string; hint?: string; tone?: "ok" | "bad" }) {
  return (
    <div className="card p-4">
      <div className="text-xs text-[#757575]">{label}</div>
      <div className={`text-lg font-semibold ${tone === "bad" ? "text-red-500" : ""}`}>{value}</div>
      {hint && <div className="text-[11px] text-[#9a9aa0]">{hint}</div>}
    </div>
  );
}

type ZoneOpt = { slug: string; name: string };

function CurrencySelect({ value }: { value?: Currency }) {
  return (
    <select name="currency" defaultValue={value ?? "AMD"} aria-label="Валюта">
      {CURRENCIES.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}

function ZoneSelect({ zones, value }: { zones: ZoneOpt[]; value?: string }) {
  return (
    <select name="zone" defaultValue={value && value !== "all" ? value : zones[0]?.slug} aria-label="Проект">
      {zones.map((z) => (
        <option key={z.slug} value={z.slug}>{z.name}</option>
      ))}
    </select>
  );
}

function CategorySelect({ value }: { value?: string }) {
  const list = value && !CATEGORIES.includes(value) ? [...CATEGORIES, value] : CATEGORIES;
  return (
    <select name="category" defaultValue={value ?? CATEGORIES[0]} aria-label="Статья">
      {list.map((c) => (
        <option key={c} value={c}>{c}</option>
      ))}
    </select>
  );
}

function BudgetFields({ b, zones, zone }: { b?: BudgetLine; zones: ZoneOpt[]; zone?: string }) {
  return (
    <>
      <ZoneSelect zones={zones} value={b?.zone ?? zone} />
      <CategorySelect value={b?.category} />
      <div className="flex gap-2">
        <input name="amount" required inputMode="decimal" placeholder="Сумма" defaultValue={b?.amount} className="flex-1 min-w-0" />
        <CurrencySelect value={b?.currency} />
      </div>
      <input name="note" placeholder="Комментарий" defaultValue={b?.note} className="sm:col-span-2" />
    </>
  );
}

function ExpenseFields({
  x,
  zones,
  suppliers,
  tasks,
  today,
  zone,
}: {
  x?: Expense;
  zones: ZoneOpt[];
  suppliers: { id: string; name: string; specialty?: string }[];
  tasks: { id: string; title: string; code: string }[];
  today: string;
  zone?: string;
}) {
  return (
    <>
      <input name="title" required placeholder="За что: аванс электрику, вафельницы…" defaultValue={x?.title} className="sm:col-span-2" />
      <input name="date" type="date" required defaultValue={x?.date ?? today} aria-label="Дата оплаты" />
      <ZoneSelect zones={zones} value={x?.zone ?? zone} />
      <CategorySelect value={x?.category} />
      <div className="flex gap-2">
        <input name="amount" required inputMode="decimal" placeholder="Сумма" defaultValue={x?.amount} className="flex-1 min-w-0" />
        <CurrencySelect value={x?.currency} />
      </div>
      <select name="status" defaultValue={x?.status ?? "planned"} aria-label="Статус">
        {(Object.keys(EXPENSE_STATUS) as ExpenseStatus[]).map((st) => (
          <option key={st} value={st}>{EXPENSE_STATUS[st].label}</option>
        ))}
      </select>
      <select name="contactId" defaultValue={x?.contactId ?? ""} aria-label="Контрагент">
        <option value="">Контрагент —</option>
        {suppliers.map((c) => (
          <option key={c.id} value={c.id}>{c.name}{c.specialty ? ` · ${c.specialty}` : ""}</option>
        ))}
      </select>
      <select name="taskId" defaultValue={x?.taskId ?? ""} aria-label="Задача">
        <option value="">Задача —</option>
        {tasks.map((t) => (
          <option key={t.id} value={t.id}>{t.code ? `${t.code} · ` : ""}{t.title}</option>
        ))}
      </select>
    </>
  );
}

function Rates({ rates, onSave }: { rates: { USD: number; EUR: number; updatedAt?: string }; onSave: (r: { USD: number; EUR: number }) => Promise<boolean> }) {
  const [note, setNote] = useState("");
  return (
    <form
      className="card p-4 flex flex-wrap items-end gap-2 text-sm"
      onSubmit={async (e) => {
        e.preventDefault();
        const fd = new FormData(e.currentTarget);
        const ok = await onSave({ USD: Number(String(fd.get("USD")).replace(",", ".")), EUR: Number(String(fd.get("EUR")).replace(",", ".")) });
        setNote(ok ? "Курсы сохранены" : "");
      }}
    >
      <div className="w-full font-medium">Курсы для пересчёта</div>
      <label className="flex flex-col gap-1">
        1 USD в AMD
        <input name="USD" inputMode="decimal" required defaultValue={rates.USD} className="w-28" />
      </label>
      <label className="flex flex-col gap-1">
        1 EUR в AMD
        <input name="EUR" inputMode="decimal" required defaultValue={rates.EUR} className="w-28" />
      </label>
      <button className="pill bg-[#f4f4f6] px-3 py-2">Сохранить</button>
      <span className="text-[#9a9aa0]">
        {note || (rates.updatedAt ? `обновлены ${shortDate(rates.updatedAt.slice(0, 10))}` : "стартовые значения, проверьте")}
      </span>
    </form>
  );
}
