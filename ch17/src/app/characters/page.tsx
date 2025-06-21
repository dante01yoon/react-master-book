import { Suspense } from 'react';
import { getCharacters } from '@/lib/api/character';
import CharacterList from '@/components/CharacterList';

async function CharacterListComponent() {
  const { results: characters } = await getCharacters();
  return <CharacterList characters={characters} />;
}

/**
 * 캐릭터 목록을 보여주는 페이지
 * Suspense를 사용하여 로딩 상태를 처리
 * @returns {JSX.Element}
 */
export default function CharactersPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="mb-4 text-2xl font-bold">Rick and Morty Characters</h1>
      <Suspense fallback={<p>Loading characters...</p>}>
        <CharacterListComponent />
      </Suspense>
    </div>
  );
} 