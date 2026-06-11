import type { TravelOffer } from "@/data/offers";

type OfferCardProps = {
  offer: TravelOffer;
};

const whatsappNumber = "967000000000";

export default function OfferCard({ offer }: OfferCardProps) {
  const message = encodeURIComponent(
    `مرحبًا، أريد الاستفسار عن العرض: ${offer.title}`,
  );

  return (
    <article className="overflow-hidden rounded border border-border bg-surface shadow-sm transition hover:shadow-md">
      <div className="relative h-48 overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="h-full w-full object-cover"
        />
        <span className="absolute right-3 top-3 bg-accent px-3 py-1 text-xs font-bold text-white">
          {offer.badge}
        </span>
      </div>
      <div className="p-4">
        <span className="text-sm font-bold text-primary">{offer.destination}</span>
        <h3 className="mt-2 text-lg font-black text-text-dark">{offer.title}</h3>
        <div className="mt-3 flex justify-between text-sm text-text-muted">
          <span>{offer.duration}</span>
          <span className="font-black text-primary">{offer.price}</span>
        </div>
        <ul className="mt-3 space-y-1 text-sm text-text-muted">
          {offer.features.map((f) => (
            <li key={f}>✓ {f}</li>
          ))}
        </ul>
        <a
          href={`https://wa.me/${whatsappNumber}?text=${message}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 block bg-primary py-2.5 text-center text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          استفسر عن العرض
        </a>
      </div>
    </article>
  );
}
