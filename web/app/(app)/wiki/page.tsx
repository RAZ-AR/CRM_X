"use client";

import { FormEvent, useEffect, useState } from "react";
import { BookOpen, CircleHelp } from "lucide-react";
import { useStore } from "@/lib/store";
import { canSeeWiki, hasPerm, isCpo } from "@/lib/access";
import type { WikiPage, ZoneSlug } from "@/lib/types";
import { HelpIndex, OnboardingGuide } from "@/components/Help";
import { ONBOARDING } from "@/lib/help";

/** Встроенные страницы: онбординг и справка видны всем, даже без доступа к Wiki. */
const BUILTIN = [
  { id: "onboarding", title: ONBOARDING.title, icon: <BookOpen size={15} />, render: () => <OnboardingGuide /> },
  { id: "help", title: "Справка / FAQ по разделам", icon: <CircleHelp size={15} />, render: () => <HelpIndex /> },
];

export default function WikiPageView() {
  const { current, wiki, zones, addWiki } = useStore();
  const [open, setOpen] = useState<string>(() => (typeof window === "undefined" ? "" : new URLSearchParams(window.location.search).get("page") || "") || "onboarding");
  // Ссылка «Вся справка» из панели «?» ведёт на нужный раздел: /wiki?page=help#help-kanban.
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) document.getElementById(id)?.scrollIntoView({ block: "start" });
  }, []);
  if (!current) return null;
  const full = isCpo(current) || hasPerm(current, "wiki");
  const pages = full ? wiki.filter((w) => canSeeWiki(current, w)) : [];
  const builtin = BUILTIN.find((b) => b.id === open);
  const page = builtin ? null : pages.find((p) => p.id === open) ?? null;
  const shown = builtin ?? (page ? null : BUILTIN[0]);

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
        <h1 className="page-title m-0 px-1 mb-3">Wiki</h1>
        {BUILTIN.map((b) => (
          <button
            key={b.id}
            onClick={() => setOpen(b.id)}
            className={`w-full text-left rounded-2xl px-3 py-2 text-sm flex items-center gap-2 ${shown?.id === b.id ? "bg-black text-white" : "bg-[#F3F2EE]"}`}
          >
            {b.icon}
            {b.title}
          </button>
        ))}
        {pages.length > 0 && <div className="cap px-1 pt-2">Страницы</div>}
        {pages.map((p) => (
          <button
            key={p.id}
            onClick={() => setOpen(p.id)}
            className={`w-full text-left rounded-2xl px-3 py-2 text-sm ${page?.id === p.id ? "bg-black text-white" : "bg-[#F3F2EE]"}`}
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
      <div className="lg:col-span-8 card p-5 md:p-6 min-w-0">
        {shown ? (
          <>
            <h2 className="text-2xl font-semibold mt-0 mb-4">{shown.title}</h2>
            {shown.render()}
          </>
        ) : page ? (
          <>
            <h2 className="text-2xl font-semibold">{page.title}</h2>
            <p className="mt-4 whitespace-pre-wrap text-gray-700">{page.body}</p>
          </>
        ) : null}
      </div>
    </div>
  );
}
