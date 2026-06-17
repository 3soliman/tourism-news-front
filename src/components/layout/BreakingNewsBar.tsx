"use client";

import Link from "next/link";
import { useMemo } from "react";
import type { NewsArticle } from "@/types";

type BreakingNewsBarProps = {
  articles: NewsArticle[];
};

const TICKER_DURATION_SECONDS = 48;

function buildTickerItems(articles: NewsArticle[]) {
  if (articles.length === 0) return [];

  const base = articles.slice(0, 10);
  let expanded: NewsArticle[] = [];

  while (expanded.length < 24) {
    expanded = [...expanded, ...base];
  }

  return [...expanded, ...expanded];
}

export default function BreakingNewsBar({ articles }: BreakingNewsBarProps) {
  const items = useMemo(() => buildTickerItems(articles), [articles]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div dir="rtl" className="border-t border-[#cfe8f4] bg-[#eaf6fb]">
      <div className="mx-auto flex h-10 max-w-7xl items-stretch">
        <span className="flex shrink-0 items-center gap-2 bg-breaking px-5 text-xs font-black text-white">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          لا تفوتك
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden border-s border-[#cfe8f4]">
          <div
            dir="rtl"
            className="breaking-ticker flex h-10 w-max items-center justify-start gap-10 whitespace-nowrap px-4 text-sm font-semibold text-[#244958]"
            style={{ animationDuration: `${TICKER_DURATION_SECONDS}s` }}
          >
            {items.map((item, index) => (
              <Link
                key={`${item.slug}-${index}`}
                href={`/travel-news/${item.slug}`}
                className="inline-flex shrink-0 items-center gap-3 transition hover:text-primary"
              >
                <span>{item.title}</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-breaking" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
