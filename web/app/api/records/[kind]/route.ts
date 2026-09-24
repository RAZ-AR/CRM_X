import { NextResponse } from "next/server";
import { sessionUser } from "@/lib/session";
import { updateSharedState } from "@/lib/blobState";
import { canSeeFinance, parseBudgetLine, parseExpense, parseFx } from "@/lib/finance";
import { canDeleteRisk, canEditRisk, parseRisk } from "@/lib/risks";
import type { AppState, BudgetLine, Expense, Risk, User } from "@/lib/types";

/**
 * Деньги и риски: по одной записи за запрос, атомарно.
 * PUT — создать или обновить, DELETE ?id= — удалить.
 */
type Kind = "budget" | "expenses" | "risks" | "fx";
type Fail = { error: string; status: number };
type Out = { fail?: Fail; value?: unknown };

const KINDS: Kind[] = ["budget", "expenses", "risks", "fx"];

function allowed(user: User, kind: Kind) {
  return kind === "risks" ? true : canSeeFinance(user);
}

function upsert<T extends { id: string }>(list: T[] | undefined, item: T) {
  const xs = list ?? [];
  return xs.some((x) => x.id === item.id) ? xs.map((x) => (x.id === item.id ? item : x)) : [item, ...xs];
}

function put(state: AppState, user: User, kind: Kind, body: unknown): { state?: AppState; result: Out } {
  const fail = (error: string, status = 400) => ({ result: { fail: { error, status } } });
  if (kind === "fx") {
    const r = parseFx(body as never);
    return r.ok ? { state: { ...state, fx: r.value }, result: { value: r.value } } : fail(r.error);
  }
  if (kind === "budget") {
    const r = parseBudgetLine(body as Partial<BudgetLine>, state);
    return r.ok ? { state: { ...state, budget: upsert(state.budget, r.value) }, result: { value: r.value } } : fail(r.error);
  }
  if (kind === "expenses") {
    const raw = body as Partial<Expense>;
    const prev = (state.expenses ?? []).find((e) => e.id === raw?.id);
    const r = parseExpense(raw, state, user, prev);
    return r.ok ? { state: { ...state, expenses: upsert(state.expenses, r.value) }, result: { value: r.value } } : fail(r.error);
  }
  const raw = body as Partial<Risk>;
  const prev = (state.risks ?? []).find((x) => x.id === raw?.id);
  if (prev && !canEditRisk(user, prev)) return fail("Менять риск может автор, ответственный или Owner", 403);
  const r = parseRisk(raw, state, user, prev);
  return r.ok ? { state: { ...state, risks: upsert(state.risks, r.value) }, result: { value: r.value } } : fail(r.error);
}

function remove(state: AppState, user: User, kind: Kind, id: string): { state?: AppState; result: Out } {
  if (kind === "risks") {
    const risk = (state.risks ?? []).find((x) => x.id === id);
    if (!risk) return { result: {} };
    if (!canDeleteRisk(user, risk)) return { result: { fail: { error: "Удалить может автор или Owner", status: 403 } } };
    return { state: { ...state, risks: (state.risks ?? []).filter((x) => x.id !== id) }, result: {} };
  }
  if (kind === "budget") return { state: { ...state, budget: (state.budget ?? []).filter((x) => x.id !== id) }, result: {} };
  if (kind === "expenses") return { state: { ...state, expenses: (state.expenses ?? []).filter((x) => x.id !== id) }, result: {} };
  return { result: { fail: { error: "Нельзя удалить", status: 400 } } };
}

async function handle(req: Request, ctx: { params: Promise<{ kind: string }> }, method: "PUT" | "DELETE") {
  const user = await sessionUser();
  if (!user) return NextResponse.json({ ok: false, auth: true }, { status: 401 });
  const { kind } = await ctx.params;
  if (!KINDS.includes(kind as Kind)) return NextResponse.json({ ok: false, error: "Нет такого раздела" }, { status: 404 });
  if (!allowed(user, kind as Kind)) return NextResponse.json({ ok: false, error: "Нет доступа" }, { status: 403 });
  let body: unknown = null;
  if (method === "PUT") {
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Пустой запрос" }, { status: 400 });
    }
  }
  const id = new URL(req.url).searchParams.get("id") || "";
  const out = await updateSharedState<Out>((state) =>
    method === "PUT" ? put(state, user, kind as Kind, body) : remove(state, user, kind as Kind, id),
  );
  if (out.fail) return NextResponse.json({ ok: false, error: out.fail.error }, { status: out.fail.status });
  return NextResponse.json({ ok: true, value: out.value });
}

export function PUT(req: Request, ctx: { params: Promise<{ kind: string }> }) {
  return handle(req, ctx, "PUT");
}

export function DELETE(req: Request, ctx: { params: Promise<{ kind: string }> }) {
  return handle(req, ctx, "DELETE");
}
