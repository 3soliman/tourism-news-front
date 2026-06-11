import Link from "next/link";
import { news } from "@/data/news";

export default function BreakingNewsBar() {
  const breaking = news.slice(0, 5);
  const items = [...breaking, ...breaking];

  return (
    <div className="border-b border-border bg-breaking text-white">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <span className="flex shrink-0 items-center bg-black/20 px-4 py-2.5 text-sm font-black">
          لا تفوتك
        </span>
        <div className="relative flex-1 overflow-hidden py-2.5">
          <div className="animate-marquee flex w-max gap-8 whitespace-nowrap px-4 text-sm font-semibold">
            {items.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/travel-news/${item.slug}`}
                className="transition hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
