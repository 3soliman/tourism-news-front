import type { Metadata } from "next";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import AdminLayout from "@/components/admin/AdminLayout";
import { canAccessAdmin, hasAnyPermission } from "@/lib/admin-permissions";
import { resolveAdminRoutePermission } from "@/lib/admin-route-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const metadata: Metadata = {
  title: {
    default: "لوحة التحكم",
    template: "%s | لوحة التحكم",
  },
  robots: { index: false, follow: false },
};

export default async function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";

  if (pathname === "/admin/login") {
    return (
      <div className="min-h-screen bg-[#f7faff] text-[#17243a]">
        {children}
      </div>
    );
  }

  const user = await verifyAdminSession();

  if (!user) {
    redirect("/admin/login");
  }

  if (!canAccessAdmin(user)) {
    redirect("/admin/login?error=forbidden");
  }

  const requiredPermission = resolveAdminRoutePermission(pathname);

  if (requiredPermission) {
    const permissions = Array.isArray(requiredPermission)
      ? requiredPermission
      : [requiredPermission];

    if (!hasAnyPermission(user, permissions)) {
      redirect("/admin?denied=1");
    }
  }

  return <AdminLayout user={user}>{children}</AdminLayout>;
}
