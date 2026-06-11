"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { categories } from "@/data/categories";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/travel-news", label: "أخبار السياحة", hasMega: true },
  { href: "/travel-news/aviation", label: "أخبار الطيران" },
  { href: "/travel-news/visas", label: "أخبار التأشيرات" },
  { href: "/travel-news/hotels", label: "أخبار الفنادق" },
  { href: "/travel-news/destinations", label: "أخبار الوجهات" },
  { href: "/travel-news/international", label: "السفر الدولي" },
  { href: "/offers", label: "العروض السياحية" },
  { href: "/contact", label: "اتصل بنا" },
];

export default function MainNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <nav className="border-y border-[#72bee3] bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-between lg:hidden">
          <span className="py-3 text-sm font-black">القائمة</span>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-sm border border-white/30 bg-white/15 text-white"
            aria-label="فتح القائمة"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        <div className={`${open ? "block" : "hidden"} border-t border-white/15 lg:flex lg:items-center lg:justify-between lg:border-0`}>
          <ul className="py-2 lg:flex lg:py-0">
            {navItems.map((item) => (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={`block rounded-sm px-3 py-3 text-sm font-black transition lg:my-2 lg:py-2.5 ${
                    isActive(item.href)
                      ? "bg-accent text-[#244958]"
                      : "hover:bg-white/12 hover:text-accent"
                  }`}
                >
                  {item.label}
                </Link>

                {item.hasMega && (
                  <div className="pointer-events-none absolute right-0 top-full z-50 hidden w-80 rounded-b-sm border border-border bg-surface opacity-0 shadow-xl transition group-hover:pointer-events-auto group-hover:opacity-100 lg:block">
                    <div className="border-b border-border px-4 py-3 text-xs font-black text-primary-dark">
                      تصنيفات الأخبار
                    </div>
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/travel-news/${cat.slug}`}
                        className="block border-b border-border px-4 py-3 text-sm font-semibold text-text-dark transition last:border-0 hover:bg-page-bg hover:text-primary"
                      >
                        {cat.label}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          <Link
            href="/travel-news"
            className="mb-3 flex items-center justify-center gap-2 rounded-sm bg-breaking px-4 py-2 text-sm font-black text-white transition hover:bg-red-600 lg:mb-0"
          >
            <Search size={16} />
            بحث الأخبار
          </Link>
        </div>
      </div>
    </nav>
  );
}
