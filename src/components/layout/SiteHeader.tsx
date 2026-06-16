"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ROTATE_MS = 7000;
const fallbackImages = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1200&auto=format&fit=crop",
];

type SiteHeaderProps = {
  headerImages?: string[];
};

function SiteLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`flex items-center gap-3 rounded-full bg-white shadow-xl shadow-black/15 ${
        compact ? "px-3 py-1.5" : "px-4 py-2"
      }`}
    >
      <span
        className={`grid place-items-center rounded-full bg-[#f28c28] font-black text-white ${
          compact ? "h-10 w-10 text-lg" : "h-12 w-12 text-xl"
        }`}
      >
        س
      </span>
      <span className="leading-tight">
        <span className="block text-sm font-black text-[#244958]">أخبار السياحة</span>
        <span className="block text-[11px] font-bold text-primary">Tourism News</span>
      </span>
    </Link>
  );
}

function HeaderSearch({ currentQuery, compact = false }: { currentQuery: string; compact?: boolean }) {
  return (
    <form
      action="/travel-news"
      className={`flex items-center gap-2 rounded bg-white shadow-2xl shadow-black/15 ${
        compact
          ? "min-w-0 flex-1 px-3 py-2 md:max-w-md"
          : "mx-auto w-full max-w-3xl gap-3 px-4 py-3"
      }`}
    >
      <input
        name="q"
        type="search"
        defaultValue={currentQuery}
        key={currentQuery}
        placeholder="ابحث في أخبار السياحة..."
        className="min-w-0 flex-1 bg-transparent text-sm text-text-dark outline-none placeholder:text-text-muted"
      />
      <button
        type="submit"
        aria-label="بحث"
        className={`grid place-items-center rounded-sm text-primary-dark transition hover:bg-surface-alt ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Search size={compact ? 18 : 22} />
      </button>
    </form>
  );
}

function HeaderBackground({
  slides,
  activeImage,
}: {
  slides: string[];
  activeImage: number;
}) {
  return (
    <>
      {slides.map((image, index) => (
        <div
          key={`${image}-${index}`}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeImage ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[#2d9cdb]/24" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-[#1f87c2]/10 to-[#0f6f9e]/42" />
    </>
  );
}

export default function SiteHeader({ headerImages = fallbackImages }: SiteHeaderProps) {
  const [activeImage, setActiveImage] = useState(0);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isHomePage = pathname === "/";
  const isArticlePage = /^\/travel-news\/[^/]+$/.test(pathname);
  const isCompactPage = isArticlePage || (!isHomePage && pathname.startsWith("/travel-news"));
  const slides = [...new Set(headerImages)];
  const currentQuery = searchParams.get("q") ?? "";

  useEffect(() => {
    slides.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % slides.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [slides.length]);

  if (isCompactPage) {
    return (
      <div className="relative overflow-hidden bg-primary">
        <HeaderBackground slides={slides} activeImage={activeImage} />

        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <SiteLogo compact />
          <HeaderSearch currentQuery={currentQuery} compact />
        </div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden bg-primary">
      <HeaderBackground slides={slides} activeImage={activeImage} />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
        <SiteLogo />

        <div className="hidden items-center gap-3 text-sm font-black text-white md:flex">
          <span className="rounded-full bg-white/12 px-4 py-2 backdrop-blur">وجهات سياحية</span>
          <span className="rounded-full bg-white/12 px-4 py-2 backdrop-blur">أخبار السفر</span>
          <span className="rounded-full bg-white/12 px-4 py-2 backdrop-blur">المسافرون العرب</span>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[330px] max-w-7xl flex-col items-center justify-center px-4 py-14 text-center sm:min-h-[410px]">
        <div className="mb-6 h-px w-full max-w-lg bg-accent" />
        {isHomePage ? (
          <h1 className="font-display text-4xl font-black leading-tight text-accent sm:text-5xl lg:text-6xl">
            أخبار السياحة والسفر
          </h1>
        ) : (
          <p className="font-display text-4xl font-black leading-tight text-accent sm:text-5xl lg:text-6xl">
            أخبار السياحة والسفر
          </p>
        )}
        <p className="mt-4 max-w-2xl bg-white/26 px-6 py-3 text-base font-black uppercase tracking-wide text-white shadow-lg shadow-primary/20 backdrop-blur sm:text-xl">
          منصة عربية لأحدث أخبار الوجهات والفنادق والتأشيرات
        </p>
        <Link
          href="/travel-news"
          className="mt-7 inline-flex min-w-56 items-center justify-center rounded-sm bg-breaking px-8 py-4 text-base font-black text-white shadow-xl shadow-primary/20 transition hover:bg-red-600"
        >
          تصفّح أخبار السياحة
        </Link>
      </div>

      <div className="relative bg-white/22 px-4 py-5 backdrop-blur-sm">
        <HeaderSearch currentQuery={currentQuery} />
      </div>
    </div>
  );
}
