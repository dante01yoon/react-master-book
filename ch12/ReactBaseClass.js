// React.Component.prototype.setState (개념적인 코드)
// 스택 재조정자 시절의 setState 구현 간소화 코드
React.Component.prototype.setState = function(partialState, callback) { // ➊
  // this.updater는 컴포넌트와 업데이트 큐를 잇는 중간 관리자 역할을 함
  // ➋ 첫 번째 인자로 'this'를 넘겨 어떤 컴포넌트의 상태를 업데이트할지 알려줌
  this.updater.enqueueSetState(this, partialState); 

  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
};

// forceUpdate 메소드 (유사한 흐름)
React.Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
}