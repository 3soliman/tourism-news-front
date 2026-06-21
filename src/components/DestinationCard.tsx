import Link from "next/link";
import type { Destination } from "@/types";
import { Calendar, FileText } from "lucide-react";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl bg-white editorial-card">
      <div className="relative h-56 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/40 to-transparent" />
        <div className="absolute bottom-4 right-4 text-white">
          <span className="category-badge bg-white/20 text-white/90 backdrop-blur-sm">
            {destination.country}
          </span>
          <h3 className="mt-2 text-2xl font-black tracking-tight">{destination.name}</h3>
        </div>
      </div>
      <div className="p-5">
        <p className="text-sm leading-7 text-text-muted line-clamp-2">{destination.description}</p>
        <div className="mt-4 flex items-center justify-between border-t border-border/60 pt-4 text-sm">
          <span className="flex items-center gap-1.5 text-text-muted">
            <Calendar size={14} className="text-primary" />
            <span className="text-xs">{destination.bestTime}</span>
          </span>
          <span className="flex items-center gap-1.5 font-bold text-primary">
            <FileText size={14} />
            {destination.articlesCount} مقال
          </span>
        </div>
        <Link
          href="/travel-news/destinations"
          className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary to-primary-hover px-4 py-3 text-sm font-bold text-white shadow-sm shadow-primary/20 transition hover:shadow-md hover:shadow-primary/30"
        >
          تصفح المقالات ←
        </Link>
      </div>
    </article>
  );
}
