import Link from "next/link";
import { formatTodayDate } from "@/lib/news-format";

const quickLinks = [
  { href: "/about", label: "من نحن" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/editorial-policy", label: "سياسة التحرير" },
];

const socialLinks = [
  { href: "#", label: "فيسبوك", icon: "f" },
  { href: "#", label: "إكس", icon: "x" },
  { href: "#", label: "واتساب", icon: "w" },
];

export default function TopBar() {
  return (
    <div className="border-b border-border/60 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5">
        <p className="shrink-0 text-xs font-semibold tracking-wide text-text-muted">
          {formatTodayDate()}
        </p>

        <p className="hidden truncate text-center text-[13px] font-bold text-primary/80 sm:block">
          رصد يومي لأخبار السفر والوجهات
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <nav className="hidden items-center gap-4 md:flex">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-xs font-semibold text-text-muted transition hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <span className="hidden h-3 w-px bg-border/70 md:block" />

          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-white text-[10px] font-bold text-primary transition hover:bg-primary hover:text-white hover:border-primary"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
