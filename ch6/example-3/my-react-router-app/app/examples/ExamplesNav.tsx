import { Link } from "react-router";

/**
 * 예제를 위한 탐색 컴포넌트
 */
export default function ExamplesNav() {
  return (
    <nav className="examples-nav">
      <h1 className="text-2xl font-bold mb-6 text-center">React Router 예제</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="category-section">
          <h2 className="text-xl font-semibold mb-3 pb-2 border-b">데이터 가져오기</h2>
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Link to="/data-fetching/basic" className="block">
                <span className="font-medium">기본 로더</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">로더를 사용한 간단한 데이터 로딩</p>
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Link to="/data-fetching/parallel" className="block">
                <span className="font-medium">병렬 데이터 가져오기</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">여러 리소스를 동시에 로딩하기</p>
              </Link>
            </li>
          </ul>
        </div>
        
        <div className="category-section">
          <h2 className="text-xl font-semibold mb-3 pb-2 border-b">고급 기능</h2>
          <ul className="space-y-2">
            <li className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
              <Link to="/advanced/form-actions" className="block">
                <span className="font-medium">폼 액션</span>
                <p className="text-sm text-gray-600 dark:text-gray-300">폼 제출 및 데이터 변경 처리하기</p>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="mt-8 text-center">
        <Link to="/" className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300">
          홈으로 돌아가기
        </Link>
      </div>
    </nav>
  );
} 