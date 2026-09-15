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

export async function loadSharedState(): Promise<{ state: AppState; via: "db" | "blob" | "seed" }> {
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
