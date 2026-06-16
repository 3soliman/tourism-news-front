import CategoryNav from "@/components/CategoryNav";
import { fetchCategories } from "@/lib/api/categories";
import { fetchCountries, getCountryBySlug } from "@/lib/api/countries";
import type { Category, Country } from "@/types";

type TravelNewsFiltersProps = {
  activeCategorySlug?: string;
  activeCountrySlug?: string;
};

type TravelNewsFiltersData = {
  categories: Category[];
  countries: Country[];
  activeCountry?: Country;
};

export async function getTravelNewsFiltersData(
  activeCountrySlug?: string,
): Promise<TravelNewsFiltersData> {
  const [categories, countries, activeCountry] = await Promise.all([
    fetchCategories(),
    fetchCountries(),
    activeCountrySlug ? getCountryBySlug(activeCountrySlug) : Promise.resolve(undefined),
  ]);

  return { categories, countries, activeCountry };
}

export default async function TravelNewsFilters({
  activeCategorySlug,
  activeCountrySlug,
}: TravelNewsFiltersProps) {
  const { categories } = await getTravelNewsFiltersData(activeCountrySlug);

  return (
    <CategoryNav
      categories={categories}
      activeSlug={activeCategorySlug}
      countrySlug={activeCountrySlug}
    />
  );
}
