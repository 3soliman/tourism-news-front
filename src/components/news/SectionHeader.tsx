import Link from "next/link";

type SectionHeaderProps = {
  title: string;
  moreHref?: string;
  moreLabel?: string;
};

export default function SectionHeader({
  title,
  moreHref,
  moreLabel = "عرض المزيد",
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between border-b-2 border-primary pb-2">
      <h2 className="text-xl font-black text-text-dark">{title}</h2>
      {moreHref && (
        <Link
          href={moreHref}
          className="text-sm font-bold text-primary transition hover:text-primary-dark"
        >
          {moreLabel} ←
        </Link>
      )}
    </div>
  );
}
