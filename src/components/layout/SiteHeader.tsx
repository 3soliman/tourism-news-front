import Link from "next/link";

export default function SiteHeader() {
  return (
    <div className="border-b border-border bg-surface">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 md:flex-row">
        <Link href="/" className="text-center md:text-right">
          <h1 className="text-3xl font-black text-primary md:text-4xl">
            أخبار السياحة
          </h1>
          <p className="mt-1 text-sm font-medium text-text-muted">
            بوابتك لعالم السفر
          </p>
        </Link>

        <div className="flex h-20 w-full max-w-md items-center justify-center rounded border border-dashed border-border bg-page-bg text-center text-sm text-text-muted md:w-80">
          مساحة إعلانية
          <br />
          728 × 90
        </div>
      </div>
    </div>
  );
}
