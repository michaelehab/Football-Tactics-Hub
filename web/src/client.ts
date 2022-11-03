export const HOST = "http://localhost:3001";

export async function callEndpoint<Request, Response>(
  url: string,
  method: "get" | "post" | "delete",
  request: Request
): Promise<Response> {
  const response = await fetch(`${HOST}${url}`, {
    method: method,
    body: method === "get" ? undefined : JSON.stringify(request),
  });
  if (!response.ok) {
    let msg = (await response.json()).error;
    throw msg;
  }
  return (await response.json()) as Response;
}
