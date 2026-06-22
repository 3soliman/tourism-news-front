import type { Metadata } from "next";
import { FilePenLine, Plus, UserRound } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import DeleteUserButton from "@/components/admin/DeleteUserButton";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminUsers } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "المستخدمون",
};

export default async function AdminUsersPage() {
  const [result, user] = await Promise.all([
    loadAdminUsers(),
    verifyAdminSession(),
  ]);
  const canCreate = hasPermission(user, AdminPermission.USERS_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.USERS_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.USERS_DELETE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إدارة المستخدمين"
        description="إنشاء حسابات الفريق وربطها بالأدوار المناسبة."
        actions={
          canCreate ? (
            <a href="/admin/users/create" className={admin.btnPrimary}>
              <Plus size={14} />
              إضافة مستخدم
            </a>
          ) : undefined
        }
      />

      <AdminDataState result={result}>
        {(users) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي المستخدمين:{" "}
                <span className="font-bold text-slate-800">{users.length}</span>
                {" — "}
                نشطون:{" "}
                <span className="font-bold text-emerald-600">
                  {users.filter((item) => item.status === "active").length}
                </span>
              </p>
            </div>

            <section className={admin.tableWrap}>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[960px] border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-500">
                      <th className={admin.th}>المستخدم</th>
                      <th className={admin.th}>البريد</th>
                      <th className={admin.th}>الأدوار</th>
                      <th className={admin.th}>الحالة</th>
                      <th className={admin.th}>الإجراءات</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((managedUser) => (
                      <tr
                        key={managedUser.id}
                        className="border-b border-slate-100 last:border-0"
                      >
                        <td className={admin.td}>
                          <div className="flex items-center gap-2">
                            <span className="grid h-8 w-8 place-items-center rounded-full bg-sky-50 text-sky-600">
                              <UserRound size={14} />
                            </span>
                            <span className="font-bold text-slate-800">
                              {managedUser.name}
                            </span>
                          </div>
                        </td>
                        <td className={`${admin.td} font-mono text-slate-500`}>
                          {managedUser.email}
                        </td>
                        <td className={admin.td}>
                          <div className="flex flex-wrap gap-1">
                            {managedUser.roles.map((role) => (
                              <span
                                key={role.id}
                                className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-bold text-violet-700"
                              >
                                {role.name}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className={admin.td}>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              managedUser.status === "active"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-slate-100 text-slate-500"
                            }`}
                          >
                            {managedUser.status === "active" ? "نشط" : "معطّل"}
                          </span>
                        </td>
                        <td className={admin.td}>
                          <div className="flex gap-1 text-slate-500">
                            {canUpdate ? (
                              <a
                                href={`/admin/users/${managedUser.id}/edit`}
                                className="grid h-7 w-7 place-items-center rounded border border-slate-200 hover:bg-slate-50"
                                aria-label="تعديل"
                              >
                                <FilePenLine size={14} strokeWidth={1.85} />
                              </a>
                            ) : null}
                            {canDelete ? (
                              <DeleteUserButton user={managedUser} />
                            ) : null}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {users.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500">
                  لا يوجد مستخدمون.
                </div>
              ) : null}
            </section>
          </>
        )}
      </AdminDataState>
    </div>
  );
}
