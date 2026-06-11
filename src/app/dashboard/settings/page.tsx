import { Mail, Save, Search, ShieldCheck, type LucideIcon } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { siteConfig } from "@/data/site";

const settingGroups: Array<{
  title: string;
  Icon: LucideIcon;
  items: string[];
}> = [
  {
    title: "إعدادات السيو والفهرسة",
    Icon: Search,
    items: ["robots.txt مفعل", "خريطة الموقع مفعلة", "فهرسة صفحات التصنيفات"],
  },
  {
    title: "الأمان والنسخ الاحتياطي",
    Icon: ShieldCheck,
    items: ["نسخة يومية", "حالة الأمان جيدة", "جميع الأنظمة محمية"],
  },
  {
    title: "إعدادات البريد والتنبيهات",
    Icon: Mail,
    items: ["إشعارات الأخبار الجديدة", "إشعارات التعليقات", "تقرير أسبوعي"],
  },
];

export default function DashboardSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[#17243a]">الإعدادات</h1>
        <p className="mt-2 text-[#6e7e99]">إعدادات الموقع العامة، التواصل، الفهرسة والتنبيهات</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <DashboardSection title="معلومات الموقع">
          <div className="grid gap-4">
            <label>
              <span className="text-sm font-black text-[#17243a]">اسم الموقع</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue={siteConfig.name} />
            </label>
            <label>
              <span className="text-sm font-black text-[#17243a]">وصف الموقع</span>
              <textarea className="mt-2 min-h-28 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue={siteConfig.description} />
            </label>
            <div className="flex items-center gap-4 rounded-lg border border-[#dce7f5] p-4">
              <img src={siteConfig.logo} alt="" className="h-16 w-16" />
              <button className="rounded-lg border border-[#dce7f5] px-4 py-2 font-bold text-[#0677e8]">
                تغيير الشعار
              </button>
            </div>
          </div>
        </DashboardSection>

        <DashboardSection title="معلومات التواصل">
          <div className="grid gap-4">
            <label>
              <span className="text-sm font-black text-[#17243a]">البريد الإلكتروني</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="info@tourismnews.com" />
            </label>
            <label>
              <span className="text-sm font-black text-[#17243a]">رقم الهاتف</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="+966 50 123 4567" />
            </label>
            <label>
              <span className="text-sm font-black text-[#17243a]">العنوان</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="الرياض، المملكة العربية السعودية" />
            </label>
          </div>
        </DashboardSection>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        {settingGroups.map(({ title, Icon, items }) => (
          <DashboardSection key={title} title={title}>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item} className="flex items-center justify-between border-b border-[#edf2f8] pb-3 last:border-0">
                  <span className="font-bold text-[#17243a]">{item}</span>
                  <span className="h-6 w-11 rounded-full bg-[#0677e8]" />
                </div>
              ))}
            </div>
            <span className="mt-5 grid h-9 w-9 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff] text-[#53657f]">
              <Icon size={17} strokeWidth={1.85} />
            </span>
          </DashboardSection>
        ))}
      </div>

      <button className="inline-flex items-center gap-2 rounded-lg bg-[#0677e8] px-6 py-3 font-black text-white">
        <Save size={17} strokeWidth={1.85} />
        حفظ الإعدادات
      </button>
    </div>
  );
}
