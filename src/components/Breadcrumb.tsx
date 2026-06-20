import Link from "next/link";
import { ChevronLeft } from "lucide-react";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="مسار الصفحة" className="mb-5 text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-1.5">
              {!isLast && (
                <ChevronLeft size={14} className="text-border" />
              )}
              {item.href && !isLast ? (
                <Link
                  href={item.href}
                  className="font-medium transition hover:text-primary"
                >
                  {item.label}
                </Link>
              ) : (
                <span className="font-semibold text-text-dark">
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
