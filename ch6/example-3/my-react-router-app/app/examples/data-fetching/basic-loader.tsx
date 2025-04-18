import { useLoaderData } from "react-router";
import { PageLayout } from "../../components/layout/PageLayout";
import { Card } from "../../components/ui/Card";
import { cx, theme } from "../../utils/theme";

type Post = {
  id: number;
  title: string;
  body: string;
};

/**
 * 기본 로더 예제
 * 
 * 이 예제는 데이터 가져오기를 위한 React Router의 로더 함수를 보여줍니다.
 * 로더는 컴포넌트가 렌더링되기 전에 실행되며, 컴포넌트가
 * useLoaderData 훅을 통해 사용할 수 있는 데이터를 가져옵니다.
 */

// 데이터를 가져오는 로더 함수
// 이것은 컴포넌트가 렌더링되기 전에 실행됩니다
export async function loader() {
  // API 지연 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 500));
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
    console.log('response:' ,response);
    if (!response.ok) {
      // 응답이 정상이 아니면 오류를 발생시킵니다
      throw new Error(`게시물 가져오기 실패: ${response.status}`);
    }
    
    const posts = await response.json();
    
    // 데이터를 직접 반환합니다
    return { posts };
  } catch (error) {
    // 오류를 처리하고 적절한 상태를 반환합니다
    console.error('게시물 로딩 오류:', error);
    return { 
      posts: [], 
      error: '게시물을 로드하지 못했습니다' 
    };
  }
}


// 데이터를 렌더링하는 컴포넌트
export default function BasicLoader() {
  // 로더가 반환한 데이터에 접근합니다
  const { posts, error } = useLoaderData() as { posts: Post[], error?: string };

  return (
    <PageLayout
      title="기본 로더 예제"
      description="렌더링 전에 데이터를 가져오기 위한 React Router의 로더 사용 방법을 보여줍니다."
      backLink={{ to: "/", label: "예제 목록으로 돌아가기" }}
    >
      {error ? (
        <div className={cx("p-4 border rounded-md", theme.colors.error)}>
          {error}
        </div>
      ) : (
        <div className="space-y-6">
          <Card title="로더 작동 방식" className="mb-6">
            <div className={cx("text-sm", theme.text.body)}>
              <p className="mb-2">
                로더는 컴포넌트가 렌더링되기 <strong>전에</strong> 실행되는 함수입니다.
                데이터를 가져와서 <code className={theme.components.code}>useLoaderData</code> 훅을 통해 컴포넌트에 반환합니다.
              </p>
              <p className="mb-2">
                이 패턴은 데이터 가져오기와 렌더링을 분리하여 컴포넌트를 더 깔끔하게 만들고
                애플리케이션의 성능을 향상시킵니다. 또한 기존 React 애플리케이션에서 흔히 볼 수 있는
                로딩 상태 깜빡임을 방지합니다.
              </p>
            </div>
          </Card>

          <h2 className={cx("text-2xl font-semibold", theme.text.heading)}>API에서 가져온 게시물:</h2>
          {posts.length === 0 ? (
            <p className={theme.text.body}>게시물이 없습니다.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {posts.map((post, index) => (
                <Card key={post.id} hoverable className="h-full">
                  <h3 className={cx("text-lg font-medium mb-2 capitalize", theme.text.heading)}>
                    {post.title}
                  </h3>
                  <p className={cx("text-sm", theme.text.body)}>
                    {post.body}
                  </p>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
    </PageLayout>
  );
} 