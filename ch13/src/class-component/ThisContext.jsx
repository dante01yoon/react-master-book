import React from 'react';

/**
 * 클래스 컴포넌트에서 this 컨텍스트가 어떻게 동작하는지 보여주는 예제 컴포넌트
 */
class ThisContextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: 'this 컨텍스트 예제',
    };

    // ➊ 방법 1: 생성자에서 this를 바인딩 (가장 일반적인 해결책)
    this.handleIncrementBound = this.handleIncrementBound.bind(this);
  }

  // ➋ this가 바인딩되지 않아 버튼 클릭 시 'this'는 undefined가 됨 (에러 발생)
  handleIncrementUnbound() {
    // 'this'가 undefined이므로 this.setState를 호출할 수 없음
    console.log('Unbound this:', this);
    // 다음 줄에서 TypeError 발생: Cannot read properties of undefined (reading 'setState')
    this.setState({ count: this.state.count + 1 });
  }

  // ➌ 방법 1: 생성자에서 바인딩된 메서드
  handleIncrementBound() {
    console.log('Bound this:', this);
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  // ➍ 방법 2: 클래스 필드 + 화살표 함수를 사용해 this를 자동으로 바인딩
  handleIncrementArrow = () => {
    console.log('Arrow function this:', this);
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <p>Count: {this.state.count}</p>
        
        
          {/* // ➋ 아래 버튼 클릭 시 handleIncrementUnbound의 this가 undefined이므로 에러 발생함 */}
          {/* <button onClick={this.handleIncrementUnbound}>
            증가 (Unbound - 에러 발생)
          </button> */}
       

        <button onClick={this.handleIncrementBound}>
          증가 (생성자에서 바인딩)
        </button>

        <button onClick={this.handleIncrementArrow}>
          증가 (화살표 함수)
        </button>
      </div>
    );
  }
}

export default ThisContextExample;
