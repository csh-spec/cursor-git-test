import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // GitHub Pages 경로 설정
  assetPrefix: process.env.NODE_ENV === 'production' ? '/cursor-git-test' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/cursor-git-test' : '',
  // 한글 인코딩 설정
  experimental: {
    esmExternals: false,
  },
  // 컴파일러 설정
  compiler: {
    removeConsole: false,
  }
};

export default nextConfig;
