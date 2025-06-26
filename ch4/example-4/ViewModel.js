export class ViewModel {
  constructor() {
    // 상태 변경을 알리기 위한 구독자(리스너) 목록
    this.observers = [];

    // 뷰가 사용할 초기 상태 정의
    this.newTodo = ''; // 할 일 입력창의 텍스트
    this.todos = [];   // 할 일 목록 배열
  }

  // 외부에서 상태 변경을 구독하기 위한 인터페이스
  subscribe(callback) {
    this.observers.push(callback);
  }

  // 등록된 모든 구독자에게 특정 속성의 변경을 알림
  notify(property, value) {
    this.observers.forEach(cb => cb(property, value));
  }

  // 상태를 안전하게 변경하고 변경 사실을 통지하는 '반응형 세터'
  set(property, value) {
    this[property] = value;
    this.notify(property, value);
  }

  // 현재 속성값을 반환하는 게터
  get(property) {
    return this[property];
  }

  // --- 뷰에서 사용할 비즈니스 로직 ---

  // 새로운 할 일을 추가하는 로직
  addTodo() {
    const text = this.newTodo.trim();
    if (text) {
      // 직접 this.todos.push를 사용하지 않고, notify를 통해 변경을 알려야 함
      this.todos.push(text);
      this.notify('todos', this.todos); 
      
      // 입력창을 비우기 위해 'set' 헬퍼를 사용 (자동으로 newTodo 변경이 통지됨)
      this.set('newTodo', '');
    }
  }

  // 특정 할 일을 제거하는 로직
  removeTodo(index) {
    this.todos.splice(index, 1);
    this.notify('todos', this.todos); // todos 배열의 변경을 통지함
  }
}