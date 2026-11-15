#!/usr/bin/env node
// Helix (helixarm.am, Corp Portal) → CRM X: односторонняя синхронизация «моих» задач.
//
// Источник правды — Helix. Каждый запуск:
//   1. входит в Helix (форма логина), берёт ?route=tasks&action=get_all;
//   2. разворачивает дерево (задачи + подзадачи), оставляет те, где я в исполнителях;
//   3. переводит в модель CRM X и заменяет ими задачи с id "hx-…" в общем состоянии CRM X
//      (таблица StateStore, строка "main"), атомарно по rev.
// Первый запуск (в состоянии нет метки helixSync) удаляет ВСЕ старые задачи CRM X.
// Дальше задачи, созданные прямо в CRM X (id не "hx-…"), сохраняются.
//
// Настройки — ~/.config/quicky/helix.env (или переменные окружения):
//   HELIX_URL=https://helixarm.am/team
//   HELIX_USERNAME=...           логин в Helix
//   HELIX_PASSWORD=...           пароль в Helix (вписывает сам пользователь)
//   HELIX_ME=Armen Razmikovich   как меня зовут в Helix
//   CRMX_ME_ID=u-armen           мой id в CRM X
//   DATABASE_URL=postgresql://…  база CRM X (Aiven)
//
// Запуск: node helix-sync.mjs [--dry-run] [--helix-file tasks.json] [--state-file state.json]
//   --dry-run      ничего не пишет, печатает, что изменится
//   --helix-file   взять задачи Helix из файла (ответ get_all) вместо входа
//   --state-file   работать с JSON-файлом состояния вместо базы (для проверки)

import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const args = process.argv.slice(2);
const flag = (n) => args.includes(n);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };

