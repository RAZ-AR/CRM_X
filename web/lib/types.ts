export type Role = "cpo" | "employee";

export type TaskStatus =
  | "todo"
  | "in_progress"
  | "waiting"
  | "blocked"
  | "review"
  | "done";

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

export const READINESS_BLOCKS = [
  "SPACE",
  "EQUIPMENT",
  "TEAM",
  "PRODUCT",
  "IT",
  "MARKETING",
  "OPERATIONS",
  "READY",
] as const;

export type ReadinessBlock = (typeof READINESS_BLOCKS)[number];

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
};

export type Zone = {
  slug: ZoneSlug;
  name: string;
  emoji: string;
  color: string;
  deadline: string;
  readiness: Record<ReadinessBlock, number>;
};

export type Comment = {
  id: string;
  taskId: string;
  userId: string;
  text: string;
  createdAt: string;
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

export type Notice = {
  id: string;
  userId: string;
  text: string;
  taskId?: string;
  createdAt: string;
  read: boolean;
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
};
