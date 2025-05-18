import React, { forwardRef, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Mole 컴포넌트의 props 타입을 정의하는 인터페이스
interface MoleProps {
  isVisible: boolean; // 두더지가 보이는지 여부를 나타내는 값
  onClick: () => void; // 두더지를 클릭했을 때 호출될 함수
  speed: number; // 두더지 애니메이션 속도
}

// forwardRef를 사용하여 부모 컴포넌트가 이 컴포넌트 내부의 DOM 엘리먼트(motion.div)에 접근할 수 있도록 함
const Mole = forwardRef<HTMLDivElement, MoleProps>(
  ({ isVisible, onClick, speed }, ref) => {
    // motion.div 엘리먼트를 참조하기 위한 로컬 ref 생성
    const moleRef = useRef<HTMLDivElement | null>(null);
    
    // 외부에서 전달받은 ref(부모 컴포넌트로부터의 ref)와 로컬 moleRef를 연결함
    // 이를 통해 부모 컴포넌트는 moleRef가 참조하는 DOM 엘리먼트에 접근 가능해짐
    useEffect(() => {
      // 외부 ref가 제공되지 않으면 아무 작업도 하지 않음
      if (!ref) return;
      
      // 외부 ref가 함수 형태일 경우, 함수를 호출하여 moleRef.current를 전달함
      if (typeof ref === 'function') {
        ref(moleRef.current);
      } else {
        // 외부 ref가 객체 형태(RefObject)일 경우, current 속성에 moleRef.current를 할당함
        ref.current = moleRef.current;
      }
    }, [ref]); // ref가 변경될 때마다 이 useEffect 훅을 다시 실행함

    return (
      // 두더지 컴포넌트의 최상위 컨테이너. 상대 위치 및 오버플로우 숨김 처리
      <div className="relative w-full h-full overflow-hidden">
        {/* AnimatePresence는 자식 컴포넌트가 마운트되거나 언마운트될 때 애니메이션 효과를 적용할 수 있도록 함 */}
        <AnimatePresence>
          {/* isVisible이 true일 때만 motion.div (두더지)를 렌더링함 */}
          {isVisible && (
            <motion.div
              ref={moleRef} // 로컬 ref를 motion.div에 연결하여 DOM 엘리먼트를 직접 참조함
              className="absolute bottom-0 w-full flex flex-col items-center" // 두더지 스타일링
              initial={{ y: '100%' }} // 초기 상태: 아래쪽 화면 바깥에 위치
              animate={{ y: 0 }} // 애니메이션 목표 상태: 원래 위치로 이동 (위로 올라옴)
              exit={{ y: '100%' }} // 사라질 때의 상태: 아래쪽 화면 바깥으로 이동
              transition={{ duration: speed }} // 애니메이션 지속 시간 (speed prop 사용)
              onClick={(e) => {
                e.stopPropagation(); // 이벤트 버블링을 막아 부모 요소로의 클릭 이벤트 전파를 차단함
                onClick(); // props로 전달받은 onClick 함수를 호출함
              }}
            >
              {/* 두더지 몸통 부분 */}
              <div className="cursor-pointer select-none"> {/* 클릭 가능하도록 커서 변경 및 텍스트 선택 방지 */}
                <div className="w-16 h-12 bg-mole-body rounded-t-full flex justify-center relative"> {/* 두더지 몸통 스타일 */}
                  {/* 눈 (왼쪽) */}
                  <div className="absolute top-2 left-3 w-2 h-2 bg-mole-eye rounded-full"></div>
                  {/* 눈 (오른쪽) */}
                  <div className="absolute top-2 right-3 w-2 h-2 bg-mole-eye rounded-full"></div>
                  
                  {/* 코 */}
                  <div className="absolute top-5 w-3 h-2 bg-mole-nose rounded-full"></div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
);

// React 개발자 도구에서 컴포넌트 이름을 명확하게 표시하기 위해 displayName 설정
Mole.displayName = 'Mole';

export default Mole;
