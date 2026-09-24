import { loadSharedState } from "./blobState";
import { todayYerevan } from "./dates";
import { digestFor, sendTo } from "./telegram";

/** Утренний список всем, кто подключил Telegram. sent — сколько Telegram принял, failed — сколько нет. */
export async function sendMorningDigests(appUrl: string) {
  const { state } = await loadSharedState();
  const today = todayYerevan();
  let sent = 0;
  let failed = 0;
  for (const u of state.users.filter((x) => x.telegramChatId)) {
    if (await sendTo(u, digestFor(state, u, today, appUrl))) sent += 1;
    else failed += 1;
  }
  return { sent, failed };
}
