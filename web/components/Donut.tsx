"use client";

import { streamProgress } from "@/lib/readiness";
import type { Task } from "@/lib/types";

export function Donut({
  percent,
  slices,
  size = 220,
  label = "Ready",
}: {
  percent: number;
  slices?: { key: string; value: number; color: string }[];
  size?: number;
  label?: string;
}) {
  const r = 70;
  const c = 2 * Math.PI * r;
  const stroke = c * (1 - Math.min(100, Math.max(0, percent)) / 100);

  if (slices && slices.length) {
    const total = slices.reduce((s, x) => s + x.value, 0) || 1;
    let acc = 0;
    const paths = slices.map((s) => {
      const start = (acc / total) * 360 - 90;
      acc += s.value;
      const end = (acc / total) * 360 - 90;
      return { ...s, d: arc(size / 2, size / 2, r, start, end) };
    });
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {paths.map((p) => (
          <path
            key={p.key}
            d={p.d}
            fill="none"
            stroke={p.color}
            strokeWidth="22"
            strokeLinecap="round"
          />
        ))}
        <text
          x="50%"
          y="48%"
          textAnchor="middle"
          className="fill-[var(--ink)]"
          fontSize="32"
          fontWeight="600"
        >
          {percent}%
        </text>
        <text
          x="50%"
          y="62%"
          textAnchor="middle"
          className="fill-gray-400"
          fontSize="12"
        >
          {label}
        </text>
      </svg>
    );
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#EEF0F4"
        strokeWidth="22"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke="#24382c"
        strokeWidth="22"
        strokeDasharray={c}
        strokeDashoffset={stroke}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="48%"
        textAnchor="middle"
        fontSize="32"
        fontWeight="600"
      >
        {percent}%
      </text>
      <text x="50%" y="62%" textAnchor="middle" fontSize="12" fill="#9CA3AF">
        {label}
      </text>
    </svg>
  );
}

function polar(cx: number, cy: number, r: number, deg: number) {
  const rad = (deg * Math.PI) / 180;
  return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
}

function arc(cx: number, cy: number, r: number, start: number, end: number) {
  const [x1, y1] = polar(cx, cy, r, start);
  const [x2, y2] = polar(cx, cy, r, end);
  const large = end - start > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2}`;
}

export function zoneSlices(tasks: Task[]) {
  return streamProgress(tasks)
    .filter((s) => s.total > 0)
    .map((s) => ({ key: s.stream, value: Math.max(s.pct, 1), color: s.color }));
}
