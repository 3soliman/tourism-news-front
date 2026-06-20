import type { Metadata } from "next";
import { ArrowRightLeft } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import RedirectManager from "@/components/admin/RedirectManager";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminRedirects } from "@/lib/api/admin";
import { AdminPermission, hasPermission } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "إعادة التوجيه",
};

export default async function AdminRedirectsPage() {
  const [result, user] = await Promise.all([
    loadAdminRedirects(),
    verifyAdminSession(),
  ]);

  const canCreate = hasPermission(user, AdminPermission.REDIRECTS_CREATE);
  const canUpdate = hasPermission(user, AdminPermission.REDIRECTS_UPDATE);
  const canDelete = hasPermission(user, AdminPermission.REDIRECTS_DELETE);

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="إعادة التوجيه (Redirects)"
        description="حوّل الروابط القديمة المفهرسة في Google إلى مقالات أو صفحات جديدة دون فقدان الزيارات."
        actions={
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-xs font-bold text-sky-700">
            <ArrowRightLeft size={14} />
            301 موصى به
          </span>
        }
      />

      <AdminDataState result={result}>
        {(redirects) => (
          <>
            <div className={admin.statBar}>
              <p className="text-xs font-semibold text-slate-500">
                إجمالي التحويلات:{" "}
                <span className="font-bold text-slate-800">{redirects.length}</span>
              </p>
            </div>

            <RedirectManager
              redirects={redirects}
              canCreate={canCreate}
              canUpdate={canUpdate}
              canDelete={canDelete}
            />
          </>
        )}
      </AdminDataState>
    </div>
  );
}
