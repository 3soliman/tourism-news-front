import type { MetadataRoute } from "next";
import { fetchAuthors } from "@/lib/api/authors";
import { fetchCategories } from "@/lib/api/categories";
import { fetchAllNewsSlugs } from "@/lib/api/news";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteConfig = await getSiteConfig();
  const baseUrl = siteConfig.url;

  const staticPages = [
    "",
    "/travel-news",
    "/destinations",
    "/about",
    "/contact",
    "/editorial-team",
    "/editorial-policy",
    "/privacy-policy",
    "/terms",
    "/terms-of-use",
  ];

  const [newsSlugs, categories, authors] = await Promise.all([
    fetchAllNewsSlugs(),
    fetchCategories(),
    fetchAuthors(),
  ]);

  return [
    ...staticPages.map((path) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...newsSlugs.map((slug) => ({
      url: `${baseUrl}/travel-news/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/travel-news/${category.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...authors.map((author) => ({
      url: `${baseUrl}/authors/${author.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