// ---------- настройки ----------
function loadEnv(file) {
  if (!fs.existsSync(file)) return;
  for (const line of fs.readFileSync(file, "utf8").split("\n")) {
    const m = line.match(/^\s*([A-Z_][A-Z0-9_]*)\s*=\s*(.*)\s*$/);
    if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
}
loadEnv(path.join(os.homedir(), ".config/quicky/helix.env"));
const HELIX_URL = (process.env.HELIX_URL || "https://helixarm.am/team").replace(/\/$/, "");
const ME = process.env.HELIX_ME || "Armen Razmikovich";
const ME_ID = process.env.CRMX_ME_ID || "u-armen";

const log = (...a) => console.log(new Date().toISOString(), ...a);
const die = (msg) => { log("ОШИБКА:", msg); process.exit(1); };

// ---------- Helix ----------
async function helixTasks() {
  const file = opt("--helix-file");
  if (file) return JSON.parse(fs.readFileSync(file, "utf8"));
  const { HELIX_USERNAME: u, HELIX_PASSWORD: p } = process.env;
  if (!u || !p) die("нет HELIX_USERNAME / HELIX_PASSWORD в ~/.config/quicky/helix.env");

  const res = await fetch(`${HELIX_URL}/?route=login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ username: u, password: p }),
    redirect: "manual",
  });
  // При входе PHP пересоздаёт сессию и шлёт PHPSESSID дважды — берём последнее значение каждой cookie.
  const jar = new Map();
  for (const c of res.headers.getSetCookie?.() ?? []) {
    const [pair] = c.split(";"); const i = pair.indexOf("=");
    if (i > 0) jar.set(pair.slice(0, i).trim(), pair.slice(i + 1));
  }
  if (!jar.size || res.status !== 302) die(`вход в Helix не удался (HTTP ${res.status})`);
  if (/route=login/.test(res.headers.get("location") || "")) die("Helix не принял логин или пароль");
  const cookie = [...jar].map(([k, v]) => `${k}=${v}`).join("; ");
  const r = await fetch(`${HELIX_URL}/?route=tasks&action=get_all`, { headers: { Cookie: cookie } });
  const text = await r.text();
  let data;
  try { data = JSON.parse(text); } catch { die(`Helix вернул не JSON (HTTP ${r.status}) — вероятно, неверный логин или пароль`); }
  if (!Array.isArray(data)) die("Helix вернул неожиданный формат");
  return data;
}

function flatten(tasks) {
  const out = [];
  const walk = (t, parent) => { out.push({ t, parent }); (t.subtasks || []).forEach((s) => walk(s, t)); };
  tasks.forEach((t) => walk(t, null));
  return out;
}

// ---------- перевод в модель CRM X ----------
const STATUS = { backlog: "todo", in_progress: "in_progress", on_hold: "blocked", done: "done" };
const PRIORITY = { low: "low", medium: "medium", high: "high", critical: "critical" };
const ZONE = [[/WAFL/i, "wafl"], [/Dark Kitchen/i, "kitchen"], [/Кафе|CAFE/i, "cafe"], [/COMX/i, "comx"]];
const STREAM = [
  [/Ремонт/i, "SPACE & BUILD"], [/Закуп/i, "EQUIPMENT & SUPPLY"], [/^HR$/i, "PEOPLE & TRAINING"],
  [/Маркет|Бренд|Дизайн/i, "BRAND & MARKETING"], [/Продукт|Разработ|Технолог/i, "PRODUCT & APP"],
  [/Документ|Административ/i, "LEGAL & FINANCE"], [/Продаж/i, "LAUNCH & OPS"],
];

function userMatcher(users) {
  // Helix: «Vladimir Neznamov», «Karine Nazaryan», «Arthur Grigoryan»; CRM X: Vladimir, Karina, Artur.
  // «h» выкидываем: Arthur ≈ Artur.
  const norm = (s) => s.toLowerCase().replace(/[^a-zа-я]/g, "").replace(/h/g, "");
  const first = (s) => norm(s.split(/\s+/)[0]);
  return (helixName) => {
    if (helixName === ME) return ME_ID;
    const f = first(helixName);
    const hit = users.find((u) => { const n = first(u.name); return n && (n === f || n.slice(0, 4) === f.slice(0, 4)); });
    return hit ? hit.id : null;
  };
}

function toCrmx(flat, users) {
  const who = userMatcher(users);
  const mine = flat.filter(({ t }) => (t.assignees || []).some((a) => a.name === ME));
  const tasks = [], subtasks = [];
  for (const { t, parent } of mine) {
    const id = `hx-${t.id}`;
    const status = STATUS[t.status] || "todo";
    const dirs = (t.directions || []).map((d) => d.name);
    const zone = (ZONE.find(([re]) => re.test(t.project_path || "")) || [, "common"])[1];
    const stream = (dirs.map((d) => (STREAM.find(([re]) => re.test(d)) || [])[1]).find(Boolean)) || "LAUNCH & OPS";
    const others = [...new Set((t.assignees || []).map((a) => who(a.name)).filter((x) => x && x !== ME_ID))];
    const author = (t.setters || []).map((s) => who(s.name)).find(Boolean) || ME_ID;
    const desc = [
      t.notes || "",
      parent ? `Входит в: ${parent.title}` : "",
      `Helix #${t.id} · ${t.project_path}${dirs.length ? " · " + dirs.join(", ") : ""}`,
    ].filter(Boolean).join("\n\n");
    tasks.push({
      id, title: t.title, description: desc, zone, zones: [zone],
      assigneeId: ME_ID, authorId: author, participantIds: others,
      startDate: t.start_date || "", due: t.deadline || "",
      priority: PRIORITY[t.priority] || "medium", status,
      weight: 1, criticalPath: t.priority === "high" && status !== "done",
      result: "", createdAt: (t.created_at || "").replace(" ", "T"),
      attachments: [], code: `HX-${t.id}`, wave: "", workstream: stream, dependsOn: [],
      ...(status === "blocked" ? { blockReason: "On Hold в Helix", blockUntil: "forever", blockFromStatus: "todo" } : {}),
    });
    (t.todos || []).forEach((td, i) => subtasks.push({ id: `${id}-c${td.id ?? i}`, taskId: id, title: td.text, done: !!td.done }));
  }
  return { tasks, subtasks };
}

// ---------- применение к состоянию CRM X ----------
function apply(state, mapped, now) {
  const first = !state.helixSync;
  const keepLocal = (t) => !first && !String(t.id).startsWith("hx-");
  const kept = state.tasks.filter(keepLocal);
  const tasks = [...mapped.tasks, ...kept];
  const ids = new Set(tasks.map((t) => t.id));
  const keepRef = (x) => !x.taskId || ids.has(x.taskId);
  const next = {
    ...state,
    tasks,
    subtasks: [...mapped.subtasks, ...(state.subtasks || []).filter((s) => !String(s.taskId).startsWith("hx-") && ids.has(s.taskId))],
    comments: (state.comments || []).filter(keepRef),
    notices: (state.notices || []).filter(keepRef),
    activity: (state.activity || []).filter(keepRef),
    risks: (state.risks || []).map((r) => (r.taskId && !ids.has(r.taskId) ? { ...r, taskId: undefined } : r)),
    expenses: (state.expenses || []).map((e) => (e.taskId && !ids.has(e.taskId) ? { ...e, taskId: undefined } : e)),
    todos: (state.todos || []).map((td) => (td.taskId && !ids.has(td.taskId) ? { ...td, taskId: undefined } : td)),
    helixSync: { at: now, count: mapped.tasks.length, firstAt: state.helixSync?.firstAt || now, source: "mac" },
  };
  const before = new Map(state.tasks.map((t) => [t.id, t]));
  const changes = {
    first, removed: state.tasks.length - kept.length - mapped.tasks.filter((t) => before.has(t.id)).length,
    added: mapped.tasks.filter((t) => !before.has(t.id)).length,
    statusChanged: mapped.tasks.filter((t) => before.has(t.id) && before.get(t.id).status !== t.status).length,
    keptLocal: kept.length,
  };
  return { next, changes };
}

