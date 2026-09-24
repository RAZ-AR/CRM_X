# Онлайн: GitHub + Vercel + Aiven Postgres

Приложение уже можно выложить на Vercel. Общая база (все видят одни задачи) появится после Aiven.

## 1. GitHub
Репозиторий создаётся командой (или вручную: github.com/new).

## 2. Aiven — бесплатный Postgres
1. Открой https://console.aiven.io/signup
2. Google / GitHub, план **Free / Hobby** если есть, иначе самый дешёвый PostgreSQL.
3. Create service → **PostgreSQL** → облако ближе к тебе.
4. Service → **Connection information** → скопируй **Service URI**
   `postgresql://avnadmin:...@....aivencloud.com:PORT/defaultdb?sslmode=require`

## 3. Таблицы и сид
Локально в папке `web`:

```bash
cd web
echo 'DATABASE_URL="вставь-uri-aiven"' > .env
npx prisma db push
# затем в браузере или curl:
curl -X POST https://ТВОЙ-ДОМЕН/api/state -H 'content-type: application/json' -d '{"reset":true}'
```

## 4. Vercel
1. vercel.com → Import GitHub repo
2. **Root Directory:** `web`
3. Environment Variable: `DATABASE_URL` = тот же URI Aiven
4. Deploy

Если на Vercel красная плашка «только этот браузер»: Aiven режет чужие IP.
Aiven Console → PostgreSQL → **Allowed IP addresses** → Add `0.0.0.0/0` (или Public Access). Сохрани. Подожди 1–2 мин, обнови CRM, выйди и зайди.

Логины: **Armen** (Owner), **Vladimir**, **Karina**. Пароли выдаёт Owner, сменить свой: «Мой профиль».

С `DATABASE_URL` приложение само читает `GET /api/state` и пишет `PUT /api/state` (~0.6с после правки). Два браузера видят одну доску.

Пока `DATABASE_URL` нет — сайт живёт, данные остаются в браузере (localStorage).

После смены схемы: `cd web && npx prisma db push`.
