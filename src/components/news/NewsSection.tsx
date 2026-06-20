import type { NewsArticle } from "@/types";
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
    <section className="mb-8 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-border/50 sm:p-6">
      <SectionHeader title={title} description={description} />
      <div className="grid items-start gap-5 xl:grid-cols-[minmax(210px,0.7fr)_minmax(0,1.3fr)]">
        <FeaturedNewsCard article={featured} size="medium" />
        {list.length > 0 && (
          <div className="rounded-xl border border-border/50 bg-white px-1">
            {list.slice(0, 4).map((article) => (
              <NewsCard key={article.id} article={article} variant="horizontal" />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
