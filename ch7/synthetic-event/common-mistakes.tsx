import React, { useState, useEffect } from 'react';

/**
 * 리액트 합성 이벤트 사용 시 흔히 발생하는 실수 예시
 * 
 * 이 컴포넌트는 합성 이벤트 사용 시 발생할 수 있는 일반적인 실수와
 * 그에 대한 올바른 해결책을 보여줍니다.
 */
function CommonMistakes() {
  const [asyncResult, setAsyncResult] = useState<string>('');
  const [inlineResult, setInlineResult] = useState<string>('');
  const [directBindingResult, setDirectBindingResult] = useState<number>(0);
  const [conditionalBindingVisible, setConditionalBindingVisible] = useState<boolean>(true);
  
  // 1. 합성 이벤트의 비동기적 사용 - 잘못된 방법
  const handleClickWrong = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ❌ 잘못된 사용: 비동기 콜백에서 직접 이벤트 객체 사용
    setTimeout(() => {
      // React 16 이하에서는 이벤트 풀링으로 인해 event 객체가 이미
      // 재사용되어 속성이 모두 null이 됨
      try {
        const buttonText = event.currentTarget.textContent;
        setAsyncResult(`[잘못된 방법] 버튼 텍스트: ${buttonText || '(null)'}`);
      } catch (error) {
        setAsyncResult(`[잘못된 방법] 오류: ${error}`);
      }
    }, 100);
  };
  
  // 1. 합성 이벤트의 비동기적 사용 - 올바른 방법
  const handleClickCorrect = (event: React.MouseEvent<HTMLButtonElement>) => {
    // ✅ 올바른 사용: 필요한 값을 먼저 추출
    const buttonText = event.currentTarget.textContent;
    
    setTimeout(() => {
      setAsyncResult(`[올바른 방법] 버튼 텍스트: ${buttonText}`);
    }, 100);

    // React 16 이하에서 필요한 대안
    // event.persist(); // 이벤트 객체를 풀에 반환하지 않고 유지
    // setTimeout(() => { setAsyncResult(`...`); }, 100);
  };
  
  // 2. 인라인 함수의 과도한 사용 - 잘못된 방법
  // ❌ 잘못된 사용: 렌더링마다 새로운 함수 인스턴스 생성
  const handleInlineWrong = () => {
    return (
      <button
        onClick={(e) => {
          // 렌더링할 때마다 새로운 함수가 생성되어 불필요한 리렌더링 유발
          console.log('인라인 함수 호출됨');
          setInlineResult('인라인 함수가 호출되었습니다 - 비효율적');
        }}
      >
        인라인 클릭 (비효율적)
      </button>
    );
  };
  
  // 2. 인라인 함수의 과도한 사용 - 올바른 방법
  // ✅ 올바른 사용: 미리 정의된 함수 핸들러 사용
  const handleInlineClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log('분리된 핸들러 호출됨');
    setInlineResult('분리된 핸들러가 호출되었습니다 - 효율적');
  };
  
  // 3. 잘못된 이벤트 핸들러 바인딩 - 잘못된 방법
  // ❌ 잘못된 사용: 함수 호출 결과를 이벤트 핸들러에 전달
  const incrementCounter = () => {
    setDirectBindingResult(prev => prev + 1);
    return null; // 함수가 실행되고 반환값(null)이 onClick에 할당됨
  };
  
  // 3. 잘못된 이벤트 핸들러 바인딩 - 올바른 방법
  // ✅ 올바른 사용: 함수 자체를 이벤트 핸들러에 전달
  const handleIncrement = () => {
    setDirectBindingResult(prev => prev + 1);
  };
  
  // 4. 잘못된 조건부 이벤트 바인딩 - 잘못된 방법
  // ❌ 잘못된 사용: 조건문으로 이벤트 핸들러를 다르게 바인딩
  const getConditionalHandler = () => {
    // 이런 패턴은 컴포넌트가 리렌더링될 때 핸들러가 교체되어
    // React의 이벤트 최적화를 방해할 수 있음
    if (conditionalBindingVisible) {
      return () => console.log('조건 A 핸들러');
    } else {
      return () => console.log('조건 B 핸들러');
    }
  };
  
  // 4. 조건부 이벤트 처리 - 올바른 방법
  // ✅ 올바른 사용: 핸들러는 일관되게 유지하고 내부에서 조건 처리
  const handleConditionalClick = () => {
    if (conditionalBindingVisible) {
      console.log('조건 A 처리');
    } else {
      console.log('조건 B 처리');
    }
    
    // 상태 토글
    setConditionalBindingVisible(!conditionalBindingVisible);
  };
  
  // 5. useEffect에서 이벤트 리스너 관리 - 잘못된 방법
  // ❌ 잘못된 사용: 의존성 배열 없이 이벤트 리스너 등록
  useEffect(() => {
    const handleResize = () => {
      console.log('창 크기 변경됨');
    };
    
    // 컴포넌트가 리렌더링될 때마다 리스너가 중복 등록됨
    window.addEventListener('resize', handleResize);
    
    // 클린업 함수 누락
  }); // 의존성 배열 누락
  
  // 5. useEffect에서 이벤트 리스너 관리 - 올바른 방법
  // ✅ 올바른 사용: 빈 의존성 배열과 클린업 함수 포함
  useEffect(() => {
    const handleResizeCorrect = () => {
      console.log('창 크기 변경됨 (올바른 방법)');
    };
    
    window.addEventListener('resize', handleResizeCorrect);
    
    // 클린업 함수로 리스너 제거
    return () => {
      window.removeEventListener('resize', handleResizeCorrect);
    };
  }, []); // 빈 의존성 배열로 마운트/언마운트 시에만 실행
  
  return (
    <div className="common-mistakes-container">
      <h2>합성 이벤트 사용 시 흔한 실수</h2>
      
      {/* 1. 합성 이벤트의 비동기적 사용 */}
      <section>
        <h3>1. 합성 이벤트의 비동기적 사용</h3>
        <p className="explanation">
          합성 이벤트 객체는 이벤트 핸들러 완료 후 재설정될 수 있으므로, 
          비동기 코드에서 직접 접근하면 안 됩니다. (특히 React 16 이하)
        </p>
        
        <div className="example">
          <button onClick={handleClickWrong}>
            잘못된 방법으로 클릭
          </button>
          <button onClick={handleClickCorrect} style={{ marginLeft: '10px' }}>
            올바른 방법으로 클릭
          </button>
          <p className="result">{asyncResult}</p>
        </div>
        
        <div className="code-explanation">
          <h4>❌ 잘못된 방법:</h4>
          <pre>
            {`setTimeout(() => {
  // 이 시점에서 event 객체가 이미 재설정됨
  const text = event.currentTarget.textContent;
}, 100);`}
          </pre>
          
          <h4>✅ 올바른 방법:</h4>
          <pre>
            {`// 필요한 값을 미리 추출
const text = event.currentTarget.textContent;
setTimeout(() => {
  // 추출한 값 사용
  setResult(text);
}, 100);`}
          </pre>
        </div>
      </section>
      
      {/* 2. 인라인 함수의 과도한 사용 */}
      <section>
        <h3>2. 인라인 함수의 과도한 사용</h3>
        <p className="explanation">
          JSX에 인라인 함수를 직접 작성하면 매 렌더링마다 새로운 함수가 생성되어
          불필요한 리렌더링이 발생할 수 있습니다.
        </p>
        
        <div className="example">
          {handleInlineWrong()}
          <button onClick={handleInlineClick} style={{ marginLeft: '10px' }}>
            분리된 핸들러 클릭 (효율적)
          </button>
          <p className="result">{inlineResult}</p>
        </div>
        
        <div className="code-explanation">
          <h4>❌ 잘못된 방법:</h4>
          <pre>
            {`<button onClick={(e) => {
  // 매 렌더링마다 새로운 함수가 생성됨
  setResult('clicked');
}}>
  클릭
</button>`}
          </pre>
          
          <h4>✅ 올바른 방법:</h4>
          <pre>
            {`// 컴포넌트 외부에서 함수 정의
const handleClick = (e) => {
  setResult('clicked');
};

// 함수 참조 전달
<button onClick={handleClick}>
  클릭
</button>`}
          </pre>
        </div>
      </section>
      
      {/* 3. 잘못된 이벤트 핸들러 바인딩 */}
      <section>
        <h3>3. 잘못된 이벤트 핸들러 바인딩</h3>
        <p className="explanation">
          이벤트 핸들러에는 함수 참조를 전달해야 하며, 함수 호출 결과를 전달하면 안 됩니다.
        </p>
        
        <div className="example">
          {/* ❌ 잘못된 사용: 렌더링 중에 함수가 즉시 실행되고 그 반환값이 핸들러로 설정됨 */}
          <button onClick={incrementCounter()}>
            잘못된 방법 (렌더링 시 자동 실행)
          </button>
          
          {/* ✅ 올바른 사용: 함수 참조를 전달 */}
          <button onClick={handleIncrement} style={{ marginLeft: '10px' }}>
            올바른 방법 (클릭 시 실행)
          </button>
          <p className="result">카운터 값: {directBindingResult}</p>
        </div>
        
        <div className="code-explanation">
          <h4>❌ 잘못된 방법:</h4>
          <pre>
            {`// 함수가 렌더링 중에 즉시 실행되고, 그 결과(null)가 onClick에 할당됨
<button onClick={incrementCounter()}>클릭</button>`}
          </pre>
          
          <h4>✅ 올바른 방법:</h4>
          <pre>
            {`// 함수 참조를 전달하여 클릭 시 실행되도록 함
<button onClick={handleIncrement}>클릭</button>`}
          </pre>
        </div>
      </section>
      
      {/* 4. 조건부 이벤트 바인딩 */}
      <section>
        <h3>4. 조건부 이벤트 바인딩</h3>
        <p className="explanation">
          렌더링마다 다른 핸들러 함수를 생성하는 대신, 하나의 일관된 핸들러 내에서 
          조건부 로직을 처리하는 것이 좋습니다.
        </p>
        
        <div className="example">
          {/* ❌ 잘못된 사용: 렌더링마다 다른 함수 인스턴스 생성 */}
          <button onClick={getConditionalHandler()}>
            조건부 핸들러 (비효율적)
          </button>
          
          {/* ✅ 올바른 사용: 일관된 핸들러 사용 */}
          <button onClick={handleConditionalClick} style={{ marginLeft: '10px' }}>
            일관된 핸들러 (효율적)
          </button>
          <p className="result">
            현재 조건 상태: {conditionalBindingVisible ? '보임' : '숨김'}
          </p>
        </div>
        
        <div className="code-explanation">
          <h4>❌ 잘못된 방법:</h4>
          <pre>
            {`// 렌더링마다 다른 함수 반환
const getHandler = () => {
  if (condition) {
    return () => handleA();
  } else {
    return () => handleB();
  }
};

<button onClick={getHandler()}>클릭</button>`}
          </pre>
          
          <h4>✅ 올바른 방법:</h4>
          <pre>
            {`// 하나의 일관된 핸들러에서 조건 처리
const handleClick = () => {
  if (condition) {
    handleA();
  } else {
    handleB();
  }
};

<button onClick={handleClick}>클릭</button>`}
          </pre>
        </div>
      </section>
      
      {/* 5. useEffect에서 이벤트 리스너 관리 */}
      <section>
        <h3>5. useEffect에서 이벤트 리스너 관리</h3>
        <p className="explanation">
          useEffect에서 이벤트 리스너를 등록할 때는 반드시 클린업 함수를 포함하고
          적절한 의존성 배열을 설정해야 합니다.
        </p>
        
        <div className="code-explanation">
          <h4>❌ 잘못된 방법:</h4>
          <pre>
            {`useEffect(() => {
  window.addEventListener('resize', handleResize);
  // 클린업 함수 누락
}); // 의존성 배열 누락 - 매 렌더링마다 실행`}
          </pre>
          
          <h4>✅ 올바른 방법:</h4>
          <pre>
            {`useEffect(() => {
  window.addEventListener('resize', handleResize);
  
  // 클린업 함수로 이벤트 리스너 제거
  return () => {
    window.removeEventListener('resize', handleResize);
  };
}, []); // 빈 의존성 배열 - 마운트/언마운트 시에만 실행`}
          </pre>
        </div>
      </section>
      
      <div className="summary" style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f8f8f8', borderRadius: '5px' }}>
        <h3>요약: 합성 이벤트 사용 시 주의사항</h3>
        <ol>
          <li>비동기 코드에서 합성 이벤트 객체에 직접 접근하지 않고, 필요한 값을 미리 추출하세요.</li>
          <li>인라인 함수의 과도한 사용을 피하고, 컴포넌트 내부에서 함수를 미리 정의하세요.</li>
          <li>이벤트 핸들러에는 함수 호출 결과(functionName())가 아닌 함수 참조(functionName)를 전달하세요.</li>
          <li>조건부 로직은 핸들러 내부에서 처리하고, 렌더링마다 다른 함수를 생성하지 마세요.</li>
          <li>useEffect에서 이벤트 리스너를 관리할 때는 항상 클린업 함수와 적절한 의존성 배열을 사용하세요.</li>
        </ol>
      </div>
    </div>
  );
}

export default CommonMistakes; 