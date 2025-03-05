import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {
      bodySizeLimit: undefined,
      allowedOrigins: ["https://www.theinkpotgroup.com/", "http://localhost:3000"]
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
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { 
            key: "Access-Control-Allow-Origin", 
            value: "https://www.theinkpotgroup.com/, http://localhost:3000" 
          },
          { 
            key: "Access-Control-Allow-Methods", 
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT" 
          },
          { 
            key: "Access-Control-Allow-Headers", 
            value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" 
          },
        ],
      },
    ];
  },
};

export default nextConfig;