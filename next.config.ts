import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizeCss: false,
  },
  basePath: process.env.NODE_ENV === 'production' ? '/yehfolio' : '',
};

export default nextConfig;
