import { Suspense } from 'react';
import CharacterList from '@/components/CharacterList';
import { getCharacters } from '@/lib/rick_and_morty_api';

/**
 * 캐릭터 목록 페이지 (서버 컴포넌트)
 */
export default function CharactersPage() {
  // 서버에서 데이터 페칭 함수를 호출하여 Promise를 즉시 받음
  const charactersPromise = getCharacters();

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        Rick and Morty Characters
      </h1>

      {/* 
        Suspense는 자식 컴포넌트(CharacterList)가 데이터를 기다리는 동안 
        대체 UI(fallback)를 보여줌.
        데이터 로딩이 완료되면 CharacterList의 렌더링 결과로 교체됨.
      */}
      <Suspense fallback={<div className="text-center text-xl">Loading characters...</div>}>
        <CharacterList charactersPromise={charactersPromise} />
      </Suspense>
    </div>
  );
} 