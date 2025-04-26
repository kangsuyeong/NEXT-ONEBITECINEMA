/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // 빌드 시 ESLint 에러가 있어도 계속 빌드되게 설정
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
