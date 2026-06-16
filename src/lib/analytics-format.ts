export function formatViewDateTime(iso?: string | null) {
  if (!iso) return "—";

  try {
    return new Intl.DateTimeFormat("ar", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}
