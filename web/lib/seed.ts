import type { AppState } from "./types";

export const seed: AppState = {
  "zones": [
    {
      "slug": "wafl",
      "name": "WAFL",
      "emoji": "🧇",
      "color": "#F5D76E",
      "deadline": "2026-10-15",
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
      "deadline": "2026-10-30",
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
      "deadline": "2026-12-15",
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
      "deadline": "2026-10-30",
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
      "description": "Размеры проёмов, высота выдачи, дождь/солнце. Внутреннее окно до зала закрыто",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-18",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-001",
      "wave": "A",
      "workstream": "Архитектура",
      "dependsOn": []
    },
    {
      "id": "t2",
      "title": "Согласовать уличное окно и очередь с кинотеатром Москва",
      "description": "Письменно: окно на улицу можно, где очередь, вход в Москву не перекрыт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-002",
      "wave": "A",
      "workstream": "Зонирование",
      "dependsOn": []
    },
    {
      "id": "t3",
      "title": "Чертёж поста лицом на улицу: выпечка / сборка / окно",
      "description": "3 поста, мелтер не на ветру, касса у стекла, без гостевого WC и посадки",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-16",
      "due": "2026-09-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-16",
      "attachments": [],
      "code": "NOR-003",
      "wave": "A",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-001"
      ]
    },
    {
      "id": "t4",
      "title": "Найти технолога: тесто + карамель + шоколад",
      "description": "Оффер принят, человек в работе",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-004",
      "wave": "A",
      "workstream": "HR",
      "dependsOn": []
    },
    {
      "id": "t5",
      "title": "Заказ 2 вафельниц + мелтер шоколада",
      "description": "Счёт оплачен, прибытие в Ереван до 8 окт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-09-23",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-005",
      "wave": "A",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-003"
      ]
    },
    {
      "id": "t6",
      "title": "Разрешение окна на вынос без зала и без гостевого WC",
      "description": "Пакет под окно, не под кафе на 40 мест",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-006",
      "wave": "A",
      "workstream": "Концепция",
      "dependsOn": [
        "NOR-002"
      ]
    },
    {
      "id": "t7",
      "title": "4 лица меню + техкарты под выдачу в окно",
      "description": "Classic / Berry / Party / Soft. Эталон 10 мин в коробке без течи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-04",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-007",
      "wave": "A",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-004"
      ]
    },
    {
      "id": "t8",
      "title": "Ремонт только объёма Corner, зал не вскрывать",
      "description": "Окно на улицу готово, внутреннее зашито, зал закрыт",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-008",
      "wave": "A",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-001",
        "NOR-003",
        "NOR-006"
      ]
    },
    {
      "id": "t9",
      "title": "Упаковка взял и пошёл под шоколад",
      "description": "Макет до 25 сен, печать 27 сен, на объекте 8 окт. 10 мин в руке на Абовяне без течи",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-009",
      "wave": "A",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-007"
      ]
    },
    {
      "id": "t10",
      "title": "POS в уличном окне + 4 лица в номенклатуре",
      "description": "Чек, карта, отмена в проёме окна",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-10",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-010",
      "wave": "A",
      "workstream": "IT",
      "dependsOn": [
        "NOR-007",
        "NOR-008"
      ]
    },
    {
      "id": "t11",
      "title": "Найти кондитеров Corner и обучить окно",
      "description": "Выход 8 окт. Два поста: сборка и окно. Бариста нет",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-011",
      "wave": "A",
      "workstream": "HR",
      "dependsOn": [
        "NOR-004",
        "NOR-007"
      ]
    },
    {
      "id": "t12",
      "title": "Вывеска только у окна, не по барельефам фасада Москвы",
      "description": "Макет с кино до 23 сен, монтаж у окна до 12 окт, читается с площади Азнавура",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-16",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-16",
      "attachments": [],
      "code": "NOR-012",
      "wave": "A",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-002"
      ]
    },
    {
      "id": "t13",
      "title": "Пре-опенинг: окно у Москвы, не уютное пространство",
      "description": "Гео у Москвы, фото разреза, карты ведут к фасаду, не в зал",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-14",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-013",
      "wave": "A",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-002",
        "NOR-012"
      ]
    },
    {
      "id": "t14",
      "title": "Soft уличного окна + audit WAFL",
      "description": "50 штук в окно. Без WC, без зала, без внутреннего окна. Очередь не бьёт в кино",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-11",
      "due": "2026-10-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-11",
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
        "NOR-012",
        "NOR-038",
        "NOR-039",
        "NOR-043",
        "NOR-045",
        "NOR-047",
        "NOR-049"
      ]
    },
    {
      "id": "t15",
      "title": "Открытие уличного окна WAFL у Москвы",
      "description": "Только окно на улицу. Внутрь не пускаем. Пик после сеансов — 4 лица",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-015",
      "wave": "A",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-006",
        "NOR-013",
        "NOR-014"
      ]
    },
    {
      "id": "t16",
      "title": "Чертёж хаба: гриль + лепка пельменя + сборка доставки",
      "description": "Лепка отдельно от гриля. Зал не участвует",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-24",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-016",
      "wave": "B",
      "workstream": "Архитектура",
      "dependsOn": []
    },
    {
      "id": "t17",
      "title": "Вытяжка и линия кухни — заказ",
      "description": "Вытяжка, гриль, плита, морозилка под лепку заказаны, дата поставки до 20 окт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-20",
      "due": "2026-10-08",
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
        "NOR-016",
        "NOR-054"
      ]
    },
    {
      "id": "t18",
      "title": "Служебный ход курьера мимо входа Москвы и окна WAFL",
      "description": "Курьер не через фасадное окно и не в очередь вафель. Выдача с хаба / служебки",
      "zone": "kitchen",
      "zones": [
        "kitchen",
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-16",
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
      ]
    },
    {
      "id": "t19",
      "title": "Найти су-шефа и 3 поваров-универсалов",
      "description": "Су-шеф выход 8–15 окт, повара 15–20 окт",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-019",
      "wave": "B",
      "workstream": "HR",
      "dependsOn": []
    },
    {
      "id": "t20",
      "title": "Своя лепка: цикл и 2–3 начинки на старт",
      "description": "Замес → лепка → заморозка → варка → 25 мин в коробке. Не live под заказ",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-22",
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
      ]
    },
    {
      "id": "t21",
      "title": "3 юр.витрины + 2 агрегатора: бургер / пельмень / обед",
      "description": "3 карточки в 2 службах, фото, юр.связка. Адрес выдачи — служебка, не окно WAFL",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-26",
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
        "NOR-018",
        "NOR-060",
        "NOR-059"
      ]
    },
    {
      "id": "t22",
      "title": "Soft доставки 3 витрин и запуск Dark Kitchen",
      "description": "Зал закрыт. Курьер только служебка. 20 тестовых заказов на бренд",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-26",
      "due": "2026-10-30",
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
        "NOR-021",
        "NOR-057",
        "NOR-063",
        "NOR-064",
        "NOR-065",
        "NOR-066"
      ]
    },
    {
      "id": "t23",
      "title": "COMX: список SKU и условия консигнации",
      "description": "40-80 позиций и 1 поставщик на консигнации. Зал не нужен",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-023",
      "wave": "B",
      "workstream": "Закупки",
      "dependsOn": []
    },
    {
      "id": "t24",
      "title": "COMX: место стеллажа не на очереди WAFL",
      "description": "Место размечено. Очередь окна и вход кино свободны. Зал закрыт",
      "zone": "comx",
      "zones": [
        "comx",
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-024",
      "wave": "B",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-002",
        "NOR-023",
        "NOR-071"
      ]
    },
    {
      "id": "t25",
      "title": "COMX: мерч 3-4 SKU на витрине у книг",
      "description": "Кружка / тоут / пин стоят у стеллажа. Бьются в кассе окна отдельной группой",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-24",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-025",
      "wave": "B",
      "workstream": "Брендинг",
      "dependsOn": []
    },
    {
      "id": "t26",
      "title": "COMX: книга и мерч в кассе окна WAFL",
      "description": "Смена окна пробивает книгу и мерч. POS зала нет",
      "zone": "comx",
      "zones": [
        "comx",
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-10",
      "due": "2026-10-26",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-10",
      "attachments": [],
      "code": "NOR-026",
      "wave": "B",
      "workstream": "IT",
      "dependsOn": [
        "NOR-010",
        "NOR-025"
      ]
    },
    {
      "id": "t27",
      "title": "COMX: полка открыта, продаёт смена WAFL",
      "description": "Полка работает 30 окт. Отдельного продавца нет. Не стоим на очереди вафель",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-28",
      "due": "2026-10-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-28",
      "attachments": [],
      "code": "NOR-027",
      "wave": "B",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-024",
        "NOR-025",
        "NOR-026",
        "NOR-070",
        "NOR-075"
      ]
    },
    {
      "id": "t28",
      "title": "Посадки ~40: Casual + Time Café, без покерной",
      "description": "Раскладка 40 мест. Game Room не в объёме. Очередь WAFL не перекрыта",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-11-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-028",
      "wave": "C",
      "workstream": "Зонирование",
      "dependsOn": [
        "NOR-015"
      ]
    },
    {
      "id": "t29",
      "title": "Меню зала 12–16 + завтрак из заготовок хаба",
      "description": "Европейское короткое. 4–5 завтраков. Не ломает 3 витрины в обед",
      "zone": "cafe",
      "zones": [
        "cafe",
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-31",
      "due": "2026-11-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-31",
      "attachments": [],
      "code": "NOR-029",
      "wave": "C",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-022"
      ]
    },
    {
      "id": "t30",
      "title": "Ремонт зала после стабильной доставки",
      "description": "Пыль отсечена от окна WAFL. Кухня отдаёт доставку во время ремонта",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-12-01",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-02",
      "attachments": [],
      "code": "NOR-030",
      "wave": "C",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-022",
        "NOR-028"
      ]
    },
    {
      "id": "t31",
      "title": "Бар: стойка, кофемашина, лёд, стекло",
      "description": "Бар у WC работает. Кофе. Запах туалета не в зал",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-12-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-05",
      "attachments": [],
      "code": "NOR-031",
      "wave": "C",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-030"
      ]
    },
    {
      "id": "t32",
      "title": "Алкоголь: разрешение, бар-карта, учёт",
      "description": "Можно легально наливать. 8–12 позиций. Замок и учёт",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-12-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-032",
      "wave": "C",
      "workstream": "Концепция",
      "dependsOn": []
    },
    {
      "id": "t33",
      "title": "Найти бармена и 2 официантов",
      "description": "Бармен с 20–25 ноя. Официанты с 1–8 дек. Утро бармен на завтраке",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-12-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-10",
      "attachments": [],
      "code": "NOR-033",
      "wave": "C",
      "workstream": "HR",
      "dependsOn": []
    },
    {
      "id": "t34",
      "title": "Time Café: розетки, шкафчики, Wi-Fi, правило стола",
      "description": "Шкафчики как на плане. Нет безлимита на 1 американо. Учёт у бармена",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-10",
      "due": "2026-12-08",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-10",
      "attachments": [],
      "code": "NOR-034",
      "wave": "C",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-028",
        "NOR-033"
      ]
    },
    {
      "id": "t35",
      "title": "POS зала связан с лентой кухни + гостевые WC",
      "description": "Тикет зала и агрегатора на одной ленте. WC гостей работают",
      "zone": "cafe",
      "zones": [
        "cafe",
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-12-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-15",
      "attachments": [],
      "code": "NOR-035",
      "wave": "C",
      "workstream": "IT",
      "dependsOn": [
        "NOR-010",
        "NOR-022",
        "NOR-030"
      ]
    },
    {
      "id": "t36",
      "title": "Открыть внутреннее окно WAFL в зал",
      "description": "Уличное окно не закрываем. Внутреннее для гостей зала. На смене хватает рук",
      "zone": "cafe",
      "zones": [
        "cafe",
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-08",
      "due": "2026-12-14",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-12-08",
      "attachments": [],
      "code": "NOR-036",
      "wave": "C",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-015",
        "NOR-030"
      ]
    },
    {
      "id": "t37",
      "title": "Soft зала + завтрак + открытие CAFE",
      "description": "3 тестовых слоя. Доставка не выключена. Покерной нет. Time Café живой",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-12",
      "due": "2026-12-15",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-12",
      "attachments": [],
      "code": "NOR-037",
      "wave": "C",
      "workstream": "Открытие",
      "dependsOn": [
        "NOR-029",
        "NOR-031",
        "NOR-032",
        "NOR-033",
        "NOR-035",
        "NOR-084",
        "NOR-089",
        "NOR-090"
      ]
    },
    {
      "id": "t38",
      "title": "WAFL: точка питания 2 вафельниц + мелтер",
      "description": "Розетки/автоматы по мощности. Не делить с кухней до запуска кухни",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-16",
      "due": "2026-09-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-16",
      "attachments": [],
      "code": "NOR-038",
      "wave": "A",
      "workstream": "Инженерия",
      "dependsOn": [
        "NOR-001",
        "NOR-003"
      ]
    },
    {
      "id": "t39",
      "title": "WAFL: мойка персонала и слив без гостевого WC",
      "description": "Руки мыть можно. Гостевой туалет не обещаем",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-16",
      "due": "2026-09-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-16",
      "attachments": [],
      "code": "NOR-039",
      "wave": "A",
      "workstream": "Инженерия",
      "dependsOn": [
        "NOR-003"
      ]
    },
    {
      "id": "t40",
      "title": "WAFL: выбрать шоколад и карамель, пробная партия",
      "description": "Марка шоколада и карамели зафиксированы, есть 5 кг на тесты",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-09-30",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-040",
      "wave": "A",
      "workstream": "Поставщики",
      "dependsOn": [
        "NOR-004"
      ]
    },
    {
      "id": "t41",
      "title": "WAFL: тесто — 3 прогона до желез на объекте",
      "description": "Тесто держит резку, не рвётся, не течёт после карамели",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-23",
      "due": "2026-10-03",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-23",
      "attachments": [],
      "code": "NOR-041",
      "wave": "A",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-004",
        "NOR-040"
      ]
    },
    {
      "id": "t42",
      "title": "WAFL: эталон Classic / Berry / Party / Soft на фото",
      "description": "4 фото разреза для окна, карт и сторис. Не интерьер зала",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-30",
      "due": "2026-10-07",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-30",
      "attachments": [],
      "code": "NOR-042",
      "wave": "A",
      "workstream": "Брендинг",
      "dependsOn": [
        "NOR-007",
        "NOR-041"
      ]
    },
    {
      "id": "t43",
      "title": "WAFL: первая закупка сырья на 7 дней окна",
      "description": "Склад на 7 пиковых дней после сеансов. Есть запас шоколада",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-01",
      "attachments": [],
      "code": "NOR-043",
      "wave": "A",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-007",
        "NOR-040"
      ]
    },
    {
      "id": "t44",
      "title": "WAFL: цены, аллергены, табличка в окне",
      "description": "4 цены + аллергены видны с улицы. На армянском и русском",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-10",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-044",
      "wave": "A",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-007"
      ]
    },
    {
      "id": "t45",
      "title": "WAFL: санитарный пакет под окно на вынос",
      "description": "Документы под окно, не под кафе. Можно печь и продавать",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-10-06",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-045",
      "wave": "A",
      "workstream": "Концепция",
      "dependsOn": [
        "NOR-006"
      ]
    },
    {
      "id": "t46",
      "title": "WAFL: график смен 2 кондитера + подмена Owner/Armen",
      "description": "Закрыты сеансы пт–вс. Нет дыр в пике",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-03",
      "due": "2026-10-12",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-03",
      "attachments": [],
      "code": "NOR-046",
      "wave": "A",
      "workstream": "HR",
      "dependsOn": [
        "NOR-011"
      ]
    },
    {
      "id": "t47",
      "title": "WAFL: SOP окна 1 страница: печь / резать / начинять / глазировать / окно",
      "description": "Смена читает SOP за 10 мин. Время на 1 штуку известно",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-04",
      "due": "2026-10-11",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-04",
      "attachments": [],
      "code": "NOR-047",
      "wave": "A",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-007",
        "NOR-011"
      ]
    },
    {
      "id": "t48",
      "title": "WAFL: размен, отмена, инкассация в окне",
      "description": "Наличные и карта. Отмена без зала. Сейф на ночь",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-05",
      "due": "2026-10-11",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-05",
      "attachments": [],
      "code": "NOR-048",
      "wave": "A",
      "workstream": "IT",
      "dependsOn": [
        "NOR-010"
      ]
    },
    {
      "id": "t49",
      "title": "WAFL: ограждение очереди, не на вход кино",
      "description": "Стойки/разметка. Очередь не режет вход в Москву",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-049",
      "wave": "A",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-002"
      ]
    },
    {
      "id": "t50",
      "title": "WAFL: козырёк/защита от дождя на выдаче",
      "description": "В дождь можно отдать коробку без каши на шоколаде",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-10",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-050",
      "wave": "A",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-003",
        "NOR-008"
      ]
    },
    {
      "id": "t51",
      "title": "WAFL: гео и карточки Google / Yandex — точка у фасада",
      "description": "Пин у окна, не внутри зала. Фото разреза",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-051",
      "wave": "A",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-013"
      ]
    },
    {
      "id": "t52",
      "title": "WAFL: закрытие смены и хранение шоколада на ночь",
      "description": "Мелтер выключен по правилам. Остатки не горкнут",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-10-08",
      "attachments": [],
      "code": "NOR-052",
      "wave": "A",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-047"
      ]
    },
    {
      "id": "t53",
      "title": "WAFL: мусор шоколада и масла, вывоз",
      "description": "Договор вывоза. Запах не на фасад Москвы",
      "zone": "wafl",
      "zones": [
        "wafl"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-12",
      "priority": "medium",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-053",
      "wave": "A",
      "workstream": "Операции",
      "dependsOn": []
    },
    {
      "id": "t54",
      "title": "Кухня: мощность, вытяжка, жироуловитель — ТЗ",
      "description": "ТЗ подписано. Можно заказывать вытяжку",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-09-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-054",
      "wave": "B",
      "workstream": "Инженерия",
      "dependsOn": [
        "NOR-016"
      ]
    },
    {
      "id": "t55",
      "title": "Кухня: холод — морозилка лепки + холодильник линии",
      "description": "Объём под 3–5 дней лепки. Не общий с WAFL",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
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
      "code": "NOR-055",
      "wave": "B",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-016"
      ]
    },
    {
      "id": "t56",
      "title": "Кухня: посудомойка и зона мойки",
      "description": "Мойка не в зале. Хватает на 3 витрины",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-12",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-056",
      "wave": "B",
      "workstream": "Оборудование",
      "dependsOn": [
        "NOR-016"
      ]
    },
    {
      "id": "t57",
      "title": "Кухня: санитарка и разрешение на производство",
      "description": "Можно готовить и отдавать курьеру. Зал не требуется",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-10-16",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-057",
      "wave": "B",
      "workstream": "Концепция",
      "dependsOn": []
    },
    {
      "id": "t58",
      "title": "Кухня: меню-черновик 8–10 позиций на бренд",
      "description": "Бургер / пельмень / обед. Себес черновой. Без живого зала",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-10-08",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-058",
      "wave": "B",
      "workstream": "Меню / продукт",
      "dependsOn": []
    },
    {
      "id": "t59",
      "title": "Кухня: фото 3 витрин для агрегаторов",
      "description": "Фото не с улицы WAFL. Каждое блюдо подписано",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-22",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-08",
      "attachments": [],
      "code": "NOR-059",
      "wave": "B",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-058",
        "NOR-020"
      ]
    },
    {
      "id": "t60",
      "title": "Кухня: юрлица / договоры 2 агрегаторов",
      "description": "2 службы подключены. Комиссия понятна",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-20",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-060",
      "wave": "B",
      "workstream": "Концепция",
      "dependsOn": []
    },
    {
      "id": "t61",
      "title": "Кухня: упаковка доставки 3 брендов",
      "description": "Коробка 25 мин без размокания. Пельмень отдельно от бургера",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-22",
      "due": "2026-10-20",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-22",
      "attachments": [],
      "code": "NOR-061",
      "wave": "B",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-058"
      ]
    },
    {
      "id": "t62",
      "title": "Кухня: принтер тикетов и связь окно-не-мешает",
      "description": "Тикет на хабе. Не печатает в окне WAFL",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-01",
      "due": "2026-10-22",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-01",
      "attachments": [],
      "code": "NOR-062",
      "wave": "B",
      "workstream": "IT",
      "dependsOn": []
    },
    {
      "id": "t63",
      "title": "Кухня: первая закупка сырья 3 брендов на 5 дней",
      "description": "Сухой + заморозка лепки. Не пересекается с шоколадом WAFL",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-26",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-063",
      "wave": "B",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-058",
        "NOR-020"
      ]
    },
    {
      "id": "t64",
      "title": "Кухня: прогон бургера 15 заказов",
      "description": "15 сборок в слот. Время сборки записано",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-22",
      "attachments": [],
      "code": "NOR-064",
      "wave": "B",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-019",
        "NOR-058",
        "NOR-017"
      ]
    },
    {
      "id": "t65",
      "title": "Кухня: прогон пельменя 15 заказов",
      "description": "15 коробок. Лепка не live. 25 мин в коробке",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-22",
      "due": "2026-10-27",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-22",
      "attachments": [],
      "code": "NOR-065",
      "wave": "B",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-019",
        "NOR-020",
        "NOR-017"
      ]
    },
    {
      "id": "t66",
      "title": "Кухня: прогон обеда 15 заказов",
      "description": "Обед не валит бургерную линию",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-23",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-23",
      "attachments": [],
      "code": "NOR-066",
      "wave": "B",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-019",
        "NOR-058",
        "NOR-017"
      ]
    },
    {
      "id": "t67",
      "title": "Кухня: инструктаж курьера — только служебка",
      "description": "Листовка + точка на карте агрегатора. Не фасад Москвы",
      "zone": "kitchen",
      "zones": [
        "kitchen",
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-10-28",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-20",
      "attachments": [],
      "code": "NOR-067",
      "wave": "B",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-018"
      ]
    },
    {
      "id": "t68",
      "title": "Кухня: график 3 поваров под пик агрегаторов",
      "description": "Обед и вечер закрыты. Нет дыр пт–вс",
      "zone": "kitchen",
      "zones": [
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-26",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-068",
      "wave": "B",
      "workstream": "HR",
      "dependsOn": [
        "NOR-019"
      ]
    },
    {
      "id": "t69",
      "title": "COMX: договор консигнации с поставщиком",
      "description": "Подписан. Возврат непроданного прописан",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-15",
      "due": "2026-10-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-15",
      "attachments": [],
      "code": "NOR-069",
      "wave": "B",
      "workstream": "Закупки",
      "dependsOn": []
    },
    {
      "id": "t70",
      "title": "COMX: первая поставка 40–80 SKU",
      "description": "Коробки на объекте. Не в проходе очереди WAFL",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-18",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-070",
      "wave": "B",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-023",
        "NOR-069"
      ]
    },
    {
      "id": "t71",
      "title": "COMX: закупка стеллажа / острова и света",
      "description": "Стеллаж влезает, не перекрывает окно и вход кино",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-071",
      "wave": "B",
      "workstream": "Мебель",
      "dependsOn": [
        "NOR-002"
      ]
    },
    {
      "id": "t72",
      "title": "COMX: ценники, антивор, учёт остатков",
      "description": "Таблица остатков. Кто из смены окна может продать",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-08",
      "due": "2026-10-24",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-08",
      "attachments": [],
      "code": "NOR-072",
      "wave": "B",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-023"
      ]
    },
    {
      "id": "t73",
      "title": "COMX: мерч — макет кружки / тоут / пин",
      "description": "3 макета. Печать не блокирует открытие книг",
      "zone": "comx",
      "zones": [
        "comx",
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-17",
      "due": "2026-10-05",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-17",
      "attachments": [],
      "code": "NOR-073",
      "wave": "B",
      "workstream": "Брендинг",
      "dependsOn": []
    },
    {
      "id": "t74",
      "title": "COMX: тираж мерча на объект",
      "description": "Минимум 3 SKU физически на витрине",
      "zone": "comx",
      "zones": [
        "comx"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-09-29",
      "due": "2026-10-22",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-09-29",
      "attachments": [],
      "code": "NOR-074",
      "wave": "B",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-073"
      ]
    },
    {
      "id": "t75",
      "title": "COMX: кто продаёт до найма зала — SOP смены окна",
      "description": "Продавец книг отдельно не нужен. Смена окна умеет пробить",
      "zone": "comx",
      "zones": [
        "comx",
        "wafl"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-12",
      "due": "2026-10-26",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-12",
      "attachments": [],
      "code": "NOR-075",
      "wave": "B",
      "workstream": "HR",
      "dependsOn": [
        "NOR-011",
        "NOR-072"
      ]
    },
    {
      "id": "t76",
      "title": "CAFE: спецификация мебели ~40 мест Casual + Time Café",
      "description": "Список столов/стульев/диванов. Game Room нет",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-15",
      "due": "2026-10-31",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-15",
      "attachments": [],
      "code": "NOR-076",
      "wave": "C",
      "workstream": "Мебель",
      "dependsOn": [
        "NOR-028"
      ]
    },
    {
      "id": "t77",
      "title": "CAFE: заказ мебели и срок поставки до 5 дек",
      "description": "Поставка не ломает доставку. Склад/занос через служебку",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-25",
      "due": "2026-11-10",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-25",
      "attachments": [],
      "code": "NOR-077",
      "wave": "C",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-076"
      ]
    },
    {
      "id": "t78",
      "title": "CAFE: свет, розетки Time Café, отдельный Wi-Fi",
      "description": "На каждом месте Time Café розетка. Wi-Fi не общий с кухней",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-12-01",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-02",
      "attachments": [],
      "code": "NOR-078",
      "wave": "C",
      "workstream": "Инженерия",
      "dependsOn": [
        "NOR-028",
        "NOR-030"
      ]
    },
    {
      "id": "t79",
      "title": "CAFE: ремонт гостевых WC",
      "description": "2 WC работают. Запах не в зал и не в бар",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-02",
      "due": "2026-12-05",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-02",
      "attachments": [],
      "code": "NOR-079",
      "wave": "C",
      "workstream": "Строительство",
      "dependsOn": [
        "NOR-030"
      ]
    },
    {
      "id": "t80",
      "title": "CAFE: кофемашина, фильтр воды, помол",
      "description": "Машина на бар. Бариста как отдельная штатка не нужна — бармен",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-12-01",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-01",
      "attachments": [],
      "code": "NOR-080",
      "wave": "C",
      "workstream": "Оборудование",
      "dependsOn": []
    },
    {
      "id": "t81",
      "title": "CAFE: посуда зала и завтрака на 40",
      "description": "Хватает на оборот обеда + завтрак. Не одноразовость окна WAFL",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-05",
      "due": "2026-12-05",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-05",
      "attachments": [],
      "code": "NOR-081",
      "wave": "C",
      "workstream": "Закупки",
      "dependsOn": [
        "NOR-029"
      ]
    },
    {
      "id": "t82",
      "title": "CAFE: 4–5 завтраков из заготовок хаба — техкарты",
      "description": "Завтрак не открывает новую линию. Те же 3 повара",
      "zone": "cafe",
      "zones": [
        "cafe",
        "kitchen"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-01",
      "due": "2026-11-25",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-01",
      "attachments": [],
      "code": "NOR-082",
      "wave": "C",
      "workstream": "Меню / продукт",
      "dependsOn": [
        "NOR-029",
        "NOR-022"
      ]
    },
    {
      "id": "t83",
      "title": "CAFE: бар-карта 8–12 и поставщик алкоголя",
      "description": "Первая поставка согласована. Учёт и замок",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-10-20",
      "due": "2026-12-01",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-10-20",
      "attachments": [],
      "code": "NOR-083",
      "wave": "C",
      "workstream": "Поставщики",
      "dependsOn": [
        "NOR-032"
      ]
    },
    {
      "id": "t84",
      "title": "CAFE: обучение бармена + 2 официантов 3 дня",
      "description": "Умеют завтрак, обед, бар, шкафчики Time Café",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-05",
      "due": "2026-12-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-05",
      "attachments": [],
      "code": "NOR-084",
      "wave": "C",
      "workstream": "Обучение",
      "dependsOn": [
        "NOR-033",
        "NOR-029",
        "NOR-034"
      ]
    },
    {
      "id": "t85",
      "title": "CAFE: SOP зала 1 страница + правило стола Time Café",
      "description": "Нет безлимита на 1 американо. Слот стола понятен гостю",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-12-10",
      "priority": "high",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-11-20",
      "attachments": [],
      "code": "NOR-085",
      "wave": "C",
      "workstream": "SOP / процессы",
      "dependsOn": [
        "NOR-034"
      ]
    },
    {
      "id": "t86",
      "title": "CAFE: уборка зала и WC — кто и график",
      "description": "График до открытия. Не вешают на поваров в пик доставки",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-cpo",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-15",
      "due": "2026-12-10",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-15",
      "attachments": [],
      "code": "NOR-086",
      "wave": "C",
      "workstream": "Операции",
      "dependsOn": []
    },
    {
      "id": "t87",
      "title": "CAFE: меню-носители зала (QR / листы) без покерной",
      "description": "Завтрак / день / вечер. Game Room не упоминаем",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-20",
      "due": "2026-12-10",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-20",
      "attachments": [],
      "code": "NOR-087",
      "wave": "C",
      "workstream": "POSM",
      "dependsOn": [
        "NOR-029"
      ]
    },
    {
      "id": "t88",
      "title": "CAFE: пре-опенинг зала — не путать с окном WAFL",
      "description": "Отдельная точка «зал открыт». Окно вафель не закрываем в коммуникации",
      "zone": "cafe",
      "zones": [
        "cafe",
        "wafl"
      ],
      "assigneeId": "u-market",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-11-25",
      "due": "2026-12-13",
      "priority": "high",
      "status": "todo",
      "weight": 1,
      "criticalPath": false,
      "result": "",
      "createdAt": "2026-11-25",
      "attachments": [],
      "code": "NOR-088",
      "wave": "C",
      "workstream": "Маркетинг",
      "dependsOn": [
        "NOR-013"
      ]
    },
    {
      "id": "t89",
      "title": "CAFE: soft завтрак один день",
      "description": "20 завтраков. Кухня в это же время отдаёт доставку",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-10",
      "due": "2026-12-12",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-10",
      "attachments": [],
      "code": "NOR-089",
      "wave": "C",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-082",
        "NOR-033",
        "NOR-035"
      ]
    },
    {
      "id": "t90",
      "title": "CAFE: soft обед + вечер с алкоголем",
      "description": "Два слоя. Если доставка падает — режем Time Café, не витрины",
      "zone": "cafe",
      "zones": [
        "cafe"
      ],
      "assigneeId": "u-armen",
      "authorId": "u-cpo",
      "participantIds": [],
      "startDate": "2026-12-12",
      "due": "2026-12-14",
      "priority": "critical",
      "status": "todo",
      "weight": 3,
      "criticalPath": true,
      "result": "",
      "createdAt": "2026-12-12",
      "attachments": [],
      "code": "NOR-090",
      "wave": "C",
      "workstream": "Тестирование",
      "dependsOn": [
        "NOR-031",
        "NOR-032",
        "NOR-033",
        "NOR-089"
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
      "text": "Новый бэклог: 90 задач, старт 15 сен",
      "createdAt": "2026-09-15T09:00:00",
      "read": false,
      "kind": "task_new"
    },
    {
      "id": "n2",
      "userId": "u-armen",
      "text": "WAFL 15 окт · kitchen+COMX 30 окт · CAFE 15 дек",
      "createdAt": "2026-09-15T09:00:00",
      "read": false,
      "kind": "task_new"
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
      "telegram": "",
      "whatsapp": "",
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
    "text": "Сегодня строим окно. Маленький шаг — тоже путь.",
    "emoji": "💪",
    "authorId": "u-cpo",
    "updatedAt": "2026-09-15T09:00:00"
  }
};
