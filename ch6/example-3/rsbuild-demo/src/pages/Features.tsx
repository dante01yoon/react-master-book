import React from 'react';

// 기능 페이지 컴포넌트
const Features: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-primary">기능</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FeatureCard 
          title="Rust 기반 성능" 
          description="RSBuild의 Rust 기반 아키텍처로 초고속 빌드 경험"
        />
        <FeatureCard 
          title="제로 설정" 
          description="React 프로젝트를 위한 합리적인 기본값으로 바로 사용 가능"
        />
        <FeatureCard 
          title="현대적인 테마" 
          description="CSS 변수와 shadcn 기반 디자인 시스템을 활용한 다양한 테마"
        />
        <FeatureCard 
          title="Tailwind 통합" 
          description="빠른 UI 개발을 위한 Tailwind CSS와의 원활한 통합"
        />
      </div>
    </div>
  );
};

// 기능 카드 프롭스 인터페이스
interface FeatureCardProps {
  title: string;
  description: string;
}

// 기능 카드 컴포넌트
const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="bg-card rounded-lg p-6 shadow-sm border border-border">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default Features; 