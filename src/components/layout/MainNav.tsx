"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { Suspense, useState } from "react";
import CountryFilterDropdown from "@/components/CountryFilterDropdown";
import type { Category, Country } from "@/types";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/travel-news", label: "أخبار السياحة", hasMega: true },
  { href: "/travel-news/aviation", label: "أخبار الطيران" },
  { href: "/travel-news/visas", label: "أخبار التأشيرات" },
  { href: "/travel-news/hotels", label: "أخبار الفنادق" },
  { href: "/travel-news/destinations", label: "أخبار الوجهات" },
  { href: "/travel-news/international", label: "السفر الدولي" },
  { href: "/contact", label: "اتصل بنا" },
];

type MainNavProps = {
  categories: Category[];
  countries: Country[];
};

export default function MainNav({ categories, countries }: MainNavProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="glass-surface border-b border-border/60 shadow-lg shadow-primary-dark/8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:hidden">
          <span className="py-3 text-sm font-black text-primary-dark">القائمة</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-white text-primary-dark transition hover:bg-surface-alt"
            aria-label="فتح القائمة"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className={`${open ? "block" : "hidden"} border-t border-border/60 lg:block lg:border-0`}>
          <ul className="flex-col py-2 lg:flex lg:flex-row lg:py-0">
            {navItems.slice(0, 7).map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-bold transition lg:my-2 lg:py-2.5 ${
                    isActive(item.href)
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-text-dark hover:bg-primary-50 hover:text-primary"
                  }`}
                >
                  {item.label}
                  {item.hasMega && <ChevronDown size={14} className="hidden lg:block" />}
                </Link>

                {item.hasMega && (
                  <div className="pointer-events-none absolute right-0 top-full z-50 hidden w-80 origin-top-right scale-95 rounded-xl border border-border/60 bg-white/98 p-2 opacity-0 shadow-xl shadow-primary-dark/10 backdrop-blur-xl transition-all group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100 lg:block">
                    <div className="mb-1 px-3 py-2 text-[11px] font-bold tracking-wider text-text-muted uppercase">
                      تصنيفات الأخبار
                    </div>
                    <div className="max-h-64 overflow-y-auto">
                      {categories.map((cat) => (
                        <Link
                          key={cat.slug}
                          href={`/travel-news/${cat.slug}`}
                          className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-text-dark transition hover:bg-primary-50 hover:text-primary"
                        >
                          {cat.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </li>
            ))}

            <Suspense fallback={null}>
              <CountryFilterDropdown
                countries={countries}
                categories={categories}
                onNavigate={() => setOpen(false)}
              />
            </Suspense>

            {navItems.slice(7).map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-1 rounded-lg px-3 py-3 text-sm font-bold transition lg:my-2 lg:py-2.5 ${
                    isActive(item.href)
                      ? "bg-primary text-white shadow-sm shadow-primary/20"
                      : "text-text-dark hover:bg-primary-50 hover:text-primary"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
