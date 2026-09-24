import { cookies } from "next/headers";
import { loadSharedState } from "./blobState";
import { seed } from "./seed";
import { sameLogin } from "./pin";
import { createSession, readSession, SESSION_MAX_AGE, verifyPassword } from "./auth";
import type { User } from "./types";

export const SESSION_COOKIE = "crmx_session";

export async function allUsers(): Promise<User[]> {
  try {
    const { state } = await loadSharedState();
    return state.users;
  } catch {
    return seed.users;
  }
}

export async function findUserByLogin(login: string, password: string): Promise<User | null> {
  const user = (await allUsers()).find((u) => sameLogin(u.email, login));
  return user && verifyPassword(password, user.password) ? user : null;
}

export async function sessionUser(): Promise<User | null> {
  const jar = await cookies();
  return readSession(jar.get(SESSION_COOKIE)?.value, await allUsers());
}

export function sessionCookie(user: User) {
  return {
    name: SESSION_COOKIE,
    value: createSession(user),
    options: {
      httpOnly: true,
      sameSite: "lax" as const,
      path: "/",
      maxAge: SESSION_MAX_AGE,
      secure: process.env.NODE_ENV === "production",
    },
  };
}
