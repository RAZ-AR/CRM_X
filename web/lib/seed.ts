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
      "id": "u-armen",
      "name": "Armen",
      "email": "Armen",
      "password": "1111",
      "role": "cpo",
      "zone": null,
      "title": "Owner",
      "avatar": "A",
      "permissions": [],
      "boardZones": [
        "wafl",
        "kitchen",
        "cafe",
        "comx"
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
      "title": "Маркетинг",
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
        "comx"
      ],
      "managerId": "u-armen"
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
        "comx"
      ],
      "managerId": "u-armen"
    }
  ],
  "tasks": [],
  "comments": [],
  "subtasks": [],
  "wiki": [
    {
      "id": "w1",
      "title": "CRM X",
      "body": "Кинотеатр Москва, Ереван. A 10 окт окно Corner. B 31 окт Dark Kitchen. C 10 янв зал. Ремонт: Corner → кухня → зал.",
      "zone": "all",
      "visibility": "staff"
    }
  ],
  "notices": [],
  "contacts": [
    {
      "id": "k-armen",
      "name": "Armen",
      "company": "CRM X",
      "title": "Owner",
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
      "title": "Маркетинг",
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
    "text": "Сегодня строим окно. Маленький шаг — тоже путь.",
    "emoji": "💪",
    "authorId": "u-armen",
    "updatedAt": "2026-09-15T09:00:00"
  }
};
