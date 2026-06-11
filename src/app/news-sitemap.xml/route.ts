import { getRecentNews } from "@/data/news";
import { toPublicationDate } from "@/lib/news-format";
import { siteConfig } from "@/data/site";

function escapeXml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

export async function GET() {
  const recentNews = getRecentNews(48);

  const urlEntries = recentNews
    .map((article) => {
      const articleUrl = `${siteConfig.url}/travel-news/${article.slug}`;

      return `  <url>
    <loc>${escapeXml(articleUrl)}</loc>
    <news:news>
      <news:publication>
        <news:name>${escapeXml(siteConfig.name)}</news:name>
        <news:language>ar</news:language>
      </news:publication>
      <news:publication_date>${toPublicationDate(article.publishedAtISO)}</news:publication_date>
      <news:title>${escapeXml(article.title)}</news:title>
    </news:news>
  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${urlEntries}
</urlset>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
