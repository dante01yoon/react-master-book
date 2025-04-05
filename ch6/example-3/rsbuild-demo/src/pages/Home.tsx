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
    </div>
  );
};

export default Home; 