import { useState, useTransition as useTransition_R18 } from 'react'; // 별칭 사용
import { fetchQuotesAPI } from '../utils/api';

interface Quote {
  id: string;
  content: string;
}

function QuoteSearchReact18() {
  // ➊ isPendingR18은 setQuotes 트랜지션 동안만 true가 됨
  const [isPendingR18, startTransitionR18] = useTransition_R18(); 
  // ➋ API 호출 전체 과정을 위한 수동 로딩 상태
  const [isLoadingManually, setIsLoadingManually] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async () => { // ➌ 함수 자체는 async
    setError(null);
    setIsLoadingManually(true); // ➍ 비동기 작업 시작 전 수동 로딩 true
    console.log('R18 - 수동 로딩 시작');

    try {
       // ➎ 비동기 API 호출 먼저 수행
      const fetchedQuotes = await fetchQuotesAPI(searchTerm);

      // ➏ 비동기 작업 완료 후, 동기적인 상태 업데이트만 트랜지션으로 감쌈
      startTransitionR18(() => {
        setQuotes(fetchedQuotes);
        console.log('R18 - setQuotes 트랜지션 시작');
      });
       if (fetchedQuotes.length === 0 && searchTerm !== "" && searchTerm !== "error") {
        setError('검색 결과가 없습니다.');
      }
    } catch (e) {
      console.error('R18 - API 호출 에러:', e);
      setError('데이터를 가져오는 데 실패했습니다.');
      setQuotes([]);
    } finally {
      setIsLoadingManually(false); // ➐ 비동기 작업 완료 후 수동 로딩 false
      console.log('R18 - 수동 로딩 종료');
    }
  };

  return (
    <div className="p-4 border rounded-md mt-4">
      <h3 className="text-lg font-semibold mb-2">명언 검색 (React 18 방식)</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어 (예: '인내', '시작')"
          className="border p-1 flex-grow rounded-md"
          disabled={isLoadingManually}
        />
        <button
          onClick={handleSearch}
          disabled={isLoadingManually || !searchTerm}
          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-300"
        >
          {/* ➑ 로딩 표시는 isPendingR18과 isLoadingManually를 함께 고려해야 함 */}
          {isLoadingManually ? '검색 중...' : '검색'}
        </button>
      </div>

      {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

      {(isLoadingManually || isPendingR18) ? (
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
        (isPendingR18은 setQuotes의 짧은 동기적 트랜지션에만 해당하며, isLoadingManually로 전체 과정을 관리합니다.)
      </p>
    </div>
  );
}

export default QuoteSearchReact18;