export class TodoController {
  constructor(model, view) {
    this.model = model;
    this.view = view;


    this.model.subscribe((todos) => { // 생성자로 전달된 모델을 사용해 모델에서 변경 통지가 발생했을 때 실행시킬 콜백함수를 등록합니다.
      this.view.renderTodos(todos);
    });

    this.view.addButton.addEventListener('click', this.handleAddTodo.bind(this));
    this.view.todoList.addEventListener('click', this.handleDeleteTodo.bind(this));

    this.view.renderTodos(this.model.getTodos());
  }

  handleAddTodo() {
    const todoText = this.view.input.value.trim();
    if (todoText) {
      this.model.addTodo(todoText);
      this.view.input.value = '';
    }
  }

  handleDeleteTodo(event) {
    if (event.target.tagName === 'BUTTON') {
      const index = parseInt(event.target.dataset.index, 10);
      this.model.removeTodo(index);
      // 수동으로 리렌더링 시키던 메서드를 없앴습니다. handleDeleteTodo 내부에서 별도의 뷰 업데이트 메서드를 실행시키지 않아도
      // 화면이 자동으로 업데이트 됩니다.
    }
  }
}
