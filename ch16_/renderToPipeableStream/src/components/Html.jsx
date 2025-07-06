import { use, Suspense } from "react";

// 서버 데이터를 클라이언트에 스트리밍하는 컴포넌트
const BackfillPromise = ({ promise }) => {
  const data = use(promise);
  return (
    <script
      dangerouslySetInnerHTML={{
        // 데이터 로딩이 완료되면 window.setPromise 함수를 호출하는 스크립트를 렌더링
        __html: `window.setPromise(${JSON.stringify(data)})`,
      }}
    />
  );
};

const Html = ({ promise, children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/src/components/App.css" />
        <title>Dante streaming ssr example</title>
      </head>
      <body>
        <div id="root">{children}</div>
        <script type="module" src="/src/entry-client.jsx"></script>
        {/* 3. 데이터 로딩을 기다리기 위해 Suspense로 감쌈 */}
        <Suspense>
          <BackfillPromise promise={promise} />
        </Suspense>
      </body>
    </html>
  );
};

export default Html; 