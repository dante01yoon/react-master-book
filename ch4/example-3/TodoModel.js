export class TodoModel {
  constructor() {
    this.todos = [];
    // ➊ 상태 변경을 통지할 구독자(리스너) 콜백 함수 목록
    this.listeners = []; 
  }

  // ➋ 외부에서 모델의 변경을 감지할 수 있도록 리스너를 등록(구독)하는 메서드
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // ➌ 등록된 모든 리스너에게 현재 상태를 전달하여 변경 사실을 알림
  notify() {
    this.listeners.forEach(listener => listener(this.todos));
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.notify(); // ➍ 상태 변경 후, 모든 구독자에게 알림
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    this.notify(); // ➎ 상태 변경 후, 모든 구독자에게 알림
  }

  getTodos() {
    return this.todos;
  }
}