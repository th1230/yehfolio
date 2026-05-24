import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  devIndicators: false,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  basePath: '',
};

export default nextConfig;
