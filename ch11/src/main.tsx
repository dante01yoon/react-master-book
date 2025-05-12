import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App';
import App from './class-component/WindowSizeTracker'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App /> {/* 새로운 예제 컴포넌트 렌더링 */}
  </React.StrictMode>
) 