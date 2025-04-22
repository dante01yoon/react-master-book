// 바닐라 JavaScript로 태그드 템플릿 사용하기
// 이 예제는 React 없이 htm만 사용한 경우입니다.

// htm 라이브러리 직접 로드 - CDN 사용 (실제로는 npm에서 설치하면 됩니다)
// <script src="https://unpkg.com/htm@3.1.1/dist/htm.js"></script>

/**
 * 이 예제는 실제 브라우저에서 다음 HTML 파일과 함께 사용할 수 있습니다:
 * 
 * ```html
 * <!DOCTYPE html>
 * <html>
 * <head>
 *   <title>바닐라 JavaScript + htm 예제</title>
 * </head>
 * <body>
 *   <div id="app"></div>
 *   <script src="https://unpkg.com/htm@3.1.1/dist/htm.js"></script>
 *   <script src="./standalone-htm-example.js"></script>
 * </body>
 * </html>
 * ```
 */

// 간단한 가상 DOM (Virtual DOM) 구현
function h(type, props, ...children) {
  return { type, props: props || {}, children };
}

// h 함수와 htm 연결
const html = htm.bind(h);

// 가상 DOM을 실제 DOM으로 변환하는 함수
function render(vnode, container) {
  // 문자열이나 숫자인 경우 텍스트 노드 생성
  if (typeof vnode === 'string' || typeof vnode === 'number') {
    container.appendChild(document.createTextNode(vnode));
    return;
  }
  
  // 함수형 컴포넌트 처리
  if (typeof vnode.type === 'function') {
    const result = vnode.type(vnode.props);
    render(result, container);
    return;
  }
  
  // HTML 요소 생성
  const element = document.createElement(vnode.type);
  
  // 속성 설정
  const props = vnode.props || {};
  Object.entries(props).forEach(([name, value]) => {
    if (name === 'style' && typeof value === 'object') {
      Object.entries(value).forEach(([k, v]) => {
        element.style[k] = v;
      });
    } else if (name.startsWith('on') && typeof value === 'function') {
      const eventName = name.slice(2).toLowerCase();
      element.addEventListener(eventName, value);
    } else {
      element.setAttribute(name, value);
    }
  });
  
  // 자식 요소 처리
  vnode.children.forEach(child => {
    render(child, element);
  });
  
  // 컨테이너에 추가
  container.appendChild(element);
}

// 컴포넌트 구현
const App = () => {
  const count = 42;
  const items = ['사과', '바나나', '오렌지'];
  
  // 이벤트 핸들러 (실제로는 작동하지 않음 - DOM이 새로 생성되기 때문)
  const handleClick = () => {
    alert('클릭됨!');
  };
  
  // htm을 사용한 템플릿
  return html`
    <div class="app">
      <h1>바닐라 JavaScript + htm 예제</h1>
      <p>현재 카운트: ${count}</p>
      
      <button onclick=${handleClick}>클릭하세요</button>
      
      <h2>과일 목록</h2>
      <ul>
        ${items.map(item => html`<li>${item}</li>`)}
      </ul>
    </div>
  `;
};

// 화면 렌더링 (브라우저 환경에서 실행)
// 실제 브라우저에서 실행 시 주석 해제
/*
document.addEventListener('DOMContentLoaded', () => {
  const appElement = document.getElementById('app');
  const vdom = App();
  render(vdom, appElement);
});
*/

// Node.js 환경에서 테스트 목적으로 출력
console.log('가상 DOM 구조:');
console.log(JSON.stringify(App(), null, 2)); 