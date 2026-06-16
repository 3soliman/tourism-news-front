import type { MetadataRoute } from "next";
import { getSiteConfig } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteConfig = await getSiteConfig();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/"],
    },
    sitemap: [`${siteConfig.url}/sitemap.xml`, `${siteConfig.url}/news-sitemap.xml`],
    host: siteConfig.url,
  };
}
