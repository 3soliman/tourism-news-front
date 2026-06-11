import Link from "next/link";
import { getCountryBySlug } from "@/data/countries";
import type { NewsArticle } from "@/data/news";

type NewsCardProps = {
  article: NewsArticle;
  variant?: "vertical" | "horizontal" | "compact";
};

export default function NewsCard({
  article,
  variant = "vertical",
}: NewsCardProps) {
  const country = getCountryBySlug(article.countrySlug);

  if (variant === "horizontal") {
    return (
      <article className="group grid grid-cols-[108px_1fr] gap-4 border-b border-border py-4 last:border-0 sm:grid-cols-[150px_1fr]">
        <Link
          href={`/travel-news/${article.slug}`}
          className="image-shine relative block aspect-[4/3] overflow-hidden rounded-sm bg-surface-alt"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              href={`/travel-news/${article.categorySlug}`}
              className="text-[11px] font-black text-breaking"
            >
              {article.category}
            </Link>
            {country ? (
              <Link
                href={`/travel-news?country=${country.slug}`}
                className="text-[11px] font-black text-primary"
              >
                {country.flag} {country.name}
              </Link>
            ) : null}
          </div>
          <Link href={`/travel-news/${article.slug}`}>
            <h3 className="mt-1 line-clamp-2 text-base font-black leading-7 text-text-dark transition hover:text-primary">
              {article.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-muted">
            {article.excerpt}
          </p>
          <p className="mt-2 text-[11px] font-semibold text-text-muted">
            {article.publishedAt} · {article.readingTime}
          </p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-border py-3 last:border-0">
        <Link
          href={`/travel-news/${article.categorySlug}`}
          className="text-xs font-bold text-primary"
        >
          {article.category}
        </Link>
        <Link href={`/travel-news/${article.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-6 text-text-dark transition hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-text-muted">{article.publishedAt}</p>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-sm editorial-card transition hover:-translate-y-0.5 hover:border-primary/45">
      <Link
        href={`/travel-news/${article.slug}`}
        className="image-shine relative block aspect-[16/10] overflow-hidden bg-surface-alt"
      >
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/travel-news/${article.categorySlug}`}
            className="text-xs font-black text-breaking"
          >
            {article.category}
          </Link>
          {country ? (
            <Link
              href={`/travel-news?country=${country.slug}`}
              className="rounded-sm bg-surface-alt px-2 py-1 text-[11px] font-black text-primary"
            >
              {country.flag} {country.name}
            </Link>
          ) : null}
        </div>
        <Link href={`/travel-news/${article.slug}`}>
          <h3 className="mt-1 line-clamp-2 text-base font-black leading-7 text-text-dark transition hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
          {article.excerpt}
        </p>
        <p className="mt-3 text-[11px] font-semibold text-text-muted">
          {article.publishedAt} · {article.readingTime}
        </p>
      </div>
    </article>
  );
}
