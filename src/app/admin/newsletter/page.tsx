import type { Metadata } from "next";
import { Mail, Send, Users } from "lucide-react";
import AdminListHeader from "@/components/admin/AdminListHeader";
import AdminNewsletterCampaignForm from "@/components/admin/AdminNewsletterCampaignForm";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { admin } from "@/components/admin/admin-ui";
import { fetchAdminNewsletterOverview } from "@/lib/api/admin-newsletter";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "النشرة البريدية",
};

function formatNumber(value?: number) {
  return (value ?? 0).toLocaleString("ar");
}

export default async function AdminNewsletterPage() {
  const data = await fetchAdminNewsletterOverview();

  const stats = [
    {
      label: "إجمالي المشتركين",
      value: data.stats.subscribers_total,
      icon: Users,
    },
    {
      label: "مشتركون نشطون",
      value: data.stats.subscribers_active,
      icon: Mail,
    },
    {
      label: "الحملات",
      value: data.stats.campaigns_total,
      icon: Send,
    },
    {
      label: "مرسل اليوم",
      value: data.stats.sent_today,
      icon: Mail,
    },
  ];

  return (
    <div className={admin.page}>
      <AdminListHeader
        title="النشرة البريدية"
        description="إدارة المشتركين، الحملات البريدية، وإشعارات الأخبار الجديدة."
      />

      <div className="grid gap-3 md:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.label} className={admin.statBar}>
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-slate-500">{item.label}</span>
                <Icon size={16} className="text-sky-600" />
              </div>
              <p className="mt-2 text-2xl font-black text-slate-900">
                {formatNumber(item.value)}
              </p>
            </div>
          );
        })}
      </div>

      <div className="grid gap-3 xl:grid-cols-[1fr_340px]">
        <DashboardSection
          title="المشتركون"
          description="آخر عناوين البريد المسجلة في النشرة."
        >
          <div className={admin.tableWrap}>
            <table className="w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className={admin.th}>البريد</th>
                  <th className={admin.th}>المصدر</th>
                  <th className={admin.th}>الحالة</th>
                  <th className={admin.th}>تاريخ الاشتراك</th>
                </tr>
              </thead>
              <tbody>
                {data.subscribers.slice(0, 12).map((subscriber) => (
                  <tr key={subscriber.id} className="border-t border-slate-100">
                    <td className={`${admin.td} font-bold text-slate-800`}>
                      {subscriber.email}
                    </td>
                    <td className={`${admin.td} text-slate-500`}>
                      {subscriber.source ?? "website"}
                    </td>
                    <td className={admin.td}>
                      <span className="rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-emerald-700">
                        {subscriber.status}
                      </span>
                    </td>
                    <td className={`${admin.td} text-slate-500`}>
                      {subscriber.subscribed_at ?? "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {data.subscribers.length === 0 ? (
              <p className="p-6 text-center text-sm font-bold text-slate-500">
                لا توجد اشتراكات حتى الآن، أو لم يتم ربط مسار Laravel بعد.
              </p>
            ) : null}
          </div>
        </DashboardSection>

        <DashboardSection
          title="إرسال حملة"
          description="رسالة عامة للمشتركين، بعيدًا عن إشعارات الأخبار."
        >
          <AdminNewsletterCampaignForm />
        </DashboardSection>
      </div>

      <DashboardSection title="آخر الحملات">
        <div className={admin.tableWrap}>
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className={admin.th}>العنوان</th>
                <th className={admin.th}>الخبر</th>
                <th className={admin.th}>الحالة</th>
                <th className={admin.th}>المستلمون</th>
                <th className={admin.th}>تاريخ الإرسال</th>
              </tr>
            </thead>
            <tbody>
              {data.campaigns.slice(0, 12).map((campaign) => (
                <tr key={campaign.id} className="border-t border-slate-100">
                  <td className={`${admin.td} font-bold text-slate-800`}>
                    {campaign.subject}
                  </td>
                  <td className={`${admin.td} text-slate-500`}>
                    {campaign.article_title ?? "حملة عامة"}
                  </td>
                  <td className={admin.td}>{campaign.status}</td>
                  <td className={`${admin.td} text-slate-500`}>
                    {formatNumber(campaign.sent_count)} ناجح /{" "}
                    {formatNumber(campaign.failed_count)} فاشل من{" "}
                    {formatNumber(campaign.recipients_count)}
                  </td>
                  <td className={`${admin.td} text-slate-500`}>
                    {campaign.sent_at ?? "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.campaigns.length === 0 ? (
            <p className="p-6 text-center text-sm font-bold text-slate-500">
              لا توجد حملات مسجلة حتى الآن.
            </p>
          ) : null}
        </div>
      </DashboardSection>

      <DashboardSection title="إعدادات Brevo">
        <div className="grid gap-3 text-sm md:grid-cols-4">
          <div className={admin.panel}>
            <p className={admin.panelTitle}>المزوّد</p>
            <p className="font-black text-slate-900">{data.settings.provider}</p>
          </div>
          <div className={admin.panel}>
            <p className={admin.panelTitle}>بريد الإرسال</p>
            <p className="font-black text-slate-900">
              {data.settings.from_email || "غير مضبوط"}
            </p>
          </div>
          <div className={admin.panel}>
            <p className={admin.panelTitle}>اسم المرسل</p>
            <p className="font-black text-slate-900">
              {data.settings.from_name || "غير مضبوط"}
            </p>
          </div>
          <div className={admin.panel}>
            <p className={admin.panelTitle}>الحالة</p>
            <p
              className={`font-black ${
                data.settings.is_enabled ? "text-emerald-700" : "text-rose-700"
              }`}
            >
              {data.settings.is_enabled ? "مفعلة" : "غير مفعلة"}
            </p>
            {!data.settings.is_enabled ? (
              <p className="mt-1 text-xs font-semibold leading-5 text-rose-600">
                Laravel لا يستخدم SMTP حالياً، لذلك لن تصل الرسائل للمشتركين.
              </p>
            ) : null}
          </div>
        </div>
      </DashboardSection>
    </div>
  );
}
