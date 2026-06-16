import { cache } from "react";
import { apiFetch } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import { mapSiteSettings } from "@/lib/mappers";
import type { ApiSiteSettings, SiteConfig } from "@/types";

export const fallbackSiteConfig: SiteConfig = {
  name: "أخبار السياحة",
  description:
    "منصة عربية متخصصة في أخبار السياحة والسفر، الوجهات، الفنادق، ونصائح المسافرين.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:8069",
  logo: "/logo.svg",
  defaultImage:
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1200&auto=format&fit=crop",
  backgroundImages: [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1920&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1920&auto=format&fit=crop",
  ],
  author: "فريق أخبار السياحة",
};

const loadSiteConfig = cache(async (): Promise<SiteConfig> => {
  try {
    const data = await apiFetch<ApiSiteSettings>("/site-settings");
    return mapSiteSettings(data);
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return fallbackSiteConfig;
  }
});

export async function getSiteConfig(): Promise<SiteConfig> {
  return loadSiteConfig();
}
