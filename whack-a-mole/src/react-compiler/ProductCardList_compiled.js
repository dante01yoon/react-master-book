function ProductList(t0) { // t0는 프롭스 객체
  const $ = _c(14); // 메모이제이션 캐시 슬롯 14개 생성

  const {
    products,
    searchTerm,
    onAddToCart
  } = t0; // 프롭스 구조 분해 할당

  console.log(`[ProductList] 렌더링 시작 - 현재 검색어: "${searchTerm}"`);

  let t1; // 최종적으로 렌더링될 ProductItem JSX 배열을 담을 변수
  let t2; // 조기 반환(early return) 시 사용될 JSX 또는 sentinel 값을 담을 변수

  // 핵심 최적화: 주 의존성 변경 감지 (useMemo()와 유사)
  // products, searchTerm, onAddToCart 중 하나라도 이전 렌더링과 다르면 내부 로직 실행
  if ($[1] !== onAddToCart || $[2] !== products || $[3] !== searchTerm) {
    // 의존성 중 하나라도 변경되었으므로, 관련 값들을 재계산

    t2 = Symbol.for("react.early_return_sentinel"); // 기본적으로 조기 반환하지 않음을 표시

    bb0: { // 레이블 블록 (break bb0;으로 탈출 가능)
      let t32; // 필터링 콜백 함수를 담을 변수

      // 필터링 콜백 함수 메모이제이션 (useCallback(..., [searchTerm])과 유사)
      if ($[6] !== searchTerm) { // searchTerm이 변경되었을 때만 필터링 함수 재생성
        t32 = (product) => {
          console.log(`[ProductList] "${product.name}" 필터링 중...`);
          return product.name.toLowerCase().includes(searchTerm.toLowerCase());
        };
        $[6] = searchTerm; // 현재 searchTerm을 캐시에 저장 (다음 비교용)
        $[7] = t32;        // 생성된 필터링 함수를 캐시에 저장
      } else {
        // searchTerm이 변경되지 않았으면 캐시된 필터링 함수 재사용
        t32 = $[7];
      }

      const filteredProducts = products.filter(t32); // 필터링 실행
      console.log(`[ProductList] 필터링된 제품 개수: ${filteredProducts.length}`);

      // 조기 반환 로직 (검색 결과 없을 시)
      if (filteredProducts.length === 0 && searchTerm) {
        let t42; // "결과 없음" 메시지 JSX를 담을 변수

        // "결과 없음" JSX 메모이제이션 (useMemo(..., [searchTerm])과 유사)
        if ($[8] !== searchTerm) { // searchTerm이 변경되었을 때만 JSX 재생성
          t42 = /* @__PURE__ */ jsxDEV("p", { children: [
            '"',
            searchTerm,
            '"에 해당하는 제품이 없습니다.'
          ] }, /* ... */);
          $[8] = searchTerm; // 현재 searchTerm 캐싱
          $[9] = t42;        // 생성된 JSX 캐싱
        } else {
          // searchTerm이 변경되지 않았으면 캐시된 JSX 재사용
          t42 = $[9];
        }
        t2 = t42; // t2에 "결과 없음" JSX 할당
        break bb0; // bb0 블록 (주요 렌더링 로직) 탈출
      }

      // ProductItem 매핑 콜백 함수 메모이제이션 (useCallback(..., [onAddToCart])과 유사)
      let t4; // 매핑 콜백 함수를 담을 변수
      if ($[10] !== onAddToCart) { // onAddToCart() 참조가 변경되었을 때만 매핑 함수 재생성
        t4 = (product_0) => 
          /* @__PURE__ */ jsx(ProductItem, { product: product_0, onAddToCart }, product_0.id, /* ... */);
        $[10] = onAddToCart; // 현재 onAddToCart() 캐싱
        $[11] = t4;         // 생성된 매핑 함수 캐싱
      } else {
        // onAddToCart 함수 참조가 동일하면 캐시된 매핑 함수 재사용
        t4 = $[11];
      }
      t1 = filteredProducts.map(t4); // ProductItem JSX 배열 생성
    } // end of bb0 block

    // 계산된 값들을 캐시에 저장
    $[1] = onAddToCart;
    $[2] = products;
    $[3] = searchTerm;
    $[4] = t1; // 계산된 ProductItem JSX 배열
    $[5] = t2; // "결과 없음" JSX 또는 sentinel 값
  } else {
    // 3-else. 의존성이 변경되지 않았으므로 캐시된 값 재사용
    t1 = $[4];
    t2 = $[5];
  }

  // 조기 반환 값 처리
  if (t2 !== Symbol.for("react.early_return_sentinel")) {
    // t2가 sentinel이 아니면, "결과 없음" JSX 등이므로 바로 반환
    return t2;
  }

  // 최종 div 래퍼 JSX 메모이제이션
  let t3; // 최종 반환될 div 요소를 담을 변수
  if ($[12] !== t1) { // t1 (ProductItem JSX 배열)이 변경되었을 때만 div 재생성
    t3 = /* @__PURE__ */ jsx("div", { children: t1 }, /* ... */);
    $[12] = t1; // 현재 t1 캐싱
    $[13] = t3; // 생성된 div 캐싱
  } else {
    // t1이 변경되지 않았으면 캐시된 div 재사용
    t3 = $[13];
  }
  return t3; // 최종 렌더링 결과 반환
}