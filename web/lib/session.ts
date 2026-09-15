import { cookies } from "next/headers";
import { loadSharedState } from "./blobState";
import { seed } from "./seed";
import type { User } from "./types";

export const UID_COOKIE = "crmx_uid";

export async function readUid() {
  const jar = await cookies();
  return jar.get(UID_COOKIE)?.value ?? null;
}

export async function allUsers(): Promise<User[]> {
  try {
    const { state } = await loadSharedState();
    return state.users;
  } catch {
    return seed.users;
  }
}

export async function findUserById(id: string): Promise<User | null> {
  return (await allUsers()).find((u) => u.id === id) ?? null;
}

export async function findUserByLogin(email: string, password: string): Promise<User | null> {
  return (await allUsers()).find((u) => u.email === email && u.password === password) ?? null;
}

export async function sessionUser(): Promise<User | null> {
  const id = await readUid();
  if (!id) return null;
  return findUserById(id);
}
