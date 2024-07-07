import https from "node:https";

import { HttpsProxyAgent } from "https-proxy-agent";
import { omitBy } from "lodash-es";

type Event = Parameters< Parameters<typeof defineEventHandler>[0]>[0];

const agent = process.env.SGP_PROXY_SERVER ? new HttpsProxyAgent(process.env.SGP_PROXY_SERVER) : undefined;

export default function doProxy(event: Event, url: string) {
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
}
