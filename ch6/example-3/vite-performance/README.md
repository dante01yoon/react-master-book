# React + TypeScript + Vite

이 템플릿은 Vite에서 React를 HMR 및 일부 ESLint 규칙과 함께 작동시키기 위한 최소한의 설정을 제공합니다.

현재 두 가지 공식 플러그인을 사용할 수 있습니다:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)는 Fast Refresh를 위해 [Babel](https://babeljs.io/)을 사용합니다
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc)는 Fast Refresh를 위해 [SWC](https://swc.rs/)를 사용합니다

## ESLint 구성 확장하기

프로덕션 애플리케이션을 개발하는 경우, 타입 인식 린트 규칙을 활성화하도록 구성을 업데이트하는 것이 좋습니다:

```js
export default tseslint.config({
  extends: [
    // ...tseslint.configs.recommended를 제거하고 이것으로 대체
    ...tseslint.configs.recommendedTypeChecked,
    // 또는 더 엄격한 규칙을 위해 이것을 사용
    ...tseslint.configs.strictTypeChecked,
    // 선택적으로 스타일 규칙을 위해 이것을 추가
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // 다른 옵션들...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

React 관련 린트 규칙을 위해 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x)와 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom)도 설치할 수 있습니다:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // react-x와 react-dom 플러그인 추가
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // 다른 규칙들...
    // 권장하는 타입스크립트 규칙 활성화
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```

# Vite 성능 예제

이 프로젝트는 Vite의 두 가지 주요 성능 기능을 보여줍니다:

1. **의존성 사전 번들링(Dependency Pre-bundling)**
2. **필요 시 변환(On-Demand Transpilation)**

## 의존성 사전 번들링

Vite는 esbuild를 사용하여 의존성을 사전 번들링합니다. 이는 전통적인 JavaScript 기반 번들러보다 10-100배 빠르며, 개발 서버 시작 시간을 크게 향상시킵니다.

### 기능:
- CommonJS/UMD 모듈을 브라우저 호환성을 위해 ESM으로 변환
- 여러 개의 작은 패키지를 하나의 HTTP 요청으로 병합
- 더 빠른 시작을 위해 사전 번들링된 의존성을 캐시

### 관찰 방법:
1. 개발 서버 시작: `npm run dev`
2. 브라우저 개발자 도구 열기(네트워크 탭)
3. 의존성이 사전 번들링된 파일로 제공되는 것 확인
4. `node_modules`의 `.vite/deps` 폴더에서 캐시된 사전 번들링 파일 확인

## 필요 시 변환

Vite는 브라우저에서 요청할 때 소스 코드를 필요에 따라 변환합니다. 이를 통해 변경 후 전체 번들을 다시 빌드할 필요가 없습니다.

### 기능:
- 현재 가져온 파일만 변환
- HMR(Hot Module Replacement)을 가능하게 하는 브라우저의 네이티브 ES 모듈 활용
- 브라우저에서 요청할 때만 파일 변환

### 관찰 방법:
1. 개발 서버 시작: `npm run dev`
2. 브라우저 개발자 도구 열기(네트워크 탭)
3. 페이지/컴포넌트 간 이동
4. 소스 파일이 필요에 따라 온디맨드로 로드되는 것 확인

## 이 프로젝트의 예제들

- **DependencyExample.tsx**: 사전 번들링을 보여주기 위해 여러 서드파티 라이브러리 가져오기
- **LazyLoadExample.tsx**: 컴포넌트의 온디맨드 로딩 시연
- **DynamicImportExample.tsx**: 동적 가져오기가 효율적으로 처리되는 방법 보여주기

## 예제 실행하기

```bash
# 의존성 설치
npm install

# 개발 서버 시작
npm run dev
```

브라우저에 표시된 URL을 방문하고 탐색 링크를 사용하여 예제를 살펴보세요.
