import React, { createContext, useState, use } from 'react';

// 1. 컨텍스트 정의
// ThemeContext는 애플리케이션의 테마 값(예: 'light' 또는 'dark')을 전달함
const ThemeContext = createContext<string | null>(null);

// 컴포넌트 Props 정의
interface ConditionalReaderProps {
  // 이 prop 값에 따라 컨텍스트를 읽을지 여부가 결정됨
  isActive: boolean;
}

// `use` API를 사용하여 조건부로 컨텍스트를 읽는 컴포넌트
// 이 컴포넌트의 정의가 사용자의 문서에 포함될 핵심 예제 코드임
function ConditionalReaderWithUse({ isActive }: ConditionalReaderProps) {
  // isActive가 false이면, 컨텍스트를 읽기 전에 조기 반환함
  // 이는 불필요한 컨텍스트 접근 및 관련 로직 실행을 방지함
  if (!isActive) {
    return <p>컴포넌트 비활성화 상태: 컨텍스트 읽기를 건너뜀.</p>;
  }

  // isActive가 true인 경우에만 `use` 훅을 호출하여 컨텍스트 값을 읽음
  // `use` API는 조건문이나 반복문 내부에서도 호출이 가능하여,
  // 기존 `useContext`의 최상위 레벨 호출 규칙으로부터 자유로움
  const theme = use(ThemeContext);

  // 컨텍스트 값이 없는 경우 (예: ThemeContext.Provider가 상위에 없거나 value가 null인 경우) 처리
  if (theme === null) {
    return <p>테마 정보를 찾을 수 없음 (ThemeProvider 설정 및 값 확인 필요).</p>;
  }

  // 성공적으로 컨텍스트 값을 읽어와 UI에 표시함
  return <p style={{ color: theme === 'dark' ? 'white' : 'black', background: theme === 'dark' ? 'black' : 'white', padding: '10px', border: '1px dashed #ccc' }}>현재 활성 테마 (<code>use</code> 사용): {theme}</p>;
}

// --- 예제 시연을 위한 전체 애플리케이션 ---
// 이 부분은 `ConditionalReaderWithUse` 컴포넌트의 동작을 보여주기 위한 것으로,
// 사용자의 문서에는 포함되지 않아도 됨 (핵심은 위 컴포넌트 자체임)
export default function EarlyReturnExampleApp() {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('dark');
  const [componentActive, setComponentActive] = useState(true);

  // 테마를 'light'와 'dark' 사이에서 토글하는 함수
  const toggleTheme = () => {
    setCurrentTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // `ConditionalReaderWithUse` 컴포넌트의 활성화 상태를 토글하는 함수
  const toggleComponentActivity = () => {
    setComponentActive(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={currentTheme}>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px', maxWidth: '600px', margin: 'auto' }}>
        <h2 style={{ borderBottom: '2px solid #666', paddingBottom: '10px', color: '#333' }}>
          React 19 <code>use</code> 훅: 조건부 컨텍스트 읽기 및 조기 반환 예제
        </h2>
        
        <p style={{ fontSize: '1.1em', lineHeight: '1.6', color: '#444' }}>
          이 예제는 React 19에 도입된 <code>use</code> 훅을 사용하여, 특정 조건이 충족될 때만 컨텍스트 값을 읽고,
          그렇지 않은 경우에는 컴포넌트 로직에서 조기 반환(early return)하는 고급 패턴을 보여줍니다.
        </p>

        <div style={{ 
          margin: '25px 0', 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h4 style={{ marginTop: '0', color: '#555' }}>제어판</h4>
          <button 
            onClick={toggleTheme} 
            style={{ 
              marginRight: '15px', 
              padding: '10px 15px', 
              cursor: 'pointer', 
              border: 'none', 
              borderRadius: '4px', 
              backgroundColor: '#007bff', 
              color: 'white',
              fontSize: '1em'
            }}
          >
            테마 변경 (현재: {currentTheme})
          </button>
          <button 
            onClick={toggleComponentActivity}
            style={{ 
              padding: '10px 15px', 
              cursor: 'pointer', 
              border: '1px solid #ccc', 
              borderRadius: '4px', 
              backgroundColor: '#f0f0f0',
              fontSize: '1em'
            }}
          >
            <code>ConditionalReaderWithUse</code> 컴포넌트 {componentActive ? "비활성화" : "활성화"}
          </button>
        </div>

        <div style={{ 
          padding: '20px', 
          border: '1px solid #ccc', 
          borderRadius: '8px',
          backgroundColor: '#fff',
          minHeight: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <ConditionalReaderWithUse isActive={componentActive} />
        </div>
        
        <div style={{ marginTop: '30px', fontSize: '0.95em', color: '#555', lineHeight: '1.7', borderTop: '1px dashed #eee', paddingTop: '20px' }}>
          <p>
            <strong>주요 동작 설명:</strong>
          </p>
          <ul style={{ paddingLeft: '20px' }}>
            <li><code>ConditionalReaderWithUse</code> 컴포넌트는 <code>isActive</code> prop의 값에 따라 다르게 동작함.</li>
            <li><code>isActive</code>가 <code>true</code>이면: <code>use(ThemeContext)</code>를 호출하여 현재 테마({currentTheme})를 읽고 화면에 표시함.</li>
            <li><code>isActive</code>가 <code>false</code>이면: <code>use(ThemeContext)</code>를 호출하기 <strong>전에</strong> 조기 반환하여, 불필요한 컨텍스트 접근 및 관련 연산을 수행하지 않음.</li>
          </ul>
          <p>
            이러한 <code>use</code> 훅의 특징은 개발자가 컴포넌트 내에서 보다 유연하고 직관적인 조건부 로직을 작성할 수 있게 하며,
            리액트의 기존 훅 규칙(예: <code>useContext</code>는 최상위 레벨에서만 호출)에 대한 예외를 제공하여 코드 가독성과 효율성을 높일 수 있음.
          </p>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}
