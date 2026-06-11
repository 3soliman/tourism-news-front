import type { Author } from "@/data/authors";
import type { NewsArticle } from "@/data/news";
import { toPublicationDate } from "@/lib/news-format";
import { siteConfig } from "@/lib/site";

export function buildNewsArticleSchema(
  article: NewsArticle,
  author?: Author,
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
