import { useState, useEffect, useMemo, useCallback } from 'react';
import './App.css';
import OptimizedExpensiveList from './components/OptimizedExpensiveList';
import OptimizedSearchFilter from './components/OptimizedSearchFilter';
import OptimizedSummary from './components/OptimizedSummary';

// DataItem 인터페이스 정의
interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

function OptimizedApp() {
  const [data, setData] = useState<DataItem[]>([]);
  const [filter, setFilter] = useState('');
  const [count, setCount] = useState(0);
  
  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    const generateData = () => {
      return Array.from({ length: 1000 }, (_, i) => ({
        id: i,
        name: `항목 ${i}`,
        value: Math.floor(Math.random() * 1000),
        category: ['A', 'B', 'C'][Math.floor(Math.random() * 3)]
      }));
    };
    
    setData(generateData());
  }, []);
  
  // 불필요한 리렌더링을 유발하기 위해 1초마다 카운터 업데이트
  useEffect(() => {
    const timer = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  // useCallback을 사용하여 핸들러 함수 메모이제이션
  const handleFilterChange = useCallback((newFilter: string) => {
    setFilter(newFilter);
  }, []);
  
  // useMemo를 사용하여 필터링된 데이터 메모이제이션
  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(filter.toLowerCase()) ||
      item.category.toLowerCase().includes(filter.toLowerCase())
    );
  }, [data, filter]);
  
  return (
    <div className="app">
      <h1>데이터 대시보드 - 최적화됨 (카운터: {count})</h1>
      <div className="dashboard-container">
        <OptimizedSearchFilter filter={filter} onFilterChange={handleFilterChange} />
        <div className="dashboard-layout">
          <OptimizedExpensiveList data={filteredData} />
          <OptimizedSummary data={filteredData} />
        </div>
      </div>
    </div>
  );
}

export default OptimizedApp; 