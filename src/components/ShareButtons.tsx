"use client";

import { MessageCircle, Globe, Link as LinkIcon } from "lucide-react";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const whatsappText = encodeURIComponent(`${title}\n${url}`);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("تم نسخ الرابط");
    } catch {
      alert(url);
    }
  };

  return (
    <div className="mt-8 rounded-2xl border border-border/60 bg-page-bg p-4 sm:p-5">
      <h3 className="text-sm font-black text-text-dark">شارك الخبر</h3>
      <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#f38726] px-2 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#d96f18] hover:shadow-md sm:gap-2 sm:px-5 sm:text-sm"
        >
          <MessageCircle size={16} className="shrink-0" />
          واتساب
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-[#2b6eb3] px-2 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#245f9b] hover:shadow-md sm:gap-2 sm:px-5 sm:text-sm"
        >
          <Globe size={16} className="shrink-0" />
          فيسبوك
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex min-w-0 items-center justify-center gap-1.5 rounded-xl bg-primary px-2 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-primary-dark hover:shadow-md sm:gap-2 sm:px-5 sm:text-sm"
        >
          <LinkIcon size={16} className="shrink-0" />
          نسخ الرابط
        </button>
      </div>
    </div>
  );
}
