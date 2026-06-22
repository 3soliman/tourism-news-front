import DOMPurify from "isomorphic-dompurify";

const ALLOWED_EMBED_HOSTS = [
  "youtube.com",
  "youtube-nocookie.com",
  "youtu.be",
  "vimeo.com",
  "player.vimeo.com",
  "dailymotion.com",
  "dai.ly",
];

const SANITIZE_OPTIONS: DOMPurify.Config = {
  ADD_ATTR: [
    "target",
    "rel",
    "style",
    "class",
    "href",
    "src",
    "alt",
    "dir",
    "loading",
    "decoding",
    "allow",
    "allowfullscreen",
    "frameborder",
    "referrerpolicy",
    "title",
    "width",
    "height",
    "controls",
    "poster",
    "type",
    "sandbox",
  ],
  ADD_TAGS: [
    "section",
    "figure",
    "figcaption",
    "blockquote",
    "cite",
    "hr",
    "ul",
    "ol",
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
    "span",
    "a",
    "img",
    "p",
    "strong",
    "em",
    "u",
    "s",
    "br",
    "iframe",
    "video",
    "audio",
    "source",
  ],
};

let hooksRegistered = false;

function isAllowedEmbedUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") {
      return false;
    }

    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");

    return ALLOWED_EMBED_HOSTS.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
  } catch {
    return false;
  }
}

function registerSanitizeHooks() {
  if (hooksRegistered) {
    return;
  }

  hooksRegistered = true;

  DOMPurify.addHook("uponSanitizeElement", (node, data) => {
    if (data.tagName === "iframe") {
      const src = node.getAttribute("src") ?? "";
      if (!isAllowedEmbedUrl(src)) {
        node.parentNode?.removeChild(node);
      }
    }
  });

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (data.attrName !== "src") {
      return;
    }

    if (node.tagName === "VIDEO" || node.tagName === "AUDIO") {
      if (!isAllowedEmbedUrl(data.attrValue)) {
        data.keepAttr = false;
      }
    }
  });
}

export function sanitizeArticleHtml(html: string): string {
  registerSanitizeHooks();

  return DOMPurify.sanitize(html, SANITIZE_OPTIONS);
}
