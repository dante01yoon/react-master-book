import { PostDto } from "@/lib/blog_db";

interface PostListProps {
  posts: PostDto[];
}

/**
 * 포스트 목록을 표시하는 UI 컴포넌트
 * - 이 컴포넌트는 부모로부터 데이터를 props로 전달받아 UI를 렌더링하는 역할만 함
 * - 서버 컴포넌트 또는 클라이언트 컴포넌트 어디에서나 사용될 수 있음
 */
export default function PostList({ posts }: PostListProps) {
  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="p-4 border rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold">{post.title}</h2>
          <p className="mt-2 text-gray-600">{post.content}</p>
        </div>
      ))}
    </div>
  );
} 