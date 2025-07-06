```TSX
'use client';

import { useSearchParams } from 'next/navigation';

export function ClientSearchFilter() {
 // useSearchParams() 훅 사용하여 쿼리 파라메터 조회 가능
 const searchParams = useSearchParams(); 
 // ?name=dante와 같은 파라메터 조회
 const name = searchParams.get('name');
 // 생략
}

export const dynamic = 'auto' // 기본 설정
export const dynamic = 'force-dynamic' // 동적 렌더링 강제
```
