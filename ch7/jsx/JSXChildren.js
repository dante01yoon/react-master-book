import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// ======================================================================
// JSXChildren의 기본 유형 예제
// ======================================================================

/**
 * JSXText - 태그 내부의 단순 텍스트
 * 가장 기본적인 형태의 JSXChildren으로 텍스트가 그대로 DOM에 렌더링됨
 */
export const JSXTextExample = () => {
  return (
    <div className="example">
      <h2>1. JSXText 예제</h2>
      <div>안녕하세요, 골든래빗입니다.</div>
      {/* 여러 줄의 텍스트도 가능하지만, 들여쓰기와 줄바꿈은 무시됨 */}
      <div>
        여러 줄의 
        텍스트는 
        공백이 하나로 병합됩니다.
      </div>
    </div>
  );
};

/**
 * JSXElement - 중첩된 JSX 요소
 * 다른 JSX 요소를 자식으로 포함하는 형태
 */
export const JSXElementExample = () => {
  return (
    <div className="example">
      <h2>2. JSXElement 예제</h2>
      <Parent>
        <Child text="첫 번째 자식" />
        <Child text="두 번째 자식" />
      </Parent>
    </div>
  );
};

const Parent = ({ children }) => {
  // children은 자식 요소들의 배열 또는 단일 요소가 됨
  return (
    <div className="parent">
      <h3>부모 컴포넌트</h3>
      <div className="children-container">
        {/* children을 직접 렌더링 */}
        {children}
      </div>
      {/* children의 개수 확인 */}
      <div>자식 요소 개수: {React.Children.count(children)}</div>
    </div>
  );
};

const Child = ({ text }) => {
  return <div className="child">{text}</div>;
};

/**
 * JSXFragment - Fragment를 이용한 자식 요소 그룹화
 * 추가적인 DOM 노드 없이 여러 요소를 그룹화할 때 사용
 */
