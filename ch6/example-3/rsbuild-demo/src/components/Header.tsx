import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';

const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-primary">RSBuild Demo</h1>
          <p className="text-muted-foreground text-sm">A modern Rust-powered build tool for React</p>
        </div>
        
        <div className="flex items-center space-x-4">
          <nav>
            <ul className="flex space-x-4">
              <li>
                <a href="/" className="text-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/features" className="text-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="/performance" className="text-foreground hover:text-primary transition-colors">
                  Performance
                </a>
              </li>
              <li>
                <a href="/rocket" className="text-foreground hover:text-primary transition-colors">
                  Rocket
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