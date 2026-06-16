import { ApiError } from "@/lib/api/client";
import { isConnectionError } from "@/lib/api/connection";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import type { AdminCategoryFormInput, ApiCategory, Category } from "@/types";

export type AdminCategoryRecord = Category & {
  id: number;
  sortOrder: number;
  isActive: boolean;
  articlesCount: number;
  seoTitle: string;
  seoDescription: string;
};

export type AdminMutationResult<T = AdminCategoryRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function mapAdminCategory(raw: ApiCategory): AdminCategoryRecord {
  return {
    id: raw.id,
    slug: raw.slug,
    label: raw.name,
    description: raw.description ?? "",
    sortOrder: raw.sort_order ?? 0,
    isActive: raw.is_active ?? true,
    articlesCount: raw.articles_count ?? 0,
    seoTitle: raw.seo?.title ?? "",
    seoDescription: raw.seo?.description ?? "",
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

export async function fetchAdminCategoriesList(): Promise<AdminCategoryRecord[]> {
  const json = await adminRequest<ApiCategory[]>("/admin/categories");
  return json.data.map(mapAdminCategory);
}

export async function fetchAdminCategoryById(
  id: number,
): Promise<AdminCategoryRecord | null> {
  try {
    const json = await adminRequest<ApiCategory>(`/admin/categories/${id}`);
    return mapAdminCategory(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminCategory(
  payload: AdminCategoryFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiCategory>("/admin/categories", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminCategory(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminCategory(
  id: number,
  payload: Partial<AdminCategoryFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiCategory>(`/admin/categories/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminCategory(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminCategory(
  id: number,
): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/categories/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toAdminCategoryFormInput(
  category: AdminCategoryRecord,
): AdminCategoryFormInput {
  return {
    name: category.label,
    slug: category.slug,
    description: category.description,
    sort_order: category.sortOrder,
    is_active: category.isActive,
    seo_title: category.seoTitle,
    seo_description: category.seoDescription,
  };
}

export function mapAdminCategories(items: ApiCategory[]): AdminCategoryRecord[] {
  return items.map(mapAdminCategory);
}
