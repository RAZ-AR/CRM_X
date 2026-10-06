"""
План запуска: data/tasks-xspace.xlsx (формат портала XSpace) → web/lib/seed.ts (задачи, подзадачи, чек-листы,
проекты, люди) и data/master-plan.csv.
Запуск: python3 web/scripts/master-plan.py (из корня репозитория). Нужен openpyxl.

Лист «Задачи»: Задача → большая задача (родитель), Подзадача → задача с parentId, Пункт → пункт чек-листа
ближайшей задачи/подзадачи выше. ID — код задачи (WAF-01, GEN-G01 — большие задачи).
«Зависит от: …» в заметках → dependsOn (по названию, «(Проект)» уточняет при совпадении названий).
"""
import csv, json, re, sys
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[2]
ZONE = {"XSpace": "common", "XSpace / WAFL": "wafl", "XSpace / Dark Kitchen": "kitchen", "XSpace / COMX": "comx",
        "XSpace / Кафе": "cafe", "XSpace / Secret Door": "secret"}
ZONE_SHORT = {"XSpace": "common", "WAFL": "wafl", "Dark Kitchen": "kitchen", "COMX": "comx", "Кафе": "cafe", "Secret Door": "secret"}
WAVE = {"common": "", "wafl": "A", "kitchen": "B", "comx": "C", "cafe": "C", "secret": "C"}
WHO = {"Armen Razmikovich": "u-armen", "Vladimir Neznamov": "u-vladimir", "Karine Nazaryan": "u-karina",
       "Arthur Grigoryan": "u-artur", "Design": "u-design",
       "Шеф WAFL": "u-chef-wafl", "Шеф Dark Kitchen": "u-chef-kitchen", "Шеф CAFE": "u-chef-cafe"}
# u-artur в рабочей базе заменяется на id реального Artur (blobState.ts, миграция по имени)
STATUS = {"Backlog": "todo", "In Progress": "in_progress", "On Hold": "blocked", "Done": "done", None: "todo"}
PRIORITY = {"Низкий": "low", "Средний": "medium", "Высокий": "high", None: "medium"}
STREAM = {"Документы": "LEGAL & FINANCE", "Административные вопросы": "LEGAL & FINANCE",
          "Ремонтные работы": "SPACE & BUILD", "Маркетинг": "BRAND & MARKETING",
          "Продукт": "PRODUCT & APP", "Разработка": "PRODUCT & APP", "Технологии": "PRODUCT & APP",
          "Закупки": "EQUIPMENT & SUPPLY", "HR": "PEOPLE & TRAINING", "Продажи": "LAUNCH & OPS"}

def stream(dirs, zone):
    if "Дизайн" in dirs and not any(d in STREAM for d in dirs):
        return "BRAND & MARKETING" if zone == "common" else "SPACE & BUILD"
    return next((STREAM[d] for d in dirs if d in STREAM), "LAUNCH & OPS")

def day(v):
    if not v:
        return None
    if isinstance(v, str):
        d, m, y = v.split(".")
        return f"{y}-{m}-{d}"
    return v.date().isoformat()

wb = openpyxl.load_workbook(ROOT / "data/tasks-xspace.xlsx", data_only=True)
errors = []
items, checks = [], []
parent = last = None
for n, r in enumerate(wb["Задачи"].iter_rows(min_row=2, values_only=True), 2):
    r = list(r) + [None] * 13
    code, kind, title = (str(r[0]).strip() if r[0] else None), r[1], str(r[2] or "").strip()
    if kind == "Пункт":
        if not last:
            errors.append(f"строка {n}: пункт без задачи"); continue
        checks.append((last, title, str(r[11] or "").strip().lower() == "да"))
        continue
    if kind not in ("Задача", "Подзадача") or not code:
        errors.append(f"строка {n}: тип {kind!r}, ID {code!r}"); continue
    zone = ZONE.get(r[3]) if kind == "Задача" else parent["zone"]
    if not zone:
        errors.append(f"строка {n}: проект {r[3]!r}"); continue
    people = [p.strip() for p in str(r[4] or "").split(",") if p.strip()]
    unknown = [p for p in people if p not in WHO]
    if unknown:
        errors.append(f"строка {n}: исполнитель {unknown}")
    dirs = [d.strip() for d in str(r[9] or "").split(",") if d.strip()]
    notes = str(r[10] or "").strip().split("\n")
    deps = [l for l in notes if l.startswith("Зависит от:")]
    it = dict(code=code, kind=kind, title=title, zone=zone, people=[WHO[p] for p in people if p in WHO],
              start=day(r[5]), due=day(r[6]), priority=PRIORITY[r[7]], status=STATUS[r[8]], dirs=dirs,
              notes="\n".join(l for l in notes if not l.startswith("Зависит от:")).strip(),
              deps_raw=[l.split(":", 1)[1] for l in deps],
              cp=str(r[12] or "").strip().lower() == "да", parent=parent["code"] if kind == "Подзадача" else None, row=n)
    if kind == "Задача":
        parent = it
    last = it
    items.append(it)

by_code = {}
for it in items:
    if it["code"] in by_code:
        errors.append(f"дубль ID {it['code']}")
    by_code[it["code"]] = it
    if not it["start"] or not it["due"]:
        errors.append(f"{it['code']}: нет дат")
    elif it["due"] < it["start"]:
        errors.append(f"{it['code']}: срок раньше начала")

