"use client";

import { useEffect, useState } from "react";
import { fallbackSiteConfig as siteConfig } from "@/lib/site";

const ROTATE_MS = 8000;
const FADE_MS = 1200;

export default function SiteBackground() {
  const images = siteConfig.backgroundImages;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [images]);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % images.length);
    }, ROTATE_MS);

    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="site-backgrounds pointer-events-none fixed inset-0 z-0" aria-hidden>
      {images.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 1 : 0,
            transitionDuration: `${FADE_MS}ms`,
          }}
        />
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/45 via-page-bg/85 to-page-bg" />
    </div>
  );
}
