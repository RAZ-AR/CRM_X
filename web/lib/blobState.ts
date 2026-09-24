import { get, put } from "@vercel/blob";
import type { AppState } from "./types";
import { normalizeState } from "./normalize";
import { seed } from "./seed";

const KEY = "crmx/state.json";

export function blobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_STORE_ID || process.env.VERCEL);
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
