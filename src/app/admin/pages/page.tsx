import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, FilePenLine, ShieldCheck } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import { admin } from "@/components/admin/admin-ui";
import { getTrustPagePath } from "@/lib/api/pages";
import { loadAdminPages } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "صفحات الثقة",
};

export default async function AdminPagesPage() {
  const [result, user] = await Promise.all([
    loadAdminPages(),
    verifyAdminSession(),
  ]);
  const canUpdate = hasPermission(user, AdminPermission.PAGES_UPDATE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="صفحات الثقة"
        description="تعديل محتوى صفحات من نحن وسياسة الخصوصية وغيرها."
      />

      <AdminDataState result={result}>
        {(pages) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي الصفحات:{" "}
                <span className="font-bold text-slate-800">{pages.length}</span>
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={admin.th}>الصفحة</th>
                      <th className={admin.th}>Slug</th>
                      <th className={admin.th}>الحالة</th>
                      <th className={admin.th}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pages.map((page) => (
                      <tr key={page.id} className="border-b border-slate-100 last:border-0">
                        <td className={admin.td}>
                          <div className="flex items-center gap-2">
                            <ShieldCheck size={14} className="text-sky-600" />
                            <span className="font-bold text-slate-800">{page.title}</span>
                          </div>
                        </td>
                        <td className={`${admin.td} font-mono text-slate-500`}>{page.slug}</td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              page.isPublished
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {page.isPublished ? "منشورة" : "مسودة"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-1 text-slate-500">
                            {canUpdate ? (
                              <Link
                                href={`/admin/pages/${page.slug}/edit`}
                                className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </Link>
                            ) : null}
                            <a
                              href={getTrustPagePath(page.slug)}
                              target="_blank"
                              rel="noreferrer"
                              className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                              aria-label="عرض في الموقع"
                            >
                              <ExternalLink size={14} strokeWidth={1.85} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
