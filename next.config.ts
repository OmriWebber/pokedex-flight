import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    domains: ['raw.githubusercontent.com'],
  },
};

export default nextConfig;
