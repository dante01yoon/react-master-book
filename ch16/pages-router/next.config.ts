import configureBundleAnalyzer from '@next/bundle-analyzer';

// @next/bundle-analyzer를 설정
// `enabled` 옵션을 통해 `ANALYZE` 환경 변수가 'true'일 때만 번들 분석기가 동작
const withBundleAnalyzer = configureBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  // 분석 결과를 브라우저에서 자동으로 열지 여부 (기본값: true)
  openAnalyzer: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // React Strict Mode를 활성화하여 개발 중 잠재적 문제 감지
  reactStrictMode: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  // ➊ 분석 환경일 때만 프로덕션 소스맵을 생성
  // 소스맵은 디버깅을 위해 난독화된 코드를 원본 코드와 매핑
  // 실제 배포 시에는 보안상 소스맵을 제외해야 함
  productionBrowserSourceMaps: process.env.ANALYZE === 'true',
};

// withBundleAnalyzer로 nextConfig를 감싸 번들 분석 기능을 활성화
export default withBundleAnalyzer(nextConfig);