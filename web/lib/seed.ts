import type { AppState } from "./types";

export const seed: AppState = {
  "zones": [
    {
      "slug": "wafl",
      "name": "WAFL",
      "emoji": "🧇",
      "color": "#F5D76E",
      "deadline": "2026-11-06",
      "readiness": {}
    },
    {
      "slug": "kitchen",
      "name": "Dark Kitchen",
      "emoji": "🍳",
      "color": "#F5A9A9",
      "deadline": "2026-11-21",
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
      "deadline": "2026-11-25",
      "readiness": {}
    },
    {
      "slug": "common",
      "name": "ОБЩИЕ",
      "emoji": "🏛️",
      "color": "#E5E7EB",
      "deadline": "2026-11-10",
      "readiness": {}
    },
    {
      "slug": "secret",
      "name": "Secret Door",
      "emoji": "🚪",
      "color": "#D8B4FE",
      "deadline": "2027-01-20",
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
        "common",
        "secret"
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
        "common",
        "secret"
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
        "common",
        "secret"
      ],
      "managerId": "u-vladimir"
    },
    {
      "id": "u-design",
      "name": "Design",
      "email": "Design",
      "password": "1234",
      "role": "employee",
      "zone": null,
      "title": "Дизайнер интерьера (внешний)",
      "avatar": "D",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common",
        "secret"
      ],
      "managerId": "u-armen"
    },
    {
      "id": "u-chef-wafl",
      "name": "Шеф WAFL",
      "email": "ChefWafl",
      "password": "1234",
      "role": "employee",
      "zone": "wafl",
      "title": "Шеф (меню и рецептуры)",
      "avatar": "Ш",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common",
        "secret"
      ],
      "managerId": "u-armen"
    },
    {
      "id": "u-chef-kitchen",
      "name": "Шеф Dark Kitchen",
      "email": "ChefKitchen",
      "password": "1234",
      "role": "employee",
      "zone": "kitchen",
      "title": "Шеф (меню и рецептуры)",
      "avatar": "Ш",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common",
        "secret"
      ],
      "managerId": "u-armen"
    },
    {
      "id": "u-chef-cafe",
      "name": "Шеф CAFE",
      "email": "ChefCafe",
      "password": "1234",
      "role": "employee",
      "zone": "cafe",
      "title": "Шеф (меню и рецептуры)",
      "avatar": "Ш",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx",
        "common",
        "secret"
      ],
      "managerId": "u-armen"
    }
  ],
  "tasks": [
    {
      "id": "t-gen-g01",
      "title": "Регулярные встречи и контроль плана",
      "description": "Ритм управления проектом до открытия кафе: ежедневные и еженедельные встречи, обзор бюджета, ревью готовности перед запусками.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-vladimir",
        "u-karina",
        "u-artur"
      ],
      "startDate": "2026-10-07",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G01",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-83",
      "title": "Ежедневная планёрка команды (по будням, 15 минут)",
      "description": "Каждый будний день, 15 минут: что сделано, что в работе, что блокирует.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-vladimir",
        "u-karina"
      ],
      "startDate": "2026-10-07",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-83",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-84",
      "title": "Еженедельный статус с Artur (60 минут)",
      "description": "Раз в неделю: сроки, бюджет, решения на согласование. День недели согласовать.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-07",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-84",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-85",
      "title": "Еженедельная встреча по бренду и маркетингу",
      "description": "Раз в неделю: фирменный стиль, контент, блогеры, подготовка к запускам.\n\nНаправления: Маркетинг, Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina",
        "u-armen"
      ],
      "startDate": "2026-10-07",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-85",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-86",
      "title": "Планёрка на объектах: подрядчики и дизайнер интерьера (2 раза в неделю)",
      "description": "Два раза в неделю на объекте: ход работ, замечания, согласование изменений.\n\nНаправления: Ремонтные работы, Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-12-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-86",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-87",
      "title": "Еженедельное обновление плана и статусов в портале (пятница)",
      "description": "Каждую пятницу: обновить статусы, сдвиги и риски, отправить итоги Artur.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-87",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-88",
      "title": "Ежемесячный обзор бюджета и финмодели (Armen + Artur)",
      "description": "В конце каждого месяца: план/факт по расходам, остаток бюджета, прогноз.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-30",
      "due": "2026-12-31",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-88",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-89",
      "title": "Ревью готовности перед запусками (за 7 и за 2 дня)",
      "description": "Чек-лист готовности: помещение, оборудование, команда, продукт, маркетинг, документы. Итог — решение go/no-go.\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-30",
      "due": "2027-01-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-89",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g01"
    },
    {
      "id": "t-gen-g02",
      "title": "Юрлица, договоры, бухгалтерия и банк",
      "description": "Юридическая база проекта: договоры по объектам, юрлица, бухгалтерия, счета и платёжные инструменты\n\nНаправления: Административные вопросы, Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-14",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G02",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-03",
      "title": "Нотариус / оформление документов",
      "description": "Выполнено\n\nНаправления: Административные вопросы, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-03",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-02",
      "title": "Подписание договоров по объектам",
      "description": "Выполнено\n\nНаправления: Административные вопросы, Документы",
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
      "status": "done",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-02",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-01",
      "title": "Проверка договорных ограничений по помещениям",
      "description": "Выполнено\n\nНаправления: Административные вопросы, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-01",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-04",
      "title": "Регистрация / запуск юрлиц",
      "description": "Направления: Документы, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-04",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-05",
      "title": "Бухгалтерия: бухгалтер / аутсорс, налоговый режим",
      "description": "Направления: Административные вопросы, Документы",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-05",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-06",
      "title": "Банковские счета и платёжные инструменты",
      "description": "Направления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-06",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-gen-g02"
    },
    {
      "id": "t-gen-g03",
      "title": "Разрешения, лицензии и требования",
      "description": "Требования к food-объектам, вывеске и фасаду, пожарные и санитарные нормы, разрешения и лицензия на алкоголь\n\nНаправления: Документы, Административные вопросы, Ремонтные работы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-12-10",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G03",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-08",
      "title": "Требования и разрешения для food-проекта",
      "description": "Направления: Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-08",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g03"
    },
    {
      "id": "t-gen-09",
      "title": "Требования к вывеске / фасаду / окну",
      "description": "Направления: Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-09",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g03"
    },
    {
      "id": "t-gen-10",
      "title": "Получение разрешений и документов для food",
      "description": "Направления: Документы, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-10",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-08",
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-gen-g03"
    },
    {
      "id": "t-gen-13",
      "title": "Лицензия на алкоголь (CAFE, 24/7): требования, подача, получение",
      "description": "Уточнить реальные сроки выдачи — подать заранее\n\nНаправления: Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-12-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-13",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-gen-g03"
    },
    {
      "id": "t-gen-24",
      "title": "Пожарные и санитарные требования к объектам",
      "description": "Направления: Документы, Ремонтные работы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-24",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g03"
    },
    {
      "id": "t-gen-g04",
      "title": "Обследование объектов, подрядчики и график ремонта",
      "description": "Осмотр, обмеры, обследование инженерии, технический паспорт, подрядчики, смета инженерных работ и общий график\n\nНаправления: Ремонтные работы, Закупки, Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G04",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-23",
      "title": "Техническое обследование инженерии",
      "description": "Выполнено\n\nНаправления: Ремонтные работы, Закупки, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-23",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-22",
      "title": "Что можно и что нельзя демонтировать",
      "description": "Выполнено\n\nНаправления: Ремонтные работы, Закупки, Документы",
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
      "status": "done",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-22",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-21",
      "title": "Первичный обмер всех помещений",
      "description": "Выполнено\n\nНаправления: Ремонтные работы, Закупки, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-21",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-20",
      "title": "Первичный осмотр объектов",
      "description": "Выполнено\n\nНаправления: Ремонтные работы, Закупки, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-20",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-27",
      "title": "Общий график ремонта: Waffle → Dark Kitchen → COMX → CAFE",
      "description": "Выполнено\n\nНаправления: Ремонтные работы, Закупки, Документы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-27",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-25",
      "title": "Технический паспорт объектов",
      "description": "Направления: Документы, Ремонтные работы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-10",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-25",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-26",
      "title": "Подрядчики: электрик, сантехник, вентиляция",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-10",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-26",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-28",
      "title": "Предварительный расчёт инженерных работ",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "common",
      "zones": [
        "common"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-28",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "GEN-26"
      ],
      "blockReason": "",
      "parentId": "t-gen-g04"
    },
    {
      "id": "t-gen-g05",
      "title": "Бюджет, финмодель и согласования с Artur",
      "description": "Финмодель и бюджет запуска, согласование концепций и бюджетов у собственника\n\nНаправления: Административные вопросы, Дизайн, Продукт",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-10-20",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G05",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-07",
      "title": "Финансовая модель и бюджет запуска",
      "description": "Выполнено\n\nНаправления: Административные вопросы, Дизайн, Продукт",
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
      "status": "done",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-07",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g05"
    },
    {
      "id": "t-gen-31",
      "title": "Календарь утверждения дизайна: дедлайны WAFL 14.10 / DK 28.10 / COMX 31.10 / CAFE 13.11",
      "description": "Направления: Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-07",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-31",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g05"
    },
    {
      "id": "t-art-01",
      "title": "Artur: утверждение финмодели и бюджета запуска (CAPEX)",
      "description": "Armen готовит, Artur утверждает\n\nНаправления: Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-01",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g05"
    },
    {
      "id": "t-art-03",
      "title": "Artur + Armen: утверждение концепций COMX и CAFE",
      "description": "Направления: Продукт, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-20",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-03",
      "wave": "",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "BK-01",
        "CAF-01"
      ],
      "blockReason": "",
      "parentId": "t-gen-g05"
    },
    {
      "id": "t-gen-g06",
      "title": "Бренд и фирменный стиль",
      "description": "Концепция, название, логотип, айдентика, бренд-гайд и униформа. Утверждают Armen и Artur\n\nНаправления: Маркетинг, Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [
        "u-armen",
        "u-artur",
        "u-karina"
      ],
      "startDate": "2026-10-05",
      "due": "2026-10-29",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G06",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-44",
      "title": "Варианты логотипа",
      "description": "Выполнено\n\nНаправления: Маркетинг, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-44",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-43",
      "title": "Название и позиционирование",
      "description": "Выполнено\n\nНаправления: Маркетинг, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-43",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-42",
      "title": "Brand concept",
      "description": "Выполнено\n\nНаправления: Маркетинг, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-42",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-41",
      "title": "Исследование конкурентов и визуального поля",
      "description": "Выполнено\n\nНаправления: Маркетинг, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-41",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-40",
      "title": "Сбор референсов, moodboard",
      "description": "Выполнено\n\nНаправления: Маркетинг, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-40",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-45",
      "title": "Выбор направления логотипа",
      "description": "Направления: Дизайн, Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-05",
      "due": "2026-10-06",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-45",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-46",
      "title": "Айдентика",
      "description": "Направления: Дизайн, Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-46",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-47",
      "title": "Tone of Voice",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-47",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-48",
      "title": "Бренд-гайд / базовые правила",
      "description": "Направления: Дизайн, Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-48",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-49",
      "title": "Униформа персонала",
      "description": "Направления: Дизайн, Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-49",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-art-02",
      "title": "Artur + Armen: утверждение айдентики и бренд-гайда (готовит Vladimir)",
      "description": "Vladimir представляет, Armen и Artur утверждают\n\nНаправления: Дизайн, Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-25",
      "due": "2026-10-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-02",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-48"
      ],
      "blockReason": "",
      "parentId": "t-gen-g06"
    },
    {
      "id": "t-gen-g07",
      "title": "Digital: домены, соцсети, сайт, карточки на картах",
      "description": "Домены, аккаунты и оформление соцсетей, сайт, карточки на Google Maps, Yandex Maps и 2GIS\n\nНаправления: Маркетинг, Разработка, Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [
        "u-vladimir"
      ],
      "startDate": "2026-10-19",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G07",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-52",
      "title": "Регистрация соцсетей",
      "description": "Выполнено\n\nНаправления: Маркетинг, Разработка, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-52",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-51",
      "title": "Покупка доменов",
      "description": "Выполнено\n\nНаправления: Маркетинг, Разработка, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-51",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-50",
      "title": "Проверка доменов",
      "description": "Выполнено\n\nНаправления: Маркетинг, Разработка, Дизайн",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-50",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-53",
      "title": "Оформление соцсетей",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-53",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-56",
      "title": "Сайт / лендинг",
      "description": "Направления: Разработка, Дизайн",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-56",
      "wave": "",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-57",
      "title": "Карточки в Google Maps, Yandex Maps, 2GIS",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-57",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g07"
    },
    {
      "id": "t-gen-g08",
      "title": "Маркетинг-план, контент и PR",
      "description": "Общий маркетинг-план запусков, контент-план, фото, блогеры и медиа, подрядчики по полиграфии и мерчу\n\nНаправления: Маркетинг, Продажи, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-11-06",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G08",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-54",
      "title": "Контент-план запуска",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-54",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-47"
      ],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-gen-55",
      "title": "Фото и визуальный контент",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-55",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-gen-58",
      "title": "PR открытия: блогеры, городские медиа, событие",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-11-06",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-58",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-mkt-01",
      "title": "Маркетинг-план запуска 4 объектов: даты, каналы, бюджет, ответственные",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-13",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-01",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-mkt-02",
      "title": "Блогеры и локальные медиа: список, условия (бартер/оплата), договорённости по открытиям",
      "description": "Направления: Маркетинг",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-02",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-01"
      ],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-mkt-03",
      "title": "Подрядчики по полиграфии и мерчу: поиск, КП, образцы, сроки",
      "description": "Смотреть сроки печати: открытие Waffle 06.11\n\nНаправления: Маркетинг, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-03",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g08"
    },
    {
      "id": "t-gen-g09",
      "title": "Команда: найм, договоры, обучение (общее)",
      "description": "Состав команды, воронка найма, менеджеры объектов, трудовые договоры, медкнижки\n\nНаправления: HR, Документы, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-31",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G09",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-60",
      "title": "Трудовые договоры, зарплатная схема, мотивация",
      "description": "Направления: HR, Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-60",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-61",
      "title": "Медкнижки / санминимум персонала",
      "description": "Направления: HR, Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-61",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-62",
      "title": "Сводный план найма: роли × даты × ФОТ × каналы (WAFL, DK, COMX, CAFE)",
      "description": "Расчёт: смены 10–12 ч, график 2/2 → ~4 человека на 1 позицию. Waffle и CAFE: 8–22, выходные до 23:00\n\nНаправления: HR",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-62",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-63",
      "title": "Каналы подбора: job.am / Staff.am, Telegram-чаты, Instagram, рефералка, колледжи",
      "description": "Направления: HR",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-63",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-64",
      "title": "Единая воронка: отклик → скрининг → интервью → пробная смена → оффер",
      "description": "Направления: HR",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-64",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-65",
      "title": "Менеджеры объектов: роли, ФОТ, сроки найма",
      "description": "Технадзор, найм (HR) и закупки ведёт сам Armen — отдельных людей не нанимаем\n\nНаправления: HR, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-65",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-69",
      "title": "Найм: менеджеры Waffle и Dark Kitchen (ведут запуск, потом операционку)",
      "description": "Менеджер CAFE — вместе с шефом до 15.11\n\nНаправления: HR",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-23",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-69",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-65"
      ],
      "blockReason": "",
      "parentId": "t-gen-g09"
    },
    {
      "id": "t-gen-g10",
      "title": "Касса, закупки и стандарты работы",
      "description": "Касса и учёт, логистика закупок, график заказа оборудования, food safety, стандарты, ежедневные отчёты\n\nНаправления: Административные вопросы, Закупки, Технологии",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-11-05",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G10",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-70",
      "title": "Касса, POS, эквайринг, учёт",
      "description": "Направления: Технологии, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-19",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-70",
      "wave": "",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-71",
      "title": "Логистика закупок: кто, где, как часто",
      "description": "Направления: Закупки, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-26",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-71",
      "wave": "",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-72",
      "title": "Сводный график заказа оборудования с учётом сроков поставки",
      "description": "WAFL до 12.10, DK до 19.10 (вытяжка 26.10), COMX мебель 03.11, CAFE до 18.11\n\nНаправления: Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-72",
      "wave": "",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-80",
      "title": "Food safety: процедуры и контроль",
      "description": "Направления: Документы, Административные вопросы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-80",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-81",
      "title": "Стандарты работы: открытие и закрытие смены, сервис",
      "description": "Направления: Административные вопросы, HR",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-29",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-81",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-82",
      "title": "Ежедневный отчёт после запуска",
      "description": "Направления: Административные вопросы, Продажи",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-11-05",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-82",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g10"
    },
    {
      "id": "t-gen-g11",
      "title": "Эксплуатация: договоры обслуживания, страхование, безопасность",
      "description": "Вывоз отходов, дезинсекция, клининг, страхование, интернет, видеонаблюдение, пожарная безопасность\n\nНаправления: Документы, Ремонтные работы, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-G11",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-11",
      "title": "Договоры на вывоз отходов, дезинсекцию, клининг",
      "description": "Направления: Документы, Закупки",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-11",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g11"
    },
    {
      "id": "t-gen-12",
      "title": "Страхование помещений и оборудования",
      "description": "Направления: Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-12",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g11"
    },
    {
      "id": "t-gen-29",
      "title": "Интернет, Wi-Fi, видеонаблюдение, сигнализация",
      "description": "Направления: Технологии, Ремонтные работы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-29",
      "wave": "",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g11"
    },
    {
      "id": "t-gen-30",
      "title": "Пожарная безопасность: огнетушители, датчики, план эвакуации",
      "description": "Направления: Ремонтные работы, Документы",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "GEN-30",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-gen-g11"
    },
    {
      "id": "t-waf-g01",
      "title": "Waffle: демонтаж, планировка и согласование",
      "description": "Демонтаж, замеры, планировка, инженерный план и согласования с арендодателем\n\nНаправления: Ремонтные работы, Дизайн, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-16",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G01",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-01",
      "title": "Демонтаж Waffle",
      "description": "Направления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-01",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-02",
      "title": "Замер Waffle после демонтажа",
      "description": "Направления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-02",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01"
      ],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-03",
      "title": "Планировка Waffle",
      "description": "Направления: Ремонтные работы, Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-03",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-02"
      ],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-04",
      "title": "Проверка планировки с оборудованием",
      "description": "Оборудование выбрано до 09.10\n\nНаправления: Ремонтные работы, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-04",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-03",
        "WAF-22"
      ],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-05",
      "title": "Финальный инженерный план Waffle",
      "description": "Направления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-05",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-03",
        "GEN-25"
      ],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-07",
      "title": "Согласование дизайна и работ: арендодатель, фасад, пожарные",
      "description": "Направления: Документы, Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-07",
      "wave": "A",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "WAF-06",
        "GEN-09"
      ],
      "blockReason": "",
      "parentId": "t-waf-g01"
    },
    {
      "id": "t-waf-g02",
      "title": "Waffle: дизайн точки",
      "description": "Дизайн от брифа до утверждения (дедлайн 14.10). Делает внешний дизайнер, утверждают Armen и Artur\n\nНаправления: Дизайн, Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-08",
      "due": "2026-10-14",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G02",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-06",
      "title": "Дизайн точки Waffle",
      "description": "Дизайн утверждается до 14.10. Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике\nИсполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-06",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01",
        "GEN-45"
      ],
      "blockReason": "",
      "parentId": "t-waf-g02"
    },
    {
      "id": "t-waf-06.1",
      "title": "Бриф дизайнеру Waffle: размеры окна, оборудование, поток, айдентика",
      "description": "Направления: Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-06.1",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01"
      ],
      "blockReason": "",
      "parentId": "t-waf-g02"
    },
    {
      "id": "t-waf-06.2",
      "title": "Концепт точки (2 варианта)",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-06.2",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.1"
      ],
      "blockReason": "",
      "parentId": "t-waf-g02"
    },
    {
      "id": "t-waf-06.3",
      "title": "Правки и финальный проект: размеры, материалы, спецификация",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-06.3",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.2"
      ],
      "blockReason": "",
      "parentId": "t-waf-g02"
    },
    {
      "id": "t-waf-06.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА Waffle",
      "description": "Направления: Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-14",
      "due": "2026-10-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-06.4",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.3"
      ],
      "blockReason": "",
      "parentId": "t-waf-g02"
    },
    {
      "id": "t-waf-g03",
      "title": "Waffle: ремонт и окно выдачи",
      "description": "Ремонт, материалы и мебель, окно выдачи: подрядчик, замер, производство, монтаж\n\nНаправления: Ремонтные работы, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-31",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G03",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-08",
      "title": "Ремонт и инженерные работы Waffle",
      "description": "Направления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-16",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-08",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-07",
        "WAF-05"
      ],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-09",
      "title": "Заказ материалов и мебели",
      "description": "Направления: Закупки, Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-09",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-06"
      ],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-10",
      "title": "Подрядчик на окно выдачи",
      "description": "Направления: Закупки, Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "in_progress",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-10",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-11",
      "title": "Замер окна",
      "description": "Замер окна сразу после демонтажа\n\nНаправления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-11",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-10",
        "WAF-01"
      ],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-12",
      "title": "Производство окна",
      "description": "Старт сразу после утверждения дизайна 14.10\n\nНаправления: Ремонтные работы, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-12",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-11",
        "GEN-09"
      ],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-13",
      "title": "Монтаж окна",
      "description": "Направления: Ремонтные работы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-13",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-12"
      ],
      "blockReason": "",
      "parentId": "t-waf-g03"
    },
    {
      "id": "t-waf-g04",
      "title": "Waffle: оборудование, поставщики и упаковка",
      "description": "Выбор, заказ, доставка и монтаж оборудования, хранение, поставщики продуктов, упаковка\n\nНаправления: Закупки, Продукт, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur",
        "u-vladimir"
      ],
      "startDate": "2026-10-06",
      "due": "2026-11-02",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G04",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-05",
      "title": "Artur: согласование заказа оборудования Waffle (КП, сумма, предоплата)",
      "description": "Направления: Закупки, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-05",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "ART-01",
        "WAF-22.2"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-20",
      "title": "Можно ли привезти оборудование",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-06",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-20",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-21",
      "title": "Поиск локального оборудования (если привезти нельзя)",
      "description": "Направления: Закупки",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-21",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-20"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-22",
      "title": "Сравнение оборудования и цен, выбор",
      "description": "Выбор оборудования до 09.10\n\nНаправления: Закупки",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-22",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-20"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-64",
      "title": "ТЗ на оборудование: вафельницы, холод, кофемашина (по производственной мощности)",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-64",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-23"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-22.2",
      "title": "КП от ≥3 поставщиков, сроки поставки, сравнение",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-22.2",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-64"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-23",
      "title": "Производственная мощность: сколько вафель в час в пик",
      "description": "Направления: Закупки, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-23",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-24",
      "title": "Заказ оборудования",
      "description": "Заказ до 12.10 — иначе срыв запуска\n\nНаправления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-24",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22",
        "ART-05"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-24.3",
      "title": "Договор, предоплата, фиксация срока поставки ≤18 дней",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-24.3",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22.2"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-25",
      "title": "Доставка оборудования",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-25",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-24"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-25.1",
      "title": "Приёмка оборудования по чек-листу, проверка на брак",
      "description": "Направления: Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-25.1",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-24.3"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-26",
      "title": "Хранение: холодильник, морозилка, сухой склад, упаковка",
      "description": "Направления: Закупки, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-26",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-04"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-27",
      "title": "Поставщики продуктов + резервные",
      "description": "Направления: Закупки, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-27",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-28",
      "title": "Упаковка Waffle: дизайн и поставщик",
      "description": "Направления: Дизайн, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-28",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "GEN-45"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-29",
      "title": "Заказ упаковки",
      "description": "Направления: Закупки, Маркетинг",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-10-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-29",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-28"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-30",
      "title": "Монтаж оборудования",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-30",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-08",
        "WAF-25",
        "WAF-13"
      ],
      "blockReason": "",
      "parentId": "t-waf-g04"
    },
    {
      "id": "t-waf-g05",
      "title": "Waffle: продукт, рецептуры и цены",
      "description": "Шеф-кондитер, концепция продукта, рецептуры, дегустация, техкарты, себестоимость, меню-борд\n\nНаправления: Продукт, HR, Маркетинг",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur",
        "u-vladimir"
      ],
      "startDate": "2026-10-06",
      "due": "2026-11-02",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G05",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-48",
      "title": "Юнит-экономика точки Waffle",
      "description": "Выполнено\n\nНаправления: Продукт, HR, Маркетинг",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-48",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-40",
      "title": "Поиск шеф-кондитера",
      "description": "Направления: HR, Продукт",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-40",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-41",
      "title": "Выбор шеф-кондитера",
      "description": "Направления: HR, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-41",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-40"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-42",
      "title": "Концепция продукта и ассортимент",
      "description": "Направления: Продукт, Маркетинг",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-10-08",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-42",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-43",
      "title": "Разработка рецептур",
      "description": "Исполнитель: шеф-кондитер (после найма); пока — Armen\n\nНаправления: Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-chef-wafl",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-19",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-43",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-41",
        "WAF-42"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-44",
      "title": "Тестирование рецептур",
      "description": "Направления: Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-19",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-44",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-43"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-45",
      "title": "Техкарты Waffle",
      "description": "Направления: Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-45",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-44"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-46",
      "title": "Себестоимость и цены",
      "description": "Направления: Продукт, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-29",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-46",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-44"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-47",
      "title": "Меню-борд и POSM для окна",
      "description": "Направления: Дизайн, Маркетинг, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-29",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-47",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "WAF-46",
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-waf-g05"
    },
    {
      "id": "t-waf-g06",
      "title": "Waffle: команда",
      "description": "Штат, поиск, собеседования, найм, обучение, тестовые смены\n\nНаправления: HR, Продукт, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-11-04",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G06",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-50",
      "title": "Штатная структура Waffle",
      "description": "Направления: HR",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-50",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-51",
      "title": "Поиск кондитеров и бариста",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-51",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-50"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-51.1",
      "title": "Вакансии: тексты, публикация (кондитеры, бариста/кассиры; смены 10–12 ч, 2/2)",
      "description": "Часы работы 8–22 (выходные до 23:00), смены 10–12 ч, график 2/2: ~4 человека на каждую позицию → ~8 на 2 позиции + шеф-кондитер\n\nНаправления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-51.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-50"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-51.2",
      "title": "Скрининг откликов, первичные звонки",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-51.2",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-51.1"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-52",
      "title": "Собеседования",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-52",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-52.1",
      "title": "Пробные смены / практическое задание (вафли, кофе, касса)",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-52.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-51.2"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-53",
      "title": "Найм и договоры",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-53",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-52",
        "GEN-60"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-53.1",
      "title": "Оффер, договоры, медкнижки (санминимум 3–5 дней), 2 запасных кандидата",
      "description": "Направления: HR",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-53.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-52.1"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-54",
      "title": "Обучение персонала",
      "description": "Направления: HR, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-11-02",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-54",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-53"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-55",
      "title": "Тестовые смены",
      "description": "Направления: HR, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-04",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-55",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-54",
        "WAF-30"
      ],
      "blockReason": "",
      "parentId": "t-waf-g06"
    },
    {
      "id": "t-waf-g07",
      "title": "Mini App лояльности (Waffle)",
      "description": "Telegram Mini App: механика, ТЗ, разработка, интеграция с кассой, тестирование, запуск (13.11)\n\nНаправления: Разработка, Продукт, Технологии",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-vladimir",
        "u-artur",
        "u-karina"
      ],
      "startDate": "2026-10-06",
      "due": "2026-11-13",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G07",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-09",
      "title": "Artur: согласование сметы и договора на Mini App",
      "description": "Направления: Разработка, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-09",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-04"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-01",
      "title": "App: цели и механика лояльности",
      "description": "Направления: Продукт, Разработка",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-01",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-02",
      "title": "App: механики геймификации",
      "description": "Направления: Продукт, Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-02",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-03",
      "title": "App: команда разработки Telegram Mini App",
      "description": "Направления: Разработка, HR",
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
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-03",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-04",
      "title": "App: техническое задание Mini App",
      "description": "Направления: Разработка, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-13",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-04",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-01",
        "APP-02",
        "APP-03"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-05",
      "title": "App: договор с разработчиком, смета, этапы приёмки",
      "description": "Направления: Разработка, Документы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-05",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-04",
        "ART-09"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-06",
      "title": "App: UX-прототип",
      "description": "Направления: Дизайн, Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-06",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-05"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-07",
      "title": "App: UI-дизайн в айдентике",
      "description": "Направления: Дизайн, Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-07",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06",
        "GEN-46"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-08",
      "title": "App: backend — пользователи, баллы, акции, админка",
      "description": "Направления: Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-08",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-09",
      "title": "App: интеграция с POS — начисление и списание баллов",
      "description": "Направления: Разработка, Технологии",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-11-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-09",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06",
        "GEN-70"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-waf-65",
      "title": "App: Mini App — клиентская часть (UI после UI-дизайна)",
      "description": "Направления: Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-11-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-65",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-11",
      "title": "App: правила программы, оферта, политика ПДн",
      "description": "Направления: Документы, Разработка",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-11",
      "wave": "A",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-12",
      "title": "App: тестирование (QA)",
      "description": "Направления: Разработка, Технологии",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-12",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-08",
        "APP-09",
        "WAF-65"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-13",
      "title": "App: бета на тестовых сменах",
      "description": "Направления: Разработка, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-09",
      "due": "2026-11-11",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-13",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-12"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-14",
      "title": "App: бот и публикация Mini App в Telegram",
      "description": "Направления: Разработка, Технологии",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-09",
      "due": "2026-11-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-14",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-12"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-15",
      "title": "App: промо — QR на окне и упаковке ведёт в бот, стартовая акция",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-15",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "APP-06"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-app-16",
      "title": "App: запуск вместе с открытием Waffle",
      "description": "Запуск через неделю после Waffle: от готового ТЗ быстрее не успеть\n\nНаправления: Разработка, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-13",
      "due": "2026-11-13",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "APP-16",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-13",
        "APP-14"
      ],
      "blockReason": "",
      "parentId": "t-waf-g07"
    },
    {
      "id": "t-waf-g08",
      "title": "Waffle: тесты и запуск (06.11)",
      "description": "Тест производства, soft launch, go/no-go, запуск, маркетинг и PR открытия\n\nНаправления: Продажи, Маркетинг, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina",
        "u-artur"
      ],
      "startDate": "2026-10-26",
      "due": "2026-11-06",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-G08",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-04",
      "title": "Полиграфия Waffle: меню-борд, POSM, наклейки — печать и получение",
      "description": "Печать в сжатые сроки — договориться с типографией заранее\n\nНаправления: Маркетинг, Закупки, Дизайн",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-04",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-04",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-03",
        "WAF-47"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-mkt-05",
      "title": "Контент и PR запуска Waffle: анонс, обратный отсчёт, блогеры, день открытия",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-11-06",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-05",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02",
        "GEN-54"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-art-12",
      "title": "Go/no-go запуска Waffle (Armen + Artur)",
      "description": "Направления: Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-05",
      "due": "2026-11-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-12",
      "wave": "A",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "WAF-62"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-waf-60",
      "title": "Тест производства Waffle",
      "description": "Направления: Продукт, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-60",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "WAF-30"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-waf-61",
      "title": "Soft launch: ограниченные продажи",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "result": "",
      "createdAt": "2026-10-06",
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
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-waf-62",
      "title": "Анализ и корректировки",
      "description": "Направления: Продажи, Продукт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-62",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-61"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-waf-63",
      "title": "🚀 WAFFLE LAUNCH",
      "description": "Приложение запускается отдельно — 13.11\n\nНаправления: Продажи, Маркетинг",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-06",
      "due": "2026-11-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "WAF-63",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-62",
        "ART-12"
      ],
      "blockReason": "",
      "parentId": "t-waf-g08"
    },
    {
      "id": "t-dk-g01",
      "title": "Dark Kitchen: концепция и бренды",
      "description": "Исследование, концепция, выбор 2–4 виртуальных брендов, юнит-экономика, нейминг и айдентика\n\nНаправления: Продукт, Маркетинг, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [
        "u-armen",
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-10-23",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G01",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-02",
      "title": "Общая концепция Dark Kitchen",
      "description": "Выполнено\n\nНаправления: Продукт, Маркетинг, Административные вопросы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-02",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-01",
      "title": "Исследование рынка доставки: конкуренты, цены, агрегаторы",
      "description": "Выполнено\n\nНаправления: Продукт, Маркетинг, Административные вопросы",
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
      "status": "done",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-01",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-03",
      "title": "Long list виртуальных брендов",
      "description": "Направления: Продукт, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-07",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-03",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-04",
      "title": "Концепции брендов: кухня, меню, цена, ЦА, позиционирование",
      "description": "Направления: Продукт, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-04",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-03"
      ],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-05",
      "title": "Выбор 2–4 брендов для MVP",
      "description": "Направления: Продукт, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-09",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-05",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-04"
      ],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-06",
      "title": "Юнит-экономика каждого бренда",
      "description": "Направления: Административные вопросы, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-06",
      "wave": "B",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-07",
      "title": "Нейминг и айдентика виртуальных брендов",
      "description": "Направления: Дизайн, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-07",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g01"
    },
    {
      "id": "t-dk-g02",
      "title": "Dark Kitchen: меню и рецептуры",
      "description": "MVP-меню, рецептуры, дегустация, техкарты, себестоимость и цены\n\nНаправления: Продукт, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-10",
      "due": "2026-11-09",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G02",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-08",
      "title": "MVP-меню",
      "description": "Совместно с шефом (после найма)\n\nНаправления: Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-08",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g02"
    },
    {
      "id": "t-dk-09",
      "title": "Рецептуры Dark Kitchen",
      "description": "Исполнитель: шеф Dark Kitchen (после найма); пока — Armen\n\nНаправления: Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-chef-kitchen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-01",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-09",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-08",
        "DK-18"
      ],
      "blockReason": "",
      "parentId": "t-dk-g02"
    },
    {
      "id": "t-dk-10",
      "title": "Тест-дегустация / фокус-группа",
      "description": "Направления: Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-01",
      "due": "2026-11-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-10",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-09"
      ],
      "blockReason": "",
      "parentId": "t-dk-g02"
    },
    {
      "id": "t-dk-11",
      "title": "Техкарты Dark Kitchen",
      "description": "Направления: Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-11",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": "",
      "parentId": "t-dk-g02"
    },
    {
      "id": "t-dk-12",
      "title": "Себестоимость и цены",
      "description": "Направления: Продукт, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-12",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": "",
      "parentId": "t-dk-g02"
    },
    {
      "id": "t-dk-g03",
      "title": "Dark Kitchen: демонтаж, проект и ремонт кухни",
      "description": "Демонтаж, замер, планировка, инженерный проект, дизайн, согласования, ремонт\n\nНаправления: Ремонтные работы, Дизайн, Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-07",
      "due": "2026-11-11",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G03",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-20",
      "title": "Демонтаж кухни",
      "description": "Параллельно с Waffle, отдельная бригада\n\nНаправления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-07",
      "due": "2026-10-13",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-20",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-21",
      "title": "Замер кухни после демонтажа",
      "description": "Направления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-21",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-20"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-22",
      "title": "Планировка кухни",
      "description": "Направления: Ремонтные работы, Дизайн",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-22",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-21"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-23",
      "title": "Проверка планировки с оборудованием",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-23",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22",
        "DK-30"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-24",
      "title": "Инженерный проект: вытяжка, вентиляция, электричество, вода",
      "description": "Вытяжка — самый длинный заказ, закладываем сразу\n\nНаправления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-24",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22",
        "GEN-25"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-25",
      "title": "Дизайн кухни",
      "description": "Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике\nИсполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-25",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-23"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-25.1",
      "title": "Бриф дизайнеру кухни: потоки, зоны, оборудование",
      "description": "Направления: Дизайн",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-25.1",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-25.2",
      "title": "Первая версия: зонирование и 3D/схемы",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-25.2",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.1"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-25.3",
      "title": "Правки, финальные чертежи, спецификация материалов",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-25.3",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.2"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-25.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА кухни",
      "description": "Направления: Дизайн",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-28",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-25.4",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.3"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-26",
      "title": "Согласование: арендодатель, пожарные, санитария",
      "description": "Направления: Документы, Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-26",
      "wave": "B",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "DK-25",
        "DK-24"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-27",
      "title": "Ремонт и инженерные работы кухни",
      "description": "Направления: Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-31",
      "due": "2026-11-11",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-27",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-26"
      ],
      "blockReason": "",
      "parentId": "t-dk-g03"
    },
    {
      "id": "t-dk-g04",
      "title": "Dark Kitchen: оборудование, поставщики и упаковка",
      "description": "Список, заказ, доставка, приёмка, монтаж оборудования, вытяжка, хранение, поставщики, упаковка\n\nНаправления: Закупки, Продукт, Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur",
        "u-vladimir"
      ],
      "startDate": "2026-10-11",
      "due": "2026-11-14",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G04",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-06",
      "title": "Artur: согласование заказа оборудования Dark Kitchen",
      "description": "Направления: Закупки, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-16",
      "due": "2026-10-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-06",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-30.1"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-13",
      "title": "Поставщики продуктов + резервные",
      "description": "Направления: Закупки, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-13",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-14",
      "title": "Упаковка для доставки: дизайн, тест, заказ",
      "description": "Направления: Дизайн, Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-vladimir",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-11-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-14",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-07"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-30",
      "title": "Список и выбор оборудования под меню",
      "description": "Направления: Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-16",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-30",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-30.1",
      "title": "КП от ≥3 поставщиков (основное оборудование)",
      "description": "Направления: Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-16",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-30.1",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-31",
      "title": "Производственная мощность: заказов в час в пик",
      "description": "Направления: Закупки, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-11",
      "due": "2026-10-17",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-31",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-32",
      "title": "Заказ оборудования кухни",
      "description": "Заказ основного оборудования\n\nНаправления: Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-16",
      "due": "2026-10-19",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-32",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-30",
        "ART-06"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-36",
      "title": "Заказ вытяжки/вентиляции (самый долгий срок) — сразу после инженерного проекта",
      "description": "Направления: Закупки, Ремонтные работы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-36",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-24"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-33",
      "title": "Доставка оборудования кухни",
      "description": "Направления: Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-11-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-33",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-32"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-33.1",
      "title": "Приёмка оборудования, проверка на брак",
      "description": "Направления: Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-33.1",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-32"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-34",
      "title": "Хранение: холод, заморозка, сухой склад, маркировка",
      "description": "Направления: Закупки, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-18",
      "due": "2026-11-04",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-34",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-35",
      "title": "Монтаж оборудования кухни",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-12",
      "due": "2026-11-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-35",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-27",
        "DK-33"
      ],
      "blockReason": "",
      "parentId": "t-dk-g04"
    },
    {
      "id": "t-dk-g05",
      "title": "Dark Kitchen: команда",
      "description": "Шеф/су-шеф, штат, поиск, найм кухни, обучение, тестовые смены\n\nНаправления: HR, Продукт, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-11-16",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G05",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-18",
      "title": "Шеф/су-шеф Dark Kitchen: поиск и найм до разработки рецептур",
      "description": "Концепция — Armen и Artur; предложения по меню — шеф\n\nНаправления: HR, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-18",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-40",
      "title": "Штатная структура кухни",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-40",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-41",
      "title": "Поиск персонала: су-шеф, повара, упаковщик",
      "description": "Шеф нанимается отдельной задачей — здесь повара и упаковщик\n\nНаправления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-11-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-41",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-40"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-41.1",
      "title": "Вакансии: су-шеф, повара, комплектовщик/упаковщик",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-10-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-41.1",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-40",
        "GEN-63"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-41.2",
      "title": "Скрининг и интервью",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-11-02",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-41.2",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.1"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-41.3",
      "title": "Пробная смена: приготовить блюда MVP-меню",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-41.3",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.2"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-42",
      "title": "Найм кухни",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-08",
      "due": "2026-11-11",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-42",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41",
        "GEN-60"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-42.1",
      "title": "Оффер, договоры, медкнижки",
      "description": "Направления: HR",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-08",
      "due": "2026-11-11",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-42.1",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.3"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-43",
      "title": "Обучение по техкартам",
      "description": "Направления: HR, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-11",
      "due": "2026-11-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-43",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-42",
        "DK-11"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-44",
      "title": "Тестовые смены кухни",
      "description": "Направления: HR, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-11-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-44",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-43",
        "DK-35"
      ],
      "blockReason": "",
      "parentId": "t-dk-g05"
    },
    {
      "id": "t-dk-g06",
      "title": "Dark Kitchen: агрегаторы и доставка",
      "description": "Модель доставки, подключение к агрегаторам, фото блюд\n\nНаправления: Продажи, Маркетинг, Документы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina"
      ],
      "startDate": "2026-10-10",
      "due": "2026-11-12",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G06",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-15",
      "title": "Фото блюд для агрегаторов",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-15",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "DK-10"
      ],
      "blockReason": "",
      "parentId": "t-dk-g06"
    },
    {
      "id": "t-dk-16",
      "title": "Подключение к агрегаторам: договоры, меню, модерация",
      "description": "Направления: Продажи, Документы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-11-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-16",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-07",
        "GEN-04"
      ],
      "blockReason": "",
      "parentId": "t-dk-g06"
    },
    {
      "id": "t-dk-17",
      "title": "Модель доставки: агрегаторы / свои курьеры / служба",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-17",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": "",
      "parentId": "t-dk-g06"
    },
    {
      "id": "t-dk-g07",
      "title": "Dark Kitchen: тесты и запуск (21.11)",
      "description": "Тест производства, закрытые заказы, soft launch, go/no-go, запуск, маркетинг\n\nНаправления: Продажи, Административные вопросы, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina",
        "u-artur"
      ],
      "startDate": "2026-11-09",
      "due": "2026-11-21",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-G07",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-06",
      "title": "Контент и PR запуска Dark Kitchen: бренды, агрегаторы, первые отзывы",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-09",
      "due": "2026-11-21",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-06",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-art-13",
      "title": "Go/no-go запуска Dark Kitchen (Armen + Artur)",
      "description": "Направления: Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-20",
      "due": "2026-11-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-13",
      "wave": "B",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "DK-53"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-dk-50",
      "title": "Production test: время готовки и сборки заказа",
      "description": "Направления: Продукт, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-14",
      "due": "2026-11-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-50",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "DK-35"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-dk-51",
      "title": "Тестовый запуск: закрытые заказы (команда, друзья)",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-16",
      "due": "2026-11-17",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-51",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-44",
        "DK-50",
        "DK-16"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-dk-52",
      "title": "Soft launch на агрегаторах, ограниченные часы",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-17",
      "due": "2026-11-19",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-52",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-51"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-dk-53",
      "title": "Анализ и корректировки: время, отзывы, food cost",
      "description": "Направления: Продажи, Продукт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-19",
      "due": "2026-11-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-53",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-52"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-dk-54",
      "title": "🚀 DARK KITCHEN LAUNCH",
      "description": "Направления: Продажи, Маркетинг",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-21",
      "due": "2026-11-21",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "DK-54",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-53",
        "ART-13"
      ],
      "blockReason": "",
      "parentId": "t-dk-g07"
    },
    {
      "id": "t-bk-g01",
      "title": "COMX: концепция и закупка товара",
      "description": "Концепция, бюджет закупки, зарубежные поставщики, первый заказ, приёмка и выкладка\n\nНаправления: Закупки, Продукт, Административные вопросы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-11-23",
      "priority": "high",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-G01",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-07",
      "title": "Artur: согласование первой закупки товара COMX ($10–30k)",
      "description": "Направления: Закупки, Административные вопросы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-25",
      "due": "2026-10-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-07",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.2"
      ],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-01",
      "title": "Концепция COMX: ассортимент, формат, события",
      "description": "Нужна для закупки и дизайна\n\nНаправления: Продукт, Маркетинг",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-01",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-08",
      "title": "Поставщики книг и комиксов, первая закупка",
      "description": "Первая закупка — до 28.10 (доставка из-за рубежа 3–4 нед.)\n\nНаправления: Закупки, Продукт",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-08.1",
      "title": "Категории и бюджет закупки ($10–30k): комиксы RU/EN/AM, настолки, мерч, лицензии",
      "description": "Бюджет из условий проекта\n\nНаправления: Закупки, Продукт",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-08.1",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-08.2",
      "title": "Зарубежные поставщики: КП, условия, таможня/доставка, эксклюзив",
      "description": "Направления: Закупки, Продукт",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-08.2",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.1"
      ],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-08.3",
      "title": "Первый заказ (предоплата)",
      "description": "Направления: Закупки, Продукт",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-25",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-08.3",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.2",
        "ART-07"
      ],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-13",
      "title": "Приёмка товара, ценники, выкладка",
      "description": "Направления: Закупки, Продукт",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-13",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.3"
      ],
      "blockReason": "",
      "parentId": "t-bk-g01"
    },
    {
      "id": "t-bk-g02",
      "title": "COMX: демонтаж, дизайн, ремонт и мебель",
      "description": "Демонтаж, замер, планировка, дизайн, согласование, ремонт, стеллажи\n\nНаправления: Ремонтные работы, Дизайн, Документы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-14",
      "due": "2026-11-18",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-G02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-02",
      "title": "Демонтаж COMX",
      "description": "После демонтажа кухни, та же бригада\n\nНаправления: Ремонтные работы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-19",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-20"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-03",
      "title": "Замер COMX",
      "description": "Направления: Ремонтные работы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-02"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-04",
      "title": "Планировка COMX",
      "description": "Направления: Ремонтные работы, Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-03",
        "ART-03"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-05",
      "title": "Дизайн COMX",
      "description": "Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике\nИсполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-05",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-04"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-05.1",
      "title": "Бриф дизайнеру COMX: зоны (комиксы/игры/мерч/снеки), стеллажи, касса",
      "description": "Направления: Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-05.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-03"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-05.2",
      "title": "Концепт интерьера",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-05.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.1"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-05.3",
      "title": "Правки, чертежи стеллажей, спецификация",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Ремонтные работы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-05.3",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.2"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-05.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА COMX",
      "description": "Направления: Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-31",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-05.4",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.3"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-06",
      "title": "Согласование COMX",
      "description": "Направления: Документы, Ремонтные работы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-31",
      "due": "2026-11-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-06",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "BK-05"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-07",
      "title": "Ремонт COMX",
      "description": "Направления: Ремонтные работы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-17",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-07",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-06"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-09",
      "title": "Стеллажи и мебель",
      "description": "Стеллажи заказываем сразу после утверждения дизайна\n\nНаправления: Закупки",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-09",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-05"
      ],
      "blockReason": "",
      "parentId": "t-bk-g02"
    },
    {
      "id": "t-bk-g03",
      "title": "COMX: команда",
      "description": "Менеджер и продавцы-консультанты: профиль, найм, обучение\n\nНаправления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-21",
      "priority": "medium",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-G03",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-10",
      "title": "Персонал COMX",
      "description": "Направления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-bk-g03"
    },
    {
      "id": "t-bk-10.1",
      "title": "Профиль: менеджер, продавцы-консультанты (комиксы/игры)",
      "description": "Направления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-10.1",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": "",
      "parentId": "t-bk-g03"
    },
    {
      "id": "t-bk-10.2",
      "title": "Вакансии и скрининг",
      "description": "Направления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-10.2",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.1",
        "GEN-63"
      ],
      "blockReason": "",
      "parentId": "t-bk-g03"
    },
    {
      "id": "t-bk-10.3",
      "title": "Пробная смена, оффер, договоры",
      "description": "Направления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-16",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-10.3",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.2"
      ],
      "blockReason": "",
      "parentId": "t-bk-g03"
    },
    {
      "id": "t-bk-10.4",
      "title": "Обучение: ассортимент, касса, лояльность",
      "description": "Направления: HR",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-16",
      "due": "2026-11-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-10.4",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.3"
      ],
      "blockReason": "",
      "parentId": "t-bk-g03"
    },
    {
      "id": "t-bk-g04",
      "title": "COMX: открытие (25.11) и маркетинг",
      "description": "Soft launch, go/no-go, открытие, мерч, контент и PR\n\nНаправления: Маркетинг, Продажи, Административные вопросы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina",
        "u-artur"
      ],
      "startDate": "2026-10-22",
      "due": "2026-11-25",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-G04",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-07",
      "title": "Мерч бренда и COMX: макеты (Vladimir), подрядчик и заказ (Karine)",
      "description": "Направления: Маркетинг, Закупки, Дизайн",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-11-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-07",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-03"
      ],
      "blockReason": "",
      "parentId": "t-bk-g04"
    },
    {
      "id": "t-mkt-08",
      "title": "Контент и PR открытия COMX: сообщество комиксов и игр, событие открытия",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-25",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-08",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": "",
      "parentId": "t-bk-g04"
    },
    {
      "id": "t-art-14",
      "title": "Go/no-go открытия COMX (Armen + Artur)",
      "description": "Направления: Административные вопросы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-24",
      "due": "2026-11-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-14",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "BK-11"
      ],
      "blockReason": "",
      "parentId": "t-bk-g04"
    },
    {
      "id": "t-bk-11",
      "title": "Soft launch COMX",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-22",
      "due": "2026-11-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-11",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-07",
        "BK-09"
      ],
      "blockReason": "",
      "parentId": "t-bk-g04"
    },
    {
      "id": "t-bk-12",
      "title": "🚀 Открытие COMX",
      "description": "Направления: Продажи, Маркетинг",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-25",
      "due": "2026-11-25",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "BK-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-11",
        "ART-14"
      ],
      "blockReason": "",
      "parentId": "t-bk-g04"
    },
    {
      "id": "t-caf-g01",
      "title": "CAFE: концепция и меню",
      "description": "Концепция кафе (меню, зал, бар) и разработка меню вместе с шефом\n\nНаправления: Продукт, Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-12-15",
      "priority": "medium",
      "status": "in_progress",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G01",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-01",
      "title": "Концепция кафе: меню, зал, бар",
      "description": "Направления: Продукт, Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-06",
      "due": "2026-10-20",
      "priority": "medium",
      "status": "in_progress",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-01",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-caf-g01"
    },
    {
      "id": "t-caf-09",
      "title": "Меню и рецептуры кафе",
      "description": "Разработка меню вместе с шефом после его выбора\nИсполнитель: шеф-повар CAFE (после найма); пока — Armen\n\nНаправления: Продукт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-chef-cafe",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-12-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-09",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": "",
      "parentId": "t-caf-g01"
    },
    {
      "id": "t-caf-g02",
      "title": "CAFE: планировка, дизайн и согласование",
      "description": "Планировка, дизайн от брифа до утверждения (13.11), согласования\n\nНаправления: Дизайн, Ремонтные работы, Документы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-19",
      "due": "2026-11-17",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-04",
      "title": "Планировка кафе",
      "description": "По предварительным замерам, уточнение после 11.11\n\nНаправления: Ремонтные работы, Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-19",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05",
      "title": "Дизайн кафе",
      "description": "Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике\nИсполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-11-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-04"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05.1",
      "title": "Бриф дизайнеру CAFE: зал, бар, посадка, акустика рядом с Game Room",
      "description": "Направления: Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-01",
        "ART-03"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05.2",
      "title": "Концепт зала и бара (2 варианта)",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-11-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.1"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05.3",
      "title": "Выбор варианта",
      "description": "Направления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-03",
      "due": "2026-11-04",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05.3",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.2"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05.4",
      "title": "Детальный проект: свет, материалы, мебель, спецификации",
      "description": "Исполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-04",
      "due": "2026-11-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05.4",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.3"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-05.5",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА CAFE",
      "description": "Направления: Дизайн",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-13",
      "due": "2026-11-13",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-05.5",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.4"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-06",
      "title": "Согласование кафе",
      "description": "Арендодатель, пожарные, санитария\n\nНаправления: Документы, Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-13",
      "due": "2026-11-17",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-06",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "CAF-05"
      ],
      "blockReason": "",
      "parentId": "t-caf-g02"
    },
    {
      "id": "t-caf-g03",
      "title": "CAFE: демонтаж и ремонт",
      "description": "Демонтаж, финальный замер, инженерные работы и отделка\n\nНаправления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-12-14",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-02",
      "title": "Демонтаж кафе",
      "description": "Направления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-02",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-02"
      ],
      "blockReason": "",
      "parentId": "t-caf-g03"
    },
    {
      "id": "t-caf-03",
      "title": "Замер кафе",
      "description": "Финальный замер после демонтажа\n\nНаправления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-11",
      "due": "2026-11-11",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-02"
      ],
      "blockReason": "",
      "parentId": "t-caf-g03"
    },
    {
      "id": "t-caf-07",
      "title": "Ремонт кафе",
      "description": "Направления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-18",
      "due": "2026-12-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-07",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-06"
      ],
      "blockReason": "",
      "parentId": "t-caf-g03"
    },
    {
      "id": "t-caf-07.1",
      "title": "Черновые работы: вентиляция, электрика, вода, канализация",
      "description": "Направления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-18",
      "due": "2026-12-02",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-07.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-06"
      ],
      "blockReason": "",
      "parentId": "t-caf-g03"
    },
    {
      "id": "t-caf-07.2",
      "title": "Чистовая отделка, свет",
      "description": "Направления: Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-03",
      "due": "2026-12-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-07.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-07.1"
      ],
      "blockReason": "",
      "parentId": "t-caf-g03"
    },
    {
      "id": "t-caf-g04",
      "title": "CAFE: оборудование и мебель",
      "description": "Перечень, КП, заказ до 18.11, посуда и бар-инвентарь, приёмка и монтаж\n\nНаправления: Закупки, Административные вопросы, Ремонтные работы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-30",
      "due": "2026-12-23",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G04",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-08",
      "title": "Artur: согласование заказа оборудования и мебели CAFE",
      "description": "Направления: Закупки, Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-artur",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.2"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08",
      "title": "Оборудование и мебель кафе",
      "description": "Заказ до 18.11 (поставка 4–5 нед.)\n\nНаправления: Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-30",
      "due": "2026-12-23",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-04"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08.1",
      "title": "Перечень оборудования и мебели по концепту и меню",
      "description": "Направления: Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-30",
      "due": "2026-11-06",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08.1",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08.2",
      "title": "КП от ≥3 поставщиков, сроки поставки",
      "description": "Направления: Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-06",
      "due": "2026-11-10",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08.2",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.1"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08.3",
      "title": "Выбор, договор, заказ оборудования и мебели (поставка 4–5 нед.)",
      "description": "Направления: Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-18",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08.3",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.2",
        "ART-08"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08.4",
      "title": "Посуда, бар-инвентарь, текстиль",
      "description": "Направления: Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
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
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08.4",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-08.5",
      "title": "Приёмка и монтаж оборудования",
      "description": "Направления: Ремонтные работы, Закупки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-15",
      "due": "2026-12-23",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-08.5",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-08.3",
        "CAF-07.2"
      ],
      "blockReason": "",
      "parentId": "t-caf-g04"
    },
    {
      "id": "t-caf-g05",
      "title": "CAFE: команда",
      "description": "Шеф-повар, менеджер, кухня, бар, зал, обучение и репетиции\n\nНаправления: HR, Продукт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-10-20",
      "due": "2026-12-22",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G05",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-10",
      "title": "Artur: согласование шеф-повара CAFE (оффер)",
      "description": "Направления: HR, Продукт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-11-10",
      "due": "2026-11-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.2"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10",
      "title": "Персонал: бариста, бармен, официанты",
      "description": "Шеф — ключевая позиция\n\nНаправления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-12-22",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.1",
      "title": "Штатное расписание, ФОТ, график (8–22, выходные до 23:00; смены 10–12 ч, 2/2)",
      "description": "~4 человека на позицию: кухня, бар, зал, мойка + администратор\n\nНаправления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-27",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.1",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.2",
      "title": "Поиск шеф-повара — ключевая позиция (сейчас шефа нет)",
      "description": "Направления: HR, Продукт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.2",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.3",
      "title": "Выбор шефа, оффер, он подключается к разработке меню",
      "description": "Направления: HR, Продукт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-12",
      "due": "2026-11-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.3",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "ART-10"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.8",
      "title": "Менеджер CAFE: поиск и найм вместе с шефом",
      "description": "Направления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.8",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.2"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.4",
      "title": "Су-шеф, бар-менеджер, бармены",
      "description": "Направления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-16",
      "due": "2026-11-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.4",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.3"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.5",
      "title": "Зал: администратор, официанты, бариста — вакансии и собеседования",
      "description": "Направления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-23",
      "due": "2026-12-08",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.5",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-63"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.6",
      "title": "Офферы, договоры, медкнижки",
      "description": "Направления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-08",
      "due": "2026-12-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.6",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.5",
        "GEN-61"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-10.7",
      "title": "Обучение и репетиции зала и кухни",
      "description": "Направления: HR",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-14",
      "due": "2026-12-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-10.7",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.6"
      ],
      "blockReason": "",
      "parentId": "t-caf-g05"
    },
    {
      "id": "t-caf-g06",
      "title": "CAFE: техническое открытие (25–28.12) и открытие (15–20.01)",
      "description": "Тех. открытие, доработки, soft launch, go/no-go, реальное открытие, маркетинг\n\nНаправления: Административные вопросы, Продажи, Маркетинг",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur",
        "u-karina"
      ],
      "startDate": "2026-12-01",
      "due": "2027-01-20",
      "priority": "high",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-G06",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-09",
      "title": "Прогрев и открытие CAFE: контент, блогеры, события, тех. открытие и запуск",
      "description": "Направления: Маркетинг, Продажи",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-01",
      "due": "2027-01-20",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "MKT-09",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-art-15",
      "title": "Go/no-go технического открытия CAFE (Armen + Artur)",
      "description": "Направления: Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2026-12-24",
      "due": "2026-12-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-15",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "CAF-10.7",
        "CAF-08.5"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-art-16",
      "title": "Go/no-go реального открытия CAFE (Armen + Artur)",
      "description": "Направления: Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-artur"
      ],
      "startDate": "2027-01-14",
      "due": "2027-01-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "ART-16",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "CAF-14"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-caf-11",
      "title": "Техническое открытие кафе (закрытые гости)",
      "description": "Закрытые гости, отработка кухни и зала\n\nНаправления: Продажи, Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-25",
      "due": "2026-12-28",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-11",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-07",
        "CAF-10",
        "CAF-08",
        "ART-15"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-caf-13",
      "title": "Устранение замечаний после тех. открытия (праздничные дни 31.12–06.01)",
      "description": "Направления: Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-29",
      "due": "2027-01-09",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-13",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "CAF-11"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-caf-14",
      "title": "Soft launch для приглашённых гостей",
      "description": "Направления: Продажи, Административные вопросы",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-10",
      "due": "2027-01-14",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-14",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-13"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-caf-12",
      "title": "🚀 Реальное открытие CAFE",
      "description": "Реальное открытие в окне 15–20.01\n\nНаправления: Продажи, Маркетинг",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-15",
      "due": "2027-01-20",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "CAF-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-14",
        "ART-16"
      ],
      "blockReason": "",
      "parentId": "t-caf-g06"
    },
    {
      "id": "t-sd-g01",
      "title": "Игровая комната (Secret Door)",
      "description": "Правовые вопросы, модель аренды, дизайн, мебель, бронирование, ивенты, запуск вместе с CAFE\n\nНаправления: Документы, Административные вопросы, Дизайн",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [
        "u-karina"
      ],
      "startDate": "2026-10-27",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 0,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-G01",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-sd-01",
      "title": "Проверка законности форматов (покер и др.) и правил для гостей",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Документы",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-01",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-02",
      "title": "Модель аренды: тариф 30 000 AMD/час, правила брони, договор",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Документы, Административные вопросы",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-16",
      "due": "2026-11-30",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-02",
      "wave": "C",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "SD-01"
      ],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-03",
      "title": "Зонирование и дизайн игровой комнаты (в рамках дизайна CAFE)",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\nИсполнитель: внешний дизайнер интерьера, общается Armen\n\nНаправления: Дизайн, Ремонтные работы",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-design",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-11-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-03",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-04",
      "title": "Мебель и оборудование: столы, стулья, игры, свет, звук",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Закупки, Дизайн",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-06",
      "due": "2026-11-18",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-04",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "SD-03"
      ],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-05",
      "title": "Бронирование и оплата аренды: форма или Telegram-бот, календарь",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Разработка, Технологии",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-23",
      "due": "2026-12-15",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-05",
      "wave": "C",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "SD-02"
      ],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-06",
      "title": "Партнёры и ивенты: клубы покера, мафии, настольных игр; расписание",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Маркетинг, Продажи",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-01",
      "due": "2027-01-20",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-06",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "SD-02"
      ],
      "blockReason": "",
      "parentId": "t-sd-g01"
    },
    {
      "id": "t-sd-07",
      "title": "Запуск игровой комнаты вместе с CAFE",
      "description": "Комната ~30 м² сдаётся в почасовую аренду, сами её не ведём\n\nНаправления: Продажи, Административные вопросы",
      "zone": "secret",
      "zones": [
        "secret"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-10",
      "due": "2027-01-20",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "SD-07",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "SD-04",
        "SD-05"
      ],
      "blockReason": "",
      "parentId": "t-sd-g01"
    }
  ],
  "comments": [],
  "subtasks": [
    {
      "id": "s-gen-88-1",
      "taskId": "t-gen-88",
      "title": "Обзор октября — 30.10",
      "done": false
    },
    {
      "id": "s-gen-88-2",
      "taskId": "t-gen-88",
      "title": "Обзор ноября — 30.11",
      "done": false
    },
    {
      "id": "s-gen-88-3",
      "taskId": "t-gen-88",
      "title": "Обзор декабря — 31.12",
      "done": false
    },
    {
      "id": "s-gen-89-1",
      "taskId": "t-gen-89",
      "title": "Waffle — 30.10 и 04.11",
      "done": false
    },
    {
      "id": "s-gen-89-2",
      "taskId": "t-gen-89",
      "title": "Dark Kitchen — 14.11 и 19.11",
      "done": false
    },
    {
      "id": "s-gen-89-3",
      "taskId": "t-gen-89",
      "title": "COMX — 18.11 и 23.11",
      "done": false
    },
    {
      "id": "s-gen-89-4",
      "taskId": "t-gen-89",
      "title": "CAFE, техническое открытие — 18.12 и 23.12",
      "done": false
    },
    {
      "id": "s-gen-89-5",
      "taskId": "t-gen-89",
      "title": "CAFE, реальное открытие — 08.01 и 13.01",
      "done": false
    },
    {
      "id": "s-gen-04-1",
      "taskId": "t-gen-04",
      "title": "Юрструктура готова",
      "done": false
    },
    {
      "id": "s-gen-05-1",
      "taskId": "t-gen-05",
      "title": "Бухгалтер есть, налоговый режим выбран",
      "done": false
    },
    {
      "id": "s-gen-06-1",
      "taskId": "t-gen-06",
      "title": "Счета открыты, можно платить поставщикам",
      "done": false
    },
    {
      "id": "s-gen-08-1",
      "taskId": "t-gen-08",
      "title": "Список требований и документов по Waffle и кухне",
      "done": false
    },
    {
      "id": "s-gen-09-1",
      "taskId": "t-gen-09",
      "title": "Понятны ограничения по вывеске и окну",
      "done": false
    },
    {
      "id": "s-gen-10-1",
      "taskId": "t-gen-10",
      "title": "Все документы на руках до soft launch Waffle",
      "done": false
    },
    {
      "id": "s-gen-13-1",
      "taskId": "t-gen-13",
      "title": "Лицензия получена до технического открытия",
      "done": false
    },
    {
      "id": "s-gen-24-1",
      "taskId": "t-gen-24",
      "title": "Требования к каждому объекту записаны",
      "done": false
    },
    {
      "id": "s-gen-25-1",
      "taskId": "t-gen-25",
      "title": "Единая таблица ограничений по всем помещениям",
      "done": false
    },
    {
      "id": "s-gen-26-1",
      "taskId": "t-gen-26",
      "title": "Подрядчики выбраны, есть сметы",
      "done": false
    },
    {
      "id": "s-gen-28-1",
      "taskId": "t-gen-28",
      "title": "Бюджет инженерии по объектам",
      "done": false
    },
    {
      "id": "s-gen-31-1",
      "taskId": "t-gen-31",
      "title": "Дизайнер знает даты сдачи по каждому объекту",
      "done": false
    },
    {
      "id": "s-art-01-1",
      "taskId": "t-art-01",
      "title": "Бюджет утверждён, можно заказывать оборудование",
      "done": false
    },
    {
      "id": "s-art-03-1",
      "taskId": "t-art-03",
      "title": "Концепции утверждены",
      "done": false
    },
    {
      "id": "s-gen-45-1",
      "taskId": "t-gen-45",
      "title": "Owner выбрал одно направление",
      "done": false
    },
    {
      "id": "s-gen-46-1",
      "taskId": "t-gen-46",
      "title": "Готовая визуальная система",
      "done": false
    },
    {
      "id": "s-gen-47-1",
      "taskId": "t-gen-47",
      "title": "Правила коммуникации",
      "done": false
    },
    {
      "id": "s-gen-48-1",
      "taskId": "t-gen-48",
      "title": "Базовый brand book",
      "done": false
    },
    {
      "id": "s-gen-49-1",
      "taskId": "t-gen-49",
      "title": "Униформа заказана к обучению персонала",
      "done": false
    },
    {
      "id": "s-art-02-1",
      "taskId": "t-art-02",
      "title": "Фирменный стиль утверждён",
      "done": false
    },
    {
      "id": "s-gen-53-1",
      "taskId": "t-gen-53",
      "title": "Готовые профили в айдентике",
      "done": false
    },
    {
      "id": "s-gen-56-1",
      "taskId": "t-gen-56",
      "title": "Лендинг на домене, ссылка на приложение",
      "done": false
    },
    {
      "id": "s-gen-57-1",
      "taskId": "t-gen-57",
      "title": "Точка находится на картах",
      "done": false
    },
    {
      "id": "s-gen-54-1",
      "taskId": "t-gen-54",
      "title": "План публикаций до и после открытия",
      "done": false
    },
    {
      "id": "s-gen-55-1",
      "taskId": "t-gen-55",
      "title": "Контент для запуска",
      "done": false
    },
    {
      "id": "s-gen-58-1",
      "taskId": "t-gen-58",
      "title": "Список блогеров и медиа, план события",
      "done": false
    },
    {
      "id": "s-mkt-01-1",
      "taskId": "t-mkt-01",
      "title": "План согласован с Vladimir и Armen",
      "done": false
    },
    {
      "id": "s-mkt-02-1",
      "taskId": "t-mkt-02",
      "title": "Договорённости с блогерами по Waffle и Dark Kitchen",
      "done": false
    },
    {
      "id": "s-mkt-03-1",
      "taskId": "t-mkt-03",
      "title": "Выбраны типографии и мерч-подрядчики",
      "done": false
    },
    {
      "id": "s-gen-60-1",
      "taskId": "t-gen-60",
      "title": "Шаблоны договоров и схема оплаты",
      "done": false
    },
    {
      "id": "s-gen-61-1",
      "taskId": "t-gen-61",
      "title": "У всех сотрудников документы до смен",
      "done": false
    },
    {
      "id": "s-gen-62-1",
      "taskId": "t-gen-62",
      "title": "Таблица: кого, сколько, когда выходит, сколько платим",
      "done": false
    },
    {
      "id": "s-gen-63-1",
      "taskId": "t-gen-63",
      "title": "Вакансии можно публиковать",
      "done": false
    },
    {
      "id": "s-gen-64-1",
      "taskId": "t-gen-64",
      "title": "Анкета, скрипт интервью, критерии оценки, шаблон оффера",
      "done": false
    },
    {
      "id": "s-gen-65-1",
      "taskId": "t-gen-65",
      "title": "Роли и сроки найма менеджеров утверждены (ФОТ — с Artur)",
      "done": false
    },
    {
      "id": "s-gen-69-1",
      "taskId": "t-gen-69",
      "title": "Менеджеры выходят на обучение 27.10",
      "done": false
    },
    {
      "id": "s-gen-70-1",
      "taskId": "t-gen-70",
      "title": "POS куплен и настроен, эквайринг работает",
      "done": false
    },
    {
      "id": "s-gen-71-1",
      "taskId": "t-gen-71",
      "title": "Таблица закупок с резервными поставщиками",
      "done": false
    },
    {
      "id": "s-gen-72-1",
      "taskId": "t-gen-72",
      "title": "Для каждого объекта есть «последний день заказа»",
      "done": false
    },
    {
      "id": "s-gen-80-1",
      "taskId": "t-gen-80",
      "title": "Процедуры записаны и распечатаны на объектах",
      "done": false
    },
    {
      "id": "s-gen-81-1",
      "taskId": "t-gen-81",
      "title": "Чек-листы смены и стандарты сервиса",
      "done": false
    },
    {
      "id": "s-gen-82-1",
      "taskId": "t-gen-82",
      "title": "Шаблон: продажи, food cost, отзывы, проблемы",
      "done": false
    },
    {
      "id": "s-gen-11-1",
      "taskId": "t-gen-11",
      "title": "Договоры подписаны, график есть",
      "done": false
    },
    {
      "id": "s-gen-12-1",
      "taskId": "t-gen-12",
      "title": "Полис действует с открытия Waffle",
      "done": false
    },
    {
      "id": "s-gen-29-1",
      "taskId": "t-gen-29",
      "title": "Всё подключено в Waffle и на кухне",
      "done": false
    },
    {
      "id": "s-gen-30-1",
      "taskId": "t-gen-30",
      "title": "Объекты готовы к проверке",
      "done": false
    },
    {
      "id": "s-waf-01-1",
      "taskId": "t-waf-01",
      "title": "Помещение освобождено",
      "done": false
    },
    {
      "id": "s-waf-02-1",
      "taskId": "t-waf-02",
      "title": "Чистовые размеры",
      "done": false
    },
    {
      "id": "s-waf-03-1",
      "taskId": "t-waf-03",
      "title": "Утверждённая схема",
      "done": false
    },
    {
      "id": "s-waf-04-1",
      "taskId": "t-waf-04",
      "title": "Всё помещается",
      "done": false
    },
    {
      "id": "s-waf-05-1",
      "taskId": "t-waf-05",
      "title": "Можно начинать монтаж",
      "done": false
    },
    {
      "id": "s-waf-07-1",
      "taskId": "t-waf-07",
      "title": "Письменное согласие на работы",
      "done": false
    },
    {
      "id": "s-waf-06-1",
      "taskId": "t-waf-06",
      "title": "Дизайн-проект",
      "done": false
    },
    {
      "id": "s-waf-06.1-1",
      "taskId": "t-waf-06.1",
      "title": "Бриф отправлен Vladimir",
      "done": false
    },
    {
      "id": "s-waf-06.2-1",
      "taskId": "t-waf-06.2",
      "title": "Два варианта на выбор",
      "done": false
    },
    {
      "id": "s-waf-06.3-1",
      "taskId": "t-waf-06.3",
      "title": "Проект готов к утверждению",
      "done": false
    },
    {
      "id": "s-waf-06.4-1",
      "taskId": "t-waf-06.4",
      "title": "Дизайн утверждён Armen — дедлайн",
      "done": false
    },
    {
      "id": "s-waf-08-1",
      "taskId": "t-waf-08",
      "title": "Точка готова к монтажу оборудования",
      "done": false
    },
    {
      "id": "s-waf-09-1",
      "taskId": "t-waf-09",
      "title": "Всё заказано",
      "done": false
    },
    {
      "id": "s-waf-10-1",
      "taskId": "t-waf-10",
      "title": "Подрядчик выбран",
      "done": false
    },
    {
      "id": "s-waf-11-1",
      "taskId": "t-waf-11",
      "title": "Точные размеры проёма",
      "done": false
    },
    {
      "id": "s-waf-12-1",
      "taskId": "t-waf-12",
      "title": "Окно готово",
      "done": false
    },
    {
      "id": "s-waf-13-1",
      "taskId": "t-waf-13",
      "title": "Окно установлено",
      "done": false
    },
    {
      "id": "s-art-05-1",
      "taskId": "t-art-05",
      "title": "Согласовано до заказа 12.10",
      "done": false
    },
    {
      "id": "s-waf-20-1",
      "taskId": "t-waf-20",
      "title": "Ответ: везём или покупаем локально",
      "done": false
    },
    {
      "id": "s-waf-21-1",
      "taskId": "t-waf-21",
      "title": "Альтернативы с ценами",
      "done": false
    },
    {
      "id": "s-waf-22-1",
      "taskId": "t-waf-22",
      "title": "Выбранный вариант",
      "done": false
    },
    {
      "id": "s-waf-64-1",
      "taskId": "t-waf-64",
      "title": "Список с моделями и количеством",
      "done": false
    },
    {
      "id": "s-waf-22.2-1",
      "taskId": "t-waf-22.2",
      "title": "Выбран поставщик",
      "done": false
    },
    {
      "id": "s-waf-23-1",
      "taskId": "t-waf-23",
      "title": "Мощность ≥ пиковой нагрузки",
      "done": false
    },
    {
      "id": "s-waf-24-1",
      "taskId": "t-waf-24",
      "title": "Оплачено, есть дата доставки",
      "done": false
    },
    {
      "id": "s-waf-24.3-1",
      "taskId": "t-waf-24.3",
      "title": "Оборудование заказано",
      "done": false
    },
    {
      "id": "s-waf-25-1",
      "taskId": "t-waf-25",
      "title": "Оборудование на объекте",
      "done": false
    },
    {
      "id": "s-waf-25.1-1",
      "taskId": "t-waf-25.1",
      "title": "Всё принято, претензии закрыты",
      "done": false
    },
    {
      "id": "s-waf-26-1",
      "taskId": "t-waf-26",
      "title": "Всё заказано и помещается",
      "done": false
    },
    {
      "id": "s-waf-27-1",
      "taskId": "t-waf-27",
      "title": "Договорённости с основными и резервными",
      "done": false
    },
    {
      "id": "s-waf-28-1",
      "taskId": "t-waf-28",
      "title": "Дизайн утверждён, поставщик выбран",
      "done": false
    },
    {
      "id": "s-waf-29-1",
      "taskId": "t-waf-29",
      "title": "Упаковка на руках",
      "done": false
    },
    {
      "id": "s-waf-30-1",
      "taskId": "t-waf-30",
      "title": "Оборудование работает",
      "done": false
    },
    {
      "id": "s-waf-40-1",
      "taskId": "t-waf-40",
      "title": "Кандидаты",
      "done": false
    },
    {
      "id": "s-waf-41-1",
      "taskId": "t-waf-41",
      "title": "Человек найден",
      "done": false
    },
    {
      "id": "s-waf-42-1",
      "taskId": "t-waf-42",
      "title": "Ассортимент",
      "done": false
    },
    {
      "id": "s-waf-43-1",
      "taskId": "t-waf-43",
      "title": "Рецептуры",
      "done": false
    },
    {
      "id": "s-waf-44-1",
      "taskId": "t-waf-44",
      "title": "Финальные продукты",
      "done": false
    },
    {
      "id": "s-waf-45-1",
      "taskId": "t-waf-45",
      "title": "Техкарты",
      "done": false
    },
    {
      "id": "s-waf-46-1",
      "taskId": "t-waf-46",
      "title": "Food cost и цены утверждены",
      "done": false
    },
    {
      "id": "s-waf-47-1",
      "taskId": "t-waf-47",
      "title": "Меню и POSM напечатаны",
      "done": false
    },
    {
      "id": "s-waf-50-1",
      "taskId": "t-waf-50",
      "title": "Штат и график смен",
      "done": false
    },
    {
      "id": "s-waf-51-1",
      "taskId": "t-waf-51",
      "title": "Кандидаты",
      "done": false
    },
    {
      "id": "s-waf-51.1-1",
      "taskId": "t-waf-51.1",
      "title": "Вакансии опубликованы",
      "done": false
    },
    {
      "id": "s-waf-51.2-1",
      "taskId": "t-waf-51.2",
      "title": "Шорт-лист кандидатов",
      "done": false
    },
    {
      "id": "s-waf-52-1",
      "taskId": "t-waf-52",
      "title": "Выбор",
      "done": false
    },
    {
      "id": "s-waf-52.1-1",
      "taskId": "t-waf-52.1",
      "title": "Оценка кандидатов по критериям",
      "done": false
    },
    {
      "id": "s-waf-53-1",
      "taskId": "t-waf-53",
      "title": "Команда подписана",
      "done": false
    },
    {
      "id": "s-waf-53.1-1",
      "taskId": "t-waf-53.1",
      "title": "Все выходят с 27.10 на обучение",
      "done": false
    },
    {
      "id": "s-waf-54-1",
      "taskId": "t-waf-54",
      "title": "Персонал готов",
      "done": false
    },
    {
      "id": "s-waf-55-1",
      "taskId": "t-waf-55",
      "title": "Смена отработана без сбоев",
      "done": false
    },
    {
      "id": "s-art-09-1",
      "taskId": "t-art-09",
      "title": "Согласовано до договора с разработчиком",
      "done": false
    },
    {
      "id": "s-app-01-1",
      "taskId": "t-app-01",
      "title": "Выбрана механика: баллы / штампы / уровни",
      "done": false
    },
    {
      "id": "s-app-02-1",
      "taskId": "t-app-02",
      "title": "Список механик и наград",
      "done": false
    },
    {
      "id": "s-app-03-1",
      "taskId": "t-app-03",
      "title": "Разработчик выбран, есть опыт Mini Apps",
      "done": false
    },
    {
      "id": "s-app-04-1",
      "taskId": "t-app-04",
      "title": "ТЗ согласовано Owner",
      "done": false
    },
    {
      "id": "s-app-05-1",
      "taskId": "t-app-05",
      "title": "Договор подписан",
      "done": false
    },
    {
      "id": "s-app-06-1",
      "taskId": "t-app-06",
      "title": "Кликабельный прототип",
      "done": false
    },
    {
      "id": "s-app-07-1",
      "taskId": "t-app-07",
      "title": "Макеты всех экранов",
      "done": false
    },
    {
      "id": "s-app-08-1",
      "taskId": "t-app-08",
      "title": "API и админка работают",
      "done": false
    },
    {
      "id": "s-app-09-1",
      "taskId": "t-app-09",
      "title": "Баллы начисляются с чека",
      "done": false
    },
    {
      "id": "s-waf-65-1",
      "taskId": "t-waf-65",
      "title": "Все экраны работают в Telegram на iOS и Android",
      "done": false
    },
    {
      "id": "s-app-11-1",
      "taskId": "t-app-11",
      "title": "Документы опубликованы",
      "done": false
    },
    {
      "id": "s-app-12-1",
      "taskId": "t-app-12",
      "title": "Критичных багов нет",
      "done": false
    },
    {
      "id": "s-app-13-1",
      "taskId": "t-app-13",
      "title": "Команда прошла все сценарии",
      "done": false
    },
    {
      "id": "s-app-14-1",
      "taskId": "t-app-14",
      "title": "Бот с кнопкой Mini App доступен гостям",
      "done": false
    },
    {
      "id": "s-app-15-1",
      "taskId": "t-app-15",
      "title": "QR и акция готовы к открытию",
      "done": false
    },
    {
      "id": "s-app-16-1",
      "taskId": "t-app-16",
      "title": "Первые гости в программе",
      "done": false
    },
    {
      "id": "s-mkt-04-1",
      "taskId": "t-mkt-04",
      "title": "Печатные материалы на объекте до 04.11",
      "done": false
    },
    {
      "id": "s-mkt-05-1",
      "taskId": "t-mkt-05",
      "title": "Кампания открытия отработана",
      "done": false
    },
    {
      "id": "s-art-12-1",
      "taskId": "t-art-12",
      "title": "Решение «запускаем»",
      "done": false
    },
    {
      "id": "s-waf-60-1",
      "taskId": "t-waf-60",
      "title": "Скорость и качество в норме",
      "done": false
    },
    {
      "id": "s-waf-61-1",
      "taskId": "t-waf-61",
      "title": "Первые продажи",
      "done": false
    },
    {
      "id": "s-waf-62-1",
      "taskId": "t-waf-62",
      "title": "Исправления внесены",
      "done": false
    },
    {
      "id": "s-waf-63-1",
      "taskId": "t-waf-63",
      "title": "Работающая точка",
      "done": false
    },
    {
      "id": "s-dk-03-1",
      "taskId": "t-dk-03",
      "title": "Long list",
      "done": false
    },
    {
      "id": "s-dk-04-1",
      "taskId": "t-dk-04",
      "title": "Концепция по каждому кандидату",
      "done": false
    },
    {
      "id": "s-dk-05-1",
      "taskId": "t-dk-05",
      "title": "Owner утвердил бренды",
      "done": false
    },
    {
      "id": "s-dk-06-1",
      "taskId": "t-dk-06",
      "title": "Экономика по каждому бренду",
      "done": false
    },
    {
      "id": "s-dk-07-1",
      "taskId": "t-dk-07",
      "title": "Логотипы и визуал брендов",
      "done": false
    },
    {
      "id": "s-dk-08-1",
      "taskId": "t-dk-08",
      "title": "MVP menu",
      "done": false
    },
    {
      "id": "s-dk-09-1",
      "taskId": "t-dk-09",
      "title": "Рецептуры",
      "done": false
    },
    {
      "id": "s-dk-10-1",
      "taskId": "t-dk-10",
      "title": "Рабочие блюда",
      "done": false
    },
    {
      "id": "s-dk-11-1",
      "taskId": "t-dk-11",
      "title": "Техкарты",
      "done": false
    },
    {
      "id": "s-dk-12-1",
      "taskId": "t-dk-12",
      "title": "Food cost и цены",
      "done": false
    },
    {
      "id": "s-dk-20-1",
      "taskId": "t-dk-20",
      "title": "Помещение освобождено",
      "done": false
    },
    {
      "id": "s-dk-21-1",
      "taskId": "t-dk-21",
      "title": "Чистовые размеры",
      "done": false
    },
    {
      "id": "s-dk-22-1",
      "taskId": "t-dk-22",
      "title": "Утверждённая схема",
      "done": false
    },
    {
      "id": "s-dk-23-1",
      "taskId": "t-dk-23",
      "title": "Всё помещается",
      "done": false
    },
    {
      "id": "s-dk-24-1",
      "taskId": "t-dk-24",
      "title": "Коммуникации спроектированы",
      "done": false
    },
    {
      "id": "s-dk-25-1",
      "taskId": "t-dk-25",
      "title": "Дизайн-проект",
      "done": false
    },
    {
      "id": "s-dk-25.1-1",
      "taskId": "t-dk-25.1",
      "title": "Бриф отправлен Vladimir",
      "done": false
    },
    {
      "id": "s-dk-25.2-1",
      "taskId": "t-dk-25.2",
      "title": "Версия 1 на ревью",
      "done": false
    },
    {
      "id": "s-dk-25.3-1",
      "taskId": "t-dk-25.3",
      "title": "Проект готов",
      "done": false
    },
    {
      "id": "s-dk-25.4-1",
      "taskId": "t-dk-25.4",
      "title": "Дизайн утверждён Armen",
      "done": false
    },
    {
      "id": "s-dk-26-1",
      "taskId": "t-dk-26",
      "title": "Письменное согласие на работы",
      "done": false
    },
    {
      "id": "s-dk-27-1",
      "taskId": "t-dk-27",
      "title": "Кухня готова к монтажу оборудования",
      "done": false
    },
    {
      "id": "s-art-06-1",
      "taskId": "t-art-06",
      "title": "Согласовано до заказа 19.10",
      "done": false
    },
    {
      "id": "s-dk-13-1",
      "taskId": "t-dk-13",
      "title": "Поставщики",
      "done": false
    },
    {
      "id": "s-dk-14-1",
      "taskId": "t-dk-14",
      "title": "Упаковка на руках",
      "done": false
    },
    {
      "id": "s-dk-30-1",
      "taskId": "t-dk-30",
      "title": "Список оборудования",
      "done": false
    },
    {
      "id": "s-dk-30.1-1",
      "taskId": "t-dk-30.1",
      "title": "Выбран поставщик",
      "done": false
    },
    {
      "id": "s-dk-31-1",
      "taskId": "t-dk-31",
      "title": "Мощность ≥ пиковой нагрузки",
      "done": false
    },
    {
      "id": "s-dk-32-1",
      "taskId": "t-dk-32",
      "title": "Оплачено, есть дата доставки",
      "done": false
    },
    {
      "id": "s-dk-36-1",
      "taskId": "t-dk-36",
      "title": "Вытяжка заказана",
      "done": false
    },
    {
      "id": "s-dk-33-1",
      "taskId": "t-dk-33",
      "title": "Оборудование на объекте",
      "done": false
    },
    {
      "id": "s-dk-33.1-1",
      "taskId": "t-dk-33.1",
      "title": "Всё принято",
      "done": false
    },
    {
      "id": "s-dk-34-1",
      "taskId": "t-dk-34",
      "title": "Хранение готово",
      "done": false
    },
    {
      "id": "s-dk-35-1",
      "taskId": "t-dk-35",
      "title": "Оборудование работает",
      "done": false
    },
    {
      "id": "s-dk-18-1",
      "taskId": "t-dk-18",
      "title": "Шеф предлагает меню и рецептуры",
      "done": false
    },
    {
      "id": "s-dk-40-1",
      "taskId": "t-dk-40",
      "title": "Штат",
      "done": false
    },
    {
      "id": "s-dk-41-1",
      "taskId": "t-dk-41",
      "title": "Кандидаты",
      "done": false
    },
    {
      "id": "s-dk-41.1-1",
      "taskId": "t-dk-41.1",
      "title": "Вакансии опубликованы",
      "done": false
    },
    {
      "id": "s-dk-41.2-1",
      "taskId": "t-dk-41.2",
      "title": "Шорт-лист",
      "done": false
    },
    {
      "id": "s-dk-41.3-1",
      "taskId": "t-dk-41.3",
      "title": "Выбраны кандидаты",
      "done": false
    },
    {
      "id": "s-dk-42-1",
      "taskId": "t-dk-42",
      "title": "Команда",
      "done": false
    },
    {
      "id": "s-dk-42.1-1",
      "taskId": "t-dk-42.1",
      "title": "Все выходят на обучение 11.11",
      "done": false
    },
    {
      "id": "s-dk-43-1",
      "taskId": "t-dk-43",
      "title": "Команда готова",
      "done": false
    },
    {
      "id": "s-dk-44-1",
      "taskId": "t-dk-44",
      "title": "Проверка",
      "done": false
    },
    {
      "id": "s-dk-15-1",
      "taskId": "t-dk-15",
      "title": "Фото всех позиций",
      "done": false
    },
    {
      "id": "s-dk-16-1",
      "taskId": "t-dk-16",
      "title": "Бренды опубликованы на агрегаторах",
      "done": false
    },
    {
      "id": "s-dk-17-1",
      "taskId": "t-dk-17",
      "title": "Стоимость, SLA, зона, время доставки",
      "done": false
    },
    {
      "id": "s-mkt-06-1",
      "taskId": "t-mkt-06",
      "title": "Кампания запуска отработана",
      "done": false
    },
    {
      "id": "s-art-13-1",
      "taskId": "t-art-13",
      "title": "Решение «запускаем»",
      "done": false
    },
    {
      "id": "s-dk-50-1",
      "taskId": "t-dk-50",
      "title": "Проверка производства",
      "done": false
    },
    {
      "id": "s-dk-51-1",
      "taskId": "t-dk-51",
      "title": "Первые заказы без сбоев",
      "done": false
    },
    {
      "id": "s-dk-52-1",
      "taskId": "t-dk-52",
      "title": "Первые реальные заказы",
      "done": false
    },
    {
      "id": "s-dk-53-1",
      "taskId": "t-dk-53",
      "title": "Исправления",
      "done": false
    },
    {
      "id": "s-dk-54-1",
      "taskId": "t-dk-54",
      "title": "Первый полноценный запуск",
      "done": false
    },
    {
      "id": "s-art-07-1",
      "taskId": "t-art-07",
      "title": "Согласовано до предоплаты 28.10",
      "done": false
    },
    {
      "id": "s-bk-01-1",
      "taskId": "t-bk-01",
      "title": "Концепция утверждена",
      "done": false
    },
    {
      "id": "s-bk-08-1",
      "taskId": "t-bk-08",
      "title": "Первая партия заказана",
      "done": false
    },
    {
      "id": "s-bk-08.1-1",
      "taskId": "t-bk-08.1",
      "title": "Бюджет по категориям",
      "done": false
    },
    {
      "id": "s-bk-08.2-1",
      "taskId": "t-bk-08.2",
      "title": "Список поставщиков с условиями",
      "done": false
    },
    {
      "id": "s-bk-08.3-1",
      "taskId": "t-bk-08.3",
      "title": "Заказ размещён",
      "done": false
    },
    {
      "id": "s-bk-13-1",
      "taskId": "t-bk-13",
      "title": "Магазин заполнен",
      "done": false
    },
    {
      "id": "s-bk-02-1",
      "taskId": "t-bk-02",
      "title": "Помещение освобождено",
      "done": false
    },
    {
      "id": "s-bk-03-1",
      "taskId": "t-bk-03",
      "title": "Размеры",
      "done": false
    },
    {
      "id": "s-bk-04-1",
      "taskId": "t-bk-04",
      "title": "Схема",
      "done": false
    },
    {
      "id": "s-bk-05-1",
      "taskId": "t-bk-05",
      "title": "Дизайн-проект",
      "done": false
    },
    {
      "id": "s-bk-05.1-1",
      "taskId": "t-bk-05.1",
      "title": "Бриф отправлен",
      "done": false
    },
    {
      "id": "s-bk-05.2-1",
      "taskId": "t-bk-05.2",
      "title": "Концепт на ревью",
      "done": false
    },
    {
      "id": "s-bk-05.3-1",
      "taskId": "t-bk-05.3",
      "title": "Проект готов",
      "done": false
    },
    {
      "id": "s-bk-05.4-1",
      "taskId": "t-bk-05.4",
      "title": "Дизайн утверждён Armen",
      "done": false
    },
    {
      "id": "s-bk-06-1",
      "taskId": "t-bk-06",
      "title": "Согласие на работы",
      "done": false
    },
    {
      "id": "s-bk-07-1",
      "taskId": "t-bk-07",
      "title": "Помещение готово",
      "done": false
    },
    {
      "id": "s-bk-09-1",
      "taskId": "t-bk-09",
      "title": "Мебель на месте",
      "done": false
    },
    {
      "id": "s-bk-10-1",
      "taskId": "t-bk-10",
      "title": "Команда",
      "done": false
    },
    {
      "id": "s-bk-10.1-1",
      "taskId": "t-bk-10.1",
      "title": "Требования зафиксированы",
      "done": false
    },
    {
      "id": "s-bk-10.2-1",
      "taskId": "t-bk-10.2",
      "title": "Шорт-лист",
      "done": false
    },
    {
      "id": "s-bk-10.3-1",
      "taskId": "t-bk-10.3",
      "title": "Команда набрана",
      "done": false
    },
    {
      "id": "s-bk-10.4-1",
      "taskId": "t-bk-10.4",
      "title": "Команда готова",
      "done": false
    },
    {
      "id": "s-mkt-07-1",
      "taskId": "t-mkt-07",
      "title": "Мерч к открытию COMX",
      "done": false
    },
    {
      "id": "s-mkt-08-1",
      "taskId": "t-mkt-08",
      "title": "Кампания открытия отработана",
      "done": false
    },
    {
      "id": "s-art-14-1",
      "taskId": "t-art-14",
      "title": "Решение «открываем»",
      "done": false
    },
    {
      "id": "s-bk-11-1",
      "taskId": "t-bk-11",
      "title": "Первые продажи",
      "done": false
    },
    {
      "id": "s-bk-12-1",
      "taskId": "t-bk-12",
      "title": "Работающий книжный",
      "done": false
    },
    {
      "id": "s-caf-01-1",
      "taskId": "t-caf-01",
      "title": "Концепция утверждена",
      "done": false
    },
    {
      "id": "s-caf-09-1",
      "taskId": "t-caf-09",
      "title": "Меню, техкарты",
      "done": false
    },
    {
      "id": "s-caf-04-1",
      "taskId": "t-caf-04",
      "title": "Схема",
      "done": false
    },
    {
      "id": "s-caf-05-1",
      "taskId": "t-caf-05",
      "title": "Дизайн-проект",
      "done": false
    },
    {
      "id": "s-caf-05.1-1",
      "taskId": "t-caf-05.1",
      "title": "Бриф отправлен",
      "done": false
    },
    {
      "id": "s-caf-05.2-1",
      "taskId": "t-caf-05.2",
      "title": "Два варианта",
      "done": false
    },
    {
      "id": "s-caf-05.3-1",
      "taskId": "t-caf-05.3",
      "title": "Вариант выбран",
      "done": false
    },
    {
      "id": "s-caf-05.4-1",
      "taskId": "t-caf-05.4",
      "title": "Проект готов",
      "done": false
    },
    {
      "id": "s-caf-05.5-1",
      "taskId": "t-caf-05.5",
      "title": "Дизайн утверждён Armen",
      "done": false
    },
    {
      "id": "s-caf-06-1",
      "taskId": "t-caf-06",
      "title": "Согласие на работы",
      "done": false
    },
    {
      "id": "s-caf-02-1",
      "taskId": "t-caf-02",
      "title": "Помещение освобождено",
      "done": false
    },
    {
      "id": "s-caf-03-1",
      "taskId": "t-caf-03",
      "title": "Размеры",
      "done": false
    },
    {
      "id": "s-caf-07-1",
      "taskId": "t-caf-07",
      "title": "Помещение готово",
      "done": false
    },
    {
      "id": "s-caf-07.1-1",
      "taskId": "t-caf-07.1",
      "title": "Инженерия смонтирована",
      "done": false
    },
    {
      "id": "s-caf-07.2-1",
      "taskId": "t-caf-07.2",
      "title": "Отделка завершена",
      "done": false
    },
    {
      "id": "s-art-08-1",
      "taskId": "t-art-08",
      "title": "Согласовано до заказа 18.11",
      "done": false
    },
    {
      "id": "s-caf-08-1",
      "taskId": "t-caf-08",
      "title": "Всё на месте",
      "done": false
    },
    {
      "id": "s-caf-08.1-1",
      "taskId": "t-caf-08.1",
      "title": "Спецификация",
      "done": false
    },
    {
      "id": "s-caf-08.2-1",
      "taskId": "t-caf-08.2",
      "title": "Сравнение КП",
      "done": false
    },
    {
      "id": "s-caf-08.3-1",
      "taskId": "t-caf-08.3",
      "title": "Заказано до 18.11",
      "done": false
    },
    {
      "id": "s-caf-08.4-1",
      "taskId": "t-caf-08.4",
      "title": "Заказано",
      "done": false
    },
    {
      "id": "s-caf-08.5-1",
      "taskId": "t-caf-08.5",
      "title": "Всё смонтировано до технического открытия",
      "done": false
    },
    {
      "id": "s-art-10-1",
      "taskId": "t-art-10",
      "title": "Шеф согласован",
      "done": false
    },
    {
      "id": "s-caf-10-1",
      "taskId": "t-caf-10",
      "title": "Команда",
      "done": false
    },
    {
      "id": "s-caf-10.1-1",
      "taskId": "t-caf-10.1",
      "title": "Роли и ФОТ утверждены",
      "done": false
    },
    {
      "id": "s-caf-10.2-1",
      "taskId": "t-caf-10.2",
      "title": "Шорт-лист шефов",
      "done": false
    },
    {
      "id": "s-caf-10.3-1",
      "taskId": "t-caf-10.3",
      "title": "Шеф нанят",
      "done": false
    },
    {
      "id": "s-caf-10.8-1",
      "taskId": "t-caf-10.8",
      "title": "Менеджер кафе нанят",
      "done": false
    },
    {
      "id": "s-caf-10.4-1",
      "taskId": "t-caf-10.4",
      "title": "Кухня и бар укомплектованы",
      "done": false
    },
    {
      "id": "s-caf-10.5-1",
      "taskId": "t-caf-10.5",
      "title": "Шорт-лист",
      "done": false
    },
    {
      "id": "s-caf-10.6-1",
      "taskId": "t-caf-10.6",
      "title": "Все выходят на обучение",
      "done": false
    },
    {
      "id": "s-caf-10.7-1",
      "taskId": "t-caf-10.7",
      "title": "Команда готова к тех. открытию",
      "done": false
    },
    {
      "id": "s-mkt-09-1",
      "taskId": "t-mkt-09",
      "title": "Кампания открытия отработана",
      "done": false
    },
    {
      "id": "s-art-15-1",
      "taskId": "t-art-15",
      "title": "Решение «тех. открытие»",
      "done": false
    },
    {
      "id": "s-art-16-1",
      "taskId": "t-art-16",
      "title": "Решение «открываем»",
      "done": false
    },
    {
      "id": "s-caf-11-1",
      "taskId": "t-caf-11",
      "title": "Первые гости",
      "done": false
    },
    {
      "id": "s-caf-13-1",
      "taskId": "t-caf-13",
      "title": "Замечания закрыты",
      "done": false
    },
    {
      "id": "s-caf-14-1",
      "taskId": "t-caf-14",
      "title": "Отработан сервис",
      "done": false
    },
    {
      "id": "s-caf-12-1",
      "taskId": "t-caf-12",
      "title": "Работающее кафе",
      "done": false
    },
    {
      "id": "s-sd-01-1",
      "taskId": "t-sd-01",
      "title": "Понятно, какие игры и форматы разрешены",
      "done": false
    },
    {
      "id": "s-sd-02-1",
      "taskId": "t-sd-02",
      "title": "Тариф, правила и договор аренды готовы",
      "done": false
    },
    {
      "id": "s-sd-03-1",
      "taskId": "t-sd-03",
      "title": "Комната вписана в утверждённый дизайн кафе",
      "done": false
    },
    {
      "id": "s-sd-04-1",
      "taskId": "t-sd-04",
      "title": "Заказано вместе с оборудованием кафе",
      "done": false
    },
    {
      "id": "s-sd-05-1",
      "taskId": "t-sd-05",
      "title": "Гости могут забронировать и оплатить комнату",
      "done": false
    },
    {
      "id": "s-sd-06-1",
      "taskId": "t-sd-06",
      "title": "Расписание ивентов и партнёры подключены",
      "done": false
    },
    {
      "id": "s-sd-07-1",
      "taskId": "t-sd-07",
      "title": "Комната принимает гостей с открытием кафе",
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
    "text": "Запуски: WAFL 06.11, Dark Kitchen 21.11, COMX 25.11, CAFE 15.01. План — большие задачи с подзадачами в Roadmap.",
    "emoji": "🚀",
    "authorId": "u-armen",
    "updatedAt": "2026-10-06T09:00:00"
  },
  "authVersion": 2,
  "activity": []
};
