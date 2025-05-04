import React, { useState, createContext, useContext, useCallback, useMemo } from 'react';

// 기분(mood) 상태와 상태 변경 함수를 위한 Context 생성
const MoodContext = createContext(null);

// Context Provider 컴포넌트
// mood 상태와 changeMood 함수를 관리하고 하위 컴포넌트에 제공함
const MoodProvider = ({ children }) => {
  const [mood, setMood] = useState('Happy'); // 기분 상태 관리

  // 기분 상태를 토글하는 함수
  // useCallback을 사용하여 메모이제이션하지 않으면 Provider가 리렌더링될 때마다 새로운 함수가 생성됨
  const changeMood = useCallback(() => {
    setMood((prevMood) => (prevMood === 'Happy' ? 'Sad' : 'Happy'));
  }, []);

  // Provider에 전달할 값 객체
  // useMemo를 사용하여 mood 상태가 변경될 때만 새로운 객체가 생성되도록 함
  // 이렇게 하지 않으면 Provider가 리렌더링될 때마다 value 객체의 참조가 변경되어,
  // Context를 사용하는 모든 하위 컴포넌트가 리렌더링될 수 있음 (React 19 포함)
  const contextValue = useMemo(() => ({
    mood,
    changeMood,
  }), [mood, changeMood]);

  console.log('MoodProvider render'); // Provider 리렌더링 확인용 로그

  return (
    <MoodContext.Provider value={contextValue}>
      {children}
    </MoodContext.Provider>
  );
};

// 기분을 표시하는 컴포넌트
const DisplayMood = () => {
  // MoodContext에서 mood 값을 구독함
  const { mood } = useContext(MoodContext);
  console.log('DisplayMood render'); // DisplayMood 리렌더링 확인용 로그

  return (
    <div>
      <h2>Golden Rabbit Mood: {mood}</h2>
      {/* mood 값에 따라 다른 이모지를 표시함 */}
      {mood === 'Happy' ? '😊' : '😢'}
    </div>
  );
};

// 기분 변경 버튼 컴포넌트
const ToggleMoodButton = () => {
  // MoodContext에서 changeMood 함수를 구독함
  const { changeMood } = useContext(MoodContext);
  console.log('ToggleMoodButton render'); // ToggleMoodButton 리렌더링 확인용 로그

  // 버튼 클릭 시 changeMood 함수를 호출함
  return (
    <button onClick={changeMood}>Toggle Mood</button>
  );
};

// 메인 애플리케이션 컴포넌트
const App = () => {
  return (
    // MoodProvider로 하위 컴포넌트를 감싸 Context 값을 제공함
    <MoodProvider>
      <div>
        <h1>Welcome to the Golden Rabbit's World</h1>
        {/* 기분 표시 컴포넌트 */}
        <DisplayMood />
        {/* 기분 변경 버튼 컴포넌트 */}
        <ToggleMoodButton />
      </div>
    </MoodProvider>
  );
};

export default App; 