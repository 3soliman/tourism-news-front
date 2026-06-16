"use client";

import DOMPurify from "isomorphic-dompurify";
import { paragraphsToDisplayHtml, parseEditorContent } from "@/lib/article-content";
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
  const raw = paragraphsToDisplayHtml(paragraphs);
  const { html, css } = parseEditorContent(raw);
  const safeHtml = DOMPurify.sanitize(html, SANITIZE_OPTIONS);
  const safeCss = sanitizeCss(css);

  if (!safeHtml && !safeCss) return null;

  return (
    <>
      {safeCss ? <style>{safeCss}</style> : null}
      <div
        className="article-body prose prose-lg mt-8 max-w-none leading-9 prose-headings:font-black prose-headings:text-text-dark prose-p:text-text-muted prose-a:text-primary prose-blockquote:border-primary prose-blockquote:text-text-dark"
        dangerouslySetInnerHTML={{ __html: safeHtml }}
      />
    </>
  );
}
