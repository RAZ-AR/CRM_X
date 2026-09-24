"use client";

import { useEffect, useRef, useState } from "react";

/** Цвета данных: один акцент + два для различения проектов; прочее — серый. Статусный красный — только для проблем. */
export const SERIES = ["#2a78d6", "#eb6834", "#1baf7a"] as const;
export const OTHER = "#c8c6bf";
export const TRACK = "#efede8";
export const RED = "#c9302f";

/** Ширина контейнера для SVG-графиков (чтобы подписи не растягивались). */
export function useWidth<T extends HTMLElement>(initial = 600) {
  const ref = useRef<T>(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.max(160, Math.floor(e.contentRect.width))));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export function Ring({ pct, size = 128, stroke = 12, label = "готовность" }: { pct: number; size?: number; stroke?: number; label?: string }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const len = (c * Math.max(0, Math.min(100, pct))) / 100;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} role="img" aria-label={`${label} ${pct}%`} className="shrink-0">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={TRACK} strokeWidth={stroke} />
      {len > 0 && (
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={SERIES[0]}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${len} ${c}`}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      )}
      <text x={size / 2} y={size / 2 + 2} textAnchor="middle" fontSize={size * 0.23} fontWeight={600} fill="var(--ink)" style={{ letterSpacing: "-0.02em" }}>
        {pct}%
      </text>
      <text x={size / 2} y={size / 2 + size * 0.17} textAnchor="middle" fontSize={11} fill="var(--muted)">
        {label}
      </text>
    </svg>
  );
}

/** Мини-график: линия с точкой на последнем значении или столбики (последний — акцентом). */
export function Spark({
  values,
  labels,
  width = 110,
  height = 40,
  color = SERIES[0],
  bars = false,
}: {
  values: number[];
  labels?: string[];
  width?: number;
  height?: number;
  color?: string;
  bars?: boolean;
}) {
  const n = values.length;
  if (!n) return null;
  const mx = Math.max(1, ...values);
  if (bars) {
    const slot = width / n;
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="shrink-0">
        {values.map((v, i) => {
          const h = Math.max(2, ((height - 2) * v) / mx);
          return (
            <rect key={i} x={i * slot + 2} y={height - h} width={Math.max(2, slot - 4)} height={h} rx={2} fill={i === n - 1 ? color : "#bcd3f1"}>
              <title>{`${labels?.[i] ?? ""} ${v}`.trim()}</title>
            </rect>
          );
        })}
      </svg>
    );
  }
  const pts = values.map((v, i) => [3 + (i * (width - 6)) / Math.max(1, n - 1), height - 4 - ((height - 8) * v) / mx] as const);
  const [lx, ly] = pts[pts.length - 1];
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true" className="shrink-0">
      <path d={`M${pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L")}`} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={lx} cy={ly} r={4} fill={color} stroke="var(--card)" strokeWidth={2} />
    </svg>
  );
}

export type WeekStack = { label: string; title: string; values: number[] };

/** Столбики по неделям, сложенные по сериям; вертикальные пунктиры — даты запусков. */
export function StackedWeeks({
  weeks,
  series,
  markers,
  height = 240,
}: {
  weeks: WeekStack[];
  series: { name: string; color: string }[];
  markers: { index: number; frac: number; label: string }[];
  height?: number;
}) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const left = 28;
  const right = 4;
  const top = 18;
  const bottom = 24;
  const pw = width - left - right;
  const ph = height - top - bottom;
  const max = Math.max(4, ...weeks.map((w) => w.values.reduce((a, b) => a + b, 0)));
  const step = max <= 8 ? 2 : max <= 20 ? 5 : 10;
  const ymax = Math.ceil(max / step) * step;
  const ticks = Array.from({ length: ymax / step + 1 }, (_, i) => i * step);
  const slot = pw / Math.max(1, weeks.length);
  const bw = Math.min(40, slot * 0.56);
  return (
    <div ref={ref} className="w-full">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} role="img" aria-label={`Задачи со сроком по неделям: ${series.map((s) => s.name).join(", ")}`}>
        {ticks.map((v) => {
          const y = top + ph - (ph * v) / ymax;
          return (
            <g key={v}>
              <line x1={left} x2={width - right} y1={y} y2={y} stroke="var(--line)" strokeWidth={1} />
              <text x={left - 8} y={y + 4} fontSize={11} fill="var(--muted)" textAnchor="end">{v}</text>
            </g>
          );
        })}
        {markers.map((m) => {
          const x = left + slot * m.index + slot * m.frac;
          return (
            <g key={m.label}>
              <line x1={x} x2={x} y1={top - 4} y2={top + ph} stroke="var(--ink)" strokeWidth={1} strokeDasharray="3 3" />
              <text x={x > width - 90 ? x - 5 : x + 5} y={top + 6} fontSize={11} fontWeight={600} fill="var(--ink)" textAnchor={x > width - 90 ? "end" : "start"}>
                {width < 520 ? m.label.split(" ").slice(-1)[0] : m.label}
              </text>
            </g>
          );
        })}
        {weeks.map((w, i) => {
          const x = left + slot * i + (slot - bw) / 2;
          let y = top + ph;
          const segs = w.values.map((v, j) => ({ v, j })).filter((s) => s.v > 0);
          const total = w.values.reduce((a, b) => a + b, 0);
          return (
            <g key={w.label}>
              <title>{`${w.title}: ${w.values.map((v, j) => `${series[j].name} ${v}`).filter((_, j) => w.values[j] > 0).join(", ") || "нет задач"}`}</title>
              <rect x={left + slot * i} y={top} width={slot} height={ph} fill="transparent" />
              {segs.map(({ v, j }, k) => {
                const h = (ph * v) / ymax;
                const gap = k > 0 ? 2 : 0;
                const hh = Math.max(1, h - gap);
                y -= h;
                const last = k === segs.length - 1;
                if (!last) return <rect key={j} x={x} y={y} width={bw} height={hh} fill={series[j].color} />;
                const r = Math.min(4, hh / 2, bw / 2);
                const x1 = x + bw;
                const yb = y + hh;
                return (
                  <path
                    key={j}
                    d={`M${x},${yb} L${x},${y + r} Q${x},${y} ${x + r},${y} L${x1 - r},${y} Q${x1},${y} ${x1},${y + r} L${x1},${yb} Z`}
                    fill={series[j].color}
                  />
                );
              })}
              {total > 0 && (
                <text x={x + bw / 2} y={y - 6} fontSize={11} fontWeight={600} fill="var(--ink-2)" textAnchor="middle">{total}</text>
              )}
              <text x={x + bw / 2} y={height - 6} fontSize={11} fill="var(--muted)" textAnchor="middle">{w.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function Legend({ items }: { items: { name: string; color: string }[] }) {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-1">
      {items.map((i) => (
        <span key={i.name} className="cap inline-flex items-center gap-1.5 !text-[var(--ink-2)]">
          <span className="h-2.5 w-2.5 rounded-[3px]" style={{ background: i.color }} />
          {i.name}
        </span>
      ))}
    </div>
  );
}

/** Тонкая полоса прогресса. */
export function Meter({ pct, color = SERIES[0], height = 6 }: { pct: number; color?: string; height?: number }) {
  return (
    <div className="rounded-full overflow-hidden" style={{ height, background: TRACK }} role="presentation">
      <div className="rounded-full" style={{ width: `${Math.max(0, Math.min(100, pct))}%`, height, background: color }} />
    </div>
  );
}
