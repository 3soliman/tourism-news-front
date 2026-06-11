import type { NewsArticle } from "@/data/news";
import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/news/SectionHeader";
import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";

type NewsSectionProps = {
  title: string;
  articles: NewsArticle[];
  moreHref: string;
};

export default function NewsSection({
  title,
  articles,
  moreHref,
}: NewsSectionProps) {
  if (articles.length === 0) return null;

  const [featured, ...list] = articles;

  return (
    <section className="mb-10">
      <SectionHeader title={title} moreHref={moreHref} />
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <FeaturedNewsCard article={featured} size="small" />
        </div>
        <div className="lg:col-span-2">
          {list.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      </div>
    </section>
  );
}
