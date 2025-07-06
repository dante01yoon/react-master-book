import { useRef, forwardRef, useImperativeHandle } from "react";

// ➊ 부모 컴포넌트가 호출할 수 있는 함수들의 타입을 정의함
interface ChildInputHandle {
  focusInput: () => void;
  getInputValue: () => string | undefined;
  clearInput: () => void;
}

// ➋ ChildComponent는 forwardRef를 사용하여 ref를 전달받음
// 제네릭의 첫 번째는 노출할 핸들의 타입(ChildInputHandle),
// 두 번째는 props의 타입 (여기서는 빈 객체 {})
const ChildComponent = forwardRef<ChildInputHandle, {}>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);

  // ➌ useImperativeHandle을 사용하여 ref에 연결될 객체를 정의함.
  // 이 객체는 부모 컴포넌트가 ref.current를 통해 접근할 수 있는 메서드들을 포함함.
  useImperativeHandle(ref, () => ({
    focusInput: () => {
      inputRef.current?.focus(); // input 요소에 포커스를 줌
    },
    getInputValue: () => {
      return inputRef.current?.value; // input 요소의 현재 값을 반환함
    },
    clearInput: () => {
      if (inputRef.current) {
        inputRef.current.value = ""; // input 요소의 값을 비움
      }
    },
  }));

  return (
    <div>
      <input type="text" ref={inputRef} className="border p-1" />
      <p className="text-sm">이것은 자식 컴포넌트의 입력 필드입니다.</p>
    </div>
  );
});
ChildComponent.displayName = "ChildComponent"; // 개발자 도구에서 이름 표시

const ParentComponent = () => {
  // ➍ 자식 컴포넌트의 핸들(ChildInputHandle에서 정의한 함수들)을 참조할 ref를 생성함
  const childRef = useRef<ChildInputHandle>(null);

  // ➎ 버튼 클릭 시 자식 컴포넌트의 focusInput 함수를 호출함
  const handleFocusClick = () => {
    childRef.current?.focusInput(); // 자식의 focusInput 메서드 호출
  };

  const handleGetValueClick = () => {
    const value = childRef.current?.getInputValue(); // 자식의 getInputValue 메서드 호출
    alert(`자식 Input 값: ${value || "없음"}`);
  };

  const handleClearClick = () => {
    childRef.current?.clearInput(); // 자식의 clearInput 메서드 호출
  };

  return (
    <div className="parent-component p-4 border rounded-md">
      <h3 className="text-lg font-semibold mb-2">부모 컴포넌트</h3>
      <ChildComponent ref={childRef} />
      <div className="mt-2 space-x-2">
        <button
          onClick={handleFocusClick}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          자식 Input에 포커스
        </button>
        <button
          onClick={handleGetValueClick}
          className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          자식 Input 값 가져오기
        </button>
        <button
          onClick={handleClearClick}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          자식 Input 값 지우기
        </button>
      </div>
      <p className="text-xs mt-2">
        부모 컴포넌트의 버튼을 클릭하면, `childRef`를 통해 `ChildComponent`에서 `useImperativeHandle`로 노출한 함수들을 호출하여 자식 컴포넌트를 제어합니다.
      </p>
    </div>
  );
};

export default ParentComponent;