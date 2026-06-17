"use client";

import Link from "next/link";
import { Cookie, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  acceptAllConsent,
  applyConsentScripts,
  COOKIE_CONSENT_OPEN_EVENT,
  hasConsentChoice,
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
  const [preferences, setPreferences] = useState({
    analytics: false,
    marketing: false,
    personalization: false,
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
    if (!hasConsentChoice()) {
      setVisible(true);
    } else {
      const existing = readConsentFromDocument();
      if (existing) applyConsentScripts(existing);
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
        className="cookie-consent-panel fixed bottom-4 end-4 z-[300] flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/35 transition hover:bg-primary-hover"
        aria-label="عرض إعدادات ملفات تعريف الارتباط"
        title="ملفات تعريف الارتباط"
      >
        <Cookie size={26} strokeWidth={2.25} aria-hidden />
      </button>
    );
  }

  return (
    <aside
      className="cookie-consent-panel fixed bottom-4 end-4 z-[300] w-[min(calc(100vw-2rem),22rem)] sm:w-80"
      role="region"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-description"
    >
      <div className="overflow-hidden rounded-lg border border-border border-s-4 border-s-accent bg-white shadow-2xl shadow-black/15">
        <div className="flex items-center justify-between gap-2 border-b border-border bg-gradient-to-l from-[#eaf6fb] to-white px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-primary text-white">
              <Cookie size={18} aria-hidden />
            </span>
            <p className="text-sm font-black text-[#244958]">ملفات تعريف الارتباط</p>
          </div>
          <button
            type="button"
            onClick={() => setMinimized(true)}
            className="grid h-8 w-8 place-items-center rounded-full text-text-muted transition hover:bg-surface-alt hover:text-[#244958]"
            aria-label="تصغير — يمكنك متابعة التصفح"
            title="تصغير"
          >
            <X size={18} />
          </button>
        </div>

        <div className="max-h-[min(70vh,28rem)] overflow-y-auto px-4 py-4">
          {!customizeOpen ? (
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-black uppercase tracking-wide text-primary">
                  خصوصيتك تهمنا
                </p>
                <h2 id="cookie-consent-title" className="mt-1 text-base font-black text-[#244958]">
                  نستخدم ملفات تعريف الارتباط
                </h2>
                <p
                  id="cookie-consent-description"
                  className="mt-2 text-xs leading-6 text-text-muted"
                >
                  لتحسين تجربتك وتحليل الزيارات وتقديم محتوى مناسب عند الموافقة.
                  يمكنك متابعة التصفح واختيار ما يناسبك لاحقًا.{" "}
                  <Link
                    href="/cookie-policy"
                    className="font-bold text-primary hover:underline"
                  >
                    المزيد
                  </Link>
                </p>
              </div>

              <div className="flex flex-col gap-2">
                <button
                  type="button"
                  onClick={() => saveConsent(acceptAllConsent())}
                  className="w-full rounded-sm bg-breaking px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
                >
                  قبول الكل
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(rejectOptionalConsent())}
                  className="w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm font-bold text-[#244958] transition hover:bg-surface-alt"
                >
                  رفض غير الضروري
                </button>
                <button
                  type="button"
                  onClick={() => setCustomizeOpen(true)}
                  className="w-full rounded-sm border border-primary/30 bg-[#eaf6fb] px-4 py-2.5 text-sm font-bold text-primary transition hover:bg-[#dff0f8]"
                >
                  تخصيص
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-sm font-black text-[#244958]">تخصيص الكوكيز</h2>
                <button
                  type="button"
                  onClick={() => setCustomizeOpen(false)}
                  className="text-xs font-bold text-primary hover:underline"
                >
                  رجوع
                </button>
              </div>

              <div className="space-y-2">
                <label className="flex items-start gap-2 rounded-md border border-border bg-surface-alt/80 p-2.5">
                  <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4" />
                  <span>
                    <span className="block text-xs font-bold text-[#244958]">ضرورية</span>
                    <span className="mt-0.5 block text-[11px] leading-5 text-text-muted">
                      لتشغيل الموقع وحفظ اختيارك.
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
                    className="flex cursor-pointer items-start gap-2 rounded-md border border-border bg-white p-2.5 transition hover:border-primary/40"
                  >
                    <input
                      type="checkbox"
                      checked={preferences[item.key]}
                      onChange={() => togglePreference(item.key)}
                      className="mt-0.5 h-4 w-4 accent-primary"
                    />
                    <span>
                      <span className="block text-xs font-bold text-[#244958]">
                        {item.label}
                      </span>
                      <span className="mt-0.5 block text-[11px] leading-5 text-text-muted">
                        {item.description}
                      </span>
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2 border-t border-border pt-3">
                <button
                  type="button"
                  onClick={handleSaveCustom}
                  className="w-full rounded-sm bg-breaking px-4 py-2.5 text-sm font-black text-white transition hover:bg-red-600"
                >
                  حفظ الاختيارات
                </button>
                <button
                  type="button"
                  onClick={() => saveConsent(rejectOptionalConsent())}
                  className="w-full rounded-sm border border-border bg-white px-4 py-2.5 text-sm font-bold text-[#244958] transition hover:bg-surface-alt"
                >
                  رفض غير الضروري
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
