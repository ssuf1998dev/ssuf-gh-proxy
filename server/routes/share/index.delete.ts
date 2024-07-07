export default defineEventHandler(() => {
  const hash = Array.from(shareCache.keys());
  shareCache.clear();
  return { hash };
});
