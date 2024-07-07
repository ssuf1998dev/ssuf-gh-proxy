export default defineEventHandler((event) => {
  const hash = getRouterParam(event, "hash");
  const shared = shareCache.get<{ times: number; url: string } | undefined>(hash);

  if (!shared) {
    throw createError({ statusCode: 404 });
  }

  if (shared.times >= 3 || !shared.url) {
    shareCache.delete(hash);
    throw createError({ statusCode: 404 });
  }

  const url = shared.url.startsWith("https://") ? shared.url : `https://${shared.url}`;
  const resp = doProxy(event, url);
  shared.times += 1;
  return resp;
});
