export async function adminFetch<T = unknown>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  const method = (init.method ?? "GET").toUpperCase();
  const headers = new Headers(init.headers);
  let body = init.body;

  if (method !== "GET" && method !== "HEAD") {
    const csrf = await fetch("/api/auth/csrf", {
      cache: "no-store",
      credentials: "include",
    });
    if (!csrf.ok) throw new Error("Unable to start a secure session");
    const csrfBody = (await csrf.json()) as { csrfToken?: string };
    if (!csrfBody.csrfToken) throw new Error("CSRF token is missing");
    headers.set("X-CSRF-Token", csrfBody.csrfToken);
  }

  if (body && !(body instanceof FormData) && !headers.has("content-type")) {
    headers.set("content-type", "application/json");
    if (typeof body !== "string") body = JSON.stringify(body);
  }

  const response = await fetch(`/api/${path.replace(/^\//, "")}`, {
    ...init,
    method,
    headers,
    body,
    credentials: "include",
    cache: "no-store",
  });
  const responseBody = response.status === 204 ? null : await response.json().catch(() => null);
  if (!response.ok) {
    const message = Array.isArray(responseBody?.message)
      ? responseBody.message.join(", ")
      : responseBody?.message ?? "Request failed";
    throw new Error(message);
  }
  return responseBody as T;
}
