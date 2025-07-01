function requestUpdateLane(fiber) {
  if (isTransitionLane(fiber.mode)) {
    return TransitionLane;
  }
  const currentExecutionContext = getExecutionContext();
  if (currentExecutionContext & DiscreteEventContext) {
    return InputDiscreteLane;
  }
  if (currentExecutionContext & ConcurrentEventContext) {
    return InputContinuousLane;
  }
  if ((currentExecutionContext & (RenderContext | CommitContext)) !== NoContext) {
    return SyncLane;
  }
  // 그 외의 경우 기본 우선순위로 설정합니다.
  return DefaultLane;
 }
 