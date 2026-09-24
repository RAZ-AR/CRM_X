import { canSeeTask, isCpo } from "./access";
import { RISK_STATUS, type AppState, type Risk, type RiskLevel, type User } from "./types";

export const LEVELS: Record<RiskLevel, string> = { 1: "Низкая", 2: "Средняя", 3: "Высокая" };

/** 1…9: вероятность × влияние. */
export function riskScore(r: Pick<Risk, "probability" | "impact">) {
  return r.probability * r.impact;
}

export function scoreColor(score: number) {
  if (score >= 6) return "#FECACA";
  if (score >= 3) return "#FDE68A";
  return "#E5E7EB";
}

/** Важные сверху: выше балл, раньше дата решения. Закрытые — в конце. */
export function sortRisks(risks: Risk[]) {
  return [...risks].sort((a, b) => {
    const ac = a.status === "closed" ? 1 : 0;
    const bc = b.status === "closed" ? 1 : 0;
    if (ac !== bc) return ac - bc;
    const d = riskScore(b) - riskScore(a);
    if (d) return d;
    return (a.decideBy || "9999").localeCompare(b.decideBy || "9999");
  });
}

export function topRisks(risks: Risk[], n = 3) {
  return sortRisks(risks.filter((r) => r.status !== "closed")).slice(0, n);
}

/** Править: Owner, автор, ответственный. Удалять: Owner и автор. */
export function canEditRisk(user: User, r: Risk) {
  return isCpo(user) || r.authorId === user.id || r.ownerId === user.id;
}

export function canDeleteRisk(user: User, r: Risk) {
  return isCpo(user) || r.authorId === user.id;
}

const ID = /^[A-Za-z0-9_-]{1,64}$/;
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const level = (x: unknown): RiskLevel | null => (x === 1 || x === 2 || x === 3 ? x : null);

export function parseRisk(
  raw: Partial<Risk>,
  state: AppState,
  user: User,
  prev?: Risk,
): { ok: true; value: Risk } | { ok: false; error: string } {
  if (!raw?.id || !ID.test(raw.id)) return { ok: false, error: "Неверный id" };
  const title = typeof raw.title === "string" ? raw.title.trim().slice(0, 200) : "";
  if (!title) return { ok: false, error: "Опишите риск" };
  if (!state.zones.some((z) => z.slug === raw.zone)) return { ok: false, error: "Нет такого проекта" };
  const probability = level(raw.probability);
  const impact = level(raw.impact);
  if (!probability || !impact) return { ok: false, error: "Вероятность и влияние: 1, 2 или 3" };
  if (!raw.ownerId || !state.users.some((u) => u.id === raw.ownerId)) return { ok: false, error: "Выберите ответственного" };
  if (raw.decideBy && !DATE.test(raw.decideBy)) return { ok: false, error: "Неверная дата" };
  if (!raw.status || !Object.hasOwn(RISK_STATUS, raw.status)) return { ok: false, error: "Неверный статус" };
  // Привязать можно только видимые задачи; уже привязанные скрытые от человека — сохраняем.
  const visible = new Set(state.tasks.filter((t) => canSeeTask(user, t, state.users)).map((t) => t.id));
  const hidden = (prev?.taskIds ?? []).filter((id) => !visible.has(id) && state.tasks.some((t) => t.id === id));
  const asked = Array.isArray(raw.taskIds) ? raw.taskIds.filter((id) => typeof id === "string" && visible.has(id)) : [];
  const taskIds = [...new Set([...asked, ...hidden])];
  return {
    ok: true,
    value: {
      id: raw.id,
      title,
      zone: raw.zone!,
      probability,
      impact,
      ownerId: raw.ownerId,
      planB: typeof raw.planB === "string" ? raw.planB.trim().slice(0, 1000) : "",
      decideBy: raw.decideBy || "",
      taskIds,
      status: raw.status,
      authorId: prev?.authorId ?? user.id,
      createdAt: prev?.createdAt ?? new Date().toISOString(),
    },
  };
}
