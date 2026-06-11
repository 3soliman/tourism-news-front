import type { Metadata } from "next";
import OfferCard from "@/components/OfferCard";
import SectionHeader from "@/components/news/SectionHeader";
import { offers } from "@/data/offers";

export const metadata: Metadata = {
  title: "العروض السياحية",
  description:
    "تصفح عروض سياحية مختارة تشمل الوجهات، الفنادق، البرامج السياحية، وخيارات السفر المناسبة للعائلات.",
};

export default function OffersPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <SectionHeader title="العروض السياحية" />
      <p className="mb-6 text-text-muted">
        نماذج لعروض سياحية يمكن ربطها لاحقًا بالحجز أو الواتساب.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {offers.map((offer) => (
          <OfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}
