import { adminRequest } from "@/lib/api/admin-request";

export type AdminSeoSitemapStats = {
  sitemap_url: string;
  news_sitemap_url: string;
  robots_url: string;
  last_updated_at: string | null;
  counts: {
    total_urls: number;
    static_urls: number;
    news_urls: number;
    category_urls: number;
    author_urls: number;
    trust_page_urls: number;
  };
  news_sitemap: {
    enabled: boolean;
    window_hours: number;
    included_count: number;
    recent_window_total: number;
    last_article_published_at: string | null;
  };
};

export type AdminSeoSchemaStats = {
  valid: number;
  incomplete: number;
  disabled: number;
  total: number;
  coverage_percent: number;
};

export type AdminSeoReadinessCheck = {
  key: string;
  label: string;
  passed: boolean;
};

export type AdminSeoRecentArticle = {
  id: number;
  slug: string;
  title: string;
  category: string | null;
  published_at: string | null;
  is_google_news_enabled: boolean;
  google_news_status: string | null;
  schema_status: string | null;
  url: string;
};

export type AdminSeoTrustPage = {
  id: number;
  slug: string;
  title: string;
  is_published: boolean;
  url: string;
};

export type AdminSeoOverview = {
  sitemaps: AdminSeoSitemapStats;
  schema: AdminSeoSchemaStats;
  google_news: {
    publisher: {
      name: string;
      language: string;
      publisher_id: string | null;
      channel_url: string | null;
      status: "configured" | "partial" | "not_configured";
    };
    articles: {
      enabled: number;
      pending: number;
      eligible: number;
      published: number;
      rejected: number;
    };
    recent_window: {
      hours: number;
      total: number;
      eligible: number;
      in_news_sitemap: number;
    };
    recent_articles: AdminSeoRecentArticle[];
    last_sync_at: string | null;
    readiness_checks: AdminSeoReadinessCheck[];
    readiness_score: number;
  };
  trust_pages: AdminSeoTrustPage[];
};

export async function fetchAdminSeoOverview(): Promise<AdminSeoOverview> {
  const json = await adminRequest<AdminSeoOverview>("/admin/seo/overview");
  return json.data;
}
