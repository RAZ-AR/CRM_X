import { isCpo } from "./access";
import { addDays } from "./dates";
import {
  BUDGET_CATEGORIES,
  CURRENCIES,
  EXPENSE_STATUS,
  type AppState,
  type BudgetLine,
  type Currency,
  type Expense,
  type FxRates,
  type User,
} from "./types";

/** Стартовые курсы (драм за единицу) — Owner правит их на странице «Деньги». */
export const DEFAULT_FX: FxRates = { USD: 385, EUR: 450 };

export function canSeeFinance(user: User) {
  return isCpo(user) || user.permissions.includes("finance");
}

/** Сумма в драмах. */
export function toAmd(amount: number, currency: Currency, fx: FxRates = DEFAULT_FX) {
  return currency === "AMD" ? amount : amount * (fx[currency] || DEFAULT_FX[currency]);
}

export function convert(amount: number, from: Currency, to: Currency, fx: FxRates = DEFAULT_FX) {
  const amd = toAmd(amount, from, fx);
  return to === "AMD" ? amd : amd / (fx[to] || DEFAULT_FX[to]);
}

const SIGN: Record<Currency, string> = { AMD: "AMD", USD: "$", EUR: "€" };

export function money(amount: number, currency: Currency) {
  const rounded = currency === "AMD" ? Math.round(amount) : Math.round(amount * 100) / 100;
  const text = Math.abs(rounded).toLocaleString("ru-RU", { maximumFractionDigits: currency === "AMD" ? 0 : 2 });
  const minus = rounded < 0 ? "−" : "";
  return currency === "USD" ? `${minus}${SIGN.USD}${text}` : `${minus}${text} ${SIGN[currency]}`;
}

export type Totals = { plan: number; paid: number; committed: number; left: number };

/** План, оплачено, обязательства (счёт/план, ещё не оплачено), остаток — в выбранной валюте. */
export function totals(
  budget: BudgetLine[],
  expenses: Expense[],
  to: Currency,
  fx: FxRates,
  match: (x: { zone: string; category: string }) => boolean = () => true,
): Totals {
  const sum = <T extends { amount: number; currency: Currency }>(xs: T[]) =>
    xs.reduce((s, x) => s + convert(x.amount, x.currency, to, fx), 0);
  const plan = sum(budget.filter(match));
  const mine = expenses.filter(match);
  const paid = sum(mine.filter((e) => e.status === "paid"));
  const committed = sum(mine.filter((e) => e.status !== "paid"));
  return { plan, paid, committed, left: plan - paid - committed };
}

/** Неоплаченные расходы: просроченные и на ближайшие `days` дней. */
export function upcomingPayments(expenses: Expense[], today: string, days = 14) {
  const until = addDays(today, days);
  return expenses
    .filter((e) => e.status !== "paid" && e.date && e.date <= until)
    .sort((a, b) => a.date.localeCompare(b.date));
}

const ID = /^[A-Za-z0-9_-]{1,64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;

function isCurrency(x: unknown): x is Currency {
  return typeof x === "string" && (CURRENCIES as readonly string[]).includes(x);
}

function amountOf(x: unknown) {
  const n = typeof x === "string" ? Number(x.replace(",", ".")) : x;
  return typeof n === "number" && Number.isFinite(n) && n >= 0 && n < 1e13 ? n : null;
}

function text(x: unknown, max: number) {
  return typeof x === "string" ? x.trim().slice(0, max) : "";
}

type Ok<T> = { ok: true; value: T } | { ok: false; error: string };

export function parseBudgetLine(raw: Partial<BudgetLine>, state: AppState): Ok<BudgetLine> {
  if (!raw?.id || !ID.test(raw.id)) return { ok: false, error: "Неверный id" };
  if (!state.zones.some((z) => z.slug === raw.zone)) return { ok: false, error: "Нет такого проекта" };
  const category = text(raw.category, 80);
  if (!category) return { ok: false, error: "Укажите статью" };
  const amount = amountOf(raw.amount);
  if (amount === null) return { ok: false, error: "Сумма должна быть числом ≥ 0" };
  if (!isCurrency(raw.currency)) return { ok: false, error: "Валюта: AMD, USD или EUR" };
  return { ok: true, value: { id: raw.id, zone: raw.zone!, category, amount, currency: raw.currency, note: text(raw.note, 300) } };
}

export function parseExpense(raw: Partial<Expense>, state: AppState, user: User, prev?: Expense): Ok<Expense> {
  if (!raw?.id || !ID.test(raw.id)) return { ok: false, error: "Неверный id" };
  const title = text(raw.title, 200);
  if (!title) return { ok: false, error: "Укажите, за что платёж" };
  if (!state.zones.some((z) => z.slug === raw.zone)) return { ok: false, error: "Нет такого проекта" };
  const category = text(raw.category, 80) || "Прочее";
  const amount = amountOf(raw.amount);
  if (amount === null) return { ok: false, error: "Сумма должна быть числом ≥ 0" };
  if (!isCurrency(raw.currency)) return { ok: false, error: "Валюта: AMD, USD или EUR" };
  if (!raw.status || !Object.hasOwn(EXPENSE_STATUS, raw.status)) return { ok: false, error: "Неверный статус" };
  if (!raw.date || !DATE.test(raw.date)) return { ok: false, error: "Укажите дату" };
  const contactId = raw.contactId && state.contacts.some((c) => c.id === raw.contactId) ? raw.contactId : undefined;
  const taskId = raw.taskId && state.tasks.some((t) => t.id === raw.taskId) ? raw.taskId : undefined;
  return {
    ok: true,
    value: {
      id: raw.id,
      title,
      zone: raw.zone!,
      category,
      amount,
      currency: raw.currency,
      status: raw.status,
      date: raw.date,
      contactId,
      taskId,
      authorId: prev?.authorId ?? user.id,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
    },
  };
}

export function parseFx(raw: Partial<FxRates>): Ok<FxRates> {
  const usd = amountOf(raw?.USD);
  const eur = amountOf(raw?.EUR);
  if (!usd || !eur) return { ok: false, error: "Курс должен быть больше нуля" };
  return { ok: true, value: { USD: usd, EUR: eur, updatedAt: new Date().toISOString() } };
}

export const CATEGORIES: readonly string[] = BUDGET_CATEGORIES;
