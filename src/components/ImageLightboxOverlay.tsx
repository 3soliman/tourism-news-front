"use client";

import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

type ImageLightboxOverlayProps = {
  src: string;
  alt: string;
  onClose: () => void;
};

export default function ImageLightboxOverlay({
  src,
  alt,
  onClose,
}: ImageLightboxOverlayProps) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-black/92 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={alt || "عرض الصورة"}
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute start-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition hover:bg-white/25 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="إغلاق"
      >
        <X className="h-6 w-6" aria-hidden />
      </button>

      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[min(100%,1200px)] select-none object-contain"
        onClick={(event) => event.stopPropagation()}
        draggable={false}
      />
    </div>,
    document.body,
  );
}
