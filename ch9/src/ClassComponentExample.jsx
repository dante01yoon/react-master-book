import React from 'react';

// 클래스 컴포넌트 선언
class ClassComponentExample extends React.Component {
  // 생성자: 컴포넌트 인스턴스가 생성될 때 호출됩니다.
  constructor(props) {
    super(props); // React.Component의 생성자를 호출합니다.

    // state 초기화: 각 인스턴스는 자신만의 독립적인 state를 가집니다.
    this.state = {
      count: 0,
    };

    // 메서드 바인딩: 클래스 메서드 내부에서 'this'가
    // 현재 인스턴스를 정확히 가리키도록 보장합니다.
    // 화살표 함수를 사용하면 이 과정이 필요 없을 수도 있습니다.
    this.incrementCount = this.incrementCount.bind(this);

    console.log('ClassComponentExample 인스턴스 생성됨:', this);
  }

  // 생명주기 메서드: 인스턴스가 DOM에 마운트된 후 호출됩니다.
  componentDidMount() {
    console.log('ClassComponentExample 인스턴스 마운트됨:', this);
    // 여기서 this는 현재 컴포넌트 인스턴스를 가리킵니다.
    // 예를 들어, this.state.count에 접근할 수 있습니다.
  }

  // 생명주기 메서드: 인스턴스가 DOM에서 언마운트되기 직전에 호출됩니다.
  componentWillUnmount() {
    console.log('ClassComponentExample 인스턴스 언마운트됨:', this);
  }

  // 클래스 메서드: 인스턴스 메서드로서 호출됩니다.
  incrementCount() {
    // this.setState를 사용하여 인스턴스의 state를 업데이트합니다.
    // this는 이 메서드가 호출된 인스턴스를 가리킵니다.
    this.setState({ count: this.state.count + 1 });
    console.log('incrementCount 호출됨. 현재 this:', this);
  }

  // 렌더 메서드: 각 인스턴스는 자신의 state와 props를 기반으로
  // UI를 렌더링합니다.
  render() {
    console.log('ClassComponentExample 렌더링 중. 현재 this:', this);
    return (
      <div>
        <h2>클래스 컴포넌트 예제</h2>
        {/* this.state를 통해 인스턴스의 현재 count 값을 표시합니다. */}
        <p>현재 카운트: {this.state.count}</p>
        {/* onClick 핸들러는 인스턴스의 incrementCount 메서드를 호출합니다. */}
        <button onClick={this.incrementCount}>카운트 증가</button>
        {/* props는 생성 시 전달된 값을 인스턴스별로 가집니다. */}
        <p>전달된 메시지: {this.props.message || '기본 메시지'}</p>
      </div>
    );
  }
}

export default ClassComponentExample; 