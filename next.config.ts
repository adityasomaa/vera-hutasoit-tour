import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Resize at the Pexels CDN instead of /_next/image. The hosted optimizer
    // is quota-limited and answers 402 once the quota is gone, which would
    // break every photograph on the site.
    loader: "custom",
    loaderFile: "./src/lib/pexelsLoader.ts",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        pathname: "/photos/**",
      },
    ],
  },
};

export default nextConfig;
