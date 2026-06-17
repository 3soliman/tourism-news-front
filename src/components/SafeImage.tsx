type SafeImageProps = {
  src?: string | null;
  alt: string;
  className?: string;
};

export default function SafeImage({ src, alt, className }: SafeImageProps) {
  const resolved = src?.trim();

  if (!resolved) {
    return null;
  }

  return <img src={resolved} alt={alt} className={className} />;
}
