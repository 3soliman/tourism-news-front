import { optimizeImageUrl, IMAGE_WIDTHS } from "@/lib/optimize-image";

type HeaderImagePreloadProps = {
  src?: string;
};

export default function HeaderImagePreload({ src }: HeaderImagePreloadProps) {
  if (!src) {
    return null;
  }

  const href = optimizeImageUrl(src, {
    width: IMAGE_WIDTHS.header,
    quality: 75,
  });

  return (
    <link rel="preload" as="image" href={href} fetchPriority="high" />
  );
}
