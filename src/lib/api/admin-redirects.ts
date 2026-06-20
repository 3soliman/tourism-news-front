import { ApiError } from "@/lib/api/client";
import { adminRequest } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";

export type AdminRedirectRecord = {
  id: number;
  fromPath: string;
  toPath: string;
  statusCode: number;
  isActive: boolean;
  notes: string;
  hitCount: number;
  articleId: number | null;
  articleTitle: string | null;
  articleSlug: string | null;
  createdAt: string;
  updatedAt: string;
};

export type AdminRedirectFormInput = {
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: boolean;
  notes: string;
  article_id?: number | null;
};

export type AdminMutationResult<T = AdminRedirectRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

type ApiRedirect = {
  id: number;
  from_path: string;
  to_path: string;
  status_code: number;
  is_active: boolean;
  notes?: string | null;
  hit_count?: number;
  article_id?: number | null;
  article_title?: string | null;
  article_slug?: string | null;
  created_at?: string;
  updated_at?: string;
};

function mapRedirect(raw: ApiRedirect): AdminRedirectRecord {
  return {
    id: raw.id,
    fromPath: raw.from_path,
    toPath: raw.to_path,
    statusCode: raw.status_code,
    isActive: raw.is_active,
    notes: raw.notes ?? "",
    hitCount: raw.hit_count ?? 0,
    articleId: raw.article_id ?? null,
    articleTitle: raw.article_title ?? null,
    articleSlug: raw.article_slug ?? null,
    createdAt: raw.created_at ?? "",
    updatedAt: raw.updated_at ?? "",
  };
}

function toMutationError<T = AdminRedirectRecord>(
  error: unknown,
): AdminMutationResult<T> {
  return toApiMutationError(error) as AdminMutationResult<T>;
}

export async function fetchAdminRedirectsList(): Promise<AdminRedirectRecord[]> {
  const json = await adminRequest<ApiRedirect[]>("/admin/redirects");
  return json.data.map(mapRedirect);
}

export async function fetchAdminRedirectById(
  id: number,
): Promise<AdminRedirectRecord | null> {
  try {
    const json = await adminRequest<ApiRedirect>(`/admin/redirects/${id}`);
    return mapRedirect(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function fetchAdminRedirectForArticle(
  articleId: number,
): Promise<AdminRedirectRecord | null> {
  try {
    const json = await adminRequest<ApiRedirect | null>(
      `/admin/redirects/article/${articleId}`,
    );

    if (!json.data) {
      return null;
    }

    return mapRedirect(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

export async function createAdminRedirect(
  payload: AdminRedirectFormInput,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiRedirect>("/admin/redirects", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapRedirect(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminRedirect(
  id: number,
  payload: Partial<AdminRedirectFormInput>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiRedirect>(`/admin/redirects/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapRedirect(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminRedirect(id: number): Promise<AdminMutationResult<null>> {
  try {
    await adminRequest<null>(`/admin/redirects/${id}`, {
      method: "DELETE",
    });

    return { ok: true, data: null };
  } catch (error) {
    return toMutationError<null>(error);
  }
}

export async function syncArticleRedirect(payload: {
  article_id: number;
  enabled: boolean;
  target_slug: string | null;
}): Promise<AdminMutationResult<AdminRedirectRecord | null>> {
  try {
    const json = await adminRequest<ApiRedirect | null>("/admin/redirects/article", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return {
      ok: true,
      data: json.data ? mapRedirect(json.data) : null,
    };
  } catch (error) {
    return toMutationError<AdminRedirectRecord | null>(error);
  }
}
