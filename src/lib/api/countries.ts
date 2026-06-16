import { apiFetch } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import { mapCountries } from "@/lib/mappers";
import type { ApiCountry, Country } from "@/types";

export async function fetchCountries(): Promise<Country[]> {
  try {
    const data = await apiFetch<ApiCountry[]>("/countries");
    return mapCountries(data);
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
}

export async function getCountryBySlug(slug: string): Promise<Country | undefined> {
  const countries = await fetchCountries();
  return countries.find((country) => country.slug === slug);
}
