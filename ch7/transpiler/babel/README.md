# Babel을 이용한 JSX 변환 예제

이 프로젝트는 Babel이 JSX 코드를 어떻게 JavaScript로 변환하는지 보여주는 예제입니다.

## 설치 방법

```bash
# 의존성 설치
npm install
```

## 사용 방법

다음 명령을 사용하여 JSX 파일을 JavaScript로 변환할 수 있습니다:

```bash
# src 폴더의 JSX 파일을 dist 폴더로 변환
npm run build
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

## 예제 설명

이 예제에서는 다음과 같은 JSX 변환 케이스를 보여줍니다:

1. 기본 JSX 변환 (`<h1>` 요소)
2. 중첩된 JSX 구조 변환 (여러 요소가 중첩된 `<div>`)
3. 커스텀 컴포넌트 JSX 변환 (`<MyButton>` 컴포넌트)
4. 조건부 JSX 변환 (삼항 연산자를 사용한 조건부 렌더링)

각 케이스가 어떻게 `React.createElement()` 함수 호출로 변환되는지 확인할 수 있습니다.

## Babel 설정

`.babelrc` 파일에서 Babel의 설정을 확인할 수 있습니다:

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

- `@babel/preset-env`: 최신 JavaScript를 지원하는 환경에 맞게 변환
- `@babel/preset-react`: JSX 및 React 관련 문법 변환 