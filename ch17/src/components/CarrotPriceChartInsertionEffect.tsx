import React, { useInsertionEffect, useState, useId } from 'react';

// 스타일을 동적으로 주입하고 관리하는 컴포넌트
interface DynamicStyleInjectorProps {
  rule: string; // 주입할 CSS 규칙 문자열
}

const DynamicStyleInjector: React.FC<DynamicStyleInjectorProps> = ({ rule }) => {
  const styleIdSuffix = useId(); // 각 인스턴스별 고유 ID 생성하여 스타일 태그 구분
  const styleElementId = `dynamic-style-${styleIdSuffix}`;

  // useInsertionEffect: DOM 변경 전 동기적으로 실행되어 스타일 삽입
  useInsertionEffect(() => {
    // 이 훅은 CSS-in-JS 라이브러리가 스타일 규칙을 효율적으로 주입하기 위해 사용됨.
    // 브라우저가 레이아웃을 계산하기 전에 스타일이 삽입되어야 깜빡임이나 불필요한 재계산을 방지함.

    // 기존에 동일 ID로 생성된 스타일 태그가 있다면 제거 (스타일 변경 시 대응)
    // 실제 라이브러리는 더 정교한 방식으로 스타일 업데이트를 처리함
    const oldStyleElement = document.getElementById(styleElementId);
    if (oldStyleElement) {
      oldStyleElement.remove();
    }
    
    // 새로운 <style> 태그 생성
    const styleElement = document.createElement('style');
    styleElement.id = styleElementId; // ID 할당하여 추후 제거 용이
    styleElement.innerHTML = rule; // 전달받은 CSS 규칙 설정

    // document.head에 <style> 태그 추가
    // useInsertionEffect는 document.head에 접근 가능
    document.head.appendChild(styleElement);

    // 클린업 함수: 컴포넌트 언마운트 시 또는 rule이 변경되어 이펙트가 재실행되기 직전에 호출
    return () => {
      const styleTagToRemove = document.getElementById(styleElementId);
      if (styleTagToRemove) {
        document.head.removeChild(styleTagToRemove);
      }
    };
  }, [rule, styleElementId]); // 의존성 배열: rule 또는 styleElementId가 변경될 때마다 이펙트 재실행

  // 이 컴포넌트는 UI를 직접 렌더링하지 않고, 전역적인 스타일 주입 역할만 수행
  return null;
};

// 메인 애플리케이션 컴포넌트 (useInsertionEffect 사용 예시)
const App = () => {
  const [boxColor, setBoxColor] = useState('tomato');
  const [showStyledBox, setShowStyledBox] = useState(true);
  const targetDivId = "styled-by-insertion-effect"; // 스타일을 적용할 div의 ID

  // 동적으로 생성할 CSS 규칙
  // #styled-by-insertion-effect 요소에 대한 스타일 정의
  const dynamicRule = `
    #${targetDivId} {
      width: 200px;
      height: 100px;
      background-color: ${boxColor};
      border: 3px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      color: white;
      font-weight: bold;
      margin-top: 20px;
      transition: background-color 0.5s ease; /* 부드러운 색상 변경 효과 */
    }
  `;

  return (
    <div>
      <h2><code>useInsertionEffect</code> 예제</h2>
      <p>
        이 예제는 <code>useInsertionEffect</code>를 사용하여 동적으로 CSS 규칙을 주입하는 방법을 보여줍니다.
        아래 버튼을 클릭하여 박스의 색상을 변경하거나 박스를 숨겼다가 다시 표시해보세요.
      </p>
      <p>
        <strong>주의:</strong> <code>useInsertionEffect</code>는 주로 CSS-in-JS 라이브러리 구현에 사용됩니다.
        일반적인 애플리케이션 코드에서는 직접 사용할 일이 거의 없습니다.
      </p>

      {/* DynamicStyleInjector를 통해 동적 스타일 주입 */}
      {showStyledBox && <DynamicStyleInjector rule={dynamicRule} />}

      {/* 스타일이 적용될 대상 div */}
      {showStyledBox && (
        <div id={targetDivId}>
          색상: {boxColor}
        </div>
      )}

      <div style={{ marginTop: '20px' }}>
        <button 
          onClick={() => setBoxColor(prevColor => prevColor === 'tomato' ? 'dodgerblue' : 'tomato')}
          style={{ marginRight: '10px', padding: '8px 12px' }}
        >
          박스 색상 변경
        </button>
        <button 
          onClick={() => setShowStyledBox(prev => !prev)}
          style={{ padding: '8px 12px' }}
        >
          {showStyledBox ? '박스 숨기기' : '박스 보이기'} (스타일 태그 제거/추가 확인)
        </button>
      </div>

      <div style={{ marginTop: '30px', padding: '10px', border: '1px dashed #ccc' }}>
        <strong>개발자 도구(Elements 탭)에서 <code>&lt;head&gt;</code> 태그 내부를 확인하세요.</strong>
        <p>
          <code>DynamicStyleInjector</code> 컴포넌트가 마운트될 때 <code>id="dynamic-style-..."</code> 형식의 <code>&lt;style&gt;</code> 태그가 추가되고,
          언마운트될 때 제거되는 것을 볼 수 있습니다. 색상 변경 시 해당 <code>&lt;style&gt;</code> 태그의 내용도 업데이트 됩니다.
        </p>
      </div>
    </div>
  );
};

export default App;