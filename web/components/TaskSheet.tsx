"use client";

import { useState } from "react";
import { useStore } from "@/lib/store";
import { canDeleteTask, canEditTask, canSeeContact, canSeeTask, canWorkTask, isOverdue, statusMeta, taskZones } from "@/lib/access";
import { openDeps, unlockedBy } from "@/lib/taskRules";
import { filesToAttachments } from "@/lib/files";
import { CONTRACTOR_STATUS, STREAMS, type Priority } from "@/lib/types";
import { telHref, tgHref } from "@/lib/links";
import { formatDate } from "@/lib/dates";
import { Flame, Trash2, X } from "lucide-react";
import { EMOJIS } from "@/lib/emoji";
import { STATUS_ICON, STATUS_ORDER, StatusIcon } from "@/components/StatusIcon";

export function TaskSheet({
  taskId,
  onClose,
}: {
  taskId: string;
  onClose?: () => void;
}) {
  const {
    current, tasks, users, zones, comments, subtasks,
    updateTask, addComment, addSubtask, toggleSubtask, toggleReaction, deleteTask, setPreviewId, contacts,
  } = useStore();
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState("");
  const [sub, setSub] = useState("");
  const [blockOpen, setBlockOpen] = useState(false);
  const [blockFor, setBlockFor] = useState<"day" | "week" | "month" | "forever">("day");
  const [blockNote, setBlockNote] = useState("");
  if (!current) return null;
  const task = tasks.find((t) => t.id === taskId);
  if (!task || !canSeeTask(current, task, users)) {
    return (
      <div className="p-8">Нет доступа</div>
    );
  }
  const isAuthor = task.authorId === current.id;
  const canEdit = canEditTask(current, task);
  const canWork = canWorkTask(current, task);
  const canDelete = canDeleteTask(current, task);
  const waiting = openDeps(task, tasks);
  const unlocks = unlockedBy(task, tasks);
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
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Meta k="Статус" v={<span className="inline-flex items-center gap-1.5"><StatusIcon status={task.status} size={14} />{statusMeta[task.status].label}</span>} />
          <Meta k="Исполнитель" v={assignee?.name ?? "—"} />
          <Meta k="Создал" v={author?.name ?? "—"} />
          <Meta k="Начало" v={formatDate(task.startDate)} />
          <Meta k="Конец" v={formatDate(task.due)} />
          <Meta k="Срочность" v={task.priority} />
          <Meta k="Поток" v={task.workstream || "—"} />
          <Meta k="Вложения" v={files.length ? String(files.length) : "нет"} />
        </div>

        {canWork && (
          <div className="space-y-2">
            {task.status !== "blocked" && (
              <div>
                <div className="text-xs text-[#9a9aa0] mb-1">Статус</div>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5" role="radiogroup" aria-label="Статус задачи">
                  {STATUS_ORDER.map((c) => {
                    const on = task.status === c;
                    return (
                      <button
                        key={c}
                        type="button"
                        role="radio"
                        aria-checked={on}
                        className={`flex items-center justify-center gap-1.5 whitespace-nowrap rounded-xl px-1.5 py-2 text-xs border ${on ? "bg-black text-white border-black" : "bg-white border-black/10 hover:bg-[#f4f4f6]"}`}
                        onClick={() => {
                          if (on) return;
                          if (c === "blocked") {
                            setBlockOpen(true);
                            return;
                          }
                          const r = updateTask(task.id, { status: c });
                          if (!r.ok) alert(r.error);
                        }}
                      >
                        <StatusIcon status={c} size={15} />
                        {STATUS_ICON[c].short}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
            <label className="text-xs text-[#9a9aa0] block">Готово когда
              <textarea
                className="w-full mt-1 min-h-16"
                defaultValue={task.result}
                placeholder="Критерий закрытия. Без этого нельзя «на проверку» и «готово»"
                onBlur={(e) => updateTask(task.id, { result: e.target.value })}
              />
            </label>
            {task.status === "blocked" ? (
              <div className="rounded-2xl bg-[#fee2e2] px-3 py-3 text-sm space-y-2">
                <div className="font-medium">Заблокировано {task.blockUntil === "forever" ? "навсегда" : task.blockUntil ? `до ${formatDate(task.blockUntil)}` : ""}</div>
                {task.blockReason && <p className="text-[#7f1d1d]">{task.blockReason}</p>}
                <button
                  type="button"
                  className="pill bg-black text-white px-3 py-1.5 text-xs"
                  onClick={() => {
                    const back = task.blockFromStatus && task.blockFromStatus !== "blocked" ? task.blockFromStatus : "todo";
                    const r = updateTask(task.id, { status: back, blockReason: "", blockUntil: "" });
                    if (!r.ok) alert(r.error);
                  }}
                >
                  Снять блок
                </button>
              </div>
            ) : (
              <div>
                {!blockOpen ? (
                  <button type="button" className="text-sm underline text-[#b91c1c]" onClick={() => setBlockOpen(true)}>
                    Заблокировать…
                  </button>
                ) : (
                  <div className="rounded-2xl border border-black/10 p-3 space-y-2">
                    <div className="text-xs text-[#9a9aa0]">На сколько</div>
                    <div className="flex flex-wrap gap-2">
                      {([["day", "на день"], ["week", "на неделю"], ["month", "на месяц"], ["forever", "навсегда"]] as const).map(([id, label]) => (
                        <button
                          key={id}
                          type="button"
                          className={`pill px-3 py-1.5 text-sm ${blockFor === id ? "bg-black text-white" : "bg-[#f4f4f6]"}`}
                          onClick={() => setBlockFor(id)}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full min-h-16"
                      placeholder="Комментарий: почему блок"
                      value={blockNote}
                      onChange={(e) => setBlockNote(e.target.value)}
                    />
                    <div className="flex gap-2 justify-end">
                      <button type="button" className="pill px-3 py-1.5 bg-[#f4f4f6] text-sm" onClick={() => setBlockOpen(false)}>Отмена</button>
                      <button
                        type="button"
                        className="pill bg-black text-white px-3 py-1.5 text-sm"
                        onClick={() => {
                          const note = blockNote.trim();
                          const d = new Date();
                          let until = "forever";
                          if (blockFor === "day") { d.setDate(d.getDate() + 1); until = d.toISOString().slice(0, 10); }
                          if (blockFor === "week") { d.setDate(d.getDate() + 7); until = d.toISOString().slice(0, 10); }
                          if (blockFor === "month") { d.setMonth(d.getMonth() + 1); until = d.toISOString().slice(0, 10); }
                          const r = updateTask(task.id, {
                            status: "blocked",
                            blockReason: note,
                            blockUntil: until,
                            blockFromStatus: task.status,
                          });
                          if (!r.ok) { alert(r.error); return; }
                          if (note) addComment(task.id, `Блок ${blockFor === "forever" ? "навсегда" : "до " + until}: ${note}`);
                          setBlockOpen(false);
                          setBlockNote("");
                        }}
                      >
                        Заблокировать
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {editing && canEdit && (
          <div className="grid sm:grid-cols-2 gap-2">
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
            <select value={task.workstream || ""} onChange={(e) => updateTask(task.id, { workstream: e.target.value })}>
              <option value="">Поток: —</option>
              {STREAMS.map((s) => (
                <option key={s} value={s}>Поток: {s}</option>
              ))}
            </select>
            <select value={task.zone} onChange={(e) => updateTask(task.id, { zone: e.target.value, zones: [e.target.value] })}>
              {zones.map((z) => (
                <option key={z.slug} value={z.slug}>{z.emoji} {z.name}</option>
              ))}
            </select>
          </div>
        )}

        {editing && canDelete && (
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-[#b91c1c]"
            onClick={async () => {
              if (!confirm(`Удалить задачу «${task.title}»? Комментарии и чеклист удалятся вместе с ней.`)) return;
              const r = await deleteTask(task.id);
              if (!r.ok) {
                alert(r.error);
                return;
              }
              setPreviewId(null);
              onClose?.();
            }}
          >
            <Trash2 size={16} /> Удалить задачу
          </button>
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

        {waiting.length > 0 && task.status !== "done" && (
          <p className="text-sm text-[#b91c1c]">Закрытие ждёт: {waiting.map((t) => t.code || t.title).join(", ")}</p>
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

        {unlocks.length > 0 && (
          <div>
            <div className="text-xs text-[#9a9aa0] mb-1">Открывает</div>
            <div className="flex flex-wrap gap-2">
              {unlocks.map((d) => (
                <span key={d.id} className="pill bg-[#f4f4f6] px-3 py-1 text-xs">{d.code} {d.title}</span>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="text-xs text-[#9a9aa0] mb-2">Контрагенты</div>
          {(() => {
            const visible = contacts.filter((c) => canSeeContact(current, c));
            const ids = task.contactIds ?? [];
            const linked = visible.filter((c) => ids.includes(c.id));
            const free = visible.filter((c) => !ids.includes(c.id)).sort((a, b) => Number(a.kind === "staff") - Number(b.kind === "staff") || a.name.localeCompare(b.name));
            return (
              <>
                {linked.length === 0 && <p className="text-sm text-[#9a9aa0]">Не привязаны</p>}
                <div className="flex flex-wrap gap-2">
                  {linked.map((c) => (
                    <span key={c.id} className="pill bg-[#f4f4f6] px-3 py-1.5 text-xs flex items-center gap-2">
                      <span>
                        <b className="font-medium">{c.name}</b>
                        {c.specialty ? ` · ${c.specialty}` : ""}
                        {c.status && c.kind !== "staff" ? ` · ${CONTRACTOR_STATUS[c.status].label}` : ""}
                      </span>
                      {c.phone && <a className="underline" href={telHref(c.phone)}>📞</a>}
                      {c.telegram && <a className="underline" href={tgHref(c.telegram)} target="_blank" rel="noreferrer">TG</a>}
                      {canWork && (
                        <button type="button" aria-label="Отвязать" onClick={() => updateTask(task.id, { contactIds: ids.filter((x) => x !== c.id) })}>
                          <X size={12} />
                        </button>
                      )}
                    </span>
                  ))}
                </div>
                {canWork && free.length > 0 && (
                  <select
                    className="mt-2 text-sm w-full"
                    value=""
                    onChange={(e) => e.target.value && updateTask(task.id, { contactIds: [...ids, e.target.value] })}
                  >
                    <option value="">+ Привязать контрагента</option>
                    {free.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}{c.specialty ? ` — ${c.specialty}` : ""}</option>
                    ))}
                  </select>
                )}
              </>
            );
          })()}
        </div>

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

        <div>
          <div className="text-xs text-[#9a9aa0] mb-2">Вложения {files.length ? `· ${files.length}` : ""}</div>
          {files.length === 0 && <p className="text-sm text-[#9a9aa0]">Файлов нет</p>}
          <div className="flex flex-wrap gap-2">
            {files.map((f) =>
              f.type.startsWith("image/") ? (
                <a key={f.id} href={f.dataUrl} target="_blank" rel="noreferrer" className="block">
                  <img src={f.dataUrl} alt={f.name} className="h-16 w-16 object-cover rounded-xl" />
                  <div className="text-[10px] text-[#757575] truncate max-w-16">{f.name}</div>
                </a>
              ) : (
                <a key={f.id} href={f.dataUrl} download={f.name} className="text-xs underline bg-[#f4f4f6] rounded-xl px-3 py-2">{f.name}</a>
              ),
            )}
          </div>
          {editing && canEdit && (
            <input type="file" accept="image/*,.pdf" className="text-sm mt-2" onChange={async (e) => {
              if (!e.target.files?.length) return;
              const more = await filesToAttachments(e.target.files);
              updateTask(task.id, { attachments: [...files, ...more] });
              e.target.value = "";
            }} />
          )}
        </div>

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

function Meta({ k, v }: { k: string; v: React.ReactNode }) {
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
