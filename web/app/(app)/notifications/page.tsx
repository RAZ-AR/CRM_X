"use client";

import { useStore } from "@/lib/store";
import { noticeVisible } from "@/lib/emoji";

const KIND: Record<string, string> = {
  task_new: "Задача",
  status: "Статус",
  comment: "Комментарий",
  deadline: "Срок",
  broadcast: "Рассылка",
};

export default function NotificationsPage() {
  const { current, notices, markRead, markAllRead, setPreviewId } = useStore();
  if (!current) return null;
  const mine = (notices ?? []).filter((n) => n.userId === current.id && noticeVisible(n));
  const fresh = mine.filter((n) => !n.read);
  const old = mine.filter((n) => n.read);

  function open(n: (typeof mine)[0]) {
    markRead(n.id);
    if (n.taskId) setPreviewId(n.taskId);
  }

  return (
    <div className="max-w-2xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="page-title m-0">Уведомления</h1>
        <button className="text-sm text-[#6F6E69]" onClick={markAllRead}>
          Прочитать все
        </button>
      </div>
      <section>
        <h2 className="text-sm font-semibold mb-2">Новые</h2>
        {fresh.length === 0 && <p className="text-sm text-[#6F6E69]">Нет новых</p>}
        <div className="space-y-2">
          {fresh.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => open(n)}
              className="w-full text-left rounded-2xl px-4 py-3 text-sm bg-[#FFF8C5] border border-black/5"
            >
              <span className="pill bg-black text-white text-[10px] px-2 py-0.5 mr-2">новое</span>
              <span className="text-[10px] text-[#6F6E69]">{KIND[n.kind || "task_new"]}</span>
              <div className="mt-1 font-medium">{n.text}</div>
              <div className="text-xs mt-1 text-[#6F6E69]">{new Date(n.createdAt).toLocaleString("ru-RU")}</div>
            </button>
          ))}
        </div>
      </section>
      <section>
        <h2 className="text-sm font-semibold mb-2 text-[#6F6E69]">Прочитанные</h2>
        <p className="text-[11px] text-[#6F6E69] mb-2">Исчезают через 4 дня после открытия</p>
        {old.length === 0 && <p className="text-sm text-[#6F6E69]">Пусто</p>}
        <div className="space-y-2">
          {old.map((n) => (
            <button
              key={n.id}
              type="button"
              onClick={() => open(n)}
              className="w-full text-left rounded-2xl px-4 py-3 text-sm bg-[#F3F2EE] text-[#6F6E69]"
            >
              <span className="text-[10px]">{KIND[n.kind || "task_new"]}</span>
              <div className="mt-1">{n.text}</div>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
