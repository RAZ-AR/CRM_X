"use client";

import { FormEvent, useMemo, useState } from "react";
import { ChevronDown, Plus, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { ACCESS_META, ACCESS_ORDER, accessOf, canManagePeople, isCpo, managersOf, projectsOf } from "@/lib/access";
import { STREAMS, type Access, type Permission, type User, type Zone, type ZoneSlug } from "@/lib/types";
import { unusedFourDigit } from "@/lib/pin";
import { PageHeader } from "@/components/PageHeader";

const PERMS: { id: Permission; label: string }[] = [
  { id: "manage_users", label: "Управлять командой" },
  { id: "zone_page", label: "Страница проекта" },
  { id: "zone_team_tasks", label: "Задачи команды" },
  { id: "zone_team", label: "Команда проекта" },
  { id: "wiki", label: "Wiki" },
  { id: "contacts", label: "Контрагенты" },
  { id: "finance", label: "Деньги" },
];

export default function SettingsPage() {
  const { current, users, zones, grant, setStreams, addUser, setBoardZones, setManagers, setAccess, setUserPin, setUserLogin } = useStore();
  const taken = useMemo(() => new Set(users.map((u) => u.email)), [users]);
  const [adding, setAdding] = useState(false);
  const [access, setNewAccess] = useState<Access>("staff");
  const [projects, setProjects] = useState<ZoneSlug[]>([]);
  const [managerIds, setManagerIds] = useState<string[]>([]);
  const [login, setLogin] = useState("");
  const [pin, setPin] = useState("");
  const [err, setErr] = useState("");
  const [created, setCreated] = useState<{ name: string; login: string; pin: string } | null>(null);
  const [copied, setCopied] = useState(false);

  if (!current) return null;
  if (!canManagePeople(current)) return <div className="card p-6">Только Owner.</div>;
  const owner = isCpo(current);

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErr("");
    setCopied(false);
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name")).trim();
    if (access !== "owner" && access !== "staff" && !projects.length) {
      setErr("Выберите хотя бы один проект: от него зависит, какие задачи увидит человек");
      return;
    }
    const res = addUser({
      name,
      email: login,
      password: pin,
      title: String(fd.get("title")).trim() || ACCESS_META[access].label,
      access,
      projects: access === "owner" ? zones.map((z) => z.slug) : projects,
      managerIds,
    });
    if (!res.ok) {
      setErr(res.error);
      return;
    }
    setCreated({ name, login, pin });
    setLogin("");
    setPin("");
    setProjects([]);
    setManagerIds([]);
    setNewAccess("staff");
    setAdding(false);
    e.currentTarget.reset();
  }

  async function copyCreds(name: string, l: string, p: string) {
    try {
      await navigator.clipboard.writeText(`${name}\nлогин ${l}\nпароль ${p}`);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const people = [...users].sort((a, b) => ACCESS_ORDER.indexOf(accessOf(a)) - ACCESS_ORDER.indexOf(accessOf(b)) || a.name.localeCompare(b.name));

  return (
    <div className="space-y-4 max-w-3xl">
      <PageHeader eyebrow={`${users.length} в команде`} title="Команда и доступы">
        {!adding && (
          <button type="button" className="pill bg-[var(--ink)] text-white px-4 py-2 text-sm inline-flex items-center gap-1.5" onClick={() => setAdding(true)}>
            <Plus size={16} /> Добавить человека
          </button>
        )}
      </PageHeader>

      {adding && (
        <form onSubmit={onAdd} className="card p-5 md:p-6 flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2 className="m-0 text-[17px] font-semibold">Новый человек в команде</h2>
            <button type="button" aria-label="Закрыть" className="p-1 text-[var(--muted)]" onClick={() => setAdding(false)}>
              <X size={18} />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 gap-2">
            <input name="name" required placeholder="Имя" />
            <input name="title" placeholder="Должность (необязательно)" />
          </div>

          <Field label="Роль">
            <RolePicker value={access} onChange={setNewAccess} canOwner={owner} />
          </Field>

          {access === "owner" ? (
            <p className="cap m-0">Owner видит все проекты.</p>
          ) : (
            <Field label="Проекты" hint="можно несколько">
              <ProjectChips zones={zones} value={projects} onChange={setProjects} />
            </Field>
          )}

          <Field label="Руководители" hint="можно не выбирать или выбрать нескольких">
            <PeopleChips users={users} value={managerIds} onChange={setManagerIds} />
          </Field>

          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="cap">Логин · обычно имя</label>
                <button
                  type="button"
                  className="cap underline"
                  onClick={(e) => setLogin(String(new FormData(e.currentTarget.form ?? undefined).get("name") || "").trim().split(/\s+/)[0] || "")}
                >
                  как имя
                </button>
              </div>
              <input className="w-full" maxLength={32} required placeholder="например Karina" value={login} onChange={(e) => setLogin(e.target.value.replace(/\s/g, ""))} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="cap">Пароль · от 4 символов</label>
                <button type="button" className="cap underline" onClick={() => setPin(unusedFourDigit(taken, [login]))}>
                  подобрать
                </button>
              </div>
              <input className="w-full" minLength={4} maxLength={64} required placeholder="пароль для входа" value={pin} onChange={(e) => setPin(e.target.value)} />
            </div>
          </div>
          {err && <p className="text-[var(--red)] text-sm m-0">{err}</p>}
          <button className="pill bg-[var(--ink)] text-white px-4 py-2.5">Добавить и выдать доступ</button>
        </form>
      )}

      {created && (
        <div className="card p-5 !bg-[var(--ink)] text-white">
          <div className="text-sm opacity-70 mb-1">Отдайте человеку</div>
          <div className="text-lg font-medium">{created.name}</div>
          <div className="mt-2 font-mono text-xl tracking-widest">логин {created.login} · пароль {created.pin}</div>
          <button type="button" className="mt-3 pill bg-white text-black px-4 py-2 text-sm" onClick={() => copyCreds(created.name, created.login, created.pin)}>
            {copied ? "Скопировано" : "Скопировать"}
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {people.map((u) => (
          <Person
            key={u.id}
            u={u}
            me={current}
            users={users}
            zones={zones}
            locked={u.id === current.id || (!owner && isCpo(u))}
            canOwner={owner}
            actions={{ grant, setStreams, setBoardZones, setManagers, setAccess, setUserPin, setUserLogin }}
          />
        ))}
      </div>
    </div>
  );
}

type Actions = {
  grant: (id: string, p: Permission[]) => void;
  setStreams: (id: string, s: NonNullable<User["streams"]>) => void;
  setBoardZones: (id: string, z: ZoneSlug[]) => void;
  setManagers: (id: string, ids: string[]) => void;
  setAccess: (id: string, a: Access) => void;
  setUserPin: (id: string, pin: string) => { ok: true } | { ok: false; error: string };
  setUserLogin: (id: string, login: string) => { ok: true } | { ok: false; error: string };
};

function Person({ u, me, users, zones, locked, canOwner, actions }: { u: User; me: User; users: User[]; zones: Zone[]; locked: boolean; canOwner: boolean; actions: Actions }) {
  const [open, setOpen] = useState(false);
  const a = accessOf(u);
  const mine = projectsOf(u);
  const bosses = managersOf(u)
    .map((id) => users.find((x) => x.id === id)?.name)
    .filter(Boolean);
  const editable = !locked;

  return (
    <div className="card">
      <button type="button" className="w-full text-left p-4 md:p-5 flex items-center gap-3" onClick={() => setOpen(!open)} aria-expanded={open}>
        <span className="h-10 w-10 rounded-full bg-[var(--soft)] grid place-items-center font-semibold shrink-0">{u.avatar}</span>
        <span className="flex-1 min-w-0 flex flex-col gap-1">
          <span className="flex items-center gap-2 min-w-0">
            <span className="font-semibold truncate">{u.name}</span>
            <RoleBadge access={a} />
            {u.id === me.id && <span className="cap">это вы</span>}
          </span>
          <span className="cap truncate">
            {u.title}
            {a !== "owner" && ` · ${mine.length ? mine.map((z) => zones.find((x) => x.slug === z)?.name ?? z).join(", ") : "без проектов"}`}
            {bosses.length ? ` · руководит: ${bosses.join(", ")}` : ""}
          </span>
        </span>
        <ChevronDown size={18} className={`shrink-0 text-[var(--muted)] transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="px-4 md:px-5 pb-5 flex flex-col gap-5 border-t border-[var(--line)] pt-4">
          {!editable && <p className="cap m-0">{u.id === me.id ? "Свою роль поменять нельзя — это делает другой Owner." : "Учётку Owner меняет только Owner."}</p>}

          <Field label="Роль">
            <RolePicker value={a} onChange={(v) => actions.setAccess(u.id, v)} canOwner={canOwner} disabled={!editable} />
          </Field>

          {a !== "owner" && (
            <Field label="Проекты" hint="можно несколько">
              <ProjectChips zones={zones} value={mine} onChange={(z) => actions.setBoardZones(u.id, z)} disabled={!editable} />
            </Field>
          )}

          <Field label="Руководители" hint="видят задачи человека; можно не выбирать или выбрать нескольких">
            <PeopleChips users={users.filter((x) => x.id !== u.id)} value={managersOf(u)} onChange={(ids) => actions.setManagers(u.id, ids)} disabled={!editable} />
          </Field>

          {editable && (
            <>
              <div className="grid sm:grid-cols-2 gap-2">
                <label className="cap flex flex-col gap-1">
                  Логин
                  <input
                    className="w-full"
                    defaultValue={u.email}
                    maxLength={32}
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (v && v !== u.email) {
                        const r = actions.setUserLogin(u.id, v);
                        if (!r.ok) alert(r.error);
                        else e.target.value = v;
                      } else e.target.value = u.email;
                    }}
                  />
                </label>
                <label className="cap flex flex-col gap-1">
                  Новый пароль
                  <input
                    className="w-full"
                    placeholder="••••"
                    maxLength={64}
                    onBlur={(e) => {
                      const v = e.target.value.trim();
                      if (!v) return;
                      const r = actions.setUserPin(u.id, v);
                      if (!r.ok) alert(r.error);
                      else e.target.value = "";
                    }}
                  />
                </label>
              </div>

              {a !== "owner" && (
                <>
                  <Field label="Дополнительные права">
                    <div className="flex flex-wrap gap-2">
                      {PERMS.map((p) => {
                        const on = u.permissions.includes(p.id);
                        return (
                          <Chip key={p.id} on={on} onClick={() => actions.grant(u.id, on ? u.permissions.filter((x) => x !== p.id) : [...u.permissions, p.id])}>
                            {p.label}
                          </Chip>
                        );
                      })}
                    </div>
                  </Field>
                  <Field label="Потоки целиком" hint="все задачи потока во всех проектах, может вести статус">
                    <div className="flex flex-wrap gap-2">
                      {STREAMS.map((st) => {
                        const on = (u.streams ?? []).includes(st);
                        return (
                          <Chip key={st} on={on} onClick={() => actions.setStreams(u.id, on ? (u.streams ?? []).filter((x) => x !== st) : [...(u.streams ?? []), st])}>
                            {st}
                          </Chip>
                        );
                      })}
                    </div>
                  </Field>
                </>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[13px] font-medium">
        {label}
        {hint && <span className="cap font-normal"> · {hint}</span>}
      </span>
      {children}
    </div>
  );
}

function RoleBadge({ access }: { access: Access }) {
  const tone = access === "owner" ? "bg-[var(--ink)] text-white" : access === "manager" ? "bg-[#dbe8f8] text-[#1d5aa3]" : access === "marketer" ? "bg-[#fde3d6] text-[#b4461c]" : "bg-[var(--soft)] text-[var(--ink-2)]";
  return <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${tone}`}>{ACCESS_META[access].label}</span>;
}

function RolePicker({ value, onChange, canOwner, disabled }: { value: Access; onChange: (a: Access) => void; canOwner: boolean; disabled?: boolean }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" role="radiogroup">
      {ACCESS_ORDER.map((a) => {
        const on = value === a;
        const off = disabled || (a === "owner" && !canOwner);
        return (
          <button
            key={a}
            type="button"
            role="radio"
            aria-checked={on}
            disabled={off && !on}
            onClick={() => !off && !on && onChange(a)}
            className={`text-left rounded-xl border px-3.5 py-3 transition-colors ${on ? "border-[var(--ink)] bg-[var(--soft)]" : "border-[var(--line)] hover:border-[#d9d6ce]"} ${off && !on ? "opacity-40 cursor-not-allowed" : ""}`}
          >
            <span className="flex items-center gap-2">
              <span className={`h-3.5 w-3.5 rounded-full border-2 shrink-0 ${on ? "border-[var(--ink)] bg-[var(--ink)] shadow-[inset_0_0_0_2px_var(--soft)]" : "border-[#c8c6bf]"}`} />
              <span className="text-sm font-semibold">{ACCESS_META[a].label}</span>
            </span>
            <span className="cap block mt-1">{a === "owner" && !canOwner ? "Назначает только Owner" : ACCESS_META[a].hint}</span>
          </button>
        );
      })}
    </div>
  );
}

function ProjectChips({ zones, value, onChange, disabled }: { zones: Zone[]; value: ZoneSlug[]; onChange: (v: ZoneSlug[]) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      {zones.map((z) => {
        const on = value.includes(z.slug);
        return (
          <Chip key={z.slug} on={on} disabled={disabled} onClick={() => onChange(on ? value.filter((x) => x !== z.slug) : [...value, z.slug])}>
            {z.emoji} {z.name}
          </Chip>
        );
      })}
    </div>
  );
}

function PeopleChips({ users, value, onChange, disabled }: { users: User[]; value: string[]; onChange: (v: string[]) => void; disabled?: boolean }) {
  return (
    <div className="flex flex-wrap gap-2">
      <Chip on={value.length === 0} disabled={disabled} onClick={() => onChange([])}>
        Без руководителя
      </Chip>
      {users.map((m) => {
        const on = value.includes(m.id);
        return (
          <Chip key={m.id} on={on} disabled={disabled} onClick={() => onChange(on ? value.filter((x) => x !== m.id) : [...value, m.id])}>
            {m.name}
          </Chip>
        );
      })}
    </div>
  );
}

function Chip({ on, disabled, onClick, children }: { on: boolean; disabled?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      disabled={disabled}
      onClick={onClick}
      className={`pill px-3 py-1.5 text-sm border transition-colors ${on ? "bg-[var(--ink)] text-white border-[var(--ink)]" : "bg-[var(--card)] border-[var(--line)] text-[var(--ink-2)] hover:border-[#d9d6ce]"} disabled:opacity-60 disabled:cursor-default`}
    >
      {children}
    </button>
  );
}
