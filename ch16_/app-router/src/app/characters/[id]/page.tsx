import { getCharacter } from "@/lib/api/character";
import { redirect } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

/**
 * 단일 캐릭터의 상세 정보를 보여주는 페이지
 * @param {{ params: { id: string } }} props - 페이지 파라미터
 * @returns {Promise<JSX.Element>}
 */
export default async function CharacterPage({ params }: { params: { id: string } }) {
  const { id } = await params;
  const character = await getCharacter(id);

  // API를 조회해 존재하지 않는 캐릭터는 캐릭터 리스트 페이지로 리다이렉션 시킴
  if (!character) {
    redirect('/characters');
  }

  return (
    <div className="container mx-auto p-4">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{character.name}</span>
            <Badge variant={character.status === 'Alive' ? 'default' : 'destructive'}>
              {character.status}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative aspect-square w-full mb-4">
            <Image
              src={character.image}
              alt={character.name}
              fill
              className="rounded-lg object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <p><strong>Species:</strong> {character.species}</p>
            <p><strong>Gender:</strong> {character.gender}</p>
            <p><strong>Origin:</strong> {character.origin.name}</p>
            <p><strong>Location:</strong> {character.location.name}</p>
          </div>
          <h3 className="mt-4 text-lg font-semibold">Episodes</h3>
          <p className="text-sm text-gray-500">
            Appeared in {character.episode.length} episodes.
          </p>
        </CardContent>
      </Card>
    </div>
  );
} 