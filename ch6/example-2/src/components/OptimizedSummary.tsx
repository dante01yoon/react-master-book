import React, { useMemo } from 'react';

interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface OptimizedSummaryProps {
  data: DataItem[];
}

function OptimizedSummary({ data }: OptimizedSummaryProps) {
  console.log('OptimizedSummary 렌더링 중');
  
  // useMemo를 사용하여 계산된 값 캐싱
  const stats = useMemo(() => {
    console.log('요약 통계 계산 중...');
    
    const totalValue = data.reduce((sum, item) => sum + item.value, 0);
    const avgValue = totalValue / (data.length || 1);
    
    // 단일 루프를 사용한 더 효율적인 카테고리 카운팅
    const categoryCount = { A: 0, B: 0, C: 0 };
    data.forEach(item => {
      categoryCount[item.category as keyof typeof categoryCount]++;
    });
    
    return { totalValue, avgValue, categoryCount };
  }, [data]); // 데이터가 변경될 때만 재계산
  
  return (
    <div className="summary">
      <h2>요약 - 최적화됨</h2>
      <p>총 가치: {stats.totalValue.toFixed(2)}</p>
      <p>평균 가치: {stats.avgValue.toFixed(2)}</p>
      <p>카테고리 A: {stats.categoryCount.A} 항목</p>
      <p>카테고리 B: {stats.categoryCount.B} 항목</p>
      <p>카테고리 C: {stats.categoryCount.C} 항목</p>
    </div>
  );
}

// props가 변경되지 않으면 리렌더링을 방지하기 위해 React.memo 사용
export default React.memo(OptimizedSummary); 