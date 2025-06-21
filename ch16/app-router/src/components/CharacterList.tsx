import type { Character } from '@/lib/api/character';
import CharacterCard from './CharacterCard';

interface CharacterListProps {
  characters: Character[];
}

/**
 * 캐릭터 카드 목록을 렌더링하는 컴포넌트
 * @param {CharacterListProps} props - 캐릭터 목록
 * @returns {JSX.Element}
 */
export default function CharacterList({ characters }: CharacterListProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map(character => (
        <CharacterCard key={character.id} character={character} />
      ))}
    </div>
  );
} 