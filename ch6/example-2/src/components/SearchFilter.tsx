interface SearchFilterProps {
  filter: string;
  onFilterChange: (filter: string) => void;
}

function SearchFilter({ filter, onFilterChange }: SearchFilterProps) {
  console.log('SearchFilter 렌더링 중');
  
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

export default SearchFilter; 