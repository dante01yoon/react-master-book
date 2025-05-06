function dispatchSetStateInternal(fiber, queue, action) {
  // 현재 렌더링 중이 아니고, 큐가 비어있고, 다른 업데이트도 없는 특별한 경우에만 진입
  if (isOptimizablePath(fiber, queue)) {
    // 이전에 렌더링된 리듀서와 상태를 가져옴
    lastRenderedReducer = queue.lastRenderedReducer
    currentState = queue.lastRenderedState

    if (lastRenderedReducer) {
      // 새로운 상태를 미리 계산 (eager computation)
      eagerState = lastRenderedReducer(currentState, action)

      // Object.is를 사용하여 미리 계산한 상태(eagerState)와 현재 상태(currentState)를 비교
      // 만약 두 상태가 객체이고 참조가 동일하다면 (또는 원시값이고 값이 동일하다면)
      if (Object.is(eagerState, currentState)) {
        // 상태가 변경되지 않았으므로, 실제 업데이트를 스케줄링하지 않고 종료 (bailout)
        // 이 경우, 불필요한 리렌더링을 방지할 수 있음
        recordEagerStateOnUpdate(update, eagerState) // 계산된 상태는 기록해둠
        return DID_NOT_SCHEDULE_UPDATE // 업데이트 스케줄링 안 함을 알림
      }
    }
  }

  // 위의 최적화 조건에 해당하지 않거나, 상태가 변경된 경우:
  // 일반적인 업데이트 스케줄링 로직 수행
  root = enqueueConcurrentHookUpdate(fiber, queue, update, lane)
  if (root) {
    scheduleUpdateOnFiber(root, fiber, lane)
    return DID_SCHEDULE_UPDATE // 업데이트 스케줄링 했음을 알림
  }
  return DID_NOT_SCHEDULE_UPDATE // (예외적으로) 스케줄링 안됨
}