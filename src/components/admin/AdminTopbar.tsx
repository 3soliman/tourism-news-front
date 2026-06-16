"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ExternalLink, LogOut, Menu, Plus, Search } from "lucide-react";
import CanAccess from "@/components/admin/CanAccess";
import { AdminPermission } from "@/lib/admin-permissions";
import { logoutAdmin } from "@/lib/api/auth";
import type { AdminUser } from "@/types";

type AdminTopbarProps = {
  user: AdminUser;
  onMenuClick: () => void;
};

export default function AdminTopbar({ user, onMenuClick }: AdminTopbarProps) {
  const router = useRouter();
  const [loggingOut, setLoggingOut] = useState(false);
  const [query, setQuery] = useState("");
  const roleLabel = user.roles[0]?.name ?? "مدير النظام";

  const handleLogout = async () => {
    setLoggingOut(true);
    await logoutAdmin();
    setLoggingOut(false);
    router.push("/admin/login");
    router.refresh();
  };

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/admin/news?search=${encodeURIComponent(trimmed)}` : "/admin/news");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white">
      <div className="flex h-14 items-center gap-3 px-4 lg:px-5">
        <button
          type="button"
          onClick={onMenuClick}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 xl:hidden"
          aria-label="فتح القائمة"
        >
          <Menu size={18} />
        </button>

        <CanAccess permission={AdminPermission.NEWS_VIEW}>
          <form onSubmit={handleSearch} className="hidden min-w-0 flex-1 md:block md:max-w-md">
            <label className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <Search size={15} className="shrink-0 text-slate-400" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="بحث سريع في الأخبار..."
              />
            </label>
          </form>
        </CanAccess>

        <div className="mr-auto flex items-center gap-2">
          <CanAccess permission={AdminPermission.NEWS_CREATE}>
            <Link
              href="/admin/news/create"
              className="hidden items-center gap-1.5 rounded-lg bg-sky-600 px-3 py-2 text-xs font-black text-white sm:inline-flex"
            >
              <Plus size={14} />
              خبر جديد
            </Link>
          </CanAccess>

          <Link
            href="/"
            target="_blank"
            className="hidden h-9 items-center gap-1.5 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 lg:inline-flex"
          >
            الموقع
            <ExternalLink size={13} />
          </Link>

          <div className="hidden items-center gap-2 rounded-lg border border-slate-200 px-2.5 py-1.5 sm:flex">
            <span className="grid h-7 w-7 place-items-center rounded-full bg-sky-100 text-xs font-black text-sky-700">
              {user.name.charAt(0)}
            </span>
            <div className="hidden lg:block">
              <p className="text-xs font-black text-slate-800">{user.name}</p>
              <p className="text-[10px] font-medium text-slate-500">{roleLabel}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-red-100 bg-red-50 px-3 text-xs font-bold text-red-600 disabled:opacity-60"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">
              {loggingOut ? "..." : "خروج"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
