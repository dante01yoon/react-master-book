export class TodoModel {
  constructor() {
    this.todos = [];
    this.listeners = []; // 데이터가 변경되었을 때 호출되어야 할 콜백 함수들을 저장합니다.
  }

  // 컨트롤러나 뷰와 같은 다른 컴포넌트가 데이터의 변경을 구독할 수 있게 합니다.
  subscribe(listener) {
    this.listeners.push(listener);
  }

  // 데이터의 변경을 관찰하는 구독자들에게 변경을 통지합니다.
  notify() {
    // 저장된 콜백함수에 `todos`를 인자로 전달합니다.
    this.listeners.forEach((listener) => listener(this.todos));
  }

  addTodo(todo) {
    this.todos.push(todo);
    this.notify(); // 데이터가 변경되었음을 통지합니다.
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
    this.notify(); // 데이터가 변경되었음을 통지합니다.
  }

  getTodos() {
    return this.todos;
  }
}
