import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "@/components/StaticPageLayout";
import { authors } from "@/data/authors";

export const metadata: Metadata = {
  title: "هيئة التحرير",
  description:
    "تعرف على فريق التحرير في أخبار السياحة والجهة المسؤولة عن إعداد ونشر المحتوى.",
};

export default function EditorialTeamPage() {
  return (
    <StaticPageLayout
      title="هيئة التحرير"
      description="فريق تحرير متخصص في السياحة والسفر، يعمل على إعداد ومراجعة المحتوى المنشور في المنصة."
    >
      <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
            <p className="mt-2 text-sm leading-7 text-text-muted">{author.bio}</p>
          </Link>
        ))}
      </div>
    </StaticPageLayout>
  );
}
