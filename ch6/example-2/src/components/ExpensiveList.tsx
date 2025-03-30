import React from 'react';

interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface ExpensiveListProps {
  data: DataItem[];
}

function ExpensiveList({ data }: ExpensiveListProps) {
  console.log('ExpensiveList 렌더링 중');
  
  // 무거운 계산 시뮬레이션
  const processedItems = data.map(item => {
    // 인위적인 성능 병목 현상
    const start = performance.now();
    while (performance.now() - start < 0.1) {
      // 의도적으로 CPU 점유
    }
    
    return {
      ...item,
      processedValue: item.value * 1.5
    };
  });
  
  return (
    <div className="list-container">
      <h2>데이터 목록 ({data.length} 항목)</h2>
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

export default ExpensiveList; 