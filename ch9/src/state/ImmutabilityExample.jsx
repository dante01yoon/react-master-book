// ImmutabilityExample 컴포넌트: 불변성을 유지하며 상태를 업데이트하는 예제
const ImmutabilityExample = () => {
  // state: count와 items 배열을 포함하는 객체 상태
  const [state, setState] = useState({ count: 0, items: [] });
 
  // incrementCount 함수: count 상태를 1 증가시키는 함수
  const incrementCount = () => {
    // setState 함수를 사용하여 이전 상태(prevState)를 기반으로 새로운 상태 객체를 생성함
    // 스프레드 연산자(...)를 사용하여 prevState의 모든 속성을 복사하고, count 속성만 업데이트함
    // 이는 객체의 불변성을 유지하는 핵심적인 방법임
    setState(prevState => ({
      ...prevState, // 이전 상태의 모든 속성을 복사함
      count: prevState.count + 1 // count 속성만 새로운 값으로 업데이트함
    }));
  };
 
  // addItem 함수: items 배열에 새로운 아이템을 추가하는 함수
  const addItem = item => {
    // setState 함수를 사용하여 이전 상태(prevState)를 기반으로 새로운 상태 객체를 생성함
    // 스프레드 연산자(...)를 사용하여 prevState의 모든 속성을 복사하고, items 배열만 업데이트함
    setState(prevState => ({
      ...prevState, // 이전 상태의 모든 속성을 복사함
      // items 배열 또한 불변성을 유지하기 위해 스프레드 연산자를 사용하여 새로운 배열을 생성함
      // 기존 prevState.items 배열의 모든 요소를 복사하고, 새로운 item을 배열 끝에 추가함
      items: [...prevState.items, item]
    }));
  };
  // ... 이하 생략
}
 