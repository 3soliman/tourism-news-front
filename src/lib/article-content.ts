const HTML_TAG_RE = /<\/?[a-z][\s\S]*?>/i;
const STYLE_TAG_RE = /<style[^>]*>([\s\S]*?)<\/style>/i;

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function paragraphsToEditorHtml(paragraphs: string[]) {
  if (paragraphs.length === 0) return "";

  const joined = paragraphs.join("");
  if (HTML_TAG_RE.test(joined)) {
    return joined;
  }

  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}

export function editorHtmlToParagraphs(html: string) {
  const trimmed = html.trim();
  if (!trimmed || trimmed === "<p></p>") return [];
  return [trimmed];
}

export function parseEditorContent(raw: string): { html: string; css: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { html: "", css: "" };
  }

  const match = trimmed.match(STYLE_TAG_RE);
  if (!match) {
    return { html: trimmed, css: "" };
  }

  return {
    css: match[1]?.trim() ?? "",
    html: trimmed.replace(STYLE_TAG_RE, "").trim(),
  };
}

export function paragraphsToDisplayHtml(paragraphs: string[]) {
  if (paragraphs.length === 0) return "";

  const joined = paragraphs.join("");
  if (HTML_TAG_RE.test(joined)) {
    return joined;
  }

  return paragraphs
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
}
