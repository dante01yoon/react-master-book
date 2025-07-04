// whack-a-mole/src/useEffect/side-effect.ts
useEffect(() => {
  // 이 effect의 실행이 유효한지를 추적하는 플래그
  let ignore = false;

  async function fetchData() {
    const data = await fetchScoreBoard();
    // ➊ API 응답이 도착했을 때, 이 effect가 여전히 유효한 경우에만 상태를 업데이트
    if (!ignore) {
      setScores(data);
    }
  }

  fetchData();

  // ➋ 클린업 함수: 컴포넌트가 언마운트되거나, 의존성이 변해 effect가 다시 실행될 때 호출됨
  return () => {
    ignore = true; // 이 effect의 결과는 이제 무시되어야 함을 표시
  };
}, []); // 마운트 시 한 번만 실행

