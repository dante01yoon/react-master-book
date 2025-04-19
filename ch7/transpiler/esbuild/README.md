# esbuild를 이용한 JSX 변환 예제

이 프로젝트는 esbuild가 JSX 코드를 어떻게 JavaScript로 변환하는지 보여주는 예제입니다. esbuild는 Go로 작성된 초고속 번들러 겸 트랜스파일러로, Babel이나 SWC보다 더 빠른 변환 성능을 제공합니다.

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 사용 방법

다음 명령을 사용하여 JSX 파일을 JavaScript로 변환할 수 있습니다:

### Classic 모드 (React.createElement)

```bash
# Classic 모드로 JSX 변환 (결과 요약만 보기)
npm run transform:classic

# Classic 모드로 JSX 변환 (변환된 코드 함께 보기)
npm run transform:classic:show
```

### Automatic 모드 (React 17+)

```bash
# Automatic 모드로 JSX 변환 (결과 요약만 보기)
npm run transform:automatic

# Automatic 모드로 JSX 변환 (변환된 코드 함께 보기)
npm run transform:automatic:show
```

### CLI 명령어 예제

```bash
# esbuild CLI 명령어 예제 실행
npm run cli
```

### 벤치마크

```bash
# esbuild 벤치마크 실행
npm run benchmark

# 모든 의존성 설치 후 esbuild, SWC, Babel 벤치마크 실행
npm run benchmark:full
```

## 예제 설명

이 예제에서는 다음과 같은 내용을 다룹니다:

1. esbuild를 이용한 기본 JSX 변환 (classic 모드)
2. esbuild의 자동 JSX 변환 (automatic 모드, React 17+)
3. esbuild CLI 명령어 사용법
4. esbuild, SWC, Babel의 성능 비교

## esbuild 특징

esbuild는 다음과 같은 특징을 가지고 있습니다:

1. **속도**: Go 언어로 작성되어 빠른 변환 속도 제공 (Babel보다 10-100배 빠름)
2. **사용 편의성**: 별도 설정 없이도 기본적으로 JSX 인식
3. **번들링**: 파일 변환뿐만 아니라 번들링 기능도 제공
4. **최신 문법 지원**: JSX, TypeScript 등 최신 문법 지원
5. **통합성**: Vite와 같은 최신 프론트엔드 도구에 내장

## JSX 변환 방식

esbuild에서 JSX 변환은 두 가지 방식으로 가능합니다:

### 기본 방식 (--jsx=transform)

JSX를 `React.createElement()` 함수 호출로 변환합니다. 이 모드에서는 파일에 `import React from 'react';`가 필요합니다.

```jsx
// 원본 JSX
const element = <h1 className="title">Hello</h1>;

// 변환 결과
const element = React.createElement("h1", { className: "title" }, "Hello");
```

### 자동 변환 (--jsx=automatic)

React 17에서 도입된 새 방식으로, JSX를 `jsx` 함수 호출로 변환하고 자동으로 react/jsx-runtime에서 필요한 함수를 import합니다.

```jsx
// 원본 JSX (React import 없음)
const element = <h1 className="title">Hello</h1>;

// 변환 결과
import { jsx as _jsx } from "react/jsx-runtime";
const element = _jsx("h1", { className: "title", children: "Hello" });
```

## esbuild CLI 명령어

esbuild는 다양한 CLI 옵션을 제공합니다:

```bash
# 기본 JSX 변환 (classic 모드)
npx esbuild src/App.jsx --bundle --outfile=dist/app.js

# 자동 JSX 변환 (automatic 모드)
npx esbuild src/App.jsx --jsx=automatic --bundle --outfile=dist/app.js

# 번들링 없이 변환만 수행
npx esbuild src/App.jsx --loader=jsx --outfile=dist/app.js

# 미니파이 옵션 추가
npx esbuild src/App.jsx --bundle --minify --outfile=dist/app.js
```

## API를 통한 사용

esbuild는 Node.js API도 제공하여 프로그래밍 방식으로 사용할 수 있습니다:

```javascript
const esbuild = require('esbuild');

// transform API (파일 내용 변환)
const result = await esbuild.transform(code, {
  loader: 'jsx',
  jsx: 'automatic'
});

// build API (파일 번들링)
await esbuild.build({
  entryPoints: ['src/App.jsx'],
  outfile: 'dist/out.js',
  bundle: true,
  jsx: 'automatic'
});
```

이 예제 프로젝트를 통해 esbuild의 JSX 변환 기능을 쉽게 이해하고 활용할 수 있습니다. 