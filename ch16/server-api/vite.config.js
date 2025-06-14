import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server.js에서 HTTP 서버를 직접 제어하므로,
  // Vite를 미들웨어 모드로 설정함
  server: {
    middlewareMode: true,
  },
  // appType을 'custom'으로 설정하여
  // Vite가 기본 HTML 처리 로직을 비활성화하도록 함
  appType: 'custom',
}) 