import DataFetcher from "./DataFetcher";

// ➊ 중간 컴포넌트: children을 함수로 호출하여 내부 컨텐츠를 렌더링
const IntermediateComponent = ({ children }) => (
  <div className="intermediate-wrapper" style={{ border: '1px dashed gray', padding: '10px', margin: '10px 0' }}>
    <p style={{ fontWeight: 'bold', color: 'gray' }}>중간 컴포넌트 영역</p>
    {children()} {/* children으로 전달된 함수를 호출 */}
  </div>
);

// 데이터를 실제로 표시하는 컴포넌트
const DisplayDataComponent = ({ loading, error, data }) => {
  if (loading) {
    return <div className="loading">데이터 로딩 중...</div>;
  }
  if (error) {
    return <div className="error">에러 발생: {error.message}</div>;
  }
  return (
    <div className="data-display">
      <h4>가져온 데이터 목록:</h4>
      <ul>
        {Array.isArray(data) ? data.map((item, index) => (
          <li key={index}>{item}</li>
        )) : <li>데이터가 없습니다.</li>}
      </ul>
    </div>
  );
};

// 앱 컴포넌트
const AppWithIntermediateRenderProps = () => (
  <DataFetcher url="https://api.example.com/gadgets">
    {/* ➋ DataFetcher가 제공하는 상태 객체 (loading, error, data) */}
    {( { loading, error, data } ) => (
      <IntermediateComponent>
        {/* ➌ IntermediateComponent의 children으로 전달되는 함수.
            이 함수는 DisplayDataComponent를 렌더링하며,
            DataFetcher의 상태를 명시적으로 DisplayDataComponent의 props로 전달해야 함 */}
        {() => (
          <DisplayDataComponent
            loading={loading}
            error={error}
            data={data}
          />
        )}
      </IntermediateComponent>
    )}
  </DataFetcher>
);