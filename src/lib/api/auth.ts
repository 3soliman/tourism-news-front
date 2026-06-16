import { adminRequest } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import {
  clearClientAdminToken,
  getClientAdminToken,
  setClientAdminToken,
} from "@/lib/auth/token";
import type { AdminUser } from "@/types";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

type LoginEnvelope = {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: AdminUser;
  };
  errors?: Record<string, string[]>;
};

export type AuthResult<T = AdminUser> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function toAuthError(error: unknown): AuthResult {
  return toApiMutationError(error);
}

export async function loginAdmin(
  email: string,
  password: string,
): Promise<AuthResult<{ token: string; user: AdminUser }>> {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const json = (await response.json()) as LoginEnvelope;

    if (!response.ok) {
      return {
        ok: false,
        message: json.message ?? `فشل الطلب (${response.status})`,
        errors: json.errors,
      };
    }

    setClientAdminToken(json.data.token);

    return { ok: true, data: json.data };
  } catch (error) {
    return toAuthError(error) as AuthResult<{ token: string; user: AdminUser }>;
  }
}

export async function logoutAdmin(): Promise<AuthResult<void>> {
  try {
    const token = getClientAdminToken();

    if (token) {
      await adminRequest<null>("/logout", { method: "POST" }, token);
    }

    clearClientAdminToken();

    return { ok: true, data: undefined as void };
  } catch (error) {
    clearClientAdminToken();
    return toAuthError(error) as AuthResult<void>;
  }
}

export async function fetchAdminMe(): Promise<AdminUser | null> {
  try {
    const json = await adminRequest<AdminUser>("/me");
    return json.data;
  } catch {
    return null;
  }
}
