// --- 전역 변수: 현재 렌더링 상태를 관리 ---
let nextUnitOfWork = null;      // ➊ 다음으로 처리할 파이버 '작업 단위'
let workInProgressRoot = null;  // 현재 작업 중인 전체 파이버 트리의 루트
let deadline = 0;               // ➋ 현재 작업 루프가 멈춰야 하는 시간 (마감 시한)
const frameYieldMs = 5;         // 브라우저에 제어권을 양보하기 위한 시간 (약 5ms)

// --- 업데이트 요청 진입점 ---
function scheduleUpdate(rootFiber) {
  // 이미 진행 중인 작업이 없다면, 새로운 작업 루프를 시작
  if (workInProgressRoot === null) {
    workInProgressRoot = rootFiber;
    nextUnitOfWork = rootFiber; // ➌ 첫 작업은 트리의 루트부터 시작
    
    // ➍ 작업 루프의 '마감 시간'을 설정하고, 루프 실행을 스케줄링함
    deadline = getCurrentTime() + frameYieldMs;
    scheduleCallback(workLoop); 
  }
  // (이미 작업이 진행 중이라면, 우선순위에 따라 병합 또는 중단 처리)
}


// --- 메인 작업 루프 ---
function workLoop() {
  // ➎ 다음 작업이 있고, 아직 시간이 남아있다면 계속 실행
  while (nextUnitOfWork !== null && deadline > getCurrentTime()) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }

  // ➐ 루프가 끝난 후
  if (nextUnitOfWork === null) {
    // 모든 작업 완료! 실제 DOM에 변경 사항을 커밋함
    commitRoot(workInProgressRoot);
  } else {
    // 시간이 다 되어서 멈췄다면, 다음 프레임에 이어서 하도록 다시 스케줄링
    scheduleCallback(workLoop);
  }
}

// --- 단위 작업(Unit of Work) 처리 ---
function performUnitOfWork(fiber) {
  // 현재 파이버에 대한 작업을 수행 (예: 컴포넌트 함수 실행, diff 비교 등)
  beginWork(fiber);
  
  // ➏ 다음 작업 단위를 결정하고 반환
  // 1. 자식이 있으면, 자식이 다음 작업
  if (fiber.child) {
    return fiber.child;
  }
  // 2. 자식이 없으면, 형제를 다음 작업으로
  if (fiber.sibling) {
    return fiber.sibling;
  }
  // 3. 자식과 형제 모두 없으면, 부모로 돌아가서 부모의 형제를 찾음
  let parent = fiber.return;
  while (parent) {
    if (parent.sibling) {
      return parent.sibling;
    }
    parent = parent.return;
  }

  // 최상단까지 돌아왔으면 모든 작업 완료
  return null;
}