import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import SafeImage from "@/components/SafeImage";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import ZoomableImage from "@/components/ZoomableImage";
import AuthorBox from "@/components/AuthorBox";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryNav from "@/components/CategoryNav";
import PageWithSidebar from "@/components/layout/PageWithSidebar";
import ArticleBody from "@/components/news/ArticleBody";
import ArticleScrollFocus from "@/components/news/ArticleScrollFocus";
import ArticleViewTracker from "@/components/news/ArticleViewTracker";
import NewsCard from "@/components/news/NewsCard";
import SectionHeader from "@/components/news/SectionHeader";
import ShareButtons from "@/components/ShareButtons";
import { fetchAuthorBySlug } from "@/lib/api/authors";
import { fetchCategories } from "@/lib/api/categories";
import { fetchNews } from "@/lib/api/news";
import { getCountryBySlug } from "@/lib/api/countries";
import { isApiOnline } from "@/lib/api/connection";
import { resolveTravelNewsSlug } from "@/lib/api/travel-news-slug";
import { buildNewsArticleSchema } from "@/lib/news-schema";
import { formatPublishedAt } from "@/lib/news-format";
import { getSiteConfig } from "@/lib/site";
import { Calendar, Clock, User } from "lucide-react";

export const dynamic = "force-dynamic";

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ country?: string }>;
};

export async function generateMetadata({
  params,
}: ArticlePageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const [resolved, siteConfig] = await Promise.all([
      resolveTravelNewsSlug(slug),
      getSiteConfig(),
    ]);

    if (resolved.kind === "category") {
      const categoryUrl = `${siteConfig.url}/travel-news/${resolved.category.slug}`;
      return {
        title: resolved.category.label,
        description: resolved.category.description,
        alternates: { canonical: categoryUrl },
        openGraph: {
          title: resolved.category.label,
          description: resolved.category.description,
          url: categoryUrl,
          siteName: siteConfig.name,
          locale: "ar_AR",
          type: "website",
        },
        robots: { index: true, follow: true },
      };
    }

    if (resolved.kind === "article") {
      const article = resolved.article;
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
          authors: [article.authorName || siteConfig.author],
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

    return {
      title: "المقال غير موجود",
      robots: { index: false, follow: false },
    };
  } catch {
    return {
      title: "أخبار السياحة",
      robots: { index: true, follow: true },
    };
  }
}

