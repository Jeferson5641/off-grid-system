import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  basePath: '/off-grid-system',
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
