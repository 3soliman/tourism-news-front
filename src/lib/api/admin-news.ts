import { ApiError } from "@/lib/api/client";
import { adminRequest, type ApiEnvelope } from "@/lib/api/admin-request";
import { toApiMutationError } from "@/lib/api/mutation-error";
import {
  mapNewsArticle,
} from "@/lib/mappers";
import type {
  AdminNewsCreatePayload,
  AdminNewsFormInput,
  AdminNewsPayload,
  ApiAdminNewsArticle,
  NewsArticle,
  PaginationMeta,
} from "@/types";
import { resolveMediaUrl, toStoredMediaPath } from "@/lib/media-url";
import { isoToDatetimeLocalValue } from "@/lib/datetime-local";

type AdminNewsEnvelope<T> = ApiEnvelope<T> & {
  meta?: PaginationMeta;
};

export type AdminNewsRecord = NewsArticle & {
  status: string;
  categoryId: number;
  authorId: number;
  countryId: number | null;
  focusKeyword: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  robotsIndex: boolean;
  robotsFollow: boolean;
  schemaStatus: string;
  isGoogleNewsEnabled: boolean;
  googleNewsStatus: string;
  viewsCount: number;
  viewsToday: number;
  lastViewedAt: string | null;
};

export type AdminMutationResult<T = AdminNewsRecord> =
  | { ok: true; data: T }
  | { ok: false; offline?: boolean; message: string; errors?: Record<string, string[]> };

export function mapAdminNewsRecord(raw: ApiAdminNewsArticle): AdminNewsRecord {
  const mapped = mapNewsArticle(raw);
  const seo = raw.seo ?? {};

  return {
    ...mapped,
    seoTitle: seo.title ?? mapped.seoTitle,
    seoDescription: seo.description ?? mapped.seoDescription,
    keywords: seo.keywords ?? mapped.keywords,
    status: raw.status ?? "draft",
    categoryId: raw.category_id ?? 0,
    authorId: raw.author_id ?? 0,
    countryId: raw.country_id ?? null,
    focusKeyword: seo.focus_keyword ?? "",
    canonicalUrl: seo.canonical_url ?? "",
    ogTitle: seo.og_title ?? seo.title ?? mapped.seoTitle,
    ogDescription: seo.og_description ?? seo.description ?? mapped.seoDescription,
    ogImage: resolveMediaUrl(seo.og_image ?? mapped.image),
    robotsIndex: seo.robots_index ?? true,
    robotsFollow: seo.robots_follow ?? true,
    schemaStatus: seo.schema_status ?? "incomplete",
    isGoogleNewsEnabled: seo.google_news_enabled ?? raw.google_news?.enabled ?? true,
    googleNewsStatus: seo.google_news_status ?? raw.google_news?.status ?? "pending",
    viewsCount: raw.analytics?.views_count ?? 0,
    viewsToday: raw.analytics?.views_today ?? 0,
    lastViewedAt: raw.analytics?.last_viewed_at ?? null,
  };
}

export type AdminNewsListQuery = {
  per_page?: number;
  page?: number;
  search?: string;
  status?: string;
  category?: string;
  country?: string;
  author?: string;
};

function buildAdminNewsQuery(query: AdminNewsListQuery = {}) {
  const params = new URLSearchParams();

  if (query.per_page) params.set("per_page", String(query.per_page));
  if (query.page) params.set("page", String(query.page));
  if (query.search) params.set("search", query.search);
  if (query.status) params.set("status", query.status);
  if (query.category) params.set("category", query.category);
  if (query.country) params.set("country", query.country);
  if (query.author) params.set("author", query.author);

  const qs = params.toString();
  return qs ? `/admin/news?${qs}` : "/admin/news";
}

export async function fetchAdminNewsList(query: AdminNewsListQuery = {}) {
  const json = await adminRequest<ApiAdminNewsArticle[]>(
    buildAdminNewsQuery(query),
  ) as AdminNewsEnvelope<ApiAdminNewsArticle[]>;

  const articles = json.data.map((item) => mapAdminNewsRecord(item));

  return {
    articles,
    meta: json.meta ?? {},
  };
}

export async function fetchAdminNewsById(id: number): Promise<AdminNewsRecord | null> {
  try {
    const json = await adminRequest<ApiAdminNewsArticle>(`/admin/news/${id}`);
    return mapAdminNewsRecord(json.data);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }

    throw error;
  }
}

function toMutationError(error: unknown): AdminMutationResult {
  return toApiMutationError(error);
}

export async function createAdminNews(
  payload: AdminNewsCreatePayload,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiAdminNewsArticle>("/admin/news", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminNewsRecord(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function updateAdminNews(
  id: number,
  payload: Partial<AdminNewsPayload>,
): Promise<AdminMutationResult> {
  try {
    const json = await adminRequest<ApiAdminNewsArticle>(`/admin/news/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });

    return { ok: true, data: mapAdminNewsRecord(json.data) };
  } catch (error) {
    return toMutationError(error);
  }
}

export async function deleteAdminNews(id: number): Promise<AdminMutationResult<void>> {
  try {
    await adminRequest<null>(`/admin/news/${id}`, { method: "DELETE" });
    return { ok: true, data: undefined as void };
  } catch (error) {
    return toMutationError(error) as AdminMutationResult<void>;
  }
}

export function toAdminNewsFormInput(article: AdminNewsRecord): AdminNewsFormInput {
  return {
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    content_paragraphs: article.content,
    category_id: article.categoryId,
    author_id: article.authorId,
    country_id: article.countryId,
    image: toStoredMediaPath(article.image),
    destination: article.destination ?? "",
    status: article.status,
    published_at: article.publishedAtISO
      ? isoToDatetimeLocalValue(article.publishedAtISO)
      : "",
    reading_time: article.readingTime,
    seo_title: article.seoTitle,
    seo_description: article.seoDescription,
    focus_keyword: article.focusKeyword,
    keywords: article.keywords,
    canonical_url: article.canonicalUrl,
    og_title: article.ogTitle,
    og_description: article.ogDescription,
    og_image: toStoredMediaPath(article.ogImage),
    robots_index: article.robotsIndex,
    robots_follow: article.robotsFollow,
    schema_status: article.schemaStatus,
    is_google_news_enabled: article.isGoogleNewsEnabled,
    google_news_status: article.googleNewsStatus,
  };
}

export function buildNewsPayload(
  form: AdminNewsFormInput,
  options?: { forCreate?: boolean },
): AdminNewsPayload | AdminNewsCreatePayload {
  const paragraphs = form.content_paragraphs.length
    ? form.content_paragraphs
    : [""];

  const payload: AdminNewsPayload = {
    ...form,
    image: toStoredMediaPath(form.image),
    og_image: toStoredMediaPath(form.og_image),
    content_paragraphs: paragraphs.filter((paragraph) => paragraph.trim() !== ""),
    country_id: form.country_id || null,
    published_at: form.published_at
      ? new Date(form.published_at).toISOString()
      : null,
    keywords: form.keywords.filter(Boolean),
  };

  if (options?.forCreate) {
    const { author_id: _authorId, ...createPayload } = payload;
    return createPayload;
  }

  return payload;
}
