import Image from "next/image";
import { optimizeImageUrl } from "@/lib/optimize-image";
import { resolveMediaUrl } from "@/lib/media-url";

type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  fill?: boolean;
  sizes?: string;
  priority?: boolean;
  displayWidth?: number;
};

export default function SafeImage({
  src,
  alt,
  className,
  width,
  height,
  fill = true,
  sizes,
  priority = false,
  displayWidth = 640,
}: SafeImageProps) {
  const resolved = resolveMediaUrl(src)?.trim();

  if (!resolved) {
    return null;
  }

  const optimized = optimizeImageUrl(resolved, {
    width: displayWidth,
    quality: 75,
  });

  if (width && height) {
    return (
      <Image
        src={optimized}
        alt={alt}
        width={width}
        height={height}
        fill={false}
        sizes={sizes ?? `${width}px`}
        className={className}
        priority={priority}
        loading={priority ? undefined : "lazy"}
      />
    );
  }

  return (
    <Image
      src={optimized}
      alt={alt}
      fill
      sizes={sizes ?? `(max-width: 768px) 50vw, ${displayWidth}px`}
      className={className}
      priority={priority}
      loading={priority ? undefined : "lazy"}
    />
  );
}
