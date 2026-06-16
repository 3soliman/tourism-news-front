import type { Author, NewsArticle } from "@/types";
import { toPublicationDate } from "@/lib/news-format";
import type { SiteConfig } from "@/types";

export function buildNewsArticleSchema(
  article: NewsArticle,
  author: Author | null | undefined,
  siteConfig: SiteConfig,
  articleUrl?: string,
  categoryLabel?: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seoDescription,
    image: [article.image],
    datePublished: toPublicationDate(article.publishedAtISO),
    dateModified: toPublicationDate(article.updatedAtISO),
    inLanguage: "ar",
    articleSection: categoryLabel ?? article.category,
    author: {
      "@type": "Person",
      name: author?.name ?? siteConfig.author,
      ...(author?.image ? { image: author.image } : {}),
      ...(author?.slug
        ? { url: `${siteConfig.url}/authors/${author.slug}` }
        : {}),
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}${siteConfig.logo}`,
      },
    },
    ...(articleUrl
      ? {
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": articleUrl,
          },
        }
      : {}),
  };
}
