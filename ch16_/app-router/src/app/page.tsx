import { db } from '@/lib/blog_db';
import PostList from '@/components/PostList';

/**
 * 홈 페이지 (서버 컴포넌트)
 * - async 함수로 정의되어, 컴포넌트 내부에서 직접 비동기 데이터 페칭을 수행함
 * - `db` 객체를 사용하여 직접 데이터베이스에 연결하고 쿼리를 실행함
 * - 가져온 데이터를 `PostList` 컴포넌트에 props로 전달함
 */
export default async function HomePage() {
  // 서버 컴포넌트 내에서 직접 데이터베이스 관련 함수를 호출함
  const client = await db.connect();
  const posts = await client.query('SELECT * FROM posts;');

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">블로그 포스트</h1>
      {/* 데이터 페칭이 완료된 후, PostList 컴포넌트를 렌더링함 */}
      <PostList posts={posts} />
    </main>
  );
} 