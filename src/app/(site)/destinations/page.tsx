import type { Metadata } from "next";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import DestinationCard from "@/components/DestinationCard";
import SectionHeader from "@/components/news/SectionHeader";
import { isApiOnline } from "@/lib/api/connection";
import { fetchDestinations } from "@/lib/api/destinations";
import { MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "وجهات سياحية",
  description:
    "استكشف أشهر الوجهات السياحية المناسبة للمسافرين العرب، مع مقالات وأدلة سفر ونصائح قبل الرحلة.",
};

export default async function DestinationsPage() {
  const destinations = await fetchDestinations();

  if (!isApiOnline()) {
    return (
      <section className="mx-auto max-w-7xl px-4 py-8">
        <SectionHeader title="وجهات سياحية" />
        <ApiOfflineMessage />
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8">
        <SectionHeader title="وجهات سياحية" />
        <p className="flex items-center gap-2 text-text-muted">
          <MapPin size={16} className="text-primary" />
          اختر وجهتك القادمة وتعرف على أهم المقالات والنصائح المتعلقة بها.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {destinations.map((destination, i) => (
          <div key={destination.id} className={`animate-fade-in-up stagger-${Math.min(i + 1, 5)}`}>
            <DestinationCard destination={destination} />
          </div>
        ))}
      </div>
    </section>
  );
}
