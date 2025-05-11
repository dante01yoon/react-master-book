// React.Component.prototype.setState (개념적인 코드)
React.Component.prototype.setState = function(partialState, callback) {
  // this.updater는 ReactCompositeComponent가 설정해준
  // ReactUpdateQueue 인터페이스를 가리킴
  this.updater.enqueueSetState(this, partialState); // 'this'는 컴포넌트 인스턴스
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'setState');
  }
}

// forceUpdate 메소드 (유사한 흐름)
React.Component.prototype.forceUpdate = function(callback) {
  this.updater.enqueueForceUpdate(this);
  if (callback) {
    this.updater.enqueueCallback(this, callback, 'forceUpdate');
  }
}