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
    <div className="mt-8 rounded-2xl border border-border/60 bg-page-bg p-5">
      <h3 className="text-sm font-black text-text-dark">شارك الخبر</h3>
      <div className="mt-4 flex flex-wrap gap-3">
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 hover:shadow-md"
        >
          <MessageCircle size={16} />
          واتساب
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 hover:shadow-md"
        >
          <Globe size={16} />
          فيسبوك
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-primary-dark hover:shadow-md"
        >
          <LinkIcon size={16} />
          نسخ الرابط
        </button>
      </div>
    </div>
  );
}
