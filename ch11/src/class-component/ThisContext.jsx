import React from 'react';

class ThisContextExample extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      message: 'this 컨텍스트 예제',
    };

    // 방법 1: 생성자에서 this를 바인딩함 (가장 일반적인 해결책)
    this.handleIncrementBound = this.handleIncrementBound.bind(this);
  }

  // this가 바인딩되지 않아 버튼 클릭 시 'this'는 undefined가 됨 (에러 발생)
  handleIncrementUnbound() {
    // 'this'가 undefined이므로 this.setState를 호출할 수 없음
    console.log('Unbound this:', this);
    // 다음 줄에서 TypeError 발생: Cannot read properties of undefined (reading 'setState')
    // this.setState({ count: this.state.count + 1 });
  }

  // 방법 1: 생성자에서 바인딩된 메서드
  handleIncrementBound() {
    console.log('Bound this:', this);
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  // 방법 2: 클래스 필드 + 화살표 함수를 사용해 this를 자동으로 바인딩함
  handleIncrementArrow = () => {
    console.log('Arrow function this:', this);
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };

  render() {
    return (
      <div>
        <h1>{this.state.message}</h1>
        <p>카운트: {this.state.count}</p>

        {/* 
          에러 발생 케이스: 
          this.handleIncrementUnbound를 직접 호출하면, 
          해당 함수 내의 'this'는 ThisContextExample 인스턴스를 가리키지 않음.
          엄격 모드(Strict Mode)에서는 undefined가 되고, 비엄격 모드에서는 window 객체가 될 수 있음.
          React 클래스 컴포넌트 메서드는 기본적으로 이벤트 핸들러로 전달될 때 this 컨텍스트를 잃음.
        */}
        <button onClick={this.handleIncrementUnbound}>
          증가 (Unbound - 에러 발생 가능성)
        </button>

        {/* 방법 1: 생성자에서 바인딩된 메서드 사용 */}
        <button onClick={this.handleIncrementBound}>
          증가 (Bound in constructor)
        </button>

        {/* 방법 2: 화살표 함수로 정의된 메서드 사용 */}
        <button onClick={this.handleIncrementArrow}>
          증가 (Arrow function)
        </button>

        {/* 
          방법 3: 렌더링 시점에 화살표 함수 내부에서 호출 (권장되지 않음)
          매 렌더링 시 새로운 함수가 생성되므로 성능에 영향을 줄 수 있음.
          간단한 경우나 자식 컴포넌트에 추가적인 인자를 전달해야 할 때 제한적으로 사용됨.
        */}
        <button onClick={() => {
          console.log('Inline arrow function this:', this);
          this.setState((prevState) => ({ count: prevState.count + 1 }));
        }}>
          증가 (Inline arrow function)
        </button>

        <p style={{ marginTop: '10px', color: 'gray', fontSize: '0.9em' }}>
          개발자 콘솔에서 각 버튼 클릭 시 'this'가 무엇을 가리키는지 확인해보세요.
          <br />
          'Unbound' 버튼은 에러를 발생시키거나 (Strict Mode), 의도치 않은 동작을 할 수 있습니다.
          <br />
          (실제 에러를 보려면 handleIncrementUnbound 메서드 내부의 주석 처리된 this.setState 호출을 활성화하세요.)
        </p>
      </div>
    );
  }
}

export default ThisContextExample;
