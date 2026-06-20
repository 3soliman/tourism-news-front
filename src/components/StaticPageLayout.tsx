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
      <article className="rounded-2xl border border-border/60 bg-surface p-6 shadow-sm md:p-10">
        <div className="mb-3">
          <span className="section-accent" />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-text-dark">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-8 text-text-muted">{description}</p>
        )}
        <div className="prose prose-lg mt-8 max-w-none leading-8 prose-headings:font-black prose-headings:text-text-dark prose-p:text-text-muted prose-li:text-text-muted prose-a:text-primary prose-strong:text-text-dark">
          {children}
        </div>
      </article>
    </div>
  );
}