export default async function ArticleDetailsPage({
  params,
  searchParams,
}: ArticlePageProps) {
  const { slug } = await params;
  const { country: countrySlug } = await searchParams;
  const [categories, resolved, siteConfig] = await Promise.all([
    fetchCategories(),
    resolveTravelNewsSlug(slug),
    getSiteConfig(),
  ]);

  if (resolved.kind === "category") {
    const categoryPage = resolved.category;
    const [categoryNews, activeCountry] = await Promise.all([
      fetchNews({
        category: categoryPage.slug,
        per_page: 24,
        ...(countrySlug ? { country: countrySlug } : {}),
      }),
      countrySlug ? getCountryBySlug(countrySlug) : Promise.resolve(undefined),
    ]);

    if (!isApiOnline()) {
      return (
        <PageWithSidebar>
          <header className="mb-6">
            <h1 className="border-b-2 border-primary pb-2 text-3xl font-black text-text-dark">
              {categoryPage.label}
            </h1>
          </header>
          <ApiOfflineMessage />
        </PageWithSidebar>
      );
    }

    return (
      <PageWithSidebar>
        <header className="mb-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border/50">
          <p className="text-sm font-bold text-primary">تصنيف إخباري</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-text-dark">
            {categoryPage.label}
          </h1>
          <p className="mt-3 leading-8 text-text-muted">{categoryPage.description}</p>
        </header>

        <CategoryNav
          categories={categories}
          activeSlug={categoryPage.slug}
          countrySlug={countrySlug}
        />

        {activeCountry ? (
          <div className="mb-5 rounded-xl border border-primary-100 bg-primary-50 p-5">
            <p className="text-sm font-bold text-text-muted">النتائج الحالية</p>
            <h2 className="mt-1 text-2xl font-black text-text-dark">
              {activeCountry.flag} أخبار {categoryPage.label} المرتبطة بـ{" "}
              {activeCountry.name}
            </h2>
            <p className="mt-2 text-sm font-bold text-text-muted">
              {categoryNews.length} خبر في هذا الفلتر
            </p>
          </div>
        ) : null}

        {categoryNews.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {categoryNews.map((item) => (
              <NewsCard key={item.id} article={item} variant="vertical" />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-border/60 bg-surface p-10 text-center text-text-muted">
            لا توجد أخبار في هذا التصنيف حاليًا.
          </p>
        )}
      </PageWithSidebar>
    );
  }

  if (resolved.kind !== "article") {
    if (!isApiOnline()) {
      return (
        <PageWithSidebar>
          <ApiOfflineMessage />
        </PageWithSidebar>
      );
    }
    notFound();
  }

  const article = resolved.article;
  const author = await fetchAuthorBySlug(article.authorSlug);
  const category = categories.find((item) => item.slug === article.categorySlug);
  const articleUrl = `${siteConfig.url}/travel-news/${article.slug}`;
  const relatedNews = article.related;
  const updatedAt = formatPublishedAt(article.updatedAtISO);

  const breadcrumbItems = [
    { label: "الرئيسية", href: "/" },
    { label: "أخبار السياحة", href: "/travel-news" },
    {
      label: category?.label ?? article.category,
      href: `/travel-news/${article.categorySlug}`,
    },
    { label: article.title },
  ];

  const articleSchema = buildNewsArticleSchema(
    article,
    author,
    siteConfig,
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
        item: `${siteConfig.url}/travel-news/${article.categorySlug}`,
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
        <ArticleViewTracker slug={article.slug} />
        <ArticleScrollFocus slug={article.slug} />
        <article
          id="article-top"
          className="scroll-mt-[5.5rem] space-y-6 rounded-2xl border border-border/60 bg-surface p-5 shadow-sm md:p-8"
        >
          <Breadcrumb items={breadcrumbItems} />

          <div className="flex items-center gap-2">
            <Link
              href={`/travel-news/${article.categorySlug}`}
              className="category-badge bg-primary-50 text-primary"
            >
              {article.category}
            </Link>
          </div>

          <h1 className="text-3xl font-black leading-[1.4] tracking-tight text-text-dark md:text-4xl lg:text-[2.65rem]">
            {article.title}
          </h1>

          <div className="border-r-4 border-primary bg-gradient-to-l from-primary-50/50 to-transparent px-5 py-4 rounded-xl">
            <p className="text-lg leading-8 text-text-muted">
              {article.excerpt}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 border-y border-border/60 py-4 text-sm text-text-muted">
            {author ? (
              <Link
                href={`/authors/${author.slug}`}
                className="flex items-center gap-2.5 font-bold text-text-dark transition hover:text-primary"
              >
                <SafeImage
                  src={author.image}
                  alt={author.name}
                  width={36}
                  height={36}
                  fill={false}
                  displayWidth={IMAGE_WIDTHS.avatar}
                  sizes="36px"
                  className="h-9 w-9 shrink-0 rounded-full object-cover ring-2 ring-primary/10"
                />
                <User size={14} className="text-text-subtle" />
                {author.name}
              </Link>
            ) : null}
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-text-subtle" />
              نشر: <time dateTime={article.publishedAtISO}>{article.publishedAt}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar size={14} className="text-text-subtle" />
              آخر تحديث: <time dateTime={article.updatedAtISO}>{updatedAt}</time>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock size={14} className="text-text-subtle" />
              {article.readingTime}
            </span>
          </div>

          <ZoomableImage
            src={article.image}
            alt={article.title}
            className="aspect-video max-h-[480px] w-full rounded-2xl object-cover shadow-lg"
          />

          <ArticleBody paragraphs={article.content} />

          <ShareButtons title={article.title} url={articleUrl} />
          <AuthorBox authorSlug={article.authorSlug} author={author} />
        </article>

        {relatedNews.length > 0 ? (
          <section className="mt-8 animate-fade-in-up">
            <SectionHeader title="أخبار ذات صلة" />
            <div className="rounded-2xl border border-border/50 bg-white px-1">
              {relatedNews.slice(0, 4).map((item) => (
                <NewsCard key={item.id} article={item} variant="horizontal" />
              ))}
            </div>
          </section>
        ) : null}
      </PageWithSidebar>
    </>
  );
}
