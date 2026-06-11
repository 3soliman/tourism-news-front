import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  description?: string;
  moreHref?: string;
  moreLabel?: string;
};

export default function SectionHeader({
  title,
  description,
  moreHref,
  moreLabel = "عرض المزيد",
}: SectionHeaderProps) {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
        <h2 className="relative pr-4 text-2xl font-black text-text-dark before:absolute before:right-0 before:top-1 before:h-7 before:w-1.5 before:rounded-sm before:bg-breaking">
          {title}
        </h2>
        {moreHref && !description && (
          <Link
            href={moreHref}
            className="shrink-0 rounded-sm border border-border bg-white px-3 py-2 text-sm font-bold text-primary-dark transition hover:border-primary hover:bg-primary hover:text-white"
          >
            {moreLabel} ←
          </Link>
        )}
      </div>
      {description && (
        <p className="mt-1 text-sm leading-7 text-text-muted">{description}</p>
      )}
    </div>
  );
}
