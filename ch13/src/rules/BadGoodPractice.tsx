import React, { useState, useEffect } from 'react';

// 타입 정의 추가
interface User {
  name: string;
}

interface Item {
  id: string;
  name: string;
}

interface TraverseComponentProps {
  user: User | null; // user는 null일 수도 있음
  items: Item[] | null; // items는 null일 수도 있음
}

/**
 * 훅을 잘못 사용한 컴포넌트 예시
 * 실제로는 ESLint 규칙(eslint-plugin-react-hooks)에 의해 에러가 발생함
 */
function TraverseComponent({ user, items }: TraverseComponentProps) { // 프롭스 타입 적용
  // ➊ 조건문 내 훅 호출: user 값에 따라 훅 호출 여부가 달라짐
  if (user) {
    // 다음 코드는 "React Hook "useState" is called conditionally." 에러를 발생시킴
    // const [userStatus, setUserStatus] = useState<string>('active'); // 타입 명시
    
    // useEffect 역시 조건부로 호출될 수 없음
    // useEffect(() => {
    //   console.log('User status effect');
    // }, [userStatus]);
  }

  // ➋ 반복문 내 훅 호출: items 배열의 길이에 따라 훅 호출 횟수가 달라짐
  if (items && items.length > 0) {
    items.forEach((item: Item) => { // 파라미터 타입 적용
      // 다음 코드는 "React Hook "useState" is called in a loop." 에러를 발생시킴
      // const [itemSelected, setItemSelected] = useState<boolean>(false); // 타입 명시
    });
  }

  const handleItemClick = (itemId: string) => { // 파라미터 타입 적용
    // ➌ 중첩 함수(이벤트 핸들러) 내 훅 호출: 이벤트 핸들러 내부에서 훅 직접 호출
    // 다음 코드는 "React Hook "useState" is called in function "handleItemClick"
    // which is neither a React function component or a custom React Hook function." 에러를 발생시킴
    // const [interactionTime, setInteractionTime] = useState<number>(Date.now()); // 타입 명시
    // console.log(`Item ${itemId} clicked at ${interactionTime}`);
  };

  // 위 예시들은 훅 규칙 위반을 보여주기 위한 것으로, 실제 렌더링 로직은 생략함.
  // 주석 처리된 부분은 실제 에러를 유발하는 코드임.
  return (
    <div>
      <p>잘못된 훅 사용 예시 컴포넌트</p>
      {user && <p>사용자: {user.name}</p>}
      {items && items.map((item: Item) => ( // 파라미터 타입 적용
        <button key={item.id} onClick={() => handleItemClick(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  );
}

// GoodPracticesComponent 프롭스 타입 정의
interface GoodPracticesComponentProps {
  initialUser: User | null;
  initialItems?: Item[]; // initialItems는 선택적 프롭스
}

// 아이템 선택 상태 타입 정의 (객체의 키는 아이템 ID, 값은 boolean)
type ItemSelections = Record<string, boolean>;

/**
 * 훅 규칙을 올바르게 준수한 컴포넌트 예시
 */
function GoodPracticesComponent({ initialUser, initialItems = [] }: GoodPracticesComponentProps) { // 프롭스 타입 적용
  // 훅은 항상 컴포넌트 최상위 레벨에서 호출함
  const [currentUser, setCurrentUser] = useState<User | null>(initialUser); // 상태 타입 명시
  const [itemSelections, setItemSelections] = useState<ItemSelections>({}); // 상태 타입 명시
  const [lastInteractionTime, setLastInteractionTime] = useState<number | null>(null); // 상태 타입 명시 (null 또는 number)

  // 조건부 로직은 훅 내부에 작성하거나, 훅 외부에서 상태를 기반으로 처리함
  useEffect(() => {
    if (currentUser) {
      document.title = `${currentUser.name}의 페이지`;
    } else {
      document.title = '게스트 페이지';
    }
  }, [currentUser]); // currentUser가 변경될 때만 실행

  // 아이템 선택 상태를 토글하는 핸들러
  const handleSelectItem = (itemId: string) => { // 파라미터 타입 적용
    // ➍ 상태 업데이트 함수는 조건이나 반복문 없이 안전하게 호출 가능
    //    이전 상태를 기반으로 새로운 상태 객체를 생성
    setItemSelections(prevSelections => ({
      ...prevSelections,
      [itemId]: !prevSelections[itemId] // 해당 아이템의 선택 상태 반전
    }));
    // ➎ 상태 업데이트 함수를 사용하여 상호작용 시간 기록
    setLastInteractionTime(Date.now());
  };

  // 모든 아이템 선택 해제 함수
  const deselectAll = () => {
    const newSelections: ItemSelections = {}; // 타입 명시
    initialItems.forEach((item: Item) => { // 파라미터 타입 적용
      newSelections[item.id] = false;
    });
    setItemSelections(newSelections); // 미리 선언된 훅의 상태 업데이트 함수 사용
  };

  return (
    <div>
      {currentUser ? <p>{currentUser.name}님 환영합니다!</p> : <p>로그인이 필요합니다.</p>}
      <button onClick={deselectAll}>모두 선택 해제</button>
      <p>마지막 상호작용 시간: {lastInteractionTime ? new Date(lastInteractionTime).toLocaleTimeString() : '없음'}</p>
      <ul>
        {initialItems.map((item: Item) => ( // 파라미터 타입 적용
          <li
            key={item.id}
            onClick={() => handleSelectItem(item.id)}
            style={{
              cursor: 'pointer',
              fontWeight: itemSelections[item.id] ? 'bold' : 'normal',
            }}
          >
            {item.name} {itemSelections[item.id] ? '(선택됨)' : ''}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 사용 예시를 위한 더미 데이터 (타입 적용)
// const sampleUser: User = { name: '홍길동' };
// const sampleItems: Item[] = [
//   { id: '1', name: '항목 1' },
//   { id: '2', name: '항목 2' },
//   { id: '3', name: '항목 3' },
// ];

// export { TraverseComponent, GoodPracticesComponent, sampleUser, sampleItems }; // export 수정
export default GoodPracticesComponent; // 또는 TraverseComponent를 기본으로 내보내서 테스트