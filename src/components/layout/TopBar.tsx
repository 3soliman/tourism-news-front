import Link from "next/link";
import { formatTodayDate } from "@/lib/news-format";

const quickLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/editorial-policy", label: "سياسة التحرير" },
];

export default function TopBar() {
  return (
    <div className="border-b border-border bg-surface text-sm text-text-muted">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-2">
        <p className="font-medium">
          <span className="text-primary">آخر تحديثات السياحة</span>
          <span className="mx-2 text-border">|</span>
          {formatTodayDate()}
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <nav className="hidden items-center gap-4 sm:flex">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="#"
              aria-label="فيسبوك"
              className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              f
            </a>
            <a
              href="#"
              aria-label="إكس"
              className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              x
            </a>
            <a
              href="#"
              aria-label="واتساب"
              className="flex h-7 w-7 items-center justify-center rounded bg-primary/10 text-xs font-bold text-primary transition hover:bg-primary hover:text-white"
            >
              w
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
