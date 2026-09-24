"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeContact, hasPerm, isCpo } from "@/lib/access";
import { displayPhone, telHref, tgHref, waHref } from "@/lib/links";
import { CONTACT_KINDS, CONTRACTOR_STATUS, type Contact, type ContractorStatus, type ZoneSlug } from "@/lib/types";
import { canSeeTask } from "@/lib/access";

export default function ContactsPage() {
  const { current, contacts, zones, tasks, users, addContact, updateContact, deleteContact, setPreviewId } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  const [kind, setKind] = useState<string>("all");
  const [q, setQ] = useState("");
  if (!current) return null;
  if (!isCpo(current) && !hasPerm(current, "contacts")) {
    return <div className="card p-6">Контакты закрыты.</div>;
  }
  const needle = q.trim().toLowerCase();
  const list = contacts
    .filter((c) => canSeeContact(current, c))
    .filter((c) => kind === "all" || c.kind === kind)
    .filter((c) => !needle || [c.name, c.company, c.specialty, c.title, c.notes].some((v) => (v || "").toLowerCase().includes(needle)));
  const linked = (id: string) => tasks.filter((t) => (t.contactIds ?? []).includes(id) && canSeeTask(current, t, users));
  const canEdit = isCpo(current) || hasPerm(current, "contacts");

  function onAdd(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    addContact(fromForm(new FormData(e.currentTarget)));
    e.currentTarget.reset();
  }

  function onSave(e: FormEvent<HTMLFormElement>, id: string) {
    e.preventDefault();
    updateContact(id, fromForm(new FormData(e.currentTarget)));
    setEditId(null);
  }

  return (
    <div className="space-y-3">
      <div className="card p-4 flex flex-wrap items-center gap-2">
        <h1 className="text-xl font-semibold mr-auto">Контрагенты и контакты</h1>
        <input className="text-sm" placeholder="Поиск: имя, компания, специализация" value={q} onChange={(e) => setQ(e.target.value)} />
      </div>
      <div className="flex flex-wrap gap-1.5 px-1">
        {[{ id: "all", label: "Все" }, ...CONTACT_KINDS].map((k) => (
          <button key={k.id} type="button" onClick={() => setKind(k.id)} className={`pill px-3 py-1 text-sm ${kind === k.id ? "bg-black text-white" : "bg-white border border-black/10"}`}>
            {k.label} · {contacts.filter((c) => canSeeContact(current, c) && (k.id === "all" || c.kind === k.id)).length}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((c) =>
          editId === c.id ? (
            <form key={c.id} className="card p-5 grid sm:grid-cols-2 gap-2" onSubmit={(e) => onSave(e, c.id)}>
              <Fields c={c} zones={zones} />
              <div className="flex gap-2">
                <button className="pill bg-black text-white px-3 py-1 text-sm">Сохранить</button>
                <button type="button" className="text-sm" onClick={() => setEditId(null)}>Отмена</button>
              </div>
            </form>
          ) : (
            <div key={c.id} className="card p-5">
              <div className="flex items-center gap-2">
                <span className="text-xs text-gray-400 uppercase flex-1">{CONTACT_KINDS.find((k) => k.id === c.kind)?.label ?? c.kind}</span>
                {c.status && c.kind !== "staff" && (
                  <span className="pill text-[11px] px-2 py-0.5" style={{ background: CONTRACTOR_STATUS[c.status].color }}>{CONTRACTOR_STATUS[c.status].label}</span>
                )}
              </div>
              <div className="font-semibold text-lg mt-1">{c.name}</div>
              <div className="text-sm text-gray-500">{[c.specialty, c.title, c.company].filter(Boolean).join(" · ")}</div>
              <div className="mt-3 space-y-1 text-sm">
                {c.phone && (
                  <a className="block text-[#2bb673] underline" href={telHref(c.phone)}>
                    📞 {displayPhone(c.phone)}
                  </a>
                )}
                {c.email && (
                  <a className="block text-[#2383e2] underline" href={`mailto:${c.email}`}>
                    ✉ {c.email}
                  </a>
                )}
                {c.telegram && (
                  <a className="block text-[#229ED9] underline" href={tgHref(c.telegram)} target="_blank" rel="noreferrer">
                    Telegram @{c.telegram.replace(/^@/, "")}
                  </a>
                )}
                {c.whatsapp && (
                  <a className="block text-[#25D366] underline" href={waHref(c.whatsapp)} target="_blank" rel="noreferrer">
                    WhatsApp {displayPhone(c.whatsapp)}
                  </a>
                )}
              </div>
              {c.notes && <p className="mt-2 text-sm text-[#555] whitespace-pre-wrap">{c.notes}</p>}
              {linked(c.id).length > 0 && (
                <div className="mt-3">
                  <div className="text-xs text-[#9a9aa0] mb-1">Задачи · {linked(c.id).length}</div>
                  <div className="space-y-1">
                    {linked(c.id).map((t) => (
                      <button key={t.id} type="button" onClick={() => setPreviewId(t.id)} className="block w-full text-left text-sm rounded-xl bg-[#f4f4f6] px-2 py-1 truncate">
                        <span className="text-[11px] text-[#9a9aa0]">{t.code}</span> {t.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              {canEdit && (
                <div className="mt-3 flex gap-3 text-sm">
                  <button className="underline" onClick={() => setEditId(c.id)}>Править</button>
                  {isCpo(current) && (
                    <button className="text-red-500" onClick={() => deleteContact(c.id)}>Удалить</button>
                  )}
                </div>
              )}
            </div>
          ),
        )}
      </div>
      {canEdit && (
        <form onSubmit={onAdd} className="card p-5 grid sm:grid-cols-2 gap-2 max-w-3xl">
          <div className="sm:col-span-2 font-medium">Новый контрагент или контакт</div>
          <Fields zones={zones} />
          <button className="pill bg-black text-white px-4 py-2 sm:col-span-2">Добавить</button>
        </form>
      )}
    </div>
  );
}

function fromForm(fd: FormData): Omit<Contact, "id"> {
  let phone = String(fd.get("phone") || "").trim();
  let wa = String(fd.get("whatsapp") || "").trim();
  if (phone && !phone.trim().startsWith("+") && /^\d/.test(phone)) phone = "+" + phone.replace(/\s/g, "");
  if (wa && !wa.includes("+") && /^\d/.test(wa.replace(/\s/g, ""))) wa = "+" + wa.replace(/\s/g, "");
  return {
    name: String(fd.get("name")),
    company: String(fd.get("company") || ""),
    title: String(fd.get("title") || ""),
    phone,
    email: String(fd.get("email") || ""),
    telegram: String(fd.get("telegram") || "").replace(/^@/, ""),
    whatsapp: wa,
    zone: (fd.get("zone") as ZoneSlug | "all") || "all",
    kind: (fd.get("kind") as Contact["kind"]) || "contractor",
    specialty: String(fd.get("specialty") || ""),
    status: (fd.get("status") as ContractorStatus) || "lead",
    notes: String(fd.get("notes") || ""),
  };
}

function Fields({ c, zones }: { c?: Contact; zones: { slug: string; name: string }[] }) {
  return (
    <>
      <select name="kind" defaultValue={c?.kind === "vendor" ? "supplier" : c?.kind ?? "contractor"}>
        {CONTACT_KINDS.map((k) => (
          <option key={k.id} value={k.id}>{k.label}</option>
        ))}
      </select>
      <select name="status" defaultValue={c?.status ?? "lead"}>
        {(Object.keys(CONTRACTOR_STATUS) as ContractorStatus[]).map((st) => (
          <option key={st} value={st}>Статус: {CONTRACTOR_STATUS[st].label}</option>
        ))}
      </select>
      <input name="name" required placeholder="Имя или название" defaultValue={c?.name} />
      <input name="specialty" placeholder="Специализация: электрика, окна, упаковка…" defaultValue={c?.specialty} />
      <input name="company" placeholder="Компания" defaultValue={c?.company} />
      <input name="title" placeholder="Должность" defaultValue={c?.title} />
      <input name="phone" placeholder="Телефон +374..." defaultValue={c?.phone} />
      <input name="email" placeholder="Email" defaultValue={c?.email} />
      <input name="telegram" placeholder="Telegram ник (без @)" defaultValue={c?.telegram} />
      <input name="whatsapp" placeholder="WhatsApp номер целиком" defaultValue={c?.whatsapp} />
      <select name="zone" defaultValue={c?.zone ?? "all"}>
        <option value="all">Все проекты</option>
        {zones.map((z) => (
          <option key={z.slug} value={z.slug}>{z.name}</option>
        ))}
      </select>
      <textarea name="notes" placeholder="Заметки: условия, цены, сроки, кто рекомендовал" defaultValue={c?.notes} className="sm:col-span-2" />
    </>
  );
}
