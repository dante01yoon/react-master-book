import React, { useState } from 'react';

const ControlledComponentExample = () => {
  // 1. 상태(state) 정의: 입력 필드의 값을 저장하고 관리함
  // inputValue는 현재 입력 필드의 값이며, setInputValue는 이 값을 변경하는 함수임
  const [inputValue, setInputValue] = useState<string>('');

  // 2. 이벤트 핸들러 정의: <input> 요소의 값이 변경될 때마다 호출됨
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.value는 사용자가 입력한 최신 값임
    // 이 값으로 inputValue 상태를 업데이트함
    // 상태가 업데이트되면 컴포넌트는 리렌더링되고, <input>의 value 어트리뷰트는 새로운 inputValue를 반영함
    setInputValue(event.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', border: '1px solid #4CAF50', borderRadius: '4px', backgroundColor: '#f0fff0' }}>
      <h3>제어 컴포넌트 (Controlled Component) 예제</h3>
      
      {/*
        <input> 요소의 value 어트리뷰트에 React 상태(inputValue)를 바인딩함.
        사용자가 입력할 때마다 onChange 이벤트가 발생하고, handleChange 함수가 호출됨.
        handleChange 함수는 inputValue 상태를 사용자의 입력값으로 업데이트함.
        이러한 방식으로 React 상태가 <input> 요소의 값을 "제어"하게 됨.
        이는 React에서 폼 데이터를 다루는 표준적인 방법으로, 데이터 흐름을 명확하게 함.
      */}
      <input
        type="text"
        value={inputValue} // React 상태(inputValue)를 input 요소의 값으로 설정 (상태 -> 뷰)
        onChange={handleChange} // 사용자 입력 시 handleChange 함수를 호출하여 상태를 업데이트 (뷰 이벤트 -> 상태 업데이트)
        placeholder="여기에 입력하세요..."
        style={{ padding: '10px', marginRight: '10px', width: '250px', border: '1px solid #ccc', borderRadius: '4px' }}
      />
      
      <p style={{ marginTop: '15px', fontSize: '1.1em' }}>
        현재 입력된 값: <strong>{inputValue || '(입력 없음)'}</strong> {/* 현재 상태 값을 화면에 실시간으로 표시함 */}
      </p>
    </div>
  );
};

export default ControlledComponentExample;

/*
  // 애플리케이션에서 이 컴포넌트를 사용하려면:
  // import ControlledComponentExample from './path/to/ControlledComponentExample';
  //
  // function App() {
  //   return (
  //     <div>
  //       <h1>내 애플리케이션</h1>
  //       <ControlledComponentExample />
  //     </div>
  //   );
  // }
  // export default App;
*/
