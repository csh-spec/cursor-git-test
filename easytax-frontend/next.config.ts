import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  distDir: 'out',
  images: {
    unoptimized: true
  },
  // 한글 인코딩 설정
  experimental: {
    esmExternals: false,
  },
  // 컴파일러 설정
  compiler: {
    removeConsole: false,
  },
  // GitHub Pages 경로 설정 제거 (루트에서 호스팅)
  // assetPrefix: process.env.NODE_ENV === 'production' ? '/cursor-git-test' : '',
  // basePath: process.env.NODE_ENV === 'production' ? '/cursor-git-test' : ''
};

export default nextConfig;
