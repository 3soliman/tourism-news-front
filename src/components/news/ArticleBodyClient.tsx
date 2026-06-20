"use client";

import DOMPurify from "isomorphic-dompurify";
import { useEffect, useRef, useState } from "react";
import ImageLightboxOverlay from "@/components/ImageLightboxOverlay";
import { paragraphsToDisplayHtml, parseEditorContent } from "@/lib/article-content";
import { resolveMediaUrlsInHtml } from "@/lib/media-url";
import "@/styles/article-builder.css";

type ArticleBodyProps = {
  paragraphs: string[];
};

const SANITIZE_OPTIONS = {
  ADD_ATTR: ["target", "rel", "style", "class", "href", "src", "alt", "dir"],
  ADD_TAGS: [
    "section",
    "figure",
    "figcaption",
    "blockquote",
    "cite",
    "hr",
    "ul",
    "li",
    "h2",
    "h3",
    "h4",
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",
    "div",
    "a",
    "img",
    "p",
    "strong",
    "span",
  ],
};

function sanitizeCss(css: string) {
  return css.replace(/<\/style/gi, "").trim();
}

export default function ArticleBody({ paragraphs }: ArticleBodyProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );

  const raw = resolveMediaUrlsInHtml(paragraphsToDisplayHtml(paragraphs));
  const { html, css } = parseEditorContent(raw);
  const safeHtml = DOMPurify.sanitize(html, SANITIZE_OPTIONS);
  const safeCss = sanitizeCss(css);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const images = container.querySelectorAll<HTMLImageElement>("img");
    images.forEach((image) => {
      image.classList.add("article-zoomable-image");
      image.setAttribute("role", "button");
      image.setAttribute("tabindex", "0");
      image.setAttribute(
        "aria-label",
        image.alt ? `تكبير الصورة: ${image.alt}` : "تكبير الصورة",
      );
    });

    const openLightbox = (image: HTMLImageElement) => {
      if (!image.src) return;
      setLightbox({ src: image.src, alt: image.alt || "" });
    };

    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!container.contains(target)) return;

      event.preventDefault();
      openLightbox(target);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      if (!container.contains(target)) return;
      if (event.key !== "Enter" && event.key !== " ") return;

      event.preventDefault();
      openLightbox(target);
    };

    container.addEventListener("click", handleClick);
    container.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("click", handleClick);
      container.removeEventListener("keydown", handleKeyDown);
    };
  }, [safeHtml]);

  if (!safeHtml && !safeCss) return null;

  return (
    <>
      {safeCss ? <style>{safeCss}</style> : null}
      <div
        ref={containerRef}
        className="article-body prose prose-lg mt-8 max-w-none leading-9 prose-headings:font-black prose-headings:text-text-dark prose-p:text-[#41576a] prose-a:text-primary prose-blockquote:border-primary prose-blockquote:bg-surface-alt prose-blockquote:px-4 prose-blockquote:py-2 prose-blockquote:text-text-dark"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
      {lightbox ? (
        <ImageLightboxOverlay
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox(null)}
        />
      ) : null}
    </>
  );
}
