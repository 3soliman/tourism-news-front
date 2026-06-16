import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";

export type ApiPermission = {
  id: number;
  name: string;
  slug: string;
};

export type ApiRole = {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  users_count?: number;
  permissions: ApiPermission[];
};

export type AdminRoleRecord = {
  id: number;
  name: string;
  slug: string;
  description: string;
  usersCount: number;
  permissionIds: number[];
  permissions: ApiPermission[];
};

export type RoleMutationResult =
  | { ok: true; data: AdminRoleRecord }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapRole(raw: ApiRole): AdminRoleRecord {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description ?? "",
    usersCount: raw.users_count ?? 0,
    permissionIds: (raw.permissions ?? []).map((item) => item.id),
    permissions: raw.permissions ?? [],
  };
}

function toMutationError(error: unknown): RoleMutationResult {
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

export async function fetchAdminRolesList(): Promise<AdminRoleRecord[]> {
  const json = await adminRequest<ApiRole[]>("/admin/roles");
  return json.data.map(mapRole);
}

export async function fetchAdminPermissionsList(): Promise<ApiPermission[]> {
  const json = await adminRequest<ApiPermission[]>("/admin/roles/permissions/list");
  return json.data;
}

export async function updateAdminRolePermissions(
  roleId: number,
  permissionIds: number[],
): Promise<RoleMutationResult> {
  try {
    const json = await adminRequest<ApiRole>(`/admin/roles/${roleId}`, {
      method: "PUT",
      body: JSON.stringify({ permission_ids: permissionIds }),
    });

    return { ok: true, data: mapRole(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}
