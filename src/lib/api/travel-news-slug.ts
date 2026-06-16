import { cache } from "react";
import { fetchCategoryBySlug } from "@/lib/api/categories";
import { fetchNewsBySlug } from "@/lib/api/news";
import type { Category, NewsArticle } from "@/types";

export type TravelNewsSlugResult =
  | { kind: "category"; category: Category }
  | {
      kind: "article";
      article: NewsArticle & { related: NewsArticle[] };
    }
  | { kind: "not-found" };

export const resolveTravelNewsSlug = cache(
  async (slug: string): Promise<TravelNewsSlugResult> => {
    const category = await fetchCategoryBySlug(slug);
    if (category) {
      return { kind: "category", category };
    }

    const article = await fetchNewsBySlug(slug);
    if (article) {
      return { kind: "article", article };
    }

    return { kind: "not-found" };
  },
);
