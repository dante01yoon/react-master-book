import type { Metadata } from 'next';
import Navigation from '@/components/Navigation';
import './globals.css';

export const metadata: Metadata = {
  title: '리액트 서버 컴포넌트 예제',
  description: 'Next.js 앱 라우터를 이용한 서버 컴포넌트 예제입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <script
          crossOrigin="anonymous"
          src="https://unpkg.com/react-scan/dist/auto.global.js"
        />
      </head>
      <body className="bg-gray-50">
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  );
}
