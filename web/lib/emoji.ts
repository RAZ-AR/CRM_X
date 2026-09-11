export const EMOJIS = ["💪", "🔥", "✅", "❤️", "👏", "🎯", "🚀", "⚠️", "😊", "🙌"];

export const FOUR_DAYS = 4 * 24 * 60 * 60 * 1000;

export function noticeVisible(n: { read: boolean; readAt?: string }) {
  if (!n.read || !n.readAt) return true;
  return Date.now() - new Date(n.readAt).getTime() < FOUR_DAYS;
}
