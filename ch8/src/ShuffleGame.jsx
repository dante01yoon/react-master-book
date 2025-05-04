import React, { useEffect, useState } from "react";

// 토끼 이름 배열을 섞는 Fisher-Yates 알고리즘 구현 함수
const shuffle = (rabbits = []) => {
 const deck = rabbits.slice(); // 원본 배열 복사
 // 배열의 마지막 요소부터 시작하여 각 요소를 무작위 위치의 요소와 교환함
 for(let i = deck.length -1 ; i >= 0; --i) {
   const randomIndex = Math.floor(Math.random() * i); // 0과 i 사이의 무작위 인덱스 생성

   // 요소 교환 (swap)
   const temp = deck[i];
   deck[i] = deck[randomIndex];
   deck[randomIndex] = temp;
 }
 return deck; // 섞인 배열 반환
}

// 간단한 이름 표시 컴포넌트
const RabbitNameDisplay = ({ name }) => {
  // 마운트/업데이트 확인용 로그 (선택 사항)
  useEffect(() => {
    console.log(name, "display mounted");
    // 언마운트 확인용 클린업 함수 (선택 사항)
    return () => console.log(name, "display unmounted");
  }, []);

  useEffect(() => {
    console.log(name, "display updated");
  }, [name]); // name이 바뀔 때만 로그 출력 (또는 []로 마운트 시만)

  return (
    <div className="border border-gray-300 p-2 rounded text-center shadow-sm bg-white">
      {name}
    </div>
  );
};

// 토끼 이름 카드를 표시하는 컴포넌트
const RabbitNameCard = ({name}) => {
  // 컴포넌트 마운트 시 콘솔에 이름 로그 출력
  useEffect(() => {
    console.log(name,"card mounted")
  },[]);

  useEffect(() => {
    // 컴포넌트 리렌더링 시 콘솔에 이름 로그 출력
    console.log(name,"card rerendered")
  });
  return <input defaultValue={name} className="border border-gray-300 p-2 rounded text-center shadow-sm"/>;
}

// 토끼 이름 덱을 섞고 표시하는 메인 컴포넌트
const RabbitShuffleDeck = () => {
 // 초기 토끼 이름 배열 정의
 const rabbits = ["Golden", "Silver", "Dante", "Frank", "Kate", "Bread"];
 // 섞인 토끼 덱 상태 관리
 const [rabbitDeck, setRabbitDeck] = useState(rabbits);

 // 버튼 클릭 시 토끼 덱을 섞는 이벤트 핸들러
 const handleClick = () => {
   setRabbitDeck(shuffle(rabbits)); // shuffle 함수를 호출하여 상태 업데이트
 }

 // rabbitDeck 상태가 변경될 때마다 콘솔에 로그 출력 (디버깅용)
 useEffect(() => {
   console.log("rabbitDeck: ", rabbitDeck)
 })

 // 컴포넌트 렌더링
 return (
   <div className="p-4 flex flex-col items-center gap-y-4">
     <button
       onClick={handleClick}
       className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow"
     >
       shuffle rabbit
     </button>
     <div className="grid grid-cols-3 gap-2 w-full max-w-md">
       {
        // rabbitDeck 배열을 순회하며 각 토끼에 대해 RabbitNameCard 컴포넌트 렌더링
        // key prop으로 각 카드를 고유하게 식별함
        rabbitDeck.map((rabbit) => <MemoizedCardDisplay name={rabbit} key={rabbit} />)
       }
     </div>
   </div>
 )
}
export default RabbitShuffleDeck

const MemoizedNameCard = React.memo(RabbitNameCard)

const MemoizedCardDisplay = React.memo(RabbitNameDisplay);
