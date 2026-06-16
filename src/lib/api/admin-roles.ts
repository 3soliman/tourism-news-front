import { ApiError } from "@/lib/api/client";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";

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

export type AdminRoleCreatePayload = {
  name: string;
  slug: string;
  description?: string | null;
  permission_ids: number[];
};

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
  return toApiMutationError(error);
}

export async function fetchAdminRolesList(): Promise<AdminRoleRecord[]> {
  const json = await adminRequest<ApiRole[]>("/admin/roles");
  return json.data.map(mapRole);
}

export async function fetchAdminPermissionsList(): Promise<ApiPermission[]> {
  const json = await adminRequest<ApiPermission[]>("/admin/roles/permissions/list");
  return json.data;
}

export async function createAdminRole(
  payload: AdminRoleCreatePayload,
): Promise<RoleMutationResult> {
  try {
    const json = await adminRequest<ApiRole>("/admin/roles", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapRole(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminRole(
  roleId: number,
): Promise<{ ok: true } | { ok: false; message: string }> {
  try {
    await adminRequest<null>(`/admin/roles/${roleId}`, {
      method: "DELETE",
    });

    return { ok: true };
  } catch (error) {
    const result = toMutationError(error);
    if (result.ok) {
      return { ok: false, message: "حدث خطأ غير متوقع" };
    }
    return { ok: false, message: result.message };
  }
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
