import type { Metadata } from "next";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminListHeader from "@/components/admin/AdminListHeader";
import RolePermissionsPanel from "@/components/admin/RolePermissionsPanel";
import { admin } from "@/components/admin/admin-ui";
import { loadAdminPermissions, loadAdminRoles } from "@/lib/api/admin";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "الأدوار والصلاحيات",
};

export default async function AdminRolesPage() {
  const [rolesResult, permissionsResult] = await Promise.all([
    loadAdminRoles(),
    loadAdminPermissions(),
  ]);

  if (rolesResult.status !== "success" || permissionsResult.status !== "success") {
    return (
      <div className={admin.page}>
        <AdminListHeader
          title="الأدوار والصلاحيات"
          description="اختر دورًا وعدّل صلاحياته من جدول مضغوط."
        />
        <AdminDataState
          result={
            rolesResult.status !== "success" ? rolesResult : permissionsResult
          }
        >
          {() => null}
        </AdminDataState>
      </div>
    );
  }

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="الأدوار والصلاحيات"
        description="اختر دورًا وعدّل صلاحياته من جدول مضغوط."
      />

      <RolePermissionsPanel
        initialRoles={rolesResult.data}
        permissions={permissionsResult.data}
      />
    </div>
  );
}
