// 경로: src/renderers/shared/stack/reconciler/ReactUpdates.js (일부, 간략화)

// 스택 재조정자 시절의 코드 간소화
var dirtyComponents = []; // 업데이트가 필요한 '더티' 컴포넌트 목록
var updateBatchNumber = 0; // 현재 업데이트 배치의 번호


function enqueueUpdate(component) {
  // 현재 배치 업데이트가 진행 중인지 확인
  if (!batchingStrategy.isBatchingUpdates) {
    // 진행 중이 아니라면, 배치 업데이트를 시작함
    batchingStrategy.batchedUpdates(enqueueUpdate, component);
    return;
  }

  // 배치 업데이트가 이미 진행 중이라면, 컴포넌트를 큐에 추가
  dirtyComponents.push(component);
}

var asapEnqueued = false; // asap 큐에 작업이 있는지 여부
var asapCallbackQueue = CallbackQueue.getPooled(); // asap 콜백들을 위한 큐

var flushBatchedUpdates = function() {
  // ReactUpdatesFlushTransaction의 wrapper는 dirtyComponents 배열을 비우고
  // 마운트 준비 핸들러(예: componentDidUpdate)에 의해 큐에 추가된 모든 업데이트를 수행함.
  // 하지만 setState 콜백과 asap 호출에 의해 큐에 추가된 업데이트를 처리하기 위해 여기서도 확인 필요함.
  // 처리할 더티 컴포넌트나 asap 작업이 있는 동안 반복  
  while (dirtyComponents.length || asapEnqueued) {
    if (dirtyComponents.length) {
      // 1. 트랜잭션 생성 및 실행
      var transaction = ReactUpdatesFlushTransaction.getPooled();
      // transaction.perform()은 runBatchedUpdates를 실행하고,
      // 트랜잭션의 wrapper(NESTED_UPDATES, UPDATE_QUEUEING)들이 전후로 실행됨
      transaction.perform(runBatchedUpdates, null, transaction);
      ReactUpdatesFlushTransaction.release(transaction); // 트랜잭션 반환
    }

    if (asapEnqueued) { // asap 큐에 작업이 있다면 처리
      asapEnqueued = false;
      var queue = asapCallbackQueue;
      asapCallbackQueue = CallbackQueue.getPooled(); // 새 큐 준비
      queue.notifyAll(); // 모든 asap 콜백 실행
      CallbackQueue.release(queue); // 사용한 큐 반환
    }
  }
};

function runBatchedUpdates(transaction) {
  // transaction은 ReactUpdatesFlushTransaction 인스턴스
  // NESTED_UPDATES 래퍼가 초기화 시점의 길이를 저장
  var len = transaction.dirtyComponentsLength;
  invariant(
    len === dirtyComponents.length, // 시작 시점과 현재 dirtyComponents 길이가 같은지 확인
    // (만약 다르다면, NESTED_UPDATES가 이를 처리해야 함)
    // ...
  );

  // 부모 컴포넌트가 자식보다 먼저 업데이트되도록 마운트 순서대로 정렬
  dirtyComponents.sort(mountOrderComparator);

  updateBatchNumber++; // 현재 진행 중인 배치의 고유 번호 증가

  for (var i = 0; i < len; i++) {
    var component = dirtyComponents[i];

    // 컴포넌트가 언마운트되었거나, 이미 현재 배치에서 업데이트 되었다면 건너뛸 수 있음
    // 여기서는 component._updateBatchNumber를 통해 이를 확인 가능
    // if (component._updateBatchNumber !== updateBatchNumber) {
    //   continue;
    // }

    var callbacks = component._pendingCallbacks; // setState 콜백 등
    component._pendingCallbacks = null;

    // 핵심: ReactReconciler를 통해 실제 컴포넌트 업데이트 로직 수행
    ReactReconciler.performUpdateIfNecessary(
      component,
      transaction.reconcileTransaction, // 실제 DOM 변경 등을 위한 트랜잭션
      updateBatchNumber, // 현재 배치 번호를 넘겨서 중복 업데이트 방지 등에 사용
    );

    if (callbacks) { // setState 콜백 등이 있다면 트랜잭션의 콜백 큐에 추가
      for (var j = 0; j < callbacks.length; j++) {
        transaction.callbackQueue.enqueue(
          callbacks[j],
          component.getPublicInstance(),
        );
      }
    }
  }
}

var ReactUpdates = {
  // ...
  enqueueUpdate: enqueueUpdate,
  flushBatchedUpdates: flushBatchedUpdates,
  runBatchedUpdates: runBatchedUpdates,
  // ...
};