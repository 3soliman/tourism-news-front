import { fetchRecentNews } from "@/lib/api/news";
import { getSiteConfig } from "@/lib/site";
import { SiteSettings } from "@/lib/site-settings";

export const dynamic = "force-dynamic";

export async function GET() {
  const [siteConfig, windowHours, newsSitemapEnabled] = await Promise.all([
    getSiteConfig(),
    SiteSettings.getWindowHours(),
    SiteSettings.isNewsSitemapEnabled(),
  ]);

  if (!newsSitemapEnabled) {
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
</urlset>`;

    return new Response(xml, {
      headers: { "Content-Type": "application/xml; charset=utf-8" },
    });
  }

  const publicationName =
    (await SiteSettings.getPublicationName()) || siteConfig.name;
  const language = (await SiteSettings.getLanguage()) || "ar";

  const recentNews = await fetchRecentNews(windowHours, true);

  const urls = recentNews
    .map((article) => {
      const loc = `${siteConfig.url}/travel-news/${article.slug}`;
      return `
  <url>
    <loc>${loc}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(publicationName)}</news:name>
        <news:language>${language}</news:language>
      </news:publication>
      <news:publication_date>${article.publishedAtISO}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">${urls}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}
