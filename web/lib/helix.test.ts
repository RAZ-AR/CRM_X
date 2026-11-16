import assert from "node:assert/strict";
import test from "node:test";
import { applyHelix, flattenHelix, mapHelix, userMatcher, type HelixTask } from "./helix";
import type { AppState, User } from "./types";

const u = (id: string, name: string) => ({ id, name, email: name, password: "", role: "employee", zone: null, title: "", avatar: "", permissions: [], boardZones: [], managerId: null }) as unknown as User;
const users = [u("u-armen", "Armen"), u("u-vladimir", "Vladimir"), u("u-karina", "Karina"), u("u-artur", "Artur")];

const helix: HelixTask[] = [
  { id: 1, title: "Согласования", status: "backlog", priority: "high", project_path: "XSpace",
    assignees: [{ name: "Armen Razmikovich" }, { name: "Arthur Grigoryan" }], setters: [{ name: "Armen Razmikovich" }],
    deadline: "2026-11-11", todos: [{ id: 7, text: "Повестка", done: false }],
    subtasks: [{ id: 2, title: "Под-задача WAFL", status: "on_hold", project_path: "XSpace / WAFL", assignees: [{ name: "Vladimir Neznamov" }], directions: [{ name: "Ремонтные работы" }] }] },
  { id: 3, title: "Чужая задача", status: "in_progress", assignees: [{ name: "Satenik Orbelyan" }] },
  { id: 4, title: "Karine", status: "done", project_path: "XSpace / Кафе", assignees: [{ name: "Karine Nazaryan" }, { name: "Lavrent" }] },
];

const base = (tasks: { id: string; status?: string }[] = []) => ({
  users, zones: [], tasks: tasks.map((t) => ({ id: t.id, status: t.status || "todo", title: t.id })), comments: [], subtasks: [], wiki: [],
  contacts: [], notices: [{ id: "n1", taskId: "old", userId: "u-armen" }, { id: "n2", userId: "u-armen" }], broadcast: null, activity: [],
}) as unknown as AppState;

test("имена Helix сопоставляются с командой", () => {
  const who = userMatcher(users);
  assert.equal(who("Arthur Grigoryan"), "u-artur");
  assert.equal(who("Karine Nazaryan"), "u-karina");
  assert.equal(who("Armen Razmikovich"), "u-armen");
  assert.equal(who("Satenik Orbelyan"), null);
  assert.equal(userMatcher(users, { "Satenik Orbelyan": "u-karina" })("Satenik Orbelyan"), "u-karina");
});

test("в Quicky попадают задачи команды, чужие — нет", () => {
  const m = mapHelix(flattenHelix(helix), users);
  assert.deepEqual(m.tasks.map((t) => t.id), ["hx-1", "hx-2", "hx-4"]);
  const t1 = m.tasks[0];
  assert.equal(t1.assigneeId, "u-armen");
  assert.deepEqual(t1.participantIds, ["u-artur"]);
  assert.equal(t1.status, "todo");
  assert.equal(t1.criticalPath, true);
  const t2 = m.tasks[1];
  assert.equal(t2.assigneeId, "u-vladimir");
  assert.equal(t2.status, "blocked");
  assert.equal(t2.zone, "wafl");
  assert.equal(t2.workstream, "SPACE & BUILD");
  assert.match(t2.description, /Входит в: Согласования/);
  assert.equal(m.tasks[2].zone, "cafe");
  assert.deepEqual(m.subtasks.map((s) => s.id), ["hx-1-c7"]);
  assert.deepEqual(m.unmapped, ["Lavrent", "Satenik Orbelyan"]);
});

test("первый импорт убирает старые задачи и их ссылки", () => {
  const m = mapHelix(flattenHelix(helix), users);
  const { next, changes } = applyHelix(base([{ id: "old" }]), m, "2026-11-15T00:00:00Z");
  assert.equal(changes.first, true);
  assert.deepEqual(next.tasks.map((t) => t.id), ["hx-1", "hx-2", "hx-4"]);
  assert.deepEqual(next.notices.map((n) => n.id), ["n2"]);
  assert.equal(next.helixSync?.count, 3);
});

test("следующие запуски сохраняют задачи, созданные в Quicky, и видят смену статуса", () => {
  const m = mapHelix(flattenHelix(helix), users);
  const st = { ...base([{ id: "hx-1", status: "in_progress" }, { id: "local" }]), helixSync: { at: "x", count: 1, firstAt: "2026-11-01" } };
  const { next, changes } = applyHelix(st, m, "2026-11-15T00:00:00Z");
  assert.equal(changes.first, false);
  assert.deepEqual(next.tasks.map((t) => t.id), ["hx-1", "hx-2", "hx-4", "local"]);
  assert.equal(changes.statusChanged, 1);
  assert.equal(changes.keptLocal, 1);
  assert.equal(next.helixSync?.firstAt, "2026-11-01");
});
