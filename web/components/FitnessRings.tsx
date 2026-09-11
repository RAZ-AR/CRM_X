import type { Task, Zone } from "@/lib/types";
import { zoneTaskProgress } from "@/lib/readiness";

export function FitnessRings({ zones, tasks }: { zones: Zone[]; tasks: Task[] }) {
  const rings = zones.slice(0, 4);
  const size = 140;
  const cx = 70;
  const cy = 70;
  return (
    <div className="flex items-center gap-4">
      <svg width={size} height={size} viewBox="0 0 140 140">
        {rings.map((z, i) => {
          const r = 58 - i * 12;
          const p = zoneTaskProgress(z.slug, tasks) / 100;
          const c = 2 * Math.PI * r;
          return (
            <g key={z.slug}>
              <circle cx={cx} cy={cy} r={r} fill="none" stroke="#eee" strokeWidth="9" />
              <circle
                cx={cx}
                cy={cy}
                r={r}
                fill="none"
                stroke={z.color}
                strokeWidth="9"
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - p)}
                transform={`rotate(-90 ${cx} ${cy})`}
              />
            </g>
          );
        })}
      </svg>
      <div className="space-y-1 text-xs">
        {rings.map((z) => (
          <div key={z.slug} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ background: z.color }} />
            {z.name} {zoneTaskProgress(z.slug, tasks)}%
          </div>
        ))}
      </div>
    </div>
  );
}
