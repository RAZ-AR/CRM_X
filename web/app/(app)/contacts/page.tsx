"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeContact, hasPerm, isCpo } from "@/lib/access";
import { displayPhone, telHref, tgHref, waHref } from "@/lib/links";
import type { Contact, ZoneSlug } from "@/lib/types";

export default function ContactsPage() {
  const { current, contacts, zones, addContact, updateContact, deleteContact } = useStore();
  const [editId, setEditId] = useState<string | null>(null);
  if (!current) return null;
  if (!isCpo(current) && !hasPerm(current, "contacts")) {
    return <div className="card p-6">Контакты закрыты.</div>;
  }
  const list = contacts.filter((c) => canSeeContact(current, c));
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
      <h1 className="text-xl font-semibold px-1">Контакты</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {list.map((c) =>
          editId === c.id ? (
            <form key={c.id} className="card p-5 grid gap-2" onSubmit={(e) => onSave(e, c.id)}>
              <Fields c={c} zones={zones} />
              <div className="flex gap-2">
                <button className="pill bg-black text-white px-3 py-1 text-sm">Сохранить</button>
                <button type="button" className="text-sm" onClick={() => setEditId(null)}>Отмена</button>
              </div>
            </form>
          ) : (
            <div key={c.id} className="card p-5">
              <div className="text-xs text-gray-400 uppercase">{c.kind}</div>
              <div className="font-semibold text-lg mt-1">{c.name}</div>
              <div className="text-sm text-gray-500">{c.title}{c.company ? ` · ${c.company}` : ""}</div>
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
          <div className="sm:col-span-2 font-medium">Новый контакт</div>
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
    kind: (fd.get("kind") as Contact["kind"]) || "vendor",
  };
}

function Fields({ c, zones }: { c?: Contact; zones: { slug: string; name: string }[] }) {
  return (
    <>
      <input name="name" required placeholder="Имя" defaultValue={c?.name} />
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
      <select name="kind" defaultValue={c?.kind ?? "vendor"}>
        <option value="vendor">Поставщик</option>
        <option value="partner">Партнёр</option>
        <option value="staff">Сотрудник</option>
      </select>
    </>
  );
}
