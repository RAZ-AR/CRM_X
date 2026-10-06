import { randomBytes } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { PrismaClient } from "@prisma/client";
import { LEGACY_STREAMS, type AppState } from "./types";
import { normalizeState } from "./normalize";
import { seed } from "./seed";
import { getPrisma } from "./prisma";

/**
 * Общее состояние хранится в Postgres (Aiven) одной JSON-строкой в таблице StateStore —
 * та же схема, что раньше была в Vercel Blob (один файл, конкурентная запись через версию),
 * только без месячных лимитов на число операций. Таблицы не в prisma/schema.prisma: применить
 * их туда можно только командой `db push` с доступом к самой базе, а этот код должен завестись
 * и без ручного шага — поэтому таблица создаётся сама при первом обращении (idempotent DDL).
 *
 * Локальная разработка без DATABASE_URL — как раньше, JSON-файл в web/.local-store/.
 */
const LOCAL = !process.env.DATABASE_URL;
const localPath = (key: string) => join(process.cwd(), ".local-store", key);
const STATE_ROW = "main";
const SECRET_ROW = "session-secret";

export class StorageUnavailableError extends Error {
  constructor(reason: string) {
    super(`Хранилище данных недоступно: ${reason}`);
    this.name = "StorageUnavailableError";
  }
}

let tableReady: Promise<void> | null = null;
/** CREATE TABLE IF NOT EXISTS — безопасно вызывать на каждый инстанс, выполняется один раз на процесс. */
function ensureTable(prisma: PrismaClient): Promise<void> {
  if (!tableReady) {
    tableReady = prisma
      .$executeRaw`CREATE TABLE IF NOT EXISTS "StateStore" (id TEXT PRIMARY KEY, rev INTEGER NOT NULL DEFAULT 0, data JSONB NOT NULL, updated_at TIMESTAMPTZ NOT NULL DEFAULT now())`
      .then(() => undefined)
      .catch((e) => {
        tableReady = null; // не запоминаем провал — следующий вызов попробует снова
        throw e;
      });
  }
  return tableReady;
}

async function pgReadRow(prisma: PrismaClient, id: string): Promise<{ data: unknown; rev: number } | null> {
  await ensureTable(prisma);
  const rows = await prisma.$queryRaw<{ data: unknown; rev: number }[]>`SELECT data, rev FROM "StateStore" WHERE id = ${id}`;
  return rows[0] ?? null;
}

/** true — строка вставлена/обновлена; false — кто-то другой уже записал новее (гонка, нужно повторить). */
async function pgWriteRow(prisma: PrismaClient, id: string, data: unknown, rev: number, expectedRev: number | null): Promise<boolean> {
  await ensureTable(prisma);
  const json = JSON.stringify(data);
  if (expectedRev === null) {
    const inserted = await prisma.$executeRaw`INSERT INTO "StateStore" (id, rev, data) VALUES (${id}, ${rev}, ${json}::jsonb) ON CONFLICT (id) DO NOTHING`;
    return inserted > 0;
  }
  const updated = await prisma.$executeRaw`UPDATE "StateStore" SET data = ${json}::jsonb, rev = ${rev}, updated_at = now() WHERE id = ${id} AND rev = ${expectedRev}`;
  return updated > 0;
}

