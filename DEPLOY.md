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
```

## 4. Vercel
1. vercel.com → Import GitHub repo
2. **Root Directory:** `web`
3. Environment Variables:
   - `DATABASE_URL` = тот же URI Aiven (опционально)
   - `SESSION_SECRET` = длинная случайная строка (`openssl rand -hex 32`). Без неё ключ сессий берётся из `BLOB_READ_WRITE_TOKEN`. Смена значения разлогинит всех.
4. Deploy

Если на Vercel красная плашка «только этот браузер»: Aiven режет чужие IP.
Aiven Console → PostgreSQL → **Allowed IP addresses** → Add `0.0.0.0/0` (или Public Access). Сохрани. Подожди 1–2 мин, обнови CRM, выйди и зайди.

Логины: **Armen** (Owner), **Vladimir**, **Karina**. Пароли выдаёт Owner, сменить свой: «Мой профиль».

С `DATABASE_URL` приложение само читает `GET /api/state` и пишет `PUT /api/state` (~0.6с после правки). Два браузера видят одну доску.

Пока `DATABASE_URL` нет — сайт живёт, данные остаются в браузере (localStorage).

После смены схемы: `cd web && npx prisma db push`.

## Безопасность

- Вход: подписанная cookie `crmx_session` (HMAC). Смена пароля разлогинивает остальные устройства.
- Пароли хранятся хэшами (scrypt). Старые пароли открытым текстом перехэшируются при первом входе.
- 5 неверных попыток за 15 минут с одного IP на один логин → пауза.
- Эндпоинта сброса базы нет. Данные и пароли в браузер не попадают — только то, что пользователь имеет право видеть.

## Telegram-бот (уведомления)

1. В Telegram откройте **@BotFather** → `/newbot` → имя (например, «CRM X») и username (например, `crmx_yerevan_bot`). BotFather пришлёт **токен** вида `123456:AA...`.
2. Vercel → проект crm-x → Settings → **Environment Variables**:
   - `TELEGRAM_BOT_TOKEN` = токен из BotFather;
   - `CRON_SECRET` = любая длинная случайная строка (защищает утреннюю рассылку).
3. Deployments → последний деплой → **Redeploy**, чтобы переменные подхватились.
4. Каждый в CRM: **Мой профиль → «Подключить Telegram»** → в Telegram нажать «Старт». Вебхук бота ставится автоматически при первом подключении.

Что приходит:
- 🆕 вам назначили задачу (создали или переназначили);
- 🟣 / 🟢 / ⛔ ваша задача ушла на проверку, готова или заблокирована (автору задачи);
- ☀️ каждый день в 9:00 по Еревану — просрочено, сдать сегодня, в работе; Owner дополнительно видит просрочки команды.

Команды бота: `/today` — список на сегодня, `/stop` — отключить. Owner может разослать утренний список вручную: «Мой профиль → Разослать утренний список сейчас».
