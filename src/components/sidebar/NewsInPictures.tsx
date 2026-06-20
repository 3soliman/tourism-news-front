import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import type { NewsArticle } from "@/types";

type NewsInPicturesProps = {
  articles: NewsArticle[];
};

export default function NewsInPictures({ articles }: NewsInPicturesProps) {
  return (
    <div className="rounded-xl bg-white p-5 editorial-card">
      <h3 className="flex items-center gap-2 border-b border-border/60 pb-3 text-sm font-black text-text-dark">
        <span className="section-accent" />
        أخبار مصورة
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {articles.slice(0, 4).map((article) => (
          <Link
            key={article.id}
            href={`/travel-news/${article.slug}`}
            className="group relative aspect-square overflow-hidden rounded-xl bg-surface-alt"
          >
            <SafeImage
              src={article.image}
              alt={article.title}
              className="object-cover transition duration-500 group-hover:scale-110"
              displayWidth={IMAGE_WIDTHS.sidebar}
              sizes="(max-width: 1280px) 25vw, 180px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/70 via-primary-dark/10 to-transparent opacity-0 transition group-hover:opacity-100" />
            <span className="absolute bottom-2 right-2 left-2 line-clamp-2 text-[11px] font-bold text-white opacity-0 transition group-hover:opacity-100 drop-shadow-sm">
              {article.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
