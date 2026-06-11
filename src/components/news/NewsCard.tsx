import Link from "next/link";
import type { NewsArticle } from "@/data/news";

type NewsCardProps = {
  article: NewsArticle;
  variant?: "vertical" | "horizontal" | "compact";
};

export default function NewsCard({
  article,
  variant = "vertical",
}: NewsCardProps) {
  if (variant === "horizontal") {
    return (
      <article className="flex gap-4 border-b border-border py-4 last:border-0">
        <Link
          href={`/travel-news/${article.slug}`}
          className="block h-24 w-32 shrink-0 overflow-hidden rounded"
        >
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition hover:scale-105"
          />
        </Link>
        <div className="min-w-0 flex-1">
          <Link
            href={`/travel-news/category/${article.categorySlug}`}
            className="text-xs font-bold text-primary"
          >
            {article.category}
          </Link>
          <Link href={`/travel-news/${article.slug}`}>
            <h3 className="mt-1 line-clamp-2 text-base font-bold leading-7 text-text-dark transition hover:text-primary">
              {article.title}
            </h3>
          </Link>
          <p className="mt-1 text-xs text-text-muted">
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
          href={`/travel-news/category/${article.categorySlug}`}
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
    <article className="overflow-hidden rounded border border-border bg-surface shadow-sm transition hover:shadow-md">
      <Link
        href={`/travel-news/${article.slug}`}
        className="block overflow-hidden"
      >
        <img
          src={article.image}
          alt={article.title}
          className="h-44 w-full object-cover transition hover:scale-105"
        />
      </Link>
      <div className="p-4">
        <Link
          href={`/travel-news/category/${article.categorySlug}`}
          className="text-xs font-bold text-primary"
        >
          {article.category}
        </Link>
        <Link href={`/travel-news/${article.slug}`}>
          <h3 className="mt-2 line-clamp-2 text-base font-bold leading-7 text-text-dark transition hover:text-primary">
            {article.title}
          </h3>
        </Link>
        <p className="mt-2 line-clamp-2 text-sm text-text-muted">
          {article.excerpt}
        </p>
        <p className="mt-3 text-xs text-text-muted">
          {article.publishedAt} · {article.readingTime}
        </p>
      </div>
    </article>
  );
}
