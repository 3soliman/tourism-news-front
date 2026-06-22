import {
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  FileText,
  Globe2,
  Newspaper,
  ShieldCheck,
  XCircle,
} from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import AdminListHeader from "@/components/admin/AdminListHeader";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminSeoOverview } from "@/lib/api/admin";
import { formatPublishedAt } from "@/lib/news-format";

export const dynamic = "force-dynamic";

function formatDateTime(iso: string | null) {
  if (!iso) return "—";
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

function statusBadge(status: string | null) {
  const styles: Record<string, string> = {
    valid: "bg-[#f0fdf4] text-[#157347]",
    incomplete: "bg-[#fff7ed] text-[#a15c07]",
    disabled: "bg-[#fef2f2] text-[#b42318]",
    eligible: "bg-[#eaf4ff] text-[#0677e8]",
    published: "bg-[#f0fdf4] text-[#157347]",
    pending: "bg-[#f4f6fa] text-[#6e7e99]",
    rejected: "bg-[#fef2f2] text-[#b42318]",
  };

  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${styles[status ?? ""] ?? "bg-[#f4f6fa] text-[#6e7e99]"}`}
    >
      {status ?? "—"}
    </span>
  );
}

export default async function AdminSeoPage() {
  const overview = await loadAdminSeoOverview();

  if (overview.status === "offline") {
    return <AdminOfflineMessage />;
  }

  return (
    <AdminDataState result={overview}>
      {(data) => (
        <div className={admin.page}>
          <AdminListHeader
            title="السيو و Google News"
            description="مراقبة Sitemap، جاهزية Google News، وحالة NewsArticle Schema."
            actions={
              <a href="/admin/settings" className={admin.btnPrimary}>
                إعدادات Publisher Center
              </a>
            }
          />

          <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
            <article className={admin.card}>
              <p className="text-xs font-bold text-slate-700">آخر تحديث Sitemap</p>
              <p className="mt-1 text-sm font-black text-slate-900">
                {formatDateTime(data.sitemaps.last_updated_at)}
              </p>
              <a
                href={data.sitemaps.sitemap_url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-sky-600"
              >
                <ExternalLink size={12} />
                sitemap.xml
              </a>
            </article>

            <article className={admin.card}>
              <p className="text-xs font-bold text-slate-700">News Sitemap</p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {data.sitemaps.news_sitemap.included_count}
              </p>
              <p className="text-[11px] font-semibold text-slate-500">
                خلال {data.sitemaps.news_sitemap.window_hours} ساعة
              </p>
            </article>

            <article className={admin.card}>
              <p className="text-xs font-bold text-slate-700">أخبار آخر 48 ساعة</p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {data.google_news.recent_window.total}
              </p>
              <p className="text-[11px] font-semibold text-slate-500">
                {data.google_news.recent_window.eligible} مؤهّلة لـ Google News
              </p>
            </article>

            <article className={admin.card}>
              <p className="text-xs font-bold text-slate-700">جاهزية Google News</p>
              <p className="mt-1 text-2xl font-black text-slate-900">
                {data.google_news.readiness_score}%
              </p>
              <p className="text-[11px] font-semibold text-slate-500">
                {data.google_news.publisher.status === "configured"
                  ? "Publisher Center مضبوط"
                  : "يحتاج إعداد"}
              </p>
            </article>
          </div>

          <div className="grid gap-3 xl:grid-cols-3">
            <DashboardSection title="خريطة الموقع">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between font-bold">
                  <span className="text-[#6e7e99]">إجمالي الروابط</span>
                  <span className="text-[#17243a]">{data.sitemaps.counts.total_urls}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#6e7e99]">أخبار منشورة</span>
                  <span className="text-[#17243a]">{data.sitemaps.counts.news_urls}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#6e7e99]">تصنيفات</span>
                  <span className="text-[#17243a]">{data.sitemaps.counts.category_urls}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#6e7e99]">كتّاب</span>
                  <span className="text-[#17243a]">{data.sitemaps.counts.author_urls}</span>
                </div>
                <div className="flex justify-between font-bold">
                  <span className="text-[#6e7e99]">صفحات ثقة</span>
                  <span className="text-[#17243a]">{data.sitemaps.counts.trust_page_urls}</span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href={data.sitemaps.news_sitemap_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-[#dce7f5] px-3 py-2 text-xs font-black text-[#0677e8]"
                  >
                    <ExternalLink size={13} />
                    news-sitemap.xml
                  </a>
                  <a
                    href={data.sitemaps.robots_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 rounded-lg border border-[#dce7f5] px-3 py-2 text-xs font-black text-[#0677e8]"
                  >
                    <ExternalLink size={13} />
                    robots.txt
                  </a>
                </div>
              </div>
            </DashboardSection>

            <DashboardSection title="حالة NewsArticle Schema">
              <div className="space-y-2">
                <div className="text-center">
                  <p className="text-2xl font-black text-slate-900">
                    {data.schema.coverage_percent}%
                  </p>
                  <p className="text-xs font-semibold text-slate-500">تغطية صالحة</p>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between rounded-md bg-emerald-50 px-2 py-1 font-semibold">
                    <span>Valid</span>
                    <span>{data.schema.valid}</span>
                  </div>
                  <div className="flex justify-between rounded-md bg-orange-50 px-2 py-1 font-semibold">
                    <span>Incomplete</span>
                    <span>{data.schema.incomplete}</span>
                  </div>
                  <div className="flex justify-between rounded-md bg-red-50 px-2 py-1 font-semibold">
                    <span>Disabled</span>
                    <span>{data.schema.disabled}</span>
                  </div>
                </div>
              </div>
            </DashboardSection>

            <DashboardSection title="فحوصات الجاهزية">
              <div className="space-y-3">
                {data.google_news.readiness_checks.map((check) => (
                  <div
                    key={check.key}
                    className="flex items-center justify-between gap-3 rounded-lg border border-[#edf2f8] px-3 py-2"
                  >
                    <span className="text-sm font-bold text-[#17243a]">{check.label}</span>
                    {check.passed ? (
                      <CheckCircle2 size={18} className="text-[#157347]" />
                    ) : (
                      <XCircle size={18} className="text-[#b42318]" />
                    )}
                  </div>
                ))}
              </div>
            </DashboardSection>
          </div>

          <div className="grid gap-3 xl:grid-cols-2">
            <DashboardSection title={`أخبار آخر ${data.google_news.recent_window.hours} ساعة`}>
              <div className="space-y-2">
                {data.google_news.recent_articles.map((article) => (
                  <a
                    key={article.id}
                    href={`/admin/news/${article.id}/edit`}
                    className="flex items-center justify-between gap-2 rounded-md border border-slate-100 p-2 transition hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-black text-[#17243a]">{article.title}</p>
                      <p className="text-xs font-bold text-[#6e7e99]">
                        {article.category ?? "—"} ·{" "}
                        {article.published_at
                          ? formatPublishedAt(article.published_at)
                          : "—"}
                      </p>
                    </div>
                    <div className="flex shrink-0 flex-col items-end gap-1">
                      {statusBadge(article.schema_status)}
                      {statusBadge(article.google_news_status)}
                    </div>
                  </a>
                ))}
                {data.google_news.recent_articles.length === 0 ? (
                  <p className="text-sm text-[#6e7e99]">لا توجد أخبار في هذه النافذة.</p>
                ) : null}
              </div>
            </DashboardSection>

            <DashboardSection title="صفحات الثقة">
              <div className="space-y-2">
                {data.trust_pages.map((page) => (
                  <div
                    key={page.id}
                    className="flex items-center justify-between gap-2 rounded-md border border-slate-100 px-2 py-1.5"
                  >
                    <div className="flex items-center gap-3">
                      <ShieldCheck
                        size={18}
                        className={page.is_published ? "text-[#157347]" : "text-[#6e7e99]"}
                      />
                      <div>
                        <p className="font-black text-[#17243a]">{page.title}</p>
                        <p className="text-xs font-bold text-[#6e7e99]">/{page.slug}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {page.is_published ? (
                        <span className="rounded-full bg-[#f0fdf4] px-2 py-0.5 text-[10px] font-bold text-[#157347]">
                          منشورة
                        </span>
                      ) : (
                        <span className="rounded-full bg-[#fef2f2] px-2 py-0.5 text-[10px] font-bold text-[#b42318]">
                          غير منشورة
                        </span>
                      )}
                      <a
                        href={page.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0677e8]"
                      >
                        <ExternalLink size={15} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </DashboardSection>
          </div>

          <DashboardSection title="إحصائيات Google News">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {[
                { label: "مفعّلة", value: data.google_news.articles.enabled, icon: Newspaper },
                { label: "قيد المراجعة", value: data.google_news.articles.pending, icon: AlertTriangle },
                { label: "مؤهّلة", value: data.google_news.articles.eligible, icon: CheckCircle2 },
                { label: "منشورة", value: data.google_news.articles.published, icon: Globe2 },
                { label: "مرفوضة", value: data.google_news.articles.rejected, icon: XCircle },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-md border border-slate-100 bg-slate-50 p-2 text-center"
                >
                  <item.icon size={14} className="mx-auto text-sky-600" />
                  <p className="mt-1 text-lg font-black text-slate-900">{item.value}</p>
                  <p className="text-[10px] font-semibold text-slate-500">{item.label}</p>
                </div>
              ))}
            </div>
            {data.google_news.last_sync_at ? (
              <p className="mt-2 text-xs font-semibold text-slate-500">
                آخر مزامنة: {formatDateTime(data.google_news.last_sync_at)}
              </p>
            ) : (
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-orange-600">
                <FileText size={13} />
                لم تُسجَّل مزامنة Google News بعد
              </p>
            )}
          </DashboardSection>
        </div>
      )}
    </AdminDataState>
  );
}
