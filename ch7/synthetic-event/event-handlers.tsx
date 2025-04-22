import React, { useState, useEffect, useRef } from 'react';

// 다양한 이벤트 핸들러 예제 컴포넌트
function EventHandlers() {
  // 상태 정의
  const [clickCount, setClickCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // 이벤트 핸들러를 테스트할 DOM 요소의 참조
  const divRef = useRef<HTMLDivElement>(null);
  
  // 1. 클릭 이벤트 핸들러
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 합성 이벤트에서 제공하는 정보 사용
    console.log('클릭된 버튼:', event.currentTarget.textContent);
    console.log('클릭 좌표:', { x: event.clientX, y: event.clientY });
    
    // 상태 업데이트
    setClickCount(prev => prev + 1);
    
    // 이벤트 전파 중지 (버블링 방지)
    // event.stopPropagation();
    
    // 네이티브 이벤트 접근
    console.log('네이티브 이벤트 타입:', event.nativeEvent.type);
  };
  
  // 2. 입력 필드 변경 이벤트 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // input 요소의 값을 상태로 저장
    setInputValue(event.target.value);
  };
  
  // 3. 폼 제출 이벤트 핸들러
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    // 기본 제출 동작 방지
    event.preventDefault();
    console.log('제출된 데이터:', formData);
    
    // 폼 제출 후 필드 초기화
    setFormData({ name: '', email: '' });
  };
  
  // 4. 폼 필드 변경 핸들러
  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // 동적 객체 키를 사용하여 상태 업데이트
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // 5. 키보드 이벤트 핸들러
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    console.log('누른 키:', event.key);
    console.log('키 코드:', event.keyCode);
    console.log('Ctrl 키 누름:', event.ctrlKey);
    
    // Enter 키 감지 예시
    if (event.key === 'Enter') {
      console.log('Enter 키가 눌렸습니다!');
      // 필요한 작업 수행
    }
  };
  
  // 6. 마우스 이벤트 핸들러
  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    // 요소 기준 상대 좌표 계산
    if (divRef.current) {
      const rect = divRef.current.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };
  
  // 7. 마우스 호버 이벤트 핸들러
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
  };
  
  // 8. 포커스 이벤트 핸들러
  const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('포커스 획득:', event.target.name);
    // 포커스 시 스타일 변경 등의 작업
  };
  
  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    console.log('포커스 잃음:', event.target.name);
    // 입력값 검증 등의 작업
  };
  
  // 9. 윈도우 이벤트 리스너를 위한 useEffect
  useEffect(() => {
    // 전역 이벤트 핸들러
    const handleWindowResize = (event: UIEvent) => {
      console.log('윈도우 크기 변경:', {
        width: window.innerWidth,
        height: window.innerHeight
      });
    };
    
    // 이벤트 리스너 추가
    window.addEventListener('resize', handleWindowResize);
    
    // 클린업 함수: 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  
  return (
    <div className="event-handlers-container">
      <h2>리액트 합성 이벤트 핸들러 예제</h2>
      
      {/* 1. 클릭 이벤트 */}
      <section>
        <h3>클릭 이벤트</h3>
        <button onClick={handleClick}>
          클릭하세요
        </button>
        <p>클릭 횟수: {clickCount}</p>
      </section>
      
      {/* 2. 입력 이벤트 */}
      <section>
        <h3>입력 이벤트</h3>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="여기에 입력하세요"
        />
        <p>입력값: {inputValue}</p>
      </section>
      
      {/* 3. 폼 이벤트 */}
      <section>
        <h3>폼 이벤트</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">이름:</label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              required
            />
          </div>
          <button type="submit">제출</button>
        </form>
      </section>
      
      {/* 4. 마우스 이벤트 */}
      <section>
        <h3>마우스 이벤트</h3>
        <div
          ref={divRef}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '200px',
            height: '200px',
            backgroundColor: isHovering ? '#f0f0f0' : '#d0d0d0',
            position: 'relative',
            cursor: 'crosshair',
            border: '1px solid #ccc'
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: mousePosition.x,
              top: mousePosition.y,
              width: '10px',
              height: '10px',
              backgroundColor: 'red',
              borderRadius: '50%',
              transform: 'translate(-50%, -50%)',
              pointerEvents: 'none',
              opacity: isHovering ? 1 : 0
            }}
          />
          <p style={{ textAlign: 'center', marginTop: '80px' }}>
            마우스를 여기에서 움직여보세요
          </p>
        </div>
        <p>
          좌표: X: {mousePosition.x.toFixed(0)}, Y: {mousePosition.y.toFixed(0)}
        </p>
      </section>
      
      <div className="explanation" style={{ marginTop: '30px', fontSize: '14px' }}>
        <p>
          위 예제들은 리액트 합성 이벤트(SyntheticEvent)의 다양한 활용 방법을 보여줍니다.
          리액트의 합성 이벤트는 브라우저의 네이티브 이벤트를 감싸 크로스 브라우저 호환성을 제공합니다.
        </p>
      </div>
    </div>
  );
}

export default EventHandlers; 