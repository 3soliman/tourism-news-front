const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8070/api";

export type RedirectLookup = {
  to_path: string;
  status_code: number;
};

export async function lookupRedirect(
  path: string,
): Promise<RedirectLookup | null> {
  const url = `${API_URL}/redirects/lookup?path=${encodeURIComponent(path)}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: { Accept: "application/json" },
      signal: AbortSignal.timeout(4_000),
    });

    if (!response.ok) {
      return null;
    }

    const json = (await response.json()) as {
      success: boolean;
      data?: RedirectLookup;
    };

    if (!json.success || !json.data?.to_path) {
      return null;
    }

    return json.data;
  } catch {
    return null;
  }
}
