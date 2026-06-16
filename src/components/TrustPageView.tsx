import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import ApiOfflineMessage from "@/components/ApiOfflineMessage";
import StaticPageLayout from "@/components/StaticPageLayout";
import { fetchTrustPage } from "@/lib/api/pages";
import { isApiOnline } from "@/lib/api/connection";

type TrustPageViewProps = {
  slug: string;
  children?: ReactNode;
};

export async function generateTrustPageMetadata(slug: string): Promise<Metadata> {
  const page = await fetchTrustPage(slug);

  if (!page) {
    return { title: "صفحة غير موجودة" };
  }

  return {
    title: page.seoTitle || page.title,
    description: page.seoDescription || page.description,
  };
}

export default async function TrustPageView({ slug, children }: TrustPageViewProps) {
  const page = await fetchTrustPage(slug);

  if (!page) {
    if (!isApiOnline()) {
      return (
        <StaticPageLayout title="تعذر تحميل الصفحة">
          <ApiOfflineMessage />
        </StaticPageLayout>
      );
    }

    notFound();
  }

  return (
    <StaticPageLayout title={page.title} description={page.description}>
      {page.content ? (
        <div dangerouslySetInnerHTML={{ __html: page.content }} />
      ) : null}
      {children}
    </StaticPageLayout>
  );
}
