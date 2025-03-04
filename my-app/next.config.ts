import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      // You can add configuration options here if needed
      // For example:
      // bodySizeLimit: '2mb',
      // allowedOrigins: ['https://example.com']
    },
    typedRoutes: true,
  },
  images: {
    domains: ["theinkpotgroup.com"],
  },
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
};

export default nextConfig;