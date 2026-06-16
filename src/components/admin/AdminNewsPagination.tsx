"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { admin } from "@/components/admin/admin-ui";
import type { PaginationMeta } from "@/types";

type AdminNewsPaginationProps = {
  meta?: PaginationMeta;
};

export default function AdminNewsPagination({ meta }: AdminNewsPaginationProps) {
  const searchParams = useSearchParams();

  if (!meta?.last_page || meta.last_page <= 1) {
    return null;
  }

  const currentPage = meta.current_page ?? 1;
  const lastPage = meta.last_page ?? 1;

  const buildPageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    return `/admin/news?${params.toString()}`;
  };

  return (
    <div className={`${admin.card} flex flex-col items-center justify-between gap-2 sm:flex-row`}>
      <p className="text-xs font-semibold text-slate-500">
        صفحة{" "}
        <span className="font-bold text-slate-800">{currentPage}</span> من{" "}
        <span className="font-bold text-slate-800">{lastPage}</span>
        {" · "}
        <span className="font-bold text-slate-800">{meta.total ?? 0}</span> خبر
      </p>

      <div className="flex items-center gap-1.5">
        {currentPage > 1 ? (
          <Link href={buildPageUrl(currentPage - 1)} className={admin.btnSecondary}>
            السابق
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-300">
            السابق
          </span>
        )}

        {currentPage < lastPage ? (
          <Link href={buildPageUrl(currentPage + 1)} className={admin.btnSecondary}>
            التالي
          </Link>
        ) : (
          <span className="rounded-md border border-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-300">
            التالي
          </span>
        )}
      </div>
    </div>
  );
}
