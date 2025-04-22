import React from 'react';
import ReactDOM from 'react-dom/client';
import { html } from 'htm/react';
import App from './htm-example.jsx';

// htm을 이용한 메인 렌더링
ReactDOM.createRoot(document.getElementById('root')).render(
  html`<${App} />`
);

// JSX를 사용했다면 다음과 같이 작성했을 것입니다:
// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// ); 