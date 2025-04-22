import React, { useState } from 'react';

// 예제 컴포넌트들 임포트
import DragDrop from './drag-and-drop';
import EventHandlers from './event-handlers';
import EventPoolingExample from './event-pooling';
import EventBubblingExample from './event-bubbling';
import CommonMistakes from './common-mistakes';

// 예제 선택 인터페이스 정의
const exampleComponents = {
  'drag-and-drop': {
    title: '드래그앤드롭 예제',
    component: DragDrop
  },
  'event-handlers': {
    title: '이벤트 핸들러 예제',
    component: EventHandlers
  },
  'event-pooling': {
    title: '이벤트 풀링 예제',
    component: EventPoolingExample
  },
  'event-bubbling': {
    title: '이벤트 버블링 예제',
    component: EventBubblingExample
  },
  'common-mistakes': {
    title: '흔한 실수 예제',
    component: CommonMistakes
  }
};

type ExampleKey = keyof typeof exampleComponents;

/**
 * 합성 이벤트 예제 메인 컴포넌트
 * 다양한 합성 이벤트 예제를 선택해서 볼 수 있는 인터페이스 제공
 */
function SyntheticEventExamples() {
  // 현재 선택된 예제
  const [currentExample, setCurrentExample] = useState<ExampleKey>('drag-and-drop');
  
  // 현재 선택된 예제 컴포넌트
  const ExampleComponent = exampleComponents[currentExample].component;
  
  return (
    <div className="synthetic-event-examples">
      <h1>리액트 합성 이벤트(Synthetic Event) 예제</h1>
      
      <p className="intro">
        합성 이벤트는 브라우저의 네이티브 이벤트를 감싸서 크로스 브라우저 호환성을 제공하는 리액트의 이벤트 시스템입니다.
        아래 예제들을 통해 다양한 합성 이벤트의 활용 방법을 확인해보세요.
      </p>
      
      {/* 예제 선택 탭 */}
      <div className="example-tabs" style={{ marginBottom: '20px', borderBottom: '1px solid #ccc' }}>
        {Object.entries(exampleComponents).map(([key, { title }]) => (
          <button
            key={key}
            onClick={() => setCurrentExample(key as ExampleKey)}
            style={{
              padding: '10px 15px',
              margin: '0 5px',
              backgroundColor: currentExample === key ? '#f0f0f0' : 'transparent',
              border: 'none',
              borderBottom: currentExample === key ? '2px solid #007bff' : 'none',
              cursor: 'pointer',
              fontWeight: currentExample === key ? 'bold' : 'normal'
            }}
          >
            {title}
          </button>
        ))}
      </div>
      
      {/* 선택된 예제 표시 */}
      <div className="example-container" style={{ padding: '20px', border: '1px solid #eee', borderRadius: '5px' }}>
        <h2>{exampleComponents[currentExample].title}</h2>
        <ExampleComponent />
      </div>
      
      <div className="footer" style={{ marginTop: '30px', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h3>합성 이벤트 주요 특징</h3>
        <ul>
          <li>브라우저마다 다른 이벤트 API를 일관된 인터페이스로 제공합니다.</li>
          <li>이벤트 위임(Event Delegation)을 통해 성능을 최적화합니다.</li>
          <li>React 17부터는 이벤트 풀링이 제거되어 비동기적으로 이벤트 객체에 접근할 수 있습니다.</li>
          <li>모든 이벤트 핸들러 이름은 낙타 표기법(camelCase)을 사용합니다.</li>
          <li>이벤트 핸들러에는 JSX에서 함수 자체를 전달합니다 (호출 결과가 아님).</li>
        </ul>
      </div>
    </div>
  );
}

export default SyntheticEventExamples; 