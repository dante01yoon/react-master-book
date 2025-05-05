import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx' // 기존 App 임포트 주석 처리
// import StarRating from './StarRating.tsx' // 기존 StarRating 임포트 주석 처리
import CustomElementExample from './CustomElementExample.tsx' // 새로운 예제 컴포넌트 임포트
import './star-rating';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <StarRating /> */}
    <CustomElementExample /> {/* 새로운 예제 컴포넌트 렌더링 */}
  </React.StrictMode>,
) 