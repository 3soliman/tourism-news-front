import type { Metadata } from "next";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import NewsForm from "@/components/admin/NewsForm";
import {
  loadAdminCategories,
  loadAdminCountries,
  loadAdminNews,
} from "@/lib/api/admin";
import type { AdminNewsFormInput } from "@/types";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";
import { toDatetimeLocalValue } from "@/lib/datetime-local";

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
    published_at: toDatetimeLocalValue(),
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

  const currentAuthorName =
    user?.public_name?.trim() || user?.display_name || user?.name || "المستخدم الحالي";

  const newsList = await loadAdminNews({ per_page: 100 });
  const articleOptions =
    newsList.status === "success"
      ? newsList.data.map((item) => ({ slug: item.slug, title: item.title }))
      : [];
  const canManageRedirect = hasPermission(user, AdminPermission.REDIRECTS_UPDATE);
  const canManageNewsletter = hasPermission(user, AdminPermission.SETTINGS_UPDATE);

  return (
    <NewsForm
      mode="create"
      initial={buildEmptyForm(categories)}
      categories={categories.data}
      countries={countries.data}
      authors={[]}
      currentAuthorName={currentAuthorName}
      articleOptions={articleOptions}
      canManageRedirect={canManageRedirect}
      canManageNewsletter={canManageNewsletter}
    />
  );
}
