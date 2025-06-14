/**
 * API 응답값으로 사용될 Repo 객체의 인터페이스 정의
 * 실제 애플리케이션에서는 이 인터페이스를 공유하거나,
 * API 명세에 따라 더 구체적으로 정의해야 함
 */
export interface Repo {
  id: number;
  name: string;
  full_name: string;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  description: string | null;
  html_url: string;
}

// 모킹된 Repo 데이터
const mockRepoData: Repo = {
  id: 12345,
  name: 'mocked-nextjs-repo',
  full_name: 'mocked-org/mocked-nextjs-repo',
  stargazers_count: 9999,
  forks_count: 1500,
  open_issues_count: 25,
  description: '이것은 fetchData 함수를 통해 가져온 모킹된 Next.js 저장소 데이터입니다.',
  html_url: 'https://github.com/mocked-org/mocked-nextjs-repo',
};

/**
 * 실제 fetch API 호출을 모방하는 함수입니다.
 * 이 함수는 Response 객체와 유사한 구조를 반환하며,
 * json() 메서드를 호출하면 미리 정의된 Repo 데이터를 반환합니다.
 * @returns Promise<{ json: () => Promise<Repo> }>
 */
export const mockFetchData = async (): Promise<{ status: number, ok: boolean, json: () => Promise<Repo> }> => {
  console.log('[MOCK] mockFetchData 호출됨');
  // 네트워크 지연 시간 시뮬레이션
  await new Promise(resolve => setTimeout(resolve, 200));

  // 성공적인 응답을 모방
  return {
    status: 200,
    ok: true,
    json: async () => {
      console.log('[MOCK] response.json() 호출됨');
      // JSON 파싱 시간 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 50));
      return mockRepoData;
    },
  };
};

/**
 * API 호출 실패를 모방하는 함수 (예시)
 * @returns Promise<{ status: number, ok: boolean, json: () => Promise<any>, statusText: string }>
 */
export const mockFetchDataWithError = async (): Promise<{ status: number, ok: boolean, json: () => Promise<any>, statusText: string }> => {
  console.log('[MOCK] mockFetchDataWithError 호출됨');
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    status: 500,
    ok: false,
    statusText: 'Internal Server Error',
    json: async () => {
      await new Promise(resolve => setTimeout(resolve, 50));
      return { message: '서버에서 오류가 발생했습니다.' };
    },
  };
}; 