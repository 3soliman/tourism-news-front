import type { Metadata } from "next";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import DestinationCard from "@/components/DestinationCard";
import SectionHeader from "@/components/news/SectionHeader";
import { isApiOnline } from "@/lib/api/connection";
import { fetchDestinations } from "@/lib/api/destinations";

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
      <SectionHeader title="وجهات سياحية" />
      <p className="mb-6 text-text-muted">
        اختر وجهتك القادمة وتعرف على أهم المقالات والنصائح المتعلقة بها.
      </p>
      <div className="grid gap-4 md:grid-cols-3">
        {destinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </section>
  );
}
