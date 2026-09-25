export type Role = "cpo" | "employee";

/** Роль в команде. Owner = role "cpo"; остальные — role "employee" с разным охватом задач. */
export type Access = "owner" | "manager" | "marketer" | "staff";

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
  | "finance"
  | "manage_users";

export type ZoneSlug = string;

/** 7 потоков запуска. Готовность проекта считается по задачам каждого потока. */
export const STREAMS = [
  "LEGAL & FINANCE",
  "SPACE & BUILD",
  "BRAND & MARKETING",
  "PRODUCT & APP",
  "EQUIPMENT & SUPPLY",
  "PEOPLE & TRAINING",
  "LAUNCH & OPS",
] as const;

/** Старые названия потоков → новые (задачи и доступы переносятся миграцией). */
export const LEGACY_STREAMS: Record<string, (typeof STREAMS)[number]> = {
  LEGAL: "LEGAL & FINANCE",
  SPACE: "SPACE & BUILD",
  BRAND: "BRAND & MARKETING",
  PRODUCT: "PRODUCT & APP",
  PEOPLE: "PEOPLE & TRAINING",
  LAUNCH: "LAUNCH & OPS",
};

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
  /** Устарело: первый из managerIds (для старых данных и копии в Postgres). */
  managerId: string | null;
  /** Руководители: видят задачи человека. Может не быть ни одного или быть несколько. */
  managerIds?: string[];
  /** Роль в команде; для role "cpo" всегда owner. Нет поля — «Сотрудник». */
  access?: Access;
  /** Потоки, которые человек видит целиком (и может вести статус), например BRAND для креативного директора. */
  streams?: Stream[];
  /** Только на сервере: чат Telegram для уведомлений. */
  telegramChatId?: string;
  /** В браузер приходит только признак «Telegram подключён». */
  telegramLinked?: boolean;
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
  /** Контрагенты и контакты, привязанные к задаче. */
  contactIds?: string[];
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
  /** vendor — старое название поставщика. */
  kind: "staff" | "vendor" | "partner" | "contractor" | "supplier" | "authority";
  /** Контрагенты: чем занимаются (электрика, окна, упаковка…). */
  specialty?: string;
  status?: ContractorStatus;
  notes?: string;
};

export type ContractorStatus = "lead" | "negotiation" | "contract" | "working" | "done" | "rejected";

export const CONTACT_KINDS: { id: Contact["kind"]; label: string }[] = [
  { id: "contractor", label: "Подрядчик" },
  { id: "supplier", label: "Поставщик" },
  { id: "partner", label: "Партнёр" },
  { id: "authority", label: "Госорган / арендодатель" },
  { id: "staff", label: "Сотрудник" },
];

export const CONTRACTOR_STATUS: Record<ContractorStatus, { label: string; color: string }> = {
  lead: { label: "Кандидат", color: "#E5E7EB" },
  negotiation: { label: "Переговоры", color: "#FDE68A" },
  contract: { label: "Договор", color: "#BFDBFE" },
  working: { label: "В работе", color: "#BBF7D0" },
  done: { label: "Завершено", color: "#D1D5DB" },
  rejected: { label: "Отказ", color: "#FECACA" },
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
  /** Версия учёток: при повышении стартовые логины/пароли команды выставляются заново. */
  authVersion?: number;
  /** Журнал изменений (пишет только сервер). */
  activity?: Activity[];
  /** Номер версии: растёт на каждой записи (для порядка копий в Postgres). */
  rev?: number;
  /** Деньги: план по статьям, расходы, курсы валют. Видит Owner и те, кому выдан доступ «Деньги». */
  budget?: BudgetLine[];
  expenses?: Expense[];
  fx?: FxRates;
  /** Реестр рисков — общий для команды. */
  risks?: Risk[];
  /** Личные дела с напоминаниями: каждый видит только свои. */
  todos?: Todo[];
};

export type TodoRepeat = "none" | "daily" | "weekdays" | "weekly";

export const TODO_REPEAT: Record<TodoRepeat, string> = {
  none: "Без повтора",
  daily: "Каждый день",
  weekdays: "По будням",
  weekly: "Каждую неделю",
};

export type Todo = {
  id: string;
  userId: string;
  text: string;
  done: boolean;
  /** Когда напомнить: ISO-время (UTC). Пусто — без напоминания. */
  remindAt?: string;
  repeat?: TodoRepeat;
  /** Уже напомнили про этот remindAt (сервер отправил в Telegram). */
  remindedAt?: string;
  /** Связанная задача, если дело про неё. */
  taskId?: string;
  createdAt: string;
  doneAt?: string;
};

export const CURRENCIES = ["AMD", "USD", "EUR"] as const;
export type Currency = (typeof CURRENCIES)[number];

/** Сколько драмов стоит 1 USD и 1 EUR. */
export type FxRates = { USD: number; EUR: number; updatedAt?: string };

/** Статьи бюджета из мастер-плана. */
export const BUDGET_CATEGORIES = [
  "Первоначальные инвестиции",
  "Ремонт и инженерия",
  "Оборудование",
  "Упаковка и мебель",
  "IT и приложение",
  "Юридическое и разрешения",
  "Зарплаты",
  "Аренда и коммунальные",
  "Продукты и доставка",
  "Маркетинг",
  "Налоги",
  "Резерв",
  "Прочее",
] as const;

export type BudgetLine = {
  id: string;
  zone: ZoneSlug;
  category: string;
  amount: number;
  currency: Currency;
  note?: string;
};

export type ExpenseStatus = "planned" | "invoiced" | "paid";

export const EXPENSE_STATUS: Record<ExpenseStatus, { label: string; color: string }> = {
  planned: { label: "Запланирован", color: "#E5E7EB" },
  invoiced: { label: "Счёт получен", color: "#FDE68A" },
  paid: { label: "Оплачен", color: "#BBF7D0" },
};

export type Expense = {
  id: string;
  title: string;
  zone: ZoneSlug;
  category: string;
  amount: number;
  currency: Currency;
  status: ExpenseStatus;
  /** Дата оплаты (план или факт). */
  date: string;
  contactId?: string;
  taskId?: string;
  authorId: string;
  createdAt: string;
};

export type RiskStatus = "open" | "watch" | "closed";

export const RISK_STATUS: Record<RiskStatus, { label: string; color: string }> = {
  open: { label: "Открыт", color: "#FECACA" },
  watch: { label: "Наблюдаем", color: "#FDE68A" },
  closed: { label: "Закрыт", color: "#D1D5DB" },
};

/** 1 — низкая, 2 — средняя, 3 — высокая. */
export type RiskLevel = 1 | 2 | 3;

export type Risk = {
  id: string;
  title: string;
  zone: ZoneSlug;
  probability: RiskLevel;
  impact: RiskLevel;
  ownerId: string;
  /** Что делаем, если риск сработает. */
  planB: string;
  /** До какой даты нужно принять решение. */
  decideBy: string;
  taskIds: string[];
  status: RiskStatus;
  authorId: string;
  createdAt: string;
};

export type ActivityKind = "created" | "status" | "dates" | "assignee" | "edited" | "deleted" | "comment";

export type Activity = {
  id: string;
  at: string;
  userId: string;
  taskId: string;
  taskTitle: string;
  kind: ActivityKind;
  text: string;
  /** Для сдвигов сроков: на сколько дней сдвинулся конец. */
  days?: number;
  criticalPath?: boolean;
};
