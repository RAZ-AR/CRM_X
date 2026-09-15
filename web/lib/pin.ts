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
  return users.some((u) => u.email === v && u.id !== exceptId);
}
