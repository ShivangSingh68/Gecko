export const isOwner = (id: number): boolean => {
   return String(id) === process.env.TELEGRAM_OWNER_ID?.trim();
}