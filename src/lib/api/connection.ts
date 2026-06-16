import { cache } from "react";
import { ApiError } from "@/lib/api/client";

type ConnectionState = {
  online: boolean;
};

export const getApiConnection = cache((): ConnectionState => ({
  online: true,
}));

export function markApiOffline() {
  getApiConnection().online = false;
}

export function isApiOnline() {
  return getApiConnection().online;
}

export function isConnectionError(error: unknown): boolean {
  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof ApiError) {
    return error.status >= 500;
  }

  if (error instanceof Error) {
    return (
      error.message.includes("fetch failed") ||
      error.message.includes("ECONNREFUSED")
    );
  }

  return false;
}
