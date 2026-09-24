import { loadSharedState } from "./blobState";
import { todayYerevan } from "./dates";
import { digestFor, sendTo } from "./telegram";

/** Утренний список всем, кто подключил Telegram. Возвращает, скольким отправлено. */
export async function sendMorningDigests(appUrl: string) {
  const { state } = await loadSharedState();
  const today = todayYerevan();
  const linked = state.users.filter((u) => u.telegramChatId);
  for (const u of linked) await sendTo(u, digestFor(state, u, today, appUrl));
  return linked.length;
}
