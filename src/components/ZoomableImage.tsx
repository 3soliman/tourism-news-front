"use client";

import { useState } from "react";
import { ZoomIn } from "lucide-react";
import ImageLightboxOverlay from "@/components/ImageLightboxOverlay";
import { resolveMediaUrl } from "@/lib/media-url";
import { IMAGE_WIDTHS, optimizeImageUrl } from "@/lib/optimize-image";

type ZoomableImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  caption?: string;
};

export default function ZoomableImage({
  src,
  alt,
  className,
  caption,
}: ZoomableImageProps) {
  const [open, setOpen] = useState(false);
  const resolved = resolveMediaUrl(src)?.trim();

  if (!resolved) {
    return null;
  }

  const displaySrc = optimizeImageUrl(resolved, {
    width: IMAGE_WIDTHS.card,
    quality: 80,
  });

  return (
    <>
      <figure className="group">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block w-full cursor-zoom-in overflow-hidden rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label={`تكبير الصورة: ${alt}`}
        >
          <img
            src={displaySrc}
            alt={alt}
            className={className}
            loading="lazy"
            decoding="async"
          />
          <span
            className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition duration-200 group-hover:bg-black/20"
            aria-hidden
          >
            <span className="flex items-center gap-1.5 rounded-full bg-black/65 px-3 py-1.5 text-xs font-bold text-white opacity-0 transition group-hover:opacity-100">
              <ZoomIn className="h-4 w-4" />
              تكبير
            </span>
          </span>
        </button>
        {caption ? (
          <figcaption className="mt-2 text-center text-sm text-text-muted">
            {caption}
          </figcaption>
        ) : null}
      </figure>

      {open ? (
        <ImageLightboxOverlay
          src={resolved}
          alt={alt}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
