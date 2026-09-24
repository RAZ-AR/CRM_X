export function Ring({
  percent,
  size = 140,
  color = "#111",
  track = "#EFEFF4",
  label,
  sub,
}: {
  percent: number;
  size?: number;
  color?: string;
  track?: string;
  label?: string;
  sub?: string;
}) {
  const p = Math.min(100, Math.max(0, percent));
  const r = 42;
  const c = 2 * Math.PI * r;
  const off = c * (1 - p / 100);
  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={r} fill="none" stroke={track} strokeWidth="14" />
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke={color}
        strokeWidth="14"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={off}
        transform="rotate(-90 60 60)"
      />
      <text x="60" y={label ? 56 : 64} textAnchor="middle" fontSize="22" fontWeight="700" fill="#111">
        {Math.round(p)}%
      </text>
      {label && (
        <text x="60" y="74" textAnchor="middle" fontSize="10" fill="#6F6E69">
          {label}
        </text>
      )}
    </svg>
  );
}
