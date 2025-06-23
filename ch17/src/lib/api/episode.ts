import { cache } from 'react';
import prisma from '@/lib/prisma';

export const getEpisode = cache(async (id: string | number) => {
  // 함수가 실제로 DB에 쿼리할 때만 콘솔에 로그를 출력함
  console.log(
    `[DB Query Fired] Fetching data for episode: ${id} from database.`
  );

  const episodeId = Number(id);
  if (isNaN(episodeId)) {
    return null;
  }

  const episodeData = await prisma.episode.findUnique({
    where: { apiId: episodeId },
    include: {
      characters: true,
    },
  });

  return episodeData;
});

// getEpisode 함수의 반환 타입을 추론하여 타입을 정의하고 내보냄
export type EpisodeWithCharacters = NonNullable<
  Awaited<ReturnType<typeof getEpisode>>
>; 