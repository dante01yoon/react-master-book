import { cache } from 'react';
import prisma from '@/lib/prisma';

// 에피소드 데이터 타입을 정의함. Prisma 스키마에서 생성된 타입을 사용하는 것이 가장 이상적입니다.
export interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

/**
 * 특정 에피소드 정보를 Prisma를 사용해 가져오는 함수.
 * React.cache로 감싸 리퀘스트 메모이제이션을 수동으로 구현함.
 * @param {string | number} id - 에피소드 ID
 * @returns {Promise<Episode | null>}
 */
export const getEpisode = cache(
  async (id: string | number): Promise<Episode | null> => {
    // 함수가 실제로 DB에 쿼리할 때만 콘솔에 로그를 출력함
    console.log(
      `[DB Query Fired] Fetching data for episode: ${id} from database.`
    );

    const episodeId = Number(id);
    if (isNaN(episodeId)) {
      return null;
    }

    // Prisma 스키마에 'episode' 모델이 정의되어 있다고 가정함.
    // 실제 프로덕션 코드에서는 findUnique가 null을 반환할 수 있으므로 에러 핸들링이 필요함.
    const episodeData = await prisma.episode.findUnique({
      where: { id: episodeId },
    });

    // 예제 단순화를 위해, findUnique가 Episode와 유사한 구조를 반환한다고 가정.
    // 실제로는 DB 모델과 API 응답 형태가 다를 수 있으므로 변환 과정이 필요할 수 있음.
    return episodeData as Episode | null;
  }
); 