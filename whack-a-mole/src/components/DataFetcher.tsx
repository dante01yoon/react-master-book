import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback, useMemo } from 'react';

// ➊ 데이터 컨텍스트 타입 정의
interface DataContextType<T = any> {
  loading: boolean;
  error: Error | null;
  data: T | null;
  refetch: () => void; // 데이터 재요청 함수 추가 (선택 사항)
}

// ➋ 데이터 컨텍스트 생성 (초기값은 undefined로 설정하여 Provider 외부 사용 시 에러 발생 유도)
// 실제 사용 시에는 초기값을 명확히 하거나, null 체크를 철저히 해야 함
const DataContext = createContext<DataContextType | undefined>(undefined);

// ➌ DataProvider Props 정의
interface DataProviderProps {
  url: string;
  children: ReactNode;
}

// ➍ DataProvider 컴포넌트: 데이터 가져오기 로직과 컨텍스트 제공
const DataProvider: React.FC<DataProviderProps> = ({ url, children }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [data, setData] = useState<any | null>(null); // 실제 데이터 타입에 맞게 제네릭 사용 가능

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (url.includes("error")) {
        throw new Error("데이터를 가져오는데 실패했습니다. (컨텍스트)");
      }
      const mockData = url.includes("widgets")
        ? ['위젯 A', '위젯 B', '위젯 C (컨텍스트)']
        : ['알 수 없는 위젯'];
      setData(mockData);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
      setData(null);
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const contextValue = useMemo(() => ({
    loading,
    error,
    data,
    refetch: fetchData
  }), [loading, error, data, fetchData]);

  return (
    // React 19 이전: <DataContext.Provider value={contextValue}>
    <DataContext value={contextValue}>
      {children}
    </DataContext>
  );
};

// ➎ useData 커스텀 훅: 컨텍스트를 쉽게 사용하기 위한 훅
function useData<T = any>() {
  const context = useContext(DataContext as React.Context<DataContextType<T> | undefined>);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}

// 중간 컴포넌트: 이제 props를 전달할 필요 없이 children만 렌더링
const IntermediateComponentWithContext = ({ children }) => (
  <div className="intermediate-wrapper" style={{ border: '1px solid green', padding: '10px', margin: '10px 0' }}>
    <p style={{ fontWeight: 'bold', color: 'green' }}>중간 컴포넌트 영역 (컨텍스트 사용)</p>
    {children} {/* 일반적인 ReactNode로 children 처리 */}
  </div>
);

// 데이터를 실제로 표시하는 컴포넌트 (컨텍스트 사용)
const DisplayDataComponentWithContext = () => {
  const { loading, error, data, refetch } = useData<string[]>(); // useData 훅으로 상태 직접 접근

  if (loading) {
    return <div className="loading">컨텍스트: 데이터 로딩 중...</div>;
  }
  if (error) {
    return <div className="error">컨텍스트: 에러 발생 - {error.message} <button onClick={refetch}>재시도</button></div>;
  }
  return (
    <div className="data-display">
      <h4>컨텍스트로 가져온 데이터 목록:</h4>
      <ul>
        {Array.isArray(data) ? data.map((item, index) => (
          <li key={index}>{item}</li>
        )) : <li>데이터가 없습니다.</li>}
      </ul>
      <button onClick={refetch}>목록 새로고침</button>
    </div>
  );
};

// 앱 컴포넌트 (컨텍스트 사용)
const AppWithIntermediateContext = () => (
  <DataProvider url="https://api.example.com/widgets">
    <IntermediateComponentWithContext>
      <DisplayDataComponentWithContext />
    </IntermediateComponentWithContext>
  </DataProvider>
);

export default AppWithIntermediateContext;

// 만약 다른 URL로 다른 데이터를 가져와야 한다면,
// DataProvider를 여러 번 사용하거나,
// DataProvider 내부에서 여러 URL을 관리하는 로직을 추가할 수 있습니다.
// 예:
// const AnotherApp = () => (
//   <>
//     <DataProvider url="https://api.example.com/rabbits">
//       <RabbitListWithContext />
//     </DataProvider>
//     <DataProvider url="https://api.example.com/dogs">
//       {/* <DogListWithContext /> 와 같이 다른 컴포넌트 사용 */}
//     </DataProvider>
//   </>
// )