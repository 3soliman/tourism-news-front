import { ApiError } from "@/lib/api/client";
import { ADMIN_TOKEN_COOKIE } from "@/lib/auth/constants";
import { getClientAdminToken } from "@/lib/auth/token";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

export type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: Record<string, unknown>;
  errors?: Record<string, string[]>;
};

async function resolveAdminToken(explicit?: string | null): Promise<string | null> {
  if (explicit !== undefined) {
    return explicit;
  }

  if (typeof window !== "undefined") {
    return getClientAdminToken();
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();

  return cookieStore.get(ADMIN_TOKEN_COOKIE)?.value ?? null;
}

export async function adminRequest<T>(
  path: string,
  init: RequestInit = {},
  token?: string | null,
): Promise<ApiEnvelope<T>> {
  const authToken = await resolveAdminToken(token);
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
      ...init.headers,
    },
  });

  const json = (await response.json()) as ApiEnvelope<T>;

  if (!response.ok) {
    const error = new ApiError(response.status, url);
    (error as ApiError & { body?: ApiEnvelope<T> }).body = json;
    throw error;
  }

  return json;
}
