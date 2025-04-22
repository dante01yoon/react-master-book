# 리액트 합성 이벤트(Synthetic Event)

## 개요

합성 이벤트(Synthetic Event)는 리액트에서 스크롤, 드래그앤드롭, 클릭 등의 이벤트를 처리할 때 이벤트 핸들러에 전달되는 특별한 객체입니다. 이 객체는 브라우저의 네이티브 이벤트(Native Event)를 감싸(Wrap) 크로스 브라우저 호환성을 제공합니다.

## 특징

1. **크로스 브라우저 호환성**: 브라우저마다 다르게 구현된 이벤트 API를 일관된 인터페이스로 제공합니다.
2. **이벤트 풀링(Event Pooling)**: React 16 이하 버전에서 성능 최적화를 위해 이벤트 객체를 재사용했습니다. React 17부터는 이 기능이 제거되었습니다.
3. **합성 이벤트 시스템**: 리액트의 가상 DOM 시스템과 통합되어 효율적인 이벤트 위임(Event Delegation)을 구현합니다.
4. **네이티브 이벤트 접근**: `event.nativeEvent` 속성을 통해 원본 브라우저 이벤트에 접근할 수 있습니다.

## 주요 이벤트 타입

리액트는 다양한 이벤트 타입을 지원하며, 타입스크립트와 함께 사용할 경우 더 정확한 타입 체크가 가능합니다:

### 클립보드 이벤트
- `onCopy`, `onCut`, `onPaste`
- 타입: `ClipboardEvent<T>`

### 컴포지션 이벤트
- `onCompositionEnd`, `onCompositionStart`, `onCompositionUpdate`
- 타입: `CompositionEvent<T>`

### 키보드 이벤트
- `onKeyDown`, `onKeyPress`, `onKeyUp`
- 타입: `KeyboardEvent<T>`

### 포커스 이벤트
- `onFocus`, `onBlur`
- 타입: `FocusEvent<T>`

### 폼 이벤트
- `onChange`, `onInput`, `onSubmit`
- 타입: `FormEvent<T>`, `ChangeEvent<T>`

### 마우스 이벤트
- `onClick`, `onDoubleClick`, `onMouseEnter`, `onMouseLeave`, `onMouseMove` 등
- 타입: `MouseEvent<T>`

### 드래그 이벤트
- `onDrag`, `onDragEnd`, `onDragEnter`, `onDragExit`, `onDragLeave`, `onDragOver`, `onDragStart`, `onDrop`
- 타입: `DragEvent<T>`

### 터치 이벤트
- `onTouchCancel`, `onTouchEnd`, `onTouchMove`, `onTouchStart`
- 타입: `TouchEvent<T>`

### UI 이벤트
- `onScroll`
- 타입: `UIEvent<T>`

## 합성 이벤트 사용 시 주의사항

1. **비동기 접근**: 이벤트 핸들러 외부에서 합성 이벤트 객체에 비동기적으로 접근할 경우 문제가 발생할 수 있습니다.

   ```tsx
   // 올바른 사용
   const handleClick = (event: React.MouseEvent) => {
     // 즉시 사용
     console.log(event.target);
     
     // 비동기 콜백에서 필요한 값을 미리 저장
     const target = event.target;
     setTimeout(() => {
       console.log(target);
     }, 1000);
   };
   ```

2. **기본 동작 방지**: `event.preventDefault()`를 사용하여 기본 동작을 방지할 수 있습니다.

   ```tsx
   const handleSubmit = (event: React.FormEvent) => {
     event.preventDefault(); // 폼 제출 기본 동작 방지
     // 폼 처리 로직
   };
   ```

3. **이벤트 버블링 제어**: `event.stopPropagation()`을 사용하여 이벤트 버블링을 제어할 수 있습니다.

   ```tsx
   const handleChildClick = (event: React.MouseEvent) => {
     event.stopPropagation(); // 부모 요소로의 이벤트 전파 중지
     // 클릭 처리 로직
   };
   ```

## 예제 파일 설명

이 디렉토리에는 다음 예제 파일이 포함되어 있습니다:

1. `drag-and-drop.tsx`: 드래그앤드롭 관련 합성 이벤트 예제
2. `event-handlers.tsx`: 다양한 이벤트 핸들러 사용 예제
3. `event-pooling.tsx`: 이벤트 풀링 메커니즘과 React 17 이후 변경점 예제
4. `event-bubbling.tsx`: 이벤트 버블링과 캡처링 동작 방식 예제
5. `common-mistakes.tsx`: 합성 이벤트 사용 시 흔히 발생하는 실수와 해결책 예제

각 예제 파일은 해당 이벤트 타입의 사용법과 함께 중요한 패턴을 보여줍니다.

## 흔히 발생하는 실수와 모범 사례

합성 이벤트를 사용할 때 자주 발생하는 실수와 그 해결책을 알아두면 좋습니다:

1. **이벤트 객체의 비동기적 사용**: React 16 이하에서는 이벤트 풀링으로 인해 이벤트 핸들러가 완료된 후 이벤트 객체의 속성이 모두 `null`로 설정됩니다. 비동기 콜백에서 이벤트 객체를 사용해야 할 경우, 필요한 값을 미리 변수에 저장하거나 `event.persist()`를 호출해야 합니다.

2. **인라인 함수의 과도한 사용**: JSX에 인라인 함수를 직접 작성하면 매 렌더링마다 새로운 함수가 생성되어 불필요한 리렌더링이 발생할 수 있습니다. 대신 컴포넌트 내부에서 함수를 미리 정의하는 것이 좋습니다.

3. **이벤트 핸들러 잘못된 바인딩**: `onClick={handleClick()}`처럼 함수 호출 결과를 이벤트 핸들러에 전달하면, 렌더링 시점에 함수가 실행되고 그 결과가 핸들러로 설정됩니다. 올바른 방법은 `onClick={handleClick}`처럼 함수 참조를 전달하는 것입니다.

4. **조건부 핸들러 생성**: 렌더링마다 다른 핸들러 함수를 생성하는 대신, 하나의 일관된 핸들러 내에서 조건부 로직을 처리하는 것이 좋습니다.

5. **useEffect에서 이벤트 리스너 관리**: useEffect에서 이벤트 리스너를 등록할 때는 반드시 클린업 함수를 포함하고 적절한 의존성 배열을 설정해야 합니다.

## 리액트 17 이후의 변경사항

리액트 17부터는 이벤트 시스템에 몇 가지 중요한 변경사항이 있습니다:

1. **이벤트 위임 방식 변경**: 이전에는 모든 이벤트가 `document`에 위임되었으나, 이제는 리액트 트리의 루트 DOM 컨테이너에 위임됩니다.
2. **이벤트 풀링 제거**: 더 이상 이벤트 객체가 풀링되지 않으므로, 비동기적으로도 이벤트 객체에 접근할 수 있습니다.
3. **onScroll 버블링 중단**: `onScroll` 이벤트가 더 이상 버블링되지 않습니다.
4. **Capture Phase 이벤트 명명 일관성**: 모든 Capture Phase 이벤트 이름이 `onClickCapture`와 같은 형식으로 통일되었습니다.

## 참고 자료

- [리액트 공식 문서 - 합성 이벤트](https://reactjs.org/docs/events.html)
- [리액트 17 릴리즈 노트](https://reactjs.org/blog/2020/08/10/react-v17-rc.html#changes-to-event-delegation) 