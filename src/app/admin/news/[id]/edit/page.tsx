import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import NewsForm from "@/components/admin/NewsForm";
import {
  loadAdminAuthors,
  loadAdminCategories,
  loadAdminCountries,
  loadAdminNews,
  loadAdminNewsById,
} from "@/lib/api/admin";
import { fetchAdminRedirectForArticle } from "@/lib/api/admin-redirects";
import { toAdminNewsFormInput } from "@/lib/api/admin-news";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { toArticleRedirectState } from "@/lib/article-redirect";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

type AdminNewsEditPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({
  params,
}: AdminNewsEditPageProps): Promise<Metadata> {
  const { id } = await params;
  const result = await loadAdminNewsById(Number(id));

  if (result.status !== "success") {
    return { title: "تعديل الخبر" };
  }

  return { title: `تعديل: ${result.data.title}` };
}

export default async function AdminNewsEditPage({ params }: AdminNewsEditPageProps) {
  const { id } = await params;
  const articleId = Number(id);

  if (Number.isNaN(articleId)) {
    notFound();
  }

  const [article, categories, countries, authors, user] = await Promise.all([
    loadAdminNewsById(articleId),
    loadAdminCategories(),
    loadAdminCountries(),
    loadAdminAuthors(),
    verifyAdminSession(),
  ]);

  if (article.status === "error" && article.message === "not-found") {
    notFound();
  }

  if (
    article.status === "offline" ||
    categories.status === "offline" ||
    countries.status === "offline" ||
    authors.status === "offline"
  ) {
    return <AdminOfflineMessage />;
  }

  if (
    article.status !== "success" ||
    categories.status !== "success" ||
    countries.status !== "success" ||
    authors.status !== "success"
  ) {
    notFound();
  }

  const [newsList, articleRedirect] = await Promise.all([
    loadAdminNews({ per_page: 100 }),
    fetchAdminRedirectForArticle(articleId).catch(() => null),
  ]);

  const articleOptions =
    newsList.status === "success"
      ? newsList.data.map((item) => ({ slug: item.slug, title: item.title }))
      : [{ slug: article.data.slug, title: article.data.title }];

  const canManageRedirect = hasPermission(user, AdminPermission.REDIRECTS_UPDATE);
  const canManageNewsletter = hasPermission(user, AdminPermission.SETTINGS_UPDATE);

  return (
    <NewsForm
      mode="edit"
      articleId={article.data.id}
      initial={toAdminNewsFormInput(article.data)}
      categories={categories.data}
      countries={countries.data}
      authors={authors.data}
      articleOptions={articleOptions}
      initialRedirect={toArticleRedirectState(articleRedirect)}
      canManageRedirect={canManageRedirect}
      canManageNewsletter={canManageNewsletter}
    />
  );
}
