import { AlertTriangle, CheckCircle2, Save } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { news } from "@/data/news";
import { dashboardCountries, seoChecks } from "@/data/dashboard";

export default function DashboardSeoPage() {
  const article = news[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-[#17243a]">تحسين السيو</h1>
        <p className="mt-2 text-[#6e7e99]">حسّن إعدادات محركات البحث لمقالاتك وتحليل جاهزية Google News</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-[280px_1fr_280px]">
        <DashboardSection title="تقييم السيو العام">
          <div className="text-center">
            <div className="mx-auto grid h-36 w-36 place-items-center rounded-full border-[14px] border-[#b7efd0] text-4xl font-black text-[#17243a]">
              78
            </div>
            <p className="mt-3 font-black text-[#16a34a]">جيدة</p>
          </div>
        </DashboardSection>

        <section className="rounded-xl border border-[#dce7f5] bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4 border-b border-[#edf2f8] pb-5">
            <img src={article.image} alt="" className="h-24 w-32 rounded-xl object-cover" />
            <div>
              <span className="rounded-full bg-[#eafaf1] px-3 py-1 text-xs font-black text-[#16a34a]">
                منشور
              </span>
              <h2 className="mt-3 text-xl font-black text-[#17243a]">{article.title}</h2>
              <p className="mt-2 text-sm text-[#6e7e99]">منشور بواسطة سليمان الصباحي - {article.publishedAt}</p>
            </div>
          </div>

          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-black text-[#17243a]">الكلمة المفتاحية الرئيسية</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="فنادق إسطنبول للعائلات" />
            </label>
            <label className="block">
              <span className="text-sm font-black text-[#17243a]">الرابط المختصر</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue={article.slug} />
            </label>
            <label className="block">
              <span className="text-sm font-black text-[#17243a]">عنوان SEO</span>
              <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue={article.seoTitle} />
              <p className="mt-1 text-xs text-[#6e7e99]">55 / 60</p>
            </label>
            <label className="block">
              <span className="text-sm font-black text-[#17243a]">Meta Description</span>
              <textarea className="mt-2 min-h-28 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue={article.seoDescription} />
              <p className="mt-1 text-xs text-[#6e7e99]">136 / 160</p>
            </label>
          </div>

          <div className="mt-6 rounded-xl border border-[#dce7f5] bg-[#fbfdff] p-5">
            <h3 className="text-lg font-black text-[#17243a]">استهداف الدولة</h3>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">الدولة المستهدفة</span>
                <select className="mt-2 w-full rounded-lg border border-[#dce7f5] bg-white px-4 py-3">
                  {dashboardCountries.map((country) => (
                    <option key={country.slug}>{country.flag} {country.name}</option>
                  ))}
                </select>
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">الكلمة المفتاحية المحلية</span>
                <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="فنادق إسطنبول للعائلات" />
              </label>
              <label className="block">
                <span className="text-sm font-black text-[#17243a]">رابط صفحة الدولة</span>
                <input className="mt-2 w-full rounded-lg border border-[#dce7f5] px-4 py-3" defaultValue="/travel-news/countries/turkey" />
              </label>
              <div className="rounded-lg border border-[#dce7f5] bg-white p-4">
                <p className="text-sm font-black text-[#17243a]">حالة ظهور صفحة الدولة في Sitemap</p>
                <p className="mt-2 font-bold text-[#157347]">موجودة ومؤهلة للفهرسة</p>
              </div>
            </div>
            <div className="mt-4">
              <p className="mb-2 text-sm font-black text-[#17243a]">أخبار ذات صلة من نفس الدولة</p>
              <div className="grid gap-2 md:grid-cols-3">
                {["دليل السفر إلى إسطنبول", "أفضل مناطق السكن للعائلات", "نصائح حجز فنادق تركيا"].map((item) => (
                  <span key={item} className="rounded-lg border border-[#dce7f5] bg-white px-3 py-2 text-sm font-bold text-[#4d5e7c]">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0677e8] px-5 py-3 font-black text-white">
            <Save size={17} strokeWidth={1.85} />
            حفظ التغييرات
          </button>
        </section>

        <div className="space-y-5">
          <DashboardSection title="حالة Schema">
            <div className="space-y-3">
              {seoChecks.map((check) => (
                <div key={check.label} className="flex items-center justify-between gap-3">
                  <span className="font-bold text-[#17243a]">{check.label}</span>
                  <CheckCircle2 size={17} strokeWidth={1.85} className="text-[#157347]" />
                </div>
              ))}
            </div>
          </DashboardSection>
          <DashboardSection title="تنبيهات">
            <div className="space-y-3">
              {["الصورة المميزة كبيرة الحجم", "أضف المزيد من الروابط الداخلية"].map((item) => (
                <p key={item} className="flex gap-2 rounded-lg bg-[#fff7ed] p-3 text-sm font-bold text-[#b45309]">
                  <AlertTriangle size={17} strokeWidth={1.85} />
                  {item}
                </p>
              ))}
            </div>
          </DashboardSection>
        </div>
      </div>
    </div>
  );
}