async function explainPgFailure(e: unknown): Promise<StorageUnavailableError> {
  const msg = e instanceof Error ? e.message : String(e);
  if (/password authentication|authentication failed/i.test(msg)) return new StorageUnavailableError("Postgres отклонил пароль — проверьте DATABASE_URL в Vercel.");
  if (/does not exist|unknown database/i.test(msg)) return new StorageUnavailableError("база данных не найдена — проверьте адрес и имя базы в DATABASE_URL.");
  if (/timeout|ECONNREFUSED|ENOTFOUND|Can't reach database/i.test(msg)) return new StorageUnavailableError("не удалось подключиться к Postgres — база спит, перегружена или адрес недоступен.");
  return new StorageUnavailableError(msg);
}

/**
 * Ключ подписи сессий: SESSION_SECRET из env, иначе случайный ключ, который создаётся один раз
 * и хранится в Postgres (для инстансов, где env настроить нельзя или неудобно).
 */
let cachedSecret: string | null = null;

export async function loadSessionSecret(): Promise<string> {
  const env = process.env.SESSION_SECRET;
  if (env) return env;
  if (cachedSecret) return cachedSecret;
  if (LOCAL) {
    cachedSecret = "crmx-local-dev-only";
    return cachedSecret;
  }
  const prisma = getPrisma();
  if (!prisma) throw new StorageUnavailableError("не настроен DATABASE_URL.");
  try {
    const row = await pgReadRow(prisma, SECRET_ROW);
    if (row) {
      cachedSecret = (row.data as { secret: string }).secret;
      return cachedSecret;
    }
    const fresh = randomBytes(32).toString("hex");
    await pgWriteRow(prisma, SECRET_ROW, { secret: fresh }, 0, null);
    const saved = await pgReadRow(prisma, SECRET_ROW); // другой инстанс мог успеть записать первым
    cachedSecret = (saved!.data as { secret: string }).secret;
    return cachedSecret;
  } catch (e) {
    throw await explainPgFailure(e);
  }
}

/**
 * Всё, что было до master-плана от 24.09.2026 (нет проекта «ОБЩИЕ»): заменяем задачи и проекты
 * на новый план. Пароли людей с теми же id сохраняем, внешние контакты и свои wiki-страницы — тоже.
 * Идемпотентно: после миграции «common» есть, повторно не срабатывает.
 */
export function isLegacyState(state: AppState) {
  return !state.zones.some((z) => z.slug === "common");
}

export function migrateLegacyState(state: AppState): AppState {
  const seedIds = new Set(seed.wiki.map((w) => w.id));
  return {
    ...state,
    zones: seed.zones,
    users: seed.users.map((u) => {
      const prev = state.users.find((x) => x.id === u.id);
      return { ...u, password: prev?.password || u.password };
    }),
    tasks: seed.tasks,
    subtasks: seed.subtasks,
    comments: [],
    notices: [],
    wiki: [...seed.wiki, ...state.wiki.filter((w) => !seedIds.has(w.id) && w.id !== "w1")],
    contacts: [...seed.contacts.filter((c) => c.kind === "staff"), ...state.contacts.filter((c) => c.kind !== "staff")],
    broadcast: seed.broadcast,
  };
}

/**
 * Один раз выставляет команде стартовые логины и пароли из seed (Armen 1111, Vladimir 2222,
 * Karina 3333) и добавляет недостающих. Нужно, потому что перенос 24.09 оставил Armen старый
 * демо-пароль. После этого смена пароля в «Мой профиль» больше не перезаписывается.
 */
export const AUTH_VERSION = 2;

/** Разовая очистка всех задач (06.10.2026): Owner актуализирует план и пришлёт новые данные. */
export const TASKS_VERSION = 1;

export function resetTeamCredentials(state: AppState): AppState {
  const users = state.users.map((u) => {
    const s = seed.users.find((x) => x.id === u.id);
    return s ? { ...u, email: s.email, password: s.password, role: s.role } : u;
  });
  for (const s of seed.users) if (!users.some((u) => u.id === s.id)) users.push(s);
  return { ...state, users, authVersion: AUTH_VERSION };
}

/** Разовые миграции данных; чистые функции, применяются при каждом чтении до записи. */
function applyMigrations(input: AppState): { state: AppState; changed: boolean } {
  let state = input;
  let changed = false;
  if (isLegacyState(state)) {
    state = migrateLegacyState(state);
    changed = true;
  }
  if ((state.authVersion ?? 0) < AUTH_VERSION) {
    state = resetTeamCredentials(state);
    changed = true;
  }
  if ((state.tasksVersion ?? 0) < TASKS_VERSION) {
    state = {
      ...state,
      tasks: [],
      subtasks: [],
      comments: [],
      notices: state.notices.filter((n) => !n.taskId),
      tasksVersion: TASKS_VERSION,
    };
    changed = true;
  }
  // Креативный директор видит весь поток BRAND (один раз; дальше настраивает Owner).
  if (state.users.some((u) => u.id === "u-vladimir" && u.streams === undefined)) {
    state = { ...state, users: state.users.map((u) => (u.id === "u-vladimir" && u.streams === undefined ? { ...u, streams: ["BRAND & MARKETING"] } : u)) };
    changed = true;
  }
  // Потоки переименованы (BRAND → BRAND & MARKETING и т.д.): переносим задачи и доступы людей.
  const renamed = (x: string) => (Object.hasOwn(LEGACY_STREAMS, x) ? LEGACY_STREAMS[x] : x);
  if (state.tasks.some((t) => Object.hasOwn(LEGACY_STREAMS, t.workstream)) || state.users.some((u) => (u.streams ?? []).some((x) => Object.hasOwn(LEGACY_STREAMS, x)))) {
    state = {
      ...state,
      tasks: state.tasks.map((t) => (Object.hasOwn(LEGACY_STREAMS, t.workstream) ? { ...t, workstream: renamed(t.workstream) } : t)),
      users: state.users.map((u) => (u.streams?.length ? { ...u, streams: [...new Set(u.streams.map((x) => renamed(x)))] as typeof u.streams } : u)),
    };
    changed = true;
  }
  // Master-план в Wiki со старыми названиями потоков — обновляем из seed (страницу w1 в UI не редактируют).
  const plan = seed.wiki.find((w) => w.id === "w1");
  if (plan && state.wiki.some((w) => w.id === "w1" && w.body !== plan.body && !w.body.includes("BRAND & MARKETING"))) {
    state = { ...state, wiki: state.wiki.map((w) => (w.id === "w1" ? { ...w, body: plan.body } : w)) };
    changed = true;
  }
  return { state, changed };
}

type Via = "db" | "seed";

/** Версия для условной записи: null — строки ещё нет (только вставка, не перезапись). */
async function loadVersioned(): Promise<{ state: AppState; rev: number | null; via: Via; changed: boolean }> {
  if (LOCAL) {
    let text: string | null = null;
    try {
      text = readFileSync(localPath("state.json"), "utf8");
    } catch {
      /* файла ещё нет — начинаем с seed */
    }
    if (text) return { ...applyMigrations(normalizeState(JSON.parse(text))), rev: null, via: "db" };
    return { state: seed, rev: null, via: "seed", changed: true };
  }
  const prisma = getPrisma();
  if (!prisma) throw new StorageUnavailableError("не настроен DATABASE_URL — задайте его в переменных окружения Vercel.");
  let row: { data: unknown; rev: number } | null;
  try {
    row = await pgReadRow(prisma, STATE_ROW);
  } catch (e) {
    throw await explainPgFailure(e);
  }
  if (row) return { ...applyMigrations(normalizeState(row.data as AppState)), rev: row.rev, via: "db" };
  return { state: seed, rev: null, via: "seed", changed: true };
}

async function writeVersioned(state: AppState, expectedRev: number | null): Promise<boolean> {
  if (LOCAL) {
    const file = localPath("state.json");
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, JSON.stringify(state));
    return true;
  }
  const prisma = getPrisma();
  if (!prisma) throw new StorageUnavailableError("не настроен DATABASE_URL — задайте его в переменных окружения Vercel.");
  try {
    return await pgWriteRow(prisma, STATE_ROW, state, state.rev ?? 0, expectedRev);
  } catch (e) {
    throw await explainPgFailure(e);
  }
}

