import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import type { NewsArticle } from "@/types";

type FeaturedNewsCardProps = {
  article: NewsArticle;
  size?: "large" | "medium" | "small";
  priority?: boolean;
  className?: string;
};

export default function FeaturedNewsCard({
  article,
  size = "small",
  priority = false,
  className,
}: FeaturedNewsCardProps) {
  if (size === "large") {
    return (
      <Link
        href={`/travel-news/${article.slug}`}
        className={`group relative block min-h-[360px] overflow-hidden rounded-2xl bg-primary-dark shadow-xl shadow-primary-dark/15 sm:min-h-[420px] lg:min-h-[540px] ${className ?? ""}`}
      >
        <span className="image-shine absolute inset-0 overflow-hidden">
          <SafeImage
            src={article.image}
            alt={article.title}
            className="object-cover transition duration-700 group-hover:scale-105"
            displayWidth={IMAGE_WIDTHS.hero}
            sizes="(max-width: 768px) 100vw, 720px"
            priority={priority}
          />
        </span>
        <div className="hero-gradient-overlay absolute inset-0" />
        <div className="absolute bottom-0 right-0 left-0 p-6 text-white sm:p-8">
          <span className="category-badge bg-breaking/90 text-white">
            {article.category}
          </span>
          <h2 className="mt-4 max-w-2xl font-display text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-[2.65rem] lg:leading-[1.15]">
            {article.title}
          </h2>
          <p className="mt-3 max-w-xl line-clamp-2 text-sm leading-7 text-white/80 sm:text-base">
            {article.excerpt}
          </p>
          <p className="mt-4 flex items-center gap-2 text-xs font-semibold text-white/65">
            <span>{article.publishedAt}</span>
            <span className="h-1 w-1 rounded-full bg-white/40" />
            <span>{article.readingTime}</span>
          </p>
        </div>
      </Link>
    );
  }

  if (size === "medium") {
    return (
      <Link
        href={`/travel-news/${article.slug}`}
        className={`group flex flex-col overflow-hidden rounded-xl bg-white editorial-card ${className ?? ""}`}
      >
        <div className="image-shine relative aspect-[16/10] overflow-hidden bg-surface-alt">
          <SafeImage
            src={article.image}
            alt={article.title}
            className="object-cover transition duration-500 group-hover:scale-105"
            displayWidth={IMAGE_WIDTHS.card}
            sizes="(max-width: 768px) 50vw, 400px"
          />
        </div>
        <div className="flex flex-col p-4">
          <span className="category-badge bg-breaking-bg text-breaking">
            {article.category}
          </span>
          <h3 className="mt-2.5 line-clamp-2 text-base font-black leading-7 text-text-dark transition group-hover:text-primary">
            {article.title}
          </h3>
          <p className="mt-1.5 line-clamp-2 text-sm leading-6 text-text-muted">
            {article.excerpt}
          </p>
          <p className="mt-3 flex items-center gap-2 text-xs font-semibold text-text-subtle">
            <span>{article.publishedAt}</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>{article.readingTime}</span>
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/travel-news/${article.slug}`}
      className={`group grid min-h-[120px] grid-cols-[100px_1fr] overflow-hidden rounded-xl bg-white editorial-card ${className ?? ""}`}
    >
      <div className="image-shine relative aspect-square overflow-hidden bg-surface-alt">
        <SafeImage
          src={article.image}
          alt={article.title}
          className="object-cover transition group-hover:scale-105"
          displayWidth={IMAGE_WIDTHS.thumb}
          sizes="100px"
        />
      </div>
      <div className="flex min-w-0 flex-col justify-center p-3.5">
        <span className="category-badge bg-breaking-bg text-breaking self-start">
          {article.category}
        </span>
        <h3 className="mt-2 line-clamp-2 text-sm font-black leading-6 text-text-dark transition group-hover:text-primary">
          {article.title}
        </h3>
        <p className="mt-1 line-clamp-2 text-xs leading-5 text-text-muted">
          {article.excerpt}
        </p>
      </div>
    </Link>
  );
}
