/* Prisma подключается только если сгенерирован клиент и есть DATABASE_URL */
export function getPrisma(): null | {
  user: { findFirst: Function; findMany: Function; deleteMany: Function; create: Function };
  zone: { findMany: Function; deleteMany: Function; create: Function };
  task: { findMany: Function; deleteMany: Function; create: Function };
  comment: { findMany: Function; deleteMany: Function; create: Function };
  subtask: { findMany: Function; deleteMany: Function; create: Function };
  wikiPage: { findMany: Function; deleteMany: Function; create: Function };
  notice: { findMany: Function; deleteMany: Function; create: Function };
  contact: { findMany: Function; deleteMany: Function; create: Function };
} {
  if (!process.env.DATABASE_URL) return null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { PrismaClient } = require("@prisma/client");
    const g = globalThis as unknown as { prisma?: unknown };
    if (!g.prisma) g.prisma = new PrismaClient();
    return g.prisma as ReturnType<typeof getPrisma>;
  } catch {
    return null;
  }
}
