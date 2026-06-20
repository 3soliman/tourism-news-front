import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { fetchAuthorBySlug } from "@/lib/api/authors";
import { IMAGE_WIDTHS } from "@/lib/optimize-image";
import type { Author } from "@/types";

type AuthorBoxProps = {
  authorSlug: string;
  author?: Author | null;
};

export default async function AuthorBox({ authorSlug, author: initial }: AuthorBoxProps) {
  const author = initial ?? (await fetchAuthorBySlug(authorSlug));
  if (!author) return null;

  return (
    <div className="mt-8 rounded-2xl border border-border/60 bg-gradient-to-l from-primary-50/50 to-page-bg p-6">
      <h3 className="mb-4 flex items-center gap-2 text-sm font-black text-text-dark">
        <span className="section-accent" />
        عن الكاتب
      </h3>
      <Link
        href={`/authors/${author.slug}`}
        className="flex items-start gap-5 transition hover:opacity-90"
      >
        <SafeImage
          src={author.image}
          alt={author.name}
          width={72}
          height={72}
          fill={false}
          displayWidth={IMAGE_WIDTHS.avatar}
          sizes="72px"
          className="h-18 w-18 shrink-0 rounded-2xl object-cover ring-2 ring-primary/15"
        />
        <div>
          <span className="text-lg font-black text-text-dark">{author.name}</span>
          <span className="mt-1 block text-xs font-bold text-primary">
            {author.role}
          </span>
          <p className="mt-2 text-sm leading-7 text-text-muted line-clamp-2">{author.bio}</p>
          <span className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-primary transition hover:gap-2">
            المزيد عن الكاتب ←
          </span>
        </div>
      </Link>
    </div>
  );
}
