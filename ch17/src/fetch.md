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
```
