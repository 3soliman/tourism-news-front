export const COOKIE_CONSENT_NAME = "cookie_consent";
export const COOKIE_CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
export const COOKIE_CONSENT_OPEN_EVENT = "cookie-consent:open";
export const COOKIE_CONSENT_UPDATED_EVENT = "cookie-consent:updated";

export type CookieConsentCategories = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  personalization: boolean;
};

export type CookieConsentState = CookieConsentCategories & {
  updatedAt: string;
};

/** Snapshot used during SSR so the banner is not rendered server-side. */
export const COOKIE_CONSENT_SERVER_SNAPSHOT: CookieConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
  updatedAt: "server",
};

export const COOKIE_CONSENT_REJECTED: CookieConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
  personalization: false,
  updatedAt: "",
};

export function acceptAllConsent(): CookieConsentState {
  return {
    necessary: true,
    analytics: true,
    marketing: true,
    personalization: true,
    updatedAt: new Date().toISOString(),
  };
}

export function rejectOptionalConsent(): CookieConsentState {
  return {
    ...COOKIE_CONSENT_REJECTED,
    updatedAt: new Date().toISOString(),
  };
}

export function parseConsentCookie(value: string): CookieConsentState | null {
  try {
    const parsed = JSON.parse(decodeURIComponent(value)) as CookieConsentState;

    if (typeof parsed.analytics !== "boolean") return null;
    if (typeof parsed.marketing !== "boolean") return null;
    if (typeof parsed.personalization !== "boolean") return null;

    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      personalization: parsed.personalization,
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function readConsentFromDocument(): CookieConsentState | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|; )${COOKIE_CONSENT_NAME}=([^;]*)`),
  );

  if (!match?.[1]) return null;

  return parseConsentCookie(match[1]);
}

export function writeConsentToDocument(state: CookieConsentState): void {
  const encoded = encodeURIComponent(JSON.stringify(state));

  document.cookie = `${COOKIE_CONSENT_NAME}=${encoded}; path=/; max-age=${COOKIE_CONSENT_MAX_AGE}; SameSite=Lax`;

  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(COOKIE_CONSENT_UPDATED_EVENT));
  }
}

export function subscribeCookieConsent(onStoreChange: () => void): () => void {
  window.addEventListener(COOKIE_CONSENT_OPEN_EVENT, onStoreChange);
  window.addEventListener(COOKIE_CONSENT_UPDATED_EVENT, onStoreChange);

  return () => {
    window.removeEventListener(COOKIE_CONSENT_OPEN_EVENT, onStoreChange);
    window.removeEventListener(COOKIE_CONSENT_UPDATED_EVENT, onStoreChange);
  };
}

export function hasConsentChoice(): boolean {
  return readConsentFromDocument() !== null;
}

export function openCookiePreferences(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}

/** يُستدعى عند الموافقة — جاهز لربط Google Analytics / AdSense لاحقًا */
export function applyConsentScripts(state: CookieConsentState): void {
  if (typeof window === "undefined") return;

  window.__cookieConsent = state;
}

declare global {
  interface Window {
    __cookieConsent?: CookieConsentState;
  }
}
