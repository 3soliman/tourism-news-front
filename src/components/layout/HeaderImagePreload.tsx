import { IMAGE_WIDTHS, optimizeImageUrl } from "@/lib/optimize-image";
import { resolveMediaUrl } from "@/lib/media-url";

type HeaderImagePreloadProps = {
  src?: string;
};

export default function HeaderImagePreload({ src }: HeaderImagePreloadProps) {
  if (!src) {
    return null;
  }

  const resolved = resolveMediaUrl(src);
  const mobileHref = optimizeImageUrl(resolved, {
    width: IMAGE_WIDTHS.header,
    quality: 68,
  });
  const desktopHref = optimizeImageUrl(resolved, {
    width: IMAGE_WIDTHS.headerDesktop,
    quality: 72,
  });

  return (
    <>
      <link
        rel="preload"
        as="image"
        href={mobileHref}
        media="(max-width: 768px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href={desktopHref}
        media="(min-width: 769px)"
        fetchPriority="high"
      />
    </>
  );
}
