import { apiFetch, isNotFoundError } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import type { ApiPage, TrustPage } from "@/types";

export const TRUST_PAGE_ROUTES = [
  { slug: "about", label: "من نحن", path: "/about" },
  { slug: "contact", label: "اتصل بنا", path: "/contact" },
  { slug: "editorial-team", label: "هيئة التحرير", path: "/editorial-team" },
  { slug: "editorial-policy", label: "سياسة التحرير", path: "/editorial-policy" },
  { slug: "privacy-policy", label: "سياسة الخصوصية", path: "/privacy-policy" },
  { slug: "terms-of-use", label: "شروط الاستخدام", path: "/terms" },
] as const;

export type TrustPageSlug = (typeof TRUST_PAGE_ROUTES)[number]["slug"];

export function mapTrustPage(raw: ApiPage): TrustPage {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    description: raw.description ?? "",
    content: raw.content ?? "",
    isPublished: raw.is_published ?? true,
    seoTitle: raw.seo?.title ?? raw.title,
    seoDescription: raw.seo?.description ?? raw.description ?? "",
    websiteUrl: raw.links?.website,
  };
}

export async function fetchTrustPage(slug: string): Promise<TrustPage | null> {
  try {
    const raw = await apiFetch<ApiPage>(`/pages/${slug}`);
    return mapTrustPage(raw);
  } catch (error) {
    if (isNotFoundError(error)) return null;
    if (isConnectionError(error)) markApiOffline();
    return null;
  }
}

export function getTrustPagePath(slug: string) {
  return TRUST_PAGE_ROUTES.find((page) => page.slug === slug)?.path ?? `/${slug}`;
}
