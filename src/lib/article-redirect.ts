import type { ArticleRedirectState } from "@/components/admin/ArticleRedirectFields";
import type { AdminRedirectRecord } from "@/lib/api/admin-redirects";

export function toArticleRedirectState(
  redirect: AdminRedirectRecord | null,
): ArticleRedirectState {
  if (!redirect) {
    return { enabled: false, targetSlug: "" };
  }

  const match = redirect.toPath.match(/^\/travel-news\/([^/?#]+)$/);

  return {
    enabled: redirect.isActive,
    targetSlug: match?.[1] ?? "",
  };
}
