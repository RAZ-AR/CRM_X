import { OTHER, SERIES } from "@/components/Charts";
import { addDays, diffDays, shortDate, weekStart } from "./dates";
import type { Task, Zone } from "./types";

/**
 * Нагрузка по неделям: 8 недель вперёд от недели picked, три самых загруженных проекта цветом,
 * остальное — «Прочие». markers — даты запусков проектов внутри окна (zone — фильтр проекта или "all").
 */
export function weekLoad(list: Task[], zones: Zone[], picked: string, zone = "all") {
  const w0 = weekStart(picked);
  const weekStarts = Array.from({ length: 8 }, (_, i) => addDays(w0, i * 7));
  const wEnd = addDays(w0, 8 * 7);
  const inWindow = list.filter((t) => t.due >= w0 && t.due < wEnd);
  const zoneCount = new Map<string, number>();
  for (const t of inWindow) zoneCount.set(t.zone, (zoneCount.get(t.zone) ?? 0) + 1);
  const topZones = [...zoneCount.entries()].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([z]) => z);
  const hasOther = [...zoneCount.keys()].some((z) => !topZones.includes(z));
  const series = [
    ...topZones.map((z, i) => ({ name: zones.find((x) => x.slug === z)?.name ?? z, color: SERIES[i] as string })),
    ...(hasOther ? [{ name: "Прочие", color: OTHER }] : []),
  ];
  const weeks = weekStarts.map((ws) => {
    const inWeek = inWindow.filter((t) => t.due >= ws && t.due < addDays(ws, 7));
    const values = topZones.map((z) => inWeek.filter((t) => t.zone === z).length);
    if (hasOther) values.push(inWeek.filter((t) => !topZones.includes(t.zone)).length);
    return { label: shortDate(ws), title: `Неделя с ${shortDate(ws)}`, values };
  });
  const markers = zones
    .filter((z) => z.slug !== "common" && z.deadline >= w0 && z.deadline < wEnd && (zone === "all" || z.slug === zone))
    .map((z) => {
      const d = diffDays(w0, z.deadline);
      return { index: Math.floor(d / 7), frac: ((d % 7) + 0.5) / 7, label: `${z.name} ${shortDate(z.deadline)}` };
    });
  return { inWindow, series, weeks, markers };
}
