import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import App, { HeavyListPage } from "./components/App";

/**
 * 서버 렌더링을 수행하는 함수
 * @returns {Promise<{appHtml: string, jsonData: any}>}
 */
export const render = async () => {
  console.log('[SERVER] entry-server: render 함수 실행');
  
  // 1. 컴포넌트에 정의된 데이터 페칭 함수를 호출하여 데이터를 가져옵니다.
  const jsonData = await HeavyListPage.danteServerSideProps();
  console.log('[SERVER] entry-server: 데이터 페칭 완료');

  // 2. 데이터를 props로 전달하여 앱 컴포넌트를 HTML 문자열로 렌더링합니다.
  const appHtml = renderToString(
    <StrictMode>
      <App list={jsonData} />
    </StrictMode>
  );
  console.log('[SERVER] entry-server: HTML 렌더링 완료');

  // 3. 렌더링된 HTML과 하이드레이션에 필요한 데이터를 반환합니다.
  return {
    jsonData,
    appHtml,
  }
} 