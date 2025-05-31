import { useState, useTransition } from 'react';
import { fetchQuotesAPI } from '../utils/api';

interface Quote {
  id: string;
  content: string;
}

function QuoteSearch() {
  const [isPending, startTransition] = useTransition();
  const [searchTerm, setSearchTerm] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = () => {
    setError(null); // 이전 에러 메시지 초기화

    // ➊ React 19: startTransition에 async 함수를 직접 전달
    startTransition(async () => {
      try {
        // ➋ isPending은 여기서부터 true가 되어 로딩 UI를 표시함
        console.log('R19 - 트랜지션 시작, isPending:', true); // (실제 isPending 값은 리액트가 관리)
        
        const fetchedQuotes = await fetchQuotesAPI(searchTerm); // 비동기 API 호출
        
        // ➌ 비동기 작업 완료 후 상태 업데이트
        setQuotes(fetchedQuotes);
        
        if (fetchedQuotes.length === 0 && searchTerm !== "" && searchTerm !== "error") {
          setError('검색 결과가 없습니다.');
        }
        // ➍ 이 블록이 끝나고 setQuotes로 인한 렌더링 트랜지션이 완료되면 isPending은 false가 됨
        console.log('R19 - 데이터 처리 완료, 렌더링 후 isPending false 예정');
      } catch (e) {
        console.error('R19 - API 호출 에러:', e);
        setError('데이터를 가져오는 데 실패했습니다.');
        setQuotes([]);
      }
    });
  };

  return (
    <div className="p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">명언 검색 (React 19)</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어 (예: '인내', '시작')"
          className="border p-1 flex-grow rounded-md"
          disabled={isPending}
        />
        <button
          onClick={handleSearch}
          disabled={isPending || !searchTerm}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-300"
        >
          {isPending ? '검색 중...' : '검색'}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {isPending ? (
        <p className="text-sm text-gray-500">명언을 불러오는 중입니다...</p>
      ) : (
        quotes.length > 0 && (
          <ul className="list-disc pl-5 text-sm">
            {quotes.map(quote => (
              <li key={quote.id}>{quote.content}</li>
            ))}
          </ul>
        )
      )}
      <p className="text-xs mt-2 text-gray-400">
        (isPending은 전체 비동기 작업 및 관련 렌더링 동안 true를 유지합니다.)
      </p>
    </div>
  );
}

export default QuoteSearch;