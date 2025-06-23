import { getCharacter, getCharacters } from "@/lib/api/character";
import { redirect } from 'next/navigation';
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

/**
 * 단일 캐릭터의 상세 정보를 보여주는 페이지
 * @param {{ params: { id: string } }} props - 페이지 파라미터
 * @returns {Promise<JSX.Element>}
 */
export default async function CharacterPage({ params }: { params: Promise<{ id: string }>}) {
  const { id } = await params;
  console.log('CharacterPage: ', id);
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
          <div className="flex justify-between items-center mb-4">
            <Link href={`/characters/${Number(id) - 1}`} passHref>
              <Button disabled={Number(id) <= 1}>
                Previous Character
              </Button>
            </Link>
            <Link href={`/characters/${Number(id) + 1}`} passHref>
              <Button>
                Next Character
              </Button>
            </Link>
          </div>
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

// generateStaticParams()에서 반환하지 않은 페이지 경로는 404 에러 페이지를 표시함
// export const dynamicParams = false;
// export const revalidate = 60; // 60초마다 ISR 적용

// 빌드 시점에 정적으로 생성할 페이지의 id 목록을 반환함
// export async function generateStaticParams() {
//   const characters = await getCharacters();

//   // ➊ API 응답에 맞춰 { id: '1' }, { id: '2' }, ... 형태의 배열을 반환
//   return characters.results
//     .filter((character) => character.id < 4)
//     .map((character) => ({
//     id: character.id.toString(),
//   }));
// }