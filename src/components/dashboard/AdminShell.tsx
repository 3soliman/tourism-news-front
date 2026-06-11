"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  Bell,
  FileText,
  Home,
  LayoutGrid,
  Map,
  MapPin,
  Newspaper,
  Search,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { siteConfig } from "@/data/site";

const navItems = [
  { href: "/dashboard", label: "لوحة التحكم", icon: Home },
  { href: "/dashboard/news", label: "الأخبار", icon: Newspaper },
  { href: "/dashboard/categories", label: "التصنيفات", icon: LayoutGrid },
  { href: "/dashboard/countries", label: "الدول", icon: MapPin },
  { href: "/dashboard/authors", label: "الكتّاب", icon: Users },
  { href: "/dashboard/seo", label: "السيو", icon: BarChart3 },
  { href: "/dashboard/google-news", label: "Google News", icon: FileText },
  { href: "/dashboard/sitemaps", label: "خرائط الموقع", icon: Map },
  { href: "/dashboard/trust", label: "صفحات الثقة", icon: ShieldCheck },
  { href: "/dashboard/analytics", label: "التحليلات", icon: BarChart3 },
  { href: "/dashboard/users", label: "المستخدمون", icon: Users },
  { href: "/dashboard/settings", label: "الإعدادات", icon: Settings },
];

type AdminShellProps = {
  children: React.ReactNode;
};

export default function AdminShell({ children }: AdminShellProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#f7faff] text-[#17243a]">
      <aside className="fixed right-0 top-0 z-40 hidden h-screen w-72 border-l border-[#dce7f5] bg-white xl:block">
        <div className="flex h-20 items-center gap-3 border-b border-[#dce7f5] px-6">
          <img src={siteConfig.logo} alt="" className="h-12 w-12" />
          <div>
            <p className="text-2xl font-black text-[#0777df]">{siteConfig.name}</p>
            <p className="text-xs font-bold text-[#6e7e99]">بوابتك لأخبار السياحة</p>
          </div>
        </div>
        <nav className="space-y-1 px-4 py-5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active =
              item.href === "/dashboard"
                ? pathname === item.href
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 text-base font-bold transition ${
                  active
                    ? "border-[#b9d8fb] bg-[#eef6ff] text-[#075fb6]"
                    : "border-transparent text-[#4d5e7c] hover:border-[#dce7f5] hover:bg-[#fbfdff] hover:text-[#17243a]"
                }`}
              >
                <span>{item.label}</span>
                <Icon size={18} strokeWidth={1.85} />
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="xl:pr-72">
        <header className="sticky top-0 z-30 border-b border-[#dce7f5] bg-white/92 backdrop-blur">
          <div className="flex min-h-20 items-center justify-between gap-4 px-5 lg:px-8">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=120&auto=format&fit=crop"
                alt=""
                className="h-12 w-12 rounded-full object-cover"
              />
              <div>
                <p className="font-black text-[#17243a]">أحمد السعدي</p>
                <p className="text-xs font-bold text-[#6e7e99]">مدير النظام</p>
              </div>
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-[#dce7f5] text-[#53657f]">
                <Bell size={18} strokeWidth={1.8} />
              </span>
            </div>

            <div className="hidden flex-1 justify-center md:flex">
              <label className="flex w-full max-w-xl items-center gap-3 rounded-xl border border-[#dce7f5] bg-white px-4 py-3 text-[#6e7e99] shadow-sm">
                <Search size={18} strokeWidth={1.8} />
                <input
                  className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-[#9aa8bc]"
                  placeholder="ابحث في الأخبار، الكتّاب، التصنيفات..."
                />
              </label>
            </div>

            <button className="hidden items-center gap-2 rounded-xl border border-[#dce7f5] bg-white px-4 py-3 text-sm font-black text-[#17243a] shadow-sm sm:inline-flex">
              إجراءات سريعة
              <SlidersHorizontal size={18} strokeWidth={1.8} className="text-[#53657f]" />
            </button>
          </div>
        </header>
        <main className="px-5 py-7 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
