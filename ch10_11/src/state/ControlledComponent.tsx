import { useState } from 'react';

export default function ControlledComponentExample() {
  const [inputValue, setInputValue] = useState<string>('');

  // <input> 요소의 값이 변경될 때 호출되는 이벤트 핸들러
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.value로 사용자의 최신 입력값에 접근
    // 입력값으로 inputValue 상태를 업데이트함
    // 상태 업데이트는 컴포넌트 리렌더링을 유발하고, <input>의 value는 새로운 상태를 반영
    setInputValue(event.target.value);
  };

  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '1px solid #4CAF50',
        borderRadius: '4px',
        backgroundColor: '#f0fff0',
      }}
    >
      <h3>제어 컴포넌트 (Controlled Component) 예제</h3>
      {/* ➊ */}
      <input
        type="text"
        value={inputValue} // React 상태를 input 요소의 값으로 설정 (상태 -> 뷰)
        onChange={handleChange} // 사용자 입력 시 상태를 업데이트 (뷰 이벤트 -> 상태)
        placeholder="여기에 입력하세요..."
        style={{
          padding: '10px',
          marginRight: '10px',
          width: '250px',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      />

      <p style={{ marginTop: '15px', fontSize: '1.1em' }}>
        현재 입력된 값: <strong>{inputValue || '(입력 없음)'}</strong>
      </p>
    </div>
  );
}
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
