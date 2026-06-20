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
    <div className="mb-5">
      <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-3">
        <div className="flex items-center gap-3">
          <span className="section-accent" />
          <h2 className="text-2xl font-black tracking-tight text-text-dark">
            {title}
          </h2>
        </div>
        {moreHref && !description && (
          <Link
            href={moreHref}
            className="group shrink-0 rounded-lg border border-border/70 bg-white px-3.5 py-2 text-sm font-bold text-text-muted transition hover:border-primary/40 hover:bg-primary hover:text-white"
          >
            <span className="flex items-center gap-1">
              {moreLabel}
              <span className="transition-transform group-hover:translate-x-1">←</span>
            </span>
          </Link>
        )}
      </div>
      {description && (
        <p className="mt-2 text-sm leading-7 text-text-muted">{description}</p>
      )}
    </div>
  );
}
