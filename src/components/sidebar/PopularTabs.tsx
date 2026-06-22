"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsArticle } from "@/types";

type PopularTabsProps = {
  latest: NewsArticle[];
  popular: NewsArticle[];
};

export default function PopularTabs({ latest, popular }: PopularTabsProps) {
  const [tab, setTab] = useState<"popular" | "latest" | "comments">("popular");

  const items =
    tab === "latest" ? latest : tab === "popular" ? popular : latest;

  return (
    <div className="overflow-hidden rounded-xl bg-white editorial-card">
      <div className="flex border-b border-border/60 bg-page-bg p-1">
        {(
          [
            ["popular", "الأكثر قراءة"],
            ["latest", "الأحدث"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key as "popular" | "latest")}
            className={`flex-1 rounded-lg px-2 py-2.5 text-xs font-black transition ${
              tab === key
                ? "bg-white text-primary shadow-sm"
                : "text-text-muted hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4">
        <ul className="space-y-3">
          {items.slice(0, 5).map((article, i) => (
            <li key={article.id} className="group flex gap-3 rounded-lg p-1 transition hover:bg-page-bg">
              <span className={`mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg text-xs font-black text-white ${
                i === 0 ? "bg-accent" : i === 1 ? "bg-primary" : i === 2 ? "bg-[#d96f18]" : "bg-primary-dark"
              }`}>
                {i + 1}
              </span>
              <div className="min-w-0">
                <Link
                  href={`/travel-news/${article.slug}`}
                  className="line-clamp-2 text-sm font-bold leading-6 text-text-dark transition group-hover:text-primary"
                >
                  {article.title}
                </Link>
                <p className="mt-1 text-xs text-text-subtle">
                  {tab === "popular" && article.viewsCount > 0
                    ? `${article.viewsCount.toLocaleString("ar")} قراءة`
                    : article.publishedAt}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
