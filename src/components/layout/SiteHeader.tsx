"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { news } from "@/data/news";

const ROTATE_MS = 7000;
const headerImages = news.slice(0, 6).map((article) => article.image);

export default function SiteHeader() {
  const [activeImage, setActiveImage] = useState(0);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    headerImages.forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (headerImages.length <= 1) return;

    const timer = setInterval(() => {
      setActiveImage((current) => (current + 1) % headerImages.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-primary">
      {headerImages.map((image, index) => (
        <div
          key={image}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${image})`,
            opacity: index === activeImage ? 1 : 0,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-[#2d9cdb]/24" />
      <div className="absolute inset-0 bg-gradient-to-b from-white/18 via-[#1f87c2]/10 to-[#0f6f9e]/42" />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-full bg-white px-4 py-2 shadow-xl shadow-black/15"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-[#f28c28] text-xl font-black text-white">
            س
          </span>
          <span className="leading-tight">
            <span className="block text-sm font-black text-[#244958]">أخبار السياحة</span>
            <span className="block text-[11px] font-bold text-primary">Tourism News</span>
          </span>
        </Link>

        <div className="hidden items-center gap-3 text-sm font-black text-white md:flex">
          <span className="rounded-full bg-white/12 px-4 py-2 backdrop-blur">وجهات سياحية</span>
          <span className="rounded-full bg-white/12 px-4 py-2 backdrop-blur">العروض السياحية</span>
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
          منصة عربية لأحدث أخبار الوجهات والفنادق والتأشيرات والعروض
        </p>
        <Link
          href="/offers"
          className="mt-7 inline-flex min-w-56 items-center justify-center rounded-sm bg-breaking px-8 py-4 text-base font-black text-white shadow-xl shadow-primary/20 transition hover:bg-red-600"
        >
          اكتشف عروض السفر
        </Link>
      </div>

      <div className="relative bg-white/22 px-4 py-5 backdrop-blur-sm">
        <form
          action="/travel-news"
          className="mx-auto flex max-w-3xl items-center gap-3 rounded bg-white px-4 py-3 shadow-2xl shadow-black/15"
        >
          <input
            name="q"
            type="search"
            placeholder="قم بالبحث في أخبار السياحة والوجهات..."
            className="min-w-0 flex-1 bg-transparent text-sm text-text-dark outline-none placeholder:text-text-muted"
          />
          <button
            type="submit"
            aria-label="بحث"
            className="grid h-10 w-10 place-items-center rounded-sm text-primary-dark transition hover:bg-surface-alt"
          >
            <Search size={22} />
          </button>
        </form>
      </div>
    </div>
  );
}
