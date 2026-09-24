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
    </div>
  );
}
