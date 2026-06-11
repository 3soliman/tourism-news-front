export type Country = {
  slug: string;
  name: string;
  flag: string;
  region: string;
};

export const countries: Country[] = [
  { slug: "saudi-arabia", name: "السعودية", flag: "🇸🇦", region: "الخليج العربي" },
  { slug: "turkey", name: "تركيا", flag: "🇹🇷", region: "أوروبا وآسيا" },
  { slug: "egypt", name: "مصر", flag: "🇪🇬", region: "شمال أفريقيا" },
  { slug: "uae", name: "الإمارات", flag: "🇦🇪", region: "الخليج العربي" },
  { slug: "malaysia", name: "ماليزيا", flag: "🇲🇾", region: "جنوب شرق آسيا" },
  { slug: "georgia", name: "جورجيا", flag: "🇬🇪", region: "القوقاز" },
  { slug: "azerbaijan", name: "أذربيجان", flag: "🇦🇿", region: "القوقاز" },
  { slug: "thailand", name: "تايلاند", flag: "🇹🇭", region: "جنوب شرق آسيا" },
  { slug: "global", name: "عالمي", flag: "🌍", region: "دولي" },
];

export function getCountryBySlug(slug: string) {
  return countries.find((country) => country.slug === slug);
}
