import type { Task, ZoneSlug } from "./types";

export const STAGES: { id: string; name: string; zones: ZoneSlug[] }[] = [
  { id: "start", name: "Start", zones: [] },
  { id: "design", name: "Design", zones: ["wafl"] },
  { id: "build", name: "Build", zones: ["wafl", "kitchen"] },
  { id: "equipment", name: "Equipment", zones: ["wafl", "kitchen"] },
  { id: "team", name: "Team", zones: ["wafl", "kitchen", "cafe"] },
  { id: "ops", name: "Ops", zones: ["cafe"] },
  { id: "it", name: "IT", zones: ["cafe", "kitchen"] },
  { id: "mkt", name: "Marketing", zones: ["comx", "wafl"] },
  { id: "test", name: "Test", zones: ["wafl", "kitchen"] },
  { id: "open", name: "Open", zones: [] },
];

export function tasksForStage(tasks: Task[], stageId: string) {
  const s = STAGES.find((x) => x.id === stageId);
  if (!s) return tasks;
  if (!s.zones.length) return tasks.filter((t) => t.status !== "done");
  return tasks.filter((t) => {
    const zs = t.zones?.length ? t.zones : [t.zone];
    return zs.some((z) => s.zones.includes(z)) && t.status !== "done";
  });
}
