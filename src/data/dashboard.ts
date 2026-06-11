import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  FileText,
  Globe2,
  LayoutGrid,
  MapPin,
  Newspaper,
  ShieldCheck,
  TrendingUp,
  Users,
} from "lucide-react";
import { authors } from "@/data/authors";
import { categories } from "@/data/categories";
import { news } from "@/data/news";

export const dashboardStats = [
  {
    label: "الأخبار المنشورة",
    value: "1,248",
    change: "+32 عن الأسبوع الماضي",
    tone: "blue",
    icon: Newspaper,
  },
  {
    label: "المسودات",
    value: "37",
    change: "-3 عن الأمس",
    tone: "orange",
    icon: FileText,
  },
  {
    label: "الأخبار المجدولة",
    value: "24",
    change: "+5 عن الأمس",
    tone: "purple",
    icon: CalendarCheck,
  },
  {
    label: "متوسط SEO",
    value: "78/100",
    change: "+6 نقاط عن الأسبوع الماضي",
    tone: "green",
    icon: TrendingUp,
  },
  {
    label: "الزيارات",
    value: "156.8K",
    change: "+22% عن الأسبوع الماضي",
    tone: "blue",
    icon: BarChart3,
  },
  {
    label: "Google News",
    value: "128",
    change: "+18% عن الأسبوع الماضي",
    tone: "green",
    icon: Globe2,
  },
] as const;

export const dashboardActivities = [
  "تم نشر خبر جديد: السياحة في السعودية تحقق نموًا قياسيًا",
  "تمت ترجمة خبر عن أفضل الوجهات الصيفية للعائلات",
  "تمت جدولة خبر جديد عن تأشيرات شنغن",
  "تم تحسين SEO لخبر دليل السياحة في دبي",
  "تمت إضافة تصنيف جديد: سياحة العائلات",
];

export const publishingChecklist = [
  "العنوان جذاب ومحسن للسيو",
  "الوصف التعريفي محسّن",
  "الكلمة المفتاحية الرئيسية في العنوان والمحتوى",
  "الصورة المميزة بأبعاد مناسبة",
  "روابط داخلية وخارجية مضافة",
  "الخبر مؤهل لـ Google News",
];

export const dashboardCategories = categories.map((category, index) => ({
  ...category,
  articles: [342, 286, 254, 198, 168][index] ?? 120,
  visits: ["52.1K", "41.3K", "31.8K", "18.6K", "12.9K"][index] ?? "9.4K",
  image:
    news[index]?.image ??
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=500&auto=format&fit=crop",
}));

export const dashboardCountries = [
  {
    name: "تركيا",
    slug: "turkey",
    flag: "🇹🇷",
    region: "أوروبا وآسيا",
    newsCount: 286,
    visits: "74.8K",
    seoScore: 86,
    lastNews: "أفضل فنادق إسطنبول للعائلات في 2026",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "السعودية",
    slug: "saudi-arabia",
    flag: "🇸🇦",
    region: "الخليج العربي",
    newsCount: 214,
    visits: "52.4K",
    seoScore: 91,
    lastNews: "السياحة في السعودية تحقق نموًا قياسيًا",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "مصر",
    slug: "egypt",
    flag: "🇪🇬",
    region: "شمال أفريقيا",
    newsCount: 198,
    visits: "41.3K",
    seoScore: 82,
    lastNews: "دليل السياحة في القاهرة للعائلات",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1568322445389-f64ac2515020?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "الإمارات",
    slug: "uae",
    flag: "🇦🇪",
    region: "الخليج العربي",
    newsCount: 176,
    visits: "33.9K",
    seoScore: 79,
    lastNews: "أفضل عروض دبي السياحية",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "ماليزيا",
    slug: "malaysia",
    flag: "🇲🇾",
    region: "جنوب شرق آسيا",
    newsCount: 143,
    visits: "28.6K",
    seoScore: 77,
    lastNews: "أفضل وقت لزيارة ماليزيا للسياحة",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "جورجيا",
    slug: "georgia",
    flag: "🇬🇪",
    region: "القوقاز",
    newsCount: 92,
    visits: "18.4K",
    seoScore: 73,
    lastNews: "برنامج سياحي في تبليسي للعائلات",
    status: "مخفية",
    image:
      "https://images.unsplash.com/photo-1565008576549-57569a49371d?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "أذربيجان",
    slug: "azerbaijan",
    flag: "🇦🇿",
    region: "القوقاز",
    newsCount: 81,
    visits: "16.9K",
    seoScore: 72,
    lastNews: "رحلات باكو للعائلات العربية",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1600100598137-9d3f43e10d35?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "تايلاند",
    slug: "thailand",
    flag: "🇹🇭",
    region: "جنوب شرق آسيا",
    newsCount: 74,
    visits: "14.2K",
    seoScore: 70,
    lastNews: "تحديثات السفر إلى بانكوك",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?q=80&w=900&auto=format&fit=crop",
  },
  {
    name: "عالمي",
    slug: "global",
    flag: "🌍",
    region: "دولي",
    newsCount: 312,
    visits: "64.1K",
    seoScore: 84,
    lastNews: "أخبار السفر الدولية لهذا الأسبوع",
    status: "مفعلة",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=900&auto=format&fit=crop",
  },
] as const;

export const countryFilterOptions = [
  "كل الدول",
  ...dashboardCountries.map((country) => country.name),
];

export const dashboardNewsRows = news.map((article, index) => ({
  ...article,
  author: authors.find((author) => author.slug === article.authorSlug),
  country: [
    dashboardCountries[0],
    dashboardCountries[1],
    dashboardCountries[4],
    dashboardCountries[8],
    dashboardCountries[2],
  ][index] ?? dashboardCountries[index % dashboardCountries.length],
  destination: ["إسطنبول", "الرياض", "كوالالمبور", "عالمي", "القاهرة"][index] ?? "",
  seoScore: [82, 76, 68, 91, 55][index] ?? 72,
  googleNews: index === 4 ? "غير مؤهل" : index === 2 ? "قيد المراجعة" : "منشور",
  status: index === 2 ? "مسودة" : "منشور",
}));

export const quickOverview = [
  { label: "التصنيفات", value: categories.length, icon: LayoutGrid },
  { label: "الدول", value: dashboardCountries.length, icon: MapPin },
  { label: "الكتّاب", value: authors.length, icon: Users },
  { label: "وسوم", value: 312, icon: BookOpen },
  { label: "تعليقات", value: "1,254", icon: FileText },
  { label: "ملفات مرفوعة", value: "2.4K", icon: ShieldCheck },
  { label: "نشرات بريدية", value: "18.6K", icon: Globe2 },
];

export const dashboardUsers = authors.map((author, index) => ({
  ...author,
  email: `${author.slug}@tourismnews.com`,
  status: index === authors.length - 1 ? "معلّق" : "نشط",
  permissions: ["كاملة", "متقدمة", "محدودة", "محدودة"][index] ?? "محدودة",
  lastSeen: ["اليوم - 10:24 ص", "أمس - 4:15 م", "23 مايو 2025", "20 مايو 2025"][
    index
  ],
}));

export const seoChecks = [
  { label: "NewsArticle Schema", status: "منفذ بشكل صحيح" },
  { label: "Breadcrumb", status: "منفذ بشكل صحيح" },
  { label: "Canonical URL", status: "موجود" },
  { label: "Open Graph", status: "مكتمل" },
  { label: "Twitter Card", status: "مكتمل" },
  { label: "News Sitemap", status: "مفعل" },
];
