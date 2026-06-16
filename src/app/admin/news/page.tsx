import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { FilePenLine, Newspaper, Plus } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import AdminNewsFilters from "@/components/admin/AdminNewsFilters";
import AdminNewsPagination from "@/components/admin/AdminNewsPagination";
import DeleteNewsButton from "@/components/admin/DeleteNewsButton";
import { admin } from "@/components/admin/admin-ui";
import {
  loadAdminAuthors,
  loadAdminCategories,
  loadAdminCountries,
  loadAdminNews,
} from "@/lib/api/admin";
import type { AdminNewsListQuery } from "@/lib/api/admin-news";
import { resolveMediaUrl } from "@/lib/media-url";
import { formatViewDateTime } from "@/lib/analytics-format";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأخبار",
};

const statusLabels: Record<string, string> = {
  draft: "مسودة",
  review: "مراجعة",
  published: "منشور",
  scheduled: "مجدول",
  archived: "مؤرشف",
};

const statusClasses: Record<string, string> = {
  draft: "bg-[#f3f4f6] text-[#4b5563]",
  review: "bg-[#fff4e5] text-[#d97706]",
  published: "bg-[#eafaf1] text-[#16a34a]",
  scheduled: "bg-[#eef6ff] text-[#0677e8]",
  archived: "bg-[#ffe9e9] text-[#dc2626]",
};

type AdminNewsPageProps = {
  searchParams: Promise<{
    search?: string;
    status?: string;
    category?: string;
    country?: string;
    author?: string;
    page?: string;
  }>;
};

export default async function AdminNewsPage({ searchParams }: AdminNewsPageProps) {
  const params = await searchParams;
  const user = await verifyAdminSession();
  const canCreate = hasPermission(user, AdminPermission.NEWS_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.NEWS_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.NEWS_DELETE);

  const query: AdminNewsListQuery = {
    per_page: 20,
    page: Math.max(1, Number(params.page) || 1),
    search: params.search?.trim() || undefined,
    status: params.status?.trim() || undefined,
    category: params.category?.trim() || undefined,
    country: params.country?.trim() || undefined,
    author: params.author?.trim() || undefined,
  };

  const [result, categoriesResult, countriesResult, authorsResult] =
    await Promise.all([
      loadAdminNews(query),
      loadAdminCategories(),
      loadAdminCountries(),
      loadAdminAuthors(),
    ]);

  const categories =
    categoriesResult.status === "success"
      ? categoriesResult.data.map((item) => ({
          value: item.slug,
          label: item.label,
        }))
      : [];

  const countries =
    countriesResult.status === "success"
      ? countriesResult.data.map((item) => ({
          value: item.slug,
          label: `${item.flag} ${item.name}`,
        }))
      : [];

  const authors =
    authorsResult.status === "success"
      ? authorsResult.data.map((item) => ({
          value: item.slug,
          label: item.name,
        }))
      : [];

  const activeFilters = [
    params.search && `بحث: ${params.search}`,
    params.status && `الحالة: ${statusLabels[params.status] ?? params.status}`,
    params.category && `تصنيف: ${params.category}`,
    params.country && `دولة: ${params.country}`,
    params.author && `كاتب: ${params.author}`,
  ].filter(Boolean);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إدارة الأخبار"
        description="إدارة المحتوى المنشور والمسودات من شاشة واحدة."
        actions={
          canCreate ? (
            <Link href="/admin/news/create" className={admin.btnPrimary}>
              <Plus size={14} />
              إضافة خبر جديد
            </Link>
          ) : undefined
        }
      />

      <Suspense
        fallback={
          <div className={`${admin.card} text-xs font-semibold text-slate-500`}>
            جاري تحميل الفلاتر...
          </div>
        }
      >
        <AdminNewsFilters
          categories={categories}
          countries={countries}
          authors={authors}
        />
      </Suspense>

      <AdminDataState result={result}>
        {(articles) => (
          <>
            <div className="flex min-h-7 flex-wrap items-center justify-between gap-2 px-0.5">
              <p className="text-xs font-semibold text-slate-500">
                النتائج:{" "}
                <span className="font-bold text-slate-800">
                  {result.status === "success"
                    ? (result.meta?.total ?? articles.length)
                    : articles.length}
                </span>
                {activeFilters.length > 0 ? (
                  <span className="mr-2 text-[11px]">
                    فلاتر نشطة: {activeFilters.join(" · ")}
                  </span>
                ) : null}
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1040px] table-fixed border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={`${admin.th} w-[26%]`}>العنوان</th>
                      <th className={`${admin.th} w-[11%]`}>التصنيف</th>
                      <th className={`${admin.th} w-[9%]`}>الكاتب</th>
                      <th className={`${admin.th} w-[9%]`}>الدولة</th>
                      <th className={`${admin.th} w-[7%]`}>القراءات</th>
                      <th className={`${admin.th} w-[11%]`}>آخر قراءة</th>
                      <th className={`${admin.th} w-[7%]`}>الحالة</th>
                      <th className={`${admin.th} w-[11%]`}>تاريخ النشر</th>
                      <th className={`${admin.th} w-[9%]`}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {articles.map((article) => (
                      <tr key={article.id} className="border-b border-slate-100 transition-colors last:border-0 hover:bg-slate-50">
                        <td className={admin.td}>
                          <div className="flex items-center gap-2">
                            <img
                              src={resolveMediaUrl(article.image)}
                              alt=""
                              className="h-8 w-11 shrink-0 rounded object-cover"
                            />
                            <div className="min-w-0">
                              <span className="block truncate font-bold text-slate-800">
                                {article.title}
                              </span>
                              <span className="mt-0.5 block truncate font-mono text-[10px] text-slate-400">
                                {article.slug}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className={`${admin.td} truncate`}>
                          <span className="font-semibold text-sky-600">
                            {article.category || "—"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span
                            className="block truncate font-semibold text-slate-600"
                            title={article.authorName || undefined}
                          >
                            {article.authorName || "—"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span className="inline-flex max-w-full items-center gap-1 font-semibold text-slate-700">
                            <span>{article.countryFlag ?? "🌍"}</span>
                            {article.countryName || "—"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span className="font-bold text-sky-700">{article.viewsCount ?? 0}</span>
                        </td>
                        <td className={`${admin.td} truncate text-[11px] text-slate-500`}>
                          {formatViewDateTime(article.lastViewedAt)}
                        </td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              statusClasses[article.status] ?? statusClasses.draft
                            }`}
                          >
                            {statusLabels[article.status] ?? article.status}
                          </span>
                        </td>
                        <td className={`${admin.td} truncate text-[11px] font-semibold text-slate-500`}>
                          {article.publishedAt || "—"}
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-0.5 text-slate-500">
                            {canUpdate ? (
                              <Link
                                href={`/admin/news/${article.id}/edit`}
                                className="grid h-7 w-7 place-items-center rounded hover:bg-sky-50 hover:text-sky-600"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </Link>
                            ) : null}
                            <Link
                              href={`/travel-news/${article.slug}`}
                              target="_blank"
                              className="grid h-7 w-7 place-items-center rounded hover:bg-sky-50 hover:text-sky-600"
                              aria-label="عرض في الموقع"
                            >
                              <Newspaper size={14} strokeWidth={1.85} />
                            </Link>
                            {canDelete ? (
                              <DeleteNewsButton articleId={article.id} title={article.title} />
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {articles.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  لا توجد أخبار مطابقة للفلاتر الحالية.
                </div>
              ) : null}
            </section>

            <Suspense fallback={null}>
              <AdminNewsPagination
                meta={result.status === "success" ? result.meta : undefined}
              />
            </Suspense>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
