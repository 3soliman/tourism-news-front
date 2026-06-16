import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import NewsForm from "@/components/admin/NewsForm";
import {
  loadAdminAuthors,
  loadAdminCategories,
  loadAdminCountries,
  loadAdminNewsById,
} from "@/lib/api/admin";
import { toAdminNewsFormInput } from "@/lib/api/admin-news";

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

  const [article, categories, countries, authors] = await Promise.all([
    loadAdminNewsById(articleId),
    loadAdminCategories(),
    loadAdminCountries(),
    loadAdminAuthors(),
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

  return (
    <NewsForm
      mode="edit"
      articleId={articleId}
      initial={toAdminNewsFormInput(article.data)}
      categories={categories.data}
      countries={countries.data}
      authors={authors.data}
    />
  );
}
