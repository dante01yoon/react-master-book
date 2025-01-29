export class ViewModel {
  constructor() {
    // 옵저버 패턴을 구현하기 위해 콜백 함수를 배열에 저장
    this.observers = [];

    // 초기 상태값들
    this.newTodo = '';    // 유저가 타이핑 하는 todo
    this.todos = [];      // 투두의 리스트들
  }

  // 외부 코드가 모든 속성 값들의 변경을 통지받을 수 있게 구독할 수 있는 인터페이스를 제공
  subscribe(callback) {
    this.observers.push(callback);
  }

  // 속성값 변경시 모든 구독자들에게 변경을 통지
  notify(property, value) {
    for (const cb of this.observers) {
      cb(property, value);
    }
  }

  // 속성 값 선언을 위한 세터 헬퍼 함수, 값을 변경한 이후 구독자들에게 통지합니다.
  set(property, value) {
    this[property] = value;
    this.notify(property, value);
  }

  // 현재 속성 값을 반환합니다.
  get(property) {
    return this[property];
  }

  // 투두 리스트 구현을 위한 비즈니스 로직을 작성합니다.

  // 새로운 투두를 추가합니다.
  addTodo() {
    const text = this.newTodo.trim();
    if (text) {
      this.todos.push(text);
      // 투두의 변경을 통지합니다.
      this.notify('todos', this.todos);
      // 인풋 박스를 빈 값으로 초기화 합니다.
      this.set('newTodo', '');
    }
  }

  // 투두를 삭제합니다.
  removeTodo(index) {
    this.todos.splice(index, 1);
    // 투두의 변경을 통지합니다.
    this.notify('todos', this.todos);
  }
}
