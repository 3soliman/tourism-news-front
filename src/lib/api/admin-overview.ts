import { adminRequest } from "@/lib/api/admin-request";
import { mapAdminNewsRecord } from "@/lib/api/admin-news";
import type { ApiAdminNewsArticle } from "@/types";

export type AdminOverviewNewsStats = {
  published: number;
  draft: number;
  scheduled: number;
  total: number;
};

export type AdminOverviewRankedCountry = {
  id: number;
  name: string;
  slug: string;
  flag?: string;
  articles_count: number;
};

export type AdminOverviewRankedCategory = {
  id: number;
  name: string;
  slug: string;
  articles_count: number;
};

export type AdminOverviewViewsStats = {
  total_views: number;
  views_today: number;
};

export type AdminOverviewTopViewedArticle = {
  id: number;
  title: string;
  slug: string;
  category?: string;
  views_count: number;
  last_viewed_at?: string | null;
};

export type AdminOverviewData = {
  news: AdminOverviewNewsStats;
  countries_count: number;
  categories_count: number;
  seo_average: number;
  views: AdminOverviewViewsStats;
  latest_news: ReturnType<typeof mapAdminNewsRecord>[];
  top_by_views: AdminOverviewTopViewedArticle[];
  top_countries: AdminOverviewRankedCountry[];
  top_categories: AdminOverviewRankedCategory[];
};

export async function fetchAdminOverview(): Promise<AdminOverviewData> {
  const json = await adminRequest<{
    news: AdminOverviewNewsStats;
    countries_count: number;
    categories_count: number;
    seo_average: number;
    views: AdminOverviewViewsStats;
    latest_news: ApiAdminNewsArticle[];
    top_by_views: AdminOverviewTopViewedArticle[];
    top_countries: AdminOverviewRankedCountry[];
    top_categories: AdminOverviewRankedCategory[];
  }>("/admin/overview");

  return {
    ...json.data,
    latest_news: json.data.latest_news.map(mapAdminNewsRecord),
  };
}
