import { useState } from 'react';

// 부모 컴포넌트
const GoldenRabbitApp = () => {
 // useState 훅을 사용하여 goldieInfo 상태를 초기화함
 // name, age, status 정보를 포함하는 객체임
 const [goldieInfo, setGoldieInfo] = useState({
   name: "goldie",
   age: "16",
   status: "hide" // 초기 상태는 'hide'임
 });

 // 친구 목록 상태 (배열)
 const [friends, setFriends] = useState([
   { id: 1, name: "Flopsy" },
   { id: 2, name: "Mopsy" },
 ]);

 // status 상태를 'reveal'로 업데이트하는 함수 (객체 불변성 유지)
 const updateStatus = () => {
   // 이전 상태 객체를 복사(...goldieInfo)하고 status만 업데이트하여 새로운 객체 생성
   setGoldieInfo({
     ...goldieInfo,
     status: "reveal"
   });
 };

 // 새 친구를 추가하는 함수 (배열 불변성 유지)
 const addFriend = (name) => {
   const newFriend = { id: Date.now(), name }; // 고유 ID 생성
   // 이전 친구 배열을 복사(...friends)하고 새 친구 객체를 추가하여 새로운 배열 생성
   setFriends([...friends, newFriend]);
 };

 // 친구 이름을 변경하는 함수 (배열 및 내부 객체 불변성 유지)
 const renameFriend = (id, newName) => {
   setFriends(
     // map 함수를 사용하여 새 배열 생성
     friends.map(friend => {
       if (friend.id === id) {
         // 변경 대상 친구 객체를 찾으면, 이전 객체를 복사(...friend)하고 name만 업데이트하여 새로운 객체 반환
         return { ...friend, name: newName };
       }
       // 변경 대상이 아니면 기존 객체 그대로 반환
       return friend;
     })
   );
 };

 return (
   <div>
     {/* status 상태에 따라 다른 제목을 렌더링함 */}
     <h1>{goldieInfo.status === "hide"
       ? "Where is Golden Rabbit?"
       : "You discovered Golden Rabbit!"
     }</h1>
     {/* 자녀 컴포넌트에 onClick 핸들러와 hide 상태를 프롭으로 전달함 */}
     <GoldenRabbitButton onClick={updateStatus} hide={goldieInfo.status === "hide"} />

     <hr />
     <h2>Friends List (Immutability Example)</h2>
     <ul>
       {friends.map(friend => (
         <li key={friend.id}>
           {friend.name}
           <button onClick={() => {
             const newName = prompt("Enter new name:", friend.name);
             if (newName) {
               renameFriend(friend.id, newName);
             }
           }} style={{ marginLeft: '10px' }}>
             Rename
           </button>
         </li>
       ))}
     </ul>
     <button onClick={() => {
       const name = prompt("Enter friend's name:");
       if (name) {
         addFriend(name);
       }
     }}>
       Add Friend
     </button>

     {/* 주의: 아래 GoldenRabbitWrongButton 컴포넌트는 불변성을 위반하는 예시입니다. */}
     {/* 프롭으로 받은 객체를 직접 수정하면 예측 불가능한 문제가 발생할 수 있습니다. */}
     {/* <GoldenRabbitWrongButton info={goldieInfo} /> */}
   </div>
 );
};

// 자녀 컴포넌트
// 부모로부터 onClick 함수와 hide 상태를 프롭으로 받음
const GoldenRabbitButton = ({ onClick, hide }) => {
 return (
   // 버튼 클릭 시 부모로부터 받은 onClick 함수를 호출함
   // hide 프롭이 true일 때 버튼을 비활성화함
   <button onClick={onClick} disabled={!hide}>
     Click to reveal the Golden Rabbit
   </button>
 );
};

export default GoldenRabbitApp;

// 잘못된 자식 컴포넌트
// info 프롭스는 부모의 상태 객체를 의미함
const GoldenRabbitWrongButton = ({ info }: { info: { status: string } }) => {
  const handleClick = () => {
    // ➊ 프롭스로 받은 객체의 값을 직접 변경하려 시도함
    info.status = 'reveal'; // 리액트의 원칙에 위배되며, 리렌더링을 유발하지 않음
  };

  return (
    <button onClick={handleClick} disabled={info.status !== 'hide'}>
      Click to reveal the Golden Rabbit
    </button>
  );
};