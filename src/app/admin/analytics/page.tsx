import type { Metadata } from "next";
import Link from "next/link";
import { Eye } from "lucide-react";
import AdminListHeader from "@/components/admin/AdminListHeader";
import { admin } from "@/components/admin/admin-ui";
import { fetchArticleAnalyticsList } from "@/lib/api/admin-analytics";
import { isConnectionError } from "@/lib/api/connection";
import { formatViewDateTime } from "@/lib/analytics-format";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "مراقبة القراءة",
};

async function loadAnalytics(page: number) {
  try {
    return { status: "success" as const, data: await fetchArticleAnalyticsList(page) };
  } catch (error) {
    if (isConnectionError(error)) {
      return { status: "offline" as const };
    }

    return {
      status: "error" as const,
      message: error instanceof Error ? error.message : "تعذر تحميل الإحصائيات",
    };
  }
}

type AdminAnalyticsPageProps = {
  searchParams: Promise<{ page?: string }>;
};

export default async function AdminAnalyticsPage({ searchParams }: AdminAnalyticsPageProps) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page) || 1);
  const result = await loadAnalytics(page);

  if (result.status === "offline") {
    return <p className="text-sm text-slate-500">تعذر الاتصال بالخادم.</p>;
  }

  if (result.status === "error") {
    return <p className="text-sm text-red-600">{result.message}</p>;
  }

  const { summary, articles, meta } = result.data;

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="مراقبة قراءة الأخبار"
        description="عدد القراءات وآخر وقت زيارة لكل خبر."
      />

      <div className="grid gap-2 sm:grid-cols-3">
        <div className={admin.statBar}>
          <p className="text-xs font-semibold text-slate-500">
            إجمالي القراءات:{" "}
            <span className="font-bold text-slate-900">{summary.total_views}</span>
          </p>
        </div>
        <div className={admin.statBar}>
          <p className="text-xs font-semibold text-slate-500">
            قراءات اليوم:{" "}
            <span className="font-bold text-emerald-600">{summary.views_today}</span>
          </p>
        </div>
        <div className={admin.statBar}>
          <p className="text-xs font-semibold text-slate-500">
            أخبار بقراءات:{" "}
            <span className="font-bold text-sky-600">{summary.articles_with_views}</span>
          </p>
        </div>
      </div>

      <section className={admin.tableWrap}>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-xs">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                <th className={admin.th}>الخبر</th>
                <th className={admin.th}>التصنيف</th>
                <th className={admin.th}>إجمالي القراءات</th>
                <th className={admin.th}>اليوم</th>
                <th className={admin.th}>آخر قراءة</th>
                <th className={admin.th}>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article) => (
                <tr key={article.id} className="border-b border-slate-100 last:border-0">
                  <td className={`${admin.td} font-bold text-slate-800`}>{article.title}</td>
                  <td className={`${admin.td} text-slate-500`}>{article.category || "—"}</td>
                  <td className={admin.td}>
                    <span className="inline-flex items-center gap-1 font-bold text-sky-700">
                      <Eye size={12} />
                      {article.views_count}
                    </span>
                  </td>
                  <td className={`${admin.td} font-semibold text-emerald-600`}>
                    {article.views_today}
                  </td>
                  <td className={`${admin.td} text-[11px] text-slate-500`}>
                    {formatViewDateTime(article.last_viewed_at)}
                  </td>
                  <td className={admin.td}>
                    <a
                      href={`/admin/news/${article.id}/edit`}
                      className={admin.btnSecondary}
                    >
                      التفاصيل
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {articles.length === 0 ? (
          <div className="p-6 text-center text-xs text-slate-500">
            لا توجد قراءات مسجّلة بعد.
          </div>
        ) : null}
      </section>

      {meta.last_page && meta.last_page > 1 ? (
        <div className={`${admin.card} flex items-center justify-between gap-2`}>
          <p className="text-xs text-slate-500">
            صفحة {meta.current_page} من {meta.last_page}
          </p>
          <div className="flex gap-1.5">
            {page > 1 ? (
              <Link href={`/admin/analytics?page=${page - 1}`} className={admin.btnSecondary}>
                السابق
              </Link>
            ) : null}
            {page < (meta.last_page ?? 1) ? (
              <Link href={`/admin/analytics?page=${page + 1}`} className={admin.btnSecondary}>
                التالي
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </div>
  );
}
