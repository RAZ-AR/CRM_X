import { createHash, randomBytes } from "node:crypto";
import { BlobNotFoundError, BlobPreconditionFailedError, get as blobGet, head as blobHead, put as blobPut } from "@vercel/blob";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import type { AppState } from "./types";
import { normalizeState } from "./normalize";
import { seed } from "./seed";

const KEY = "crmx/state.json";

/** Локальная разработка без Vercel Blob: те же ключи, но в файлах web/.local-store/. */
const LOCAL = !process.env.VERCEL && !process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_STORE_ID;
const localPath = (key: string) => join(process.cwd(), ".local-store", key);

type GetOptions = Parameters<typeof blobGet>[1];
type PutOptions = Parameters<typeof blobPut>[2];

type Stored = { stream: ReadableStream<Uint8Array>; etag: string | null } | null;

const hashOf = (body: string | Buffer) => `"${createHash("sha1").update(body).digest("hex")}"`;

async function get(key: string, options: GetOptions): Promise<Stored> {
  if (!LOCAL) {
    const file = await blobGet(key, options);
    if (!file || file.statusCode !== 200) return null;
    return { stream: file.stream, etag: file.blob.etag ?? null };
  }
  try {
    const body = readFileSync(localPath(key));
    return { stream: new Blob([body]).stream(), etag: hashOf(body) };
  } catch {
    return null;
  }
}

async function put(key: string, body: string, options: PutOptions) {
  if (!LOCAL) return blobPut(key, body, options);
  const file = localPath(key);
  let current: Buffer | null = null;
  try {
    current = readFileSync(file);
  } catch {
    current = null;
  }
  if (options?.allowOverwrite === false && current) throw new Error("exists");
  if (options?.ifMatch && (!current || hashOf(current) !== options.ifMatch)) throw new BlobPreconditionFailedError();
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, body);
}

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID || process.env.VERCEL);
}

const SECRET_KEY = "crmx/session-secret.txt";
let cachedSecret: string | null = null;

async function readSecretBlob() {
  try {
    const file = await get(SECRET_KEY, { access: "private", useCache: false });
    if (!file?.stream) return null;
    return (await new Response(file.stream).text()).trim() || null;
  } catch {
    return null;
  }
}

/**
 * Ключ подписи сессий: SESSION_SECRET из env, иначе BLOB_READ_WRITE_TOKEN, иначе случайный ключ,
 * который создаётся один раз и хранится в приватном Blob (для хранилищ с OIDC, где токена нет).
 */
export async function loadSessionSecret(): Promise<string> {
  const env = process.env.SESSION_SECRET || process.env.BLOB_READ_WRITE_TOKEN;
  if (env) return env;
  if (cachedSecret) return cachedSecret;
  let secret = await readSecretBlob();
  if (!secret) {
    const fresh = randomBytes(32).toString("hex");
    try {
      await put(SECRET_KEY, fresh, {
        access: "private",
        addRandomSuffix: false,
        allowOverwrite: false,
        contentType: "text/plain",
      });
      secret = fresh;
    } catch {
      secret = await readSecretBlob(); // другой инстанс успел создать первым
    }
  }
  if (!secret) {
    if (process.env.VERCEL) throw new Error("Не удалось получить ключ сессий из Blob");
    secret = "crmx-local-dev-only";
  }
  cachedSecret = secret;
  return secret;
}

/** Состояние из Blob вместе с ETag версии (null — файла ещё нет). */
/**
 * Версия файла для условной записи. Берём её у самого хранилища (head), а не из ответа CDN на get:
 * CDN может отдать изменённый (weak/сжатый) ETag, и тогда ifMatch никогда не совпадёт.
 */
async function storeEtag(key: string): Promise<string | null> {
  if (LOCAL) {
    try {
      return hashOf(readFileSync(localPath(key)));
    } catch {
      return null;
    }
  }
  try {
    return (await blobHead(key)).etag || null;
  } catch (e) {
    if (e instanceof BlobNotFoundError || (e instanceof Error && e.name === "BlobNotFoundError")) return null;
    throw e;
  }
}

/**
 * withEtag — нужна версия для записи. Берём её ДО чтения: если файл поменялся после этого,
 * запись с ifMatch не пройдёт и updateSharedState повторит всё на свежих данных. Так содержимое
 * никогда не окажется новее версии, с которой мы пишем.
 */
