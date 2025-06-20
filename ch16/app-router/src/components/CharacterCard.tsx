'use client';

import Image from 'next/image';
import { Character } from '@/lib/rick_and_morty_api';

interface CharacterCardProps {
  character: Character;
}

/**
 * 개별 캐릭터 정보를 표시하는 카드 컴포넌트
 */
export default function CharacterCard({ character }: CharacterCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300">
      <Image
        src={character.image}
        alt={character.name}
        width={300}
        height={300}
        className="w-full object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold">{character.name}</h2>
        <p className="text-gray-700">{character.species}</p>
        <p className={`mt-2 font-semibold ${
          character.status === 'Alive' ? 'text-green-500' : 
          character.status === 'Dead' ? 'text-red-500' : 'text-gray-500'
        }`}>
          {character.status}
        </p>
      </div>
    </div>
  );
} 