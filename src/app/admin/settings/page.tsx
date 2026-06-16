import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AdminDataState from "@/components/admin/AdminDataState";
import AdminOfflineMessage from "@/components/admin/AdminOfflineMessage";
import AdminListHeader from "@/components/admin/AdminListHeader";
import AdminSeoSettingsForm from "@/components/admin/AdminSeoSettingsForm";
import { admin } from "@/components/admin/admin-ui";
import { adminRequest } from "@/lib/api/admin-request";
import type { AdminSeoSettings } from "@/lib/api/admin-settings";
import { isConnectionError } from "@/lib/api/connection";

export const dynamic = "force-dynamic";

async function loadSeoSettings() {
  try {
    const json = await adminRequest<AdminSeoSettings>("/admin/settings/seo");
    return { status: "success" as const, data: json.data };
  } catch (error) {
    if (isConnectionError(error)) {
      return { status: "offline" as const };
    }

    return {
      status: "error" as const,
      message: error instanceof Error ? error.message : "تعذر تحميل الإعدادات",
    };
  }
}

export default async function AdminSettingsPage() {
  const result = await loadSeoSettings();

  if (result.status === "offline") {
    return <AdminOfflineMessage />;
  }

  return (
    <AdminDataState result={result}>
      {(settings) => (
        <div className={admin.page}>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <AdminListHeader
              title="إعدادات الموقع"
              description="ضبط Publisher Center، News Sitemap، وإعدادات الفهرسة."
            />
            <Link href="/admin/seo" className={admin.backLink}>
              <ArrowRight size={13} />
              العودة إلى لوحة السيو
            </Link>
          </div>

          <div className={admin.card}>
            <p className="text-xs font-bold text-slate-700">معلومات الموقع</p>
            <div className="mt-1.5 grid gap-1 text-xs font-semibold text-slate-500 sm:grid-cols-2">
              <p>الاسم: {settings.site_name}</p>
              <p>الرابط: {settings.site_url}</p>
            </div>
          </div>

          <AdminSeoSettingsForm initial={settings} />
        </div>
      )}
    </AdminDataState>
  );
}
