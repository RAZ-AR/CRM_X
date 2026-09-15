import type { PrismaClient } from "@prisma/client";

export function getPrisma(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient: PC } = require("@prisma/client");
    const g = globalThis as unknown as { prisma?: PrismaClient };
    if (!g.prisma) g.prisma = new PC();
    return g.prisma;
  } catch {
    return null;
  }
}
