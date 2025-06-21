import Image from 'next/image';
import Link from 'next/link';
import type { Character } from '@/lib/api/character';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface CharacterCardProps {
  character: Character;
}

/**
 * 캐릭터 정보를 표시하는 카드 컴포넌트
 * @param {CharacterCardProps} props - 캐릭터 정보
 * @returns {JSX.Element}
 */
export default function CharacterCard({ character }: CharacterCardProps) {
  // 생략
  return (
    <Card>
      <CardHeader>
        <CardTitle>{character.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-square w-full">
          <Image
            src={character.image}
            alt={character.name}
            fill
            className="rounded-lg object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="mt-4 flex justify-between">
          <span>Species: {character.species}</span>
          <Badge variant={character.status === 'Alive' ? 'default' : 'destructive'}>
            {character.status}
          </Badge>
        </div>
        <p>Origin: {character.origin.name}</p>
      </CardContent>
      <CardFooter>
        {/* 캐릭터 상세 페이지로 이동 */}
        <Link href={`/characters/${character.id}`} className="w-full">
          <Button className="w-full">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
} 