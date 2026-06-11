"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { categories } from "@/data/categories";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/travel-news", label: "أخبار السياحة", hasMega: true },
  { href: "/travel-news/category/aviation", label: "أخبار الطيران" },
  { href: "/travel-news/category/visas", label: "أخبار التأشيرات" },
  { href: "/travel-news/category/hotels", label: "أخبار الفنادق" },
  { href: "/travel-news/category/destinations", label: "أخبار الوجهات" },
  { href: "/offers", label: "العروض السياحية" },
  { href: "/contact", label: "اتصل بنا" },
];

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="bg-primary-dark text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:hidden">
          <span className="py-3 text-sm font-bold">القائمة</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="rounded bg-white/10 px-3 py-2 text-sm font-bold"
            aria-label="فتح القائمة"
          >
            {open ? "✕" : "☰"}
          </button>
        </div>

        <ul
          className={`${open ? "block" : "hidden"} border-t border-white/10 py-2 lg:flex lg:border-0 lg:py-0`}
        >
          {navItems.map((item) => (
            <li key={item.href} className="group relative">
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                className={`block px-4 py-3 text-sm font-bold transition lg:py-3.5 ${
                  isActive(item.href)
                    ? "bg-white/15 text-white"
                    : "hover:bg-primary hover:text-white"
                }`}
              >
                {item.label}
              </Link>

              {item.hasMega && (
                <div className="pointer-events-none absolute right-0 top-full z-50 hidden w-72 border border-border bg-surface opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100 lg:block">
                  <div className="border-b-2 border-primary px-4 py-2 text-xs font-bold text-primary">
                    تصنيفات الأخبار
                  </div>
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/travel-news/category/${cat.slug}`}
                      className="block border-b border-border px-4 py-2.5 text-sm font-semibold text-text-dark transition last:border-0 hover:bg-page-bg hover:text-primary"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
