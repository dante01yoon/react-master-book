/**
 * @file src/lib/db.ts
 * @description 데이터베이스 모킹(mocking)을 위한 파일
 */

// 포스트 데이터 타입을 정의함
export type PostDto = {
  id: number;
  title: string;
  content: string;
  authorId: number;
};

// 사용자 데이터 타입을 정의함
export type UserDto = {
  id: number;
  name: string;
};

// 목업 사용자 데이터
const mockUsers: UserDto[] = [
  { id: 101, name: 'Alice' },
  { id: 102, name: 'Bob' },
];

// 목업 포스트 데이터. authorId는 가독성을 위해 정수형으로 작성함
const mockPosts: PostDto[] = [
  {
    id: 1,
    title: '정적 사이트 생성(SSG) 소개',
    content: '정적 사이트 생성은 빌드 타임에 페이지를 미리 렌더링하는 기술임...',
    authorId: 101,
  },
  {
    id: 2,
    title: 'Next.js의 서버 사이드 렌더링(SSR) 이해하기',
    content: '서버 사이드 렌더링은 각 요청 시 페이지를 렌더링할 수 있게 함...',
    authorId: 101,
  },
  {
    id: 3,
    title: '리액트 서버 컴포넌트(RSC) 설명',
    content: '리액트 서버 컴포넌트는 서버와 클라이언트 렌더링을 원활하게 통합함...',
    authorId: 102,
  },
  {
    id: 4,
    title: '점진적 정적 재생성(ISR)',
    content: 'ISR은 정적 페이지를 점진적으로 재검증하여 업데이트할 수 있게 함...',
    authorId: 102,
  },
];

/**
 * 목업 데이터베이스 객체.
 * 실제 애플리케이션에서는 실제 데이터베이스와 상호작용하는 로직이 포함됨.
 */
const mockDb = {
  collection: (name: string) => ({
    /**
     * ID를 기반으로 단일 문서를 찾는 함수
     * @param query 쿼리 객체 (예: { id: 1 })
     */
    findOne: async (query: { id: string | number }) => {
      // 네트워크 지연을 시뮬레이션함
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (name === 'users') {
        return mockUsers.find((user) => user.id === query.id) ?? null;
      }
      if (name === 'posts') {
        const id = typeof query.id === 'string' ? parseInt(query.id, 10) : query.id;
        return mockPosts.find((post) => post.id === id) ?? null;
      }
      return null;
    },
    /**
     * 컬렉션의 모든 문서를 찾는 함수
     */
    findAll: async () => {
      // 네트워크 지연을 시뮬레이션함
      await new Promise((resolve) => setTimeout(resolve, 50));
      if (name === 'posts') {
        return mockPosts;
      }
      return [];
    },
  }),
};

/**
 * 데이터베이스 연결을 시뮬레이션하는 함수
 */
const connectToDatabase = async () => {
  // 실제 DB 연결 지연을 시뮬레이션함
  await new Promise((resolve) => setTimeout(resolve, 50));
  return mockDb;
};

/**
 * ID로 단일 포스트를 가져오는 함수
 * @param postId 포스트 ID
 */
export const getPostById = async (postId: number) => {
  const db = await connectToDatabase();
  const post = await db.collection('posts').findOne({ id: postId });
  return post;
};

/**
 * 모든 포스트 목록을 가져오는 함수
 */
export const getAllPosts = async () => {
  const db = await connectToDatabase();
  const posts = await db.collection('posts').findAll();
  return posts;
};

/**
 * 모든 포스트 ID 목록을 getStaticPaths 형식으로 가져오는 함수
 */
export const getAllPostIds = async () => {
  const db = await connectToDatabase();
  const posts = await db.collection('posts').findAll();
  return posts.map((post) => ({
    params: { id: post.id.toString() },
  }));
}; 