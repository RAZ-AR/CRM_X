import { PrismaClient } from "@prisma/client";
import { seed } from "../lib/seed";

const prisma = new PrismaClient();

async function main() {
  await prisma.notice.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.wikiPage.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
  await prisma.zone.deleteMany();
  for (const z of seed.zones) await prisma.zone.create({ data: z as never });
  for (const u of seed.users) await prisma.user.create({ data: u as never });
  for (const t of seed.tasks) await prisma.task.create({ data: t as never });
  for (const w of seed.wiki) await prisma.wikiPage.create({ data: w as never });
  for (const c of seed.contacts) {
    const { telegram, whatsapp, ...rest } = c as never as Record<string, unknown>;
    await prisma.contact.create({ data: rest as never });
  }
  for (const n of seed.notices) await prisma.notice.create({ data: n as never });
  console.log("seeded", seed.tasks.length, "tasks", seed.users.length, "users");
}

main().finally(() => prisma.$disconnect());
