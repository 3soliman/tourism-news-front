import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";

export type ApiManagedUser = {
  id: number;
  name: string;
  email: string;
  status: string;
  last_seen_at: string | null;
  roles: { id: number; name: string; slug: string }[];
  permissions: string[];
  is_super_admin: boolean;
};

export type ManagedUserRecord = {
  id: number;
  name: string;
  email: string;
  status: string;
  lastSeenAt: string | null;
  roles: { id: number; name: string; slug: string }[];
  isSuperAdmin: boolean;
};

export type ManagedUserFormInput = {
  name: string;
  email: string;
  password: string;
  status: "active" | "inactive";
  role_ids: number[];
};

export type AdminMutationResult<T = ManagedUserRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapManagedUser(raw: ApiManagedUser): ManagedUserRecord {
  return {
    id: raw.id,
    name: raw.name,
    email: raw.email,
    status: raw.status,
    lastSeenAt: raw.last_seen_at,
    roles: raw.roles ?? [],
    isSuperAdmin: raw.is_super_admin ?? false,
  };
}

function toMutationError(error: unknown): AdminMutationResult {
  if (isConnectionError(error)) {
    return {
      ok: false,
      offline: true,
      message: "تعذر الاتصال بالـ API. تأكد أن Laravel يعمل على المنفذ 8070.",
    };
  }

  if (error instanceof ApiError) {
    const body = (error as ApiError & { body?: ApiEnvelope<unknown> }).body;

    return {
      ok: false,
      message: body?.message ?? `فشل الطلب (${error.status})`,
      errors: body?.errors,
    };
  }

  return {
    ok: false,
    message: error instanceof Error ? error.message : "حدث خطأ غير متوقع",
  };
}

export async function fetchAdminUsersList(): Promise<ManagedUserRecord[]> {
  const json = await adminRequest<ApiManagedUser[]>("/admin/users");
  return json.data.map(mapManagedUser);
}

export async function fetchAdminUserById(
  id: number,
): Promise<ManagedUserRecord | null> {
  try {
    const json = await adminRequest<ApiManagedUser>(`/admin/users/${id}`);
    return mapManagedUser(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminUser(
  payload: ManagedUserFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiManagedUser>("/admin/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapManagedUser(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminUser(
  id: number,
  payload: Partial<ManagedUserFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiManagedUser>(`/admin/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapManagedUser(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminUser(
  id: number,
): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/users/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toManagedUserFormInput(
  user: ManagedUserRecord,
): ManagedUserFormInput {
  return {
    name: user.name,
    email: user.email,
    password: "",
    status: user.status === "inactive" ? "inactive" : "active",
    role_ids: user.roles.map((role) => role.id),
  };
}
