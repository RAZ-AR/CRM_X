import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prisma = new PrismaClient();

async function main() {
  const { seed } = await import("../lib/seed.ts");
  await prisma.notice.deleteMany();
  await prisma.comment.deleteMany();
  await prisma.subtask.deleteMany();
  await prisma.task.deleteMany();
  await prisma.wikiPage.deleteMany();
  await prisma.contact.deleteMany();
  await prisma.user.deleteMany();
  await prisma.zone.deleteMany();

  for (const z of seed.zones) {
    await prisma.zone.create({ data: { ...z, readiness: z.readiness } });
  }
  for (const u of seed.users) {
    await prisma.user.create({
      data: {
        ...u,
        permissions: u.permissions,
        boardZones: u.boardZones ?? [],
      },
    });
  }
  for (const t of seed.tasks) {
    await prisma.task.create({
      data: {
        ...t,
        zones: t.zones ?? [t.zone],
        participantIds: t.participantIds,
        attachments: t.attachments,
        dependsOn: t.dependsOn ?? [],
      },
    });
  }
  for (const c of seed.comments) await prisma.comment.create({ data: c });
  for (const s of seed.subtasks) await prisma.subtask.create({ data: s });
  for (const w of seed.wiki) await prisma.wikiPage.create({ data: w });
  for (const c of seed.contacts) await prisma.contact.create({ data: c });
  for (const n of seed.notices) await prisma.notice.create({ data: n });
  console.log("seeded", seed.tasks.length, "tasks");
}

main().finally(() => prisma.$disconnect());
