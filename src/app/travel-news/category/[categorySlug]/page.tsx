import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import CategoryNav from "@/components/CategoryNav";
import NewsCard from "@/components/news/NewsCard";
import { categories, getCategoryBySlug } from "@/data/categories";
import { getNewsByCategory } from "@/data/news";

type CategoryPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export async function generateStaticParams() {
  return categories.map((c) => ({ categorySlug: c.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) return { title: "التصنيف غير موجود" };
  return { title: category.label, description: category.description };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = getCategoryBySlug(categorySlug);
  if (!category) notFound();

  const categoryNews = getNewsByCategory(categorySlug);

  return (
    <PageWithSidebar>
      <header className="mb-6">
        <h1 className="border-b-2 border-primary pb-2 text-3xl font-black text-text-dark">
          {category.label}
        </h1>
        <p className="mt-3 text-text-muted">{category.description}</p>
      </header>

      <CategoryNav activeSlug={category.slug} />

      {categoryNews.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {categoryNews.map((article) => (
            <NewsCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>
      ) : (
        <p className="rounded border border-border bg-surface p-8 text-center text-text-muted">
          لا توجد أخبار في هذا التصنيف حاليًا.
        </p>
      )}
    </PageWithSidebar>
  );
}
