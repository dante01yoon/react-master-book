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

  // ➋ 페이지에서도 동일한 에피소드 데이터를 다시 요청함
  const { episode: episodeId, id: characterId } = await params;
  const episode = await getEpisode(episodeId);

  // 방어적으로 페이지 컴포넌트에서도 null 체크
  if (!episode) {
    redirect(`/characters/${characterId}`);
  }

  console.log("--- Rendering End: EpisodePage ---");

  return (
    <Card className="bg-red-50">
      <CardHeader>
        <CardTitle>Page: {episode.name}</CardTitle>
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