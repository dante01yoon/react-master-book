```TSX
fetch("..");
fetch("..", { cache: "force-cache" });
fetch("..", { cache: "no-store" });
// 지정된 시간이 지나면 다음 요청 시 캐시를 무효화 하고
// 새로운 데이터를 가져와 캐시를 업데이트 합니다.
fetch("..", { revalidate: 60 });

// 'character' 태그를 사용해 fetch 요청을 캐싱함
fetch("..", { next: { tags: ['character'] }});
// 'character' 태그가 지정된 모든 fetch 캐시를 무효화함
revalidateTag('a');
// revalidateTag 호출 후, 이 fetch는 새로운 데이터를 가져와 다시 'character' 태그로 캐싱함
fetch("..", { next: { tags: ['character'] }});

'use client';
export function DataFetcher() {
 // 클라이언트 사이드 에서 수행하는 데이터 패칭은 데이터 캐시가 적용되지 않음
 useEffect(() => {
   fetch('/api/data')
     .then(res => res.json())
     .then(setData);
 }, []);
 return <div>{/* ... */}</div>;
}

// 외부 라이브러리를 사용하는 경우 데이터 캐시가 적용되지 않을 수 있음.
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
```
