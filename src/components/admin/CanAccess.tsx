"use client";

import type { AdminPermissionSlug } from "@/lib/admin-permissions";
import { useAdminPermissions } from "@/components/admin/AdminPermissionsProvider";

type CanAccessProps = {
  permission: AdminPermissionSlug | string | Array<AdminPermissionSlug | string>;
  children: React.ReactNode;
  fallback?: React.ReactNode;
};

export default function CanAccess({
  permission,
  children,
  fallback = null,
}: CanAccessProps) {
  const { can, canAny } = useAdminPermissions();
  const allowed = Array.isArray(permission)
    ? canAny(permission)
    : can(permission);

  if (!allowed) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
