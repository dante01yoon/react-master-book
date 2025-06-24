'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Users,
  Film,
  Dices,
  TestTube,
  BookCopy,
  FileText,
} from 'lucide-react';

interface SidebarProps {
  isSidebarOpen: boolean;
}

const navLinks = [
  { href: '/characters', label: '캐릭터', icon: Users },
  { href: '/characters/1/episode', label: '에피소드', icon: Film },
  { href: '/episodes/1', label: '게시판', icon: FileText },
  { href: '/client-component-test', label: '클라이언트 테스트', icon: TestTube },
  { href: '/rerender-test', label: '리렌더 테스트', icon: BookCopy },
  { href: '/markdown', label: '마크다운', icon: FileText },
  { href: '/dynamic-render', label: '동적 렌더', icon: Dices },
];

export default function Sidebar({ isSidebarOpen }: SidebarProps) {
  const pathname = usePathname();

  return (
    <aside
      className={cn(
        'fixed inset-y-0 left-0 z-20 flex h-full flex-col border-r bg-background transition-all duration-300 ease-in-out',
        isSidebarOpen ? 'w-60' : 'w-16'
      )}
    >
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/characters" className="flex items-center gap-2 font-semibold">
          <Film className="h-6 w-6" />
          {isSidebarOpen && <span className="">Rick & Morty</span>}
        </Link>
      </div>
      <nav className="flex flex-col gap-2 p-2">
        {navLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary',
              {
                'bg-muted text-primary': pathname.startsWith(
                  href.split('/')[1]
                ),
              },
              !isSidebarOpen && 'justify-center'
            )}
          >
            <Icon className="h-5 w-5" />
            {isSidebarOpen && <span className="truncate">{label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 