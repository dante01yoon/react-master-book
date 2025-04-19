# SWC를 이용한 JSX 변환 예제

이 프로젝트는 SWC가 JSX 코드를 어떻게 JavaScript로 변환하는지 보여주는 예제입니다. SWC는 Rust로 작성된 초고속 JavaScript/TypeScript 컴파일러로, Babel보다 훨씬 빠른 변환 성능을 제공합니다.

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 사용 방법

다음 명령을 사용하여 JSX 파일을 JavaScript로 변환할 수 있습니다:

```bash
# src 폴더의 JSX 파일을 dist 폴더로 변환 (classic 런타임)
npm run build
```

새로운 JSX 변환(React 17+)을 사용하려면:

```bash
# automatic 런타임으로 변환
npm run build:automatic
```

변환 과정을 실시간으로 확인하려면:

```bash
# 파일 변경 시 자동으로 다시 변환
npm run build:watch
```

원본 JSX와 변환된 JavaScript 코드를 비교하려면:

```bash
# 원본과 변환된 코드 비교 및 설명 출력
npm run compare
```

두 가지 변환 방식을 비교하려면:

```bash
# classic과 automatic 런타임 비교
npm run compare:transforms
```

SWC와 Babel의 성능을 비교하려면:

```bash
# 성능 벤치마크 실행
npm run benchmark
```

## 예제 설명

이 예제에서는 다음과 같은 내용을 다룹니다:

1. SWC를 이용한 기본 JSX 변환 (classic 런타임)
2. SWC의 새로운 JSX 변환 (automatic 런타임, React 17+)
3. SWC와 Babel의 변환 속도 비교

## SWC 설정

`.swcrc` 파일에서 SWC의 설정을 확인할 수 있습니다:

### 기본 설정 (.swcrc)

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "transform": {
      "react": {
        "runtime": "classic",
        "pragma": "React.createElement",
        "pragmaFrag": "React.Fragment"
      }
    },
    "target": "es2015"
  },
  "module": {
    "type": "commonjs"
  }
}
```

### 자동 런타임 설정 (.swcrc.automatic)

```json
{
  "jsc": {
    "parser": {
      "syntax": "ecmascript",
      "jsx": true
    },
    "transform": {
      "react": {
        "runtime": "automatic",
        "importSource": "react"
      }
    },
    "target": "es2015"
  },
  "module": {
    "type": "commonjs"
  }
}
```

## SWC의 장점

1. **속도**: Rust로 작성되어 Babel보다 수십 배 빠름
2. **호환성**: Babel과 동일한 변환 결과 제공
3. **최신 지원**: React 17+의 새로운 JSX 변환 지원
4. **프레임워크 통합**: Next.js 등 최신 프레임워크가 기본으로 채택 