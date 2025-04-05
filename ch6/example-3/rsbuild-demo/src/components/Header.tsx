import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

// 헤더 컴포넌트
const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">RSBuild 데모</h1>
          <p className="text-muted-foreground text-sm">React를 위한 현대적인 Rust 기반 빌드 도구</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-foreground hover:text-primary transition-colors">
                  홈
                </a>
              </li>
              <li>
                <a href="/features" className="text-foreground hover:text-primary transition-colors">
                  기능
                </a>
              </li>
              <li>
                <a href="/performance" className="text-foreground hover:text-primary transition-colors">
                  성능
                </a>
              </li>
              <li>
                <a href="/css" className="text-foreground hover:text-primary transition-colors">
                  CSS 변환
                </a>
              </li>
              <li>
                <a href="/rocket" className="text-foreground hover:text-primary transition-colors">
                  로켓
                </a>
              </li>
            </ul>
          </nav>
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default Header; 