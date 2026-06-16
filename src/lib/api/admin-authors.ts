import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import type { AdminAuthorFormInput, ApiAuthor, Author } from "@/types";
import { resolveMediaUrl } from "@/lib/media-url";

export type AdminAuthorRecord = Author & {
  id: number;
  isActive: boolean;
  articlesCount: number;
};

export type AdminMutationResult<T = AdminAuthorRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapAdminAuthor(raw: ApiAuthor): AdminAuthorRecord {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    role: raw.role ?? "",
    image: resolveMediaUrl(raw.image ?? ""),
    bio: raw.bio ?? "",
    isActive: raw.is_active ?? true,
    articlesCount: raw.articles_count ?? 0,
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

export async function fetchAdminAuthorsList(): Promise<AdminAuthorRecord[]> {
  const json = await adminRequest<ApiAuthor[]>("/admin/authors");
  return json.data.map(mapAdminAuthor);
}

export async function fetchAdminAuthorById(
  id: number,
): Promise<AdminAuthorRecord | null> {
  try {
    const json = await adminRequest<ApiAuthor>(`/admin/authors/${id}`);
    return mapAdminAuthor(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminAuthor(
  payload: AdminAuthorFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiAuthor>("/admin/authors", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminAuthor(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminAuthor(
  id: number,
  payload: Partial<AdminAuthorFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiAuthor>(`/admin/authors/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminAuthor(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminAuthor(
  id: number,
): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/authors/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toAdminAuthorFormInput(
  author: AdminAuthorRecord,
): AdminAuthorFormInput {
  return {
    name: author.name,
    slug: author.slug,
    role: author.role,
    bio: author.bio,
    image: resolveMediaUrl(author.image),
    is_active: author.isActive,
  };
}
