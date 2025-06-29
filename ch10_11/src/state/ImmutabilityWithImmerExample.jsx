import { useState } from 'react';
import { produce } from 'immer'; // immer에서 produce 함수를 가져옴

const ImmutabilityWithImmerExample = () => {
  const [user, setUser] = useState({
    name: '진수',
    profile: {
      age: 25,
      social: {
        twitter: '@jinsu',
      },
    },
    items: ['옷', '신발'],
  });

  const updateUser = () => {
    setUser(
      // produce 함수는 두 개의 인자를 받음: (현재 상태, 업데이트 로직 함수)
      produce((draft) => {
        // 'draft'는 현재 상태의 복사본이며, 이 객체는 자유롭게 수정할 수 있음
        // immer가 변경 사항을 감지하여 불변성을 유지하며 새로운 상태를 생성해줌
        draft.profile.age += 1;
        draft.items.push('가방');
      })
    );
  };

  return (
    <div>
      <p>
        {user.name} ({user.profile.age}세)
      </p>
      <p>아이템: {user.items.join(', ')}</p>
      <button onClick={updateUser}>사용자 정보 업데이트</button>
    </div>
  );
};

export default ImmutabilityWithImmerExample;