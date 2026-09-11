export function telHref(raw: string) {
  let n = raw.trim().replace(/[^\d+]/g, "");
  if (!n) return "";
  if (!n.startsWith("+")) n = "+" + n.replace(/^00/, "");
  return `tel:${n}`;
}

export function waHref(raw: string) {
  let n = raw.trim().replace(/\D/g, "");
  if (!n) return "";
  return `https://wa.me/${n}`;
}

export function tgHref(raw: string) {
  const u = raw.trim().replace(/^@/, "");
  if (!u) return "";
  return `https://t.me/${u}`;
}

export function displayPhone(raw: string) {
  let n = raw.trim().replace(/[^\d+]/g, "");
  if (n && !n.startsWith("+")) n = "+" + n.replace(/^00/, "");
  return n || raw;
}
