import { useLoaderData } from "react-router";
import { PageLayout } from "../../components/layout/PageLayout";
import { Card } from "../../components/ui/Card";
import { cx, theme } from "../../utils/theme";

type User = {
  id: number;
  name: string;
  email: string;
};

type Post = {
  id: number;
  title: string;
  body: string;
};

type Comment = {
  id: number;
  name: string;
  email: string;
  body: string;
};

/**
 * 병렬 데이터 가져오기 예제
 * 
 * 이 예제는 Promise.all을 사용하여 여러 데이터 소스를 병렬로 가져와
 * 로딩 성능을 향상시키는 방법을 보여줍니다. 하나의 요청이 완료될 때까지
 * 기다린 후 다음 요청을 시작하는 대신, 모든 요청이 동시에 시작됩니다.
 */

// 오류 처리가 포함된 데이터 가져오기 헬퍼 함수
async function fetchWithErrorHandling<T>(url: string, errorMessage: string): Promise<T> {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`${errorMessage}: ${response.status}`);
  }
  
  return response.json();
}

// 여러 데이터 소스를 병렬로 가져오는 로더 함수
export async function loader() {
  try {
    // Promise.all을 사용하여 여러 리소스를 동시에 가져옵니다
    // 순차적 가져오기보다 훨씬 빠릅니다
    const [users, posts, comments] = await Promise.all([
      fetchWithErrorHandling<User[]>(
        'https://jsonplaceholder.typicode.com/users?_limit=3',
        '사용자 가져오기 실패'
      ),
      fetchWithErrorHandling<Post[]>(
        'https://jsonplaceholder.typicode.com/posts?_limit=3',
        '게시물 가져오기 실패'
      ),
      fetchWithErrorHandling<Comment[]>(
        'https://jsonplaceholder.typicode.com/comments?_limit=3',
        '댓글 가져오기 실패'
      )
    ]);
    
    return { users, posts, comments, error: null };
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    return { 
      users: [], 
      posts: [], 
      comments: [],
      error: error instanceof Error ? error.message : '데이터 로드 실패'
    };
  }
}

// 데이터를 렌더링하는 컴포넌트
export default function ParallelData() {
  // 로더가 반환한 데이터에 접근합니다
  const { users, posts, comments, error } = useLoaderData() as { 
    users: User[], 
    posts: Post[], 
    comments: Comment[],
    error: string | null
  };

  return (
    <PageLayout
      title="병렬 데이터 가져오기"
      description="더 나은 성능을 위해 여러 데이터 소스를 동시에 로딩합니다"
      backLink={{ to: "/", label: "예제 목록으로 돌아가기" }}
    >
      {error ? (
        <div className={cx("p-4 border rounded-md", theme.colors.error)}>
          {error}
        </div>
      ) : (
        <div className="space-y-8">
          <Card title="병렬 데이터 로딩 작동 방식" className="mb-8">
            <div className={cx("text-sm", theme.text.body)}>
              <p className="mb-2">
                <code className={theme.components.code}>Promise.all</code>을 사용하면 
                여러 비동기 작업을 동시에 실행할 수 있어 순차적 가져오기에 비해
                성능이 크게 향상됩니다.
              </p>
              <p>
                이 예제에서는 사용자, 게시물, 댓글을 각 요청이 완료될 때까지 기다리지 않고
                병렬로 가져옵니다.
              </p>
            </div>
          </Card>

          <div className="grid md:grid-cols-3 gap-6">
            {/* 사용자 섹션 */}
            <div>
              <h2 className={cx("text-xl font-semibold mb-4", theme.text.heading)}>사용자</h2>
              <div className="space-y-4">
                {users.map(user => (
                  <Card key={user.id} hoverable variant="outlined">
                    <h3 className={cx("font-medium", theme.text.heading)}>
                      {user.name}
                    </h3>
                    <p className={cx("text-sm", theme.colors.primary)}>
                      {user.email}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* 게시물 섹션 */}
            <div>
              <h2 className={cx("text-xl font-semibold mb-4", theme.text.heading)}>게시물</h2>
              <div className="space-y-4">
                {posts.map(post => (
                  <Card key={post.id} hoverable variant="outlined">
                    <h3 className={cx("font-medium capitalize", theme.text.heading)}>
                      {post.title}
                    </h3>
                    <p className={cx("text-sm mt-1", theme.text.body)}>
                      {post.body.substring(0, 80)}...
                    </p>
                  </Card>
                ))}
              </div>
            </div>
            
            {/* 댓글 섹션 */}
            <div>
              <h2 className={cx("text-xl font-semibold mb-4", theme.text.heading)}>댓글</h2>
              <div className="space-y-4">
                {comments.map(comment => (
                  <Card key={comment.id} hoverable variant="outlined">
                    <h3 className={cx("font-medium", theme.text.heading)}>
                      {comment.name.substring(0, 20)}...
                    </h3>
                    <p className={cx("text-sm", theme.colors.primary)}>
                      {comment.email}
                    </p>
                    <p className={cx("text-sm mt-1", theme.text.body)}>
                      {comment.body.substring(0, 60)}...
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </PageLayout>
  );
} 