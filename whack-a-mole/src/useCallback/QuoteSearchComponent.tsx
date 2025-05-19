import { useState, useCallback, SyntheticEvent, memo } from 'react';
import { debounce } from 'lodash-es'; // ➊ lodash-es에서 debounce 함수를 가져옴

// API 응답 결과의 타입을 정의함
interface Quote {
  _id: string;
  content: string;
  author: string;
  tags: string[];
  dateAdded: string;
  dateModified: string;
}

// ➋ 명언 카드 컴포넌트 정의
// quote 객체를 받아 화면에 표시함
interface QuoteCardProps {
  quote: Quote;
}

const QuoteCard = ({ quote }: QuoteCardProps) => (
  <div className="bg-white shadow-md rounded-lg p-6 mb-4">
    <blockquote className="text-lg font-semibold mb-2">"{quote.content}"</blockquote>
    <p className="text-gray-600 mb-2">- {quote.author}</p>
    <div className="flex flex-wrap gap-2 mb-2">
      {quote.tags.map((tag) => (
        <span key={tag} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
          {tag}
        </span>
      ))}
    </div>
    <div className="text-sm text-gray-500">
      <p>Added: {quote.dateAdded}</p>
      <p>Modified: {quote.dateModified}</p>
    </div>
  </div>
);
QuoteCard.displayName = 'QuoteCard';

// ➌ 명언 리스트 컴포넌트 정의
// quotes 배열을 받아 여러 개의 QuoteCard를 렌더링함
interface QuoteListProps {
  quotes: Quote[];
}

const QuoteList = ({ quotes }: QuoteListProps) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">명언 검색하기</h1>
    {quotes.length === 0 && <p>검색 결과가 없습니다.</p>}
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {quotes.map((quote) => (
        <QuoteCard key={quote._id} quote={quote} />
      ))}
    </div>
  </div>
);
QuoteList.displayName = 'QuoteList';

// ➍ React.memo를 사용하여 QuoteList 컴포넌트를 메모이제이션함
// quotes prop이 변경되지 않으면 불필요한 리렌더링을 방지함
const MemoizedQuoteList = memo(QuoteList);
MemoizedQuoteList.displayName = 'MemoizedQuoteList';

// 명언 검색 기능을 제공하는 메인 컴포넌트
const QuoteSearchComponent = () => {
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태
  const [results, setResults] = useState<Quote[]>([]); // 검색 결과 상태 (API 응답 타입으로 명시)

  // ➎ debouncedSearch 함수를 useCallback으로 메모이제이션함
  // 의존성 배열이 비어 있으므로, 이 함수는 컴포넌트 최초 렌더링 시에만 생성됨
  // 디바운스 기능을 통해 API 호출 빈도를 제어함
  const debouncedSearch = useCallback(
    debounce(async (query: string) => {
      if (query.trim() === '') { // 빈 문자열 검색 방지
        setResults([]);
        return;
      }
      try {
        const response = await fetch(`https://api.quotable.io/search/quotes?query=${encodeURIComponent(query)}`);
        if (response.ok) {
          const data = await response.json();
          // API 응답 구조에 맞게 results를 가져옴 (quotable.io는 results 필드에 배열을 담아줌)
          setResults(data.results || []); 
        } else {
          console.error('API 에러:', response.statusText);
          setResults([]);
        }
      } catch (error) {
        console.error('네트워크 또는 API 호출 에러:', error);
        setResults([]);
      }
    }, 300), // 300ms 디바운스 시간 설정
    [] // 의존성 배열: setResults는 React에 의해 참조 안정성이 보장되므로 포함하지 않아도 됨
  );

  // ➏ handleChange 함수를 useCallback으로 메모이제이션함
  // 입력 값이 변경될 때마다 searchTerm 상태를 업데이트하고, debouncedSearch 함수를 호출함
  const handleChange = useCallback(
    (e: SyntheticEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;
      setSearchTerm(value);
      debouncedSearch(value);
    },
    [debouncedSearch] // 의존성 배열: debouncedSearch 함수가 변경될 경우에만 이 함수를 재생성함
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ marginBottom: '15px' }}>명언 검색 (useCallback + debounce)</h2>
      {/* ➐ 검색어 입력 필드 */}
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        placeholder="검색어를 입력하세요..."
        style={{ 
          width: '100%', 
          padding: '10px', 
          marginBottom: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}
      />
      {/* ➑ 메모이제이션된 명언 리스트 컴포넌트에 검색 결과를 전달함 */}
      <MemoizedQuoteList quotes={results} />
    </div>
  );
};

export default QuoteSearchComponent; 