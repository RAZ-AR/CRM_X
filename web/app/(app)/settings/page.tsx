"use client";

import { FormEvent } from "react";
import { useStore } from "@/lib/store";
import { canManagePeople } from "@/lib/access";
import { type Permission, type ZoneSlug } from "@/lib/types";

const PERMS: { id: Permission; label: string }[] = [
  { id: "manage_users", label: "Управлять командой" },
  { id: "zone_page", label: "Страница зоны" },
  { id: "zone_team_tasks", label: "Задачи команды" },
  { id: "wiki", label: "Wiki" },
  { id: "contacts", label: "Контакты" },
];

export default function SettingsPage() {
  const { current, users, zones, grant, addUser, setBoardZones, setManager } = useStore();
  if (!current) return null;
  if (!canManagePeople(current)) return <div className="card p-6">Только Owner и Armen.</div>;

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addUser({
      name: String(fd.get("name")),
      email: String(fd.get("email")),
      title: String(fd.get("title")),
      zone: fd.get("zone") as ZoneSlug,
      managerId: String(fd.get("managerId") || current!.id),
    });
    e.currentTarget.reset();
  }

  return (
    <div className="space-y-3 max-w-3xl">
      <h1 className="text-xl font-semibold">Команда и доступы к доскам</h1>
      <p className="text-sm text-[#757575]">
        Owner и Armen назначают роли и вручную открывают доски WAFL / Kitchen / CAFE / COMX.
      </p>
      <form onSubmit={onAdd} className="card p-5 grid sm:grid-cols-2 gap-2">
        <div className="sm:col-span-2 font-medium">Добавить сотрудника</div>
        <input name="name" required placeholder="Имя" />
        <input name="email" required placeholder="логин (например 1010)" />
        <input name="title" required placeholder="Должность" />
        <select name="zone" required>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <select name="managerId" defaultValue={current.id} className="sm:col-span-2">
          {users.map((m) => (
            <option key={m.id} value={m.id}>Руководитель: {m.name}</option>
          ))}
        </select>
        <p className="text-xs text-gray-400 sm:col-span-2">Пароль = логин. Доски можно включить ниже.</p>
        <button className="pill bg-black text-white px-4 py-2 sm:col-span-2">Создать</button>
      </form>
      {users.filter((u) => u.role === "employee").map((u) => (
        <div key={u.id} className="card p-5">
          <div className="font-medium">{u.name} · {u.title} · логин {u.email}</div>
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
