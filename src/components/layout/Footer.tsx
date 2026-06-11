import Link from "next/link";
import { categories } from "@/data/categories";

const trustLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/editorial-team", label: "هيئة التحرير" },
  { href: "/editorial-policy", label: "سياسة التحرير" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "شروط الاستخدام" },
];

export default function Footer() {
  return (
    <footer className="mt-12 border-t-4 border-primary bg-text-dark text-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-black text-primary-hover">أخبار السياحة</h3>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            بوابة عربية متخصصة في أخبار السياحة والسفر، الوجهات، الفنادق،
            التأشيرات، والعروض للمسافرين العرب.
          </p>
        </div>

        <div>
          <h4 className="font-bold">أقسام الأخبار</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            <li>
              <Link href="/travel-news" className="hover:text-primary-hover">
                أرشيف الأخبار
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/travel-news/category/${c.slug}`}
                  className="hover:text-primary-hover"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold">صفحات الثقة</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-300">
            {trustLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary-hover">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold">تواصل</h4>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            للاستفسارات الصحفية والتعاون الإعلامي.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block bg-primary px-5 py-2 text-sm font-bold transition hover:bg-primary-hover"
          >
            اتصل بنا
          </Link>
        </div>
      </div>

      <div className="border-t border-slate-700 py-4 text-center text-sm text-slate-400">
        © 2026 أخبار السياحة — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
