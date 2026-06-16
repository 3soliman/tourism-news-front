import Link from "next/link";
import type { Category } from "@/types";

const trustLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/editorial-team", label: "هيئة التحرير" },
  { href: "/editorial-policy", label: "سياسة التحرير" },
  { href: "/privacy-policy", label: "سياسة الخصوصية" },
  { href: "/terms", label: "شروط الاستخدام" },
];

type FooterProps = {
  categories: Category[];
};

export default function Footer({ categories }: FooterProps) {
  return (
    <footer className="border-t-4 border-accent bg-[#eef7fb] text-[#244958]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-black text-primary">أخبار السياحة</h3>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            بوابة عربية متخصصة في أخبار السياحة والسفر، الوجهات، الفنادق،
            التأشيرات، ونصائح السفر للمسافرين العرب.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-[#244958]">أقسام الأخبار</h4>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            <li>
              <Link href="/travel-news" className="hover:text-primary">
                أرشيف الأخبار
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/travel-news/${c.slug}`}
                  className="hover:text-primary"
                >
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#244958]">صفحات الثقة</h4>
          <ul className="mt-3 space-y-2 text-sm text-text-muted">
            {trustLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-primary">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-[#244958]">تواصل</h4>
          <p className="mt-3 text-sm leading-7 text-text-muted">
            للاستفسارات الصحفية والتعاون الإعلامي.
          </p>
          <Link
            href="/contact"
            className="mt-4 inline-block bg-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-primary-hover"
          >
            اتصل بنا
          </Link>
        </div>
      </div>

      <div className="border-t border-[#cfe8f4] bg-white/55 py-4 text-center text-sm text-text-muted">
        © 2026 أخبار السياحة — جميع الحقوق محفوظة
      </div>
    </footer>
  );
}
