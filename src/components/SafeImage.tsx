import Image from "next/image";
import { isNextImageUrl, optimizeImageUrl } from "@/lib/optimize-image";
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

function FallbackImage({
  src,
  alt,
  className,
  width,
  height,
  fill = true,
  priority = false,
}: Pick<
  SafeImageProps,
  "src" | "alt" | "className" | "width" | "height" | "fill" | "priority"
> & { src: string }) {
  const loading = priority ? "eager" : "lazy";

  if (width && height) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        loading={loading}
        decoding="async"
      />
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={
        fill
          ? `absolute inset-0 h-full w-full ${className ?? ""}`
          : className
      }
      loading={loading}
      decoding="async"
    />
  );
}

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

  if (!isNextImageUrl(optimized)) {
    return (
      <FallbackImage
        src={optimized}
        alt={alt}
        className={className}
        width={width}
        height={height}
        fill={fill}
        priority={priority}
      />
    );
  }

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
