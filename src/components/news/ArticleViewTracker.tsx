"use client";

import { useEffect, useRef } from "react";
import { recordArticleView } from "@/lib/api/news";

type ArticleViewTrackerProps = {
  slug: string;
};

export default function ArticleViewTracker({ slug }: ArticleViewTrackerProps) {
  const tracked = useRef(false);

  useEffect(() => {
    if (tracked.current) return;
    tracked.current = true;
    void recordArticleView(slug);
  }, [slug]);

  return null;
}
