"use client";

import Link from "next/link";
import { ChevronDown, Cookie } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  acceptAllConsent,
  applyConsentScripts,
  COOKIE_CONSENT_OPEN_EVENT,
  readConsentFromDocument,
  rejectOptionalConsent,
  writeConsentToDocument,
  type CookieConsentState,
} from "@/lib/cookie-consent";

type PreferenceKey = "analytics" | "marketing" | "personalization";

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [customizeOpen, setCustomizeOpen] = useState(false);
  const [preferences, setPreferences] = useState(() => {
    const existing = readConsentFromDocument();
    return {
      analytics: existing?.analytics ?? false,
      marketing: existing?.marketing ?? false,
      personalization: existing?.personalization ?? false,
    };
  });

  const saveConsent = useCallback((state: CookieConsentState) => {
    writeConsentToDocument(state);
    applyConsentScripts(state);
    setVisible(false);
    setMinimized(false);
    setCustomizeOpen(false);
  }, []);

  const openBanner = useCallback(() => {
    const existing = readConsentFromDocument();
    setPreferences({
      analytics: existing?.analytics ?? false,
      marketing: existing?.marketing ?? false,
      personalization: existing?.personalization ?? false,
    });
    setCustomizeOpen(false);
    setMinimized(false);
    setVisible(true);
  }, []);

  useEffect(() => {
    const existing = readConsentFromDocument();
    if (existing) {
      applyConsentScripts(existing);
    } else {
      setVisible(true);
    }

    const handleOpen = () => openBanner();
    window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);

    return () => window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, handleOpen);
  }, [openBanner]);

  const togglePreference = (key: PreferenceKey) => {
    setPreferences((current) => ({ ...current, [key]: !current[key] }));
  };

  const handleSaveCustom = () => {
    saveConsent({
      necessary: true,
      ...preferences,
      updatedAt: new Date().toISOString(),
    });
  };

  if (!visible) {
    return null;
  }

  if (minimized) {
    return (
      <button
        type="button"
        onClick={() => setMinimized(false)}
        className="cookie-consent-panel fixed inset-x-0 bottom-0 z-[300] flex items-center justify-center gap-2 border-t border-border bg-white/95 px-4 py-2.5 text-sm font-bold text-primary shadow-[0_-2px_16px_rgba(0,0,0,0.08)] backdrop-blur-sm transition hover:bg-[#f8fcfe]"
        aria-label="عرض إعدادات ملفات تعريف الارتباط"
      >
        <Cookie size={18} aria-hidden />
        <span>ملفات تعريف الارتباط</span>
        <ChevronDown size={16} className="rotate-180" aria-hidden />
      </button>
    );
  }

  return (
    <aside
      className="cookie-consent-panel fixed inset-x-0 bottom-0 z-[300] border-t-4 border-accent bg-white shadow-[0_-6px_32px_rgba(0,0,0,0.12)]"
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="bg-gradient-to-l from-[#eaf6fb]/80 to-white">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 sm:py-5">
          {!customizeOpen ? (
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-6">
              <div className="flex min-w-0 flex-1 items-start gap-3 sm:gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary text-white shadow-md shadow-primary/25 sm:h-12 sm:w-12">
                  <Cookie size={22} strokeWidth={2.25} aria-hidden />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[11px] font-black uppercase tracking-wide text-primary sm:text-xs">
                    خصوصيتك تهمنا
                  </p>
                  <h2
                    id="cookie-consent-title"
                    className="mt-0.5 text-base font-black text-[#244958] sm:text-lg"
                  >
                    نستخدم ملفات تعريف الارتباط
                  </h2>
                  <p
                    id="cookie-consent-description"
                    className="mt-1.5 text-xs leading-6 text-text-muted sm:text-sm sm:leading-7"
                  >
                    لتحسين تجربتك وتحليل الزيارات وتقديم محتوى مناسب عند الموافقة.
                    يمكنك متابعة التصفح واختيار ما يناسبك لاحقًا.{" "}
                    <Link
                      href="/cookie-policy"
                      className="font-bold text-primary underline decoration-primary/30 underline-offset-2 hover:decoration-primary"
                    >
                      المزيد
                    </Link>
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap lg:max-w-md xl:max-w-none">
                <button
                  type="button"
                  onClick={() => saveConsent(acceptAllConsent())}
                  className="w-full rounded-sm bg-breaking px-5 py-2.5 text-sm font-black text-white shadow-sm transition hover:bg-red-600 sm:min-w-[130px] sm:w-auto"
                >
                  قبول الكل
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(rejectOptionalConsent())}
                  className="w-full rounded-sm border-2 border-[#244958]/15 bg-white px-5 py-2.5 text-sm font-bold text-[#244958] transition hover:bg-surface-alt sm:w-auto"
                >
                  رفض غير الضروري
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizeOpen(true)}
                  className="w-full rounded-sm border-2 border-primary/25 bg-[#eaf6fb] px-5 py-2.5 text-sm font-bold text-primary transition hover:bg-[#dff0f8] sm:w-auto"
                >
                  تخصيص
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-3 border-b border-border pb-3">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
                    <Cookie size={20} aria-hidden />
                  </span>
                  <h2 className="text-base font-black text-[#244958] sm:text-lg">
                    تخصيص الكوكيز
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomizeOpen(false)}
                  className="rounded-sm px-3 py-1.5 text-sm font-bold text-primary transition hover:bg-white/80"
                >
                  رجوع
                </button>
              </div>

              <div className="grid max-h-[40vh] gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-4">
                <label className="flex items-start gap-3 rounded-md border border-border bg-white/90 p-3">
                  <input type="checkbox" checked disabled className="mt-1 h-4 w-4" />
                  <span>
                    <span className="block text-sm font-bold text-[#244958]">ضرورية</span>
                    <span className="mt-1 block text-xs leading-6 text-text-muted">
                      مطلوبة لتشغيل الموقع وحفظ اختيارك.
                    </span>
                  </span>
                </label>

                {(
                  [
                    {
                      key: "analytics" as const,
                      label: "تحليلات",
                      description: "قياس الزيارات (مثل Google Analytics).",
                    },
                    {
                      key: "marketing" as const,
                      label: "إعلانات",
                      description: "عرض الإعلانات عند تفعيل AdSense.",
                    },
                    {
                      key: "personalization" as const,
                      label: "تخصيص",
                      description: "تذكر تفضيلاتك.",
                    },
                  ] as const
                ).map((item) => (
                  <label
                    key={item.key}
                    className="flex cursor-pointer items-start gap-3 rounded-md border border-border bg-white p-3 transition hover:border-primary/40 hover:bg-[#f8fcfe]"
                  >
                    <input
                      type="checkbox"
                      checked={preferences[item.key]}
                      onChange={() => togglePreference(item.key)}
                      className="mt-1 h-4 w-4 accent-primary"
                    />
                    <span>
                      <span className="block text-sm font-bold text-[#244958]">
                        {item.label}
                      </span>
                      <span className="mt-1 block text-xs leading-6 text-text-muted">
                        {item.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-border/80 pt-4 sm:flex-row">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full rounded-sm bg-breaking px-5 py-2.5 text-sm font-black text-white transition hover:bg-red-600 sm:w-auto"
                >
                  حفظ الاختيارات
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(rejectOptionalConsent())}
                  className="w-full rounded-sm border-2 border-border bg-white px-5 py-2.5 text-sm font-bold text-[#244958] transition hover:bg-surface-alt sm:w-auto"
                >
                  رفض غير الضروري
                </button>
              </div>
            </div>
          )}
        </div>

        {!customizeOpen ? (
          <div className="flex justify-center border-t border-border/50 bg-white/60">
            <button
              type="button"
              onClick={() => setMinimized(true)}
              className="flex items-center gap-1 px-4 py-1.5 text-[11px] font-bold text-text-muted transition hover:text-primary"
              aria-label="تصغير الشريط — يمكنك متابعة التصفح"
            >
              <ChevronDown size={14} aria-hidden />
              تصغير
            </button>
          </div>
        ) : null}
      </div>
    </aside>
  );
}
