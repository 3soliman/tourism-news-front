import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import type { NewsArticle } from "@/types";

type NewsInPicturesProps = {
  articles: NewsArticle[];
};

export default function NewsInPictures({ articles }: NewsInPicturesProps) {
  return (
    <div className="rounded-lg editorial-card p-4">
      <h3 className="border-b border-border pb-2 text-sm font-black text-text-dark">
        أخبار مصورة
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/travel-news/${article.slug}`}
            className="group relative aspect-square overflow-hidden rounded bg-surface-alt"
          >
            <SafeImage
              src={article.image}
              alt={article.title}
              className="object-cover transition group-hover:scale-110"
              displayWidth={IMAGE_WIDTHS.sidebar}
              sizes="(max-width: 1280px) 25vw, 180px"
            />
            <div className="absolute inset-0 bg-primary-dark/55 opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-1 right-1 left-1 line-clamp-2 text-[10px] font-bold text-white opacity-0 transition group-hover:opacity-100">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
