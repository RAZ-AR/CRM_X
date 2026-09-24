/** YYYY-MM-DD → ДД.ММ.ГГГГ */
export function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const m = String(iso).slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  return `${m[3]}.${m[2]}.${m[1]}`;
}

const DAY = 86400000;

function toDay(iso: string) {
  return Date.UTC(Number(iso.slice(0, 4)), Number(iso.slice(5, 7)) - 1, Number(iso.slice(8, 10)));
}

function fromDay(ms: number) {
  return new Date(ms).toISOString().slice(0, 10);
}

/** YYYY-MM-DD + n дней. */
export function addDays(iso: string, n: number) {
  return fromDay(toDay(iso) + n * DAY);
}

/** Сколько дней от a до b (b − a). */
export function diffDays(a: string, b: string) {
  return Math.round((toDay(b) - toDay(a)) / DAY);
}

/** Понедельник недели, в которую попадает дата. */
export function weekStart(iso: string) {
  const dow = new Date(toDay(iso)).getUTCDay() || 7;
  return addDays(iso, 1 - dow);
}

/** Сегодня по Еревану (UTC+4), YYYY-MM-DD. */
export function todayYerevan(now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Yerevan" }).format(now);
}

/** ДД.ММ */
export function shortDate(iso?: string | null) {
  return formatDate(iso).slice(0, 5);
}
