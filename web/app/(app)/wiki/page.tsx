"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeWiki, hasPerm, isCpo } from "@/lib/access";
import type { WikiPage, ZoneSlug } from "@/lib/types";

export default function WikiPageView() {
  const { current, wiki, zones, addWiki } = useStore();
  const [open, setOpen] = useState<string | null>(null);
  if (!current) return null;
  if (!isCpo(current) && !hasPerm(current, "wiki")) {
    return <div className="card p-6">Wiki закрыта.</div>;
  }
  const pages = wiki.filter((w) => canSeeWiki(current, w));
  const page = pages.find((p) => p.id === open) ?? pages[0];

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    addWiki({
      title: String(fd.get("title")),
      body: String(fd.get("body")),
      zone: (fd.get("zone") as ZoneSlug | "all") || "all",
      visibility: (fd.get("visibility") as WikiPage["visibility"]) || "zone",
    });
    e.currentTarget.reset();
  }

  return (
    <div className="grid gap-3 lg:grid-cols-12">
      <div className="lg:col-span-4 card p-4 space-y-2">
        <h1 className="font-semibold px-1 mb-2">Wiki</h1>
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p.id)}
            className={`w-full text-left rounded-2xl px-3 py-2 text-sm ${page?.id === p.id ? "bg-amber-100" : "bg-gray-50"}`}
          >
            {p.title}
          </button>
        ))}
        {isCpo(current) && (
          <form onSubmit={onSubmit} className="pt-3 space-y-2 border-t border-gray-100">
            <input name="title" required placeholder="Заголовок" className="w-full" />
            <textarea name="body" required placeholder="Текст" className="w-full" />
            <select name="zone" className="w-full">
              <option value="all">Все зоны</option>
              {zones.map((z) => (
                <option key={z.slug} value={z.slug}>{z.name}</option>
              ))}
            </select>
            <select name="visibility" className="w-full">
              <option value="staff">Все сотрудники</option>
              <option value="zone">Только зона</option>
              <option value="cpo">Только CPO</option>
            </select>
            <button className="pill bg-black text-white px-4 py-2 text-sm">Добавить</button>
          </form>
        )}
      </div>
      <div className="lg:col-span-8 card p-6">
        {page ? (
          <>
            <h2 className="text-2xl font-semibold">{page.title}</h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700">{page.body}</p>
          </>
        ) : (
          <p className="text-gray-400">Нет страниц</p>
        )}
      </div>
    </div>
  );
}
