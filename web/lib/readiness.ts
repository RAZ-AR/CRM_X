import type { Zone } from "./types";
import { READINESS_BLOCKS } from "./types";

export function zoneReadiness(zone: Zone) {
  const vals = READINESS_BLOCKS.map((b) => zone.readiness[b]);
  return Math.round(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function projectReadiness(zones: Zone[]) {
  if (!zones.length) return 0;
  return Math.round(
    zones.reduce((s, z) => s + zoneReadiness(z), 0) / zones.length,
  );
}

export const BLOCK_COLORS: Record<string, string> = {
  SPACE: "#86EFAC",
  EQUIPMENT: "#FDE68A",
  TEAM: "#93C5FD",
  PRODUCT: "#F9A8D4",
  IT: "#C4B5FD",
  MARKETING: "#FDBA74",
  OPERATIONS: "#67E8F9",
  READY: "#A7F3D0",
};
