import { ApiError } from "@/lib/api/client";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import type { AdminPageFormInput, ApiPage, TrustPage } from "@/types";
import { mapTrustPage } from "@/lib/api/pages";

export type AdminMutationResult<T = TrustPage> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

function toPayload(input: AdminPageFormInput) {
  return {
    title: input.title,
    description: input.description,
    content: input.content,
    is_published: input.isPublished,
    seo_title: input.seoTitle,
    seo_description: input.seoDescription,
  };
}

function toMutationError(error: unknown): AdminMutationResult {
  return toApiMutationError(error);
}

export function toAdminPageFormInput(page: TrustPage): AdminPageFormInput {
  return {
    title: page.title,
    description: page.description,
    content: page.content,
    isPublished: page.isPublished,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
  };
}

export async function fetchAdminPagesList(): Promise<TrustPage[]> {
  const json = await adminRequest<ApiPage[]>("/admin/pages");
  return json.data.map(mapTrustPage);
}

export async function fetchAdminPageBySlug(slug: string): Promise<TrustPage | null> {
  try {
    const json = await adminRequest<ApiPage>(`/admin/pages/${slug}`);
    return mapTrustPage(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function updateAdminPage(
  slug: string,
  payload: AdminPageFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiPage>(`/admin/pages/${slug}`, {
      method: "PUT",
      body: JSON.stringify(toPayload(payload)),
    });

    return { ok: true, data: mapTrustPage(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}
