import type { NewsArticle } from "@/data/news";
import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/news/SectionHeader";
import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";

type NewsSectionProps = {
  title: string;
  description?: string;
  articles: NewsArticle[];
};

export default function NewsSection({
  title,
  description,
  articles,
}: NewsSectionProps) {
  if (articles.length === 0) return null;

  const [featured, ...list] = articles;

  return (
    <section className="mb-9 rounded-sm bg-white p-4 shadow-sm ring-1 ring-border/80 sm:p-5">
      <SectionHeader title={title} description={description} />
      <div className="grid gap-4 xl:grid-cols-[minmax(260px,0.9fr)_minmax(0,1.1fr)]">
        <FeaturedNewsCard article={featured} size="small" />
      {list.length > 0 && (
        <div>
          {list.slice(0, 4).map((article) => (
            <NewsCard key={article.id} article={article} variant="horizontal" />
          ))}
        </div>
      )}
      </div>
    </section>
  );
}
