import type { NextConfig } from "next";

function buildImageRemotePatterns() {
  const patterns: NonNullable<NextConfig["images"]>["remotePatterns"] = [
    {
      protocol: "https",
      hostname: "ik.imagekit.io",
      pathname: "/**",
    },
    {
      protocol: "https",
      hostname: "images.unsplash.com",
      pathname: "/**",
    },
  ];

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  if (apiUrl) {
    try {
      const origin = apiUrl.replace(/\/api\/?$/, "");
      const parsed = new URL(origin);

      patterns.push({
        protocol: parsed.protocol.replace(":", "") as "http" | "https",
        hostname: parsed.hostname,
        pathname: "/storage/**",
      });
    } catch {
      // Ignore invalid API URL during build.
    }
  }

  return patterns;
}

const nextConfig: NextConfig = {
  images: {
    remotePatterns: buildImageRemotePatterns(),
    formats: ["image/avif", "image/webp"],
  },
  async redirects() {
    return [
      {
        source: "/dashboard",
        destination: "/admin",
        permanent: true,
      },
      {
        source: "/dashboard/:path*",
        destination: "/admin",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
