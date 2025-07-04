import React, { useRef, forwardRef, useImperativeHandle } from 'react';

// ➊ forwardRef를 사용. 두 번째 인자로 ref를 받음
const MyInput = forwardRef<HTMLInputElement, { label: string }>((props, ref) => {
  return (
    <div>
      <label>{props.label}</label>
      {/* ➋ 부모로부터 전달받은 ref를 실제 input 요소에 연결 */}
      <input ref={ref} type="text" />
    </div>
  );
});

// useImperativeHandle과 함께 사용하는 예시를 위한 컴포넌트
// 자식 컴포넌트에서 부모 컴포넌트가 호출할 수 있는 함수들을 정의할 때 사용함
interface CustomInputHandle {
  focus: () => void;
  clear: () => void;
  getValue: () => string | undefined;
}

const CustomInput = forwardRef<CustomInputHandle, { label: string }>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // useImperativeHandle을 사용하여 부모 컴포넌트에서 호출 가능한 인터페이스를 정의함
  useImperativeHandle(ref, () => ({
    focus: () => {
      inputRef.current?.focus();
    },
    clear: () => {
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    getValue: () => {
      return inputRef.current?.value;
    }
  }));

  return (
    <div>
      <label>{props.label}</label>
      <input ref={inputRef} type="text" />
    </div>
  );
});

// 부모 컴포넌트
function ParentComponent() {
  // 자식 컴포넌트(MyInput)의 input 요소에 접근하기 위한 ref 생성
  const inputRef = useRef<HTMLInputElement>(null);
  // 자식 컴포넌트(CustomInput)의 커스텀 핸들(메서드)에 접근하기 위한 ref 생성
  const customInputRef = useRef<CustomInputHandle>(null);

  const handleFocusClick = () => {
    // inputRef.current는 MyInput 컴포넌트 내부의 input 요소를 가리킴
    inputRef.current?.focus();
  };

  const handleCustomFocusClick = () => {
    // customInputRef.current의 focus 메서드를 호출함
    customInputRef.current?.focus();
  };

  const handleCustomClearClick = () => {
    // customInputRef.current의 clear 메서드를 호출함
    customInputRef.current?.clear();
  };
  
  const handleCustomGetValueClick = () => {
    // customInputRef.current의 getValue 메서드를 호출함
    const value = customInputRef.current?.getValue();
  }

  return (
    <div>
      <MyInput ref={inputRef} label="내 입력창:" />
      <button onClick={handleFocusClick}>MyInput에 포커스 주기</button>
    </div>
  );
}

export default ParentComponent; 