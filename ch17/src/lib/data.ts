import 'server-only';
import { unstable_cache } from 'next/cache';
import prisma from './prisma';

/**
 * 특정 캐릭터의 에피소드 목록을 가져오는 함수.
 * unstable_cache를 사용하여 데이터베이스 요청을 캐시함.
 * fetch를 사용하지 않는 데이터 소스(DB, 외부 SDK 등)에 캐시를 적용할 때 유용함.
 */
export const getEpisodesByCharacter = unstable_cache(
  async (characterId: number) => {
    console.log(
      `Prisma를 통해 캐릭터 API ID ${characterId}의 에피소드를 가져옵니다. (캐시되지 않은 경우에만 표시)`
    );
    const data = await prisma.episode.findMany({
      where: {
        characters: {
          some: {
            apiId: characterId,
          },
        },
      },
      include: {
        characters: true, // 에피소드에 참여한 다른 캐릭터 정보도 포함
      },
    });

    return data;
  },
  ['episodes-by-character'], // 캐시 키 프리픽스
  {
    tags: ['episodes'], // 캐시 태그
  }
);

/**
 * API ID를 사용하여 특정 캐릭터 정보를 가져오는 함수.
 */
export const getCharacterByApiId = unstable_cache(
  async (apiId: number) => {
    console.log(
      `Prisma를 통해 캐릭터 API ID ${apiId}의 정보를 가져옵니다. (캐시되지 않은 경우에만 표시)`
    );
    return prisma.character.findUnique({
      where: { apiId },
    });
  },
  ['character-by-api-id'],
  {
    tags: ['characters'],
  }
); 