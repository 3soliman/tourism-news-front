import type { NewsArticle } from "@/data/news";
import FeaturedNewsCard from "@/components/news/FeaturedNewsCard";

type HeroNewsGridProps = {
  articles: NewsArticle[];
};

export default function HeroNewsGrid({ articles }: HeroNewsGridProps) {
  const [main, ...rest] = articles;

  if (!main) return null;

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(300px,0.9fr)]">
      <FeaturedNewsCard article={main} size="large" />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {rest.slice(0, 4).map((article) => (
          <FeaturedNewsCard key={article.id} article={article} size="small" />
        ))}
      </div>
    </section>
  );
}
