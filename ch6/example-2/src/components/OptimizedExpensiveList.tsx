import React, { useMemo } from 'react';

interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface OptimizedExpensiveListProps {
  data: DataItem[];
}

function OptimizedExpensiveList({ data }: OptimizedExpensiveListProps) {
  console.log('OptimizedExpensiveList 렌더링 중');
  
  // useMemo를 사용하여 모든 렌더링마다 재계산하는 것을 방지
  const processedItems = useMemo(() => {
    console.log('비용이 많이 드는 계산 처리 중...');
    
    return data.map(item => {
      // 여전히 비용이 많이 드는 작업을 시뮬레이션하지만, 이제는 데이터가 변경될 때만 발생
      const start = performance.now();
      while (performance.now() - start < 0.1) {
        // 의도적으로 CPU 점유
      }
      
      return {
        ...item,
        processedValue: item.value * 1.5
      };
    });
  }, [data]); // 데이터가 변경될 때만 재계산
  
  return (
    <div className="list-container">
      <h2>데이터 목록 - 최적화됨 ({data.length} 항목)</h2>
      <ul>
        {processedItems.map(item => (
          <li key={item.id}>
            {item.name} - {item.category} - {item.processedValue.toFixed(2)}
          </li>
        ))}
      </ul>
    </div>
  );
}

// props가 변경되지 않으면 리렌더링을 방지하기 위해 React.memo 사용
export default React.memo(OptimizedExpensiveList); 