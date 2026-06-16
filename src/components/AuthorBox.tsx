import Link from "next/link";
import { fetchAuthorBySlug } from "@/lib/api/authors";

type AuthorBoxProps = {
  authorSlug: string;
};

export default async function AuthorBox({ authorSlug }: AuthorBoxProps) {
  const author = await fetchAuthorBySlug(authorSlug);
  if (!author) return null;

  return (
    <div className="mt-8 rounded border border-border bg-page-bg p-5">
      <h3 className="mb-4 text-sm font-black text-text-dark">عن الكاتب</h3>
      <Link
        href={`/authors/${author.slug}`}
        className="flex items-start gap-4 transition hover:opacity-90"
      >
        <img
          src={author.image}
          alt={author.name}
          className="h-16 w-16 shrink-0 rounded-full object-cover ring-2 ring-primary/20"
        />
        <div>
          <span className="text-lg font-black text-text-dark">{author.name}</span>
          <span className="mt-1 block text-xs font-bold text-primary">
            {author.role}
          </span>
          <p className="mt-2 text-sm leading-7 text-text-muted">{author.bio}</p>
          <span className="mt-2 inline-block text-sm font-bold text-primary">
            المزيد عن الكاتب ←
          </span>
        </div>
      </Link>
    </div>
  );
}
