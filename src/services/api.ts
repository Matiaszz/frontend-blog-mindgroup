export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3000';


type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";


type Fetch = {
    endpoint: string,
    method: HttpMethod,
    body?: unknown
}


export async function fetchApi<T>(
  f: Fetch
): Promise<{ body: T | null; statusCode: number }> {
  const res = await fetch(`${API_URL}${f.endpoint}`, {
    method: f.method,
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: f.body ? JSON.stringify(f.body) : undefined,
  });

  let body: T | null = null;

  if (res.headers.get("content-type")?.includes("application/json")) {
    body = (await res.json()) as T;
  }

  return {
    body,
    statusCode: res.status,
  };
}