export class StateConflictError extends Error {
  constructor() {
    super("Данные одновременно меняют несколько человек — повторите действие");
    this.name = "StateConflictError";
  }
}

/**
 * Единственный способ изменить общее состояние. `change` получает свежие данные и возвращает
 * новое состояние (или undefined — ничего не менять) и результат. Если между чтением и записью
 * кто-то успел сохранить своё, чтение и `change` повторяются на новых данных — правки не теряются.
 * Побочные эффекты (Telegram и т.п.) делайте после вызова, по результату: `change` может выполниться несколько раз.
 */
export async function updateSharedState<T>(
  change: (state: AppState) => { state?: AppState; result: T } | Promise<{ state?: AppState; result: T }>,
): Promise<T & { via?: Via }> {
  for (let attempt = 0; attempt < 8; attempt++) {
    const cur = await loadVersioned();
    const out = await change(cur.state);
    const changed = out.state ?? (cur.changed ? cur.state : undefined);
    if (!changed) return out.result as T & { via?: Via };
    const next = { ...changed, rev: (cur.state.rev ?? 0) + 1 };
    const ok = await writeVersioned(next, cur.rev);
    if (!ok) {
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 120 * (attempt + 1)));
      continue;
    }
    recent = { at: Date.now(), state: next, via: cur.via };
    return Object.assign(out.result as object, { via: cur.via }) as T & { via?: Via };
  }
  throw new StateConflictError();
}

/**
 * Каждое чтение — запрос к Postgres, а один запрос страницы читает состояние дважды (проверка
 * сессии + данные), и каждая вкладка опрашивает сервер. Короткий кэш в памяти инстанса убирает
 * повторы; записи идут мимо него (updateSharedState читает заново).
 */
const RECENT_MS = 3000;
let recent: { at: number; state: AppState; via: Via } | null = null;

/** Только чтение (миграции при необходимости сохраняются той же безопасной записью). */
export async function loadSharedState(): Promise<{ state: AppState; via: Via }> {
  if (recent && Date.now() - recent.at < RECENT_MS) return { state: recent.state, via: recent.via };
  const cur = await loadVersioned();
  if (cur.changed) {
    // Миграции сохраняем той же безопасной записью (с повторами), затем отдаём сохранённое.
    const saved = await updateSharedState((state) => ({ state, result: { state } }));
    return { state: saved.state, via: cur.via };
  }
  recent = { at: Date.now(), state: cur.state, via: cur.via };
  return { state: cur.state, via: cur.via };
}
