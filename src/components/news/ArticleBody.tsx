import DOMPurify from "isomorphic-dompurify";
import { paragraphsToDisplayHtml } from "@/lib/article-content";

type ArticleBodyProps = {
  paragraphs: string[];
};

const SANITIZE_OPTIONS = {
  ADD_ATTR: ["target", "rel", "style", "class"],
  ADD_TAGS: ["span"],
};

export default function ArticleBody({ paragraphs }: ArticleBodyProps) {
  const html = DOMPurify.sanitize(
    paragraphsToDisplayHtml(paragraphs),
    SANITIZE_OPTIONS,
  );

  if (!html) return null;

  return (
    <div
      className="article-body prose prose-lg mt-8 max-w-none leading-9 prose-headings:font-black prose-headings:text-text-dark prose-p:text-text-muted prose-a:text-primary prose-blockquote:border-primary prose-blockquote:text-text-dark"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
