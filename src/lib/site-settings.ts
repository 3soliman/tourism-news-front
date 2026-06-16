import { apiFetch } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";

type ApiSiteSettings = {
  flat?: Record<string, string>;
};

const DEFAULTS = {
  news_sitemap_enabled: true,
  news_sitemap_window_hours: 48,
  google_news_publication_name: "أخبار السياحة",
  google_news_language: "ar",
};

export const SiteSettings = {
  async get(key: keyof typeof DEFAULTS): Promise<string | boolean | number> {
    try {
      const data = await apiFetch<ApiSiteSettings>("/site-settings");
      const value = data.flat?.[key];

      if (value === undefined || value === "") {
        return DEFAULTS[key];
      }

      if (key === "news_sitemap_enabled") {
        return value === "1" || value === "true";
      }

      if (key === "news_sitemap_window_hours") {
        return Number(value) || DEFAULTS.news_sitemap_window_hours;
      }

      return value;
    } catch (error) {
      if (isConnectionError(error)) markApiOffline();
      return DEFAULTS[key];
    }
  },

  async isNewsSitemapEnabled(): Promise<boolean> {
    return (await this.get("news_sitemap_enabled")) as boolean;
  },

  async getWindowHours(): Promise<number> {
    return (await this.get("news_sitemap_window_hours")) as number;
  },

  async getPublicationName(): Promise<string> {
    return (await this.get("google_news_publication_name")) as string;
  },

  async getLanguage(): Promise<string> {
    return (await this.get("google_news_language")) as string;
  },
};
