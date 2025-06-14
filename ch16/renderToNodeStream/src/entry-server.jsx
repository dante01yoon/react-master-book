import { StrictMode } from "react";
import { renderToNodeStream } from "react-dom/server";
import App, { HeavyListPage } from "./components/App";

/**
 * 서버 사이드 렌더링을 위한 함수
 * @returns {{appStream: NodeJS.ReadableStream, promise: Promise<any>}}
 * - appStream: 리액트 컴포넌트를 HTML로 렌더링하는 노드 스트림
 * - promise: 데이터 페칭을 위한 프로미스
 */
export const render = () => {
  // 데이터 로딩을 위한 프로미스를 생성함
  const promise = HeavyListPage.danteSeverSideProps();

  // renderToNodeStream을 사용하여 리액트 앱을 스트림으로 렌더링함
  const appStream = renderToNodeStream(
    <StrictMode>
      <App promise={promise} />
    </StrictMode>
  );

  // 스트림과 프로미스를 반환하여 서버에서 사용하도록 함
  return {
    promise,
    appStream,
  };
};


