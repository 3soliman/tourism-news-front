"use client";

import { useEffect } from "react";

type ArticleScrollFocusProps = {
  slug: string;
};

export default function ArticleScrollFocus({ slug }: ArticleScrollFocusProps) {
  useEffect(() => {
    const target = document.getElementById("article-top");

    if (!target) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      target.scrollIntoView({ block: "start", behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [slug]);

  return null;
}
