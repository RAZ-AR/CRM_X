"use client";

import { FormEvent, useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { canManagePeople } from "@/lib/access";
import { type Permission, type ZoneSlug } from "@/lib/types";
import { unusedFourDigit } from "@/lib/pin";

const PERMS: { id: Permission; label: string }[] = [
  { id: "manage_users", label: "Управлять командой" },
  { id: "zone_page", label: "Страница зоны" },
  { id: "zone_team_tasks", label: "Задачи команды" },
  { id: "wiki", label: "Wiki" },
  { id: "contacts", label: "Контакты" },
];

export default function SettingsPage() {
  const { current, users, zones, grant, addUser, setBoardZones, setManager, setUserPin, setUserLogin } = useStore();
  const taken = useMemo(() => new Set(users.map((u) => u.email)), [users]);
  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState<{ name: string; login: string; pin: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!current) return null;
  if (!canManagePeople(current)) return <div className="card p-6">Только Owner и Armen.</div>;

  function suggestLogin() {
    const n = unusedFourDigit(taken, [pin]);
    setLogin(n);
  }

  function suggestPin() {
    const n = unusedFourDigit(taken, [login]);
    setPin(n);
  }

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setCopied(false);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name"));
    const res = addUser({
      name,
      email: login,
      password: pin,
      title: String(fd.get("title")),
      zone: fd.get("zone") as ZoneSlug,
      managerId: String(fd.get("managerId") || current!.id),
    });
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setCreated({ name, login, pin });
    setLogin("");
    setPin("");
    e.currentTarget.reset();
  }

  async function copyCreds(name: string, l: string, p: string) {
    const text = `${name}\nлогин ${l}\nPIN ${p}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="space-y-3 max-w-3xl">
      <h1 className="text-xl font-semibold">Команда и доступы к доскам</h1>
      <p className="text-sm text-[#757575]">
        Owner и Armen создают человека с логином и PIN из 4 цифр — сразу можно отдать на объекте.
      </p>
      <form onSubmit={onAdd} className="card p-5 grid sm:grid-cols-2 gap-2">
        <div className="sm:col-span-2 font-medium">Добавить сотрудника</div>
        <input name="name" required placeholder="Имя" />
        <input name="title" required placeholder="Должность" />
        <select name="zone" required>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <select name="managerId" defaultValue={current.id}>
          {users.map((m) => (
            <option key={m.id} value={m.id}>Руководитель: {m.name}</option>
          ))}
        </select>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-[#757575]">Логин · 4 цифры</label>
            <button type="button" className="text-xs underline" onClick={suggestLogin}>подобрать</button>
          </div>
          <input
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            placeholder="например 5050"
            value={login}
            onChange={(e) => setLogin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
        </div>
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs text-[#757575]">PIN · 4 цифры</label>
            <span className="flex gap-2">
              <button type="button" className="text-xs underline" onClick={() => setPin(login)}>как логин</button>
              <button type="button" className="text-xs underline" onClick={suggestPin}>подобрать</button>
            </span>
          </div>
          <input
            inputMode="numeric"
            pattern="\d{4}"
            maxLength={4}
            required
            placeholder="пин для входа"
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 4))}
          />
        </div>
        {err && <p className="text-red-500 text-sm sm:col-span-2">{err}</p>}
        <button className="pill bg-black text-white px-4 py-2 sm:col-span-2">Создать и выдать доступ</button>
      </form>

      {created && (
        <div className="card p-5 bg-black text-white">
          <div className="text-sm opacity-70 mb-1">Отдайте сотруднику</div>
          <div className="text-lg font-medium">{created.name}</div>
          <div className="mt-2 font-mono text-xl tracking-widest">логин {created.login} · PIN {created.pin}</div>
          <button
            type="button"
            className="mt-3 pill bg-white text-black px-4 py-2 text-sm"
            onClick={() => copyCreds(created.name, created.login, created.pin)}
          >
            {copied ? "Скопировано" : "Скопировать"}
          </button>
        </div>
      )}

      {users.filter((u) => u.role === "employee").map((u) => (
        <div key={u.id} className="card p-5">
          <div className="font-medium">{u.name} · {u.title}</div>
          <div className="mt-2 grid sm:grid-cols-2 gap-2">
            <label className="text-xs text-[#757575]">
              Логин
              <input
                className="mt-1"
                defaultValue={u.email}
                inputMode="numeric"
                maxLength={4}
                onBlur={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (v && v !== u.email) {
                    const r = setUserLogin(u.id, v);
                    if (!r.ok) alert(r.error);
                    else e.target.value = v;
                  } else e.target.value = u.email;
                }}
              />
            </label>
            <label className="text-xs text-[#757575]">
              Новый PIN
              <input
                className="mt-1"
                placeholder="••••"
                inputMode="numeric"
                maxLength={4}
                onBlur={(e) => {
                  const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                  if (!v) return;
                  const r = setUserPin(u.id, v);
                  if (!r.ok) alert(r.error);
                  else e.target.value = "";
                }}
              />
            </label>
          </div>
          <label className="text-xs text-[#757575] mt-2 block">Руководитель (видит задачи этого сотрудника)</label>
          <select
            className="mt-1 mb-2"
            value={u.managerId || ""}
            onChange={(e) => setManager(u.id, e.target.value || null)}
          >
            <option value="">— нет —</option>
            {users.filter((m) => m.id !== u.id).map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
          <div className="text-xs text-[#757575] mt-1">Доски</div>
          <div className="mt-2 flex flex-wrap gap-2">
            {zones.map((z) => {
              const on = (u.boardZones ?? []).includes(z.slug);
              return (
                <button
                  key={z.slug}
                  className={`pill px-3 py-1.5 text-sm ${on ? "bg-black text-white" : "bg-gray-100"}`}
                  onClick={() => {
                    const next = on ? (u.boardZones ?? []).filter((x) => x !== z.slug) : [...(u.boardZones ?? []), z.slug];
                    setBoardZones(u.id, next);
                  }}
                >
                  {z.name}
                </button>
              );
            })}
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {PERMS.map((p) => {
              const on = u.permissions.includes(p.id);
              return (
                <button
                  key={p.id}
                  className={`pill px-3 py-1.5 text-sm ${on ? "bg-black text-white" : "bg-gray-100"}`}
                  onClick={() => {
                    const next = on ? u.permissions.filter((x) => x !== p.id) : [...u.permissions, p.id];
                    grant(u.id, next);
                  }}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
