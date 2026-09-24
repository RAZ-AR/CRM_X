export type Role = "cpo" | "employee";

export type TaskStatus = "todo" | "in_progress" | "blocked" | "review" | "done";

export type Priority = "low" | "medium" | "high" | "critical";

export type Permission =
  | "zone_page"
  | "zone_team_tasks"
  | "zone_team"
  | "zone_roadmap"
  | "marketing_all_zones"
  | "zone_readiness"
  | "wiki"
  | "contacts"
  | "manage_users";

export type ZoneSlug = string;

/** 7 потоков запуска. Готовность проекта считается по задачам каждого потока. */
export const STREAMS = [
  "LEGAL",
  "SPACE",
  "BRAND",
  "PRODUCT",
  "EQUIPMENT & SUPPLY",
  "PEOPLE",
  "LAUNCH",
] as const;

export type Stream = (typeof STREAMS)[number];

export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
  role: Role;
  zone: ZoneSlug | null;
  title: string;
  avatar: string;
  permissions: Permission[];
  boardZones: ZoneSlug[];
  managerId: string | null;
};

export type Zone = {
  slug: ZoneSlug;
  name: string;
  emoji: string;
  color: string;
  deadline: string;
  /** Устарело: готовность считается из задач (см. lib/readiness.ts). */
  readiness: Record<string, number>;
};

export type Comment = {
  id: string;
  taskId: string;
  userId: string;
  text: string;
  createdAt: string;
  reactions: { emoji: string; userId: string }[];
};

export type Subtask = {
  id: string;
  taskId: string;
  title: string;
  done: boolean;
};

export type Attachment = {
  id: string;
  name: string;
  type: string;
  dataUrl: string;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  zone: ZoneSlug;
  zones: ZoneSlug[];
  assigneeId: string;
  authorId: string;
  participantIds: string[];
  startDate: string;
  due: string;
  priority: Priority;
  status: TaskStatus;
  weight: number;
  criticalPath: boolean;
  result: string;
  createdAt: string;
  attachments: Attachment[];
  code: string;
  wave: "A" | "B" | "C" | "";
  workstream: string;
  dependsOn: string[];
  blockReason?: string;
  /** ISO date or "forever" */
  blockUntil?: string;
  blockFromStatus?: TaskStatus;
};

export type WikiPage = {
  id: string;
  title: string;
  body: string;
  zone: ZoneSlug | "all";
  visibility: "cpo" | "zone" | "staff";
};

export type Contact = {
  id: string;
  name: string;
  company: string;
  title: string;
  phone: string;
  email: string;
  telegram: string;
  whatsapp: string;
  zone: ZoneSlug | "all";
  kind: "staff" | "vendor" | "partner";
};

export type NoticeKind = "task_new" | "deadline" | "status" | "comment" | "broadcast";

export type Notice = {
  id: string;
  userId: string;
  text: string;
  taskId?: string;
  createdAt: string;
  read: boolean;
  readAt?: string;
  kind?: NoticeKind;
};

export type Broadcast = {
  text: string;
  emoji: string;
  authorId: string;
  updatedAt: string;
};

export type AppState = {
  users: User[];
  zones: Zone[];
  tasks: Task[];
  comments: Comment[];
  subtasks: Subtask[];
  wiki: WikiPage[];
  contacts: Contact[];
  notices: Notice[];
  broadcast: Broadcast | null;
};
