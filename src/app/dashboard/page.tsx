import {
  CheckCircle2,
  Globe2,
  LineChart,
  TrendingUp,
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import DashboardSection from "@/components/dashboard/DashboardSection";
import {
  dashboardActivities,
  dashboardCategories,
  dashboardCountries,
  dashboardStats,
  publishingChecklist,
  quickOverview,
} from "@/data/dashboard";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-bold text-[#6e7e99]">الأحد، 25 مايو 2025</p>
          <h1 className="mt-3 text-3xl font-black text-[#17243a]">مرحبًا أحمد 👋</h1>
          <p className="mt-2 text-[#6e7e99]">إليك نظرة عامة على أداء الموقع اليوم</p>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-6">
        {dashboardStats.map((stat) => (
          <DashboardCard key={stat.label} {...stat} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.95fr_0.85fr]">
        <DashboardSection title="نظرة عامة على الزيارات">
          <div className="h-64 rounded-lg bg-[linear-gradient(180deg,#f8fbff,#ffffff)] p-4">
            <div className="flex h-full items-end gap-3 border-b border-r border-[#dce7f5] px-2">
              {[42, 55, 51, 57, 87, 73, 76].map((height, index) => (
                <div key={index} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t-xl bg-[#0677e8]"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs font-bold text-[#6e7e99]">{19 + index} مايو</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-4 grid grid-cols-3 divide-x divide-[#dce7f5] text-center">
            <p>
              <span className="block text-sm text-[#6e7e99]">إجمالي الزيارات</span>
              <strong className="text-2xl text-[#17243a]">156.8K</strong>
            </p>
            <p>
              <span className="block text-sm text-[#6e7e99]">متوسط اليوم</span>
              <strong className="text-2xl text-[#17243a]">22.4K</strong>
            </p>
            <p>
              <span className="block text-sm text-[#6e7e99]">أفضل يوم</span>
              <strong className="text-2xl text-[#17243a]">33.7K</strong>
            </p>
          </div>
        </DashboardSection>

        <DashboardSection title="أهم التصنيفات" action="عرض الكل">
          <div className="space-y-3">
            {dashboardCategories.map((category) => (
              <div
                key={category.slug}
                className="grid grid-cols-[64px_1fr_auto] items-center gap-3 border-b border-[#edf2f8] pb-3 last:border-0 last:pb-0"
              >
                <img
                  src={category.image}
                  alt=""
                  className="h-12 w-16 rounded-lg object-cover"
                />
                <div>
                  <p className="font-black text-[#17243a]">{category.label}</p>
                  <p className="text-xs font-bold text-[#6e7e99]">{category.articles} خبر</p>
                </div>
                <strong className="text-sm text-[#17243a]">{category.visits}</strong>
              </div>
            ))}
          </div>
        </DashboardSection>

        <DashboardSection title="النشاط الأخير">
          <div className="space-y-4">
            {dashboardActivities.map((activity, index) => (
              <div key={activity} className="flex gap-3">
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-[#0677e8] ring-4 ring-[#eef6ff]" />
                <div>
                  <p className="text-sm font-bold leading-6 text-[#17243a]">{activity}</p>
                  <p className="text-xs text-[#6e7e99]">منذ {15 + index * 10} دقيقة</p>
                </div>
              </div>
            ))}
          </div>
        </DashboardSection>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr]">
        <DashboardSection title="قائمة جاهزية النشر">
          <div className="mb-4 flex items-center justify-between">
            <span className="font-black text-[#16a34a]">6 / 6 مكتملة</span>
            <div className="h-2 w-48 overflow-hidden rounded-full bg-[#e8eef7]">
              <div className="h-full w-full bg-[#0677e8]" />
            </div>
          </div>
          <ul className="space-y-3">
            {publishingChecklist.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-[#17243a]">
                <CheckCircle2 size={18} className="text-[#16a34a]" />
                {item}
              </li>
            ))}
          </ul>
        </DashboardSection>

        <DashboardSection title="المهام التحريرية المعلقة">
          <div className="space-y-3">
            {["مراجعة وتحرير مشروع سياحي جديد", "تحسين SEO للسياحة العلاجية", "إضافة صور وفيديو لدليل المالديف"].map(
              (task, index) => (
                <div key={task} className="flex items-center gap-3 rounded-lg border border-[#edf2f8] p-3">
                  <span className={`rounded px-3 py-1 text-xs font-black ${index === 1 ? "bg-[#fff4e5] text-[#d97706]" : "bg-[#ffe9e9] text-[#dc2626]"}`}>
                    {index === 1 ? "متوسط" : "عالي"}
                  </span>
                  <p className="flex-1 text-sm font-bold text-[#17243a]">{task}</p>
                </div>
              ),
            )}
          </div>
        </DashboardSection>

        <DashboardSection title="نظرة سريعة">
          <div className="grid gap-3 sm:grid-cols-2">
            {quickOverview.map((item) => {
              const Icon = item.icon;

              return (
                <div key={item.label} className="rounded-xl border border-[#edf2f8] p-4">
                  <Icon size={18} strokeWidth={1.85} className="text-[#53657f]" />
                  <p className="mt-3 text-sm text-[#6e7e99]">{item.label}</p>
                  <p className="text-2xl font-black text-[#17243a]">{item.value}</p>
                </div>
              );
            })}
          </div>
        </DashboardSection>
      </div>

      <DashboardSection title="أكثر الدول قراءة" action="إدارة الدول">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {dashboardCountries.slice(0, 5).map((country) => (
            <div
              key={country.slug}
              className="flex items-center justify-between rounded-xl border border-[#edf2f8] bg-[#fbfdff] p-4"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{country.flag}</span>
                <div>
                  <p className="font-black text-[#17243a]">{country.name}</p>
                  <p className="text-sm font-bold text-[#6e7e99]">{country.visits} زيارة</p>
                </div>
              </div>
              <span className="h-2 w-2 rounded-full bg-[#0ea5e9]" />
            </div>
          ))}
        </div>
      </DashboardSection>

      <div className="grid gap-5 lg:grid-cols-3">
        <DashboardSection title="مؤشرات تقنية">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff]">
              <LineChart size={19} strokeWidth={1.85} className="text-[#075fb6]" />
            </span>
            <div>
              <p className="text-3xl font-black text-[#17243a]">98%</p>
              <p className="text-sm font-bold text-[#6e7e99]">جاهزية البنية لمحركات البحث</p>
            </div>
          </div>
        </DashboardSection>
        <DashboardSection title="Google News">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff]">
              <Globe2 size={19} strokeWidth={1.85} className="text-[#157347]" />
            </span>
            <div>
              <p className="text-3xl font-black text-[#17243a]">مفعّل</p>
              <p className="text-sm font-bold text-[#6e7e99]">آخر مزامنة: 9:30 ص</p>
            </div>
          </div>
        </DashboardSection>
        <DashboardSection title="النمو">
          <div className="flex items-center gap-4">
            <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff]">
              <TrendingUp size={19} strokeWidth={1.85} className="text-[#a15c07]" />
            </span>
            <div>
              <p className="text-3xl font-black text-[#17243a]">+22%</p>
              <p className="text-sm font-bold text-[#6e7e99]">نمو الزيارات هذا الأسبوع</p>
            </div>
          </div>
        </DashboardSection>
      </div>
    </div>
  );
}
