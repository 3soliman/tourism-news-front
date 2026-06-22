import {
  ArrowUpRight,
  BarChart3,
  Eye,
  FileEdit,
  FileText,
  LayoutGrid,
  MapPin,
  Newspaper,
  Plus,
  Settings,
  Users,
} from "lucide-react";
import type { AdminOverviewData } from "@/lib/api/admin-overview";
import { formatViewDateTime } from "@/lib/analytics-format";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { resolveMediaUrl } from "@/lib/media-url";
import type { AdminUser } from "@/types";

const statusLabels: Record<string, string> = {
  draft: "مسودة",
  review: "مراجعة",
  published: "منشور",
  scheduled: "مجدول",
  archived: "مؤرشف",
};

const statusColors: Record<string, string> = {
  draft: "bg-slate-100 text-slate-600",
  review: "bg-amber-50 text-amber-700",
  published: "bg-emerald-50 text-emerald-700",
  scheduled: "bg-sky-50 text-sky-700",
  archived: "bg-red-50 text-red-600",
};

const quickActions = [
  {
    href: "/admin/news/create",
    label: "خبر جديد",
    icon: Plus,
    accent: "bg-sky-600",
    permission: AdminPermission.NEWS_CREATE,
  },
  {
    href: "/admin/categories/create",
    label: "تصنيف",
    icon: LayoutGrid,
    accent: "bg-violet-600",
    permission: AdminPermission.CATEGORIES_CREATE,
  },
  {
    href: "/admin/countries/create",
    label: "دولة",
    icon: MapPin,
    accent: "bg-amber-600",
    permission: AdminPermission.COUNTRIES_CREATE,
  },
];

type AdminDashboardProps = {
  data: AdminOverviewData;
  user: AdminUser;
  accessDenied?: boolean;
};

function KpiTile({
  label,
  value,
  href,
  tone,
}: {
  label: string;
  value: number | string;
  href?: string;
  tone: string;
}) {
  const content = (
    <div className={`rounded-lg border px-3 py-2.5 ${tone}`}>
      <p className="text-[11px] font-bold text-slate-500">{label}</p>
      <p className="mt-0.5 text-xl font-black text-slate-900">{value}</p>
    </div>
  );

  if (!href) return content;

  return (
    <a href={href} className="block transition hover:opacity-90">
      {content}
    </a>
  );
}

