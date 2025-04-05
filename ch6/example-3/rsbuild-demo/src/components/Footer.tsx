import React from 'react';

// 푸터 컴포넌트
const Footer: React.FC = () => {
  return (
    <footer className="bg-muted py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">RSBuild 데모</h3>
            <p className="text-muted-foreground">
              RSBuild의 기능을 현대적인 React 및 Tailwind CSS와 함께 보여주는 데모입니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">자료</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://rsbuild.dev/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  RSBuild 문서
                </a>
              </li>
              <li>
                <a 
                  href="https://tailwindcss.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Tailwind CSS
                </a>
              </li>
              <li>
                <a 
                  href="https://ui.shadcn.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  shadcn/ui 디자인 시스템
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">소개</h3>
            <p className="text-muted-foreground">
              이 데모는 RSBuild, Tailwind CSS 및 shadcn 디자인 시스템을 통합하여 
              테마 지원이 가능한 현대적인 React 애플리케이션을 만드는 방법을 보여줍니다.
            </p>
          </div>
        </div>
        
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} RSBuild 데모. 모든 권리 보유.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 