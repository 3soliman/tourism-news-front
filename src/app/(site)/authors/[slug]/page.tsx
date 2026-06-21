import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import Breadcrumb from "@/components/Breadcrumb";
import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/news/SectionHeader";
import { fetchAuthorBySlug } from "@/lib/api/authors";
import { isApiOnline } from "@/lib/api/connection";
import { fetchNewsByAuthor } from "@/lib/api/news";
import { getSiteConfig } from "@/lib/site";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await fetchAuthorBySlug(slug);
  if (!author) return { title: "الكاتب غير موجود" };
  return {
    title: author.name,
    description: `${author.role} - ${author.bio}`,
    openGraph: {
      title: author.name,
      description: `${author.role} - ${author.bio}`,
      images: [author.image],
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const [author, authorNews, siteConfig] = await Promise.all([
    fetchAuthorBySlug(slug),
    fetchNewsByAuthor(slug),
    getSiteConfig(),
  ]);

  if (!isApiOnline()) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <ApiOfflineMessage />
      </section>
    );
  }

  if (!author) notFound();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <Breadcrumb
        items={[
          { label: "الرئيسية", href: "/" },
          { label: "هيئة التحرير", href: "/editorial-team" },
          { label: author.name },
        ]}
      />

      <div className="mt-6 flex flex-col items-center gap-6 rounded border border-border bg-surface p-8 md:flex-row md:text-right">
        <img
          src={author.image}
          alt={author.name}
          loading="lazy"
          decoding="async"
          className="h-32 w-32 rounded-full object-cover ring-4 ring-primary/20"
        />
        <div>
          <span className="bg-primary/10 px-3 py-1 text-sm font-bold text-primary">
            {author.role} في {siteConfig.name}
          </span>
          <h1 className="mt-3 text-3xl font-black text-text-dark">{author.name}</h1>
          <p className="mt-3 leading-8 text-text-muted">{author.bio}</p>
        </div>
      </div>

      <div className="mt-10">
        <SectionHeader title={`أخبار ${author.name}`} />
        {authorNews.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {authorNews.map((article) => (
              <NewsCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <p className="text-text-muted">لا توجد مقالات منشورة حاليًا.</p>
        )}
      </div>
    </section>
  );
}
