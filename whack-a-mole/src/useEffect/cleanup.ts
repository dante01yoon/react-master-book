// whack-a-mole/src/useEffect/cleanup.ts
import { useEffect } from 'react';

// 부모로부터 onClose 콜백 함수를 prop으로 받음
export function useEscapeKey(onClose: () => void) {
  useEffect(() => {
    // 'Escape' 키 입력 시 onClose 함수를 호출하는 핸들러
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // 클린업 함수: effect가 다시 실행되기 전, 또는 컴포넌트가 언마운트될 때 실행
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]); // ➊ 의존성 배열에 onClose 함수를 포함
}