import { useState } from 'react';

function ImmutabilityBadExample() {
  const [user, setUser] = useState({ name: '철수', age: 30 });

  const handleIncorrectUpdate = () => {
    // 나쁜 예시: 상태 객체를 직접 수정함
    // user 객체의 참조가 변경되지 않음
    user.age = 31;
    setUser(user); // 동일한 참조의 객체를 전달하므로 리액트는 상태 변경을 감지하지 못함
    console.log('업데이트 후 user 상태:', user); // { name: '철수', age: 31 }
    // 콘솔에는 변경된 값이 찍히지만, 화면은 리렌더링되지 않음
  };

  return (
    <div>
      <p>
        이름: {user.name}, 나이: {user.age}
      </p>
      <button onClick={handleIncorrectUpdate}>
        나이를 잘못된 방식으로 증가
      </button>
      <p style={{ marginTop: '10px', color: 'red' }}>
        위 버튼을 눌러도 화면의 나이는 바뀌지 않습니다. <br />
        객체의 참조가 같아 리액트가 변화를 감지하지 못하기 때문입니다.
      </p>
    </div>
  );
}

export default ImmutabilityBadExample;