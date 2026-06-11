import Breadcrumb from "@/components/Breadcrumb";

type StaticPageLayoutProps = {
  title: string;
  description?: string;
  children: React.ReactNode;
};

export default function StaticPageLayout({
  title,
  description,
  children,
}: StaticPageLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Breadcrumb items={[{ label: "الرئيسية", href: "/" }, { label: title }]} />
      <article className="rounded border border-border bg-surface p-6 md:p-10">
        <h1 className="border-b-2 border-primary pb-3 text-3xl font-black text-text-dark">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-8 text-text-muted">{description}</p>
        )}
        <div className="prose prose-lg mt-8 max-w-none leading-8 prose-headings:font-black prose-p:text-text-muted prose-li:text-text-muted">
          {children}
        </div>
      </article>
    </div>
  );
}
