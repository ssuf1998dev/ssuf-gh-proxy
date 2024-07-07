import crypto from "node:crypto";

import { z } from "zod";
import { nanoid } from "nanoid";

import urlTests from "~/utils/url-tests";

const schema = z.object({
  url: z.string().refine((value) => {
    return urlTests.map(test => test.test(value)).some(Boolean);
  }),
});

export default defineEventHandler(async (event) => {
  const result = await readValidatedBody(event, body => schema.safeParse(body));

  if (!result.success) {
    throw createError({ statusCode: 403, message: JSON.stringify(result.error.issues) });
  }

  const url = result.data.url;
  const hash = crypto.createHash("sha256").update(`${nanoid()}:${url}`).digest("hex");

  if (shareCache.has(hash)) {
    throw createError({ statusCode: 400 });
  }

  shareCache.set(hash, { times: 0, url });
  return { hash };
});
