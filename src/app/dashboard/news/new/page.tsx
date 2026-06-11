import Link from "next/link";
import { ArrowRight, Save } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { categories } from "@/data/categories";
import { dashboardCountries } from "@/data/dashboard";

export default function DashboardNewsEditorPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <Link
            href="/dashboard/news"
            className="inline-flex items-center gap-2 text-sm font-black text-[#0677e8]"
          >
            <ArrowRight size={16} strokeWidth={1.85} />
            العودة إلى الأخبار
          </Link>
          <h1 className="mt-3 text-3xl font-black text-[#17243a]">إضافة / تعديل خبر</h1>
          <p className="mt-2 text-[#6e7e99]">إعداد بيانات الخبر وربطه بالتصنيف والدولة والوجهة السياحية</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#0ea5e9] px-6 py-3 font-black text-white">
          <Save size={17} strokeWidth={1.85} />
          حفظ الخبر
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
        <section className="rounded-xl border border-[#dce7f5] bg-white p-5 shadow-sm">
          <div className="grid gap-5">
            <label>
              <span className="text-sm font-black text-[#17243a]">عنوان الخبر</span>
              <input
                className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                defaultValue="أفضل فنادق إسطنبول للعائلات في 2026"
              />
            </label>
            <label>
              <span className="text-sm font-black text-[#17243a]">ملخص الخبر</span>
              <textarea
                className="mt-2 min-h-24 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                defaultValue="دليل سريع لاختيار الفنادق المناسبة للعائلات العربية في إسطنبول."
              />
            </label>
            <label>
              <span className="text-sm font-black text-[#17243a]">محتوى الخبر</span>
              <textarea
                className="mt-2 min-h-72 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                defaultValue="اكتب محتوى الخبر الأصلي هنا..."
              />
            </label>
          </div>
        </section>

        <div className="space-y-5">
          <DashboardSection title="الربط التحريري">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">التصنيف</span>
                <select className="mt-2 w-full rounded-lg border border-[#dce7f5] bg-white px-4 py-3">
                  {categories.map((category) => (
                    <option key={category.slug}>{category.label}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">الدولة المرتبطة بالخبر</span>
                <select className="mt-2 w-full rounded-lg border border-[#dce7f5] bg-white px-4 py-3">
                  {dashboardCountries.map((country) => (
                    <option key={country.slug}>{country.flag} {country.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">المدينة / الوجهة</span>
                <input
                  className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                  defaultValue="إسطنبول"
                  placeholder="مثال: إسطنبول"
                />
              </label>
            </div>
          </DashboardSection>

          <DashboardSection title="السيو المختصر">
            <div className="space-y-4">
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">عنوان SEO</span>
                <input
                  className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                  defaultValue="أفضل فنادق إسطنبول للعائلات 2026"
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">Meta Description</span>
                <textarea
                  className="mt-2 min-h-24 w-full rounded-lg border border-[#dce7f5] px-4 py-3"
                  defaultValue="تعرف على أفضل فنادق إسطنبول للعائلات في 2026 مع نصائح قبل الحجز."
                />
              </label>
            </div>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}
