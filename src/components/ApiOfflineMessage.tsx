"use client";

import Link from "next/link";
import { RefreshCw, ServerOff } from "lucide-react";

type ApiOfflineMessageProps = {
  title?: string;
  description?: string;
};

export default function ApiOfflineMessage({
  title = "السيرفر غير متصل",
  description = "تعذر جلب البيانات من واجهة البرمجة. يمكنك تصفح الموقع، لكن المحتوى لن يظهر حتى يعود الاتصال.",
}: ApiOfflineMessageProps) {
  return (
    <section className="rounded-sm border border-amber-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-700">
        <ServerOff size={30} />
      </div>
      <h2 className="text-2xl font-black text-text-dark">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl leading-8 text-text-muted">
        {description}
      </p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-black text-white transition hover:bg-primary-hover"
        >
          <RefreshCw size={16} />
          إعادة المحاولة
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-sm border border-border bg-surface px-5 py-3 text-sm font-bold text-text-dark transition hover:text-primary"
        >
          العودة للرئيسية
        </Link>
      </div>
    </section>
  );
}
