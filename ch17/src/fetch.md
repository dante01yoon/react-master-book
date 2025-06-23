```TSX
fetch("..");
fetch("..", { cache: "force-cache" });
fetch("..", { cache: "no-store" });
// 지정된 시간이 지나면 다음 요청 시 캐시를 무효화 하고
// 새로운 데이터를 가져와 캐시를 업데이트 합니다.
fetch("..", { revalidate: 60 });

fetch("..", { next: { tags: ['a'] }});
revalidateTag('a');
fetch("..", { next: { tags: ['a'] }});
```
