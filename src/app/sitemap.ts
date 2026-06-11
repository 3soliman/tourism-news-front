import type { MetadataRoute } from "next";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { news } from "@/data/news";
import { siteConfig } from "@/data/site";

const baseUrl = siteConfig.url;

const trustPages = [
  "/about",
  "/contact",
  "/editorial-team",
  "/editorial-policy",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const articleUrls = news.map((article) => ({
    url: `${baseUrl}/travel-news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/travel-news/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const authorUrls = authors.map((author) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const trustPageUrls = trustPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/travel-news`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...trustPageUrls,
    ...authorUrls,
    ...categoryUrls,
    ...articleUrls,
  ];
}
