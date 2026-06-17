"use client";

import { openCookiePreferences } from "@/lib/cookie-consent";

export default function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={openCookiePreferences}
      className="text-start hover:text-primary"
    >
      إدارة تفضيلات الكوكيز
    </button>
  );
}
