import type { PaginationMeta } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

const PUBLIC_REVALIDATE_SECONDS = 60;

type ApiEnvelope<T> = {
  success: boolean;
  message: string;
  data: T;
  meta?: PaginationMeta;
};

export class ApiError extends Error {
  status: number;
  url: string;

  constructor(status: number, url: string) {
    super(`API ${status}: ${url}`);
    this.name = "ApiError";
    this.status = status;
    this.url = url;
  }
}

type FetchOptions = RequestInit & {
  revalidate?: number | false;
};

const API_TIMEOUT_MS = 8_000;

async function request<T>(url: string, init: FetchOptions = {}): Promise<T> {
  const { revalidate = PUBLIC_REVALIDATE_SECONDS, ...fetchInit } = init;

  const response = await fetch(url, {
    ...fetchInit,
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
    signal: fetchInit.signal ?? AbortSignal.timeout(API_TIMEOUT_MS),
    headers: {
      Accept: "application/json",
      ...fetchInit.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, url);
  }

  const json = (await response.json()) as ApiEnvelope<T>;
  return json.data;
}

export async function apiFetch<T>(
  path: string,
  options: FetchOptions = {},
): Promise<T> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  return request<T>(url, options);
}

export async function apiFetchPaginated<T>(
  path: string,
  options: FetchOptions = {},
): Promise<{ data: T[]; meta: PaginationMeta }> {
  const url = `${API_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const { revalidate = PUBLIC_REVALIDATE_SECONDS, ...fetchInit } = options;

  const response = await fetch(url, {
    ...fetchInit,
    ...(revalidate === false
      ? { cache: "no-store" as const }
      : { next: { revalidate } }),
    signal: fetchInit.signal ?? AbortSignal.timeout(API_TIMEOUT_MS),
    headers: {
      Accept: "application/json",
      ...fetchInit.headers,
    },
  });

  if (!response.ok) {
    throw new ApiError(response.status, url);
  }

  const json = (await response.json()) as ApiEnvelope<T[]>;
  return {
    data: json.data ?? [],
    meta: json.meta ?? {},
  };
}

export function isNotFoundError(error: unknown): boolean {
  return error instanceof ApiError && error.status === 404;
}