def resolve(ref, zone):
    m = re.match(r"^(.*?)\s*\(([^()]*)\)$", ref)
    title, z = (m.group(1), ZONE_SHORT.get(m.group(2))) if m and m.group(2) in ZONE_SHORT else (ref, None)
    found = [i for i in items if i["title"] == title]
    if len(found) > 1:
        found = [i for i in found if i["zone"] == (z or zone)] or found
    return found[0]["code"] if len(found) == 1 else None

for it in items:
    it["deps"] = []
    for line in it["deps_raw"]:
        buf = ""  # в названиях бывает «;», поэтому склеиваем куски, пока не найдётся задача
        for piece in line.split(";"):
            buf = f"{buf};{piece}" if buf else piece
            c = resolve(buf.strip(), it["zone"])
            if c:
                it["deps"].append(c)
                buf = ""
        if buf.strip():
            errors.append(f"{it['code']}: не найдена зависимость «{buf.strip()}»")
if errors:
    print("\n".join(errors)); sys.exit(1)

tasks, subtasks = [], []
for it in items:
    tid = "t-" + it["code"].lower()
    launch = "запуск" in it["title"].lower() or "открытие" in it["title"].lower()
    desc = [it["notes"]] if it["notes"] else []
    if it["dirs"]:
        desc.append("Направления: " + ", ".join(it["dirs"]))
    tasks.append({
        "id": tid, "title": it["title"], "description": "\n\n".join(desc),
        "zone": it["zone"], "zones": [it["zone"]],
        "assigneeId": it["people"][0] if it["people"] else "u-armen", "authorId": "u-armen",
        "participantIds": it["people"][1:],
        "startDate": it["start"], "due": it["due"],
        "priority": "critical" if it["cp"] else ("high" if launch and it["priority"] == "medium" else it["priority"]),
        "status": it["status"], "weight": 0 if it["kind"] == "Задача" else (3 if it["cp"] else 1), "criticalPath": it["cp"],
        "result": "", "createdAt": "2026-10-06", "attachments": [],
        "code": it["code"], "wave": WAVE[it["zone"]], "workstream": stream(it["dirs"], it["zone"]),
        "dependsOn": it["deps"], "blockReason": "",
        **({"parentId": "t-" + it["parent"].lower()} if it["parent"] else {}),
    })
n = {}
for owner, title, done in checks:
    k = owner["code"].lower(); n[k] = n.get(k, 0) + 1
    subtasks.append({"id": f"s-{k}-{n[k]}", "taskId": "t-" + k, "title": title, "done": done})

seed_path = ROOT / "web/lib/seed.ts"
head, body = seed_path.read_text().split("export const seed: AppState = ", 1)
seed = json.loads(body.strip().rstrip(";"))
seed["tasks"], seed["subtasks"] = tasks, subtasks
if not any(z["slug"] == "secret" for z in seed["zones"]):
    seed["zones"].append({"slug": "secret", "name": "Secret Door", "emoji": "🚪", "color": "#D8B4FE", "deadline": "2027-01-20", "readiness": {}})
ALL = [z["slug"] for z in seed["zones"]]
for z in seed["zones"]:
    z["deadline"] = {"wafl": "2026-11-06", "kitchen": "2026-11-21", "comx": "2026-11-25", "cafe": "2027-01-15", "secret": "2027-01-20"}.get(z["slug"], z["deadline"])
for u in seed["users"]:
    u["boardZones"] = ALL
for uid, name, login, zone in (("u-chef-wafl", "Шеф WAFL", "ChefWafl", "wafl"), ("u-chef-kitchen", "Шеф Dark Kitchen", "ChefKitchen", "kitchen"), ("u-chef-cafe", "Шеф CAFE", "ChefCafe", "cafe")):
    if not any(u["id"] == uid for u in seed["users"]):
        seed["users"].append({"id": uid, "name": name, "email": login, "password": "1234", "role": "employee", "zone": zone,
                              "title": "Шеф (меню и рецептуры)", "avatar": "Ш", "permissions": [], "boardZones": [zone], "managerId": "u-armen"})
seed_path.write_text(head + "export const seed: AppState = " + json.dumps(seed, ensure_ascii=False, indent=2) + ";\n")

with open(ROOT / "data/master-plan.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["ID", "Тип", "Родитель", "Проект", "Поток", "Задача", "Начало", "Срок", "Исполнители", "Статус", "Приоритет", "Зависит от", "Critical path"])
    for t, it in zip(tasks, items):
        w.writerow([it["code"], it["kind"], it["parent"] or "", it["zone"], t["workstream"], it["title"], it["start"], it["due"],
                    ", ".join(it["people"]), it["status"], t["priority"], ", ".join(it["deps"]), "да" if it["cp"] else ""])

par = sum(1 for i in items if i["kind"] == "Задача")
print(f"ok: {par} больших задач, {len(items) - par} подзадач ({sum(i['status'] == 'done' for i in items)} выполнено), "
      f"{len(subtasks)} пунктов чек-листов, зависимостей {sum(len(i['deps']) for i in items)}, critical path {sum(i['cp'] for i in items)}")
