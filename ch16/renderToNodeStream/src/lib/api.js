/**
 * API 호출을 시뮬레이션하는 함수
 * @returns {Promise<Array<{title: string, id: number}>>} 4초 후에 목록 데이터를 담아 resolve되는 프로미스
 */
export const getLazyCall = () => new Promise((resolve) => {
  setTimeout(() => {
    resolve([
      { title: "Dante SSR", id: 1},
      { title: "Dante ISR", id: 2},
      { title: "Dante SSG", id: 3},
      { title: "Dante RSC", id: 4}
    ])
  }, 4000)
})