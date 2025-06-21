import Counter from '@/components/Counter';
import ServerTime from '@/components/ServerTime';

/**
 * 서버 컴포넌트의 리렌더링 동작을 테스트하는 페이지
 */
export default function RerenderTestPage() {
  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">
        서버 컴포넌트 리렌더링 테스트
      </h1>
      <p className="text-center mb-8 max-w-2xl mx-auto">
        아래 '카운트 증가' 버튼을 클릭하면, 파란색 테두리의 클라이언트 컴포넌트만
        리렌더링되고, 회색 점선 테두리의 서버 컴포넌트는 리렌더링되지 않습니다.
        서버 컴포넌트의 시간 표시가 변하지 않는 것을 확인해 보세요.
      </p>

      {/* 
        클라이언트 컴포넌트인 Counter에 
        서버 컴포넌트인 ServerTime을 자식(children)으로 전달함
      */}
      <Counter>
        <ServerTime />
      </Counter>
    </main>
  );
} 