import Link from "next/link";
import type { NewsArticle } from "@/types";

type FeaturedNewsCardProps = {
  article: NewsArticle;
  size?: "large" | "medium" | "small";
};

export default function FeaturedNewsCard({
  article,
  size = "small",
}: FeaturedNewsCardProps) {
  if (size === "large") {
    return (
      <Link
        href={`/travel-news/${article.slug}`}
        className="group relative block min-h-[380px] overflow-hidden rounded-sm bg-primary-dark shadow-xl shadow-black/10 sm:min-h-[460px] lg:min-h-[560px]"
      >
        <span className="image-shine absolute inset-0 overflow-hidden">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
        </span>
        <div className="absolute inset-0 bg-gradient-to-t from-[#1f272b] via-[#1f272b]/55 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-5 text-white sm:p-7">
          <span className="inline-flex rounded-sm bg-breaking px-3 py-1 text-xs font-black">
            {article.category}
          </span>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
            {article.title}
          </h2>
          <p className="mt-3 max-w-xl line-clamp-2 text-sm leading-7 text-white/86 sm:text-base">
            {article.excerpt}
          </p>
          <p className="mt-4 text-xs font-semibold text-white/75">
            {article.publishedAt} · {article.readingTime}
          </p>
        </div>
      </Link>
    );
  }

  if (size === "medium") {
    return (
      <Link
        href={`/travel-news/${article.slug}`}
        className="group flex flex-col overflow-hidden rounded-sm bg-white editorial-card transition hover:-translate-y-0.5 hover:border-primary/45"
      >
        <div className="image-shine relative aspect-[16/10] overflow-hidden bg-surface-alt">
          <img
            src={article.image}
            alt={article.title}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex flex-col p-3">
          <span className="text-[11px] font-black text-breaking">{article.category}</span>
          <h3 className="mt-1.5 line-clamp-2 text-base font-black leading-7 text-text-dark transition group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-xs leading-6 text-text-muted">
            {article.excerpt}
          </p>
          <p className="mt-2 text-[11px] font-semibold text-text-muted">
            {article.publishedAt} · {article.readingTime}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/travel-news/${article.slug}`}
      className="group grid min-h-[128px] grid-cols-[112px_1fr] overflow-hidden rounded-sm bg-white editorial-card transition hover:-translate-y-0.5 hover:border-primary/45"
    >
      <div className="image-shine relative overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
      </div>

      <div className="flex min-w-0 flex-col justify-center p-3">
        <span className="text-[11px] font-black text-breaking">{article.category}</span>
        <h3 className="mt-1 line-clamp-2 text-sm font-black leading-6 text-text-dark transition group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted sm:block">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
