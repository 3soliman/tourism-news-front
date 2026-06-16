import Link from "next/link";
import TrustPageView, { generateTrustPageMetadata } from "@/components/TrustPageView";
import { fetchAuthors } from "@/lib/api/authors";

export const dynamic = "force-dynamic";

export const generateMetadata = () => generateTrustPageMetadata("editorial-team");

export default async function EditorialTeamPage() {
  const authors = await fetchAuthors();

  return (
    <TrustPageView slug="editorial-team">
      {authors.length > 0 ? (
        <div className="not-prose mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="rounded border border-border bg-page-bg p-5 text-center transition hover:border-primary hover:shadow-md"
            >
              <img
                src={author.image}
                alt={author.name}
                className="mx-auto h-24 w-24 rounded-full object-cover ring-2 ring-primary/20"
              />
              <h3 className="mt-4 text-lg font-black text-text-dark">{author.name}</h3>
              <p className="mt-1 text-xs font-bold text-primary">{author.role}</p>
              <p className="mt-2 text-sm leading-7 text-text-muted">{author.bio}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </TrustPageView>
  );
}
