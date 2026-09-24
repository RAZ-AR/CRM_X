import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "node:crypto";
import type { User } from "./types";

/** Только сервер: хэши паролей и подписанная сессия. */

const HASH_PREFIX = "scrypt$";
const SESSION_DAYS = 30;

export function isHashed(stored: string) {
  return stored.startsWith(HASH_PREFIX);
}

export function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${HASH_PREFIX}${salt}$${hash}`;
}

function safeEqual(a: string, b: string) {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

/** Поддерживает старые пароли открытым текстом — они перехэшируются при входе. */
export function verifyPassword(password: string, stored: string) {
  if (!stored || !password) return false;
  if (!isHashed(stored)) return safeEqual(password, stored);
  const [, salt, hash] = stored.split("$");
  return safeEqual(scryptSync(password, salt, 32).toString("hex"), hash);
}

/** Хэш, если пришёл открытый текст; пусто — пусто. */
export function ensureHashed(password: string) {
  if (!password) return "";
  return isHashed(password) ? password : hashPassword(password);
}

function sign(payload: string, secret: string) {
  const key = createHash("sha256").update(`crmx-session:${secret}`).digest();
  return createHmac("sha256", key).update(payload).digest("base64url");
}

/** Отпечаток пароля в сессии: смена пароля разлогинивает остальные устройства. */
function passwordMark(stored: string) {
  return createHash("sha256").update(stored).digest("base64url").slice(0, 12);
}

export const SESSION_MAX_AGE = 60 * 60 * 24 * SESSION_DAYS;

export function createSession(user: User, secret: string) {
  const exp = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `${user.id}.${exp}.${passwordMark(user.password)}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function readSession(token: string | undefined | null, users: User[], secret: string): User | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length < 4) return null;
  const sig = parts.pop()!;
  const payload = parts.join(".");
  if (!safeEqual(sig, sign(payload, secret))) return null;
  const mark = parts.pop()!;
  const exp = Number(parts.pop());
  const uid = parts.join(".");
  if (!Number.isFinite(exp) || exp < Date.now()) return null;
  const user = users.find((u) => u.id === uid);
  if (!user || passwordMark(user.password) !== mark) return null;
  return user;
}

/** Грубый лимит попыток входа: 5 ошибок за 15 минут на пару IP + логин. */
const attempts = new Map<string, { n: number; until: number }>();
const WINDOW = 15 * 60 * 1000;

export function loginBlocked(key: string) {
  const a = attempts.get(key);
  if (!a || a.until < Date.now()) return false;
  return a.n >= 5;
}

export function loginFailed(key: string) {
  const a = attempts.get(key);
  if (!a || a.until < Date.now()) attempts.set(key, { n: 1, until: Date.now() + WINDOW });
  else a.n += 1;
}

export function loginSucceeded(key: string) {
  attempts.delete(key);
}
