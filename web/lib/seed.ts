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
  "tasks": [],
  "comments": [],
  "subtasks": [],
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
