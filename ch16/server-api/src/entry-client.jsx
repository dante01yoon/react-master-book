import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";
import App from "./components/App";

let jsonData;
try {
  // 서버에서 HTML에 포함시킨 JSON 데이터를 script 태그에서 읽어옴
  const dataElement = document.getElementById('_DANTE_DATA');
  if (dataElement) {
    jsonData = JSON.parse(dataElement.textContent);
  } else {
  }
} catch (e) {
  console.error('_DANTE_DATA 파싱 실패', e);
}

// 서버에서 렌더링한 DOM 노드를 가져옴
const rootElement = document.getElementById("root");

// hydrateRoot를 사용해 기존 DOM에 리액트를 연결(수화)함
// 서버 렌더링 시 사용했던 것과 동일한 props(jsonData)를 전달해야 함
hydrateRoot(
  rootElement,
  <StrictMode>
    <App list={jsonData} />
  </StrictMode>
);