async function loadBlobVersioned(withEtag = false): Promise<{ state: AppState; etag: string | null } | null> {
  const before = withEtag ? await storeEtag(KEY) : null;
  const file = await get(KEY, { access: "private", useCache: false });
  if (!file?.stream) return null;
  const text = await new Response(file.stream).text();
  if (!text) return null;
  return { state: normalizeState(JSON.parse(text)), etag: withEtag ? before : file.etag };
}

export async function loadBlobState(): Promise<AppState | null> {
  try {
    return (await loadBlobVersioned())?.state ?? null;
  } catch {
    return null;
  }
}

/**
 * Запись с защитой от гонок: ifMatch — только если файл не менялся с момента чтения;
 * без etag (файла ещё нет) — только создание, не перезапись.
 */
async function writeBlobState(state: AppState, etag: string | null) {
  await put(KEY, JSON.stringify(state), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: etag !== null,
    ...(etag ? { ifMatch: etag } : {}),
    contentType: "application/json",
    cacheControlMaxAge: 0,
  });
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
  // Креативный директор видит весь поток BRAND (один раз; дальше настраивает Owner).
  if (state.users.some((u) => u.id === "u-vladimir" && u.streams === undefined)) {
    state = { ...state, users: state.users.map((u) => (u.id === "u-vladimir" && u.streams === undefined ? { ...u, streams: ["BRAND"] } : u)) };
    changed = true;
  }
  return { state, changed };
}

type Via = "db" | "blob" | "seed";

/** Текущая версия: из Blob, иначе из Postgres (если доступен), иначе seed. etag null — Blob ещё пуст. */
async function loadVersioned(withEtag = false): Promise<{ state: AppState; etag: string | null; via: Via; changed: boolean }> {
  const blob = await loadBlobVersioned(withEtag);
  if (blob) return { ...applyMigrations(blob.state), etag: blob.etag, via: "blob" };
  const { getPrisma } = await import("./prisma");
  const { loadDbState } = await import("./persist");
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      if ((await prisma.user.count()) > 0) {
        return { ...applyMigrations(await loadDbState(prisma)), etag: null, via: "db", changed: true };
      }
    } catch {
      /* Postgres недоступен — работаем от Blob */
    }
  }
  return { state: seed, etag: null, via: "seed", changed: true };
}

/**
 * Копия в Postgres. Записи могут финишировать в другом порядке, чем попали в Blob, поэтому после
 * сохранения сверяемся с Blob: если там уже более новая версия (rev больше), кладём в базу её.
 * Кто сохраняет последним, тот и видит последнюю версию, так что база не откатывается на старую.
 */
async function mirrorToDb(state: AppState) {
  const { getPrisma } = await import("./prisma");
  const { saveDbState } = await import("./persist");
  const prisma = getPrisma();
  if (!prisma) return false;
  try {
    await prisma.$queryRaw`SELECT 1`;
    let current = state;
    for (let i = 0; i < 4; i++) {
      await saveDbState(prisma, current);
      const latest = await loadBlobVersioned().catch(() => null);
      if (!latest || (latest.state.rev ?? 0) <= (current.rev ?? 0)) break;
      current = latest.state;
    }
    return true;
  } catch {
    return false;
  }
}

const isConflict = (e: unknown) =>
  e instanceof BlobPreconditionFailedError ||
  (e instanceof Error && (e.name === "BlobPreconditionFailedError" || /exists|precondition/i.test(e.message)));

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
    const cur = await loadVersioned(true);
    const out = await change(cur.state);
    const changed = out.state ?? (cur.changed ? cur.state : undefined);
    if (!changed) return out.result as T & { via?: Via };
    const next = { ...changed, rev: (cur.state.rev ?? 0) + 1 };
    try {
      await writeBlobState(next, cur.etag);
    } catch (e) {
      if (!isConflict(e)) throw e;
      await new Promise((r) => setTimeout(r, 30 + Math.random() * 120 * (attempt + 1)));
      continue;
    }
    const db = await mirrorToDb(next);
    return Object.assign(out.result as object, { via: db ? "db" : "blob" }) as T & { via?: Via };
  }
  throw new StateConflictError();
}

/** Только чтение (миграции при необходимости сохраняются той же безопасной записью). */
export async function loadSharedState(): Promise<{ state: AppState; via: Via }> {
  const cur = await loadVersioned();
  if (cur.changed) {
    // Миграции сохраняем той же безопасной записью (с повторами), затем отдаём сохранённое.
    const saved = await updateSharedState((state) => ({ state, result: { state } }));
    return { state: saved.state, via: cur.via };
  }
  return { state: cur.state, via: cur.via };
}
