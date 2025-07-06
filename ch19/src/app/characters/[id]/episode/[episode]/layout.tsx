import { getEpisode } from "@/lib/api/episode";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";

interface EpisodeLayoutParams {
  params: { id: string; episode: string };
}

export default async function EpisodeLayout({
  children,
  params,
}: PropsWithChildren<EpisodeLayoutParams>) {
  console.log("--- Rendering Start: EpisodeLayout ---");
  
  const { id: characterId, episode: episodeId } = await params;

  // ➊ 레이아웃에서 에피소드 데이터를 요청함
  const episode = await getEpisode(episodeId);

  // getEpisode가 null을 반환하면 리다이렉트 처리
  if (!episode) {
    redirect(`/characters/${characterId}`);
  }

  console.log("--- Rendering End: EpisodeLayout ---");

  return (
    <div className="container mx-auto p-4 border-2 border-dashed border-blue-500">
      <Card className="mb-4 bg-blue-50">
        <CardHeader>
          <CardTitle>Layout: Episode {episode.episode}</CardTitle>
          <p className="text-sm text-gray-500">
            (이 정보는 layout.tsx에서 렌더링되었습니다.)
          </p>
        </CardHeader>
      </Card>
      
      {/* page.tsx가 이 안으로 렌더링됨 */}
      <div className="border-2 border-dashed border-red-500 p-4">
        {children}
      </div>
    </div>
  );
} 