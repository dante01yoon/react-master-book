import React from 'react';

const LazyComponent1 = () => {
  return (
    <div className="lazy-component" style={{ padding: '20px', background: '#f0f8ff', borderRadius: '8px' }}>
      <h3>지연 로딩 컴포넌트 1</h3>
      <p>
        이 컴포넌트는 필요 시에만 로드되었습니다. Vite는 버튼을 클릭하여
        요청했을 때만 이 파일을 변환했습니다.
      </p>
      <p>
        브라우저 개발자 도구의 네트워크 탭에서 이 파일이 초기 페이지 로드 시가 아닌
        버튼을 클릭했을 때만 로드된 것을 확인하세요.
      </p>
      <div style={{ marginTop: '20px', padding: '15px', background: '#e6f7ff', borderRadius: '4px' }}>
        <h4>컴포넌트 정보:</h4>
        <ul>
          <li>컴포넌트 ID: 1</li>
          <li>파일 크기: 작음 (네트워크 탭 확인)</li>
          <li>로드 시간: 빠름 (동적 임포트)</li>
        </ul>
      </div>
    </div>
  );
};

export default LazyComponent1; 