export default defineEventHandler((event) => {
  const hash = getRouterParam(event, "hash");
  const shared = shareCache.has(hash);

  if (!shared) {
    throw createError({ statusCode: 404 });
  }

  shareCache.delete(hash);
  return { hash };
});
