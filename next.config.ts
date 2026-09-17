import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep a running dev server separate from production export artifacts.
  distDir: process.env.NODE_ENV === 'development' ? '.next-dev' : '.next',
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
