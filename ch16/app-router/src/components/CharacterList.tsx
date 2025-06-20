'use client';

import { use } from 'react';
import { ApiResponse } from '@/lib/rick_and_morty_api';
import CharacterCard from './CharacterCard';

interface CharacterListProps {
  charactersPromise: Promise<ApiResponse>;
}

/**
 * Promise를 받아 캐릭터 목록을 렌더링하는 클라이언트 컴포넌트
 */
export default function CharacterList({ charactersPromise }: CharacterListProps) {
  // `use` 훅을 사용해 Promise가 resolve될 때까지 컴포넌트 렌더링을 일시 중단함
  const data = use(charactersPromise);
  console.log('data: ', data);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {data.results.map((character) => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
} 