import https from "node:https";

import { HttpsProxyAgent } from "https-proxy-agent";
import { omitBy } from "lodash-es";
import { pathToRegexp } from "path-to-regexp";

const tests = [
  ...(import.meta.dev ? [pathToRegexp("https\\://github.com")] : []),
  pathToRegexp("https\\://github.com/:author/:repo/(releases|archive|blob|raw)/*"),
  pathToRegexp("https\\://github.com/:author/:repo/(info|git-)(.*)"),
  pathToRegexp("https\\://raw.(githubusercontent|github).com/:author/:repo/(.+)/*"),
  pathToRegexp("https\\://gist.(githubusercontent|github).com/:author/(.+)/*"),
];

const agent = process.env.SGP_PROXY_SERVER ? new HttpsProxyAgent(process.env.SGP_PROXY_SERVER) : undefined;

export default defineEventHandler((event) => {
  const url = event.context.params!._.startsWith("https://") ? event.context.params!._ : `https://${event.context.params!._}`;

  const pass = tests.map(test => test.test(url)).some(Boolean);

  if (!pass) {
    throw createError({ statusCode: 403 });
  }

  const { req: serverRequest, res: serverResponse } = event.node;

  const clientRequest = https.request(url, {
    method: serverRequest.method,
    headers: omitBy(serverRequest.headers, (_, key) => ["host", "referer"].includes(key.toLowerCase())),
    agent,
  }, (clientResponse) => {
    serverResponse.writeHead(clientResponse.statusCode ?? 204, clientResponse.headers);
    clientResponse.pipe(serverResponse, { end: true });
  });

  serverRequest.pipe(clientRequest, { end: true });

  return serverResponse;
});
