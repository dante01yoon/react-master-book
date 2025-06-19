import Link from 'next/link';
import { GetStaticProps } from 'next';
import { PostDto, getAllPosts } from '@/lib/blog_db';

type PostListPageProps = {
  posts: PostDto[];
};

/**
 * 포스트 목록 페이지
 * - 모든 포스트의 제목을 리스트 형태로 보여줌
 * - 각 포스트는 동적 경로인 /posts/[id]로 링크됨
 */
export default function PostListPage({ posts }: PostListPageProps) {
  return (
    <div>
      <header className="bg-blue-500 text-white py-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-extrabold">블로그 포스트</h1>
        </div>
      </header>
      <main className="container mx-auto p-8">
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 border rounded-md shadow-sm hover:bg-gray-100 transition-colors">
              <Link href={`/posts/${post.id}`} className="text-2xl font-bold text-blue-700 hover:underline">
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

/**
 * getStaticProps: 빌드 타임에 포스트 목록 데이터를 가져오는 함수
 * - SSG를 통해 이 페이지는 빌드 시점에 미리 렌더링됨
 * - 여기서는 ID가 3인 포스트를 의도적으로 필터링하여 목록에 표시되지 않도록 처리함
 */
export const getStaticProps: GetStaticProps<PostListPageProps> = async () => {
  const allPosts = await getAllPosts();
  // 비공개 처리할 포스트(id: 3)를 제외함
  const posts = allPosts.filter(post => post.id !== 3);
  return {
    props: {
      posts,
    },
  };
}; 