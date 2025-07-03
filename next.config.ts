import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // React의 잠재적 문제 사전 감지
  reactStrictMode: true,

  // 이미지 외부 도메인 허용 (Firebase Storage 등)
  images: {
    domains: ['firebasestorage.googleapis.com'],
  },
};

export default nextConfig;