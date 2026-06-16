import type { Metadata } from "next";
import Link from "next/link";
import { FilePenLine, Plus, UserRound } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import DeleteAuthorButton from "@/components/admin/DeleteAuthorButton";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminAuthors } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الكتّاب",
};

export default async function AdminAuthorsPage() {
  const [result, user] = await Promise.all([
    loadAdminAuthors(),
    verifyAdminSession(),
  ]);
  const canCreate = hasPermission(user, AdminPermission.AUTHORS_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.AUTHORS_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.AUTHORS_DELETE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إدارة الكتّاب"
        description="إدارة ملفات الكتّاب ونبذاتهم وصورهم."
        actions={
          canCreate ? (
            <Link href="/admin/authors/create" className={admin.btnPrimary}>
              <Plus size={14} />
              إضافة كاتب جديد
            </Link>
          ) : undefined
        }
      />

      <AdminDataState result={result}>
        {(authors) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي الكتّاب:{" "}
                <span className="font-bold text-slate-800">{authors.length}</span>
                {" — "}
                نشطون:{" "}
                <span className="font-bold text-emerald-600">
                  {authors.filter((author) => author.isActive).length}
                </span>
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[1080px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={admin.th}>الكاتب</th>
                      <th className={admin.th}>الدور</th>
                      <th className={admin.th}>Slug</th>
                      <th className={admin.th}>الأخبار</th>
                      <th className={admin.th}>الحالة</th>
                      <th className={admin.th}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {authors.map((author) => (
                      <tr key={author.id} className="border-b border-slate-100 last:border-0">
                        <td className={admin.td}>
                          <div className="flex items-center gap-2">
                            {author.image ? (
                              <img
                                src={author.image}
                                alt=""
                                className="h-8 w-8 rounded-full object-cover"
                              />
                            ) : (
                              <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-sky-600">
                                <UserRound size={14} />
                              </span>
                            )}
                            <span className="font-bold text-slate-800">{author.name}</span>
                          </div>
                        </td>
                        <td className={`${admin.td} text-slate-500`}>{author.role || "—"}</td>
                        <td className={`${admin.td} font-mono text-slate-500`}>{author.slug}</td>
                        <td className={admin.td}>
                          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600">
                            {author.articlesCount}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              author.isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {author.isActive ? "نشط" : "معطّل"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-1 text-slate-500">
                            {canUpdate ? (
                              <Link
                                href={`/admin/authors/${author.id}/edit`}
                                className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </Link>
                            ) : null}
                            <Link
                              href={`/authors/${author.slug}`}
                              target="_blank"
                              className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                              aria-label="عرض في الموقع"
                            >
                              <UserRound size={14} strokeWidth={1.85} />
                            </Link>
                            {canDelete ? <DeleteAuthorButton author={author} /> : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {authors.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">لا يوجد كتّاب.</div>
              ) : null}
            </section>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
