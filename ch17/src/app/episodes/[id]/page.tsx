import { unstable_cache } from 'next/cache';
import { getComments } from '@/lib/db';
import CommentList from './components/CommentList';

interface Episode {
  id: number;
  name: string;
  air_date: string;
  episode: string;
}

/**
 * 특정 ID의 에피소드 정보를 가져오는 함수
 * Next.js의 fetch를 사용하므로 별도의 캐시 처리 없이도 자동 캐싱됩니다.
 * @param id - 에피소드 ID
 */
async function getEpisode(id: string): Promise<Episode> {
  const res = await fetch(`https://rickandmortyapi.com/api/episode/${id}`);
  if (!res.ok) {
    throw new Error('에피소드 정보를 가져오는 데 실패했습니다.');
  }
  return res.json();
}

/**
 * 특정 에피소드의 댓글을 가져오는 캐시된 함수
 * 데이터베이스 직접 조회는 cache 함수로 감싸 캐싱 전략을 적용합니다.
 * @param episodeId - 에피소드 ID
 */
const getCachedComments = (episodeId: number) =>
  unstable_cache(
    async () => getComments(episodeId),
    ['comments', String(episodeId)], // 캐시 키
    {
      tags: [`comments:${episodeId}`], // revalidateTag를 위한 태그
    },
  )();


export default async function EpisodeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;
  const episodeId = Number(id);
  const episode = await getEpisode(id);
  const comments = await getCachedComments(episodeId);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{episode.name}</h1>
      <p className="text-gray-600">
        {episode.episode} | {episode.air_date}
      </p>
      <hr className="my-4" />

      <h2 className="text-xl font-bold mt-6 mb-2">댓글</h2>
      {/* 댓글 목록과 폼을 포함하는 클라이언트 컴포넌트 */}
      <CommentList comments={comments} episodeId={episodeId} />
    </div>
  );
} 