import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx' // 기존 App 임포트 주석 처리
import App from './slot-props/ConfigurableModal';
import UnidirectionalDataFlow from './state/UnidirectionalDataFlow';
import FlushSyncExample from './batching/FlushSyncExample';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FlushSyncExample />
  </React.StrictMode>
) 