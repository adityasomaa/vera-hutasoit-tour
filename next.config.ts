import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Resize at the Pexels CDN instead of /_next/image. The hosted optimizer
    // is quota-limited and answers 402 once the quota is gone, which would
    // break every photograph on the site.
    loader: "custom",
    loaderFile: "./src/lib/pexelsLoader.ts",
    // Stop at 1920. On these originals 2048 costs 1 MB and 3840 costs 3.3 MB,
    // for no visible gain on a photograph behind text.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920],
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
