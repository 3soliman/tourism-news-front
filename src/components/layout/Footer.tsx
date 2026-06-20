import Link from "next/link";
import CookiePreferencesLink from "@/components/cookies/CookiePreferencesLink";
import type { Category } from "@/types";
import { Mail, MapPin, Newspaper } from "lucide-react";

const trustLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/editorial-team", label: "هيئة التحرير" },
  { href: "/editorial-policy", label: "سياسة التحرير" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/cookie-policy", label: "سياسة ملفات تعريف الارتباط" },
  { href: "/terms", label: "شروط الاستخدام" },
];

const socialLinks = [
  { label: "فيسبوك", icon: "f" },
  { label: "إكس", icon: "x" },
  { label: "واتساب", icon: "w" },
  { label: "يوتيوب", icon: "y" },
  { label: "انستغرام", icon: "i" },
];

type FooterProps = {
  categories: Category[];
};

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="border-t border-border/60 bg-white">
      <div className="mx-auto max-w-7xl px-4 pt-14 pb-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl font-black text-white" style={{ background: "linear-gradient(135deg, #f59e0b, #d97706)" }}>
                س
              </span>
              <div>
                <p className="text-sm font-black text-primary-dark">أخبار السياحة</p>
                <p className="text-[10px] font-bold tracking-wider text-primary/60">Tourism News</p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-7 text-text-muted">
              بوابة عربية متخصصة في أخبار السياحة والسفر، الوجهات، الفنادق، التأشيرات، ونصائح السفر للمسافرين العرب.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-white text-xs font-bold text-text-muted transition hover:bg-primary hover:text-white hover:border-primary"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-black text-text-dark">
              <Newspaper size={16} className="text-primary" />
              أقسام الأخبار
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              <li>
                <Link href="/travel-news" className="transition hover:text-primary">
                  أرشيف الأخبار
                </Link>
              </li>
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link href={`/travel-news/${c.slug}`} className="transition hover:text-primary">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-black text-text-dark">
              <MapPin size={16} className="text-primary" />
              روابط مهمة
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-text-muted">
              {trustLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="transition hover:text-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <CookiePreferencesLink />
              </li>
            </ul>
          </div>

          <div>
            <h4 className="flex items-center gap-2 text-sm font-black text-text-dark">
              <Mail size={16} className="text-primary" />
              النشرة البريدية
            </h4>
            <p className="mt-4 text-sm leading-7 text-text-muted">
              اشترك لتصلك أهم أخبار السياحة مباشرة إلى بريدك الإلكتروني.
            </p>
            <form className="mt-4 space-y-3" action="/contact">
              <input
                type="email"
                placeholder="بريدك الإلكتروني"
                className="w-full rounded-xl border border-border bg-page-bg px-4 py-3 text-sm text-text-dark outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
              />
              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-l from-primary to-primary-hover px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:shadow-lg hover:shadow-primary/30"
              >
                اشتراك ←
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60 bg-page-bg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-sm text-text-muted sm:flex-row">
          <p>© 2026 أخبار السياحة — جميع الحقوق محفوظة</p>
          <p className="text-xs text-text-subtle">
            منصة عربية لأخبار السفر والوجهات السياحية
          </p>
        </div>
      </div>
    </footer>
  );
}
