function requestUpdateLane(fiber) {
  const currentExecutionContext = getExecutionContext();
 
  // ➊ 개발자가 의도적으로 우선순위를 낮춘 경우 (트랜지션)
  if (isTransitionLane(fiber.mode)) {
    return TransitionLane; // 하위 우선순위로 배정
  }
 
 
  // ➋ 사용자 입력에 의한 업데이트인 경우
  if (currentExecutionContext & DiscreteEventContext) {
    return InputDiscreteLane; // '클릭' 같은 긴급 이벤트는 상위 우선순위
  }
  if (currentExecutionContext & ConcurrentEventContext) {
    return InputContinuousLane; // '스크롤' 같은 연속 이벤트는 다음 우선순위로
  }
 
 
  // ➌ 렌더링 도중 발생한 동기적 업데이트인 경우
  if ((currentExecutionContext & (RenderContext | CommitContext)) !== NoContext) {
    return SyncLane; // 데이터 불일치를 막기 위해 '긴급' 우선순위로
  }
 
 
  // ➍ 그 외의 모든 경우
  return DefaultLane; // 일반 우선순위로 배정
 }
 