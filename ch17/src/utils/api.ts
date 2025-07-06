export const fetchQuotesAPI = (query: string): Promise<{ id: string; content: string }[]> => {
  console.log(`API 호출 시작: ${query}`);
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(`API 응답: ${query}`);
      if (query === "error") {
        // 에러 상황 시뮬레이션을 위해 Promise.reject를 사용할 수도 있음
        // 여기서는 간단히 빈 배열을 반환
        resolve([]); 
        return;
      }
      resolve([
        { id: '1', content: `${query} 관련 명언 1: 인내는 쓰지만, 그 열매는 달다.` },
        { id: '2', content: `${query} 관련 명언 2: 시작이 반이다.` },
      ]);
    }, 1500);
  });
};