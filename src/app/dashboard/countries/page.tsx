import Link from "next/link";
import {
  Eye,
  FilePenLine,
  Globe2,
  MapPin,
  Plus,
  Search,
  TrendingUp,
} from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { dashboardCountries } from "@/data/dashboard";

const countryStats = [
  { label: "إجمالي الدول", value: dashboardCountries.length, icon: Globe2 },
  {
    label: "الدول المفعلة",
    value: dashboardCountries.filter((country) => country.status === "مفعلة").length,
    icon: MapPin,
  },
  {
    label: "أخبار مرتبطة بالدول",
    value: dashboardCountries.reduce((total, country) => total + country.newsCount, 0),
    icon: FilePenLine,
  },
  { label: "أكثر دولة زيارة", value: "تركيا", icon: TrendingUp },
];

export default function DashboardCountriesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-black text-[#17243a]">إدارة الدول</h1>
          <p className="mt-2 text-[#6e7e99]">تنظيم الدول وربط الأخبار السياحية بها</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#0ea5e9] px-5 py-3 font-black text-white">
          <Plus size={17} strokeWidth={1.85} />
          إضافة دولة جديدة
        </button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {countryStats.map((stat) => {
          const Icon = stat.icon;

          return (
            <article key={stat.label} className="rounded-xl border border-[#dce7f5] bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-black text-[#17243a]">{stat.label}</p>
                <span className="grid h-9 w-9 place-items-center rounded-lg border border-[#dce7f5] bg-[#fbfdff] text-[#53657f]">
                  <Icon size={17} strokeWidth={1.85} />
                </span>
              </div>
              <p className="mt-5 text-3xl font-black text-[#111827]">{stat.value}</p>
            </article>
          );
        })}
      </div>

      <DashboardSection title="بطاقات الدول">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {dashboardCountries.slice(0, 6).map((country) => (
            <article key={country.slug} className="overflow-hidden rounded-xl border border-[#dce7f5] bg-white">
              <img src={country.image} alt="" className="h-32 w-full object-cover" />
              <div className="p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{country.flag}</span>
                    <div>
                      <h2 className="font-black text-[#17243a]">{country.name}</h2>
                      <p className="text-xs font-bold text-[#6e7e99]">{country.region}</p>
                    </div>
                  </div>
                  <span className="rounded-lg border border-[#dce7f5] bg-[#fbfdff] px-3 py-1 text-xs font-black text-[#157347]">
                    SEO {country.seoScore}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <p className="rounded-lg bg-[#f8fafc] p-3">
                    <span className="block text-[#6e7e99]">الأخبار</span>
                    <strong className="text-[#17243a]">{country.newsCount}</strong>
                  </p>
                  <p className="rounded-lg bg-[#f8fafc] p-3">
                    <span className="block text-[#6e7e99]">الزيارات</span>
                    <strong className="text-[#17243a]">{country.visits}</strong>
                  </p>
                </div>
                <div className="mt-4 flex gap-2">
                  <Link
                    href={`/dashboard/news?country=${country.slug}`}
                    className="flex-1 rounded-lg bg-[#0ea5e9] px-3 py-2 text-center text-sm font-black text-white"
                  >
                    عرض الأخبار
                  </Link>
                  <button className="rounded-lg border border-[#dce7f5] px-3 py-2 text-sm font-black text-[#17243a]">
                    تعديل
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </DashboardSection>

      <section className="rounded-xl border border-[#dce7f5] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#dce7f5] p-5 xl:flex-row xl:items-center xl:justify-between">
          <label className="flex max-w-md items-center gap-3 rounded-lg border border-[#dce7f5] px-4 py-3 text-[#6e7e99]">
            <Search size={17} strokeWidth={1.85} />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none"
              placeholder="ابحث باسم الدولة أو slug"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {["الكل", "مفعلة", "مخفية", "الأكثر قراءة"].map((filter, index) => (
              <button
                key={filter}
                className={`rounded-lg border px-4 py-2 text-sm font-bold ${
                  index === 0
                    ? "border-[#9bc9ff] bg-[#eef7ff] text-[#0677e8]"
                    : "border-[#dce7f5] bg-white text-[#4d5e7c]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1080px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce7f5] bg-[#fbfdff] text-[#6e7e99]">
                <th className="px-4 py-4 text-right">الدولة</th>
                <th className="px-4 py-4 text-right">العلم</th>
                <th className="px-4 py-4 text-right">Slug</th>
                <th className="px-4 py-4 text-right">المنطقة</th>
                <th className="px-4 py-4 text-right">عدد الأخبار</th>
                <th className="px-4 py-4 text-right">عدد الزيارات</th>
                <th className="px-4 py-4 text-right">متوسط SEO</th>
                <th className="px-4 py-4 text-right">آخر خبر</th>
                <th className="px-4 py-4 text-right">الحالة</th>
                <th className="px-4 py-4 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {dashboardCountries.map((country) => (
                <tr key={country.slug} className="border-b border-[#edf2f8] last:border-0">
                  <td className="px-4 py-4 font-black text-[#17243a]">{country.name}</td>
                  <td className="px-4 py-4 text-2xl">{country.flag}</td>
                  <td className="px-4 py-4 font-mono text-[#4d5e7c]">{country.slug}</td>
                  <td className="px-4 py-4 text-[#4d5e7c]">{country.region}</td>
                  <td className="px-4 py-4 font-bold text-[#17243a]">{country.newsCount}</td>
                  <td className="px-4 py-4 font-bold text-[#17243a]">{country.visits}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-lg border border-[#dce7f5] bg-[#fbfdff] px-3 py-1 font-black text-[#17243a]">
                      {country.seoScore}
                    </span>
                  </td>
                  <td className="max-w-64 px-4 py-4 font-bold text-[#4d5e7c]">{country.lastNews}</td>
                  <td className="px-4 py-4">
                    <span className="rounded-lg bg-[#eafaf1] px-3 py-1 font-bold text-[#157347]">
                      {country.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 text-[#53657f]">
                      <button className="grid h-8 w-8 place-items-center rounded-md border border-[#dce7f5]" aria-label="عرض">
                        <Eye size={16} strokeWidth={1.85} />
                      </button>
                      <button className="grid h-8 w-8 place-items-center rounded-md border border-[#dce7f5]" aria-label="تعديل">
                        <FilePenLine size={16} strokeWidth={1.85} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
