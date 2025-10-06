export const TELEGRAM_BOT_USERNAME = "avazcoder_bot"; // set by user

export function buildTelegramBuyLink(courseId: number, courseTitle?: string) {
  const payload = `buy_${courseId}`;
  return `https://t.me/${TELEGRAM_BOT_USERNAME}?start=${encodeURIComponent(payload)}`;
}
