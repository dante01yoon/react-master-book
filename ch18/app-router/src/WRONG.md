```tsx
// ❌ 잘못된 사용법: 클라이언트 컴포넌트에서 서버 컴포넌트 임포트
'use client';

// 이 코드는 에러를 발생시킴
import ServerComponent from './ServerComponent';

export default function MyClientComponent() {
  return (
    <div>
      <ServerComponent />
    </div>
  );
}
```


```TSX
'use client'; // 클라이언트 경계의 시작

// 이 컴포넌트는 자동으로 클라이언트 컴포넌트가 됨
import CharacterCard from './CharacterCard';
// ...

// ch18/app-router/src/components/CharacterCard.tsx
// 'use client' 지시어가 필요 없음!
import Image from 'next/image';
// ...
```