export interface PostDto {
  id: number;
  title: string;
  content: string;
}

// 메모리에 저장된 포스트 데이터 (데이터베이스를 모킹함)
const posts: PostDto[] = [
  { id: 1, title: '리액트 서버 컴포넌트란?', content: '서버에서 렌더링되는 리액트 컴포넌트입니다...' },
  { id: 2, title: 'Next.js 앱 라우터', content: '파일 기반 라우팅을 제공하며, 기본적으로 서버 컴포넌트를 사용합니다.' },
  { id: 3, title: '데이터 페칭 in 서버 컴포넌트', content: '컴포넌트 내부에서 직접 async/await를 사용하여 데이터를 가져올 수 있습니다.' },
];

/**
 * 데이터베이스 쿼리를 흉내 내는 가짜 DB 클라이언트
 */
const dbClient = {
  query: async (queryString: string): Promise<any[]> => {
    console.log(`[DB] 쿼리 실행: ${queryString}`);
    // 쿼리 실행에 걸리는 시간을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (queryString === 'SELECT * FROM posts;') {
      console.log('[DB] 쿼리 성공');
      return posts;
    }
    
    return [];
  }
};

/**
 * 데이터베이스 커넥션을 흉내 내는 db 객체
 */
export const db = {
  connect: async () => {
    console.log('[DB] 데이터베이스에 연결 중...');
    // 커넥션 수립에 걸리는 시간을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('[DB] 데이터베이스 연결 성공');
    return dbClient;
  }
};

/**
 * 모든 포스트 목록을 가져오는 비동기 함수
 * - DB 커넥션, 쿼리 과정을 포함하여 실제 데이터 통신 과정을 모방함
 */
export const getAllPosts = async (): Promise<PostDto[]> => {
  console.log('[Service] 포스트 목록 조회를 시작합니다.');
  const client = await db.connect();
  const allPosts = await client.query('SELECT * FROM posts;');
  console.log('[Service] 포스트 목록 조회를 완료했습니다.');
  return allPosts;
}; 