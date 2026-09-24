import type { Task, User, Zone } from "./types";
import { addDays } from "./dates";
import { isCpo, subordinateIds } from "./access";
import { sameLogin } from "./pin";

export type QuickTask = { title: string; due: string; zone: string; assigneeId: string; note?: string };

/**
 * «Купить упаковку до 15.10 #wafl @karina» → задача.
 * Срок: «до ДД.ММ», «ДД.ММ(.ГГГГ)», «сегодня», «завтра»; по умолчанию +3 дня.
 * Проект: #slug или #название; по умолчанию ОБЩИЕ. Исполнитель: @логин, если можно назначать.
 */
export function parseQuickTask(text: string, today: string, zones: Zone[], users: User[], sender: User): QuickTask | { error: string } {
  let rest = ` ${text.trim()} `;
  let due = addDays(today, 3);
  let note: string | undefined;

  const date = rest.match(/\s(?:до\s+)?(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?(?=\s)/i);
  if (date) {
    const [, d, m, y] = date;
    const year = y ? (y.length === 2 ? `20${y}` : y) : today.slice(0, 4);
    let iso = `${year}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
    if (!y && iso < today) iso = `${Number(year) + 1}${iso.slice(4)}`;
    // Date нормализует 31.02 в 03.03 — сверяем компоненты, чтобы не поставить чужую дату.
    const parsed = new Date(`${iso}T00:00:00Z`);
    const real =
      parsed.getUTCFullYear() === Number(iso.slice(0, 4)) &&
      parsed.getUTCMonth() + 1 === Number(m) &&
      parsed.getUTCDate() === Number(d);
    if (!real) return { error: `Даты ${d}.${m} не существует. Пример: «до 15.10»` };
    due = iso;
    rest = rest.replace(date[0], " ");
  } else if (/\sзавтра(?=\s)/i.test(rest)) {
    due = addDays(today, 1);
    rest = rest.replace(/\s(?:до\s+)?завтра(?=\s)/i, " ");
  } else if (/\sсегодня(?=\s)/i.test(rest)) {
    due = today;
    rest = rest.replace(/\s(?:до\s+)?сегодня(?=\s)/i, " ");
  }

  let zone = zones.some((z) => z.slug === "common") ? "common" : zones[0]?.slug ?? "common";
  const tag = rest.match(/\s#([\p{L}\d_-]+)/u);
  if (tag) {
    const key = tag[1].toLowerCase();
    const z = zones.find((x) => x.slug === key || x.name.toLowerCase().replace(/\s+/g, "") === key);
    if (z) zone = z.slug;
    rest = rest.replace(tag[0], " ");
  }

  let assigneeId = sender.id;
  const at = rest.match(/\s@([\p{L}\d._-]+)/u);
  if (at) {
    const target = users.find((u) => sameLogin(u.email, at[1]) || sameLogin(u.name, at[1]));
    rest = rest.replace(at[0], " ");
    if (target && (target.id === sender.id || isCpo(sender) || subordinateIds(sender.id, users).includes(target.id))) {
      assigneeId = target.id;
    } else if (target) {
      note = `Назначить ${target.name} может только руководитель — задача записана на вас.`;
    }
  }

  const title = rest.replace(/\s+/g, " ").trim();
  if (title.length < 3) return { error: "Слишком короткое название. Пример: «Купить упаковку до 15.10 #wafl»" };
  return { title: title.slice(0, 200), due, zone, assigneeId, note };
}

export function quickTaskToTask(q: QuickTask, sender: User, today: string, id: string): Task {
  return {
    id,
    title: q.title,
    description: "Создано из Telegram",
    zone: q.zone,
    zones: [q.zone],
    assigneeId: q.assigneeId,
    authorId: sender.id,
    participantIds: [],
    startDate: today <= q.due ? today : q.due,
    due: q.due,
    priority: "medium",
    status: "todo",
    weight: 1,
    criticalPath: false,
    result: "",
    createdAt: today,
    attachments: [],
    code: "",
    wave: "",
    workstream: "",
    dependsOn: [],
    blockReason: "",
  };
}
