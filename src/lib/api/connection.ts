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
  if (error instanceof ApiError) {
    return false;
  }

  if (error instanceof TypeError) {
    return true;
  }

  if (error instanceof Error) {
    if (error.name === "AbortError" || error.name === "TimeoutError") {
      return true;
    }

    return (
      error.message.includes("fetch failed") ||
      error.message.includes("ECONNREFUSED") ||
      error.message.includes("timed out") ||
      error.message.includes("Failed to fetch")
    );
  }

  return false;
}
