import type { NextConfig } from "next";

// Se o build estiver rodando na Vercel, a Vercel injeta process.env.VERCEL = '1'
// Se for dev local (yarn dev), NODE_ENV é 'development'
// Se for o build manual para a pasta docs/, NODE_ENV é 'production' e VERCEL é undefined.
const isGithubPages = process.env.NODE_ENV === 'production' && process.env.VERCEL !== '1';

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  basePath: isGithubPages ? "/off-grid-system" : undefined,
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
