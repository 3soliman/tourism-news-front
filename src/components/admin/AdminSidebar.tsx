"use client";

import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { filterAdminNavGroups } from "@/lib/admin-nav";
import { fallbackSiteConfig as siteConfig } from "@/lib/site";
import type { AdminUser } from "@/types";

type AdminSidebarProps = {
  open: boolean;
  onClose: () => void;
  user: AdminUser;
};

export default function AdminSidebar({ open, onClose, user }: AdminSidebarProps) {
  const pathname = usePathname();
  const navGroups = filterAdminNavGroups(user);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-slate-900/50 transition-opacity xl:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onClose}
        aria-hidden={!open}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-56 flex-col bg-slate-900 text-white transition-transform xl:z-40 xl:translate-x-0 ${
          open ? "translate-x-0" : "translate-x-full xl:translate-x-0"
        }`}
        aria-label="قائمة لوحة التحكم"
      >
        <div className="flex h-14 items-center justify-between gap-2 border-b border-white/10 px-4">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-sky-500 text-sm font-black">
              س
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-black">{siteConfig.name}</p>
              <p className="text-[10px] font-bold text-slate-400">Admin</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="grid h-8 w-8 place-items-center rounded-lg text-slate-400 hover:bg-white/10 xl:hidden"
            aria-label="إغلاق القائمة"
          >
            <X size={16} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          {navGroups.map((group) => (
            <div key={group.label} className="mb-4">
              <p className="mb-1.5 px-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                {group.label}
              </p>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.exact
                    ? pathname === item.href
                    : pathname === item.href || pathname.startsWith(`${item.href}/`);

                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={`flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm font-bold transition ${
                        active
                          ? "bg-sky-500 text-white"
                          : "text-slate-300 hover:bg-white/10 hover:text-white"
                      }`}
                    >
                      <Icon size={16} strokeWidth={2} />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="border-t border-white/10 p-3">
          <a
            href="/"
            target="_blank"
            className="flex items-center justify-center rounded-lg border border-white/15 py-2 text-xs font-bold text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            فتح الموقع العام
          </a>
        </div>
      </aside>
    </>
  );
}
