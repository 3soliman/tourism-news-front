"use client";

import Link from "next/link";

type TravelNewsErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function TravelNewsError({ reset }: TravelNewsErrorProps) {
  return (
    <div className="mx-auto flex min-h-[420px] max-w-2xl flex-col items-center justify-center px-4 text-center">
      <h1 className="text-2xl font-black text-text-dark">تعذر تحميل الصفحة</h1>
      <p className="mt-3 text-sm leading-7 text-text-muted">
        حدث خطأ أثناء جلب المحتوى. جرّب مرة أخرى بعد قليل.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded bg-primary px-4 py-2 text-sm font-bold text-white"
        >
          إعادة المحاولة
        </button>
        <Link
          href="/travel-news"
          className="rounded border border-border bg-surface px-4 py-2 text-sm font-bold text-text-dark"
        >
          العودة لأخبار السياحة
        </Link>
      </div>
    </div>
  );
}
