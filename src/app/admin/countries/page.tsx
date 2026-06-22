import type { Metadata } from "next";
import { FilePenLine, Globe2, Plus } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import DeleteCountryButton from "@/components/admin/DeleteCountryButton";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminCountries } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الدول",
};

export default async function AdminCountriesPage() {
  const [result, user] = await Promise.all([
    loadAdminCountries(),
    verifyAdminSession(),
  ]);
  const canCreate = hasPermission(user, AdminPermission.COUNTRIES_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.COUNTRIES_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.COUNTRIES_DELETE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إدارة الدول"
        description="الدول النشطة تظهر في فلتر الزائر على الموقع."
        actions={
          canCreate ? (
            <a href="/admin/countries/create" className={admin.btnPrimary}>
              <Plus size={14} />
              إضافة دولة جديدة
            </a>
          ) : undefined
        }
      />

      <AdminDataState result={result}>
        {(countries) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي الدول:{" "}
                <span className="font-bold text-slate-800">{countries.length}</span>
                {" — "}
                نشطة:{" "}
                <span className="font-bold text-emerald-600">
                  {countries.filter((country) => country.isActive).length}
                </span>
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1080px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={admin.th}>الدولة</th>
                      <th className={admin.th}>العلم</th>
                      <th className={admin.th}>Slug</th>
                      <th className={admin.th}>الرمز</th>
                      <th className={admin.th}>المنطقة</th>
                      <th className={admin.th}>الأخبار</th>
                      <th className={admin.th}>الحالة</th>
                      <th className={admin.th}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {countries.map((country) => (
                      <tr key={country.id} className="border-b border-slate-100 last:border-0">
                        <td className={`${admin.td} font-bold text-slate-800`}>{country.name}</td>
                        <td className={`${admin.td} text-lg`}>{country.flag}</td>
                        <td className={`${admin.td} font-mono text-slate-500`}>{country.slug}</td>
                        <td className={`${admin.td} font-mono text-slate-500`}>{country.code || "—"}</td>
                        <td className={`${admin.td} text-slate-500`}>{country.region || "—"}</td>
                        <td className={admin.td}>
                          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600">
                            {country.articlesCount}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              country.isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {country.isActive ? "نشطة" : "معطّلة"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-1 text-slate-500">
                            {canUpdate ? (
                              <a
                                href={`/admin/countries/${country.id}/edit`}
                                className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </a>
                            ) : null}
                            <a
                              href={`/travel-news?country=${country.slug}`}
                              target="_blank"
                              className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                              aria-label="عرض في الموقع"
                            >
                              <Globe2 size={14} strokeWidth={1.85} />
                            </a>
                            {canDelete ? <DeleteCountryButton country={country} /> : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {countries.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">لا توجد دول.</div>
              ) : null}
            </section>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
