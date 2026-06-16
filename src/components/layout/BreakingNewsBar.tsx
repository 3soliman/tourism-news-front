"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { NewsArticle } from "@/types";

type BreakingNewsBarProps = {
  articles: NewsArticle[];
};

function buildTickerItems(articles: NewsArticle[]) {
  if (articles.length === 0) return [];

  const base = articles.slice(0, 15);
  let expanded: NewsArticle[] = [];

  while (expanded.length < 24) {
    expanded = [...expanded, ...base];
  }

  return [...expanded, ...expanded];
}

export default function BreakingNewsBar({ articles }: BreakingNewsBarProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(36);
  const items = useMemo(() => buildTickerItems(articles), [articles]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const updateDuration = () => {
      const loopWidth = track.scrollWidth / 2;
      const pixelsPerSecond = 80;
      setDuration(Math.max(24, loopWidth / pixelsPerSecond));
    };

    updateDuration();

    const observer = new ResizeObserver(updateDuration);
    observer.observe(track);

    return () => observer.disconnect();
  }, [items]);

  if (items.length === 0) {
    return null;
  }

  return (
    <div dir="rtl" className="border-t border-[#cfe8f4] bg-[#eaf6fb]">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <span className="flex shrink-0 items-center gap-2 bg-breaking px-5 py-2 text-xs font-black text-white">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          لا تفوتك
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden border-s border-[#cfe8f4] py-2">
          <div
            ref={trackRef}
            dir="rtl"
            className="breaking-ticker flex w-max items-center justify-start gap-10 whitespace-nowrap px-4 text-sm font-semibold text-[#244958] will-change-transform"
            style={
              {
                "--ticker-duration": `${duration}s`,
              } as React.CSSProperties
            }
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
