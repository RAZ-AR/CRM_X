"""
Master-план запуска: data/master-plan.xlsx → web/lib/seed.ts (tasks, subtasks, дедлайны проектов) и data/master-plan.csv.
Запуск: python3 web/scripts/master-plan.py (из корня репозитория). Нужен openpyxl.
Листы: «Задачи» (актуальные сроки — «Новое начало/Новый конец», иначе «Начало/Конец») и «Архив (выполнено)».
"""
import csv, json, sys
from pathlib import Path
import openpyxl

ROOT = Path(__file__).resolve().parents[2]
WHO = {"Armen": "u-armen", "Vladimir": "u-vladimir", "Karina": "u-karina", "Karine": "u-karina",
       "Artur": "u-artur", "Дизайнер интерьера (внешний)": "u-design"}
OWNER = "u-armen"  # шефы пока не пользователи системы: задача на Armen, реальный исполнитель в описании
# u-artur в рабочей базе заменяется на id реального Artur (blobState.ts, миграция по имени)
WAVE = {"common": "", "wafl": "A", "kitchen": "B", "comx": "C", "cafe": "C"}
STATUS = {"Не начата": "todo", "В работе": "in_progress", "Готово": "done"}
DEADLINES = {"wafl": "2026-11-06", "kitchen": "2026-11-21", "comx": "2026-11-25", "cafe": "2027-01-15"}

def day(v):
    return v.date().isoformat() if v else None

def load(ws):
    out = []
    for r in ws.iter_rows(min_row=2, values_only=True):
        if not r[0]:
            continue
        code, zone, stream, title, s0, e0, result, who, deps, cp, check, status, s1, e1, note = (list(r) + [None] * 15)[:15]
        code = str(code).strip()
        start, end = day(s1 or s0), day(e1 or e0)
        out.append(dict(
            code=code, zone=zone, stream=stream, title=str(title).strip(), start=start, end=end,
            result=result or "", who_raw=(who or "").strip(), cp=(cp or "").strip().lower() == "да",
            deps=[d.strip() for d in str(deps or "").split(",") if d.strip()],
            check=[c.strip() for c in str(check or "").split(";") if c.strip()],
            status=STATUS[status or "Не начата"], note=(note or "").strip(),
        ))
    return out

wb = openpyxl.load_workbook(ROOT / "data/master-plan.xlsx", data_only=True)
rows = load(wb["Задачи"]) + load(wb["Архив (выполнено)"])
by = {r["code"]: r for r in rows}

errors, warns = [], []
if len(by) != len(rows):
    errors.append("дубли кодов")
for r in rows:
    if not r["start"] or not r["end"]:
        errors.append(f"{r['code']}: нет дат")
    elif r["end"] < r["start"]:
        errors.append(f"{r['code']}: конец раньше начала")
    if r["zone"] not in WAVE:
        errors.append(f"{r['code']}: проект {r['zone']}")
    for d in r["deps"]:
        if d not in by:
            errors.append(f"{r['code']}: нет зависимости {d}")
        elif r["status"] != "done" and by[d]["end"] and r["start"] and by[d]["end"] > r["start"]:
            warns.append(f"{r['code']} начинается {r['start']} раньше конца {d} ({by[d]['end']})")
if errors:
    print("\n".join(errors)); sys.exit(1)

tasks, subtasks = [], []
for r in rows:
    tid = "t-" + r["code"].lower()
    launch = r["title"].startswith("🚀")
    tokens = [x.strip() for x in r["who_raw"].split("+") if x.strip()]
    mapped = [WHO[x] for x in tokens if x in WHO]
    who, others = (mapped[0] if mapped else OWNER), [x for x in tokens if x not in WHO]
    desc = []
    if others:
        desc.append(f"Исполнитель по плану: {r['who_raw']}")
    if r["note"]:
        desc.append(r["note"])
    tasks.append({
        "id": tid, "title": r["title"], "description": "\n".join(desc),
        "zone": r["zone"], "zones": [r["zone"]],
        "assigneeId": who, "authorId": "u-armen", "participantIds": mapped[1:],
        "startDate": r["start"], "due": r["end"],
        "priority": "critical" if r["cp"] else ("high" if launch or r["stream"] == "LAUNCH & OPS" else "medium"),
        "status": r["status"], "weight": 3 if r["cp"] else 1, "criticalPath": r["cp"],
        "result": r["result"], "createdAt": "2026-09-24", "attachments": [],
        "code": r["code"], "wave": WAVE[r["zone"]], "workstream": r["stream"],
        "dependsOn": r["deps"], "blockReason": "",
    })
    for i, c in enumerate(r["check"], 1):
        subtasks.append({"id": f"s-{r['code'].lower()}-{i}", "taskId": tid, "title": c, "done": False})

seed_path = ROOT / "web/lib/seed.ts"
head, body = seed_path.read_text().split("export const seed: AppState = ", 1)
seed = json.loads(body.strip().rstrip(";"))
seed["tasks"] = tasks
seed["subtasks"] = subtasks
for z in seed["zones"]:
    if z["slug"] in DEADLINES:
        z["deadline"] = DEADLINES[z["slug"]]
seed_path.write_text(head + "export const seed: AppState = " + json.dumps(seed, ensure_ascii=False, indent=2) + ";\n")

with open(ROOT / "data/master-plan.csv", "w", newline="", encoding="utf-8") as f:
    w = csv.writer(f)
    w.writerow(["Код", "Проект", "Поток", "Задача", "Начало", "Конец", "Результат (готово когда)", "Исполнитель", "Зависит от", "Critical path", "Чеклист", "Статус", "Комментарий"])
    for r in rows:
        w.writerow([r["code"], r["zone"], r["stream"], r["title"], r["start"], r["end"], r["result"], r["who_raw"],
                    ", ".join(r["deps"]), "да" if r["cp"] else "", "; ".join(r["check"]), r["status"], r["note"]])

print(f"ok: {len(tasks)} задач ({sum(t['status']=='done' for t in tasks)} выполнено), {len(subtasks)} пунктов чеклистов, critical path: {sum(r['cp'] for r in rows)}")
print(f"предупреждений по датам зависимостей: {len(warns)}")
print("\n".join(warns[:15]))
