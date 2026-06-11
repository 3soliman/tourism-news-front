import Link from "next/link";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
};

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="مسار الصفحة" className="mb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-2 text-text-muted">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.label} className="flex items-center gap-2">
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
              {!isLast && <span className="text-border">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
