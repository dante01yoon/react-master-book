function calculateSomething() {
  // 일반 함수에서 잘못 작성된 예시
  // 커스텀 훅일 경우 use 접두사를 사용한다는 컨벤션을 준수하지 않음
  const [result, setResult] = useState(0);
  // ...
 }
 
class MyComponent extends React.Component {
  componentDidMount() {
    calculateSomething();
    // 클래스 컴포넌트 내부에서는 훅을 호출할 수 없음
    const [count, setCount] = useState(0);
  }
  // ...
 }
 