export const JSXFragmentExample = () => {
  return (
    <div className="example">
      <h2>3. JSXFragment 예제</h2>
      <div className="container">
        <>
          {/* Fragment 내부의 요소들은 부모 요소에 직접 추가됨 */}
          <span>첫 번째 항목</span>
          <span>두 번째 항목</span>
          <span>세 번째 항목</span>
        </>
      </div>
      
      {/* Fragment에 key 속성이 필요한 경우 */}
      <div className="list">
        {['A', 'B', 'C'].map(item => (
          <React.Fragment key={item}>
            <dt>항목 {item}</dt>
            <dd>항목 {item}에 대한 설명</dd>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

// ======================================================================
// JSXChildExpression 예제 - 중괄호({})를 사용한 표현식
// ======================================================================

/**
 * 변수와 표현식 사용
 * JSX 내에서 자바스크립트 변수와 표현식을 사용하는 방법
 */
export const JSXExpressionExample = () => {
  const name = "골든래빗";
  const age = 3;
  const hobbies = ["당근 먹기", "달리기", "낮잠 자기"];
  
  return (
    <div className="example">
      <h2>4. JSXChildExpression 예제</h2>
      
      {/* 단순 변수 사용 */}
      <p>이름: {name}</p>
      
      {/* 계산식 사용 */}
      <p>나이: {age} 살 (토끼 나이로는 {age * 7}살)</p>
      
      {/* 함수 호출 사용 */}
      <p>자기소개: {getIntroduction(name, age)}</p>
      
      {/* 배열 렌더링 */}
      <div>
        <h4>취미:</h4>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// JSX 외부 함수 정의
function getIntroduction(name, age) {
  return `안녕하세요! 저는 ${name}이고, ${age}살입니다.`;
}

// ======================================================================
// 조건부 렌더링 예제
// ======================================================================

/**
 * 조건부 렌더링 패턴
 * JSX에서 조건에 따라 다른 내용을 렌더링하는 다양한 방법
 */
export const ConditionalRenderingExample = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState('visitor'); // 'visitor', 'member', 'admin'
  const [count, setCount] = useState(0);
  
  return (
    <div className="example">
      <h2>5. 조건부 렌더링 예제</h2>
      
      {/* 삼항 연산자 사용 */}
      <div className="login-status">
        {isLoggedIn 
          ? <p className="logged-in">로그인 상태입니다.</p> 
          : <p className="logged-out">로그아웃 상태입니다.</p>
        }
        <button onClick={() => setIsLoggedIn(!isLoggedIn)}>
          {isLoggedIn ? '로그아웃' : '로그인'}
        </button>
      </div>
      
      {/* 함수를 통한 조건부 렌더링 */}
      <div className="user-greeting">
        <h4>사용자 인사말:</h4>
        {renderGreeting(userType)}
        <div>
          <select 
            value={userType} 
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="visitor">방문자</option>
            <option value="member">회원</option>
            <option value="admin">관리자</option>
          </select>
        </div>
      </div>
      
      {/* && 연산자 사용 (주의: 0과 같은 falsy 값에 대한 처리) */}
      <div className="notification-example">
        <h4>알림 메시지 ({count})</h4>
        {/* ❌ 잘못된 방법: count가 0이면 화면에 0이 출력됨 */}
        <div className="incorrect">
          {count && <p>{count}개의 새 메시지가 있습니다.</p>}
        </div>
        
        {/* ✅ 올바른 방법: 명시적 비교 */}
        <div className="correct">
          {count > 0 && <p>{count}개의 새 메시지가 있습니다.</p>}
        </div>
        
        <div>
          <button onClick={() => setCount(c => (c + 1) % 5)}>
            알림 {count > 0 ? '감소' : '증가'}
          </button>
        </div>
      </div>
    </div>
  );
};

// 사용자 타입에 따른 인사말 함수
function renderGreeting(userType) {
  switch (userType) {
    case 'admin':
      return <p className="admin-greeting">관리자님, 환영합니다! 관리 페이지에 접근할 수 있습니다.</p>;
    case 'member':
      return <p className="member-greeting">회원님, 반갑습니다! 오늘도 좋은 하루 되세요.</p>;
    case 'visitor':
    default:
      return <p className="visitor-greeting">방문자님, 안녕하세요! 회원가입하시면 더 많은 기능을 이용할 수 있습니다.</p>;
  }
}

// ======================================================================
// 즉시 실행 함수(IIFE) 및 복잡한 표현식 예제
// ======================================================================

/**
 * 즉시 실행 함수와 복잡한 표현식
 * JSX 내에서 복잡한 로직을 처리하는 방법
 */
export const IIFEExample = () => {
  const data = [
    { id: 1, name: '골디', type: 'animal', active: true },
    { id: 2, name: '포티', type: 'animal', active: false },
    { id: 3, name: '래비', type: 'animal', active: true },
    { id: 4, name: '캐롯', type: 'vegetable', active: true },
  ];
  
  return (
    <div className="example">
      <h2>6. 즉시 실행 함수 예제</h2>
      
      {/* 단순 필터링 로직을 즉시 실행 함수로 구현 */}
      <div className="iife-simple">
        <h4>활성화된 항목만 표시:</h4>
        <ul>
          {(() => {
            // 복잡한 필터링 로직
            const activeItems = data.filter(item => item.active);
            
            // 필터링된 항목을 표시
            return activeItems.map(item => (
              <li key={item.id}>
                {item.name} ({item.type})
              </li>
            ));
          })()}
        </ul>
      </div>
      
      {/* 더 복잡한 로직의 즉시 실행 함수 */}
      <div className="iife-complex">
        <h4>타입별 그룹화:</h4>
        {(() => {
          // 데이터를 타입별로 그룹화
          const groupedData = data.reduce((acc, item) => {
            if (!acc[item.type]) {
              acc[item.type] = [];
            }
            acc[item.type].push(item);
            return acc;
          }, {});
          
          // 그룹화된 데이터를 렌더링
          return Object.entries(groupedData).map(([type, items]) => (
            <div key={type} className="group">
              <h5>{type}</h5>
              <ul>
                {items.map(item => (
                  <li key={item.id} className={item.active ? 'active' : 'inactive'}>
                    {item.name} {!item.active && '(비활성)'}
                  </li>
                ))}
              </ul>
            </div>
          ));
        })()}
      </div>
    </div>
  );
};

// ======================================================================
// 불리언, null, undefined 렌더링 예제
// ======================================================================

/**
 * 특수 값 렌더링
 * React에서 불리언, null, undefined 등이 렌더링되는 방식
 */
export const SpecialValuesExample = () => {
  return (
    <div className="example">
      <h2>7. 특수 값 렌더링 예제</h2>
      
      <div className="special-values">
        <h4>다음 값들은 화면에 렌더링되지 않습니다:</h4>
        <pre>
          {`
<div>불리언(true): {true}</div>
<div>불리언(false): {false}</div>
<div>null: {null}</div>
<div>undefined: {undefined}</div>
          `}
        </pre>
        
        <div className="result">
          <div>불리언(true): {true}</div>
          <div>불리언(false): {false}</div>
          <div>null: {null}</div>
          <div>undefined: {undefined}</div>
        </div>
        
        <h4>그러나 숫자는 렌더링됩니다:</h4>
        <div>숫자 0: {0}</div>
        <div>숫자 1: {1}</div>
        <div>빈 문자열: {""}(보이지 않음)</div>
        <div>공백 문자열: {" "}(공백으로 표시)</div>
      </div>
    </div>
  );
};

// ======================================================================
// 실전 패턴: 합성 컴포넌트 (Compound Components) 예제
// ======================================================================

/**
 * 합성 컴포넌트 패턴
 * 서로 연관된 여러 컴포넌트를 구성하는 패턴으로 JSXChildren을 활용
 */
export const CompoundComponentExample = () => {
  return (
    <div className="example">
      <h2>8. 합성 컴포넌트 패턴 예제</h2>
      
      <Tabs defaultTab="rabbit">
        <Tabs.Tab id="rabbit" title="토끼">
          <h3>토끼에 대한 정보</h3>
          <p>토끼는 긴 귀와 빠른 달리기 능력으로 유명한 포유류입니다.</p>
        </Tabs.Tab>
        
        <Tabs.Tab id="carrot" title="당근">
          <h3>당근에 대한 정보</h3>
          <p>당근은 토끼가 좋아하는 주황색 채소로, 비타민 A가 풍부합니다.</p>
        </Tabs.Tab>
        
        <Tabs.Tab id="forest" title="숲">
          <h3>숲에 대한 정보</h3>
          <p>숲은 다양한 동식물이 살아가는 생태계로, 토끼의 주요 서식지입니다.</p>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

// 탭 컴포넌트
const Tabs = ({ children, defaultTab }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  // 모든 탭의 정보 수집
  const tabs = React.Children.toArray(children).filter(
    child => React.isValidElement(child) && child.type === Tabs.Tab
  );
  
  return (
    <div className="tabs-container">
      {/* 탭 헤더 */}
      <div className="tabs-header">
        {tabs.map((tab) => (
          <button
            key={tab.props.id}
            className={`tab-button ${activeTab === tab.props.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.props.id)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>
      
      {/* 탭 내용 */}
      <div className="tab-content">
        {tabs.find(tab => tab.props.id === activeTab)?.props.children}
      </div>
    </div>
  );
};

// Tab 서브컴포넌트
Tabs.Tab = ({ id, title, children }) => {
  // 이 컴포넌트는 직접 렌더링되지 않고, Tabs 컴포넌트에 의해 처리됨
  return children;
};

// ======================================================================
// 실전 패턴: Render Props 예제
// ======================================================================

/**
 * Render Props 패턴
 * 컴포넌트가 렌더링 로직을 함수로 받아 사용하는 패턴
 */
export const RenderPropsExample = () => {
  return (
    <div className="example">
      <h2>9. Render Props 패턴 예제</h2>
      
      <DataFetcher url="https://api.example.com/rabbits">
        {({ loading, error, data }) => {
          // 로딩 중 상태 처리
          if (loading) {
            return <div className="loading">데이터를 불러오는 중...</div>;
          }
          
          // 에러 상태 처리
          if (error) {
            return <div className="error">에러 발생: {error.message}</div>;
          }
          
          // 데이터 렌더링
          return (
            <div className="data">
              <h3>토끼 목록</h3>
              <ul>
                {/* 실제 API 호출 없이 가상 데이터 사용 */}
                {['골디', '포티', '래비', '홉스'].map(name => (
                  <li key={name}>{name}</li>
                ))}
              </ul>
            </div>
          );
        }}
      </DataFetcher>
    </div>
  );
};

// DataFetcher 컴포넌트 (실제 API 호출은 하지 않음)
const DataFetcher = ({ url, children }) => {
  const [state, setState] = useState({
    loading: true,
    error: null,
    data: null
  });
  
  useEffect(() => {
    // 실제 API 호출 대신 타이머로 흉내내기
    const timer = setTimeout(() => {
      // 90% 확률로 성공, 10% 확률로 실패
      if (Math.random() > 0.1) {
        setState({
          loading: false,
          error: null,
          data: ['골디', '포티', '래비', '홉스'] // 가상 데이터
        });
      } else {
        setState({
          loading: false,
          error: new Error('데이터를 불러오는데 실패했습니다.'),
          data: null
        });
      }
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [url]);
  
  // children을 함수로 호출하고 상태를 전달
  return children(state);
};

// ======================================================================
// 메인 컴포넌트
// ======================================================================

/**
 * 모든 예제를 렌더링하는 메인 컴포넌트
 */
const JSXChildrenDemo = () => {
  return (
    <div className="jsx-children-demo">
      <h1>JSXChildren 예제 모음</h1>
      <p>React에서 JSXChildren을 사용하는 다양한 방법을 보여주는 예제들입니다.</p>
      
      <JSXTextExample />
      <JSXElementExample />
      <JSXFragmentExample />
      <JSXExpressionExample />
      <ConditionalRenderingExample />
      <IIFEExample />
      <SpecialValuesExample />
      <CompoundComponentExample />
      <RenderPropsExample />
    </div>
  );
};

// DOM에 렌더링
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<JSXChildrenDemo />, rootElement);
  }
}

export default JSXChildrenDemo; 