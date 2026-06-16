"use client";

import dynamic from "next/dynamic";

const ArticleBodyClient = dynamic(() => import("@/components/news/ArticleBodyClient"), {
  ssr: false,
  loading: () => (
    <div className="mt-8 space-y-4">
      <div className="h-4 w-full animate-pulse rounded bg-surface-alt" />
      <div className="h-4 w-11/12 animate-pulse rounded bg-surface-alt" />
      <div className="h-4 w-10/12 animate-pulse rounded bg-surface-alt" />
    </div>
  ),
});

type ArticleBodyProps = {
  paragraphs: string[];
};

export default function ArticleBody({ paragraphs }: ArticleBodyProps) {
  return <ArticleBodyClient paragraphs={paragraphs} />;
}
