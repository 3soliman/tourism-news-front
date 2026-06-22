"use client";

import { API_LOAD_FAILED_MESSAGE, API_OFFLINE_MESSAGE } from "@/lib/api/messages";
import { RefreshCw, ServerOff } from "lucide-react";

type AdminOfflineMessageProps = {
  title?: string;
  description?: string;
};

export default function AdminOfflineMessage({
  title = API_OFFLINE_MESSAGE,
  description = API_LOAD_FAILED_MESSAGE,
}: AdminOfflineMessageProps) {
  return (
    <section className="rounded-xl border border-amber-200 bg-white p-8 text-center shadow-sm sm:p-12">
      <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-full bg-amber-100 text-amber-700">
        <ServerOff size={30} />
      </div>
      <h2 className="text-2xl font-black text-[#17243a]">{title}</h2>
      <p className="mx-auto mt-4 max-w-xl leading-8 text-[#6e7e99]">{description}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#0677e8] px-5 py-3 text-sm font-black text-white transition hover:bg-[#0566c7]"
        >
          <RefreshCw size={16} />
          إعادة المحاولة
        </button>
        <a
          href="/admin"
          className="inline-flex items-center gap-2 rounded-lg border border-[#dce7f5] bg-white px-5 py-3 text-sm font-bold text-[#17243a] transition hover:text-[#0677e8]"
        >
          العودة للوحة التحكم
        </a>
      </div>
    </section>
  );
}
