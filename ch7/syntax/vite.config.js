import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // Vite 플러그인 설정
    // JSX 트랜스파일 지원을 위한 React 플러그인 추가
    react(),
  ],
  server: {
    // 개발 서버 포트 설정
    port: 3000,
    // 자동으로 브라우저 열기
    open: true,
  },
}); 