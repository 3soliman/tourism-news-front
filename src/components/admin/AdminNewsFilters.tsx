"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { RotateCcw, Search } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";

export type AdminNewsFilterOption = {
  value: string;
  label: string;
};

type AdminNewsFiltersProps = {
  categories: AdminNewsFilterOption[];
  countries: AdminNewsFilterOption[];
  authors: AdminNewsFilterOption[];
};

const statusOptions: AdminNewsFilterOption[] = [
  { value: "", label: "كل الحالات" },
  { value: "draft", label: "مسودة" },
  { value: "review", label: "مراجعة" },
  { value: "published", label: "منشور" },
  { value: "scheduled", label: "مجدول" },
  { value: "archived", label: "مؤرشف" },
];

export default function AdminNewsFilters({
  categories,
  countries,
  authors,
}: AdminNewsFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState(searchParams.get("search") ?? "");
  const [status, setStatus] = useState(searchParams.get("status") ?? "");
  const [category, setCategory] = useState(searchParams.get("category") ?? "");
  const [country, setCountry] = useState(searchParams.get("country") ?? "");
  const [author, setAuthor] = useState(searchParams.get("author") ?? "");

  const applyFilters = (overrides: Record<string, string> = {}) => {
    const params = new URLSearchParams();

    const values = {
      search,
      status,
      category,
      country,
      author,
      ...overrides,
    };

    Object.entries(values).forEach(([key, value]) => {
      if (value.trim()) {
        params.set(key, value.trim());
      }
    });

    const qs = params.toString();
    router.push(qs ? `/admin/news?${qs}` : "/admin/news");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    applyFilters();
  };

  const handleReset = () => {
    setSearch("");
    setStatus("");
    setCategory("");
    setCountry("");
    setAuthor("");
    router.push("/admin/news");
  };

  const hasActiveFilters =
    search || status || category || country || author;

  return (
    <form onSubmit={handleSubmit} className={admin.card}>
      <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-[minmax(180px,1.7fr)_repeat(4,minmax(100px,1fr))_auto]">
        <label>
          <span className="sr-only">بحث</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="عنوان، ملخص، أو slug..."
            className={admin.input}
          />
        </label>

        <label>
          <span className="sr-only">الحالة</span>
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={admin.select}
          >
            {statusOptions.map((option) => (
              <option key={option.value || "all"} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">التصنيف</span>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className={admin.select}
          >
            <option value="">كل التصنيفات</option>
            {categories.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">الدولة</span>
          <select
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            className={admin.select}
          >
            <option value="">كل الدول</option>
            {countries.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span className="sr-only">الكاتب</span>
          <select
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            className={admin.select}
          >
            <option value="">كل الكتّاب</option>
            {authors.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <div className="flex items-center gap-1">
          <button type="submit" className={`${admin.btnPrimary} flex-1 justify-center`}>
            <Search size={13} />
            تطبيق
          </button>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={handleReset}
              className="grid h-7 w-7 shrink-0 place-items-center rounded-md border border-slate-200 text-slate-500 hover:bg-slate-50"
              aria-label="إعادة ضبط الفلاتر"
              title="إعادة ضبط الفلاتر"
            >
              <RotateCcw size={13} />
            </button>
          ) : null}
        </div>
      </div>
    </form>
  );
}
