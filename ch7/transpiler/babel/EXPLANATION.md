# Babel을 이용한 JSX 변환 설명

이 문서에서는 앞서 실행한 예제들을 통해 Babel이 JSX를 어떻게 JavaScript로 변환하는지 자세히 설명합니다.

## 기본 JSX 변환 원리

JSX는 JavaScript의 확장 문법으로, XML과 유사한 태그 기반 구문을 통해 UI 요소를 선언적으로 표현할 수 있게 해줍니다. 하지만 브라우저는 JSX를 직접 이해하지 못하므로, Babel과 같은 트랜스파일러를 사용하여 표준 JavaScript로 변환해야 합니다.

### 변환 예시: 간단한 JSX 요소

**원본 JSX 코드:**
```jsx
const element = <h1 className="welcome">Hello, JSX!</h1>;
```

**Babel 변환 결과:**
```javascript
const element = React.createElement(
  "h1",                        // 첫 번째 인자: 요소 타입
  { className: "welcome" },    // 두 번째 인자: props 객체
  "Hello, JSX!"                // 세 번째 인자: 자식 노드
);
```

### 변환 예시: 중첩된 JSX 요소

**원본 JSX 코드:**
```jsx
const nestedElement = (
  <div className="container">
    <h2 className="title">중첩된 JSX 예제</h2>
    <p className="content">JSX는 중첩 구조를 쉽게 표현할 수 있습니다.</p>
    <button onClick={() => alert('클릭됨!')}>클릭해보세요</button>
  </div>
);
```

**Babel 변환 결과:**
```javascript
const nestedElement = React.createElement(
  "div",
  { className: "container" },
  React.createElement("h2", { className: "title" }, "중첩된 JSX 예제"),
  React.createElement("p", { className: "content" }, "JSX는 중첩 구조를 쉽게 표현할 수 있습니다."),
  React.createElement("button", { onClick: () => alert('클릭됨!') }, "클릭해보세요")
);
```

## React.createElement 함수의 구조

`React.createElement` 함수는 다음과 같은 형태로 호출됩니다:

```javascript
React.createElement(type, props, ...children)
```

- **type**: 요소의 타입(HTML 태그명이나 React 컴포넌트)
- **props**: 요소의 속성을 담은 객체
- **children**: 자식 요소들(여러 개 가능)

## 고전 런타임 vs 새로운 런타임 (React 17+)

React 17부터는 JSX 변환 방식에 변화가 생겼습니다. 이를 통해 `import React from 'react'`를 매번 작성할 필요가 없어졌습니다.

### 고전 런타임 (Classic Runtime)

**Babel 설정 (.babelrc):**
```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

**특징:**
- JSX를 `React.createElement` 호출로 변환
- 모든 JSX 파일에 `import React from 'react'` 필요
- React 16 이하에서 사용되는 방식

### 새로운 런타임 (Automatic Runtime, React 17+)

**Babel 설정 (.babelrc.new.json):**
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

**특징:**
- JSX를 `react/jsx-runtime`의 함수 호출로
  변환
- `import React from 'react'` 불필요 (JSX만 사용하는 경우)
- 내부적으로 `jsx` 및 `jsxs` 함수 사용
- React 17 이상에서 지원

### 두 방식의 변환 결과 비교

**고전 런타임 변환 결과:**
```javascript
var element = /*#__PURE__*/React.createElement("h1", {
  className: "welcome"
}, "Hello, New JSX Transform!");
```

**새로운 런타임 변환 결과:**
```javascript
var _jsxRuntime = require("react/jsx-runtime");
var element = /*#__PURE__*/(0, _jsxRuntime.jsx)("h1", {
  className: "welcome",
  children: "Hello, New JSX Transform!"
});
```

## 주요 차이점

1. **import 차이**: 새 변환은 React를 직접 import하지 않고 `react/jsx-runtime`를 사용
2. **자식 처리 방식**: 새 변환은 자식 요소를 `children` prop으로 전달
3. **복수 자식 처리**: 새 변환은 여러 자식이 있을 때 `jsx` 대신 `jsxs` 함수 사용
4. **성능 최적화**: 새 변환은 코드 최적화를 위한 정보를 더 잘 제공

## 실용적 이점

1. **코드 간결성**: `import React` 구문 불필요
2. **번들 크기 감소**: 미세하게 번들 크기 감소 
3. **개발자 경험 향상**: Linter나 타입 검사기가 불필요한 import 경고 없음
4. **유지보수성 향상**: 명시적인 `children` prop으로 코드 의도 명확화 