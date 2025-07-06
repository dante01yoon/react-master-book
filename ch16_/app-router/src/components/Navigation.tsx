'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

// 내비게이션에 표시할 링크 목록
const navLinks = [
  { href: '/', label: 'Home (DB Fetch)' },
  { href: '/markdown', label: 'Markdown (Bundle Size)' },
  { href: '/rerender-test', label: '리렌더링 테스트' },
  { href: '/client-component-test', label: '클라이언트 컴포넌트' },
  { href: '/characters', label: '스트리밍 (use)' },
];

/**
 * 모든 페이지에 공통으로 표시될 내비게이션 바
 */
export default function Navigation() {
  // usePathname 훅을 사용해 현재 URL 경로를 가져옴
  const pathname = usePathname();

  return (
    <header className="bg-gray-800 p-4 sticky top-0 z-10 shadow-md">
      <nav className="container mx-auto">
        <ul className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`
                  text-lg
                  transition-colors 
                  ${
                    // 현재 경로와 링크의 경로가 일치하면 활성화 스타일을 적용함
                    pathname === link.href
                      ? 'text-yellow-400 font-bold'
                      : 'text-white hover:text-yellow-300'
                  }
                `}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
} 