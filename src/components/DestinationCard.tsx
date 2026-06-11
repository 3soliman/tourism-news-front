import Link from "next/link";
import type { Destination } from "@/data/destinations";

type DestinationCardProps = {
  destination: Destination;
};

export default function DestinationCard({ destination }: DestinationCardProps) {
  return (
    <article className="group overflow-hidden rounded border border-border bg-surface shadow-sm transition hover:shadow-md">
      <div className="relative h-52 overflow-hidden">
        <img
          src={destination.image}
          alt={destination.name}
          className="h-full w-full object-cover transition group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 to-transparent" />
        <div className="absolute bottom-3 right-3 text-white">
          <span className="text-xs font-bold">{destination.country}</span>
          <h3 className="text-xl font-black">{destination.name}</h3>
        </div>
      </div>
      <div className="p-4">
        <p className="text-sm leading-7 text-text-muted">{destination.description}</p>
        <div className="mt-3 flex justify-between text-sm">
          <span className="text-text-muted">
            أفضل وقت: <strong>{destination.bestTime}</strong>
          </span>
          <span className="font-bold text-primary">
            {destination.articlesCount} مقال
          </span>
        </div>
        <Link
          href="/travel-news/destinations"
          className="mt-3 inline-block bg-primary/10 px-4 py-2 text-sm font-bold text-primary"
        >
          تصفح المقالات
        </Link>
      </div>
    </article>
  );
}
