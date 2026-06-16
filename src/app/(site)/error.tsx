"use client";

import { API_OFFLINE_MESSAGE } from "@/lib/api/messages";

type SiteErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function SiteError({ error, reset }: SiteErrorProps) {
  const isApiError =
    error.name === "ApiError" ||
    error.message.startsWith("API ") ||
    error.message.includes("fetch failed");

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
      <div className="rounded-sm border border-border bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-black text-text-dark">
          {isApiError ? "تعذر الاتصال بالخادم" : "حدث خطأ غير متوقع"}
        </h1>
        <p className="mt-4 leading-8 text-text-muted">
          {isApiError
            ? API_OFFLINE_MESSAGE
            : "حدث خطأ أثناء تحميل الصفحة. حاول مرة أخرى."}
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-6 rounded-sm bg-primary px-6 py-3 text-sm font-black text-white transition hover:bg-primary-hover"
        >
          إعادة المحاولة
        </button>
      </div>
    </div>
  );
}
