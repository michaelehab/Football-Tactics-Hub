import { Endpoint } from "@footballtacticshub/shared";
import { getLocalStorageJWT, isLoggedIn } from "./auth";

const HOST = "http://localhost:3001";

export const replaceParams = (
  endpoint: Endpoint,
  ...params: string[]
): Endpoint => {
  let url = endpoint.url;
  const placeholders = url.match(/:[^\/]*/g) || [];
  if (placeholders.length !== params.length) {
    throw `Too ${
      placeholders.length < params.length ? "many" : "few"
    } params for url: ${url}!`;
  }
  for (let index = 0; index < params.length; index++) {
    url = url.replace(placeholders[index], params[index]);
  }
  return {
    url: url,
    method: endpoint.method,
    auth: endpoint.auth,
  } as Endpoint;
};

export async function callEndpoint<Request, Response>(
  endpoint: Endpoint,
  request?: Request
): Promise<Response> {
  const { url, method, auth } = endpoint;
  const requestBody = request ? JSON.stringify(request) : undefined;
  const response = await fetch(`${HOST}${url}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      ...((auth || isLoggedIn()) && {
        Authorization: `Bearer ${getLocalStorageJWT()}`,
      }),
    },
    body: requestBody,
  });
  if (!response.ok) {
    let msg = (await response.json()).error;
    throw msg;
  }
  const isJson = response.headers
    .get("content-type")
    ?.includes("application/json");
  return isJson ? ((await response.json()) as Response) : ({} as Response);
}
