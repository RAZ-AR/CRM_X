export const PIN_RE = /^\d{4}$/;

export function isFourDigit(value: string) {
  return PIN_RE.test(value.trim());
}

export function unusedFourDigit(taken: Set<string>, avoid: string[] = []) {
  for (let i = 0; i < 200; i++) {
    const n = String(Math.floor(1000 + Math.random() * 9000));
    if (taken.has(n) || avoid.includes(n)) continue;
    return n;
  }
  return String(1000 + (Date.now() % 9000));
}

export function loginTaken(users: { id?: string; email: string }[], login: string, exceptId?: string) {
  const v = login.trim();
  return users.some((u) => sameLogin(u.email, v) && u.id !== exceptId);
}

/** Логин: имя латиницей/кириллицей, цифры, 2–32 символа. */
export function isValidLogin(value: string) {
  return /^[\p{L}\d._-]{2,32}$/u.test(value.trim());
}

/** Пароль: минимум 4 символа. */
export function isValidPassword(value: string) {
  const v = value.trim();
  return v.length >= 4 && v.length <= 64;
}

export function sameLogin(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
