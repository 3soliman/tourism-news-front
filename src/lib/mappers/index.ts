import { resolveMediaUrl } from "@/lib/media-url";
import {
  ApiAuthor,
  ApiCategory,
  ApiCountry,
  ApiDestination,
  ApiNewsArticle,
  ApiSiteSettings,
  Author,
  Category,
  Country,
  Destination,
  NewsArticle,
  SiteConfig,
} from "@/types";

function formatPublishedAt(iso?: string): string {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function mapNewsArticle(raw: ApiNewsArticle): NewsArticle {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category ?? "",
    categorySlug: raw.category_slug ?? "",
    countrySlug: raw.country_slug ?? "",
    countryName: raw.country,
    countryFlag: raw.country_flag,
    destination: raw.destination,
    authorSlug: raw.author_slug ?? "",
    authorName: raw.author ?? "",
    image: resolveMediaUrl(raw.image),
    publishedAt: formatPublishedAt(raw.published_at_iso),
    publishedAtISO: raw.published_at_iso ?? "",
    updatedAtISO: raw.updated_at_iso ?? "",
    readingTime: raw.reading_time ?? "",
    seoTitle: raw.seo?.title ?? raw.title,
    seoDescription: raw.seo?.description ?? raw.excerpt,
    keywords: raw.seo?.keywords ?? [],
    content:
      raw.content_paragraphs?.length
        ? raw.content_paragraphs
        : raw.content
          ? raw.content.split(/\n{2,}/).map((part) => part.trim()).filter(Boolean)
          : [],
    viewsCount: raw.views_count ?? 0,
  };
}

export function mapNewsArticles(items: ApiNewsArticle[]): NewsArticle[] {
  return items.map(mapNewsArticle);
}

export function mapCategory(raw: ApiCategory): Category {
  return {
    id: raw.id,
    slug: raw.slug,
    label: raw.name,
    description: raw.description ?? "",
  };
}

export function mapCategories(items: ApiCategory[]): Category[] {
  return items.map(mapCategory);
}

export function mapAuthor(raw: ApiAuthor): Author {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    role: raw.role ?? "",
    image: resolveMediaUrl(raw.image ?? ""),
    bio: raw.bio ?? "",
  };
}

export function mapAuthors(items: ApiAuthor[]): Author[] {
  return items.map(mapAuthor);
}

export function mapCountry(raw: ApiCountry): Country {
  return {
    id: raw.id,
    slug: raw.slug,
    name: raw.name,
    flag: raw.flag ?? "🌍",
    image: resolveMediaUrl(raw.image),
    region: raw.region ?? "",
  };
}

export function mapCountries(items: ApiCountry[]): Country[] {
  return items.map(mapCountry);
}

export function mapDestination(raw: ApiDestination): Destination {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    country: raw.country ?? "",
    description: raw.description,
    image: raw.image,
    articlesCount: 0,
    bestTime: raw.best_time ?? "",
  };
}

export function mapDestinations(items: ApiDestination[]): Destination[] {
  return items.map(mapDestination);
}

export function mapSiteSettings(raw: ApiSiteSettings): SiteConfig {
  const flat = raw.flat ?? {};
  let backgroundImages: string[] = [];

  if (flat.background_images) {
    try {
      backgroundImages = JSON.parse(flat.background_images);
    } catch {
      backgroundImages = [];
    }
  }

  return {
    name: flat.site_name ?? "أخبار السياحة",
    description:
      flat.site_description ??
      "منصة عربية متخصصة في أخبار السياحة والسفر، الوجهات، الفنادق، ونصائح المسافرين.",
    url: process.env.NEXT_PUBLIC_SITE_URL ?? flat.site_url ?? "http://localhost:8069",
    logo: flat.site_logo ?? "/logo.svg",
    defaultImage:
      flat.default_image ??
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
    backgroundImages:
      backgroundImages.length > 0
        ? backgroundImages
            .map((url) => resolveMediaUrl(String(url)))
            .filter(Boolean)
        : [
            "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop",
          ],
    author: "فريق أخبار السياحة",
  };
}

export async function enrichArticlesWithCountries(
  articles: NewsArticle[],
): Promise<NewsArticle[]> {
  const needsEnrichment = articles.some(
    (article) => article.countrySlug && !article.countryFlag,
  );
  if (!needsEnrichment) return articles;

  const { fetchCountries } = await import("@/lib/api/countries");
  const countries = await fetchCountries();
  const bySlug = new Map(countries.map((country) => [country.slug, country]));

  return articles.map((article) => {
    if (article.countryFlag) return article;

    const country = bySlug.get(article.countrySlug);
    if (!country) return article;

    return {
      ...article,
      countryName: article.countryName || country.name,
      countryFlag: country.flag,
    };
  });
}
