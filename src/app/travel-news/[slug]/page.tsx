import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import AuthorBox from "@/components/AuthorBox";
import Breadcrumb from "@/components/Breadcrumb";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/news/SectionHeader";
import ShareButtons from "@/components/ShareButtons";
import { getAuthorBySlug } from "@/data/authors";
import { getCategoryBySlug } from "@/data/categories";
import { getNewsBySlug, news } from "@/data/news";
import { buildNewsArticleSchema } from "@/lib/news-schema";
import { siteConfig } from "@/lib/site";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {
      title: "المقال غير موجود",
      robots: { index: false, follow: false },
    };
  }

  const author = getAuthorBySlug(article.authorSlug);
  const articleUrl = `${siteConfig.url}/travel-news/${article.slug}`;

  return {
    title: article.seoTitle,
    description: article.seoDescription,
    keywords: article.keywords,
    alternates: { canonical: articleUrl },
    openGraph: {
      title: article.seoTitle,
      description: article.seoDescription,
      url: articleUrl,
      siteName: siteConfig.name,
      images: [{ url: article.image, width: 1200, height: 630, alt: article.title }],
      locale: "ar_AR",
      type: "article",
      publishedTime: article.publishedAtISO,
      modifiedTime: article.updatedAtISO,
      authors: [author?.name ?? siteConfig.author],
    },
    twitter: {
      card: "summary_large_image",
      title: article.seoTitle,
      description: article.seoDescription,
      images: [article.image],
    },
    robots: { index: true, follow: true },
  };
}

export default async function ArticleDetailsPage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);
  if (!article) notFound();

  const category = getCategoryBySlug(article.categorySlug);
  const author = getAuthorBySlug(article.authorSlug);
  const articleUrl = `${siteConfig.url}/travel-news/${article.slug}`;
  const relatedNews = news.filter((item) => item.slug !== article.slug);

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "أخبار السياحة", href: "/travel-news" },
    {
      label: category?.label ?? article.category,
      href: `/travel-news/category/${article.categorySlug}`,
    },
    { label: article.title },
  ];

  const articleSchema = buildNewsArticleSchema(
    article,
    author,
    articleUrl,
    category?.label,
  );

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "الرئيسية", item: siteConfig.url },
      {
        "@type": "ListItem",
        position: 2,
        name: "أخبار السياحة",
        item: `${siteConfig.url}/travel-news`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: category?.label ?? article.category,
        item: `${siteConfig.url}/travel-news/category/${article.categorySlug}`,
      },
      { "@type": "ListItem", position: 4, name: article.title, item: articleUrl },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <PageWithSidebar>
        <article className="rounded border border-border bg-surface p-5 md:p-8">
          <Breadcrumb items={breadcrumbItems} />

          <Link
            href={`/travel-news/category/${article.categorySlug}`}
            className="inline-block bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
          >
            {article.category}
          </Link>

          <h1 className="mt-4 text-3xl font-black leading-[1.5] text-text-dark md:text-4xl">
            {article.title}
          </h1>

          <p className="mt-4 text-lg leading-8 text-text-muted">
            {article.excerpt}
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-text-muted">
            {author && (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2 font-bold text-text-dark hover:text-primary"
              >
                <img
                  src={author.image}
                  alt={author.name}
                  className="h-8 w-8 rounded-full object-cover"
                />
                {author.name}
              </Link>
            )}
            <span>نشر: {article.publishedAt}</span>
            {article.updatedAtISO !== article.publishedAtISO && (
              <span>تحديث: {article.publishedAt}</span>
            )}
            <span>{article.readingTime}</span>
          </div>

          <img
            src={article.image}
            alt={article.title}
            className="mt-6 w-full rounded object-cover"
          />

          <div className="prose prose-lg mt-8 max-w-none leading-9 prose-p:text-text-muted">
            {article.content.map((paragraph) => (
              <p key={paragraph.slice(0, 40)}>{paragraph}</p>
            ))}
          </div>

          <ShareButtons title={article.title} url={articleUrl} />
          <AuthorBox authorSlug={article.authorSlug} />
        </article>

        <section className="mt-8">
          <SectionHeader title="أخبار ذات صلة" />
          <div className="space-y-0">
            {relatedNews.slice(0, 4).map((item) => (
              <NewsCard key={item.id} article={item} variant="horizontal" />
            ))}
          </div>
        </section>
      </PageWithSidebar>
    </>
  );
}
