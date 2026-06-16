import type { Metadata } from "next";
import { Suspense } from "react";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "تسجيل الدخول",
};

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-[#6e7e99]">جاري التحميل...</div>}>
      <AdminLoginForm />
    </Suspense>
  );
}
