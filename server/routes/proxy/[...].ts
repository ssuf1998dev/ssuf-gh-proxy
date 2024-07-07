import https from "node:https";

import { HttpsProxyAgent } from "https-proxy-agent";
import { omitBy } from "lodash-es";

import urlTests from "~/utils/url-tests";

const agent = process.env.SGP_PROXY_SERVER ? new HttpsProxyAgent(process.env.SGP_PROXY_SERVER) : undefined;

export default defineEventHandler((event) => {
  const url = event.context.params!._.startsWith("https://") ? event.context.params!._ : `https://${event.context.params!._}`;

  const pass = urlTests.map(test => test.test(url)).some(Boolean);

  if (!pass) {
    throw createError({ statusCode: 403 });
  }

  const { req: serverRequest, res: serverResponse } = event.node;

  const clientRequest = https.request(url, {
    method: serverRequest.method,
    headers: omitBy(serverRequest.headers, (_, key) => ["host", "referer"].includes(key.toLowerCase())),
    agent,
  }, (clientResponse) => {
    const statusCode = clientResponse.statusCode ?? 204;
    if (statusCode.toString().startsWith("3") && !!clientResponse.headers.location) {
      clientResponse.headers.location = `${(serverRequest.headers.referer || "/").replace(/\/$/, "")}/proxy/${clientResponse.headers.location}`;
    }

    serverResponse.writeHead(statusCode, clientResponse.headers);
    clientResponse.pipe(serverResponse, { end: true });
  });

  serverRequest.pipe(clientRequest, { end: true });

  return serverResponse;
});
