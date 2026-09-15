import type { PrismaClient } from "@prisma/client";
import type { AppState, Broadcast, Comment, Contact, Notice, Task, User, WikiPage } from "./types";
import { seed } from "./seed";
import { normalizeState } from "./normalize";

function j<T>(v: unknown, fallback: T): T {
  if (v == null) return fallback;
  return v as T;
}

export async function loadDbState(prisma: PrismaClient): Promise<AppState> {
  const [users, zones, tasks, comments, subtasks, wiki, notices, contacts] = await Promise.all([
    prisma.user.findMany(),
    prisma.zone.findMany(),
    prisma.task.findMany(),
    prisma.comment.findMany(),
    prisma.subtask.findMany(),
    prisma.wikiPage.findMany(),
    prisma.notice.findMany(),
    prisma.contact.findMany(),
  ]);
  let broadcasts: { text: string; emoji: string; authorId: string; updatedAt: string }[] = [];
  try {
    broadcasts = await prisma.broadcast.findMany();
  } catch {
    broadcasts = [];
  }

  const b = broadcasts[0];
  return normalizeState({
    users: users.map((u) => ({
      ...(u as unknown as User),
      permissions: j(u.permissions, [] as User["permissions"]),
      boardZones: j(u.boardZones, [] as string[]),
    })),
    zones: zones.map((z) => ({
      ...z,
      readiness: j(z.readiness, seed.zones[0].readiness),
    })),
    tasks: tasks.map((t) => ({
      ...(t as unknown as Task),
      zones: j(t.zones, [] as string[]),
      participantIds: j(t.participantIds, [] as string[]),
      attachments: j(t.attachments, [] as Task["attachments"]),
      dependsOn: j(t.dependsOn, [] as string[]),
    })),
    comments: comments.map((c) => {
      const row = c as unknown as Comment;
      return { ...row, reactions: j(row.reactions as unknown as Comment["reactions"], []) };
    }),
    subtasks,
    wiki: wiki as WikiPage[],
    contacts: contacts.map((c) => ({
      ...(c as unknown as Contact),
      telegram: (c as { telegram?: string }).telegram || "",
      whatsapp: (c as { whatsapp?: string }).whatsapp || "",
    })),
    notices: notices as Notice[],
    broadcast: b
      ? {
          text: b.text,
          emoji: b.emoji,
          authorId: b.authorId,
          updatedAt: b.updatedAt,
        }
      : null,
  });
}

export async function saveDbState(prisma: PrismaClient, state: AppState) {
  await prisma.$transaction(async (tx) => {
    await tx.notice.deleteMany();
    await tx.comment.deleteMany();
    await tx.subtask.deleteMany();
    await tx.task.deleteMany();
    await tx.wikiPage.deleteMany();
    await tx.contact.deleteMany();
    await tx.broadcast.deleteMany();
    await tx.user.deleteMany();
    await tx.zone.deleteMany();

    if (state.zones.length) {
      await tx.zone.createMany({
        data: state.zones.map((z) => ({
          slug: z.slug,
          name: z.name,
          emoji: z.emoji,
          color: z.color,
          deadline: z.deadline,
          readiness: z.readiness,
        })),
      });
    }
    if (state.users.length) {
      await tx.user.createMany({
        data: state.users.map((u) => ({
          id: u.id,
          email: u.email,
          password: u.password,
          name: u.name,
          role: u.role,
          zone: u.zone,
          title: u.title,
          avatar: u.avatar,
          permissions: u.permissions,
          boardZones: u.boardZones,
          managerId: u.managerId,
        })),
      });
    }
    if (state.tasks.length) {
      await tx.task.createMany({
        data: state.tasks.map((t) => ({
          id: t.id,
          title: t.title,
          description: t.description,
          zone: t.zone,
          zones: t.zones,
          assigneeId: t.assigneeId,
          authorId: t.authorId,
          participantIds: t.participantIds,
          startDate: t.startDate,
          due: t.due,
          priority: t.priority,
          status: t.status,
          weight: t.weight,
          criticalPath: t.criticalPath,
          result: t.result,
          createdAt: t.createdAt,
          attachments: t.attachments,
          code: t.code,
          wave: t.wave,
          workstream: t.workstream,
          dependsOn: t.dependsOn,
          blockReason: t.blockReason ?? "",
        })),
      });
    }
    if (state.comments.length) {
      await tx.comment.createMany({
        data: state.comments.map((c) => ({
          id: c.id,
          taskId: c.taskId,
          userId: c.userId,
          text: c.text,
          createdAt: c.createdAt,
          reactions: c.reactions ?? [],
        })),
      });
    }
    if (state.subtasks.length) {
      await tx.subtask.createMany({ data: state.subtasks });
    }
    if (state.wiki.length) {
      await tx.wikiPage.createMany({ data: state.wiki });
    }
    if (state.contacts.length) {
      await tx.contact.createMany({
        data: state.contacts.map((c) => ({
          id: c.id,
          name: c.name,
          company: c.company,
          title: c.title,
          phone: c.phone,
          email: c.email,
          telegram: c.telegram || "",
          whatsapp: c.whatsapp || "",
          zone: c.zone,
          kind: c.kind,
        })),
      });
    }
    if (state.notices.length) {
      await tx.notice.createMany({
        data: state.notices.map((n) => ({
          id: n.id,
          userId: n.userId,
          text: n.text,
          taskId: n.taskId ?? null,
          createdAt: n.createdAt,
          read: n.read,
          readAt: n.readAt ?? null,
          kind: n.kind ?? null,
        })),
      });
    }
    if (state.broadcast) {
      const b: Broadcast = state.broadcast;
      await tx.broadcast.create({
        data: {
          id: "main",
          text: b.text,
          emoji: b.emoji,
          authorId: b.authorId,
          updatedAt: b.updatedAt,
        },
      });
    }
  });
}
