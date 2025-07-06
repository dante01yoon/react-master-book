import React, { useState } from 'react';
import { useEscapeKey } from '../useEffect/cleanup';

function ModalWithoutCallback() {
  const [isOpen, setIsOpen] = useState(false);
  // 모달과 관계없는 상태. 이 상태가 변경되면 컴포넌트는 리렌더링됨
  const [count, setCount] = useState(0); 

  // 부모가 리렌더링될 때마다 이 함수는 새로 생성됨
  const handleClose = () => {
    console.log('모달 닫기');
    setIsOpen(false);
  };

  useEscapeKey(handleClose);

  // ... (컴포넌트의 JSX 코드)
}

function ModalWithCallback() {
  const [isOpen, setIsOpen] = useState(false);
  const [count, setCount] = useState(0);

  // ➍ useCallback으로 함수를 메모이제이션
  const handleClose = useCallback(() => {
    console.log('모달 닫기 (useCallback 사용)');
    setIsOpen(false);
  }, []); // 의존성이 없으므로 참조가 안정적으로 유지됨

  useEscapeKey(handleClose);
  
  // ... JSX ...
}