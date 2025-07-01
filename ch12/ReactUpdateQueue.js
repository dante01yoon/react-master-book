// 경로: src/renderers/shared/stack/reconciler/ReactUpdateQueue.js (일부, 간략화)

var ReactUpdateQueue = {
  // ... (다른 프로퍼티 및 메소드들)

  /**
   * @param {ReactClass} publicInstance 컴포넌트의 인스턴스
   * @param {object} partialState 기존 state와 병합될 다음 partial state
   */
  enqueueSetState: function(publicInstance, partialState) {
    // _instancesByReactRootID를 통해 internalInstance를 가져오는 로직 존재 가능성 있음,
    // 여기서는 publicInstance가 내부적으로 _reactInternalInstance를 통해
    // internalInstance에 접근 가능하다고 가정함
    var internalInstance = publicInstance._reactInternalInstance; // 실제로는 이렇게 직접 접근하지 않음

    // 내부 큐에 partialState 추가함
    // 실제 코드에서는 internalInstance._pendingStateQueue 등 사용함
    if (!internalInstance._pendingStateQueue) {
      internalInstance._pendingStateQueue = [];
    }
    internalInstance._pendingStateQueue.push(partialState);

    // 가장 중요한 부분: ReactUpdates에게 이 컴포넌트가 업데이트 되어야 함을 알림
    // 이렇게 함으로써 컴포넌트가 dirtyComponents 배열에 추가됨
    ReactUpdates.enqueueUpdate(internalInstance);
  },

  enqueueForceUpdate: function(publicInstance) {
    var internalInstance = publicInstance._reactInternalInstance;

    // 강제 업데이트 플래그 설정함
    internalInstance._pendingForceUpdate = true;

    ReactUpdates.enqueueUpdate(internalInstance);
  },

  enqueueCallback: function(publicInstance, callback, callerName) {
    var internalInstance = publicInstance._reactInternalInstance;
    if (callback) {
      if (!internalInstance._pendingCallbacks) {
        internalInstance._pendingCallbacks = [];
      }
      internalInstance._pendingCallbacks.push(callback);
      // 콜백 큐잉 시에도 업데이트 예약 가능 (이미 예약된 경우 많음)
      ReactUpdates.enqueueUpdate(internalInstance);
    }
  },

  // ... (큐 처리 로직: _processPendingUpdates 등)
};
