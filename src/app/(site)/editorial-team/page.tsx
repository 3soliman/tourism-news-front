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
        <div className="not-prose mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {authors.map((author) => (
            <Link
              key={author.slug}
              href={`/authors/${author.slug}`}
              className="group rounded-2xl border border-border/60 bg-white p-6 text-center editorial-card"
            >
              <img
                src={author.image}
                alt={author.name}
                className="mx-auto h-24 w-24 rounded-2xl object-cover ring-2 ring-primary/10 transition group-hover:ring-primary/30"
              />
              <h3 className="mt-4 text-lg font-black text-text-dark transition group-hover:text-primary">
                {author.name}
              </h3>
              <p className="mt-1 text-xs font-bold text-primary">{author.role}</p>
              <p className="mt-3 text-sm leading-7 text-text-muted line-clamp-3">{author.bio}</p>
            </Link>
          ))}
        </div>
      ) : null}
    </TrustPageView>
  );
}
