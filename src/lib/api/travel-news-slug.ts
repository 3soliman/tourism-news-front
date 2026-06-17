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
    const [category, article] = await Promise.all([
      fetchCategoryBySlug(slug),
      fetchNewsBySlug(slug),
    ]);

    if (category) {
      return { kind: "category", category };
    }

    if (article) {
      return { kind: "article", article };
    }

    return { kind: "not-found" };
  },
);
