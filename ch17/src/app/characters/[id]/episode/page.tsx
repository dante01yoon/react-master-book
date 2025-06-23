import {
  getEpisodesByCharacter,
  getCharacterByApiId,
} from '@/lib/data';

// getEpisodesByCharacter 함수의 반환 타입을 추론하여 사용
type Episodes = Awaited<ReturnType<typeof getEpisodesByCharacter>>;
type EpisodeWithCharacter = Episodes[number];

interface CharacterEpisodesPageProps {
  params: {
    id: string;
  };
}

// 페이지 컴포넌트
export default async function CharacterEpisodesPage({
  params,
}: CharacterEpisodesPageProps) {
  const { id } = await params;
  const characterId = parseInt(id, 10);

  // 데이터 동시 요청
  const [episodes, character] = await Promise.all([
    getEpisodesByCharacter(characterId),
    getCharacterByApiId(characterId),
  ]);

  // 캐릭터 정보
  const characterName = character?.name;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
        {characterName ? `${characterName}의 에피소드 목록` : '캐릭터 에피소드'}
      </h1>
      <p className="mb-6 text-gray-600">
        이 페이지는 <code>unstable_cache</code>를 사용하여 Prisma로 가져온
        데이터를 캐시합니다. 페이지를 새로고침해도 서버 콘솔에는 Prisma
        호출 로그가 한 번만 찍히는 것을 확인할 수 있습니다.
      </p>
      {episodes.length > 0 ? (
        <ul className="space-y-4">
          {episodes.map((episode: EpisodeWithCharacter) => (
            <li key={episode.id} className="p-4 border rounded-lg shadow-sm">
              <h2 className="text-xl font-semibold">{episode.title}</h2>
              <p className="text-gray-500">
                {episode.episode} - 방영일: {episode.air_date}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>해당 캐릭터의 에피소드를 찾을 수 없습니다.</p>
      )}
    </div>
  );
} 