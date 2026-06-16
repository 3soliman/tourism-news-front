import type { PaginationMeta } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

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

type FetchOptions = RequestInit;

async function request<T>(url: string, init: FetchOptions = {}): Promise<T> {
  const response = await fetch(url, {
    ...init,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...init.headers,
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

  const response = await fetch(url, {
    ...options,
    cache: "no-store",
    headers: {
      Accept: "application/json",
      ...options.headers,
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
