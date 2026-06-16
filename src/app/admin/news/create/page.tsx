import type { Metadata } from "next";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import NewsForm from "@/components/admin/NewsForm";
import {
  loadAdminCategories,
  loadAdminCountries,
} from "@/lib/api/admin";
import type { AdminNewsFormInput } from "@/types";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إضافة خبر",
};

function buildEmptyForm(
  categories: Awaited<ReturnType<typeof loadAdminCategories>>,
): AdminNewsFormInput {
  const categoryId =
    categories.status === "success" ? (categories.data[0]?.id ?? 0) : 0;

  return {
    title: "",
    slug: "",
    excerpt: "",
    content_paragraphs: [],
    category_id: categoryId,
    author_id: 0,
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
  const [categories, countries, user] = await Promise.all([
    loadAdminCategories(),
    loadAdminCountries(),
    verifyAdminSession(),
  ]);

  if (categories.status === "offline" || countries.status === "offline") {
    return <AdminOfflineMessage />;
  }

  if (categories.status !== "success" || countries.status !== "success") {
    return (
      <AdminOfflineMessage
        title="تعذر تحميل بيانات النموذج"
        description="لم نتمكن من جلب التصنيفات أو الدول."
      />
    );
  }

  const currentAuthorName = user?.author?.name ?? user?.name ?? "المستخدم الحالي";

  return (
    <NewsForm
      mode="create"
      initial={buildEmptyForm(categories)}
      categories={categories.data}
      countries={countries.data}
      authors={[]}
      currentAuthorName={currentAuthorName}
    />
  );
}
