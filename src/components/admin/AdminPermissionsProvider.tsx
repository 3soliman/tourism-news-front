"use client";

import { createContext, useContext } from "react";
import type { AdminUser } from "@/types";
import {
  hasAnyPermission,
  hasPermission,
  type AdminPermissionSlug,
} from "@/lib/admin-permissions";

type AdminPermissionsContextValue = {
  user: AdminUser;
  can: (permission: AdminPermissionSlug | string) => boolean;
  canAny: (permissions: Array<AdminPermissionSlug | string>) => boolean;
};

const AdminPermissionsContext = createContext<AdminPermissionsContextValue | null>(
  null,
);

type AdminPermissionsProviderProps = {
  user: AdminUser;
  children: React.ReactNode;
};

export function AdminPermissionsProvider({
  user,
  children,
}: AdminPermissionsProviderProps) {
  const value: AdminPermissionsContextValue = {
    user,
    can: (permission) => hasPermission(user, permission),
    canAny: (permissions) => hasAnyPermission(user, permissions),
  };

  return (
    <AdminPermissionsContext.Provider value={value}>
      {children}
    </AdminPermissionsContext.Provider>
  );
}

export function useAdminPermissions() {
  const context = useContext(AdminPermissionsContext);

  if (!context) {
    throw new Error("useAdminPermissions must be used within AdminPermissionsProvider");
  }

  return context;
}
