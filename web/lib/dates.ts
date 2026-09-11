/** YYYY-MM-DD → ДД.ММ.ГГГГ */
export function formatDate(iso?: string | null) {
  if (!iso) return "—";
  const m = String(iso).slice(0, 10).match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!m) return iso;
  return `${m[3]}.${m[2]}.${m[1]}`;
}
