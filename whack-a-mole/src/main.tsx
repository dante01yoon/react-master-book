import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { StrictMode } from 'react';
import { scan } from "react-scan";
import MemoChildrenDemo from './react-memo/memo-caveat.tsx';

scan({
  enabled: true,
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MemoChildrenDemo />
  </StrictMode>
);
