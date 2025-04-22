import React, { useState } from 'react';

/**
 * 이벤트 풀링(Event Pooling) 예제
 * 
 * React 16 이하에서는 성능 최적화를 위해 SyntheticEvent 객체를 재사용하는
 * '이벤트 풀링' 메커니즘을 사용했습니다. 이로 인해 이벤트 핸들러가 완료된 후에는
 * 이벤트 객체의 모든 속성이 null로 설정되었습니다.
 * 
 * React 17부터는 이 메커니즘이 제거되어 이벤트 객체를 비동기적으로 사용해도
 * 문제가 발생하지 않습니다.
 */

// React 16 이하에서의 이벤트 풀링 문제 예시
function EventPoolingExample() {
  const [message, setMessage] = useState('이벤트를 클릭하세요');
  const [asyncMessage, setAsyncMessage] = useState('');
  
  // React 16 이하에서의 문제 상황
  const handleClickLegacy = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 객체를 비동기적으로 사용하려고 시도
    setTimeout(() => {
      // React 16 이하에서는 이 시점에 event 객체가 이미 재설정됨
      // TypeError 발생 가능성 있음
      try {
        // @ts-ignore: 이 코드는 실제로는 React 16 이하에서 오류 발생
        const eventType = event.type; // React 16에서는 null이 됨
        setAsyncMessage(`비동기 접근 결과 (React 16): ${eventType || 'null'}`);
      } catch (error) {
        setAsyncMessage(`비동기 접근 오류 (React 16): ${error}`);
      }
    }, 0);
    
    // 동기적 사용은 정상 작동
    setMessage(`동기적 접근 결과: ${event.type}`);
  };
  
  // React 16에서의 해결책: event.persist() 사용
  const handleClickLegacyFixed = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 객체 지속 유지
    // event.persist(); // React 16에서 필요한 메서드
    
    setTimeout(() => {
      // event.persist()를 호출했으므로 여전히 유효함
      const eventType = event.type;
      setAsyncMessage(`event.persist() 사용 후 비동기 접근: ${eventType}`);
    }, 0);
    
    setMessage(`동기적 접근 결과: ${event.type}`);
  };
  
  // React 17 이후 정상 동작
  const handleClickModern = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 이벤트 객체를 비동기적으로 사용
    setTimeout(() => {
      // React 17부터는 이벤트 풀링이 제거되어 문제 없음
      const eventType = event.type;
      setAsyncMessage(`비동기 접근 결과 (React 17+): ${eventType}`);
    }, 0);
    
    setMessage(`동기적 접근 결과: ${event.type}`);
  };
  
  // 권장되는 안전한 패턴: 필요한 속성만 미리 추출
  const handleClickSafest = (event: React.MouseEvent<HTMLButtonElement>) => {
    // 필요한 데이터만 미리 추출하여 변수에 저장
    const eventType = event.type;
    const eventTarget = event.currentTarget.textContent;
    
    setTimeout(() => {
      // 추출된 변수 사용 (버전에 관계없이 안전)
      setAsyncMessage(`안전한 접근 방식: ${eventType}, 대상: ${eventTarget}`);
    }, 0);
    
    setMessage(`동기적 접근 결과: ${event.type}`);
  };

  return (
    <div className="event-pooling-container">
      <h2>리액트 이벤트 풀링 예제</h2>
      
      <div className="event-buttons">
        <button onClick={handleClickLegacy} style={{ marginRight: '10px' }}>
          React 16 스타일 (오류 발생 가능)
        </button>
        
        <button onClick={handleClickLegacyFixed} style={{ marginRight: '10px' }}>
          React 16 + event.persist()
        </button>
        
        <button onClick={handleClickModern} style={{ marginRight: '10px' }}>
          React 17+ 스타일
        </button>
        
        <button onClick={handleClickSafest}>
          가장 안전한 방식
        </button>
      </div>
      
      <div className="event-results" style={{ marginTop: '20px' }}>
        <p>{message}</p>
        <p>{asyncMessage}</p>
      </div>
      
      <div className="explanation" style={{ marginTop: '30px', fontSize: '14px', backgroundColor: '#f8f8f8', padding: '15px', borderRadius: '5px' }}>
        <h3>이벤트 풀링(Event Pooling) 이해하기</h3>
        <p>
          <strong>React 16 이하에서의 동작:</strong><br />
          이벤트 핸들러가 호출되고 나면, 합성 이벤트 객체가 이벤트 풀로 반환되어 재사용됩니다.
          이는 이벤트 핸들러가 완료된 후에 이벤트 객체에 접근하면 모든 속성이 null로 설정된다는 것을 의미합니다.
          비동기 콜백에서 이벤트 객체에 접근하려면 <code>event.persist()</code>를 호출해야 했습니다.
        </p>
        <p>
          <strong>React 17 이후의 변경점:</strong><br />
          React 17부터는 이벤트 풀링이 제거되었습니다. 이제 합성 이벤트 객체가 재사용되지 않으므로,
          <code>event.persist()</code>를 호출할 필요가 없으며 비동기 콜백에서도 이벤트 객체에 안전하게 접근할 수 있습니다.
        </p>
        <p>
          <strong>권장되는 안전한 패턴:</strong><br />
          그러나 버전에 관계없이 가장 안전한 방법은 비동기적으로 사용할 이벤트 데이터를 미리 변수에 저장하는 것입니다.
          이 방식은 코드가 명확해지고 이벤트 객체에 대한 의존성을 줄입니다.
        </p>
      </div>
    </div>
  );
}

export default EventPoolingExample; 