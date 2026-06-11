import { permanentRedirect } from "next/navigation";

type CategoryRedirectPageProps = {
  params: Promise<{ categorySlug: string }>;
};

export default async function CategoryRedirectPage({
  params,
}: CategoryRedirectPageProps) {
  const { categorySlug } = await params;

  permanentRedirect(`/travel-news/${categorySlug}`);
}
