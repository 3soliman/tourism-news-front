import Link from "next/link";
import type { NewsArticle } from "@/data/news";

type FeaturedNewsCardProps = {
  article: NewsArticle;
  size?: "large" | "small";
};

export default function FeaturedNewsCard({
  article,
  size = "small",
}: FeaturedNewsCardProps) {
  if (size === "large") {
    return (
      <Link
        href={`/travel-news/${article.slug}`}
        className="group relative block h-full min-h-[420px] overflow-hidden rounded"
      >
        <img
          src={article.image}
          alt={article.title}
          className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        <div className="absolute bottom-0 right-0 left-0 p-5 text-white md:p-6">
          <span className="inline-block bg-breaking px-2 py-1 text-xs font-bold">
            {article.category}
          </span>
          <h2 className="mt-3 text-2xl font-black leading-10 md:text-3xl">
            {article.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm text-slate-200">
            {article.excerpt}
          </p>
          <p className="mt-3 text-xs text-slate-300">
            {article.publishedAt} · {article.readingTime}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/travel-news/${article.slug}`}
      className="group relative block h-48 overflow-hidden rounded md:h-[200px]"
    >
      <img
        src={article.image}
        alt={article.title}
        className="absolute inset-0 h-full w-full object-cover transition group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 to-transparent" />
      <div className="absolute bottom-0 p-3 text-white">
        <span className="text-[10px] font-bold text-primary-hover">
          {article.category}
        </span>
        <h3 className="mt-1 line-clamp-2 text-sm font-bold leading-6">
          {article.title}
        </h3>
      </div>
    </Link>
  );
}
