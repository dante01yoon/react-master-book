import React from "react";

// WrappedComponent에 windowSize prop을 전달하는 HOC (Higher-Order Component) 정의 시작
function withWindowSize(WrappedComponent) {
  // 클래스 컴포넌트를 반환함
  return class extends React.Component {
    // window의 너비와 높이를 상태로 관리함
    state = { width: window.innerWidth, height: window.innerHeight };

    // window 크기 변경 시 호출될 이벤트 핸들러 함수
    handleResize = () => {
      // 상태를 현재 window 크기로 업데이트함
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    };

    // 컴포넌트가 마운트될 때 호출됨
    componentDidMount() {
      // window의 resize 이벤트 리스너를 등록함
      window.addEventListener('resize', this.handleResize);
    }

    // 컴포넌트가 언마운트될 때 호출됨
    componentWillUnmount() {
      // 등록했던 resize 이벤트 리스너를 제거함 (메모리 누수 방지)
      window.removeEventListener('resize', this.handleResize);
    }

    // 컴포넌트 렌더링 함수
    render() {
      // WrappedComponent에 windowSize state와 나머지 props를 전달함
      return <WrappedComponent windowSize={this.state} {...this.props} />;
    }
 };
}
// HOC 정의 끝

// window 크기를 표시하는 간단한 클래스 컴포넌트
class SizeViewer extends React.Component {
 render() {
   // props로 전달받은 windowSize 객체에서 너비와 높이를 추출함
   const { width, height } = this.props.windowSize;
   console.log({width, height}) // 콘솔에 크기 로깅 (디버깅 목적)
   // 현재 window 크기를 화면에 표시함
   return <div>Window size: {width}x{height}</div>;
 }
}

// SizeViewer 컴포넌트를 withWindowSize HOC로 감싸서 WindowSizeViewer 컴포넌트를 생성함
const WindowSizeViewer = withWindowSize(SizeViewer);
// WindowSizeViewer 컴포넌트를 기본 내보내기함
export default WindowSizeViewer;