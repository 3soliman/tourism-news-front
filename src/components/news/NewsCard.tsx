import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import type { NewsArticle } from "@/types";

type NewsCardProps = {
  article: NewsArticle;
  variant?: "vertical" | "horizontal" | "compact";
};

export default function NewsCard({
  article,
  variant = "vertical",
}: NewsCardProps) {
  const countryName = article.countryName;
  const countryFlag = article.countryFlag;

  if (variant === "horizontal") {
    return (
      <article className="group grid grid-cols-[100px_1fr] gap-4 border-b border-border/60 py-4 last:border-0 sm:grid-cols-[130px_1fr]">
        <Link
          href={`/travel-news/${article.slug}`}
          className="image-shine relative block aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt"
        >
          <SafeImage
            src={article.image}
            alt={article.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            displayWidth={IMAGE_WIDTHS.thumb}
            sizes="(max-width: 640px) 108px, 150px"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="category-badge bg-breaking-bg text-breaking">
              {article.category}
            </span>
            {countryName ? (
              <Link
                href={`/travel-news?country=${article.countrySlug}`}
                className="category-badge bg-primary-50 text-primary"
              >
                {countryFlag} {countryName}
              </Link>
            ) : null}
          </div>
          <Link href={`/travel-news/${article.slug}`}>
            <h3 className="mt-2 line-clamp-2 text-base font-black leading-7 text-text-dark transition hover:text-primary">
              {article.title}
            </h3>
          </Link>
          <p className="mt-1 line-clamp-2 text-sm leading-6 text-text-muted">
            {article.excerpt}
          </p>
          <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-text-subtle">
            <span>{article.publishedAt}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{article.readingTime}</span>
          </p>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <article className="border-b border-border/60 py-3 last:border-0">
        <Link
          href={`/travel-news/${article.categorySlug}`}
          className="text-xs font-bold text-primary"
        >
          {article.category}
        </Link>
        <Link href={`/travel-news/${article.slug}`}>
          <h3 className="mt-1.5 line-clamp-2 text-sm font-bold leading-6 text-text-dark transition hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-1 text-xs text-text-subtle">{article.publishedAt}</p>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-xl bg-white editorial-card">
      <Link
        href={`/travel-news/${article.slug}`}
        className="image-shine relative block aspect-[16/10] overflow-hidden bg-surface-alt"
      >
        <SafeImage
          src={article.image}
          alt={article.title}
          className="object-cover transition duration-500 group-hover:scale-105"
          displayWidth={IMAGE_WIDTHS.card}
          sizes="(max-width: 768px) 50vw, 360px"
        />
      </Link>
      <div className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/travel-news/${article.categorySlug}`}
            className="category-badge bg-breaking-bg text-breaking"
          >
            {article.category}
          </Link>
          {countryName ? (
            <Link
              href={`/travel-news?country=${article.countrySlug}`}
              className="category-badge bg-primary-50 text-primary"
            >
              {countryFlag} {countryName}
            </Link>
          ) : null}
        </div>
        <Link href={`/travel-news/${article.slug}`}>
          <h3 className="mt-2.5 line-clamp-2 text-lg font-black leading-8 text-text-dark transition hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-text-muted">
          {article.excerpt}
        </p>
        <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-text-subtle">
          <span>{article.publishedAt}</span>
          <span className="h-1 w-1 rounded-full bg-border" />
          <span>{article.readingTime}</span>
        </p>
      </div>
    </article>
  );
}
