export class TodoModel {
  constructor() {
    this.todos = []; // ➊ todos 배열 초기화
  }

  addTodo(todo) {
    this.todos.push(todo); // ➋ 새로운 작업을 todos 배열에 추가
  }

  removeTodo(index) {
    this.todos.splice(index, 1); // ➌ 지정된 인덱스의 작업을 todos 배열에서 제거
  }

  getTodos() {
    return this.todos; // ➍ 현재 todos 배열을 반환
  }
}
