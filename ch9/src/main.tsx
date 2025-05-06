import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx' // 기존 App 임포트 주석 처리
import App from './state/UnidirectionalDataFlowExample';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    <App /> {/* 새로운 예제 컴포넌트 렌더링 */}
  </React.StrictMode>
) 