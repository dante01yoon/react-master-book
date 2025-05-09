# JSX VS 태그드 템플릿 비교 예제

이 프로젝트는 React에서 JSX와 태그드 템플릿(htm)을 비교하는 예제 애플리케이션입니다.

## 개요

JSX는 리액트에서 UI를 표현하는 가장 일반적인 방법이지만, 트랜스파일러(Babel 등)가 필요합니다. 
태그드 템플릿은 ES6의 문법을 활용해 트랜스파일러 없이도 비슷한 결과를 얻을 수 있는 대안입니다.

이 예제에서는 [htm](https://github.com/developit/htm) 라이브러리를 사용해 태그드 템플릿으로 React 컴포넌트를 작성하는 방법을 보여줍니다.

## 설치 및 실행

```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm start
```

## 예제 내용

1. 기본 사용법: 간단한 텍스트와 변수 표현
2. 조건부 렌더링: 조건에 따라 다른 컴포넌트 렌더링
3. 복잡한 컴포넌트 구조: 중첩된 컴포넌트 예시
4. 리스트 렌더링: 배열 데이터 표현

## JSX vs 태그드 템플릿 비교

### JSX
- 장점: 강력한 IDE 지원, 타입 체킹, 성능 최적화
- 단점: 트랜스파일러 필요

### 태그드 템플릿 (htm)
- 장점: 트랜스파일러 불필요, 기본 JS 문법만으로 사용 가능
- 단점: 런타임 파싱으로 인한 약간의 성능 저하, IDE 지원 부족

## 참고 자료

- [htm 라이브러리](https://github.com/developit/htm)
- [React 공식 문서](https://reactjs.org/)