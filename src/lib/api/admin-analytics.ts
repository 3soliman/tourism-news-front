import { adminRequest } from "@/lib/api/admin-request";
import type { PaginationMeta } from "@/types";

export type ArticleAnalyticsSummary = {
  total_views: number;
  views_today: number;
  articles_with_views: number;
};

export type ArticleAnalyticsListItem = {
  id: number;
  slug: string;
  title: string;
  status: string;
  category?: string;
  published_at?: string | null;
  views_count: number;
  views_today: number;
  last_viewed_at?: string | null;
};

export type ArticleAnalyticsDetail = {
  article: {
    id: number;
    slug: string;
    title: string;
    status: string;
    category?: string;
    published_at?: string | null;
  };
  stats: {
    views_count: number;
    views_today: number;
    last_viewed_at?: string | null;
  };
  recent_views: { viewed_at?: string | null }[];
  views_by_day: { day: string; total: number }[];
};

export type ArticleAnalyticsListResult = {
  summary: ArticleAnalyticsSummary;
  articles: ArticleAnalyticsListItem[];
  meta: PaginationMeta;
};

export async function fetchArticleAnalyticsList(
  page = 1,
  perPage = 20,
): Promise<ArticleAnalyticsListResult> {
  const json = await adminRequest<{
    summary: ArticleAnalyticsSummary;
    articles: ArticleAnalyticsListItem[];
  }>(`/admin/analytics/news?per_page=${perPage}&page=${page}`);

  return {
    summary: json.data.summary,
    articles: json.data.articles,
    meta: json.meta ?? {},
  };
}

export async function fetchArticleAnalyticsDetail(
  articleId: number,
): Promise<ArticleAnalyticsDetail> {
  const json = await adminRequest<ArticleAnalyticsDetail>(
    `/admin/analytics/news/${articleId}`,
  );
  return json.data;
}
