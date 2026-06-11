"use client";

import { useState } from "react";
import Link from "next/link";
import type { NewsArticle } from "@/data/news";

type PopularTabsProps = {
  latest: NewsArticle[];
  popular: NewsArticle[];
};

export default function PopularTabs({ latest, popular }: PopularTabsProps) {
  const [tab, setTab] = useState<"popular" | "latest" | "comments">("popular");

  const items =
    tab === "latest" ? latest : tab === "popular" ? popular : latest;

  return (
    <div className="rounded border border-border bg-surface">
      <div className="flex border-b border-border">
        {(
          [
            ["popular", "الأكثر قراءة"],
            ["latest", "الأحدث"],
            ["comments", "تعليقات"],
          ] as const
        ).map(([key, label]) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`flex-1 px-2 py-3 text-xs font-bold transition ${
              tab === key
                ? "border-b-2 border-primary bg-page-bg text-primary"
                : "text-text-muted hover:text-primary"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="p-4">
        {tab === "comments" ? (
          <p className="text-sm text-text-muted">
            قسم التعليقات سيتوفر لاحقًا مع تفعيل النظام التفاعلي.
          </p>
        ) : (
          <ul className="space-y-3">
            {items.slice(0, 5).map((article, i) => (
              <li key={article.id} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-primary text-xs font-black text-white">
                  {i + 1}
                </span>
                <div>
                  <Link
                    href={`/travel-news/${article.slug}`}
                    className="line-clamp-2 text-sm font-bold leading-6 text-text-dark hover:text-primary"
                  >
                    {article.title}
                  </Link>
                  <p className="mt-1 text-xs text-text-muted">
                    {article.publishedAt}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
