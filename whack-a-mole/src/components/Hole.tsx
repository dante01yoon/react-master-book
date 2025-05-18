import React, { forwardRef } from 'react';
import Mole from './Mole';

// Hole 컴포넌트의 props 타입을 정의하는 인터페이스
interface HoleProps {
  isActive: boolean; // 두더지가 현재 활성화되어 나타나는지 여부
  onWhack: () => void; // 두더지를 클릭(때렸을 때) 시 호출될 함수
  index: number; // 구멍의 고유 식별자 또는 인덱스
  speed: number; // 두더지 애니메이션 또는 동작 속도
}

// forwardRef를 사용하여 부모 컴포넌트가 이 컴포넌트 내부의 DOM 엘리먼트에 접근할 수 있도록 함
// React.forwardRef는 ref를 props로 전달받아 하위 컴포넌트나 DOM 엘리먼트로 전달할 수 있게 하는 고차 컴포넌트(HOC)임
// 제네릭 타입:
//   - 첫 번째 인자 (HTMLDivElement): ref가 연결될 DOM 엘리먼트의 타입. 이 경우, 부모는 Mole 컴포넌트가 노출하는 HTMLDivElement에 접근하게 됨.
//   - 두 번째 인자 (HoleProps): 컴포넌트의 props 타입.
const Hole = forwardRef<HTMLDivElement, HoleProps>(
  ({ isActive, onWhack, index, speed }, ref) => {
    return (
      // 각 구멍을 나타내는 최상위 컨테이너 div 엘리먼트
      // data-hole-index 속성을 통해 DOM에서 구멍의 인덱스를 쉽게 식별할 수 있도록 함
      <div 
        className="relative w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
        data-hole-index={index}
      >
        {/* 실제 구멍의 시각적 표현을 담당하는 div 엘리먼트 */}
        <div className="absolute inset-0 mt-10 rounded-full bg-hole shadow-inner"></div>
        
        {/* 구멍 주변의 흙더미를 시각적으로 표현하는 div 엘리먼트 */}
        <div className="absolute inset-0 mt-14 rounded-full bg-dirt"></div>
        
        {/* Mole 컴포넌트를 렌더링하는 컨테이너 */}
        {/* 부모로부터 전달받은 ref를 Mole 컴포넌트로 전달함 (ref={ref}) */}
        {/* 이를 통해 Hole의 부모 컴포넌트는 Mole 컴포넌트 내부의 DOM 엘리먼트에 접근 가능함 */}
        <div className="absolute inset-0 mt-10">
          <Mole ref={ref} isVisible={isActive} onClick={onWhack} speed={speed} />
        </div>
      </div>
    );
  }
);

// React 개발자 도구에서 컴포넌트 이름을 명확하게 표시하기 위해 displayName 설정
// forwardRef로 감싸진 컴포넌트는 익명 함수로 표시될 수 있으므로, 디버깅 편의성을 위해 설정하는 것이 좋음
Hole.displayName = 'Hole';

export default Hole;
