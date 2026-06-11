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
    <div className="border-b border-[#d7e8ef] bg-[#eef7fb] text-xs text-[#48616d]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2">
        <p className="shrink-0 font-semibold text-[#244958]">{formatTodayDate()}</p>

        <p className="hidden truncate text-center font-bold text-primary sm:block">
          رصد يومي لأخبار السفر والوجهات والعروض
        </p>

        <div className="flex shrink-0 items-center gap-3">
          <nav className="hidden items-center gap-3 md:flex">
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

          <span className="hidden h-3 w-px bg-[#c8dce4] md:block" aria-hidden="true" />

          <div className="flex items-center gap-1.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-6 w-6 items-center justify-center rounded-full border border-[#c8dce4] bg-white text-[10px] font-bold text-primary transition hover:bg-primary hover:text-white"
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
