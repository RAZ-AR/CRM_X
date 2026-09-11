"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { seed } from "./seed";
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
  login: (email: string, password: string) => boolean;
  logout: () => void;
  addTask: (t: Omit<Task, "id" | "createdAt">) => string;
  updateTask: (id: string, patch: Partial<Task>) => void;
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
    title: string;
    zone: ZoneSlug;
  }) => void;
  markRead: (id: string) => void;
  markAllRead: () => void;
  setBoardZones: (userId: string, boardZones: import("./types").ZoneSlug[]) => void;
  previewId: string | null;
  setPreviewId: (id: string | null) => void;
  addZone: (z: { name: string; emoji: string; color: string; deadline: string }) => void;
};

const Ctx = createContext<Store | null>(null);
const KEY = "crmx-norion-v3";
const USER_KEY = "crmx-user";

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(seed);
  const [current, setCurrent] = useState<User | null>(null);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        const contacts = (parsed.contacts ?? seed.contacts).map((c: Contact) => ({
          ...c,
          telegram: c.telegram || "",
          whatsapp: c.whatsapp || "",
        }));
        setState({ ...seed, ...parsed, notices: parsed.notices ?? seed.notices, contacts });
      }
      const uid = localStorage.getItem(USER_KEY);
      if (uid) {
        const s: AppState = raw ? JSON.parse(raw) : seed;
        setCurrent(s.users.find((u) => u.id === uid) ?? null);
      }
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  const login = useCallback(
    (email: string, password: string) => {
      const u = state.users.find(
        (x) => x.email === email && x.password === password,
      );
      if (!u) return false;
      setCurrent(u);
      localStorage.setItem(USER_KEY, u.id);
      return true;
    },
    [state.users],
  );

  const logout = useCallback(() => {
    setCurrent(null);
    localStorage.removeItem(USER_KEY);
  }, []);

  const pushNotice = (userId: string, text: string, taskId?: string) => {
    if (!userId) return;
    const n: Notice = {
      id: `n-${crypto.randomUUID().slice(0, 8)}`,
      userId,
      text,
      taskId,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setState((s) => ({ ...s, notices: [n, ...(s.notices ?? [])] }));
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
      zones: t.zones?.length ? t.zones : t.zone ? [t.zone] : [],
      id: `t-${crypto.randomUUID().slice(0, 8)}`,
      createdAt: new Date().toISOString().slice(0, 10),
    };
    setState((s) => ({ ...s, tasks: [task, ...s.tasks] }));
    if (t.assigneeId && t.assigneeId !== current?.id) {
      pushNotice(t.assigneeId, `Вас назначили: ${t.title}`, task.id);
    }
    const cpo = state.users.find((u) => u.role === "cpo");
    if (cpo && cpo.id !== current?.id) {
      pushNotice(cpo.id, `Новая задача: ${t.title}`, task.id);
    }
    return task.id;
  }, [current, state.users]);

  const updateTask = useCallback((id: string, patch: Partial<Task>) => {
    setState((s) => {
      const prev = s.tasks.find((t) => t.id === id);
      const next = s.tasks.map((t) => (t.id === id ? { ...t, ...patch } : t));
      return { ...s, tasks: next };
    });
    setState((s) => {
      const t = s.tasks.find((x) => x.id === id);
      if (!t) return s;
      const extra: Notice[] = [];
      const mk = (userId: string, text: string): Notice => ({
        id: `n-${crypto.randomUUID().slice(0, 8)}`,
        userId,
        text,
        taskId: id,
        createdAt: new Date().toISOString(),
        read: false,
      });
      if (patch.status && current) {
        for (const uid of new Set([t.authorId, t.assigneeId])) {
          if (uid !== current.id) extra.push(mk(uid, `${current.name} сменил статус: ${t.title}`));
        }
      }
      if (patch.assigneeId && patch.assigneeId !== current?.id) {
        extra.push(mk(patch.assigneeId, `Вас назначили: ${t.title}`));
      }
      if (!extra.length) return s;
      return { ...s, notices: [...extra, ...(s.notices ?? [])] };
    });
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
      };
      setState((s) => {
        const task = s.tasks.find((x) => x.id === taskId);
        const extra: Notice[] = [];
        if (task) {
          for (const uid of new Set([task.authorId, task.assigneeId])) {
            if (uid !== current.id) {
              extra.push({
                id: `n-${crypto.randomUUID().slice(0, 8)}`,
                userId: uid,
                text: `${current.name} прокомментировал «${task.title}»`,
                taskId,
                createdAt: new Date().toISOString(),
                read: false,
              });
            }
          }
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
      notices: (s.notices ?? []).map((n) => (n.id === id ? { ...n, read: true } : n)),
    }));
  }, []);

  const setBoardZones = useCallback((userId: string, boardZones: import("./types").ZoneSlug[]) => {
    setState((s) => ({
      ...s,
      users: s.users.map((u) => (u.id === userId ? { ...u, boardZones } : u)),
    }));
  }, []);

  const markAllRead = useCallback(() => {
    setState((s) => ({
      ...s,
      notices: (s.notices ?? []).map((n) =>
        n.userId === current?.id ? { ...n, read: true } : n,
      ),
    }));
  }, [current]);

  const addUser = useCallback(
    (u: { name: string; email: string; title: string; zone: ZoneSlug }) => {
      const user: User = {
        id: `u-${crypto.randomUUID().slice(0, 8)}`,
        name: u.name,
        email: u.email,
        password: "demo",
        role: "employee",
        zone: u.zone,
        title: u.title,
        avatar: u.name.slice(0, 1).toUpperCase(),
        permissions: [],
        boardZones: [u.zone],
      };
      setState((s) => ({ ...s, users: [...s.users, user] }));
    },
    [],
  );

  const value = useMemo(
    () => ({
      ...state,
      current,
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
      markRead,
      markAllRead,
      setBoardZones,
      previewId,
      setPreviewId,
      addZone,
    }),
    [
      state,
      current,
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
      markRead,
      markAllRead,
      setBoardZones,
      previewId,
      setPreviewId,
      addZone,
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
