import { randomBytes } from "node:crypto";
import { get as blobGet, put as blobPut } from "@vercel/blob";
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

async function get(key: string, options: GetOptions) {
  if (!LOCAL) return blobGet(key, options);
  try {
    return { stream: new Blob([readFileSync(localPath(key))]).stream() };
  } catch {
    return null;
  }
}

async function put(key: string, body: string, options: PutOptions) {
  if (!LOCAL) return blobPut(key, body, options);
  const file = localPath(key);
  if (options?.allowOverwrite === false) {
    try {
      readFileSync(file);
      throw new Error("exists");
    } catch (e) {
      if (e instanceof Error && e.message === "exists") throw e;
    }
  }
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

export async function loadBlobState(): Promise<AppState | null> {
  try {
    const file = await get(KEY, { access: "private", useCache: false });
    if (!file?.stream) return null;
    const text = await new Response(file.stream).text();
    if (!text) return null;
    return normalizeState(JSON.parse(text));
  } catch {
    return null;
  }
}

export async function saveBlobState(state: AppState) {
  await put(KEY, JSON.stringify(state), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
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

export async function loadSharedState(): Promise<{ state: AppState; via: "db" | "blob" | "seed" }> {
  const loaded = await loadStoredState();
  let state = loaded.state;
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
  if (changed) await saveSharedState(state);
  return { ...loaded, state };
}

async function loadStoredState(): Promise<{ state: AppState; via: "db" | "blob" | "seed" }> {
  const blob = await loadBlobState();
  if (blob) return { state: blob, via: "blob" };
  const { getPrisma } = await import("./prisma");
  const { loadDbState, saveDbState } = await import("./persist");
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      const count = await prisma.user.count();
      if (count === 0) {
        await saveDbState(prisma, seed);
        await saveBlobState(seed);
        return { state: seed, via: "db" };
      }
      const state = await loadDbState(prisma);
      await saveBlobState(state);
      return { state, via: "db" };
    } catch {
      /* Aiven unreachable from Vercel */
    }
  }
  await saveBlobState(seed);
  return { state: seed, via: "seed" };
}

export async function saveSharedState(state: AppState) {
  let via: "db" | "blob" = "blob";
  await saveBlobState(state);
  const { getPrisma } = await import("./prisma");
  const { saveDbState } = await import("./persist");
  const prisma = getPrisma();
  if (prisma) {
    try {
      await prisma.$queryRaw`SELECT 1`;
      await saveDbState(prisma, state);
      via = "db";
    } catch {
      /* Vercel often cannot reach Aiven; blob is source of truth */
    }
  }
  return via;
}
