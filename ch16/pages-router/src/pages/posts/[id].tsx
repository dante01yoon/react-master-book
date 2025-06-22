import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { getAllPostIds, getPostById, PostDto } from '@/lib/blog_db';
import { ParsedUrlQuery } from 'querystring';

interface PostPageProps {
  post: PostDto;
}

interface PostPageParams extends ParsedUrlQuery {
  id: string;
}

/**
 * 개별 포스트 상세 페이지
 * - [id] 동적 경로 파라미터에 해당하는 포스트의 제목과 내용을 보여줌
 */
export default function PostPage({ post }: PostPageProps) {
  return (
    <article className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-700 leading-relaxed">{post.content}</p>
    </article>
  );
}

/**
 * getStaticPaths: 동적으로 생성할 페이지들의 경로를 정의
 * - 빌드 타임에 어떤 페이지들을 미리 생성할지 Next.js에 알려줌
 * - fallback: 'blocking'은 빌드 시점에 생성되지 않은 페이지 요청 시,
 *   서버에서 페이지를 생성(SSR)한 후 사용자에게 보여주고, 이후에는 해당 페이지를 정적 파일로 캐싱함
 */
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds();
  // id가 3인 포스트는 미리 생성하지 않음 (fallback 동작 확인용)
  const filteredPaths = paths.filter(
    (path) => (path.params as PostPageParams).id !== '3',
  );

  return {
    paths: filteredPaths,
    fallback: 'blocking',
  };
};

/**
 * getStaticProps: 페이지에 필요한 데이터를 가져옴
 * - getStaticPaths로 정의된 각 페이지에 대해 빌드 타임에 실행됨
 * - revalidate 옵션을 통해 ISR(Incremental Static Regeneration)을 구현
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<PostPageParams>,
) => {
  const { params } = context;
  const paramsId = await params?.id;
  const postId = paramsId ? parseInt(paramsId, 10) : NaN;

  // 1. URL 파라미터(id)가 유효한 숫자인지 확인
  if (isNaN(postId)) {
    return { notFound: true };
  }

  const post = await getPostById(postId);

  // 2. 데이터베이스에서 포스트를 찾을 수 없는 경우 404 페이지 반환
  if (!post) {
    return { notFound: true };
  }

  // 3. 성공 시, 페이지 props와 revalidate 옵션을 반환
  return {
    props: {
      post,
    },
    // 10초 주기로 페이지를 백그라운드에서 재생성 (ISR)
    revalidate: 10,
  };
}; 