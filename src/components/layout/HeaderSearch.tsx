import { Search } from "lucide-react";

type HeaderSearchProps = {
  currentQuery: string;
  compact?: boolean;
};

export default function HeaderSearch({
  currentQuery,
  compact = false,
}: HeaderSearchProps) {
  return (
    <form
      action="/travel-news"
      className={`flex items-center gap-2 rounded-xl bg-white/95 shadow-lg shadow-primary-dark/8 ring-1 ring-white/50 backdrop-blur-sm transition-all focus-within:shadow-primary/10 focus-within:ring-primary/30 ${
        compact
          ? "min-w-0 flex-1 px-3 py-2 md:max-w-md"
          : "mx-auto w-full max-w-3xl gap-3 px-4 py-3"
      }`}
    >
      <input
        name="q"
        type="search"
        defaultValue={currentQuery}
        key={currentQuery}
        placeholder="ابحث في أخبار السياحة..."
        className="min-w-0 flex-1 bg-transparent text-sm text-text-dark outline-none placeholder:text-text-subtle"
      />
      <button
        type="submit"
        aria-label="بحث"
        className={`grid shrink-0 place-items-center rounded-lg text-primary-dark transition hover:bg-primary-50 ${
          compact ? "h-8 w-8" : "h-10 w-10"
        }`}
      >
        <Search size={compact ? 18 : 20} />
      </button>
    </form>
  );
}
