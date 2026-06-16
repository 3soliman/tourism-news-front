import { cache } from "react";
import { apiFetch, apiFetchPaginated, isNotFoundError } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import {
  enrichArticlesWithCountries,
  mapNewsArticle,
  mapNewsArticles,
} from "@/lib/mappers";
import type { ApiNewsArticle, NewsArticle, PaginationMeta } from "@/types";

type NewsQuery = {
  per_page?: number;
  page?: number;
  category?: string;
  country?: string;
  author?: string;
  search?: string;
  recent_hours?: number;
  google_news_only?: boolean;
};

function buildNewsQuery(query: NewsQuery = {}) {
  const params = new URLSearchParams();

  if (query.per_page) params.set("per_page", String(query.per_page));
  if (query.page) params.set("page", String(query.page));
  if (query.category) params.set("category", query.category);
  if (query.country) params.set("country", query.country);
  if (query.author) params.set("author", query.author);
  if (query.search) params.set("search", query.search);
  if (query.recent_hours) params.set("recent_hours", String(query.recent_hours));
  if (query.google_news_only) params.set("google_news_only", "1");

  const qs = params.toString();
  return qs ? `/news?${qs}` : "/news";
}

const loadNews = cache(async (path: string): Promise<NewsArticle[]> => {
  try {
    const { data } = await apiFetchPaginated<ApiNewsArticle>(path);
    return enrichArticlesWithCountries(mapNewsArticles(data));
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
});

const loadNewsPaginated = cache(
  async (
    path: string,
  ): Promise<{ articles: NewsArticle[]; meta: PaginationMeta }> => {
    try {
      const { data, meta } = await apiFetchPaginated<ApiNewsArticle>(path);

      return {
        articles: await enrichArticlesWithCountries(mapNewsArticles(data)),
        meta,
      };
    } catch (error) {
      if (isConnectionError(error)) markApiOffline();
      return { articles: [], meta: {} as PaginationMeta };
    }
  },
);

const loadNewsBySlug = cache(
  async (
    slug: string,
  ): Promise<(NewsArticle & { related: NewsArticle[] }) | null> => {
    try {
      const article = await apiFetch<ApiNewsArticle>(`/news/${slug}`);
      const mapped = mapNewsArticle(article);
      const related = mapNewsArticles(article.related ?? []);
      const [enriched, enrichedRelated] = await Promise.all([
        enrichArticlesWithCountries([mapped]),
        enrichArticlesWithCountries(related),
      ]);
      return { ...(enriched[0] ?? mapped), related: enrichedRelated };
    } catch (error) {
      if (isNotFoundError(error)) return null;
      if (isConnectionError(error)) markApiOffline();
      return null;
    }
  },
);

export async function fetchNews(query: NewsQuery = {}): Promise<NewsArticle[]> {
  return loadNews(buildNewsQuery(query));
}

export async function fetchNewsPaginated(query: NewsQuery = {}) {
  const path = buildNewsQuery(query);
  const { articles, meta } = await loadNewsPaginated(path);
  return { articles, meta };
}

export async function fetchNewsBySlug(
  slug: string,
): Promise<(NewsArticle & { related: NewsArticle[] }) | null> {
  return loadNewsBySlug(slug);
}

export async function fetchNewsByCategory(
  categorySlug: string,
  perPage = 24,
): Promise<NewsArticle[]> {
  return fetchNews({ category: categorySlug, per_page: perPage });
}

export async function fetchNewsByAuthor(
  authorSlug: string,
  perPage = 24,
): Promise<NewsArticle[]> {
  return fetchNews({ author: authorSlug, per_page: perPage });
}

export async function fetchNewsByCountry(
  countrySlug: string,
  perPage = 24,
): Promise<NewsArticle[]> {
  return fetchNews({ country: countrySlug, per_page: perPage });
}

export async function fetchRecentNews(hours = 48, googleNewsOnly = false): Promise<NewsArticle[]> {
  return fetchNews({ recent_hours: hours, per_page: 100, google_news_only: googleNewsOnly });
}

export async function fetchAllNewsSlugs(): Promise<string[]> {
  try {
    const { articles, meta } = await fetchNewsPaginated({ per_page: 100 });
    const slugs = articles.map((item) => item.slug);

    if ((meta.last_page ?? 1) > 1) {
      for (let page = 2; page <= (meta.last_page ?? 1); page++) {
        const next = await fetchNewsPaginated({ per_page: 100, page });
        slugs.push(...next.articles.map((item) => item.slug));
      }
    }

    return slugs;
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
}

export function getPopularNews(articles: NewsArticle[], limit = 5) {
  return [...articles]
    .sort((a, b) => b.publishedAtISO.localeCompare(a.publishedAtISO))
    .slice(0, limit);
}

export async function recordArticleView(slug: string): Promise<void> {
  try {
    await apiFetch<{ recorded: boolean; views_count: number }>(`/news/${slug}/view`, {
      method: "POST",
    });
  } catch {
    // تتبع صامت — لا يؤثر على تجربة القارئ
  }
}
