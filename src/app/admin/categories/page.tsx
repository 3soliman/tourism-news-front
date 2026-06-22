import type { Metadata } from "next";
import { FilePenLine, FolderOpen, Plus } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminCategories } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "التصنيفات",
};

export default async function AdminCategoriesPage() {
  const [result, user] = await Promise.all([
    loadAdminCategories(),
    verifyAdminSession(),
  ]);
  const canCreate = hasPermission(user, AdminPermission.CATEGORIES_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.CATEGORIES_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.CATEGORIES_DELETE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إدارة التصنيفات"
        description="إضافة وتعديل وحذف تصنيفات الأخبار وترتيبها."
        actions={
          canCreate ? (
            <a href="/admin/categories/create" className={admin.btnPrimary}>
              <Plus size={14} />
              إضافة تصنيف جديد
            </a>
          ) : undefined
        }
      />

      <AdminDataState result={result}>
        {(categories) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي التصنيفات:{" "}
                <span className="font-bold text-slate-800">{categories.length}</span>
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={admin.th}>الاسم</th>
                      <th className={admin.th}>Slug</th>
                      <th className={admin.th}>الترتيب</th>
                      <th className={admin.th}>الأخبار</th>
                      <th className={admin.th}>الحالة</th>
                      <th className={admin.th}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((category) => (
                      <tr key={category.id} className="border-b border-slate-100 last:border-0">
                        <td className={`${admin.td} font-bold text-slate-800`}>{category.label}</td>
                        <td className={`${admin.td} font-mono text-slate-500`}>{category.slug}</td>
                        <td className={`${admin.td} text-slate-500`}>{category.sortOrder}</td>
                        <td className={admin.td}>
                          <span className="rounded-full bg-sky-50 px-2 py-0.5 text-[10px] font-bold text-sky-600">
                            {category.articlesCount}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              category.isActive
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {category.isActive ? "نشط" : "معطّل"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-1 text-slate-500">
                            {canUpdate ? (
                              <a
                                href={`/admin/categories/${category.id}/edit`}
                                className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </a>
                            ) : null}
                            <a
                              href={`/travel-news/${category.slug}`}
                              target="_blank"
                              className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                              aria-label="عرض في الموقع"
                            >
                              <FolderOpen size={14} strokeWidth={1.85} />
                            </a>
                            {canDelete ? (
                              <DeleteCategoryButton
                                categoryId={category.id}
                                label={category.label}
                                articlesCount={category.articlesCount}
                              />
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {categories.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">لا توجد تصنيفات.</div>
              ) : null}
            </section>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
