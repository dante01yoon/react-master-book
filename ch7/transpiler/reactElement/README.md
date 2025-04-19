# React Element와 가상 DOM 예제

이 프로젝트는 React의 JSX가 어떻게 JavaScript로 변환되고, React.createElement와 jsx 함수가 어떻게 ReactElement 객체를 생성하는지 보여줍니다. 이를 통해 React의 가상 DOM이 어떻게 구성되는지 이해할 수 있습니다.

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 실행 방법

### 1. Classic JSX 변환 시뮬레이션

```bash
npm run classic
```

이 명령어는 React.createElement 함수를 직접 구현하여 JSX가 어떻게 변환되는지 보여줍니다. Classic 모드에서는 JSX가 React.createElement() 호출로 변환됩니다.

### 2. Automatic JSX 변환 시뮬레이션

```bash
npm run automatic
```

이 명령어는 React 17부터 도입된 새로운 JSX 변환 방식을 시뮬레이션합니다. Automatic 모드에서는 JSX가 jsx/jsxs 함수 호출로 변환됩니다.

### 3. 실제 JSX 변환 데모

```bash
npm run jsx-demo
```

이 명령어는 실제 JSX 파일(.jsx)을 Babel을 통해 JavaScript로 변환하고 실행합니다. 변환된 코드는 `dist/jsxDemo.js`에서 확인할 수 있습니다.

### 4. JSX 변환 방식 비교

```bash
npm run compare
```

이 명령어는 React.createElement(Classic)와 jsx/jsxs 함수(Automatic)의 차이점을 비교합니다.

## 주요 개념

### ReactElement 객체

React.createElement 또는 jsx/jsxs 함수가 반환하는 객체로, 다음과 같은 구조를 가집니다:

```javascript
{
  $$typeof: Symbol(react.element),  // React 엘리먼트 타입 식별자
  type: 'div',                      // 태그 이름 또는 컴포넌트 함수/클래스
  props: {                          // 속성과 자식 요소
    className: 'container',
    children: [...]
  },
  key: null,                        // 리스트 렌더링 시 요소 식별용
  ref: null,                        // DOM 노드 또는 컴포넌트 참조용
  _owner: null                      // 내부 사용 필드
}
```

### Classic vs Automatic 변환

1. **Classic 변환 (React 16 이하)**
   - JSX가 `React.createElement()` 호출로 변환
   - React를 명시적으로 import 해야 함
   - 자식 요소가 separate arguments로 전달됨

2. **Automatic 변환 (React 17+)**
   - JSX가 `_jsx()` 또는 `_jsxs()` 호출로 변환
   - React를 import 할 필요 없음
   - 자식 요소가 props.children으로 전달됨

### 가상 DOM

ReactElement 객체들이 트리 구조를 형성하여 가상 DOM을 구성합니다. React는 이 가상 DOM 트리를 이전 트리와 비교(diff)하여 변경된 부분만 실제 DOM에 업데이트합니다.

## 참고 자료

- [React JSX 변환](https://ko.reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
- [React Element](https://legacy.reactjs.org/blog/2015/12/18/react-components-elements-and-instances.html)
- [가상 DOM과 내부 동작](https://reactjs.org/docs/faq-internals.html) 