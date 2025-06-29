// 경로: src/renderers/shared/stack/reconciler/ReactDefaultBatchingStrategy.js (개념적)
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  batchedUpdates: function(callback, a, b, c, d, e) {
    var alreadyBatchingStrategy = ReactDefaultBatchingStrategy.isBatchingUpdates;

    ReactDefaultBatchingStrategy.isBatchingUpdates = true;

    if (alreadyBatchingStrategy) {
      return callback(a, b, c, d, e);
    } else {
      try {
        return transaction.perform(callback, null, a, b, c, d, e);
      } finally {
        // isBatchingUpdates를 false로 되돌리기 전에 flush를 호출해야 함.
        // 그러나 실제로는 flush는 callback 내부의 enqueueUpdate가 누적된 후
        // 최상위 batchedUpdates 호출이 끝날 때 한번만 일어난다.
        // ReactUpdates.flushBatchedUpdates(); // 실제 위치는 이것보다 복잡
      }
    }
  },
};
// 실제 ReactDefaultBatchingStrategy의 batchedUpdates는 내부적으로
// transaction을 사용하여 flushBatchedUpdates를 호출.