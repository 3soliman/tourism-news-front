import Link from "next/link";
import { news } from "@/data/news";

export default function BreakingNewsBar() {
  const breaking = news.slice(0, 5);
  const items = [...breaking, ...breaking];

  return (
    <div className="border-t border-[#cfe8f4] bg-[#eaf6fb]">
      <div className="mx-auto flex max-w-7xl items-stretch">
        <span className="flex shrink-0 items-center gap-2 bg-breaking px-5 py-2 text-xs font-black text-white">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          لا تفوتك
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden border-r border-[#cfe8f4] py-2">
          <div className="animate-marquee-rtl flex w-max gap-10 whitespace-nowrap px-4 text-sm font-semibold text-[#244958]">
            {items.map((item, i) => (
              <Link
                key={`${item.slug}-${i}`}
                href={`/travel-news/${item.slug}`}
                className="transition hover:text-primary"
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
