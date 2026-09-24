import type { TodoRepeat } from "./types";

/** Ереван: UTC+4 круглый год. Время в сообщениях боту понимаем по Еревану. */
const OFFSET_MS = 4 * 3_600_000;

export type QuickTodo = { text: string; remindAt?: string; repeat: TodoRepeat };

/** Сообщение — это дело, если начинается с «дело», «/todo» или «напомни». Возвращает текст без префикса. */
export function todoPrefix(message: string): string | null {
  const m = message.trim().match(/^(?:\/todo(?:@\S+)?|дело\s*:?|напомни(?:\s+мне)?\s*:?)\s*([\s\S]*)$/iu);
  return m ? m[1].trim() : null;
}

/** Ереванское «сейчас» как поля даты. */
function yerevanParts(ms: number) {
  const d = new Date(ms + OFFSET_MS);
  return { y: d.getUTCFullYear(), m: d.getUTCMonth(), d: d.getUTCDate() };
}

/** ISO-время для ереванских даты и часа. */
function yerevanIso(y: number, m: number, d: number, hh: number, mm: number) {
  return new Date(Date.UTC(y, m, d, hh, mm) - OFFSET_MS).toISOString();
}

/**
 * «позвонить электрику завтра 10:00», «оплатить аренду 01.10 9:30 каждую неделю», «проверить почту через 2 часа».
 * Время: «в 18:00» / «18:00» (сегодня, а если прошло — завтра), «сегодня», «завтра», «ДД.ММ», «через N мин/ч».
 * Повтор: «каждый день», «по будням», «каждую неделю». Без времени — дело без напоминания.
 */
export function parseQuickTodo(input: string, nowMs: number): QuickTodo | { error: string } {
  let rest = ` ${input.trim()} `;
  let repeat: TodoRepeat = "none";
  const rep: [RegExp, TodoRepeat][] = [
    [/\s(?:каждый\s+день|ежедневно)(?=\s)/iu, "daily"],
    [/\sпо\s+будням(?=\s)/iu, "weekdays"],
    [/\s(?:каждую\s+неделю|еженедельно)(?=\s)/iu, "weekly"],
  ];
  for (const [re, r] of rep) {
    if (re.test(rest)) {
      repeat = r;
      rest = rest.replace(re, " ");
    }
  }

  let remindAt: string | undefined;
  const rel = rest.match(/\sчерез\s+(\d{1,3})\s*(мин\S*|м|час\S*|ч)(?=\s)/iu);
  if (rel) {
    const n = Number(rel[1]);
    const minutes = /^м/i.test(rel[2]) ? n : n * 60;
    remindAt = new Date(nowMs + minutes * 60_000).toISOString();
    rest = rest.replace(rel[0], " ");
  } else {
    const now = yerevanParts(nowMs);
    let day: { y: number; m: number; d: number } | null = null;
    let dayGiven = false;
    const date = rest.match(/\s(\d{1,2})\.(\d{1,2})(?:\.(\d{2,4}))?(?=\s)/u);
    if (date) {
      const dd = Number(date[1]);
      const mm = Number(date[2]) - 1;
      const yy = date[3] ? Number(date[3].length === 2 ? `20${date[3]}` : date[3]) : now.y;
      const check = new Date(Date.UTC(yy, mm, dd));
      if (check.getUTCMonth() !== mm || check.getUTCDate() !== dd) return { error: `Даты ${date[1]}.${date[2]} не существует` };
      day = { y: yy, m: mm, d: dd };
      // Без года и уже прошло — значит в следующем году.
      if (!date[3] && Date.UTC(yy, mm, dd) < Date.UTC(now.y, now.m, now.d)) day.y += 1;
      dayGiven = true;
      rest = rest.replace(date[0], " ");
    } else if (/\sзавтра(?=\s)/iu.test(rest)) {
      const t = new Date(Date.UTC(now.y, now.m, now.d + 1));
      day = { y: t.getUTCFullYear(), m: t.getUTCMonth(), d: t.getUTCDate() };
      dayGiven = true;
      rest = rest.replace(/\sзавтра(?=\s)/iu, " ");
    } else if (/\sсегодня(?=\s)/iu.test(rest)) {
      day = now;
      dayGiven = true;
      rest = rest.replace(/\sсегодня(?=\s)/iu, " ");
    }
    const time = rest.match(/\s(?:в\s+)?(\d{1,2}):(\d{2})(?=\s)/u);
    let hh = 9;
    let mi = 0;
    if (time) {
      hh = Number(time[1]);
      mi = Number(time[2]);
      if (hh > 23 || mi > 59) return { error: `Неверное время ${time[1]}:${time[2]}` };
      rest = rest.replace(time[0], " ");
    }
    if (time || dayGiven) {
      const base = day ?? now;
      let iso = yerevanIso(base.y, base.m, base.d, hh, mi);
      // «в 18:00» без дня, а 18:00 уже прошло — напомним завтра.
      if (!dayGiven && Date.parse(iso) <= nowMs) iso = yerevanIso(base.y, base.m, base.d + 1, hh, mi);
      // «сегодня» без часа, а 9:00 уже прошло — просто дело на сегодня, без мгновенного напоминания.
      remindAt = !time && Date.parse(iso) <= nowMs ? undefined : iso;
    }
  }

  const text = rest.replace(/\s+/g, " ").trim();
  if (text.length < 2) return { error: "Напишите, что сделать. Пример: «дело: позвонить электрику завтра 10:00»" };
  if (repeat !== "none" && !remindAt) return { error: "Для повтора нужно время. Пример: «дело: планёрка 10:00 по будням»" };
  return { text: text.slice(0, 500), remindAt, repeat };
}
