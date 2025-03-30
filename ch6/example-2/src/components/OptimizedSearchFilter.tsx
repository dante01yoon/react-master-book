interface OptimizedSearchFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

function OptimizedSearchFilter({ filter, onFilterChange }: OptimizedSearchFilterProps) {
  console.log('OptimizedSearchFilter 렌더링 중');
  
  return (
    <div className="filter">
      <input
        type="text"
        value={filter}
        onChange={(e) => onFilterChange(e.target.value)}
        placeholder="검색어 입력..."
      />
    </div>
  );
}

// props가 변경되지 않으면 리렌더링을 방지하기 위해 React.memo 사용
export default React.memo(OptimizedSearchFilter); 