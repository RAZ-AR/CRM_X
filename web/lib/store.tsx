"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { seed } from "./seed";
import { isFourDigit, loginTaken } from "./pin";
import { canMoveStatus } from "./taskRules";
import { normalizeState } from "./normalize";
import type {
  AppState,
  Comment,
  Contact,
  Notice,
  Subtask,
  Task,
  User,
  WikiPage,
  ZoneSlug,
} from "./types";

type Store = AppState & {
  current: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  cloud: boolean;
  addTask: (t: Omit<Task, "id" | "createdAt">) => string;
  updateTask: (id: string, patch: Partial<Task>) => { ok: true } | { ok: false; error: string };
  addComment: (taskId: string, text: string) => void;
  grant: (userId: string, permissions: User["permissions"]) => void;
  addSubtask: (taskId: string, title: string) => void;
  toggleSubtask: (id: string) => void;
  addWiki: (p: Omit<WikiPage, "id">) => void;
  addContact: (c: Omit<Contact, "id">) => void;
  updateContact: (id: string, patch: Partial<Contact>) => void;
  deleteContact: (id: string) => void;
  addUser: (u: {
    name: string;
    email: string;
    password: string;
    title: string;
    zone: ZoneSlug;
    managerId?: string | null;
  }) => { ok: true } | { ok: false; error: string };
  setUserPin: (userId: string, pin: string) => { ok: true } | { ok: false; error: string };
  setUserLogin: (userId: string, login: string) => { ok: true } | { ok: false; error: string };
  markRead: (id: string) => void;
  markAllRead: () => void;
  setBoardZones: (userId: string, boardZones: import("./types").ZoneSlug[]) => void;
  previewId: string | null;
  setPreviewId: (id: string | null) => void;
  addZone: (z: { name: string; emoji: string; color: string; deadline: string }) => void;
  setBroadcast: (text: string, emoji: string) => void;
  toggleReaction: (commentId: string, emoji: string) => void;
  setManager: (userId: string, managerId: string | null) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "crmx-v8";
const USER_KEY = "crmx-user";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(seed);
  const [current, setCurrent] = useState<User | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [remote, setRemote] = useState(false);
  const remoteRef = useRef(false);
  remoteRef.current = remote;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const apply = (hydrated: AppState, isRemote: boolean, userId?: string | null) => {
        if (cancelled) return;
        setState(hydrated);
        setRemote(isRemote);
        if (userId) {
          const me = hydrated.users.find((u) => u.id === userId) ?? null;
          setCurrent(me);
          if (me) localStorage.setItem(USER_KEY, me.id);
        }
      };
      try {
        const res = await fetch("/api/state", { cache: "no-store", credentials: "same-origin" });
        const data = await res.json();
        if (data?.ok && data.state) {
          apply(normalizeState(data.state), true, data.me || localStorage.getItem(USER_KEY));
          setReady(true);
          return;
        }
        if (data?.auth || res.status === 401) {
          localStorage.removeItem(USER_KEY);
          setCurrent(null);
          setRemote(false);
          setReady(true);
          return;
        }
      } catch {
        /* offline */
      }
      try {
        const currentRaw = localStorage.getItem(KEY);
        const raw = currentRaw || localStorage.getItem("crmx-norion-v7");
        const uid = localStorage.getItem(USER_KEY);
        if (raw) apply(normalizeState(JSON.parse(raw)), false, uid);
        else if (uid) setCurrent(seed.users.find((u) => u.id === uid) ?? null);
      } catch {
        /* ignore */
      }
      if (!cancelled) setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  useEffect(() => {
    if (!ready || !current) return;
    const t = setInterval(async () => {
      try {
        const res = await fetch("/api/state", { cache: "no-store", credentials: "same-origin" });
        const data = await res.json();
        if (data?.ok && data.state) {
          setRemote(true);
          setState(normalizeState(data.state));
        }
      } catch {
        /* ignore */
      }
    }, 4000);
    return () => clearInterval(t);
  }, [ready, current?.id]);

  useEffect(() => {
    if (!ready || !current) return;
    const today = new Date().toISOString().slice(0, 10);
    setState((s) => {
      const extra: Notice[] = [];
      for (const task of s.tasks) {
        if (task.status === "done" || task.due >= today) continue;
        const exists = (s.notices ?? []).some(
          (n) => n.userId === current.id && n.taskId === task.id && n.kind === "deadline",
        );
        if (exists) continue;
        extra.push({
          id: `n-${crypto.randomUUID().slice(0, 8)}`,
          userId: current.id,
          text: `Просрочено: ${task.title}`,
          taskId: task.id,
          createdAt: new Date().toISOString(),
          read: false,
          kind: "deadline",
        });
      }
      if (!extra.length) return s;
      return { ...s, notices: [...extra, ...(s.notices ?? [])] };
    });
  }, [ready, current?.id]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        const u = state.users.find((x) => x.email === email && x.password === password);
        if (!u) return false;
        setCurrent(u);
        localStorage.setItem(USER_KEY, u.id);
        return true;
      }
      const st = await fetch("/api/state", { cache: "no-store", credentials: "same-origin" });
      const body = await st.json();
      if (body?.ok && body.state) {
        const hydrated = normalizeState(body.state);
        setState(hydrated);
        setRemote(true);
        const me = hydrated.users.find((x) => x.id === data.user.id) ?? data.user;
        setCurrent(me);
      } else {
        setRemote(false);
        setCurrent(data.user);
      }
      localStorage.setItem(USER_KEY, data.user.id);
      return true;
    } catch {
      const u = state.users.find((x) => x.email === email && x.password === password);
      if (!u) return false;
      setCurrent(u);
      localStorage.setItem(USER_KEY, u.id);
      return true;
    }
  }, [state.users]);

  const logout = useCallback(() => {
    setCurrent(null);
    localStorage.removeItem(USER_KEY);
    fetch("/api/logout", { method: "POST" }).catch(() => undefined);
  }, []);

  const pushNotices = (
    s: AppState,
    task: Task,
    actorId: string | undefined,
    actorName: string,
    kind: Notice["kind"],
    textOther: string,
    textSelf?: string,
  ) => {
    const zs = task.zones?.length ? task.zones : task.zone ? [task.zone] : [];
    const ids = new Set<string>();
    ids.add(task.authorId);
    ids.add(task.assigneeId);
    for (const u of s.users) {
      if (u.role === "cpo") ids.add(u.id);
      const boards = u.boardZones ?? [];
      if (zs.some((z) => boards.includes(z))) ids.add(u.id);
    }
    const extra: Notice[] = [];
    for (const uid of ids) {
      if (!uid) continue;
      extra.push({
        id: `n-${crypto.randomUUID().slice(0, 8)}`,
        userId: uid,
        text: uid === actorId ? (textSelf || textOther) : textOther,
        taskId: task.id,
        createdAt: new Date().toISOString(),
        read: false,
        kind,
      });
    }
    return extra;
  };

  const addTask = useCallback((t: Omit<Task, "id" | "createdAt">) => {
    const task: Task = {
      ...t,
      attachments: t.attachments ?? [],
      startDate: t.startDate || t.due,
      code: t.code || "",
      wave: t.wave || "",
      workstream: t.workstream || "",
      dependsOn: t.dependsOn || [],
      blockReason: t.blockReason || "",
      zones: t.zones?.length ? t.zones : t.zone ? [t.zone] : [],
      id: `t-${crypto.randomUUID().slice(0, 8)}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setState((s) => {
      const extra = pushNotices(
        { ...s, tasks: [task, ...s.tasks] },
        task,
        current?.id,
        current?.name || "",
        "task_new",
        `${current?.name || "Кто-то"} создал задачу: ${task.title}`,
        `Вы создали задачу: ${task.title}`,
      );
      return { ...s, tasks: [task, ...s.tasks], notices: [...extra, ...(s.notices ?? [])] };
    });
    if (remoteRef.current) {
      fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task),
      }).catch(() => undefined);
    }
    return task.id;
  }, [current, state.users]);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    let result: { ok: true } | { ok: false; error: string } = { ok: true };
    setState((s) => {
      const prev = s.tasks.find((t) => t.id === id);
      if (!prev) {
        result = { ok: false, error: "Нет задачи" };
        return s;
      }
      if (patch.status && patch.status !== prev.status) {
        const check = canMoveStatus(prev, patch.status, s.tasks, current, {
          result: patch.result,
          blockReason: patch.blockReason,
        });
        if (!check.ok) {
          result = check;
          return s;
        }
      }
      const next = s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
      return { ...s, tasks: next };
    });
    if (!result.ok) return result;
    if (remoteRef.current) {
      fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(patch),
      }).catch(() => undefined);
    }
    setState((s) => {
      const t = s.tasks.find((x) => x.id === id);
      if (!t || !current) return s;
      let extra: Notice[] = [];
      if (patch.status) {
        extra = extra.concat(
          pushNotices(
            s,
            t,
            current.id,
            current.name,
            "status",
            `${current.name} сменил статус «${t.title}»`,
            `Вы сменили статус «${t.title}»`,
          ),
        );
      }
      if (patch.assigneeId) {
        extra = extra.concat(
          pushNotices(
            s,
            t,
            current.id,
            current.name,
            "task_new",
            `${current.name} назначил исполнителя: ${t.title}`,
            `Вы назначили исполнителя: ${t.title}`,
          ),
        );
      }
      if (!extra.length) return s;
      return { ...s, notices: [...extra, ...(s.notices ?? [])] };
    });
    return result;
  }, [current]);

  const addComment = useCallback(
    (taskId: string, text: string) => {
      if (!current) return;
      const c: Comment = {
        id: `c-${crypto.randomUUID().slice(0, 8)}`,
        taskId,
        userId: current.id,
        text,
        createdAt: new Date().toISOString(),
        reactions: [],
      };
      setState((s) => {
        const task = s.tasks.find((x) => x.id === taskId);
        let extra: Notice[] = [];
        if (task) {
          extra = extra.concat(
            pushNotices(
              s,
              task,
              current.id,
              current.name,
              "comment",
              `${current.name} прокомментировал «${task.title}»`,
              `Вы прокомментировали «${task.title}»`,
            ),
          );
        }
        return { ...s, comments: [...s.comments, c], notices: [...extra, ...(s.notices ?? [])] };
      });
    },
    [current],
  );

  const grant = useCallback((userId: string, permissions: User["permissions"]) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, permissions } : u)),
    }));
    setCurrent((c) => (c?.id === userId ? { ...c, permissions } : c));
  }, []);

  const addSubtask = useCallback((taskId: string, title: string) => {
    const st: Subtask = {
      id: `s-${crypto.randomUUID().slice(0, 8)}`,
      taskId,
      title,
      done: false,
    };
    setState((s) => ({ ...s, subtasks: [...s.subtasks, st] }));
  }, []);

  const toggleSubtask = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      subtasks: s.subtasks.map((x) =>
        x.id === id ? { ...x, done: !x.done } : x,
      ),
    }));
  }, []);

  const addWiki = useCallback((p: Omit<WikiPage, "id">) => {
    setState((s) => ({
      ...s,
      wiki: [{ ...p, id: `w-${crypto.randomUUID().slice(0, 8)}` }, ...s.wiki],
    }));
  }, []);

  const setBroadcast = useCallback((text: string, emoji: string) => {
    if (!current) return;
    setState((s) => ({
      ...s,
      broadcast: {
        text: text.slice(0, 300),
        emoji: emoji || "💬",
        authorId: current.id,
        updatedAt: new Date().toISOString(),
      },
    }));
  }, [current]);

  const toggleReaction = useCallback((commentId: string, emoji: string) => {
    if (!current) return;
    setState((s) => ({
      ...s,
      comments: s.comments.map((c) => {
        if (c.id !== commentId) return c;
        const reactions = c.reactions ?? [];
        const mine = reactions.find((r) => r.userId === current.id && r.emoji === emoji);
        return {
          ...c,
          reactions: mine
            ? reactions.filter((r) => !(r.userId === current.id && r.emoji === emoji))
            : [...reactions, { emoji, userId: current.id }],
        };
      }),
    }));
  }, [current]);

  const addZone = useCallback((z: { name: string; emoji: string; color: string; deadline: string }) => {
    const slug = z.name
      .toLowerCase()
      .replace(/[^a-z0-9а-яё]+/gi, "-")
      .replace(/^-|-$/g, "") || `p-${crypto.randomUUID().slice(0, 6)}`;
    setState((s) => ({
      ...s,
      zones: [
        ...s.zones,
        {
          slug,
          name: z.name,
          emoji: z.emoji || "📁",
          color: z.color || "#E5E7EB",
          deadline: z.deadline,
          readiness: {
            SPACE: 10, EQUIPMENT: 10, TEAM: 10, PRODUCT: 10,
            IT: 10, MARKETING: 10, OPERATIONS: 10, READY: 5,
          },
        },
      ],
    }));
  }, []);

  const addContact = useCallback((c: Omit<Contact, "id">) => {
    setState((s) => ({
      ...s,
      contacts: [
        { ...c, id: `k-${crypto.randomUUID().slice(0, 8)}` },
        ...s.contacts,
      ],
    }));
  }, []);

  const updateContact = useCallback((id: string, patch: Partial<Contact>) => {
    setState((s) => ({
      ...s,
      contacts: s.contacts.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    }));
  }, []);

  const deleteContact = useCallback((id: string) => {
    setState((s) => ({ ...s, contacts: s.contacts.filter((c) => c.id !== id) }));
  }, []);

  const markRead = useCallback((id: string) => {
    setState((s) => ({
      ...s,
      notices: (s.notices ?? []).map((n) =>
        n.id === id ? { ...n, read: true, readAt: n.readAt || new Date().toISOString() } : n,
      ),
    }));
  }, []);

  const setBoardZones = useCallback((userId: string, boardZones: import("./types").ZoneSlug[]) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, boardZones } : u)),
    }));
  }, []);

  const setManager = useCallback((userId: string, managerId: string | null) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, managerId } : u)),
    }));
  }, []);

  const markAllRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notices: (s.notices ?? []).map((n) =>
        n.userId === current?.id ? { ...n, read: true, readAt: n.readAt || new Date().toISOString() } : n,
      ),
    }));
  }, [current]);

  const addUser = useCallback(
    (u: {
      name: string;
      email: string;
      password: string;
      title: string;
      zone: ZoneSlug;
      managerId?: string | null;
    }): { ok: true } | { ok: false; error: string } => {
      const email = u.email.trim();
      const password = u.password.trim();
      if (!isFourDigit(email)) return { ok: false, error: "Логин — ровно 4 цифры" };
      if (!isFourDigit(password)) return { ok: false, error: "PIN — ровно 4 цифры" };
      if (loginTaken(state.users, email)) return { ok: false, error: "Такой логин уже есть" };
      const user: User = {
        id: `u-${crypto.randomUUID().slice(0, 8)}`,
        name: u.name.trim(),
        email,
        password,
        role: "employee",
        zone: u.zone,
        title: u.title.trim(),
        avatar: u.name.trim().slice(0, 1).toUpperCase(),
        permissions: [],
        boardZones: [u.zone],
        managerId: u.managerId ?? current?.id ?? null,
      };
      setState((s) => ({ ...s, users: [...s.users, user] }));
      return { ok: true };
    },
    [current, state.users],
  );

  const setUserPin = useCallback((userId: string, pin: string): { ok: true } | { ok: false; error: string } => {
    const password = pin.trim();
    if (!isFourDigit(password)) return { ok: false, error: "PIN — ровно 4 цифры" };
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, password } : u)),
    }));
    return { ok: true };
  }, []);

  const setUserLogin = useCallback((userId: string, login: string): { ok: true } | { ok: false; error: string } => {
    const email = login.trim();
    if (!isFourDigit(email)) return { ok: false, error: "Логин — ровно 4 цифры" };
    if (loginTaken(state.users, email, userId)) return { ok: false, error: "Такой логин уже есть" };
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, email } : u)),
    }));
    return { ok: true };
  }, [state.users]);

  const value = useMemo(
    () => ({
      ...state,
      current,
      cloud: remote,
      login,
      logout,
      addTask,
      updateTask,
      addComment,
      grant,
      addSubtask,
      toggleSubtask,
      addWiki,
      addContact,
      updateContact,
      deleteContact,
      addUser,
      setUserPin,
      setUserLogin,
      markRead,
      markAllRead,
      setBoardZones,
      previewId,
      setPreviewId,
      addZone,
      setBroadcast,
      toggleReaction,
      setManager,
    }),
    [
      state,
      current,
      remote,
      login,
      logout,
      addTask,
      updateTask,
      addComment,
      grant,
      addSubtask,
      toggleSubtask,
      addWiki,
      addContact,
      updateContact,
      deleteContact,
      addUser,
      setUserPin,
      setUserLogin,
      markRead,
      markAllRead,
      setBoardZones,
      previewId,
      setPreviewId,
      addZone,
      setBroadcast,
      toggleReaction,
      setManager,
    ],
  );

  if (!ready) return null;
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStore() {
  const v = useContext(Ctx);
  if (!v) throw new Error("StoreProvider missing");
  return v;
}
