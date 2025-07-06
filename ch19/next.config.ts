import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      new URL('https://images.unsplash.com/*'),
      new URL('https://rickandmortyapi.com/api/character/avatar/*'),
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '3mb', // 기본 설정 값은 1mb
    }
  }
};

export default nextConfig;
