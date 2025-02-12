import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Use an empty object instead of `true`
    typedRoutes: true, // This is fine
  },
  images: {
    domains: ["yourdomain.com"], // Replace with actual domains if needed
  },
};

export default nextConfig;
