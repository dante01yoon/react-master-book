// 스택 재조정자 시절의 코드 간소화
var ReactDefaultBatchingStrategy = {
  isBatchingUpdates: false,

  // ➊ batchedUpdates는 모든 업데이트를 감싸는 역할을 함
  batchedUpdates: function(callback, a) {
    var alreadyBatching = ReactDefaultBatchingStrategy.isBatchingUpdates;
    
    // 이미 다른 배치 작업이 진행 중이라면, 현재 콜백을 바로 실행
    if (alreadyBatching) {
      return callback(a);
    }

    // ➋ 트랜잭션을 시작하여 배치 작업을 수행
    transaction.perform(callback, null, a);
  },
};

// ➌ 트랜잭션: 작업의 시작과 끝에 특정 로직을 보장하는 래퍼
const batchingStrategyTransaction = {
  initialize: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = true;
  },
  close: function() {
    ReactDefaultBatchingStrategy.isBatchingUpdates = false;
    // ➍ 트랜잭션이 닫힐 때, 쌓여있던 모든 업데이트를 실제로 처리
    ReactUpdates.flushBatchedUpdates(); 
  }
};

// 가상의 transaction.perform 구현
const transaction = {
  perform: function(method, scope, a) {
    try {
      batchingStrategyTransaction.initialize();
      method.call(scope, a);
    } finally {
      // 무슨 일이 있어도 close는 반드시 호출됨
      batchingStrategyTransaction.close();
    }
  }
};