async function withDb(fn) {
  const file = opt("--state-file");
  if (file) {
    const state = JSON.parse(fs.readFileSync(file, "utf8"));
    const out = await fn(state);
    if (out && !flag("--dry-run")) fs.writeFileSync(file, JSON.stringify(out, null, 1));
    return;
  }
  if (!process.env.DATABASE_URL) die("нет DATABASE_URL в ~/.config/quicky/helix.env");
  const { default: pg } = await import("pg");
  // sslmode из URL у pg ≥8.13 включает строгую проверку сертификата, а у Aiven свой CA —
  // убираем параметр и шифруем без проверки цепочки (как Prisma в самой CRM X).
  const url = new URL(process.env.DATABASE_URL);
  url.searchParams.delete("sslmode");
  const client = new pg.Client({ connectionString: url.toString(), ssl: { rejectUnauthorized: false } });
  await client.connect();
  try {
    const { rows } = await client.query(`SELECT data, rev FROM "StateStore" WHERE id = 'main'`);
    if (!rows.length) die("в базе нет состояния CRM X");
    const { data, rev } = rows[0];
    const out = await fn(data);
    if (!out || flag("--dry-run")) return;
    const res = await client.query(
      `UPDATE "StateStore" SET data = $1::jsonb, rev = $2, updated_at = now() WHERE id = 'main' AND rev = $3`,
      [JSON.stringify({ ...out, rev: rev + 1 }), rev + 1, rev]);
    if (res.rowCount !== 1) die("состояние CRM X изменилось во время записи — повторю при следующем запуске");
    log(`записано в CRM X: rev ${rev} → ${rev + 1}`);
    if (!data.helixSync) resetSnapshots();
  } finally {
    await client.end();
  }
}

// После первого импорта старые снимки Quicky и Hermes бессмысленны: без сброса
// они прислали бы уведомления про сотни «новых» задач. Сбрасываем — следующий опрос станет базой.
async function resetSnapshots() {
  const { execFileSync } = await import("node:child_process");
  try { execFileSync("defaults", ["delete", "app.crmx.bar", "snapshot.v1"], { stdio: "ignore" }); } catch {}
  try { fs.rmSync(path.join(os.homedir(), ".hermes/state/crmx_snapshot.json"), { force: true }); } catch {}
  log("снимки Quicky и Hermes сброшены");
}

// ---------- main ----------
const helix = await helixTasks();
const flat = flatten(helix);
await withDb(async (state) => {
  // Синхронизацию команды делает сервер (/api/cron/helix). Если он отработал недавно — Mac не вмешивается,
  // иначе этот скрипт (только мои задачи) убрал бы задачи коллег.
  const hs = state.helixSync;
  if (hs?.source === "server" && Date.now() - Date.parse(hs.at) < 6 * 3600e3 && !flag("--force")) {
    log(`серверная синхронизация активна (последняя ${hs.at}) — Mac пропускает запуск`);
    return null;
  }
  const mapped = toCrmx(flat, state.users || []);
  if (!mapped.tasks.length) die(`в Helix не найдено задач, где исполнитель «${ME}» — проверьте HELIX_ME`);
  const { next, changes } = apply(state, mapped, new Date().toISOString());
  const open = mapped.tasks.filter((t) => t.status !== "done").length;
  log(`Helix: ${flat.length} задач всего, моих ${mapped.tasks.length} (открыто ${open}), пунктов чек-листов ${mapped.subtasks.length}`);
  log(`CRM X: ${changes.first ? "ПЕРВЫЙ ИМПОРТ, старые задачи удаляются" : "обновление"}; ` +
      `удалено ${changes.removed}, новых ${changes.added}, смена статуса ${changes.statusChanged}, локальных сохранено ${changes.keptLocal}` +
      (flag("--dry-run") ? " [dry-run, ничего не записано]" : ""));
  return next;
});
