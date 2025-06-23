import { getCharacters } from '@/lib/rick_and_morty_api';
// app/api/characters/route.ts
import { NextResponse } from 'next/server';

// 'force-static'으로 설정하여 이 라우트를 정적으로 렌더링하고 결과를 캐시하도록 강제함
export const dynamic = 'force-static';

export async function GET() {
  const res = await fetch('https://rickandmortyapi.com/api/character', {
    // 서버 환경에서만 실행되므로 API 키가 클라이언트에 노출될 위험이 없음
    headers: {
      'Content-Type': 'application/json',
      'API-Key': process.env.DATA_API_KEY,
    },
  });
  const data = await res.json();

  // NextResponse.json()을 사용해 JSON 형태의 응답을 생성함
  return NextResponse.json({ data });
}