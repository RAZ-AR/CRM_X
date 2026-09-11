"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { canEditTask, canSeeTask, columns, isOverdue, statusMeta, taskZones } from "@/lib/access";
import { filesToAttachments } from "@/lib/files";
import type { Priority } from "@/lib/types";
import { formatDate } from "@/lib/dates";
import { Flame, X } from "lucide-react";
import { EMOJIS } from "@/lib/emoji";

export function TaskSheet({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose?: () => void;
}) {
  const {
    current, tasks, users, zones, comments, subtasks,
    updateTask, addComment, addSubtask, toggleSubtask, toggleReaction,
  } = useStore();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [sub, setSub] = useState("");
  const [pendingStatus, setPendingStatus] = useState<null | import("@/lib/types").TaskStatus>(null);
  if (!current) return null;
  const task = tasks.find((t) => t.id === taskId);
  if (!task || !canSeeTask(current, task, users)) {
    return (
      <div className="p-8">Нет доступа</div>
    );
  }
  const isAuthor = task.authorId === current.id;
  const canEdit = isAuthor || canEditTask(current, task);
  const comms = comments.filter((c) => c.taskId === task.id);
  const subs = subtasks.filter((s) => s.taskId === task.id);
  const author = users.find((u) => u.id === task.authorId);
  const assignee = users.find((u) => u.id === task.assigneeId);
  const zs = taskZones(task);
  const multi = zs.length > 1;
  const accent = multi ? "#9ca3af" : zones.find((z) => z.slug === zs[0])?.color ?? "#eee";
  const files = task.attachments ?? [];

  return (
    <div className="bg-white rounded-t-[24px] md:rounded-[28px] overflow-hidden max-h-[92dvh] flex flex-col shadow-2xl">
      <div className="h-3" style={{ background: accent }} />
      <div className="px-7 pt-5 pb-3 flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap gap-1.5 mb-2">
            {task.code && <span className="text-[11px] text-[#9a9aa0]">{task.code}</span>}
            {task.wave && <span className="pill bg-black text-white text-[10px] px-2 py-0.5">волна {task.wave}</span>}
            {zs.map((slug) => {
              const z = zones.find((x) => x.slug === slug);
              return (
                <span key={slug} className="pill text-[11px] px-2 py-0.5" style={{ background: multi ? "#e5e7eb" : z?.color }}>
                  {z?.emoji} {z?.name}
                </span>
              );
            })}
            {task.criticalPath && <span className="pill bg-[#fee2e2] text-[#b91c1c] text-[10px] px-2 py-0.5">critical path</span>}
          </div>
          {editing && canEdit ? (
            <input
              className="w-full text-2xl font-bold px-0"
              defaultValue={task.title}
              onBlur={(e) => e.target.value && updateTask(task.id, { title: e.target.value })}
            />
          ) : (
            <h1 className="text-2xl font-bold leading-tight flex items-start gap-2">
              {isOverdue(task) && <Flame className="text-[#e86a4a] shrink-0 mt-1" />}
              <span>{task.title}</span>
            </h1>
          )}
        </div>
        {canEdit && (
          <button
            className={`pill px-4 py-2 text-sm ${editing ? "bg-black text-white" : "bg-[#f4f4f6]"}`}
            onClick={() => setEditing((v) => !v)}
          >
            {editing ? "Готово" : "Редактировать"}
          </button>
        )}
        {onClose && (
          <button className="h-9 w-9 rounded-full bg-[#f4f4f6] grid place-items-center" onClick={onClose}>
            <X size={16} />
          </button>
        )}
      </div>

      <div className="px-7 pb-6 overflow-y-auto space-y-5">
        <div>
          <div className="text-xs text-[#9a9aa0] mb-2">Статус</div>
          <div className="flex flex-wrap gap-1.5">
            {columns.map((c) => {
              const on = (pendingStatus ?? task.status) === c;
              return (
              <button
                key={c}
                type="button"
                onClick={() => setPendingStatus(c === task.status ? null : c)}
                className={`pill px-3 py-1.5 text-xs ${on ? "bg-black text-white" : "bg-[#f4f4f6]"}`}
              >
                {statusMeta[c].emoji} {statusMeta[c].label}
              </button>
            );})}
          </div>
          {pendingStatus && pendingStatus !== task.status && (
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                className="pill bg-black text-white px-4 py-2 text-sm flex-1"
                onClick={() => {
                  updateTask(task.id, { status: pendingStatus });
                  setPendingStatus(null);
                  onClose?.();
                }}
              >
                Сохранить · {statusMeta[pendingStatus].label}
              </button>
              <button type="button" className="pill bg-[#f4f4f6] px-4 py-2 text-sm" onClick={() => setPendingStatus(null)}>
                Отмена
              </button>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Meta k="Исполнитель" v={assignee?.name ?? "—"} />
          <Meta k="Создал" v={author?.name ?? "—"} />
          <Meta k="Начало" v={formatDate(task.startDate)} />
          <Meta k="Конец" v={formatDate(task.due)} />
          <Meta k="Срочность" v={task.priority} />
          <Meta k="Поток" v={task.workstream || "—"} />
        </div>

        {editing && canEdit && (
          <div className="grid sm:grid-cols-2 gap-2">
            <select value={task.status} onChange={(e) => updateTask(task.id, { status: e.target.value as typeof task.status })}>
              {columns.map((c) => (
                <option key={c} value={c}>{statusMeta[c].label}</option>
              ))}
            </select>
            <select value={task.assigneeId} onChange={(e) => updateTask(task.id, { assigneeId: e.target.value })}>
              {users.map((u) => (
                <option key={u.id} value={u.id}>{u.name}</option>
              ))}
            </select>
            <input type="date" value={task.startDate || ""} onChange={(e) => updateTask(task.id, { startDate: e.target.value })} />
            <input type="date" value={task.due} onChange={(e) => updateTask(task.id, { due: e.target.value })} />
            <select value={task.priority} onChange={(e) => updateTask(task.id, { priority: e.target.value as Priority })}>
              <option value="low">низкая</option>
              <option value="medium">средняя</option>
              <option value="high">высокая</option>
              <option value="critical">critical</option>
            </select>
          </div>
        )}

        {!editing && (
          <p className="text-sm text-[#444] leading-relaxed whitespace-pre-wrap">{task.description || "Без описания"}</p>
        )}
        {editing && canEdit && (
          <textarea
            className="w-full min-h-24"
            defaultValue={task.description}
            onBlur={(e) => updateTask(task.id, { description: e.target.value })}
          />
        )}

        {(task.dependsOn ?? []).length > 0 && (
          <div>
            <div className="text-xs text-[#9a9aa0] mb-1">Ждёт</div>
            <div className="flex flex-wrap gap-2">
              {(task.dependsOn ?? []).map((code) => {
                const d = tasks.find((x) => x.code === code);
                return d ? (
                  <span key={code} className="pill bg-[#f4f4f6] px-3 py-1 text-xs">
                    {code} {d.status === "done" ? "✓" : "●"} {d.title}
                  </span>
                ) : (
                  <span key={code} className="text-xs">{code}</span>
                );
              })}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs text-[#9a9aa0] mb-2">Чеклист</div>
          {subs.map((s) => (
            <label key={s.id} className="flex items-center gap-2 py-1 text-sm">
              <input type="checkbox" checked={s.done} onChange={() => toggleSubtask(s.id)} />
              <span className={s.done ? "line-through text-[#9a9aa0]" : ""}>{s.title}</span>
            </label>
          ))}
          <form className="flex gap-2 mt-1" onSubmit={(e) => { e.preventDefault(); if (!sub.trim()) return; addSubtask(task.id, sub.trim()); setSub(""); }}>
            <input className="flex-1" value={sub} onChange={(e) => setSub(e.target.value)} placeholder="Шаг…" />
          </form>
        </div>

        {files.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {files.map((f) =>
              f.type.startsWith("image/") ? (
                <a key={f.id} href={f.dataUrl} target="_blank" rel="noreferrer">
                  <img src={f.dataUrl} alt="" className="h-16 w-16 object-cover rounded-xl" />
                </a>
              ) : (
                <a key={f.id} href={f.dataUrl} download={f.name} className="text-xs underline">{f.name}</a>
              ),
            )}
          </div>
        )}
        {editing && canEdit && (
          <input type="file" accept="image/*,.pdf" className="text-sm" onChange={async (e) => {
            if (!e.target.files?.length) return;
            const more = await filesToAttachments(e.target.files);
            updateTask(task.id, { attachments: [...files, ...more] });
          }} />
        )}

        <div className="border-t border-black/5 pt-4">
          <div className="text-xs text-[#9a9aa0] mb-2">Комментарии</div>
          <div className="space-y-2 mb-3">
            {comms.map((c) => (
              <div key={c.id} className="flex gap-2">
                <span className="h-7 w-7 rounded-full bg-[#f4f4f6] grid place-items-center text-[10px] font-semibold shrink-0">
                  {users.find((u) => u.id === c.userId)?.avatar}
                </span>
                <div className="bg-[#f4f4f6] rounded-2xl px-3 py-2 text-sm flex-1">
                  <b className="font-medium">{users.find((u) => u.id === c.userId)?.name}</b>
                  <div>{c.text}</div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {EMOJIS.map((e) => {
                      const n = (c.reactions ?? []).filter((r) => r.emoji === e).length;
                      const mine = (c.reactions ?? []).some((r) => r.emoji === e && r.userId === current.id);
                      return (
                        <button key={e} type="button" className={`text-sm px-1 rounded ${mine ? "bg-white" : ""}`} onClick={() => toggleReaction(c.id, e)}>
                          {e}{n ? ` ${n}` : ""}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <form className="flex gap-2" onSubmit={(e) => { e.preventDefault(); if (!text.trim()) return; addComment(task.id, text.trim()); setText(""); }}>
            <input className="flex-1" value={text} onChange={(e) => setText(e.target.value)} placeholder="Написать комментарий…" />
            <button className="pill bg-black text-white px-4">Отправить</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function Meta({ k, v }: { k: string; v: string }) {
  return (
    <div className="bg-[#f7f7f8] rounded-2xl px-3 py-2">
      <div className="text-[10px] text-[#9a9aa0]">{k}</div>
      <div className="font-medium">{v}</div>
    </div>
  );
}

export function TaskModal() {
  const { previewId, setPreviewId } = useStore();
  if (!previewId) return null;
  return (
    <div className="fixed inset-0 z-50 bg-black/40 grid place-items-end md:place-items-center p-0 md:p-4" onClick={() => setPreviewId(null)}>
      <div className="w-full max-w-xl max-h-[92dvh] md:max-h-[90vh]" onClick={(e) => e.stopPropagation()}>
        <TaskSheet taskId={previewId} onClose={() => setPreviewId(null)} />
      </div>
    </div>
  );
}
