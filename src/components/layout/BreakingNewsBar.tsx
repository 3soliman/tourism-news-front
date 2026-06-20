"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NewsArticle } from "@/types";

type BreakingNewsBarProps = {
  articles: NewsArticle[];
};

const MIN_TICKER_SECONDS = 70;
const TICKER_PIXELS_PER_SECOND = 62;

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
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(MIN_TICKER_SECONDS);
  const items = useMemo(() => buildTickerItems(articles), [articles]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateDuration = () => {
      const loopWidth = track.scrollWidth / 2;
      setDuration(Math.max(MIN_TICKER_SECONDS, loopWidth / TICKER_PIXELS_PER_SECOND));
    };
    updateDuration();
    const observer = new ResizeObserver(updateDuration);
    observer.observe(track);
    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) return null;

  return (
    <div dir="rtl" className="border-t border-border/50 bg-gradient-to-l from-primary-50 via-white to-primary-50">
      <div className="mx-auto flex h-10 max-w-7xl items-stretch">
        <span className="flex shrink-0 items-center gap-2.5 bg-gradient-to-l from-primary-dark to-primary-900 px-5 text-xs font-black tracking-wider text-white">
          <span className="pulse-dot" />
          لا تفوتك
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden border-s border-border/50">
          <div
            ref={trackRef}
            dir="rtl"
            className="breaking-ticker flex h-10 w-max items-center justify-start gap-10 whitespace-nowrap px-4 text-sm font-semibold text-text-dark"
            style={{ animationDuration: `${duration}s` }}
          >
            {items.map((item, index) => (
              <Link
                key={`${item.slug}-${index}`}
                href={`/travel-news/${item.slug}`}
                className="inline-flex shrink-0 items-center gap-3 transition hover:text-primary"
              >
                <span>{item.title}</span>
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-breaking/60" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
