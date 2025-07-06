import { hydrateRoot } from "react-dom/client";
import { StrictMode } from "react";
import App from "./components/App";

// 1. 서버에서 스트리밍 될 데이터를 받기 위한 프로미스
const promise = new Promise((resolve) => {
  // 2. window.setPromise가 호출되면 프로미스를 resolve
  if(typeof window !== 'undefined') {
    window.setPromise = (backfillPromise) => resolve(backfillPromise);
  }
});

hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    {/* 3. App 컴포넌트에 동일한 프로미스 전달 */}
    <App promise={promise} />
  </StrictMode>
); 