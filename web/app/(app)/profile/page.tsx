"use client";

import { useState, type FormEvent } from "react";
import { useStore } from "@/lib/store";

export default function ProfilePage() {
  const { current, changeOwnPassword } = useStore();
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  if (!current) return null;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const next = String(fd.get("next") || "");
    if (next !== String(fd.get("repeat") || "")) {
      setMsg({ ok: false, text: "Новые пароли не совпадают" });
      return;
    }
    setBusy(true);
    const r = await changeOwnPassword(String(fd.get("current") || ""), next);
    setBusy(false);
    if (r.ok) {
      form.reset();
      setMsg({ ok: true, text: "Пароль изменён" });
    } else setMsg({ ok: false, text: r.error });
  }

  return (
    <div className="space-y-3 max-w-md">
      <h1 className="text-xl font-semibold">Мой профиль</h1>
      <div className="card p-5">
        <div className="font-medium">{current.name}</div>
        <div className="text-sm text-[#757575]">логин {current.email} · {current.title}</div>
      </div>
      <form onSubmit={onSubmit} className="card p-5 flex flex-col gap-2">
        <div className="font-medium">Сменить пароль</div>
        <input name="current" type="password" required placeholder="Текущий пароль" autoComplete="current-password" />
        <input name="next" type="password" required minLength={4} maxLength={64} placeholder="Новый пароль · от 4 символов" autoComplete="new-password" />
        <input name="repeat" type="password" required minLength={4} maxLength={64} placeholder="Повторите новый пароль" autoComplete="new-password" />
        {msg && <p className={msg.ok ? "text-green-600 text-sm" : "text-red-500 text-sm"}>{msg.text}</p>}
        <button disabled={busy} className="pill bg-black text-white py-2 font-medium disabled:opacity-50">
          {busy ? "Сохраняю…" : "Сохранить"}
        </button>
      </form>
      <TelegramCard linked={Boolean(current.telegramLinked)} owner={current.role === "cpo"} />
    </div>
  );
}

function TelegramCard({ linked, owner }: { linked: boolean; owner: boolean }) {
  const [note, setNote] = useState<{ ok: boolean; text: string } | null>(null);
  const [busy, setBusy] = useState(false);

  async function call(url: string, method: "GET" | "POST") {
    setBusy(true);
    setNote(null);
    try {
      const res = await fetch(url, { method, credentials: "same-origin" });
      return (await res.json()) as { ok: boolean; url?: string; error?: string; sent?: number };
    } catch {
      return { ok: false, error: "Нет связи с сервером" };
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="card p-5 flex flex-col gap-2">
      <div className="font-medium">Telegram</div>
      <p className="text-sm text-[#757575]">
        Бот пишет, когда вам назначают задачу, когда ваша задача ушла на проверку, готова или заблокирована,
        и каждое утро в 9:00 присылает список дел.
      </p>
      <div className="text-sm">{linked ? "✅ Подключён" : "Не подключён"}</div>
      <button
        type="button"
        disabled={busy}
        className="pill bg-black text-white py-2 font-medium disabled:opacity-50"
        onClick={async () => {
          const r = await call("/api/telegram/link", "GET");
          if (r.ok && r.url) {
            window.open(r.url, "_blank");
            setNote({ ok: true, text: "В Telegram нажмите «Старт». Ссылка действует 30 минут." });
          } else setNote({ ok: false, text: r.error || "Не получилось" });
        }}
      >
        {linked ? "Подключить заново" : "Подключить Telegram"}
      </button>
      {linked && (
        <button
          type="button"
          disabled={busy}
          className="pill bg-[#f4f4f6] py-2 text-sm"
          onClick={async () => {
            const r = await call("/api/telegram/unlink", "POST");
            setNote(r.ok ? { ok: true, text: "Отключено. Обновите страницу." } : { ok: false, text: r.error || "Не получилось" });
          }}
        >
          Отключить
        </button>
      )}
      {owner && (
        <button
          type="button"
          disabled={busy}
          className="pill bg-[#f4f4f6] py-2 text-sm"
          onClick={async () => {
            const r = await call("/api/telegram/digest", "POST");
            setNote(r.ok ? { ok: true, text: `Утренний список отправлен: ${r.sent ?? 0} чел.` } : { ok: false, text: r.error || "Не получилось" });
          }}
        >
          Разослать утренний список сейчас
        </button>
      )}
      {note && <p className={note.ok ? "text-green-600 text-sm" : "text-red-500 text-sm"}>{note.text}</p>}
    </div>
  );
}
