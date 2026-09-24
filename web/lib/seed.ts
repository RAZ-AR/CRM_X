import type { AppState } from "./types";

export const seed: AppState = {
  "zones": [
    {
      "slug": "wafl",
      "name": "WAFL",
      "emoji": "🧇",
      "color": "#F5D76E",
      "deadline": "2026-10-28",
      "readiness": {}
    },
    {
      "slug": "kitchen",
      "name": "Dark Kitchen",
      "emoji": "🍳",
      "color": "#F5A9A9",
      "deadline": "2026-11-10",
      "readiness": {}
    },
    {
      "slug": "cafe",
      "name": "CAFE",
      "emoji": "☕",
      "color": "#A9F5A9",
      "deadline": "2027-01-15",
      "readiness": {}
    },
    {
      "slug": "comx",
      "name": "COMX",
      "emoji": "📚",
      "color": "#A9D0F5",
      "deadline": "2026-12-15",
      "readiness": {}
    },
    {
      "slug": "common",
      "name": "ОБЩИЕ",
      "emoji": "🏛️",
      "color": "#E5E7EB",
      "deadline": "2026-11-10",
      "readiness": {}
    }
  ],
  "users": [
    {
      "id": "u-armen",
      "name": "Armen",
      "email": "Armen",
      "password": "1111",
      "role": "cpo",
      "zone": null,
      "title": "Owner проекта",
      "avatar": "A",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common"
      ],
      "managerId": null
    },
    {
      "id": "u-vladimir",
      "name": "Vladimir",
      "email": "Vladimir",
      "password": "2222",
      "role": "employee",
      "zone": null,
      "title": "Креативный директор",
      "avatar": "V",
      "permissions": [
        "wiki",
        "contacts",
        "marketing_all_zones"
      ],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common"
      ],
      "managerId": "u-armen",
      "streams": [
        "BRAND & MARKETING"
      ]
    },
    {
      "id": "u-karina",
      "name": "Karina",
      "email": "Karina",
      "password": "3333",
      "role": "employee",
      "zone": null,
      "title": "Маркетинг",
      "avatar": "K",
      "permissions": [
        "wiki",
        "contacts",
        "marketing_all_zones"
      ],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common"
      ],
      "managerId": "u-vladimir"
    }
  ],
  "tasks": [
    {
      "id": "t-gen-01",
      "title": "Проверка договорных ограничений по помещениям",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Понятно, что можно делать в каждом помещении",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-01",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-02",
      "title": "Подписание договоров по объектам",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-28",
      "due": "2026-09-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Договоры подписаны",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-02",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-03",
      "title": "Нотариус / оформление документов",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-28",
      "due": "2026-09-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Документы оформлены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-03",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-04",
      "title": "Регистрация / запуск юрлиц",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-28",
      "due": "2026-10-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Юрструктура готова",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-04",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-05",
      "title": "Бухгалтерия: бухгалтер / аутсорс, налоговый режим",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Бухгалтер есть, налоговый режим выбран",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-05",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-06",
      "title": "Банковские счета и платёжные инструменты",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Счета открыты, можно платить поставщикам",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-06",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-07",
      "title": "Финансовая модель и бюджет запуска",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-03",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Бюджет по статьям утверждён Owner, резерв 10–15% заложен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-07",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-08",
      "title": "Требования и разрешения для food-проекта",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-02",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Список требований и документов по Waffle и кухне",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-08",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-09",
      "title": "Требования к вывеске / фасаду / окну",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Понятны ограничения по вывеске и окну",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-09",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-10",
      "title": "Получение разрешений и документов для food",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Все документы на руках до soft launch Waffle",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-10",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-08",
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-11",
      "title": "Договоры на вывоз отходов, дезинсекцию, клининг",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Договоры подписаны, график есть",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-11",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-12",
      "title": "Страхование помещений и оборудования",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Полис действует с открытия Waffle",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-12",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-20",
      "title": "Первичный осмотр объектов",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Фото + видео + состояние всех помещений",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-20",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-21",
      "title": "Первичный обмер всех помещений",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Точные размеры всех помещений",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-21",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-22",
      "title": "Что можно и что нельзя демонтировать",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Список ограничений по демонтажу",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-22",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-23",
      "title": "Техническое обследование инженерии",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Мощности и точки подключения по каждому объекту",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-23",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-24",
      "title": "Пожарные и санитарные требования к объектам",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Требования к каждому объекту записаны",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-24",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-25",
      "title": "Технический паспорт объектов",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-30",
      "due": "2026-10-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Единая таблица ограничений по всем помещениям",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-25",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "GEN-21",
        "GEN-23"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-26",
      "title": "Подрядчики: электрик, сантехник, вентиляция",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Подрядчики выбраны, есть сметы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-26",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-27",
      "title": "Общий график ремонта: Waffle → Dark Kitchen → COMX → CAFE",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Очерёдность и окна работ по объектам утверждены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-27",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "GEN-22"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-28",
      "title": "Предварительный расчёт инженерных работ",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-30",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Бюджет инженерии по объектам",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-28",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "GEN-26"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-29",
      "title": "Интернет, Wi-Fi, видеонаблюдение, сигнализация",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё подключено в Waffle и на кухне",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-29",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-30",
      "title": "Пожарная безопасность: огнетушители, датчики, план эвакуации",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Объекты готовы к проверке",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-30",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-40",
      "title": "Сбор референсов, moodboard",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-26",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Moodboard",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-40",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-41",
      "title": "Исследование конкурентов и визуального поля",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Понимание рынка и свободных ниш",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-41",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-42",
      "title": "Brand concept",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-26",
      "due": "2026-09-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепция бренда",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-42",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-40"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-43",
      "title": "Название и позиционирование",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-28",
      "due": "2026-10-01",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Название и позиционирование зафиксированы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-43",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-44",
      "title": "Варианты логотипа",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "3–5 вариантов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-44",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-42",
        "GEN-43"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-45",
      "title": "Выбор направления логотипа",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-06",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Owner выбрал одно направление",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-45",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-44"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-46",
      "title": "Айдентика",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Готовая визуальная система",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-46",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-47",
      "title": "Tone of Voice",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Правила коммуникации",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-47",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-48",
      "title": "Бренд-гайд / базовые правила",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Базовый brand book",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-48",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-49",
      "title": "Униформа персонала",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Униформа заказана к обучению персонала",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-49",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-50",
      "title": "Проверка доменов",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-26",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Доступные варианты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-50",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-51",
      "title": "Покупка доменов",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-26",
      "due": "2026-09-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Домены зарегистрированы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-51",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-50"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-52",
      "title": "Регистрация соцсетей",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Аккаунты созданы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-52",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-43"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-53",
      "title": "Оформление соцсетей",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Готовые профили в айдентике",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-53",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46",
        "GEN-52"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-54",
      "title": "Контент-план запуска",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-17",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "План публикаций до и после открытия",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-54",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-47"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-55",
      "title": "Фото и визуальный контент",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Контент для запуска",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-55",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-56",
      "title": "Сайт / лендинг",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Лендинг на домене, ссылка на приложение",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-56",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46",
        "GEN-51"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-57",
      "title": "Карточки в Google Maps, Yandex Maps, 2GIS",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Точка находится на картах",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-57",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-58",
      "title": "PR открытия: блогеры, городские медиа, событие",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Список блогеров и медиа, план события",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-58",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-60",
      "title": "Трудовые договоры, зарплатная схема, мотивация",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Шаблоны договоров и схема оплаты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-60",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-61",
      "title": "Медкнижки / санминимум персонала",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "У всех сотрудников документы до смен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-61",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-70",
      "title": "Касса, POS, эквайринг, учёт",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "POS куплен и настроен, эквайринг работает",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-70",
      "wave": "",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-71",
      "title": "Логистика закупок: кто, где, как часто",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Таблица закупок с резервными поставщиками",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-71",
      "wave": "",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-80",
      "title": "Food safety: процедуры и контроль",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Процедуры записаны и распечатаны на объектах",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-80",
      "wave": "",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-81",
      "title": "Стандарты работы: открытие и закрытие смены, сервис",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-22",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Чек-листы смены и стандарты сервиса",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-81",
      "wave": "",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-82",
      "title": "Ежедневный отчёт после запуска",
      "description": "",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-27",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Шаблон: продажи, food cost, отзывы, проблемы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-82",
      "wave": "",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-01",
      "title": "Демонтаж Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-01",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-01",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "GEN-02",
        "GEN-22"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-02",
      "title": "Замер Waffle после демонтажа",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-02",
      "due": "2026-10-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Чистовые размеры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-02",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-03",
      "title": "Планировка Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-03",
      "due": "2026-10-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Утверждённая схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-03",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-04",
      "title": "Проверка планировки с оборудованием",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё помещается",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-04",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-03",
        "WAF-22"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-05",
      "title": "Финальный инженерный план Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Можно начинать монтаж",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-05",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-03",
        "GEN-25"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-06",
      "title": "Дизайн точки Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Дизайн-проект",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-04",
        "GEN-45"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-07",
      "title": "Согласование дизайна и работ: арендодатель, фасад, пожарные",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Письменное согласие на работы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-07",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06",
        "GEN-09"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-08",
      "title": "Ремонт и инженерные работы Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-21",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Точка готова к монтажу оборудования",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-08",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-07",
        "WAF-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-09",
      "title": "Заказ материалов и мебели",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-17",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё заказано",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-09",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-10",
      "title": "Подрядчик на окно выдачи",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Подрядчик выбран",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-10",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-11",
      "title": "Замер окна",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-02",
      "due": "2026-10-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Точные размеры проёма",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-11",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-10",
        "WAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-12",
      "title": "Производство окна",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-03",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Окно готово",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-12",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-11",
        "GEN-09"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-13",
      "title": "Монтаж окна",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Окно установлено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-13",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-12"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-20",
      "title": "Можно ли привезти оборудование",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Ответ: везём или покупаем локально",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-20",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-21",
      "title": "Поиск локального оборудования (если привезти нельзя)",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-25",
      "due": "2026-10-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Альтернативы с ценами",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-21",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-20"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-22",
      "title": "Сравнение оборудования и цен, выбор",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Выбранный вариант",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-22",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-20"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-23",
      "title": "Производственная мощность: сколько вафель в час в пик",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Мощность ≥ пиковой нагрузки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-23",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-24",
      "title": "Заказ оборудования",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оплачено, есть дата доставки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-24",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22",
        "GEN-07"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-25",
      "title": "Доставка оборудования",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-19",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оборудование на объекте",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-25",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-24"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-26",
      "title": "Хранение: холодильник, морозилка, сухой склад, упаковка",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё заказано и помещается",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-26",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-27",
      "title": "Поставщики продуктов + резервные",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Договорённости с основными и резервными",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-27",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-28",
      "title": "Упаковка Waffle: дизайн и поставщик",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Дизайн утверждён, поставщик выбран",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-28",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-29",
      "title": "Заказ упаковки",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Упаковка на руках",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-29",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-28"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-30",
      "title": "Монтаж оборудования",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оборудование работает",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-30",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-08",
        "WAF-25",
        "WAF-13"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-40",
      "title": "Поиск шеф-кондитера",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кандидаты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-40",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-41",
      "title": "Выбор шеф-кондитера",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-07",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Человек найден",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-41",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-40"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-42",
      "title": "Концепция продукта и ассортимент",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Ассортимент",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-42",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-43",
      "title": "Разработка рецептур",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Рецептуры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-43",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-41",
        "WAF-42"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-44",
      "title": "Тестирование рецептур",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Финальные продукты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-44",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-43"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-45",
      "title": "Техкарты Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Техкарты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-45",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-44"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-46",
      "title": "Себестоимость и цены",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Food cost и цены утверждены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-46",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-44"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-47",
      "title": "Меню-борд и POSM для окна",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Меню и POSM напечатаны",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-47",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "WAF-46",
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-48",
      "title": "Юнит-экономика точки Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Средний чек, food cost, точка безубыточности",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-48",
      "wave": "A",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-50",
      "title": "Штатная структура Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Штат и график смен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-50",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-51",
      "title": "Поиск кондитеров и бариста",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кандидаты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-51",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-50"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-52",
      "title": "Собеседования",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Выбор",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-52",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-53",
      "title": "Найм и договоры",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда подписана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-53",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-52",
        "GEN-60"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-54",
      "title": "Обучение персонала",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Персонал готов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-54",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-53"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-55",
      "title": "Тестовые смены",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Смена отработана без сбоев",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-55",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-54",
        "WAF-30"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-60",
      "title": "Тест производства Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-25",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Скорость и качество в норме",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-60",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-30"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-61",
      "title": "Soft launch: ограниченные продажи",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Первые продажи",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-61",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-55",
        "WAF-60",
        "GEN-10",
        "GEN-70"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-62",
      "title": "Анализ и корректировки",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-10-28",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Исправления внесены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-62",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-61"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-63",
      "title": "🚀 WAFFLE LAUNCH",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Работающая точка",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-63",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-62",
        "APP-16"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-01",
      "title": "App: цели и механика лояльности",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Выбрана механика: баллы / штампы / уровни",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-01",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-app-02",
      "title": "App: механики геймификации",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-26",
      "due": "2026-10-01",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Список механик и наград",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-02",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-app-03",
      "title": "App: команда разработки Telegram Mini App",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-01",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Разработчик выбран, есть опыт Mini Apps",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-03",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-app-04",
      "title": "App: техническое задание Mini App",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "ТЗ согласовано Owner",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-04",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-01",
        "APP-02",
        "APP-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-05",
      "title": "App: договор с разработчиком, смета, этапы приёмки",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Договор подписан",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-05",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-06",
      "title": "App: UX-прототип",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кликабельный прототип",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-06",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-07",
      "title": "App: UI-дизайн в айдентике",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Макеты всех экранов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-07",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06",
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-08",
      "title": "App: backend — пользователи, баллы, акции, админка",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "API и админка работают",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-08",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-09",
      "title": "App: интеграция с POS — начисление и списание баллов",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Баллы начисляются с чека",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-09",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06",
        "GEN-70"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-10",
      "title": "App: Mini App — клиентская часть (UI после APP-07)",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Все экраны работают в Telegram на iOS и Android",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-10",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-11",
      "title": "App: правила программы, оферта, политика ПДн",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-16",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Документы опубликованы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-11",
      "wave": "A",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-12",
      "title": "App: тестирование (QA)",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Критичных багов нет",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-12",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-08",
        "APP-09",
        "APP-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-13",
      "title": "App: бета на тестовых сменах",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-26",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда прошла все сценарии",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-13",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-12"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-14",
      "title": "App: бот и публикация Mini App в Telegram",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Бот с кнопкой Mini App доступен гостям",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-14",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-12"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-15",
      "title": "App: промо — QR на окне и упаковке ведёт в бот, стартовая акция",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "QR и акция готовы к открытию",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-15",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-16",
      "title": "App: запуск вместе с открытием Waffle",
      "description": "",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Первые гости в программе",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-16",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "APP-13",
        "APP-14"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-01",
      "title": "Исследование рынка доставки: конкуренты, цены, агрегаторы",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-09-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Карта конкурентов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-01",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-02",
      "title": "Общая концепция Dark Kitchen",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепция",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-02",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-03",
      "title": "Long list виртуальных брендов",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-26",
      "due": "2026-10-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Long list",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-03",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-04",
      "title": "Концепции брендов: кухня, меню, цена, ЦА, позиционирование",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-03",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепция по каждому кандидату",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-04",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-05",
      "title": "Выбор 2–4 брендов для MVP",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Owner утвердил бренды",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-05",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-04",
        "DK-01",
        "DK-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-06",
      "title": "Юнит-экономика каждого бренда",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Экономика по каждому бренду",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-06",
      "wave": "B",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-07",
      "title": "Нейминг и айдентика виртуальных брендов",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Логотипы и визуал брендов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-07",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-08",
      "title": "MVP-меню",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "MVP menu",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-08",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-09",
      "title": "Рецептуры Dark Kitchen",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Рецептуры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-09",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-08"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-10",
      "title": "Тест-дегустация / фокус-группа",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Рабочие блюда",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-10",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-09"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-11",
      "title": "Техкарты Dark Kitchen",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-10-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Техкарты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-11",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-12",
      "title": "Себестоимость и цены",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-10-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Food cost и цены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-12",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-13",
      "title": "Поставщики продуктов + резервные",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Поставщики",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-13",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-14",
      "title": "Упаковка для доставки: дизайн, тест, заказ",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Упаковка на руках",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-14",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-07"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-15",
      "title": "Фото блюд для агрегаторов",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Фото всех позиций",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-15",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-16",
      "title": "Подключение к агрегаторам: договоры, меню, модерация",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-03",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Бренды опубликованы на агрегаторах",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-16",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-07",
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-17",
      "title": "Модель доставки: агрегаторы / свои курьеры / служба",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-15",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Стоимость, SLA, зона, время доставки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-17",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-20",
      "title": "Демонтаж кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-02",
      "due": "2026-10-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-20",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01",
        "GEN-22"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-21",
      "title": "Замер кухни после демонтажа",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Чистовые размеры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-21",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-20"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-22",
      "title": "Планировка кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Утверждённая схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-22",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-21"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-23",
      "title": "Проверка планировки с оборудованием",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё помещается",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-23",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22",
        "DK-30"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-24",
      "title": "Инженерный проект: вытяжка, вентиляция, электричество, вода",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Коммуникации спроектированы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-24",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22",
        "GEN-25"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-25",
      "title": "Дизайн кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Дизайн-проект",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-25",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-23"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-26",
      "title": "Согласование: арендодатель, пожарные, санитария",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-21",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Письменное согласие на работы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-26",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25",
        "DK-24"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-27",
      "title": "Ремонт и инженерные работы кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Кухня готова к монтажу оборудования",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-27",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-26"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-30",
      "title": "Список и выбор оборудования под меню",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Список оборудования",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-30",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-31",
      "title": "Производственная мощность: заказов в час в пик",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Мощность ≥ пиковой нагрузки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-31",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-32",
      "title": "Заказ оборудования кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оплачено, есть дата доставки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-32",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-30",
        "GEN-07"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-33",
      "title": "Доставка оборудования кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оборудование на объекте",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-33",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-32"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-34",
      "title": "Хранение: холод, заморозка, сухой склад, маркировка",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Хранение готово",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-34",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-35",
      "title": "Монтаж оборудования кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-31",
      "due": "2026-11-02",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Оборудование работает",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-35",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-27",
        "DK-33"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-40",
      "title": "Штатная структура кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Штат",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-40",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-41",
      "title": "Поиск персонала: су-шеф, повара, упаковщик",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кандидаты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-41",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-40"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-42",
      "title": "Найм кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-42",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41",
        "GEN-60"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-43",
      "title": "Обучение по техкартам",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-11-04",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда готова",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-43",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-42",
        "DK-11"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-44",
      "title": "Тестовые смены кухни",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-04",
      "due": "2026-11-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Проверка",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-44",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-43",
        "DK-35"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-50",
      "title": "Production test: время готовки и сборки заказа",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-04",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Проверка производства",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-50",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-35"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-51",
      "title": "Тестовый запуск: закрытые заказы (команда, друзья)",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Первые заказы без сбоев",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-51",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-44",
        "DK-50",
        "DK-16"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-52",
      "title": "Soft launch на агрегаторах, ограниченные часы",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-06",
      "due": "2026-11-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Первые реальные заказы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-52",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-51"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-53",
      "title": "Анализ и корректировки: время, отзывы, food cost",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-08",
      "due": "2026-11-10",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Исправления",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-53",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-52"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-54",
      "title": "🚀 DARK KITCHEN LAUNCH",
      "description": "",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Первый полноценный запуск",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-54",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-53"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-01",
      "title": "Концепция COMX: ассортимент, формат, события",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепция утверждена",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-01",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-02",
      "title": "Демонтаж COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-06",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-20"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-03",
      "title": "Замер COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-06",
      "due": "2026-11-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Размеры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-04",
      "title": "Планировка COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-07",
      "due": "2026-11-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-05",
      "title": "Дизайн COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-12",
      "due": "2026-11-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Дизайн-проект",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-05",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-06",
      "title": "Согласование COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-11-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Согласие на работы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-06",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-07",
      "title": "Ремонт COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-24",
      "due": "2026-12-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Помещение готово",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-07",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-08",
      "title": "Поставщики книг и комиксов, первая закупка",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-11-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Первая партия заказана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-09",
      "title": "Стеллажи и мебель",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-12-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Мебель на месте",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-09",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-10",
      "title": "Персонал COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-12-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-11",
      "title": "Soft launch COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-10",
      "due": "2026-12-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Первые продажи",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-11",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-07",
        "BK-09"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-12",
      "title": "🚀 Открытие COMX",
      "description": "",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-15",
      "due": "2026-12-15",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Работающий книжный",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-11"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-01",
      "title": "Концепция кафе: меню, зал, бар",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-11-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепция утверждена",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-01",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-02",
      "title": "Демонтаж кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-16",
      "due": "2026-11-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-03",
      "title": "Замер кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-11-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Размеры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-04",
      "title": "Планировка кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-21",
      "due": "2026-11-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-05",
      "title": "Дизайн кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-27",
      "due": "2026-12-07",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Дизайн-проект",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-06",
      "title": "Согласование кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-07",
      "due": "2026-12-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Согласие на работы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-06",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-07",
      "title": "Ремонт кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-10",
      "due": "2027-01-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Помещение готово",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-07",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08",
      "title": "Оборудование и мебель кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-01",
      "due": "2027-01-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Всё на месте",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-09",
      "title": "Меню и рецептуры кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-12-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Меню, техкарты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-09",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10",
      "title": "Персонал: бариста, бармен, официанты",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-10",
      "due": "2027-01-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Команда",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-11",
      "title": "Soft launch кафе",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-10",
      "due": "2027-01-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Первые гости",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-11",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-07",
        "CAF-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-12",
      "title": "🚀 Открытие CAFE",
      "description": "",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-15",
      "due": "2027-01-15",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Работающее кафе",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-11"
      ],
      "blockReason": ""
    }
  ],
  "comments": [],
  "subtasks": [
    {
      "id": "s-gen-07-1",
      "taskId": "t-gen-07",
      "title": "Первоначальные инвестиции",
      "done": false
    },
    {
      "id": "s-gen-07-2",
      "taskId": "t-gen-07",
      "title": "Ремонт и инженерия",
      "done": false
    },
    {
      "id": "s-gen-07-3",
      "taskId": "t-gen-07",
      "title": "Оборудование",
      "done": false
    },
    {
      "id": "s-gen-07-4",
      "taskId": "t-gen-07",
      "title": "Упаковка и мебель",
      "done": false
    },
    {
      "id": "s-gen-07-5",
      "taskId": "t-gen-07",
      "title": "Зарплаты",
      "done": false
    },
    {
      "id": "s-gen-07-6",
      "taskId": "t-gen-07",
      "title": "Аренда и коммунальные",
      "done": false
    },
    {
      "id": "s-gen-07-7",
      "taskId": "t-gen-07",
      "title": "Продукты и доставка",
      "done": false
    },
    {
      "id": "s-gen-07-8",
      "taskId": "t-gen-07",
      "title": "Маркетинг",
      "done": false
    },
    {
      "id": "s-gen-07-9",
      "taskId": "t-gen-07",
      "title": "Налоги",
      "done": false
    },
    {
      "id": "s-gen-07-10",
      "taskId": "t-gen-07",
      "title": "Резерв 10–15%",
      "done": false
    },
    {
      "id": "s-gen-23-1",
      "taskId": "t-gen-23",
      "title": "Электричество: мощность и точки",
      "done": false
    },
    {
      "id": "s-gen-23-2",
      "taskId": "t-gen-23",
      "title": "Вода: точки подключения",
      "done": false
    },
    {
      "id": "s-gen-23-3",
      "taskId": "t-gen-23",
      "title": "Канализация",
      "done": false
    },
    {
      "id": "s-gen-23-4",
      "taskId": "t-gen-23",
      "title": "Вентиляция",
      "done": false
    },
    {
      "id": "s-gen-23-5",
      "taskId": "t-gen-23",
      "title": "Возможность вытяжки",
      "done": false
    },
    {
      "id": "s-gen-23-6",
      "taskId": "t-gen-23",
      "title": "Отопление / кондиционирование",
      "done": false
    },
    {
      "id": "s-gen-26-1",
      "taskId": "t-gen-26",
      "title": "Электрик / инженер",
      "done": false
    },
    {
      "id": "s-gen-26-2",
      "taskId": "t-gen-26",
      "title": "Сантехник",
      "done": false
    },
    {
      "id": "s-gen-26-3",
      "taskId": "t-gen-26",
      "title": "Вентиляционная компания",
      "done": false
    },
    {
      "id": "s-gen-70-1",
      "taskId": "t-gen-70",
      "title": "Касса / фискализация",
      "done": false
    },
    {
      "id": "s-gen-70-2",
      "taskId": "t-gen-70",
      "title": "Эквайринг",
      "done": false
    },
    {
      "id": "s-gen-70-3",
      "taskId": "t-gen-70",
      "title": "Учётная система",
      "done": false
    },
    {
      "id": "s-gen-70-4",
      "taskId": "t-gen-70",
      "title": "Склад и списания",
      "done": false
    },
    {
      "id": "s-gen-70-5",
      "taskId": "t-gen-70",
      "title": "Себестоимость и отчётность",
      "done": false
    },
    {
      "id": "s-gen-70-6",
      "taskId": "t-gen-70",
      "title": "Интеграция с доставкой",
      "done": false
    },
    {
      "id": "s-gen-70-7",
      "taskId": "t-gen-70",
      "title": "Интеграция с приложением лояльности",
      "done": false
    },
    {
      "id": "s-gen-71-1",
      "taskId": "t-gen-71",
      "title": "Кто закупает",
      "done": false
    },
    {
      "id": "s-gen-71-2",
      "taskId": "t-gen-71",
      "title": "Что и где",
      "done": false
    },
    {
      "id": "s-gen-71-3",
      "taskId": "t-gen-71",
      "title": "Как часто",
      "done": false
    },
    {
      "id": "s-gen-71-4",
      "taskId": "t-gen-71",
      "title": "Минимальная партия",
      "done": false
    },
    {
      "id": "s-gen-71-5",
      "taskId": "t-gen-71",
      "title": "Срок поставки",
      "done": false
    },
    {
      "id": "s-gen-71-6",
      "taskId": "t-gen-71",
      "title": "Резервный поставщик для критичных продуктов",
      "done": false
    },
    {
      "id": "s-gen-80-1",
      "taskId": "t-gen-80",
      "title": "Графики уборки",
      "done": false
    },
    {
      "id": "s-gen-80-2",
      "taskId": "t-gen-80",
      "title": "Температурный контроль",
      "done": false
    },
    {
      "id": "s-gen-80-3",
      "taskId": "t-gen-80",
      "title": "Контроль сроков годности",
      "done": false
    },
    {
      "id": "s-gen-80-4",
      "taskId": "t-gen-80",
      "title": "Личная гигиена",
      "done": false
    },
    {
      "id": "s-gen-80-5",
      "taskId": "t-gen-80",
      "title": "HACCP-логика процессов",
      "done": false
    },
    {
      "id": "s-gen-80-6",
      "taskId": "t-gen-80",
      "title": "Документы поставщиков",
      "done": false
    },
    {
      "id": "s-waf-23-1",
      "taskId": "t-waf-23",
      "title": "Время производства",
      "done": false
    },
    {
      "id": "s-waf-23-2",
      "taskId": "t-waf-23",
      "title": "Мощность оборудования",
      "done": false
    },
    {
      "id": "s-waf-23-3",
      "taskId": "t-waf-23",
      "title": "Сколько людей на смене",
      "done": false
    },
    {
      "id": "s-waf-23-4",
      "taskId": "t-waf-23",
      "title": "Максимальный объём",
      "done": false
    },
    {
      "id": "s-waf-23-5",
      "taskId": "t-waf-23",
      "title": "Пиковая нагрузка",
      "done": false
    },
    {
      "id": "s-waf-26-1",
      "taskId": "t-waf-26",
      "title": "Холодильник",
      "done": false
    },
    {
      "id": "s-waf-26-2",
      "taskId": "t-waf-26",
      "title": "Морозильник",
      "done": false
    },
    {
      "id": "s-waf-26-3",
      "taskId": "t-waf-26",
      "title": "Сухой склад",
      "done": false
    },
    {
      "id": "s-waf-26-4",
      "taskId": "t-waf-26",
      "title": "Место под упаковку",
      "done": false
    },
    {
      "id": "s-waf-26-5",
      "taskId": "t-waf-26",
      "title": "Маркировка FIFO/FEFO",
      "done": false
    },
    {
      "id": "s-waf-51-1",
      "taskId": "t-waf-51",
      "title": "Кондитеры",
      "done": false
    },
    {
      "id": "s-waf-51-2",
      "taskId": "t-waf-51",
      "title": "Бариста",
      "done": false
    },
    {
      "id": "s-app-01-1",
      "taskId": "t-app-01",
      "title": "Баллы или кэшбэк",
      "done": false
    },
    {
      "id": "s-app-01-2",
      "taskId": "t-app-01",
      "title": "Цифровые штампы",
      "done": false
    },
    {
      "id": "s-app-01-3",
      "taskId": "t-app-01",
      "title": "Уровни гостя",
      "done": false
    },
    {
      "id": "s-app-01-4",
      "taskId": "t-app-01",
      "title": "Приветственный бонус",
      "done": false
    },
    {
      "id": "s-app-02-1",
      "taskId": "t-app-02",
      "title": "Челленджи",
      "done": false
    },
    {
      "id": "s-app-02-2",
      "taskId": "t-app-02",
      "title": "Стрики (серии визитов)",
      "done": false
    },
    {
      "id": "s-app-02-3",
      "taskId": "t-app-02",
      "title": "Коллекции / ачивки",
      "done": false
    },
    {
      "id": "s-app-02-4",
      "taskId": "t-app-02",
      "title": "Мини-игра или колесо",
      "done": false
    },
    {
      "id": "s-app-02-5",
      "taskId": "t-app-02",
      "title": "Награды",
      "done": false
    },
    {
      "id": "s-app-04-1",
      "taskId": "t-app-04",
      "title": "User stories",
      "done": false
    },
    {
      "id": "s-app-04-2",
      "taskId": "t-app-04",
      "title": "Экраны",
      "done": false
    },
    {
      "id": "s-app-04-3",
      "taskId": "t-app-04",
      "title": "Вход через Telegram (без паролей)",
      "done": false
    },
    {
      "id": "s-app-04-4",
      "taskId": "t-app-04",
      "title": "Уведомления от бота",
      "done": false
    },
    {
      "id": "s-app-04-5",
      "taskId": "t-app-04",
      "title": "Админка",
      "done": false
    },
    {
      "id": "s-app-04-6",
      "taskId": "t-app-04",
      "title": "Интеграция с POS",
      "done": false
    },
    {
      "id": "s-app-04-7",
      "taskId": "t-app-04",
      "title": "Аналитика",
      "done": false
    },
    {
      "id": "s-app-14-1",
      "taskId": "t-app-14",
      "title": "Бот создан через BotFather",
      "done": false
    },
    {
      "id": "s-app-14-2",
      "taskId": "t-app-14",
      "title": "Название, аватар, описание в айдентике",
      "done": false
    },
    {
      "id": "s-app-14-3",
      "taskId": "t-app-14",
      "title": "Кнопка меню открывает Mini App",
      "done": false
    },
    {
      "id": "s-app-14-4",
      "taskId": "t-app-14",
      "title": "Приветственное сообщение",
      "done": false
    },
    {
      "id": "s-app-14-5",
      "taskId": "t-app-14",
      "title": "Домен Mini App подключён",
      "done": false
    },
    {
      "id": "s-dk-14-1",
      "taskId": "t-dk-14",
      "title": "Дизайн",
      "done": false
    },
    {
      "id": "s-dk-14-2",
      "taskId": "t-dk-14",
      "title": "Тест на время доставки",
      "done": false
    },
    {
      "id": "s-dk-14-3",
      "taskId": "t-dk-14",
      "title": "Заказ",
      "done": false
    },
    {
      "id": "s-dk-16-1",
      "taskId": "t-dk-16",
      "title": "Договоры",
      "done": false
    },
    {
      "id": "s-dk-16-2",
      "taskId": "t-dk-16",
      "title": "Загрузка меню и цен",
      "done": false
    },
    {
      "id": "s-dk-16-3",
      "taskId": "t-dk-16",
      "title": "Фото",
      "done": false
    },
    {
      "id": "s-dk-16-4",
      "taskId": "t-dk-16",
      "title": "Модерация",
      "done": false
    },
    {
      "id": "s-dk-34-1",
      "taskId": "t-dk-34",
      "title": "Холодильные камеры",
      "done": false
    },
    {
      "id": "s-dk-34-2",
      "taskId": "t-dk-34",
      "title": "Заморозка",
      "done": false
    },
    {
      "id": "s-dk-34-3",
      "taskId": "t-dk-34",
      "title": "Сухой склад",
      "done": false
    },
    {
      "id": "s-dk-34-4",
      "taskId": "t-dk-34",
      "title": "Маркировка FIFO/FEFO",
      "done": false
    }
  ],
  "wiki": [
    {
      "id": "w1",
      "title": "Master-план запуска",
      "zone": "all",
      "visibility": "staff",
      "body": "Старт 24.09.2026. Ремонт по очереди: WAFL → Dark Kitchen → COMX → CAFE (демонтаж → замер → планировка → дизайн → согласование → ремонт).\n\nОткрытия (план): WAFL 28.10.2026 · Dark Kitchen 10.11.2026 · COMX 15.12.2026 · CAFE 15.01.2027. Даты COMX и CAFE — ориентир, уточняются после запуска кухни.\n\n7 потоков: LEGAL & FINANCE · SPACE & BUILD · BRAND & MARKETING · PRODUCT & APP · EQUIPMENT & SUPPLY · PEOPLE & TRAINING · LAUNCH & OPS. Готовность проекта считается из закрытых задач (critical path весит ×3).\n\nКаждый запуск: тест производства → тестовые смены → soft launch → анализ → полноценный запуск.\n\nРезерв: держим 10–15% по времени — 28.10 и 10.11 плановые, не гарантированные даты.\n\nПолный план: data/master-plan.csv в репозитории."
    }
  ],
  "notices": [],
  "contacts": [
    {
      "id": "k-armen",
      "name": "Armen",
      "company": "CRM X",
      "title": "Owner проекта",
      "phone": "",
      "email": "",
      "zone": "all",
      "telegram": "",
      "whatsapp": "",
      "kind": "staff"
    },
    {
      "id": "k-vladimir",
      "name": "Vladimir",
      "company": "CRM X",
      "title": "Креативный директор",
      "phone": "",
      "email": "",
      "zone": "all",
      "telegram": "",
      "whatsapp": "",
      "kind": "staff"
    },
    {
      "id": "k-karina",
      "name": "Karina",
      "company": "CRM X",
      "title": "Маркетинг",
      "phone": "",
      "email": "",
      "zone": "all",
      "telegram": "",
      "whatsapp": "",
      "kind": "staff"
    },
    {
      "id": "k3",
      "name": "Кинотеатр Москва",
      "company": "Moskva Cinema",
      "title": "Арендодатель",
      "phone": "",
      "email": "",
      "zone": "wafl",
      "telegram": "",
      "whatsapp": "",
      "kind": "partner"
    }
  ],
  "broadcast": {
    "text": "Стартуем master-план: WAFL 28.10, Dark Kitchen 10.11. Сначала договоры и демонтаж.",
    "emoji": "🚀",
    "authorId": "u-armen",
    "updatedAt": "2026-09-24T09:00:00"
  },
  "authVersion": 2,
  "activity": []
};
