"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { canSeeTask, isCpo, taskZones } from "@/lib/access";
import { todayYerevan } from "@/lib/dates";
import { agendaText, buildAgenda } from "@/lib/agenda";

/** Повестка планёрки: собирается сама из журнала, просрочек, блоков и сроков. */
export default function MeetingPage() {
  const state = useStore();
  const { current, tasks, users, zones, setPreviewId } = state;
  const [days, setDays] = useState(7);
  const [zone, setZone] = useState("all");
  const [note, setNote] = useState("");
  if (!current) return null;

  const today = todayYerevan();
  const list = tasks.filter((t) => canSeeTask(current, t, users) && (zone === "all" || taskZones(t).includes(zone)));
  const sections = buildAgenda(state, list, users, today, days, zone);
  const text = agendaText(sections, today);

  return (
    <div className="space-y-3 max-w-4xl">
      <div className="flex flex-wrap items-end gap-2 pb-1">
        <h1 className="page-title m-0 mr-auto">Планёрка</h1>
        <select className="text-sm" value={days} onChange={(e) => setDays(Number(e.target.value))}>
          <option value={7}>за 7 дней</option>
          <option value={14}>за 14 дней</option>
        </select>
        <select className="text-sm" value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all">Все проекты</option>
          {zones.map((z) => (
            <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
          ))}
        </select>
        <button
          type="button"
          className="pill bg-[#F3F2EE] px-3 py-2 text-sm"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setNote("Повестка скопирована");
            } catch {
              setNote("Не удалось скопировать");
            }
          }}
        >
          Скопировать
        </button>
        {isCpo(current) && (
          <button
            type="button"
            className="pill bg-black text-white px-3 py-2 text-sm"
            onClick={async () => {
              setNote("Отправляю…");
              try {
                const res = await fetch("/api/meeting/send", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  credentials: "same-origin",
                  body: JSON.stringify({ text }),
                });
                const r = await res.json();
                setNote(r.ok ? `Отправлено в Telegram: ${r.sent} чел.` : r.error || "Не получилось");
              } catch {
                setNote("Нет связи с сервером");
              }
            }}
          >
            Отправить команде в Telegram
          </button>
        )}
      </div>
      {note && <p className="text-sm text-[#6F6E69] px-1">{note}</p>}

      {sections.map((s) => (
        <section key={s.title} className="card p-4">
          <div className="font-semibold mb-2">
            {s.title} <span className="text-[#6F6E69] font-normal">· {s.items.length}</span>
          </div>
          {s.items.length === 0 ? (
            <p className="text-sm text-[#6F6E69]">Нет</p>
          ) : (
            <div className="space-y-1">
              {s.items.map((i, n) => (
                <button
                  key={n}
                  type="button"
                  disabled={!i.task}
                  onClick={() => i.task && setPreviewId(i.task.id)}
                  className="w-full text-left rounded-xl bg-[#F3F2EE] px-3 py-1.5 text-sm flex gap-2 disabled:cursor-default"
                >
                  {i.task?.code && <span className="text-[11px] text-[#6F6E69] w-14 shrink-0 pt-0.5">{i.task.code}</span>}
                  <span className="flex-1 min-w-0">{i.text}</span>
                  {i.who && <span className="text-xs text-[#6F6E69] shrink-0">{i.who}</span>}
                </button>
              ))}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}
