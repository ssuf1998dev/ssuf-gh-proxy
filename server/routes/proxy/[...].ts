import doProxy from "~/server/utils/do-proxy";
import urlTests from "~/utils/url-tests";

export default defineEventHandler((event) => {
  const url = event.context.params!._.startsWith("https://") ? event.context.params!._ : `https://${event.context.params!._}`;

  const pass = urlTests.map(test => test.test(url)).some(Boolean);

  if (!pass) {
    throw createError({ statusCode: 403 });
  }

  return doProxy(event, url);
});
