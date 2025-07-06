'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import Header from '@/components/layout/Header';
import { cn } from '@/lib/utils';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div
        className={cn(
          'flex flex-col transition-all duration-300 ease-in-out',
          isSidebarOpen ? 'pl-60' : 'pl-16'
        )}
      >
        <Header onMenuClick={toggleSidebar} />
        <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
} 