export default function AdminDashboard({
  data,
  user,
  accessDenied = false,
}: AdminDashboardProps) {
  const visibleQuickActions = quickActions.filter((action) =>
    hasPermission(user, action.permission),
  );

  const seoTone =
    data.seo_average >= 80
      ? "text-emerald-600"
      : data.seo_average >= 50
        ? "text-amber-600"
        : "text-red-600";

  return (
    <div className="space-y-4">
      {accessDenied ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800">
          ليس لديك صلاحية الوصول إلى الصفحة المطلوبة.
        </div>
      ) : null}

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">
            مرحبًا، {user.name}
          </h1>
          <p className="mt-1 text-sm font-medium text-slate-500">
            ملخص المنصة — كل المؤشرات في مكان واحد
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {visibleQuickActions.map((action) => (
            <a
              key={action.href}
              href={action.href}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-black text-white ${action.accent}`}
            >
              <action.icon size={14} />
              {action.label}
            </a>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 xl:grid-cols-8">
        <KpiTile
          label="منشور"
          value={data.news.published}
          href={hasPermission(user, AdminPermission.NEWS_VIEW) ? "/admin/news?status=published" : undefined}
          tone="border-emerald-100 bg-emerald-50/50"
        />
        <KpiTile
          label="مسودات"
          value={data.news.draft}
          href={hasPermission(user, AdminPermission.NEWS_VIEW) ? "/admin/news?status=draft" : undefined}
          tone="border-slate-200 bg-white"
        />
        <KpiTile
          label="مجدول"
          value={data.news.scheduled}
          href={hasPermission(user, AdminPermission.NEWS_VIEW) ? "/admin/news?status=scheduled" : undefined}
          tone="border-sky-100 bg-sky-50/50"
        />
        <KpiTile
          label="إجمالي الأخبار"
          value={data.news.total}
          href={hasPermission(user, AdminPermission.NEWS_VIEW) ? "/admin/news" : undefined}
          tone="border-slate-200 bg-white"
        />
        <KpiTile
          label="التصنيفات"
          value={data.categories_count}
          href={hasPermission(user, AdminPermission.CATEGORIES_VIEW) ? "/admin/categories" : undefined}
          tone="border-violet-100 bg-violet-50/50"
        />
        <KpiTile
          label="الدول"
          value={data.countries_count}
          href={hasPermission(user, AdminPermission.COUNTRIES_VIEW) ? "/admin/countries" : undefined}
          tone="border-amber-100 bg-amber-50/50"
        />
        <KpiTile
          label="قراءات اليوم"
          value={data.views.views_today}
          href={hasPermission(user, AdminPermission.ANALYTICS_VIEW) ? "/admin/analytics" : undefined}
          tone="border-emerald-100 bg-emerald-50/50"
        />
        <KpiTile
          label="إجمالي القراءات"
          value={data.views.total_views}
          href={hasPermission(user, AdminPermission.ANALYTICS_VIEW) ? "/admin/analytics" : undefined}
          tone="border-sky-100 bg-sky-50/50"
        />
        <KpiTile
          label="متوسط SEO"
          value={`${data.seo_average}%`}
          href={hasPermission(user, AdminPermission.SEO_VIEW) ? "/admin/seo" : undefined}
          tone="border-slate-200 bg-white"
        />
        <a
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-900 px-3 py-2.5 text-white transition hover:bg-slate-800"
        >
          <div>
            <p className="text-[11px] font-bold text-slate-300">الموقع</p>
            <p className="mt-0.5 text-sm font-black">معاينة</p>
          </div>
          <ArrowUpRight size={16} />
        </a>
      </div>

      <div className="grid gap-4 xl:grid-cols-12">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white xl:col-span-7">
          <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
            <div className="flex items-center gap-2">
              <Newspaper size={16} className="text-sky-600" />
              <h2 className="text-sm font-black text-slate-900">أحدث الأخبار</h2>
            </div>
            <a href="/admin/news" className="text-xs font-black text-sky-600">
              عرض الكل
            </a>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] text-sm">
              <thead>
                <tr className="bg-slate-50 text-[11px] font-bold text-slate-500">
                  <th className="px-4 py-2 text-right">الخبر</th>
                  <th className="px-3 py-2 text-right">التصنيف</th>
                  <th className="px-3 py-2 text-right">القراءات</th>
                  <th className="px-3 py-2 text-right">الحالة</th>
                  <th className="px-3 py-2 text-right">التاريخ</th>
                </tr>
              </thead>
              <tbody>
                {data.latest_news.slice(0, 6).map((article) => (
                  <tr key={article.id} className="border-t border-slate-100">
                    <td className="px-4 py-2.5">
                      <a
                        href={`/admin/news/${article.id}/edit`}
                        className="flex items-center gap-2.5 hover:text-sky-600"
                      >
                        <img
                          src={resolveMediaUrl(article.image)}
                          alt=""
                          className="h-9 w-12 shrink-0 rounded object-cover"
                        />
                        <span className="line-clamp-1 font-bold text-slate-800">
                          {article.title}
                        </span>
                      </a>
                    </td>
                    <td className="px-3 py-2.5 text-xs font-medium text-slate-500">
                      {article.category}
                    </td>
                    <td className="px-3 py-2.5 text-xs font-bold text-sky-700">
                      {article.viewsCount ?? 0}
                    </td>
                    <td className="px-3 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          statusColors[article.status] ?? statusColors.draft
                        }`}
                      >
                        {statusLabels[article.status] ?? article.status}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 text-xs text-slate-500">
                      {article.publishedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <div className="grid gap-4 xl:col-span-5">
          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 size={16} className="text-sky-600" />
                <h2 className="text-sm font-black text-slate-900">أداء SEO</h2>
              </div>
              <a href="/admin/seo" className="text-xs font-black text-sky-600">
                التفاصيل
              </a>
            </div>
            <div className="mt-3 flex items-end justify-between">
              <p className={`text-3xl font-black ${seoTone}`}>{data.seo_average}%</p>
              <div className="text-left text-[11px] font-bold text-slate-500">
                <p>Google News</p>
                <a href="/admin/seo" className="text-sky-600">
                  مراجعة الجاهزية
                </a>
              </div>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-sky-500"
                style={{ width: `${Math.min(100, data.seo_average)}%` }}
              />
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye size={16} className="text-sky-600" />
                <h2 className="text-sm font-black text-slate-900">الأكثر قراءة</h2>
              </div>
              <a href="/admin/analytics" className="text-xs font-black text-sky-600">
                التفاصيل
              </a>
            </div>
            <div className="space-y-2">
              {data.top_by_views.length > 0 ? (
                data.top_by_views.map((article, i) => (
                  <div
                    key={article.id}
                    className="flex items-center justify-between gap-2 text-sm"
                  >
                    <a
                      href={`/admin/news/${article.id}/edit`}
                      className="min-w-0 flex-1 font-bold text-slate-700 hover:text-sky-600"
                    >
                      <span className="ml-2 text-xs text-slate-400">{i + 1}</span>
                      <span className="line-clamp-1">{article.title}</span>
                    </a>
                    <div className="shrink-0 text-left text-[11px] font-bold text-slate-500">
                      <p className="text-sky-700">{article.views_count}</p>
                      <p>{formatViewDateTime(article.last_viewed_at)}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">لا توجد قراءات مسجّلة بعد.</p>
              )}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <MapPin size={16} className="text-amber-600" />
              <h2 className="text-sm font-black text-slate-900">أكثر الدول</h2>
            </div>
            <div className="space-y-2">
              {data.top_countries.slice(0, 5).map((country, i) => (
                <div
                  key={country.id}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="flex items-center gap-2 font-bold text-slate-700">
                    <span className="w-4 text-xs text-slate-400">{i + 1}</span>
                    <span>{country.flag}</span>
                    {country.name}
                  </span>
                  <span className="text-xs font-bold text-slate-500">
                    {country.articles_count}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-3 flex items-center gap-2">
              <LayoutGrid size={16} className="text-violet-600" />
              <h2 className="text-sm font-black text-slate-900">أكثر التصنيفات</h2>
            </div>
            <div className="space-y-2.5">
              {data.top_categories.slice(0, 5).map((category) => {
                const max = data.top_categories[0]?.articles_count ?? 1;
                const width = Math.round((category.articles_count / max) * 100);
                return (
                  <div key={category.id}>
                    <div className="mb-1 flex justify-between text-xs font-bold">
                      <span className="text-slate-700">{category.name}</span>
                      <span className="text-slate-400">{category.articles_count}</span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-violet-500"
                        style={{ width: `${width}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-3">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-wide text-slate-400">
          وصول سريع
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
          {[
            { href: "/admin/news", label: "الأخبار", icon: Newspaper },
            { href: "/admin/analytics", label: "مراقبة القراءة", icon: Eye },
            { href: "/admin/categories", label: "التصنيفات", icon: LayoutGrid },
            { href: "/admin/countries", label: "الدول", icon: MapPin },
            { href: "/admin/users", label: "المستخدمون", icon: Users },
            { href: "/admin/pages", label: "صفحات الثقة", icon: FileText },
            { href: "/admin/seo", label: "السيو", icon: BarChart3 },
            { href: "/admin/settings", label: "الإعدادات", icon: Settings },
            {
              href: "/admin/news?status=draft",
              label: "المسودات",
              icon: FileEdit,
            },
          ].map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="flex items-center gap-2 rounded-lg border border-slate-100 px-3 py-2.5 text-xs font-bold text-slate-700 transition hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700"
            >
              <item.icon size={14} className="shrink-0" />
              {item.label}
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
