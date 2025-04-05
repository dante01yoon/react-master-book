import React from 'react';
import { Link } from 'react-router-dom';

// 페이지를 찾을 수 없음 컴포넌트
const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-4xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-2xl mb-6">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-8">
        찾으시는 페이지가 존재하지 않거나 이동되었습니다.
      </p>
      <Link to="/" className="btn">
        홈으로 돌아가기
      </Link>
    </div>
  );
};

export default NotFound; 