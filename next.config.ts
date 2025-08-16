import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
    domains: [
      "reflections-static-assets.s3.amazonaws.com"
    ],
  },
};

export default nextConfig;
