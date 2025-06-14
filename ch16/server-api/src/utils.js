/**
 * 5초의 지연 후, 예제 데이터를 반환하는 비동기 함수
 * @returns {Promise<Array<{id: number, title: string}>>}
 */
export const getLazyCall = () => {
  console.log('[SERVER] getLazyCall 호출됨, 5초 후 데이터 반환...');
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = [
        { id: 1, title: 'Dante SSR' },
        { id: 2, title: 'Dante ISR' },
        { id: 3, title: 'Dante SSG' },
        { id: 4, title: 'Dante RSC' },
      ];
      console.log('[SERVER] 5초 경과, 데이터 반환:', data);
      resolve(data);
    }, 5000); // 5초 지연
  });
}; 