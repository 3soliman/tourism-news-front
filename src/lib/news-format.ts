import type { NewsArticle } from "@/data/news";

export function formatPublishedAt(iso: string) {
  return new Intl.DateTimeFormat("ar", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function formatTodayDate() {
  return new Intl.DateTimeFormat("ar", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

export function toPublicationDate(isoDate: string) {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return isoDate;
  if (isoDate.includes("T")) return isoDate;
  return `${isoDate}T10:00:00+03:00`;
}

export function getReadingTime(content: string[]) {
  const words = content.join(" ").split(/\s+/).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} دقائق`;
}

export function getExcerpt(article: NewsArticle) {
  return article.excerpt || article.seoDescription;
}
