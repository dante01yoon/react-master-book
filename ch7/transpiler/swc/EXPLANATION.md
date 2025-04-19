# SWC를 이용한 JSX 변환 상세 설명

이 문서에서는 SWC가 JSX를 어떻게 변환하는지, 그리고 Babel과의 차이점을 자세히 설명합니다.

## SWC란?

SWC(Speedy Web Compiler)는 Rust로 작성된 초고속 JavaScript/TypeScript 컴파일러입니다. React의 JSX, TypeScript 등 최신 JavaScript 문법을 호환성 있는 코드로 변환하는 트랜스파일러 역할을 합니다. Babel과 유사한 기능을 제공하지만, Rust의 성능 이점을 활용해 훨씬 빠른 처리 속도를 자랑합니다.

## JSX 변환 과정

### 1. Classic 런타임 변환 (React.createElement)

**원본 JSX 코드:**

```jsx
const element = <h1 className="welcome">Hello, SWC!</h1>;
```

**SWC 변환 결과(classic 런타임):**

```javascript
const element = React.createElement("h1", {
  className: "welcome"
}, "Hello, SWC!");
```

이 변환은 Babel의 변환 결과와 동일합니다. JSX 요소는 `React.createElement()` 함수 호출로 변환되며, 함수의 인자는 다음과 같습니다:

1. 첫 번째 인자: 요소 타입 (`"h1"`)
2. 두 번째 인자: props 객체 (`{ className: "welcome" }`)
3. 세 번째 이후 인자: 자식 요소들 (`"Hello, SWC!"`)

### 2. Automatic 런타임 변환 (React 17+)

**원본 JSX 코드:**

```jsx
// React import 없음
const element = <h1 className="welcome">Hello, New SWC Transform!</h1>;
```

**SWC 변환 결과(automatic 런타임):**

```javascript
import { jsx as _jsx } from "react/jsx-runtime";

const element = /*#__PURE__*/_jsx("h1", {
  className: "welcome",
  children: "Hello, New SWC Transform!"
});
```

이 변환에서는 `React.createElement` 대신 `react/jsx-runtime`에서 가져온 `jsx` 함수를 사용합니다. 자식 요소들은 `children` prop으로 전달됩니다.

## SWC 설정 옵션 설명

SWC는 프로젝트의 루트에 위치한 `.swcrc` 파일이나 `swc.config.js` 파일로 설정할 수 있습니다. 주요 JSX 관련 설정 옵션은 다음과 같습니다:

### jsc.transform.react 섹션

```json
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic",
        "importSource": "react",
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment",
        "throwIfNamespace": true,
        "development": false,
        "useBuiltins": false
      }
    }
  }
}
```

주요 옵션 설명:

* **runtime**: JSX 변환 방식을 지정
  * `"classic"`: 전통적인 `React.createElement` 호출로 변환
  * `"automatic"`: React 17의 새 JSX 변환을 사용 (react/jsx-runtime)
  
* **importSource**: automatic 런타임에서 사용할 패키지 소스 (기본값: `"react"`)
  * 기본값을 사용하면 `react/jsx-runtime`에서 함수를 import
  * 다른 값을 지정하면 `[importSource]/jsx-runtime`에서 import
  
* **pragma**: classic 런타임에서 JSX를 변환할 함수 이름
  * 기본값: `"React.createElement"`
  
* **pragmaFrag**: Fragment(`<>...</>`) 변환에 사용할 표현식
  * 기본값: `"React.Fragment"`

* **development**: 개발 모드 활성화 여부
  * `true`로 설정하면 개발 환경용 JSX 변환 생성 (더 많은 디버깅 정보)

## SWC와 Babel 비교

### 1. 성능 차이

SWC는 Rust로 작성되어 JavaScript로 작성된 Babel보다 훨씬 빠릅니다. 실제 벤치마크에서 SWC는 Babel보다 약 20배~30배 빠른 변환 속도를 보여줍니다. 대규모 프로젝트에서 이러한 성능 차이는 빌드 시간에 큰 영향을 줄 수 있습니다.

### 2. 변환 결과

변환 결과는 대부분 동일합니다. 두 도구 모두 지정한 런타임(classic 또는 automatic)에 맞게 JSX를 변환합니다. 다만 SWC는 더 최적화된 코드를 생성하기도 합니다.

### 3. 설정 방식

설정 방식에 약간의 차이가 있습니다:

**Babel 설정 (.babelrc):**
```json
{
  "presets": [
    "@babel/preset-env",
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

**SWC 설정 (.swcrc):**
```json
{
  "jsc": {
    "transform": {
      "react": {
        "runtime": "automatic"
      }
    }
  }
}
```

### 4. 프레임워크 통합

최신 프레임워크들은 기본 컴파일러로 SWC를 채택하는 추세입니다:

* **Next.js**: Next.js 11부터 SWC를 기본 컴파일러로 사용
* **Parcel**: v2에서 Babel 대신 SWC를 사용하는 옵션 제공
* **Deno**: SWC를 내부적으로 사용하여 TypeScript 및 JSX 처리

## 실무 적용 시 장점

1. **빌드 속도 향상**: 개발 및 프로덕션 빌드 시간 대폭 단축
2. **리소스 사용 감소**: 컴파일 과정에서 메모리 사용량 감소
3. **기능성 동일**: Babel과 동일한 변환 결과 제공하면서 성능만 개선
4. **최신 기능 지원**: React 17+ 새 JSX 변환 등 최신 문법 지원
5. **TypeScript 지원**: TypeScript 파일도 빠르게 변환 가능

## 결론

SWC는 Babel의 높은 호환성을 유지하면서 더 뛰어난 성능을 제공합니다. 특히 대규모 프로젝트에서 빌드 시간 단축이 중요할 때 SWC로의 마이그레이션을 고려할 만합니다. 최신 React 프로젝트에서는 SWC와 automatic 런타임 설정을 통해 최적의 개발 경험을 구현할 수 있습니다. 