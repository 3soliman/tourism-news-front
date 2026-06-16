import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";
import { canAccessAdmin } from "@/lib/admin-permissions";
import { verifyAdminSession } from "@/lib/auth/verify-session";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default async function AdminLoginPage() {
  const user = await verifyAdminSession();

  if (user && canAccessAdmin(user)) {
    redirect("/admin");
  }

  return (
    <Suspense fallback={<div className="p-10 text-center text-[#6e7e99]">جاري التحميل...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
