import { apiFetch } from "@/lib/api/client";
import { isConnectionError, markApiOffline } from "@/lib/api/connection";
import { mapDestinations } from "@/lib/mappers";
import type { ApiDestination, Destination } from "@/types";

export async function fetchDestinations(): Promise<Destination[]> {
  try {
    const data = await apiFetch<ApiDestination[]>("/destinations");
    return mapDestinations(data);
  } catch (error) {
    if (isConnectionError(error)) markApiOffline();
    return [];
  }
}
