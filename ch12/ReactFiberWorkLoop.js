// 단위 작업(Unit of Work)을 처리하는 단일 함수
function performUnitOfWork(unitOfWork) {
  // --- 1. "시작" 단계 (내려가기) ---
  // beginWork는 현재 파이버에 대한 작업을 시작하고, '첫 번째 자식' 파이버를 반환
  const nextChild = beginWork(unitOfWork);
  
  // beginWork의 핵심 역할:
  // - props 변경 여부 확인
  // - 컴포넌트 함수 또는 render() 실행
  // - 실행 결과(자식 엘리먼트)를 바탕으로 자식 파이버 생성 또는 업데이트

  if (nextChild !== null) {
    // ➋ 자식이 있다면, 다음 작업은 당연히 그 자식
    return nextChild;
  }

  // --- 2. "완료" 단계 (올라가기) ---
  // ➌ 자식이 없다면, 현재 노드의 작업은 '완료'될 수 있음
  // 이제 형제나 부모로 이동해야 함
  let completedWork = unitOfWork;
  
  // ➍ 현재 노드를 시작으로, 위로 올라가는 루프 시작
  while (completedWork !== null) {
    // completeWork의 핵심 역할:
    // - 파이버에 대한 부수 효과(effect) 플래그 설정 (예: DOM에 삽입, 업데이트 필요)
    // - 자식들의 부수 효과를 현재 파이버로 병합
    completeWork(completedWork);

    const sibling = completedWork.sibling;
    if (sibling !== null) {
      // ➎ 형제가 있다면, 다음 작업은 그 형제
      return sibling;
    }

    // ➏ 형제가 없다면, 부모로 올라가서 '완료' 과정을 반복
    completedWork = completedWork.return;
  }

  // 최상단까지 모든 작업이 완료되면 null을 반환하여 전체 루프를 종료
  return null;
}