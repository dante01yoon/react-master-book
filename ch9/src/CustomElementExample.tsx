import React, { useState, useEffect, useRef } from 'react';

// 커스텀 엘리먼트 정의 파일을 임포트하여 등록 실행
// Vite 환경에서는 JS 파일을 직접 임포트할 수 있음
import './star-rating.js';

// 커스텀 엘리먼트의 타입을 확장하여 TypeScript에서 인식하도록 함
/*
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 커스텀 엘리먼트 태그 이름을 문자열로 명시하고 타입을 정의
      'star-rating': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & { 
          value?: number | string; 
          // 'change' 이벤트 핸들러 타입 정의 (좀 더 명확하게)
          onchange?: (event: CustomEvent<{ value: number }>) => void; 
        },
        HTMLElement
      >;
    }
  }
}
*/

function CustomElementExample() {
  // 별점 상태 관리
  const [rating, setRating] = useState(3);

  // 커스텀 엘리먼트의 'change' 이벤트를 처리하는 핸들러
  const handleRatingChange = (event: Event) => {
    const customEvent = event as CustomEvent<{ value: number }>;
    if (customEvent.detail && typeof customEvent.detail.value === 'number') {
      console.log('커스텀 엘리먼트 변경 이벤트 감지:', customEvent.detail.value);
      setRating(customEvent.detail.value);
    } 
  };

  // 리액트에서 프로그래매틱하게 커스텀 엘리먼트 값 변경 예시
  const setRatingToFive = () => {
    setRating(5);
  };

  // useRef를 사용하여 커스텀 엘리먼트 인스턴스 직접 접근 예시 (필요 시)
  // HTMLElement 타입을 명시하고, value 프로퍼티는 HTMLElement 표준이 아니므로 타입 단언 사용
  const starRatingRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // ref가 연결된 후 이벤트 리스너 직접 등록 (onchange prop 대신 사용)
    const node = starRatingRef.current;
    if (node) {
      node.addEventListener('change', handleRatingChange);
      
      // 컴포넌트 언마운트 시 리스너 제거
      return () => {
        node.removeEventListener('change', handleRatingChange);
      };
    }
  }, []); // 마운트 시 한 번만 실행

  // value prop이 변경될 때마다 커스텀 엘리먼트의 어트리뷰트/프로퍼티 직접 업데이트
  useEffect(() => {
    if (starRatingRef.current) {
      // value 어트리뷰트 직접 설정
      starRatingRef.current.setAttribute('value', String(rating));
      // 또는 value 프로퍼티 직접 설정 (커스텀 엘리먼트에 setter가 구현되어 있어야 함)
      // (starRatingRef.current as any).value = rating; 
    }
  }, [rating]);

  // 커스텀 엘리먼트 렌더링 시 타입 단언 사용
  const StarRatingElement = 'star-rating' as any;

  return (
    <div>
      <p>현재 별점: {rating}</p>

      {/* 
        타입스크립트 오류를 피하기 위해 타입 단언 사용.
        props는 직접 설정하거나 useEffect를 통해 관리.
      */}
      <StarRatingElement ref={starRatingRef}>
        {/* props를 직접 전달하는 대신 useEffect로 관리 */}
      </StarRatingElement>

      <br />
      <br />

      <button onClick={setRatingToFive}>별점 5점으로 설정</button>
    </div>
  );
}

export default CustomElementExample; 