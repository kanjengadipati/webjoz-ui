/**
 * API Client Stub for webjoz-ui
 *
 * Minimal stub satisfying the type contract for design-assets-config.ts.
 * Replace with real implementation in the consuming app.
 */

export class ApiError extends Error {
  public code?: string;
  constructor(
    public statusCode: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function request<T>(
  path: string,
  options: Record<string, unknown> = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  const response = await fetch(path, {
    ...options,
    headers: { ...headers, ...((options.headers as Record<string, string>) ?? {}) },
  } as RequestInit);
  if (!response.ok) throw new ApiError(response.status, response.statusText);
  const json = await response.json();
  if (json && typeof json === "object" && "data" in json) return json.data as T;
  return json as T;
}
