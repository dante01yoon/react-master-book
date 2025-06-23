import { getEpisode } from "@/lib/api/episode";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { redirect } from "next/navigation";

interface EpisodePageParams {
  params: { id: string; episode: string };
}

export default async function EpisodePage({ params }: EpisodePageParams) {
  console.log("--- Rendering Start: EpisodePage ---");

  // ➋ params.episode 값을 getEpisode 함수에 전달
  const episodeId = params.episode;
  const episode = await getEpisode(episodeId);

  // 방어적으로 페이지 컴포넌트에서도 null 체크
  if (!episode) {
    // 이전 페이지로 리디렉션
    redirect(`/characters/${params.id}/episode`);
  }

  console.log("--- Rendering End: EpisodePage ---");

  return (
    <Card className="bg-red-50">
      <CardHeader>
        <CardTitle>Page: {episode.title}</CardTitle>
        <p className="text-sm text-gray-500">
          (이 정보는 page.tsx에서 렌더링되었습니다.)
        </p>
      </CardHeader>
      <CardContent>
        <p>
          <strong>Air Date:</strong> {episode.air_date}
        </p>
        <p>
          <strong>Characters Appeared:</strong> {episode.characters.length}
        </p>
      </CardContent>
    </Card>
  );
} 