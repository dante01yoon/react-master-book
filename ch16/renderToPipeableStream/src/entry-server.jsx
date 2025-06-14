import { renderToPipeableStream } from "react-dom/server";
import { StrictMode } from "react";
import App from "./components/App";
import Html from "./components/Html";
import { HeavyListPage } from "./components/App";

export const render = (res) => {
  const promise = HeavyListPage.danteSeverSideProps();
  
  // renderToPipeableStream 호출
  const stream = renderToPipeableStream(
    <StrictMode>
      {/* 서버 렌더링 시 초기 데이터를 주입 */}
      <Html promise={promise}>
        <App promise={promise} />
      </Html>
    </StrictMode>,
    {
      // 초기 쉘(Shell) 렌더링이 준비되었을 때 호출됨
      onShellReady() {
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        stream.pipe(res);
      },
      onShellError(error) {
        res.statusCode = 500;
        res.setHeader("Content-type", "text/html");
        res.send("<h1>Something went wrong</h1>");
      },
      onError(error) {
        console.error(error);
      }
    }
  );

  return {
    promise,
    stream,
  };
}; 