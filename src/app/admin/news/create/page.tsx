import type { Metadata } from "next";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import NewsForm from "@/components/admin/NewsForm";
import {
  loadAdminAuthors,
  loadAdminCategories,
  loadAdminCountries,
} from "@/lib/api/admin";
import type { AdminNewsFormInput } from "@/types";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة خبر",
};

function buildEmptyForm(
  categories: Awaited<ReturnType<typeof loadAdminCategories>>,
  authors: Awaited<ReturnType<typeof loadAdminAuthors>>,
): AdminNewsFormInput {
  const categoryId =
    categories.status === "success" ? (categories.data[0]?.id ?? 0) : 0;
  const authorId = authors.status === "success" ? (authors.data[0]?.id ?? 0) : 0;

  return {
    title: "",
    slug: "",
    excerpt: "",
    content_paragraphs: [],
    category_id: categoryId,
    author_id: authorId,
    country_id: null,
    image: "",
    destination: "",
    status: "draft",
    published_at: "",
    reading_time: "",
    seo_title: "",
    seo_description: "",
    focus_keyword: "",
    keywords: [],
    canonical_url: "",
    og_title: "",
    og_description: "",
    og_image: "",
    robots_index: true,
    robots_follow: true,
    schema_status: "incomplete",
    is_google_news_enabled: true,
    google_news_status: "pending",
  };
}

export default async function AdminNewsCreatePage() {
  const [categories, countries, authors] = await Promise.all([
    loadAdminCategories(),
    loadAdminCountries(),
    loadAdminAuthors(),
  ]);

  if (
    categories.status === "offline" ||
    countries.status === "offline" ||
    authors.status === "offline"
  ) {
    return <AdminOfflineMessage />;
  }

  if (
    categories.status !== "success" ||
    countries.status !== "success" ||
    authors.status !== "success"
  ) {
    return (
      <AdminOfflineMessage
        title="تعذر تحميل بيانات النموذج"
        description="لم نتمكن من جلب التصنيفات أو الدول أو الكتّاب."
      />
    );
  }

  return (
    <NewsForm
      mode="create"
      initial={buildEmptyForm(categories, authors)}
      categories={categories.data}
      countries={countries.data}
      authors={authors.data}
    />
  );
}
