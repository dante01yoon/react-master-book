import React from 'react';

// 홈 페이지 컴포넌트
const Home: React.FC = () => {
  return (
    <div className="space-y-6">
      <section className="bg-card rounded-lg p-6 shadow-sm">
        <h1 className="text-3xl font-bold text-primary mb-4">RSBuild 데모에 오신 것을 환영합니다</h1>
        <p className="text-muted-foreground">
          RSBuild와 React, Tailwind CSS, 그리고 shadcn 디자인 시스템의 데모입니다.
        </p>
      </section>
      
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">시작하기</h2>
        <p>
          네비게이션 메뉴를 통해 RSBuild의 다양한 기능을 살펴보세요.
        </p>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">테마 시스템</h3>
          <p className="text-muted-foreground mb-4">
            shadcn/ui에서 영감을 받은 테마 시스템으로 다크 모드와 다양한 컬러 테마를 지원합니다.
          </p>
          <a href="/features" className="text-primary hover:underline">자세히 보기 →</a>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">CSS 변환</h3>
          <p className="text-muted-foreground mb-4">
            Lightning CSS와 Browserslist를 사용하여 최신 CSS 문법을 모든 브라우저에서 동작하도록 변환합니다.
          </p>
          <a href="/css" className="text-primary hover:underline">자세히 보기 →</a>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">성능 비교</h3>
          <p className="text-muted-foreground mb-4">
            RSBuild와 타 빌드 도구 간의 성능 비교를 확인하세요.
          </p>
          <a href="/performance" className="text-primary hover:underline">자세히 보기 →</a>
        </div>
        
        <div className="bg-card rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">인터랙티브 데모</h3>
          <p className="text-muted-foreground mb-4">
            캔버스를 사용한 로켓 애니메이션 인터랙티브 데모를 체험해보세요.
          </p>
          <a href="/rocket" className="text-primary hover:underline">자세히 보기 →</a>
        </div>
      </section>
    </div>
  );
};

export default Home; 