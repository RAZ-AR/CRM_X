"use client";

import { FormEvent, useState } from "react";
import { useStore } from "@/lib/store";
import { isCpo } from "@/lib/access";
import { filesToAttachments } from "@/lib/files";
import type { Priority, ZoneSlug } from "@/lib/types";

export function AddTaskModal({
  lockZone,
  onClose,
}: {
  lockZone?: ZoneSlug;
  onClose: () => void;
}) {
  const { current, zones, users, addTask, addComment } = useStore();
  const [busy, setBusy] = useState(false);
  if (!current) return null;
  const cpo = isCpo(current);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    const fd = new FormData(e.currentTarget);
    const zone = (lockZone || (fd.get("zone") as ZoneSlug) || current!.zone || "wafl") as ZoneSlug;
    const files = (e.currentTarget.elements.namedItem("files") as HTMLInputElement)?.files;
    const attachments = files?.length ? await filesToAttachments(files) : [];
    const id = addTask({
      title: String(fd.get("title")),
      description: String(fd.get("description") || ""),
      zone,
      assigneeId: String(fd.get("assignee") || current!.id),
      authorId: current!.id,
      participantIds: [],
      startDate: String(fd.get("startDate")),
      due: String(fd.get("due")),
      priority: (fd.get("priority") as Priority) || "medium",
      status: "todo",
      weight: 1,
      criticalPath: false,
      result: String(fd.get("result") || ""),
      attachments,
      code: "",
      wave: "",
      workstream: "",
      dependsOn: [],
      blockReason: "",
      zones: [zone],
    }) as unknown as string;
    const comment = String(fd.get("comment") || "").trim();
    if (comment && id) addComment(id, comment);
    setBusy(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-center p-4" onClick={onClose}>
      <form
        onSubmit={onSubmit}
        onClick={(e) => e.stopPropagation()}
        className="card w-full max-w-lg p-6 space-y-3 max-h-[90vh] overflow-y-auto"
      >
        <h2 className="text-lg font-semibold">Новая задача → бэклог</h2>
        <p className="text-xs text-gray-400">Статус: Не начато. {lockZone ? `Проект: ${lockZone}` : "Выбери проект."}</p>
        <input name="title" required placeholder="Название" className="w-full" />
        {!lockZone && (
          <select name="zone" defaultValue={current.zone ?? "wafl"} className="w-full" required>
            {zones.map((z) => (
              <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
            ))}
          </select>
        )}
        <div className="grid grid-cols-2 gap-2">
          <label className="text-xs text-gray-500">Начало
            <input name="startDate" type="date" required className="w-full mt-1" />
          </label>
          <label className="text-xs text-gray-500">Конец
            <input name="due" type="date" required className="w-full mt-1" />
          </label>
        </div>
        <select name="priority" className="w-full" defaultValue="medium">
          <option value="low">Срочность: низкая</option>
          <option value="medium">Срочность: средняя</option>
          <option value="high">Срочность: высокая</option>
          <option value="critical">Срочность: critical</option>
        </select>
        <select name="assignee" className="w-full" defaultValue={current.id}>
          {(cpo ? users : users.filter((u) => u.id === current.id || u.zone === current.zone)).map((u) => (
            <option key={u.id} value={u.id}>{u.name} — исполнитель</option>
          ))}
        </select>
        <textarea name="description" placeholder="Описание" className="w-full" />
        <textarea name="result" placeholder="Готово когда… (критерий закрытия)" className="w-full" />
        <textarea name="comment" placeholder="Комментарий к задаче" className="w-full" />
        <label className="text-xs text-gray-500 block">
          Файл или фото
          <input name="files" type="file" accept="image/*,.pdf,.doc,.docx" multiple className="mt-1 block w-full text-sm" />
        </label>
        <div className="flex gap-2 justify-end">
          <button type="button" className="pill px-4 py-2 bg-gray-100" onClick={onClose}>Отмена</button>
          <button disabled={busy} className="pill bg-black text-white px-4 py-2">{busy ? "…" : "В бэклог"}</button>
        </div>
      </form>
    </div>
  );
}
