interface DataItem {
  id: number;
  name: string;
  value: number;
  category: string;
}

interface SummaryProps {
  data: DataItem[];
}

function Summary({ data }: SummaryProps) {
  console.log('Summary 렌더링 중');
  
  // 매 렌더링마다 통계 계산 (비효율적)
  const totalValue = data.reduce((sum, item) => sum + item.value, 0);
  const avgValue = totalValue / (data.length || 1);
  const categoryCount = {
    A: data.filter(item => item.category === 'A').length,
    B: data.filter(item => item.category === 'B').length,
    C: data.filter(item => item.category === 'C').length
  };
  
  return (
    <div className="summary">
      <h2>요약</h2>
      <p>총 가치: {totalValue.toFixed(2)}</p>
      <p>평균 가치: {avgValue.toFixed(2)}</p>
      <p>카테고리 A: {categoryCount.A} 항목</p>
      <p>카테고리 B: {categoryCount.B} 항목</p>
      <p>카테고리 C: {categoryCount.C} 항목</p>
    </div>
  );
}

export default Summary; 