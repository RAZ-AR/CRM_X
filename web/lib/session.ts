import { cookies } from "next/headers";
import { getPrisma } from "./prisma";
import { loadDbState } from "./persist";
import { seed } from "./seed";
import type { User } from "./types";

export const UID_COOKIE = "crmx_uid";

export async function readUid() {
  const jar = await cookies();
  return jar.get(UID_COOKIE)?.value ?? null;
}

export async function findUserById(id: string): Promise<User | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const state = await loadDbState(prisma);
      return state.users.find((u) => u.id === id) ?? null;
    } catch {
      /* fall through */
    }
  }
  return seed.users.find((u) => u.id === id) ?? null;
}

export async function findUserByLogin(email: string, password: string): Promise<User | null> {
  const prisma = getPrisma();
  if (prisma) {
    try {
      const row = await prisma.user.findFirst({ where: { email, password } });
      if (row) {
        const state = await loadDbState(prisma);
        return state.users.find((u) => u.id === row.id) ?? null;
      }
    } catch {
      /* fall through */
    }
  }
  return seed.users.find((u) => u.email === email && u.password === password) ?? null;
}

export async function sessionUser(): Promise<User | null> {
  const id = await readUid();
  if (!id) return null;
  return findUserById(id);
}
