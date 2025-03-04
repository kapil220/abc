import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {}, // Ensure it's properly configured
    typedRoutes: true,
  },
  images: {
    domains: ["theinkpotgroup.com"], // Add any domains your images load from
  },
  // Ensure Next.js API routes work in deployment
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;
