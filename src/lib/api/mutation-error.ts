import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import {
  API_OFFLINE_MESSAGE,
  API_SERVER_ERROR_MESSAGE,
} from "@/lib/api/messages";
import type { ApiEnvelope } from "@/lib/api/admin-request";

export type ApiMutationFailure = {
  ok: false;
  offline?: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

export function toApiMutationError(error: unknown): ApiMutationFailure {
  if (isConnectionError(error)) {
    return {
      ok: false,
      offline: true,
      message: API_OFFLINE_MESSAGE,
    };
  }

  if (error instanceof ApiError) {
    const body = (error as ApiError & { body?: ApiEnvelope<unknown> }).body;

    return {
      ok: false,
      message:
        body?.message ??
        (error.status >= 500
          ? API_SERVER_ERROR_MESSAGE
          : `فشل الطلب (${error.status})`),
      errors: body?.errors,
    };
  }

  return {
    ok: false,
    message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
  };
}
