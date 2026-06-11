import Link from "next/link";
import { Download, Eye, FilePenLine, Plus, Search, Trash2 } from "lucide-react";
import { countryFilterOptions, dashboardNewsRows } from "@/data/dashboard";
import { categories } from "@/data/categories";

export default function DashboardNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-black text-[#17243a]">إدارة الأخبار</h1>
          <p className="mt-2 text-[#6e7e99]">تنظيم وإدارة جميع المقالات والأخبار السياحية</p>
        </div>
        <div className="flex gap-3">
          <button className="inline-flex items-center gap-2 rounded-lg border border-[#dce7f5] bg-white px-4 py-3 font-black text-[#17243a]">
            <Download size={17} strokeWidth={1.85} />
            استيراد الأخبار
          </button>
          <Link
            href="/dashboard/news/new"
            className="inline-flex items-center gap-2 rounded-lg bg-[#0ea5e9] px-5 py-3 font-black text-white"
          >
            <Plus size={17} strokeWidth={1.85} />
            إضافة خبر جديد
          </Link>
        </div>
      </div>

      <section className="rounded-xl border border-[#dce7f5] bg-white p-5 shadow-sm">
        <div className="space-y-5">
          <div>
            <p className="mb-3 text-sm font-black text-[#17243a]">فلترة حسب التصنيف</p>
            <div className="grid gap-3 md:grid-cols-3 xl:grid-cols-5">
              <button className="rounded-lg border border-[#9bc9ff] bg-[#eef7ff] px-4 py-3 font-black text-[#0677e8]">
                الكل 1,248
              </button>
              {categories.slice(0, 4).map((category, index) => (
                <button
                  key={category.slug}
                  className="rounded-lg border border-[#dce7f5] px-4 py-3 font-bold text-[#4d5e7c]"
                >
                  {category.label} {312 - index * 42}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="mb-3 text-sm font-black text-[#17243a]">فلترة حسب الدولة</p>
            <div className="flex flex-wrap gap-2">
              {countryFilterOptions.map((country, index) => (
                <button
                  key={country}
                  className={`rounded-lg border px-4 py-2 text-sm font-bold ${
                    index === 0
                      ? "border-[#9bc9ff] bg-[#eef7ff] text-[#0677e8]"
                      : "border-[#dce7f5] bg-white text-[#4d5e7c]"
                  }`}
                >
                  {country}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-[#dce7f5] bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-[#dce7f5] p-5 lg:flex-row lg:items-center lg:justify-between">
          <label className="flex max-w-md items-center gap-3 rounded-lg border border-[#dce7f5] px-4 py-3 text-[#6e7e99]">
            <Search size={17} strokeWidth={1.85} />
            <input
              className="min-w-0 flex-1 bg-transparent outline-none"
              placeholder="ابحث في العنوان أو المحتوى..."
            />
          </label>
          <div className="flex gap-3">
            <select className="rounded-lg border border-[#dce7f5] bg-white px-4 py-3 text-sm font-bold">
              <option>إجراء</option>
              <option>نشر</option>
              <option>نقل للمراجعة</option>
            </select>
            <button className="rounded-lg border border-[#dce7f5] px-4 py-3 font-bold">
              تطبيق
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1120px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce7f5] bg-[#fbfdff] text-[#6e7e99]">
                <th className="px-4 py-4 text-right">العنوان</th>
                <th className="px-4 py-4 text-right">التصنيف</th>
                <th className="px-4 py-4 text-right">الدولة</th>
                <th className="px-4 py-4 text-right">الكاتب</th>
                <th className="px-4 py-4 text-right">تاريخ النشر</th>
                <th className="px-4 py-4 text-right">SEO</th>
                <th className="px-4 py-4 text-right">Google News</th>
                <th className="px-4 py-4 text-right">الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {dashboardNewsRows.map((row) => (
                <tr key={row.id} className="border-b border-[#edf2f8] last:border-0">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img src={row.image} alt="" className="h-12 w-16 rounded-lg object-cover" />
                      <span className="max-w-56 font-black text-[#17243a]">{row.title}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#eaf4ff] px-3 py-1 font-bold text-[#0677e8]">
                      {row.category}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="inline-flex items-center gap-2 rounded-lg border border-[#dce7f5] bg-[#fbfdff] px-3 py-2 font-bold text-[#17243a]">
                      <span>{row.country.flag}</span>
                      {row.country.name}
                    </span>
                  </td>
                  <td className="px-4 py-4 font-bold text-[#4d5e7c]">{row.author?.name}</td>
                  <td className="px-4 py-4 text-[#4d5e7c]">{row.publishedAt}</td>
                  <td className="px-4 py-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full border-4 border-[#b7efd0] font-black text-[#17243a]">
                      {row.seoScore}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <span className="rounded-full bg-[#eafaf1] px-3 py-1 font-bold text-[#16a34a]">
                      {row.googleNews}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2 text-[#53657f]">
                      <button className="grid h-8 w-8 place-items-center rounded-md border border-[#dce7f5] hover:bg-[#fbfdff]" aria-label="معاينة">
                        <Eye size={16} strokeWidth={1.85} />
                      </button>
                      <Link
                        href="/dashboard/news/new"
                        className="grid h-8 w-8 place-items-center rounded-md border border-[#dce7f5] hover:bg-[#fbfdff]"
                        aria-label="تحرير"
                      >
                        <FilePenLine size={16} strokeWidth={1.85} />
                      </Link>
                      <button className="grid h-8 w-8 place-items-center rounded-md border border-[#f1c7c7] text-[#b42318] hover:bg-[#fff7f7]" aria-label="حذف">
                        <Trash2 size={16} strokeWidth={1.85} />
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
