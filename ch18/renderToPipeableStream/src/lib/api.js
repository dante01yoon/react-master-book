/**
 * API 호출을 시뮬레이션하는 함수
 * @returns {Promise<Array<{title: string, id: number}>>} 4초 후에 목록 데이터를 담아 resolve되는 프로미스
 */
export const getLazyCall = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      console.log("data fetched from server");
      resolve([
        { title: "Streaming SSR", id: 1 },
        { title: "Streaming ISR", id: 2 },
        { title: "Streaming SSG", id: 3 },
        { title: "Streaming RSC", id: 4 },
      ]);
    }, 4000);
  }); 