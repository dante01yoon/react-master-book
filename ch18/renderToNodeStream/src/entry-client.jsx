import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./components/App";

let promise;
try {
  // 서버에서 전달된 데이터를 script 태그에서 추출하여 파싱함
  const dataElement = document.getElementById('_DANTE_DATA');
  const jsonData = dataElement.textContent;
  promise = Promise.resolve(JSON.parse(jsonData));
}
catch (e) {
 // 데이터 파싱 중 오류 발생 시, 클라이언트에서 직접 API를 호출하도록 fallback 처리도 가능함
 // 여기서는 간단하게 에러를 무시하고 진행
 promise = Promise.resolve(null); // 혹은 에러 상태를 나타내는 다른 값
}

// hydrateRoot를 사용하여 서버에서 렌더링된 HTML에 리액트 앱을 연결(하이드레이션)함
hydrateRoot(
  document.getElementById("root"),
  <StrictMode>
    <App promise={promise}/>
  </StrictMode>
);

