import { useState } from 'react'; // 리액트 훅 useState를 사용하기 위해 임포트함
import axios from 'axios'; // HTTP 요청을 보내기 위한 axios 라이브러리 임포트함 (실제 프로젝트 구성 필요)

// 컴포넌트 외부 스코프에 정의된 배열.
// 렌더링 단계에서 이 배열을 직접 변경하는 것은 컴포넌트의 순수성을 해치며,
// 여러 컴포넌트 인스턴스 간에 예기치 않은 방식으로 상태를 공유하게 만들 수 있음.
const items = [];

const SideEffectComponent = () => {
  const [state, setState] = useState("");

  console.log("Rendering….");

  // 렌더링 중 브라우저 API(document.cookie)에 직접 접근하여 쿠키를 파싱함.
  // 이는 렌더링 로직을 외부 환경에 의존하게 만들고, 서버 사이드 렌더링(SSR) 환경 등에서 문제를 일으킬 수 있음.
  // 또한, 토큰 값에 따라 렌더링 결과가 달라질 수 있어 예측 가능성을 떨어뜨림.
  // ?. (옵셔널 체이닝)을 사용하여 쿠키나 토큰 값이 없을 때 발생할 수 있는 런타임 에러를 방지함.
  const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];

  // 렌더링 중 컴포넌트 상태(setState)를 업데이트함.
  // 이는 즉시 리렌더링을 유발하며, 조건 없이 실행될 경우 무한 렌더링 루프에 빠질 위험이 매우 큼.
  // React는 렌더링 중 상태 업데이트를 감지하고 경고를 발생시킴.
  if (token) { // token 존재 여부를 확인하여 무한 루프 가능성을 줄이려 했으나, 근본적인 해결책은 아님.
    setState(token);
  }

  // 렌더링 중 외부 API에 데이터 요청을 보냄 (axios.get).
  // 렌더링은 순수한 함수여야 하므로, 네트워크 요청과 같은 부수 효과는 포함되어서는 안 됨.
  // 이는 불필요한 네트워크 트래픽을 유발하고, 컴포넌트 렌더링 속도를 저하시키며, 응답 순서에 따라 상태가 꼬일 수 있음.
  axios.get("/data");

  // 렌더링 중 컴포넌트 외부의 데이터를 직접 변경함 (items.push).
  // 이는 React의 데이터 흐름 원칙에 위배되며, 애플리케이션 상태를 예측 불가능하게 만듦.
  // 디버깅을 어렵게 하고, 컴포넌트의 재사용성을 저해함.
  if (token) {
    items.push(token);
  }

  // 렌더링 중 DOM을 직접 조작함 (appendChild).
  // React는 가상 DOM(Virtual DOM)을 사용하여 효율적으로 DOM 업데이트를 관리함.
  // 렌더링 중에 실제 DOM을 직접 변경하면 React의 렌더링 메커니즘과 충돌하여 예기치 않은 UI 오류나 성능 저하를 유발할 수 있음.
  const mainElement = document.getElementById("main");
  if (mainElement) {
    const textNode = document.createTextNode("hi"); // DOM API를 사용하여 텍스트 노드를 생성함.
    mainElement.appendChild(textNode); // 생성된 텍스트 노드를 'main' 요소에 추가함.
  }

  
  // 실제 애플리케이션에서는 모든 부수 효과는 useEffect 훅 내부에서 처리해야 함.
  return (
    <div>Do not use side effects during rendering</div>
  )
}

export default SideEffectComponent; // 다른 모듈에서 이 컴포넌트를 사용할 수 있도록 내보냄.