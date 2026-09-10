import type { AppState } from "./types";

export const seed: AppState = {
  "zones": [
    {
      "slug": "wafl",
      "name": "WAFL",
      "emoji": "🧇",
      "color": "#F5D76E",
      "deadline": "2026-10-10",
      "readiness": {
        "SPACE": 50,
        "EQUIPMENT": 25,
        "TEAM": 30,
        "PRODUCT": 35,
        "IT": 15,
        "MARKETING": 20,
        "OPERATIONS": 15,
        "READY": 12
      }
    },
    {
      "slug": "kitchen",
      "name": "Dark Kitchen",
      "emoji": "🍳",
      "color": "#F5A9A9",
      "deadline": "2026-10-31",
      "readiness": {
        "SPACE": 25,
        "EQUIPMENT": 15,
        "TEAM": 10,
        "PRODUCT": 20,
        "IT": 15,
        "MARKETING": 20,
        "OPERATIONS": 15,
        "READY": 8
      }
    },
    {
      "slug": "cafe",
      "name": "CAFE",
      "emoji": "☕",
      "color": "#A9F5A9",
      "deadline": "2027-01-10",
      "readiness": {
        "SPACE": 15,
        "EQUIPMENT": 20,
        "TEAM": 25,
        "PRODUCT": 20,
        "IT": 15,
        "MARKETING": 20,
        "OPERATIONS": 15,
        "READY": 8
      }
    },
    {
      "slug": "comx",
      "name": "COMX",
      "emoji": "📚",
      "color": "#A9D0F5",
      "deadline": "2027-01-10",
      "readiness": {
        "SPACE": 10,
        "EQUIPMENT": 20,
        "TEAM": 25,
        "PRODUCT": 20,
        "IT": 15,
        "MARKETING": 18,
        "OPERATIONS": 15,
        "READY": 8
      }
    }
  ],
  "users": [
    {
      "id": "u-cpo",
      "name": "Owner",
      "email": "1111",
      "password": "1111",
      "role": "cpo",
      "zone": null,
      "title": "Owner / CPO",
      "avatar": "O",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx"
      ]
    },
    {
      "id": "u-armen",
      "name": "Armen",
      "email": "2222",
      "password": "2222",
      "role": "employee",
      "zone": "wafl",
      "title": "Product Owner",
      "avatar": "A",
      "permissions": [
        "manage_users",
        "zone_page",
        "zone_team_tasks",
        "zone_team",
        "wiki",
        "contacts",
        "zone_readiness"
      ],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx"
      ]
    },
    {
      "id": "u-market",
      "name": "Маркетолог",
      "email": "3333",
      "password": "3333",
      "role": "employee",
      "zone": "wafl",
      "title": "Marketer",
      "avatar": "М",
      "permissions": [
        "wiki",
        "contacts",
        "marketing_all_zones"
      ],
      "boardZones": [
        "wafl",
        "comx",
        "cafe"
      ]
    },
    {
      "id": "u-tech",
      "name": "Технолог",
      "email": "4444",
      "password": "4444",
      "role": "employee",
      "zone": "wafl",
      "title": "Waffle technologist · ищем до 17 сен",
      "avatar": "Т",
      "permissions": [],
      "boardZones": [
        "wafl"
      ]
    },
    {
      "id": "u-pastry",
      "name": "Кондитер",
      "email": "5555",
      "password": "5555",
      "role": "employee",
      "zone": "wafl",
      "title": "Pastry · выход 3 окт",
      "avatar": "К",
      "permissions": [],
      "boardZones": [
        "wafl"
      ]
    },
    {
      "id": "u-sous",
      "name": "Су-шеф",
      "email": "6666",
      "password": "6666",
      "role": "employee",
      "zone": "kitchen",
      "title": "Sous-chef · нужен окт",
      "avatar": "С",
      "permissions": [],
      "boardZones": [
        "kitchen"
      ]
    },
    {
      "id": "u-cook",
      "name": "Повар",
      "email": "7777",
      "password": "7777",
      "role": "employee",
      "zone": "kitchen",
      "title": "Cook ×3 · нужен окт",
      "avatar": "П",
      "permissions": [],
      "boardZones": [
        "kitchen"
      ]
    },
    {
      "id": "u-bar",
      "name": "Бармен",
      "email": "8888",
      "password": "8888",
      "role": "employee",
      "zone": "cafe",
      "title": "Bartender · выход дек",
      "avatar": "Б",
      "permissions": [],
      "boardZones": [
        "cafe"
      ]
    },
    {
      "id": "u-wait",
      "name": "Официант",
      "email": "9999",
      "password": "9999",
      "role": "employee",
      "zone": "cafe",
      "title": "Waiter ×2 · выход дек/янв",
      "avatar": "Ф",
      "permissions": [],
      "boardZones": [
        "cafe"
      ]
    }
  ],
  "tasks": [
    {
      "id": "t1",
      "title": "Обмер 2 окон Corner: улица + внутрь",
      "description": "Размеры проёмов, высота выдачи, дождь/солнце. Внутреннее окно в октябре закрыто.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-10",
      "due": "2026-09-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-10",
      "attachments": [],
      "code": "NOR-001",
      "wave": "A",
      "workstream": "Архитектура",
      "dependsOn": [],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t2",
      "title": "Согласовать уличное окно и очередь с кинотеатром Москва",
      "description": "Письменно: окно на улицу можно, где стоит очередь, вход в Москву не перекрыт.",
      "zone": "wafl",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-10",
      "due": "2026-09-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-10",
      "attachments": [],
      "code": "NOR-002",
      "wave": "A",
      "workstream": "Зонирование",
      "dependsOn": [],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t3",
      "title": "Чертёж поста лицом на улицу: выпечка / сборка / окно",
      "description": "3 поста, мелтер не на ветру, касса у стекла, без гостевого WC и посадки.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-12",
      "due": "2026-09-17",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-12",
      "attachments": [],
      "code": "NOR-003",
      "wave": "A",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-001"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t4",
      "title": "Найти технолога: тесто + карамель + шоколад",
      "description": "Оффер принят, человек в работе.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-10",
      "due": "2026-09-17",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-10",
      "attachments": [],
      "code": "NOR-004",
      "wave": "A",
      "workstream": "HR",
      "dependsOn": [],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t5",
      "title": "Заказ 2 вафельниц + мелтер шоколада",
      "description": "Счёт оплачен, прибытие в Ереван до 4 октября.",
      "zone": "wafl",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-12",
      "due": "2026-09-18",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-12",
      "attachments": [],
      "code": "NOR-005",
      "wave": "A",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-003"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t6",
      "title": "Разрешение окна на вынос без зала и без гостевого WC",
      "description": "Пакет документов под окно, не под кафе на 40 мест.",
      "zone": "wafl",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-10",
      "due": "2026-09-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-10",
      "attachments": [],
      "code": "NOR-006",
      "wave": "A",
      "workstream": "Концепция",
      "dependsOn": [
        "NOR-002"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t7",
      "title": "4 лица меню + техкарты под выдачу в окно",
      "description": "Classic / Berry / Party / Soft. Эталон через 10 мин в коробке.",
      "zone": "wafl",
      "assigneeId": "u-tech",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-09-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-007",
      "wave": "A",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-004"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t8",
      "title": "Ремонт только объёма Corner, зал не вскрывать",
      "description": "Окно на улицу готово, внутреннее зашито, зал закрыт.",
      "zone": "wafl",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-04",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-008",
      "wave": "A",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-001",
        "NOR-003",
        "NOR-006"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t9",
      "title": "Упаковка «взял и пошёл» под шоколад",
      "description": "Макет до 20 сен, в печать 22 сен, на объекте 5 окт. 10 мин в руке без течи.",
      "zone": "wafl",
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-14",
      "due": "2026-10-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-14",
      "attachments": [],
      "code": "NOR-009",
      "wave": "A",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-007"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t10",
      "title": "POS в уличном окне + 4 лица в номенклатуре",
      "description": "Чек, карта, отмена в проёме окна.",
      "zone": "wafl",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-05",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-010",
      "wave": "A",
      "workstream": "IT",
      "dependsOn": [
        "NOR-007",
        "NOR-008"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t11",
      "title": "Найти кондитеров Corner, обучить окно",
      "description": "Выход 3 октября. Два поста: сборка и окно.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-26",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-26",
      "attachments": [],
      "code": "NOR-011",
      "wave": "A",
      "workstream": "HR",
      "dependsOn": [
        "NOR-004",
        "NOR-007"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t12",
      "title": "Вывеска только у окна, не по барельефам фасада Москвы",
      "description": "Макет с кино до 18 сен, монтаж у окна до 8 окт, читается с площади Азнавура.",
      "zone": "wafl",
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-12",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-12",
      "attachments": [],
      "code": "NOR-012",
      "wave": "A",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-002"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t13",
      "title": "Пре-опенинг: окно у Москвы, не уютное пространство",
      "description": "Гео у Москвы, фото разреза, карты ведут к фасаду, не в зал.",
      "zone": "wafl",
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-24",
      "due": "2026-10-09",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-24",
      "attachments": [],
      "code": "NOR-013",
      "wave": "A",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-002",
        "NOR-012"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t14",
      "title": "Soft уличного окна + audit волны A",
      "description": "50 штук в окно. Без WC, зала, внутреннего окна. Очередь не бьёт в кино.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-06",
      "due": "2026-10-09",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-06",
      "attachments": [],
      "code": "NOR-014",
      "wave": "A",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-005",
        "NOR-007",
        "NOR-008",
        "NOR-009",
        "NOR-010",
        "NOR-011",
        "NOR-012"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t15",
      "title": "Открытие уличного окна Corner у Москвы",
      "description": "Только окно на улицу. Внутрь не пускаем. Пик после сеансов — 4 лица.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-10",
      "attachments": [],
      "code": "NOR-015",
      "wave": "A",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-006",
        "NOR-014",
        "NOR-013"
      ],
      "zones": [
        "wafl"
      ]
    },
    {
      "id": "t16",
      "title": "Чертёж хаба: гриль + лепка пельменя + сборка доставки",
      "description": "Лепка отдельно от гриля. Зал не участвует. Параллельно A.",
      "zone": "kitchen",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-09-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-016",
      "wave": "B",
      "workstream": "Архитектура",
      "dependsOn": [],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t17",
      "title": "Вытяжка и линия кухни — заказ",
      "description": "Вытяжка, гриль, плита, морозилка под лепку заказаны.",
      "zone": "kitchen",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-20",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-20",
      "attachments": [],
      "code": "NOR-017",
      "wave": "B",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-016"
      ],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t18",
      "title": "Служебный ход курьера мимо входа Москвы и окна Corner",
      "description": "Курьер не через фасадное окно и не в очередь вафель. Выдача с хаба.",
      "zone": "kitchen",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-018",
      "wave": "B",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-002",
        "NOR-016"
      ],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t19",
      "title": "Найти су-шефа и 3 поваров-универсалов",
      "description": "Су-шеф 8–15 окт, повара 20–24 окт.",
      "zone": "kitchen",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-01",
      "attachments": [],
      "code": "NOR-019",
      "wave": "B",
      "workstream": "HR",
      "dependsOn": [],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t20",
      "title": "Своя лепка: цикл и 2–3 начинки на старт",
      "description": "Замес → лепка → заморозка → варка → 25 мин в коробке.",
      "zone": "kitchen",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-08",
      "attachments": [],
      "code": "NOR-020",
      "wave": "B",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-016",
        "NOR-019"
      ],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t21",
      "title": "3 юр.витрины + 2 агрегатора: бургер / пельмень / обед",
      "description": "3 карточки в 2 службах. Адрес выдачи — служебка, не окно Corner.",
      "zone": "kitchen",
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-021",
      "wave": "B",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-018"
      ],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t22",
      "title": "Soft доставки 3 витрин и запуск 31 окт",
      "description": "Зал закрыт. Курьер только служебка. 20 тестовых заказов на бренд.",
      "zone": "kitchen",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-26",
      "attachments": [],
      "code": "NOR-022",
      "wave": "B",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-017",
        "NOR-018",
        "NOR-019",
        "NOR-020",
        "NOR-021"
      ],
      "zones": [
        "kitchen"
      ]
    },
    {
      "id": "t23",
      "title": "Посадки ~40: Casual / Time Café / Fan Zone",
      "description": "Раскладка 40 мест. Очередь Corner не перекрыта.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-11-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-023",
      "wave": "C",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-015"
      ],
      "zones": [
        "cafe",
        "comx"
      ]
    },
    {
      "id": "t24",
      "title": "Меню зала 12–16 + завтрак из заготовок хаба",
      "description": "Европейское короткое. 4–5 завтраков. Не ломает 3 витрины в обед.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-12-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-01",
      "attachments": [],
      "code": "NOR-024",
      "wave": "C",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-022"
      ],
      "zones": [
        "cafe",
        "kitchen"
      ]
    },
    {
      "id": "t25",
      "title": "Старт ремонта зала только после стабильной доставки",
      "description": "Пыль отсечена от окна Corner. Кухня отдаёт доставку во время ремонта.",
      "zone": "cafe",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-12-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-10",
      "attachments": [],
      "code": "NOR-025",
      "wave": "C",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-022",
        "NOR-023"
      ],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t26",
      "title": "Бар: стойка, кофемашина, лёд, стекло",
      "description": "Бар у WC работает. Кофе + алкоголь. Запах туалета не в зал.",
      "zone": "cafe",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-12-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-10",
      "attachments": [],
      "code": "NOR-026",
      "wave": "C",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-025"
      ],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t27",
      "title": "Алкоголь: разрешение, бар-карта, учёт",
      "description": "Можно легально наливать. 8–12 позиций. Замок и учёт.",
      "zone": "cafe",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-12-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-01",
      "attachments": [],
      "code": "NOR-027",
      "wave": "C",
      "workstream": "Концепция",
      "dependsOn": [],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t28",
      "title": "Найти бармена и 2 официантов",
      "description": "Бармен 10–15 дек. Официанты 27 дек – 3 янв.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-01",
      "due": "2027-01-03",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-01",
      "attachments": [],
      "code": "NOR-028",
      "wave": "C",
      "workstream": "HR",
      "dependsOn": [],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t29",
      "title": "Fan Zone: стеллаж + консигнация книг/комиксов/манги",
      "description": "1 остров + 1 стеллаж у входа. Не перекрывает очередь окна.",
      "zone": "comx",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2027-01-05",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-20",
      "attachments": [],
      "code": "NOR-029",
      "wave": "C",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-023"
      ],
      "zones": [
        "comx"
      ]
    },
    {
      "id": "t30",
      "title": "Time Café Club: розетки, шкафчики, Wi-Fi, правило стола",
      "description": "Нет безлимита на 1 американо. Учёт мест у бармена.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2027-01-05",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-15",
      "attachments": [],
      "code": "NOR-030",
      "wave": "C",
      "workstream": "SOP",
      "dependsOn": [
        "NOR-023",
        "NOR-028"
      ],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t31",
      "title": "Merch к залу: кружка / тоут / пин + витрина у кассы",
      "description": "3–4 SKU. Касса зала бьёт мерч отдельной группой.",
      "zone": "comx",
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2027-01-05",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-01",
      "attachments": [],
      "code": "NOR-031",
      "wave": "C",
      "workstream": "Брендинг",
      "dependsOn": [
        "NOR-025"
      ],
      "zones": [
        "comx"
      ]
    },
    {
      "id": "t32",
      "title": "Game Room: звук, стол, бронь, правила ивента",
      "description": "Комната закрывается. Слот брони. Еда из бара, не готовка внутри.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2027-01-05",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-15",
      "attachments": [],
      "code": "NOR-032",
      "wave": "C",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-023"
      ],
      "zones": [
        "cafe"
      ]
    },
    {
      "id": "t33",
      "title": "POS зала связан с лентой кухни + гостевые WC",
      "description": "Тикет зала и агрегатора на одной ленте. WC гостей работают.",
      "zone": "cafe",
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-01",
      "due": "2027-01-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-01",
      "attachments": [],
      "code": "NOR-033",
      "wave": "C",
      "workstream": "IT",
      "dependsOn": [
        "NOR-010",
        "NOR-022",
        "NOR-025"
      ],
      "zones": [
        "cafe",
        "kitchen"
      ]
    },
    {
      "id": "t34",
      "title": "Открыть внутреннее окно Corner в Fan Zone",
      "description": "Уличное окно не закрываем. Внутреннее — для гостей зала.",
      "zone": "wafl",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2027-01-05",
      "due": "2027-01-10",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2027-01-05",
      "attachments": [],
      "code": "NOR-034",
      "wave": "C",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-015",
        "NOR-025",
        "NOR-029"
      ],
      "zones": [
        "wafl",
        "comx"
      ]
    },
    {
      "id": "t35",
      "title": "Soft зала + открытие 10 янв",
      "description": "3 тестовых слоя. Доставка не выключена. Если Wolt валится — режем Time Café.",
      "zone": "cafe",
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2027-01-07",
      "due": "2027-01-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2027-01-07",
      "attachments": [],
      "code": "NOR-035",
      "wave": "C",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-024",
        "NOR-026",
        "NOR-027",
        "NOR-028",
        "NOR-033"
      ],
      "zones": [
        "cafe",
        "comx"
      ]
    }
  ],
  "comments": [],
  "subtasks": [],
  "wiki": [
    {
      "id": "w1",
      "title": "Norion",
      "body": "Кинотеатр Москва, Ереван. A 10 окт окно Corner. B 31 окт Dark Kitchen. C 10 янв зал. Ремонт: Corner → кухня → зал.",
      "zone": "all",
      "visibility": "staff"
    }
  ],
  "notices": [
    {
      "id": "n1",
      "userId": "u-cpo",
      "text": "Norion: 35 задач, связи depends_on загружены",
      "createdAt": "2026-09-10T09:00:00",
      "read": false
    },
    {
      "id": "n2",
      "userId": "u-armen",
      "text": "Твой бэклог волны A: обмер окон до 14 сен",
      "taskId": "t1",
      "createdAt": "2026-09-10T09:00:00",
      "read": false
    }
  ],
  "contacts": [
    {
      "id": "k1",
      "name": "Owner",
      "company": "Norion",
      "title": "CPO",
      "phone": "",
      "email": "1111",
      "zone": "all",
      "kind": "staff"
    },
    {
      "id": "k2",
      "name": "Armen",
      "company": "Norion",
      "title": "Product Owner",
      "phone": "",
      "email": "2222",
      "zone": "wafl",
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
      "kind": "partner"
    }
  ]
};
