import type { Metadata } from "next";
import { Geist } from 'next/font/google'
// import localFont from "next/font/local";
// ➊ 전역 스타일시트 임포트
import "./globals.css";
import { cn } from "@/lib/utils"
import { Inter } from 'next/font/google'
import MainLayout from '@/components/layout/MainLayout';
const inter = Inter({ subsets: ['latin'] })

const geist = Geist({
  subsets: ['latin'],
})

// ➋ next/font/local을 사용한 로컬 폰트 설정
// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// ➌ 페이지 메타데이터 설정
export const metadata: Metadata = {
  title: {
    template: '%s | Rick and Morty',
    default: 'Rick and Morty',
  },
  description: 'Explore characters from Rick and Morty',
  keywords: ['Rick and Morty', 'Characters', 'Explore', 'Next.js', 'Tailwind CSS', 'Shadcn UI'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, geist.className)}>
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}