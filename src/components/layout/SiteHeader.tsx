"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import HeaderSearchSuspense from "@/components/layout/HeaderSearchQuery";
import { Compass, MapPin } from "lucide-react";

const ROTATE_MS = 7000;

type SiteHeaderProps = {
  headerImages?: string[];
};

function SiteLogo({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 rounded-xl ${
        compact
          ? "bg-white/95 px-3 py-1.5 shadow-lg shadow-primary-dark/10 ring-1 ring-white/60"
          : "bg-white/90 px-4 py-2 shadow-xl shadow-primary-dark/15 ring-1 ring-white/70 backdrop-blur-sm"
      }`}
    >
      <span
        className={`grid place-items-center rounded-xl font-black text-white transition group-hover:scale-105 ${
          compact
            ? "h-9 w-9 rounded-lg text-base"
            : "h-12 w-12 rounded-xl text-xl"
        }`}
        style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}
      >
        س
      </span>
      <span className="leading-tight">
        <span className={`block font-black tracking-tight text-primary-dark ${compact ? "text-xs" : "text-sm"}`}>
          أخبار السياحة
        </span>
        <span className={`block font-bold tracking-wider text-primary/70 ${compact ? "text-[10px]" : "text-[10px]"}`}>
          Tourism News
        </span>
      </span>
    </Link>
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
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeImage ? 1 : 0,
            transform: index === activeImage ? "scale(1)" : "scale(1.05)",
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/30 via-primary-dark/20 to-primary-dark/70" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,145,178,0.15)_0%,transparent_70%)]" />
    </>
  );
}

export default function SiteHeader({ headerImages = [] }: SiteHeaderProps) {
  const [activeImage, setActiveImage] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const isArticlePage = /^\/travel-news\/[^/]+$/.test(pathname);
  const isCompactPage =
    isArticlePage || (!isHomePage && pathname.startsWith("/travel-news"));
  const slides = useMemo(
    () => [...new Set(headerImages.filter(Boolean))],
    [headerImages],
  );

  useEffect(() => {
    if (!slides[0]) return;
    const image = new Image();
    image.src = slides[0];
  }, [slides]);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveImage((current) => {
        const next = (current + 1) % slides.length;
        const image = new Image();
        image.src = slides[next];
        return next;
      });
    }, ROTATE_MS);
    return () => clearInterval(timer);
  }, [slides]);

  const showBackground = slides.length > 0;

  if (isCompactPage) {
    return (
      <div className="relative min-h-[72px] overflow-hidden bg-primary-dark">
        {showBackground ? <HeaderBackground slides={slides} activeImage={activeImage} /> : (
          <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-900 to-primary-dark" />
        )}
        <div className="relative mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <SiteLogo compact />
          <HeaderSearchSuspense compact />
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[440px] overflow-hidden bg-primary-dark sm:min-h-[480px]">
      {showBackground ? <HeaderBackground slides={slides} activeImage={activeImage} /> : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-primary-900 to-primary-dark" />
      )}

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
        <SiteLogo />
        <div className="hidden items-center gap-2 text-sm font-bold text-white/80 md:flex">
          <span className="flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-xs backdrop-blur-sm transition hover:bg-white/20">
            <MapPin size={14} /> وجهات سياحية
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-xs backdrop-blur-sm transition hover:bg-white/20">
            <Compass size={14} /> أخبار السفر
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-white/12 px-4 py-2 text-xs backdrop-blur-sm transition hover:bg-white/20">
            المسافرون العرب
          </span>
        </div>
      </div>

      <div className="relative mx-auto flex min-h-[270px] max-w-7xl flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[320px]">
        <div className="mb-6 h-1 w-20 rounded-full bg-gradient-to-r from-accent to-amber-400" />
        {isHomePage ? (
          <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            أخبار السياحة والسفر
          </h1>
        ) : (
          <p className="font-display text-4xl font-black leading-tight tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            أخبار السياحة والسفر
          </p>
        )}
        <p className="mt-4 max-w-2xl text-base font-bold leading-8 text-white/85 sm:text-xl">
          منصة عربية لأحدث أخبار الوجهات والفنادق والتأشيرات
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/travel-news"
            className="group inline-flex min-w-48 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-amber-400 px-7 py-3.5 text-base font-black text-primary-dark shadow-lg shadow-amber-500/25 transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02]"
          >
            تصفّح أخبار السياحة
            <span className="transition-transform group-hover:translate-x-1">←</span>
          </Link>
          <Link
            href="/destinations"
            className="inline-flex min-w-40 items-center justify-center gap-2 rounded-xl border-2 border-white/25 bg-white/10 px-6 py-3.5 text-sm font-bold text-white backdrop-blur-sm transition-all hover:bg-white/20 hover:border-white/40"
          >
            <MapPin size={16} />
            اكتشف الوجهات
          </Link>
        </div>
      </div>

      <div className="relative bg-gradient-to-r from-white/25 via-white/30 to-white/25 px-4 py-4 backdrop-blur-md">
        <HeaderSearchSuspense />
      </div>
    </div>
  );
}
