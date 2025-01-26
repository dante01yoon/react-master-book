export class TodoController {
  constructor(model, view) { // 생성자 인자로 모델과 뷰를 전달 받습니다.
    this.model = model;
    this.view = view;

    // 뷰에 handleAddTodo와 handleDeleteTodo 이벤트 핸들러를 바인딩합니다.
    this.view.addButton.addEventListener('click', this.handleAddTodo.bind(this));
    this.view.todoList.addEventListener('click', this.handleDeleteTodo.bind(this));

    // Initial render
    this.updateView();
  }

  handleAddTodo() {
    const todoText = this.view.input.value.trim();
    if (todoText) {
      this.model.addTodo(todoText); // 모델을 업데이트 합니다.
      this.updateView(); // 뷰를 업데이트 합니다.
      this.view.input.value = ''; // 인풋창을 초기화 합니다.
    }
  }

  handleDeleteTodo(event) {
    if (event.target.tagName === 'BUTTON') {
      const index = parseInt(event.target.dataset.index, 10);
      this.model.removeTodo(index); // 모델을 업데이트 합니다.
      this.updateView(); // 뷰를 업데이트 합니다.
    }
  }

  updateView() { // 모델을 가지고 뷰를 업데이트 합니다.
    const todos = this.model.getTodos();
    this.view.renderTodos(todos);
  }
}
