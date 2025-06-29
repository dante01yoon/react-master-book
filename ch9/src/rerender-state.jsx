import React, { useState, useReducer, Component } from "react";

// 클래스 컴포넌트 예제
class ClassCounter extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  // setState를 사용한 상태 업데이트
  increment = () => {
    this.setState({ count: this.state.count + 1 });
  };

  // forceUpdate를 사용한 강제 리렌더링
  forceUpdateComponent = () => {
    this.forceUpdate(); // 컴포넌트를 강제로 업데이트
  };

  render() {
    console.log('ClassCounter 렌더링');
    return (
      <div className="p-4 border rounded mb-4">
        <h2 className="text-lg font-bold mb-2">클래스 컴포넌트</h2>
        <p>Count: {this.state.count}</p>
        <div className="flex gap-2 mt-2">
          <button 
            onClick={this.increment}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            증가
          </button>
          <button 
            onClick={this.forceUpdateComponent}
            className="bg-gray-500 text-white px-3 py-1 rounded"
          >
            강제 업데이트
          </button>
        </div>
      </div>
    );
  }
}

// 함수형 컴포넌트를 위한 리듀서 함수
const reducer = (state, action) => {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    default:
      return state;
  }
};

// 함수형 컴포넌트 예제
const FunctionCounter = () => {
  // useState를 사용한 상태 관리
  const [count, setCount] = useState(0);
  
  // useReducer를 사용한 상태 관리
  const [reducerState, dispatch] = useReducer(reducer, { count: 0 });
  
  // 함수형 컴포넌트를 위한 올바른 forceUpdate 구현
  const [, setToggle] = useState(false);
  const forceUpdate = () => setToggle(prev => !prev);

  console.log('FunctionCounter 렌더링');
  
  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg font-bold mb-2">함수형 컴포넌트</h2>
      
      <div className="mb-4">
        <h3 className="font-medium">useState 예제</h3>
        <p>Count: {count}</p>
        <button 
          onClick={() => setCount(count + 1)}
          className="bg-green-500 text-white px-3 py-1 rounded mt-2"
        >
          증가
        </button>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium">useReducer 예제</h3>
        <p>Count: {reducerState.count}</p>
        <button 
          onClick={() => dispatch({ type: 'increment' })}
          className="bg-purple-500 text-white px-3 py-1 rounded mt-2"
        >
          증가
        </button>
      </div>
      
      <div>
        <h3 className="font-medium">forceUpdate 구현</h3>
        <button 
          onClick={forceUpdate}
          className="bg-red-500 text-white px-3 py-1 rounded mt-2"
        >
          강제 업데이트
        </button>
        <p className="text-sm mt-1">
          {/* 렌더링 시간을 표시해 강제 업데이트 확인 */}
          현재 시간: {new Date().toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

// 메인 앱 컴포넌트
const RerenderStateExample = () => {
  return (
    <div className="max-w-lg mx-auto my-8 p-4">
      <h1 className="text-2xl font-bold mb-4">리액트 리렌더링 - 상태 변경</h1>
      <ClassCounter />
      <FunctionCounter />
    </div>
  );
};

export default RerenderStateExample; 