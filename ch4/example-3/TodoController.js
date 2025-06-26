export class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    // ➊ 모델을 구독하고, 변경 알림이 오면 실행할 콜백 함수를 등록
    // 이 콜백 함수는 뷰의 렌더링을 담당함
    this.model.subscribe(todos => {
      this.view.renderTodos(todos);
    });

    // 뷰의 이벤트를 핸들러에 바인딩하는 것은 동일
    this.view.addButton.addEventListener('click', this.handleAddTodo.bind(this));
    this.view.todoList.addEventListener('click', this.handleDeleteTodo.bind(this));

    // 초기 렌더링
    this.view.renderTodos(this.model.getTodos());
  }

  handleAddTodo() {
    const todoText = this.view.input.value.trim();
    if (todoText) {
      this.model.addTodo(todoText); // 모델 변경만 요청함
      this.view.input.value = '';
    }
  }

  handleDeleteTodo(event) {
    if (event.target.tagName === 'BUTTON') {
      const index = parseInt(event.target.dataset.index, 10);
      this.model.removeTodo(index); // 모델 변경만 요청함
    }
    // ➋ 뷰를 수동으로 업데이트하던 `this.updateView()` 코드가 사라짐
  }
}