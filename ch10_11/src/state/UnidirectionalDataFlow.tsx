import { useState } from 'react';

// --- 자식 컴포넌트 1: 데이터를 표시하는 역할 ---
interface DisplayComponentProps {
  message: string; // 부모로부터 전달받는 메시지
}

const DisplayComponent = ({ message }: DisplayComponentProps) => {
  return (
    <div
      style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}
    >
      <h4>표시 컴포넌트 (자식)</h4>
      <p>
        수신된 메시지: <strong>{message}</strong>{' '}
        {/* 부모로부터 받은 메시지를 화면에 표시함 */}
      </p>
    </div>
  );
};

// --- 자식 컴포넌트 2: 사용자 입력을 받아 부모에게 상태 변경을 요청하는 역할 ---
interface InputComponentProps {
  onMessageChange: (newMessage: string) => void; // 메시지 변경을 부모에게 알리는 콜백 함수
}

const InputComponent = ({ onMessageChange }: InputComponentProps) => {
  const [inputValue, setInputValue] = useState(''); // 내부 입력 필드 상태

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value); // 입력값 변경 시 내부 상태 업데이트함
  };

  const handleSubmit = () => {
    onMessageChange(inputValue); // 부모에게 새 메시지를 전달하여 상태 변경을 요청함
    setInputValue(''); // 입력 필드 초기화함
  };

  return (
    <div
      style={{ border: '1px solid #eee', padding: '10px', marginTop: '10px' }}
    >
      <h4>입력 컴포넌트 (자식)</h4>
      <input
        type="text"
        value={inputValue}
        onChange={handleChange}
        placeholder="새 메시지 입력"
        style={{ marginRight: '10px', padding: '5px' }}
      />
      <button onClick={handleSubmit} style={{ padding: '5px 10px' }}>
        메시지 업데이트 요청
      </button>{' '}
      {/* 버튼 클릭 시 handleSubmit 호출함 */}
    </div>
  );
};

// --- 부모 컴포넌트 ---
const ParentComponent = () => {
  // ➊ currentMessage는 이 컴포넌트가 소유하고 관리하는 상태(state)이며,
  // 이 상태가 UI를 표현하는 데이터의 유일한 출처(Single Source of Truth)가 됨
  const [currentMessage, setCurrentMessage] = useState('초기 메시지입니다.');

  // ➋ 상태 변경 로직은 항상 상태를 소유한 부모 컴포넌트에서 관리됨
  const handleMessageUpdate = (newMessage: string) => {
    if (newMessage.trim() === '') {
      alert('메시지를 입력해주세요.');
      return;
    }
    setCurrentMessage(newMessage); // 상태를 업데이트하여 단방향 데이터 흐름을 발생시킴
  };

  return (
    <div>
      {/*
        ➌ ParentComponent가 상태(currentMessage)를 소유함
        이 상태는 DisplayComponent로 props(message)를 통해 아래로 전달됨 (단방향 데이터 흐름: 부모 -> 자식)
        DisplayComponent는 이 데이터를 받아 화면에 표시하며, 직접 수정할 수 없음 (단방향 바인딩)
      */}
      <DisplayComponent message={currentMessage} />

      {/*
        ➍ InputComponent는 사용자의 입력을 받아 ParentComponent의 상태 변경을 "요청"함
        InputComponent는 onMessageChange prop으로 handleMessageUpdate 함수를 전달받음
        실제 상태 변경 로직은 ParentComponent의 handleMessageUpdate 함수 내에서 이루어짐
        이것은 데이터 변경이 항상 상태를 소유한 컴포넌트(ParentComponent)에서 시작되어
        하위 컴포넌트로 전파되는 단방향 흐름을 명확히 보여줌 (이벤트 흐름: 자식 -> 부모)
      */}
      <InputComponent onMessageChange={handleMessageUpdate} />
    </div>
  );
};

// --- 전체 예제 컨테이너 ---
const UnidirectionalDataFlowExample = () => {
  return (
    <div
      style={{
        padding: '20px',
        fontFamily: 'Arial, sans-serif',
        border: '2px solid #007bff',
        borderRadius: '8px',
        backgroundColor: '#f0f8ff',
      }}
    >
      <h2>단방향 데이터 흐름 및 단방향 바인딩 예제</h2>
      <ParentComponent />
    </div>
  );
};

export default UnidirectionalDataFlowExample;