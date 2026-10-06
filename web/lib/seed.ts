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
      "id": "t-gen-04",
      "title": "Регистрация / запуск юрлиц",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 28.09–05.10)",
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
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Юрструктура готова",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-04",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
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
      "description": "Было 05.10–09.10 (сдвиг по зависимостям)",
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
      "id": "t-gen-08",
      "title": "Требования и разрешения для food-проекта",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–02.10)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–02.10)",
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
      "description": "Было 05.10–20.10 (сдвиг по зависимостям)",
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
      "description": "Было 12.10–22.10",
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
      "description": "Было 15.10–25.10",
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
      "id": "t-gen-13",
      "title": "Лицензия на алкоголь (CAFE, 24/7): требования, подача, получение",
      "description": "НОВАЯ. Уточнить реальные сроки выдачи — подать заранее",
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
      "result": "Лицензия получена до технического открытия",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-13",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [
        "GEN-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-24",
      "title": "Пожарные и санитарные требования к объектам",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–02.10)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 30.09–03.10)",
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
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Единая таблица ограничений по всем помещениям",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-25",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-26",
      "title": "Подрядчики: электрик, сантехник, вентиляция",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–30.09)",
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
      "id": "t-gen-28",
      "title": "Предварительный расчёт инженерных работ",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 30.09–05.10)",
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
      "description": "Было 12.10–22.10",
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
      "description": "Было 15.10–24.10",
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
      "id": "t-gen-31",
      "title": "Календарь утверждения дизайна: дедлайны WAFL 14.10 / DK 28.10 / COMX 31.10 / CAFE 13.11",
      "description": "НОВАЯ",
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
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Дизайнер знает даты сдачи по каждому объекту",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-31",
      "wave": "",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-45",
      "title": "Выбор направления логотипа",
      "description": "Исполнитель по плану: Armen + Artur\nСрок в старом плане прошёл — подтвердить статус",
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
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-46",
      "title": "Айдентика",
      "description": "Было 06.10–15.10",
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
      "description": "Было 06.10–08.10",
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
      "description": "Было 15.10–19.10",
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
      "description": "Было 15.10–22.10",
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
      "id": "t-gen-53",
      "title": "Оформление соцсетей",
      "description": "Было 15.10–18.10",
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
      "result": "Готовые профили в айдентике",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-53",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-54",
      "title": "Контент-план запуска",
      "description": "Было 10.10–17.10",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-22",
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
      "description": "Было 18.10–25.10",
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
      "description": "Было 15.10–25.10",
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
      "result": "Лендинг на домене, ссылка на приложение",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-56",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-46"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-57",
      "title": "Карточки в Google Maps, Yandex Maps, 2GIS",
      "description": "Было 20.10–25.10",
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
      "description": "Было 15.10–28.10",
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
      "id": "t-mkt-01",
      "title": "Маркетинг-план запуска 4 объектов: даты, каналы, бюджет, ответственные",
      "description": "НОВАЯ",
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
      "result": "План согласован с Vladimir и Armen",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-01",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-02",
      "title": "Блогеры и локальные медиа: список, условия (бартер/оплата), договорённости по открытиям",
      "description": "НОВАЯ",
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
      "result": "Договорённости с блогерами по Waffle и Dark Kitchen",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-02",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-03",
      "title": "Подрядчики по полиграфии и мерчу: поиск, КП, образцы, сроки",
      "description": "НОВАЯ. Смотреть сроки печати: открытие Waffle 06.11",
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
      "result": "Выбраны типографии и мерч-подрядчики",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-03",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-mkt-04",
      "title": "Полиграфия Waffle: меню-борд, POSM, наклейки — печать и получение",
      "description": "НОВАЯ. Печать в сжатые сроки — договориться с типографией заранее (MKT-03)",
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
      "result": "Печатные материалы на объекте до 04.11",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-04",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-03",
        "WAF-47"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-05",
      "title": "Контент и PR запуска Waffle: анонс, обратный отсчёт, блогеры, день открытия",
      "description": "НОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-11-06",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кампания открытия отработана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-05",
      "wave": "A",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02",
        "GEN-54"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-06",
      "title": "Контент и PR запуска Dark Kitchen: бренды, агрегаторы, первые отзывы",
      "description": "НОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-karina",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-09",
      "due": "2026-11-21",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Кампания запуска отработана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-06",
      "wave": "B",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-07",
      "title": "Мерч бренда и COMX: макеты (Vladimir), подрядчик и заказ (Karine)",
      "description": "НОВАЯ",
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
      "result": "Мерч к открытию COMX",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-07",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-08",
      "title": "Контент и PR открытия COMX: сообщество комиксов и игр, событие открытия",
      "description": "НОВАЯ",
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
      "result": "Кампания открытия отработана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-08",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-mkt-09",
      "title": "Прогрев и открытие CAFE: контент, блогеры, события, тех. открытие и запуск",
      "description": "НОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
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
      "result": "Кампания открытия отработана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "MKT-09",
      "wave": "C",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "MKT-02"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-60",
      "title": "Трудовые договоры, зарплатная схема, мотивация",
      "description": "Было 08.10–15.10",
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
      "description": "Было 15.10–24.10",
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
      "id": "t-gen-62",
      "title": "Сводный план найма: роли × даты × ФОТ × каналы (WAFL, DK, COMX, CAFE)",
      "description": "НОВАЯ. Расчёт: смены 10–12 ч, график 2/2 → ~4 человека на 1 позицию. Waffle и CAFE: 8–22, выходные до 23:00",
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
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Таблица: кого, сколько, когда выходит, сколько платим",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-62",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-63",
      "title": "Каналы подбора: job.am / Staff.am, Telegram-чаты, Instagram, рефералка, колледжи",
      "description": "НОВАЯ",
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
      "result": "Вакансии можно публиковать",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-63",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-64",
      "title": "Единая воронка: отклик → скрининг → интервью → пробная смена → оффер",
      "description": "НОВАЯ",
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
      "result": "Анкета, скрипт интервью, критерии оценки, шаблон оффера",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-64",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-65",
      "title": "Менеджеры объектов: роли, ФОТ, сроки найма",
      "description": "НОВАЯ. Технадзор, найм (HR) и закупки ведёт сам Armen — отдельных людей не нанимаем",
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
      "result": "Роли и сроки найма менеджеров утверждены (ФОТ — с Artur)",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-65",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-69",
      "title": "Найм: менеджеры Waffle и Dark Kitchen (ведут запуск, потом операционку)",
      "description": "НОВАЯ. Менеджер CAFE — вместе с шефом до 15.11 (CAF-10.8)",
      "zone": "common",
      "zones": [
        "common"
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
      "result": "Менеджеры выходят на обучение 27.10",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-69",
      "wave": "",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-65"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-70",
      "title": "Касса, POS, эквайринг, учёт",
      "description": "Было 01.10–15.10",
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
      "description": "Было 10.10–20.10",
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
      "id": "t-gen-72",
      "title": "Сводный график заказа оборудования с учётом сроков поставки",
      "description": "НОВАЯ. WAFL до 12.10, DK до 19.10 (вытяжка 26.10), COMX мебель 03.11, CAFE до 18.11",
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
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Для каждого объекта есть «последний день заказа»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "GEN-72",
      "wave": "",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-gen-80",
      "title": "Food safety: процедуры и контроль",
      "description": "Было 12.10–22.10",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-29",
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
      "description": "Было 15.10–22.10",
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
      "description": "Было 20.10–27.10",
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
      "id": "t-art-01",
      "title": "Artur: утверждение финмодели и бюджета запуска (CAPEX)",
      "description": "Исполнитель по плану: Artur\nНОВАЯ. Armen готовит, Artur утверждает",
      "zone": "common",
      "zones": [
        "common"
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
      "result": "Бюджет утверждён, можно заказывать оборудование",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-01",
      "wave": "",
      "workstream": "LEGAL & FINANCE",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-art-02",
      "title": "Artur + Armen: утверждение айдентики и бренд-гайда (готовит Vladimir)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ. Vladimir представляет, Armen и Artur утверждают",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-25",
      "due": "2026-10-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Фирменный стиль утверждён",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-02",
      "wave": "",
      "workstream": "BRAND & MARKETING",
      "dependsOn": [
        "GEN-48"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-03",
      "title": "Artur + Armen: утверждение концепций COMX и CAFE",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "common",
      "zones": [
        "common"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Концепции утверждены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-03",
      "wave": "",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "BK-01",
        "CAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-05",
      "title": "Artur: согласование заказа оборудования Waffle (КП, сумма, предоплата)",
      "description": "Исполнитель по плану: Artur\nНОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Согласовано до заказа 12.10",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-05",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "ART-01",
        "WAF-22.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-06",
      "title": "Artur: согласование заказа оборудования Dark Kitchen",
      "description": "Исполнитель по плану: Artur\nНОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-16",
      "due": "2026-10-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Согласовано до заказа 19.10",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-06",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-30.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-07",
      "title": "Artur: согласование первой закупки товара COMX ($10–30k)",
      "description": "Исполнитель по плану: Artur\nНОВАЯ",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-25",
      "due": "2026-10-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Согласовано до предоплаты 28.10",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-07",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-08",
      "title": "Artur: согласование заказа оборудования и мебели CAFE",
      "description": "Исполнитель по плану: Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
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
      "result": "Согласовано до заказа 18.11",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-09",
      "title": "Artur: согласование сметы и договора на Mini App",
      "description": "Исполнитель по плану: Artur\nНОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-13",
      "due": "2026-10-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Согласовано до договора с разработчиком",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-09",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-10",
      "title": "Artur: согласование шеф-повара CAFE (оффер)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-11-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Шеф согласован",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-10",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-12",
      "title": "Go/no-go запуска Waffle (Armen + Artur)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Решение «запускаем»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-12",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-62"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-13",
      "title": "Go/no-go запуска Dark Kitchen (Armen + Artur)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-11-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Решение «запускаем»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-13",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-53"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-14",
      "title": "Go/no-go открытия COMX (Armen + Artur)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-24",
      "due": "2026-11-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Решение «открываем»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-14",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-11"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-15",
      "title": "Go/no-go технического открытия CAFE (Armen + Artur)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-24",
      "due": "2026-12-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Решение «тех. открытие»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-15",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-10.7",
        "CAF-08.5"
      ],
      "blockReason": ""
    },
    {
      "id": "t-art-16",
      "title": "Go/no-go реального открытия CAFE (Armen + Artur)",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-14",
      "due": "2027-01-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Решение «открываем»",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "ART-16",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-14"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-01",
      "title": "Демонтаж Waffle",
      "description": "Старт сегодня (было 29.09–01.10)",
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
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-01",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-waf-02",
      "title": "Замер Waffle после демонтажа",
      "description": "Было 02.10–03.10",
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
      "description": "Было 03.10–06.10",
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
      "description": "Оборудование выбрано до 09.10 (WAF-22) (было 06.10–08.10)",
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
      "description": "Было 06.10–09.10",
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
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nДизайн утверждается до 14.10 — подзадачи ниже (было 08.10–13.10). Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "result": "Дизайн-проект",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01",
        "GEN-45"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-06.1",
      "title": "Бриф дизайнеру Waffle: размеры окна, оборудование, поток, айдентика",
      "description": "НОВАЯ",
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
      "result": "Бриф отправлен Vladimir",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06.1",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-06.2",
      "title": "Концепт точки (2 варианта)",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Два варианта на выбор",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06.2",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-06.3",
      "title": "Правки и финальный проект: размеры, материалы, спецификация",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
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
      "result": "Проект готов к утверждению",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06.3",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-06.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА Waffle",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-14",
      "due": "2026-10-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Дизайн утверждён Armen — дедлайн",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-06.4",
      "wave": "A",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "WAF-06.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-07",
      "title": "Согласование дизайна и работ: арендодатель, фасад, пожарные",
      "description": "Было 13.10–15.10",
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
      "description": "Было 15.10–21.10",
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
      "description": "Было 13.10–17.10",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–30.09)",
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
      "description": "Замер окна сразу после демонтажа (было 02.10–03.10)",
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
      "description": "Старт сразу после утверждения дизайна 14.10 (было 03.10–15.10)",
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
      "description": "Было 15.10–20.10",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–25.09)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 25.09–02.10)",
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
      "description": "Выбор оборудования до 09.10 (было 29.09–05.10)",
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
      "id": "t-waf-22.1",
      "title": "ТЗ на оборудование: вафельницы, холод, кофемашина (по мощности WAF-23)",
      "description": "НОВАЯ",
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
      "result": "Список с моделями и количеством",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-22.1",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-23"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-22.2",
      "title": "КП от ≥3 поставщиков, сроки поставки, сравнение",
      "description": "НОВАЯ",
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
      "result": "Выбран поставщик",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-22.2",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-23",
      "title": "Производственная мощность: сколько вафель в час в пик",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 01.10–05.10)",
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
      "description": "Заказ до 12.10 — иначе срыв запуска (было 05.10–08.10)",
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
      "result": "Оплачено, есть дата доставки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-24",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22",
        "ART-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-24.3",
      "title": "Договор, предоплата, фиксация срока поставки ≤18 дней",
      "description": "НОВАЯ",
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
      "result": "Оборудование заказано",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-24.3",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-22.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-25",
      "title": "Доставка оборудования",
      "description": "Было 08.10–19.10",
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
      "id": "t-waf-25.1",
      "title": "Приёмка оборудования по чек-листу, проверка на брак",
      "description": "НОВАЯ",
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
      "result": "Всё принято, претензии закрыты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-25.1",
      "wave": "A",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "WAF-24.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-26",
      "title": "Хранение: холодильник, морозилка, сухой склад, упаковка",
      "description": "Было 10.10–20.10",
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
      "description": "Было 10.10–18.10",
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
      "description": "Было 08.10–18.10",
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
      "description": "Было 18.10–23.10",
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
      "description": "Было 21.10–24.10",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–05.10)",
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
      "description": "Было 05.10–07.10",
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
      "description": "Исполнитель по плану: Armen + Artur\nПросрочено в старом плане — перенесено на ближайшие дни (было 29.09–05.10)",
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
      "description": "Исполнитель по плану: Шеф-кондитер\nБыло 07.10–15.10",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-19",
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
      "description": "Исполнитель по плану: Armen + Artur\nБыло 15.10–19.10",
      "zone": "wafl",
      "zones": [
        "wafl"
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
      "description": "Было 19.10–22.10",
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
      "description": "Было 19.10–22.10",
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
      "description": "Было 22.10–25.10",
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
      "id": "t-waf-50",
      "title": "Штатная структура Waffle",
      "description": "Подзадачи по найму ниже",
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
      "description": "Было 08.10–15.10",
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
      "id": "t-waf-51.1",
      "title": "Вакансии: тексты, публикация (кондитеры, бариста/кассиры; смены 10–12 ч, 2/2)",
      "description": "НОВАЯ. Часы работы 8–22 (выходные до 23:00), смены 10–12 ч, график 2/2: ~4 человека на каждую позицию → ~8 на 2 позиции + шеф-кондитер",
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
      "result": "Вакансии опубликованы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-51.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-50"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-51.2",
      "title": "Скрининг откликов, первичные звонки",
      "description": "НОВАЯ",
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
      "result": "Шорт-лист кандидатов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-51.2",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-51.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-52",
      "title": "Собеседования",
      "description": "Было 12.10–18.10",
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
      "id": "t-waf-52.1",
      "title": "Пробные смены / практическое задание (вафли, кофе, касса)",
      "description": "НОВАЯ",
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
      "result": "Оценка кандидатов по критериям",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-52.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-51.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-53",
      "title": "Найм и договоры",
      "description": "Было 18.10–20.10",
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
      "id": "t-waf-53.1",
      "title": "Оффер, договоры, медкнижки (санминимум 3–5 дней), 2 запасных кандидата",
      "description": "НОВАЯ",
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
      "result": "Все выходят с 27.10 на обучение",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-53.1",
      "wave": "A",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "WAF-52.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-waf-54",
      "title": "Обучение персонала",
      "description": "Было 21.10–24.10",
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
      "description": "Было 24.10–26.10",
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
      "description": "Было 24.10–25.10",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-11-03",
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
      "description": "Было 26.10–27.10",
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
      "description": "Было 27.10–28.10",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-11-05",
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
      "description": "Запуск Waffle (приложение — отдельным запуском 13.11) (было 28.10–28.10)",
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
      "result": "Работающая точка",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "WAF-63",
      "wave": "A",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "WAF-62",
        "ART-12"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-01",
      "title": "App: цели и механика лояльности",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–29.09)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 26.09–01.10)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 24.09–01.10)",
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
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 01.10–05.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 05.10–07.10)",
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
      "result": "Договор подписан",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "APP-05",
      "wave": "A",
      "workstream": "PRODUCT & APP",
      "dependsOn": [
        "APP-04",
        "ART-09"
      ],
      "blockReason": ""
    },
    {
      "id": "t-app-06",
      "title": "App: UX-прототип",
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 07.10–10.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 15.10–18.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 10.10–20.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 15.10–21.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 12.10–22.10)",
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
      "description": "Было 08.10–16.10",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 22.10–24.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 24.10–26.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 24.10–27.10)",
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
      "description": "Цепочка приложения сдвинута: ТЗ готово 13.10 (было 20.10–27.10)",
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
      "description": "Запуск приложения через неделю после Waffle — за 3,5 недели от ТЗ быстрее нереально (было 27.10–28.10)",
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
      "id": "t-dk-03",
      "title": "Long list виртуальных брендов",
      "description": "Просрочено в старом плане — перенесено на ближайшие дни (было 26.09–03.10)",
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
      "description": "Было 03.10–07.10",
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
      "description": "Исполнитель по плану: Armen + Artur\nБыло 07.10–08.10",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-09",
      "due": "2026-10-10",
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
        "DK-04"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-06",
      "title": "Юнит-экономика каждого бренда",
      "description": "Было 08.10–14.10 (сдвиг по зависимостям)",
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
      "description": "Было 08.10–18.10 (сдвиг по зависимостям)",
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
      "description": "Исполнитель по плану: Armen + шеф\nБыло 08.10–15.10 (сдвиг по зависимостям)",
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
      "description": "Исполнитель по плану: Шеф Dark Kitchen\nБыло 15.10–24.10 (сдвиг по зависимостям)",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-11-01",
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
        "DK-08",
        "DK-18"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-10",
      "title": "Тест-дегустация / фокус-группа",
      "description": "Исполнитель по плану: Armen + Artur\nБыло 24.10–27.10 (сдвиг по зависимостям)",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-11-05",
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
      "description": "Было 27.10–30.10 (сдвиг по зависимостям)",
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
      "description": "Было 27.10–30.10 (сдвиг по зависимостям)",
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
      "description": "Было 12.10–25.10",
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
      "description": "Было 18.10–31.10 (сдвиг по зависимостям)",
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
      "description": "Было 28.10–31.10 (сдвиг по зависимостям)",
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
      "description": "Было 20.10–03.11",
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
      "description": "Было 08.10–15.10 (сдвиг по зависимостям)",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-19",
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
      "id": "t-dk-18",
      "title": "Шеф/су-шеф Dark Kitchen: поиск и найм до разработки рецептур",
      "description": "НОВАЯ. Концепция — Armen и Artur; предложения по меню — шеф",
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
      "result": "Шеф предлагает меню и рецептуры",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-18",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-05"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-20",
      "title": "Демонтаж кухни",
      "description": "Параллельно с Waffle, отдельная бригада (было 02.10–06.10)",
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
      "result": "Помещение освобождено",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-20",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-dk-21",
      "title": "Замер кухни после демонтажа",
      "description": "Было 07.10–07.10",
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
      "description": "Было 07.10–10.10",
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
      "description": "Было 13.10–14.10",
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
      "description": "Вытяжка — самый длинный заказ, закладываем сразу (было 10.10–14.10)",
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
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nПодзадачи по утверждению дизайна ниже (было 14.10–18.10). Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-28",
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
      "id": "t-dk-25.1",
      "title": "Бриф дизайнеру кухни: потоки, зоны, оборудование",
      "description": "НОВАЯ",
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
      "result": "Бриф отправлен Vladimir",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-25.1",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-22"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-25.2",
      "title": "Первая версия: зонирование и 3D/схемы",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-21",
      "due": "2026-10-24",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Версия 1 на ревью",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-25.2",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-25.3",
      "title": "Правки, финальные чертежи, спецификация материалов",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
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
      "result": "Проект готов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-25.3",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-25.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА кухни",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
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
      "result": "Дизайн утверждён Armen",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-25.4",
      "wave": "B",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "DK-25.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-26",
      "title": "Согласование: арендодатель, пожарные, санитария",
      "description": "Было 18.10–21.10",
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
      "description": "Было 21.10–31.10",
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
      "description": "Было 08.10–13.10",
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
      "id": "t-dk-30.1",
      "title": "КП от ≥3 поставщиков (основное оборудование)",
      "description": "НОВАЯ",
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
      "result": "Выбран поставщик",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-30.1",
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
      "description": "Было 10.10–14.10",
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
      "description": "Заказ основного оборудования (было 13.10–15.10)",
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
      "result": "Оплачено, есть дата доставки",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-32",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-30",
        "ART-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-36",
      "title": "Заказ вытяжки/вентиляции (самый долгий срок) — сразу после инженерного проекта",
      "description": "НОВАЯ",
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
      "result": "Вытяжка заказана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-36",
      "wave": "B",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "DK-24"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-33",
      "title": "Доставка оборудования кухни",
      "description": "Было 15.10–28.10",
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
      "id": "t-dk-33.1",
      "title": "Приёмка оборудования, проверка на брак",
      "description": "НОВАЯ",
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
      "result": "Всё принято",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-33.1",
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
      "description": "Было 15.10–28.10",
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
      "description": "Было 31.10–02.11",
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
      "description": "Было 15.10–18.10",
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
      "description": "Су-шеф — ключевая позиция, нанять до 03.11 (было 18.10–27.10)",
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
      "id": "t-dk-41.1",
      "title": "Вакансии: су-шеф, повара, комплектовщик/упаковщик",
      "description": "НОВАЯ",
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
      "result": "Вакансии опубликованы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-41.1",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-40",
        "GEN-63"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-41.2",
      "title": "Скрининг и интервью",
      "description": "НОВАЯ",
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
      "result": "Шорт-лист",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-41.2",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-41.3",
      "title": "Пробная смена: приготовить блюда MVP-меню",
      "description": "НОВАЯ",
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
      "result": "Выбраны кандидаты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-41.3",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-42",
      "title": "Найм кухни",
      "description": "Было 27.10–31.10",
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
      "id": "t-dk-42.1",
      "title": "Оффер, договоры, медкнижки",
      "description": "НОВАЯ",
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
      "result": "Все выходят на обучение 11.11",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-42.1",
      "wave": "B",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "DK-41.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-dk-43",
      "title": "Обучение по техкартам",
      "description": "Было 01.11–04.11",
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
      "description": "Было 04.11–05.11",
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
      "description": "Было 03.11–04.11",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-14",
      "due": "2026-11-15",
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
      "description": "Было 05.11–06.11",
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
      "description": "Было 06.11–08.11",
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
      "description": "Было 08.11–10.11",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-19",
      "due": "2026-11-20",
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
      "description": "Запуск Dark Kitchen (было 10.11–10.11)",
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
      "result": "Первый полноценный запуск",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-54",
      "wave": "B",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "DK-53",
        "ART-13"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-01",
      "title": "Концепция COMX: ассортимент, формат, события",
      "description": "Исполнитель по плану: Armen + Artur\nРаньше, чем было: нужна для закупки и дизайна (было 20.10–31.10)",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-20",
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
      "description": "Допущение: после демонтажа кухни, та же бригада (было 02.11–06.11)",
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
      "description": "Было 06.11–07.11",
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
      "description": "Было 07.11–12.11",
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
      "result": "Схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-03",
        "ART-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-05",
      "title": "Дизайн COMX",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nПодзадачи по утверждению дизайна ниже (было 12.11–20.11). Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-31",
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
      "id": "t-bk-05.1",
      "title": "Бриф дизайнеру COMX: зоны (комиксы/игры/мерч/снеки), стеллажи, касса",
      "description": "НОВАЯ",
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
      "result": "Бриф отправлен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-05.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-05.2",
      "title": "Концепт интерьера",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-10-28",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Концепт на ревью",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-05.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-05.3",
      "title": "Правки, чертежи стеллажей, спецификация",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-31",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Проект готов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-05.3",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-05.4",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА COMX",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-31",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "Дизайн утверждён Armen",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-05.4",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "BK-05.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-06",
      "title": "Согласование COMX",
      "description": "Было 20.11–24.11",
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
      "description": "Было 24.11–08.12",
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
      "description": "Подзадачи ниже; первая закупка — до 28.10 (доставка из-за рубежа 3–4 нед.) (было 01.11–25.11)",
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
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Первая партия заказана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-08",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-08.1",
      "title": "Категории и бюджет закупки ($10–30k): комиксы RU/EN/AM, настолки, мерч, лицензии",
      "description": "НОВАЯ. Бюджет из условий проекта",
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
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Бюджет по категориям",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-08.1",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-bk-08.2",
      "title": "Зарубежные поставщики: КП, условия, таможня/доставка, эксклюзив",
      "description": "НОВАЯ",
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
      "result": "Список поставщиков с условиями",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-08.2",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-08.3",
      "title": "Первый заказ (предоплата)",
      "description": "НОВАЯ",
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
      "result": "Заказ размещён",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-08.3",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.2",
        "ART-07"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-09",
      "title": "Стеллажи и мебель",
      "description": "Стеллажи заказываем сразу после утверждения дизайна (было 20.11–05.12)",
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
      "id": "t-bk-13",
      "title": "Приёмка товара, ценники, выкладка",
      "description": "НОВАЯ",
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
      "result": "Магазин заполнен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-13",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "BK-08.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-10",
      "title": "Персонал COMX",
      "description": "Подзадачи по найму ниже (было 20.11–08.12)",
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
      "id": "t-bk-10.1",
      "title": "Профиль: менеджер, продавцы-консультанты (комиксы/игры)",
      "description": "НОВАЯ",
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
      "result": "Требования зафиксированы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-10.1",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-10.2",
      "title": "Вакансии и скрининг",
      "description": "НОВАЯ",
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
      "result": "Шорт-лист",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-10.2",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.1",
        "GEN-63"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-10.3",
      "title": "Пробная смена, оффер, договоры",
      "description": "НОВАЯ",
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
      "result": "Команда набрана",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-10.3",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-10.4",
      "title": "Обучение: ассортимент, касса, лояльность",
      "description": "НОВАЯ",
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
      "result": "Команда готова",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-10.4",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "BK-10.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-bk-11",
      "title": "Soft launch COMX",
      "description": "Было 10.12–13.12",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-22",
      "due": "2026-11-24",
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
      "description": "Открытие COMX (допущение — подтвердить) (было 15.12–15.12)",
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
      "result": "Работающий книжный",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "BK-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "BK-11",
        "ART-14"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-01",
      "title": "Концепция кафе: меню, зал, бар",
      "description": "Исполнитель по плану: Armen + Artur\nБыло 01.11–15.11",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-20",
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
      "description": "Было 16.11–20.11",
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
      "description": "Финальный замер после демонтажа (было 20.11–21.11)",
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
      "description": "По предварительным замерам, уточнение после 11.11 (было 21.11–27.11)",
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
      "result": "Схема",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-04",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [],
      "blockReason": ""
    },
    {
      "id": "t-caf-05",
      "title": "Дизайн кафе",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nПодзадачи по утверждению дизайна ниже (было 27.11–07.12). Интерьер — внешний дизайнер, общается Armen; Vladimir проверяет соответствие айдентике",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-24",
      "due": "2026-11-13",
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
      "id": "t-caf-05.1",
      "title": "Бриф дизайнеру CAFE: зал, бар, посадка, акустика рядом с Game Room",
      "description": "НОВАЯ",
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
      "result": "Бриф отправлен",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-01",
        "ART-03"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-05.2",
      "title": "Концепт зала и бара (2 варианта)",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-10-27",
      "due": "2026-11-03",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Два варианта",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-05.3",
      "title": "Выбор варианта",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-03",
      "due": "2026-11-04",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Вариант выбран",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05.3",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-05.4",
      "title": "Детальный проект: свет, материалы, мебель, спецификации",
      "description": "Исполнитель по плану: Дизайнер интерьера (внешний)\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-04",
      "due": "2026-11-13",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Проект готов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05.4",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-05.5",
      "title": "УТВЕРЖДЕНИЕ ДИЗАЙНА CAFE",
      "description": "Исполнитель по плану: Armen + Artur\nНОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
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
      "result": "Дизайн утверждён Armen",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-05.5",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-05.4"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-06",
      "title": "Согласование кафе",
      "description": "Арендодатель, пожарные, санитария (было 07.12–10.12)",
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
      "description": "Подзадачи ниже (было 10.12–08.01)",
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
      "id": "t-caf-07.1",
      "title": "Черновые работы: вентиляция, электрика, вода, канализация",
      "description": "НОВАЯ",
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
      "result": "Инженерия смонтирована",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-07.1",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-06"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-07.2",
      "title": "Чистовая отделка, свет",
      "description": "НОВАЯ",
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
      "result": "Отделка завершена",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-07.2",
      "wave": "C",
      "workstream": "SPACE & BUILD",
      "dependsOn": [
        "CAF-07.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08",
      "title": "Оборудование и мебель кафе",
      "description": "Подзадачи ниже; заказ до 18.11 (поставка 4–5 нед.) (было 01.12–05.01)",
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
      "id": "t-caf-08.1",
      "title": "Перечень оборудования и мебели по концепту и меню",
      "description": "НОВАЯ",
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
      "result": "Спецификация",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08.1",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08.2",
      "title": "КП от ≥3 поставщиков, сроки поставки",
      "description": "НОВАЯ",
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
      "result": "Сравнение КП",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08.2",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.1"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08.3",
      "title": "Выбор, договор, заказ оборудования и мебели (поставка 4–5 нед.)",
      "description": "НОВАЯ",
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
      "result": "Заказано до 18.11",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08.3",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.2",
        "ART-08"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08.4",
      "title": "Посуда, бар-инвентарь, текстиль",
      "description": "НОВАЯ",
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
      "result": "Заказано",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08.4",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-01"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-08.5",
      "title": "Приёмка и монтаж оборудования",
      "description": "НОВАЯ",
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
      "result": "Всё смонтировано до технического открытия",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-08.5",
      "wave": "C",
      "workstream": "EQUIPMENT & SUPPLY",
      "dependsOn": [
        "CAF-08.3",
        "CAF-07.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-09",
      "title": "Меню и рецептуры кафе",
      "description": "Исполнитель по плану: Шеф-повар CAFE\nРазработка меню вместе с шефом после его выбора (было 15.11–20.12)",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-12-15",
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
      "description": "Подзадачи по найму ниже; шеф — ключевая позиция (было 10.12–08.01)",
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
      "id": "t-caf-10.1",
      "title": "Штатное расписание, ФОТ, график (8–22, выходные до 23:00; смены 10–12 ч, 2/2)",
      "description": "НОВАЯ. ~4 человека на позицию: кухня, бар, зал, мойка + администратор",
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
      "result": "Роли и ФОТ утверждены",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.1",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.2",
      "title": "Поиск шеф-повара — ключевая позиция (сейчас шефа нет)",
      "description": "НОВАЯ",
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
      "result": "Шорт-лист шефов",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.2",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-62"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.3",
      "title": "Выбор шефа, оффер, он подключается к разработке меню",
      "description": "НОВАЯ",
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
      "result": "Шеф нанят",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.3",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "ART-10"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.8",
      "title": "Менеджер CAFE: поиск и найм вместе с шефом",
      "description": "НОВАЯ",
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
      "result": "Менеджер кафе нанят",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.8",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.2"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.4",
      "title": "Су-шеф, бар-менеджер, бармены",
      "description": "НОВАЯ",
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
      "result": "Кухня и бар укомплектованы",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.4",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.3"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.5",
      "title": "Зал: администратор, официанты, бариста — вакансии и собеседования",
      "description": "НОВАЯ",
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
      "result": "Шорт-лист",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.5",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "GEN-63"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.6",
      "title": "Офферы, договоры, медкнижки",
      "description": "НОВАЯ",
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
      "result": "Все выходят на обучение",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.6",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.5",
        "GEN-61"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-10.7",
      "title": "Обучение и репетиции зала и кухни",
      "description": "НОВАЯ",
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
      "result": "Команда готова к тех. открытию",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-10.7",
      "wave": "C",
      "workstream": "PEOPLE & TRAINING",
      "dependsOn": [
        "CAF-10.6"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-11",
      "title": "Техническое открытие кафе (закрытые гости)",
      "description": "ТЕХНИЧЕСКОЕ ОТКРЫТИЕ (закрытые гости, отработка кухни и зала) (было 10.01–13.01)",
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
      "result": "Первые гости",
      "createdAt": "2026-09-24",
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
      "blockReason": ""
    },
    {
      "id": "t-caf-13",
      "title": "Устранение замечаний после тех. открытия (праздничные дни 31.12–06.01)",
      "description": "НОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2026-12-29",
      "due": "2027-01-09",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Замечания закрыты",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-13",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-11"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-14",
      "title": "Soft launch для приглашённых гостей",
      "description": "НОВАЯ",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-armen",
      "participantIds": [],
      "startDate": "2027-01-10",
      "due": "2027-01-14",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "Отработан сервис",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-14",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-13"
      ],
      "blockReason": ""
    },
    {
      "id": "t-caf-12",
      "title": "🚀 Реальное открытие CAFE",
      "description": "РЕАЛЬНОЕ ОТКРЫТИЕ 15–20.01 (было 15.01–15.01)",
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
      "result": "Работающее кафе",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "CAF-12",
      "wave": "C",
      "workstream": "LAUNCH & OPS",
      "dependsOn": [
        "CAF-14",
        "ART-16"
      ],
      "blockReason": ""
    },
    {
      "id": "t-gen-01",
      "title": "Проверка договорных ограничений по помещениям",
      "description": "Сделано: без этого демонтаж не стартует",
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
      "description": "Сделано: без этого демонтаж не стартует",
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
      "description": "Сделано (допущение): оформление документов",
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
      "id": "t-gen-07",
      "title": "Финансовая модель и бюджет запуска",
      "description": "Сделано: финансовая модель X SPACE готова",
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
      "id": "t-gen-20",
      "title": "Первичный осмотр объектов",
      "description": "Сделано: осмотр",
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
      "description": "Сделано: обмер",
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
      "description": "Сделано: решено, что демонтируем (демонтаж стартует 06.10)",
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
      "description": "Сделано: обследование инженерии",
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
      "id": "t-gen-27",
      "title": "Общий график ремонта: Waffle → Dark Kitchen → COMX → CAFE",
      "description": "Заменено этим планом (общий график ремонта)",
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
      "id": "t-gen-40",
      "title": "Сбор референсов, moodboard",
      "description": "Сделано (допущение): выбор логотипа — 06.10",
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
      "description": "Сделано (допущение)",
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
      "description": "Сделано (допущение)",
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
      "description": "Сделано (допущение)",
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
      "description": "Сделано: выбор направления логотипа — GEN-45",
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
      "id": "t-gen-50",
      "title": "Проверка доменов",
      "description": "Сделано (допущение)",
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
      "description": "Сделано (допущение)",
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
      "description": "Сделано (допущение)",
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
      "id": "t-waf-48",
      "title": "Юнит-экономика точки Waffle",
      "description": "Сделано: юнит-экономика есть в финмодели",
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
      "id": "t-dk-01",
      "title": "Исследование рынка доставки: конкуренты, цены, агрегаторы",
      "description": "Сделано (допущение): исследование рынка доставки",
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
      "description": "Сделано: концепция Dark Kitchen есть",
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
      "result": "Концепция",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "DK-02",
      "wave": "B",
      "workstream": "PRODUCT & APP",
      "dependsOn": [],
      "blockReason": ""
    }
  ],
  "comments": [],
  "subtasks": [
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
    },
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
