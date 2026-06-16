"use client";

import { useState } from "react";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminTopbar from "@/components/admin/AdminTopbar";
import { AdminPermissionsProvider } from "@/components/admin/AdminPermissionsProvider";
import type { AdminUser } from "@/types";

type AdminLayoutProps = {
  children: React.ReactNode;
  user: AdminUser;
};

export default function AdminLayout({ children, user }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AdminPermissionsProvider user={user}>
      <div className="min-h-screen bg-slate-100 text-slate-900">
        <AdminSidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          user={user}
        />

        <div className="xl:pr-56">
          <AdminTopbar user={user} onMenuClick={() => setSidebarOpen(true)} />
          <main className="px-3 py-4 lg:px-5 lg:py-5">{children}</main>
        </div>
      </div>
    </AdminPermissionsProvider>
  );
}
