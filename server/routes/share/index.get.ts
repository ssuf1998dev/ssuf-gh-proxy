export default defineEventHandler(() => {
  return (Array.from(shareCache.entries()) as [string, { times: number; url: string }][]).map(([hash, value]) => {
    return { hash, ...value };
  });
});
